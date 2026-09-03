// Data access for the whole app.
//
// One rule governs everything here: the demo dataset is the floor, live Maestro
// data is an overlay. A live instance whose business id matches a demo case
// merges over it, keeping the demo's presentation fields (customer, asset,
// evidence) where Maestro carries none. That way pointing the app at a real case
// mid-build improves it rather than emptying it.

import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  AGENT_SUMMARY,
  DEMO_ACTIONS,
  DEMO_CASES,
  DEMO_INSIGHTS,
  EVIDENCE_UPLOAD_EVENT,
} from "./demoData";
import { activityFor } from "./activity";
import { mergeAction, mergeCases, overlayActions, overlayCases } from "./overlay";
import type {
  ActivityItem,
  CaseAction,
  CaseComment,
  EvidenceDocument,
  OperationalInsights,
  ReasoningVerdict,
  WarrantyCase,
} from "./types";
import { fetchActions, fetchCases } from "@/services/uipath/caseService";
import { isCaseConfigured, isUiPathConfigured } from "@/services/uipath/config";
import { useUiPath } from "@/services/uipath/UiPathProvider";
import { useFlags } from "@/lib/flags";

const CASES_KEY = ["warranty", "cases"] as const;
const ACTIONS_KEY = ["warranty", "actions"] as const;
const STALE_TIME_MS = 30_000;

export interface CasesResult {
  cases: WarrantyCase[];
  /** True when nothing live was read and the list is the bundled dataset. */
  isDemo: boolean;
  /** True when demo rows are on screen wearing live ids, stages and links. */
  isOverlay: boolean;
  isLoading: boolean;
  /** A refetch over data already on screen: a spinner, not a skeleton. */
  isRefreshing: boolean;
  reason?: string;
  refresh: () => void;
}

export function useCases(): CasesResult {
  const { sdk, isAuthenticated, isLoading: authLoading } = useUiPath();
  const { useMocks, overlayMocks } = useFlags();
  const queryClient = useQueryClient();

  // Live is the default. The demo dataset is what you get when the flag asks for
  // it, when there is no tenant, or when the read fails. Never a silent blend
  // of the two, because a queue that is half real is worse than either.
  const enabled = !useMocks && Boolean(sdk) && isAuthenticated && isCaseConfigured();

  const query = useQuery({
    queryKey: CASES_KEY,
    queryFn: () => fetchCases(sdk!),
    enabled,
    staleTime: STALE_TIME_MS,
  });

  const overrides = useCaseOverrides();

  const cases = useMemo(() => {
    const live = query.data?.cases ?? [];

    // Four outcomes, spelled out rather than nested, because which one you are
    // looking at is the single most important thing about this screen.
    let base: WarrantyCase[];
    if (useMocks || !enabled || query.data?.degraded) {
      // No tenant, not signed in, the read failed, or the flag asked for it.
      base = DEMO_CASES;
    } else if (overlayMocks) {
      // The demo queue, wearing the tenant's ids, stages and links.
      base = overlayCases(live);
    } else if (live.length > 0) {
      base = mergeCases(live);
    } else {
      // Reading live worked and the case genuinely has no instances. An empty
      // queue is the truth here; falling back to demo rows would invent work.
      base = [];
    }

    return base.map((c) => (overrides[c.id] ? { ...c, ...overrides[c.id] } : c));
  }, [query.data, overrides, useMocks, overlayMocks, enabled]);

  const refresh = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: CASES_KEY });
  }, [queryClient]);

  const isOverlay = cases.some((c) => c.overlaidFrom);

  const reason = useMocks
    ? "Demo data. The Use demo data flag is on"
    : isOverlay
      ? "Demo cases, overlaid with live stage state, ids and tasks"
    : !isUiPathConfigured()
      ? "No UiPath tenant is configured"
      : !isCaseConfigured()
        ? "No case process key is configured"
        : !isAuthenticated
          ? "Sign in to read the live case"
          : query.data?.reason;

  return {
    cases,
    isDemo: !enabled || (query.data?.degraded ?? true),
    isOverlay,
    // Auth settling counts. While the provider is still restoring a token
    // `enabled` is false, so `cases` is the demo set, and a live case id read
    // from the URL is "not found" until the token lands. Callers that resolve
    // one case need to hold their verdict across both waits, not just the query.
    isLoading: authLoading || (enabled && query.isLoading),
    isRefreshing: query.isFetching,
    reason,
    refresh,
  };
}

export interface CaseResult {
  warrantyCase: WarrantyCase | undefined;
  /** Still resolving. `warrantyCase` being undefined does not yet mean absent. */
  isLoading: boolean;
  isRefreshing: boolean;
  refresh: () => void;
}

/**
 * One case by id.
 *
 * Returns the wait alongside the case because the two undefineds mean opposite
 * things: not loaded yet, versus genuinely no such case. Reading a deep link on
 * a cold load hits the first for a second or two, and treating that as the
 * second is how "Case … not found" ends up on screen for a case that exists.
 */
export function useCase(caseId: string | undefined): CaseResult {
  const { cases, isLoading, isRefreshing, refresh } = useCases();
  const warrantyCase = useMemo(() => cases.find((c) => c.id === caseId), [cases, caseId]);
  return { warrantyCase, isLoading, isRefreshing, refresh };
}

/** How often an open case re-reads itself. */
const CASE_POLL_MS = 10_000;

/**
 * Keeps an open case current while someone is looking at it.
 *
 * A case in flight is being moved by the process: a stage completes, a task
 * appears, and none of that arrives on its own, so the page would sit on
 * whatever was true when it loaded. Polling stops at Closed, where there is
 * nothing left to move, and while the tab is hidden, so a demo left open in a
 * background tab is not quietly hammering the tenant.
 *
 * Actions ride along: they hang off the case, and a stage advancing is usually
 * exactly when a new one shows up.
 */
export function useCaseAutoRefresh(warrantyCase: WarrantyCase | undefined): void {
  const queryClient = useQueryClient();
  const live = Boolean(warrantyCase?.isLive) && warrantyCase?.status !== "Closed";

  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "hidden") return;
      void queryClient.invalidateQueries({ queryKey: CASES_KEY });
      void queryClient.invalidateQueries({ queryKey: ACTIONS_KEY });
    }, CASE_POLL_MS);
    return () => window.clearInterval(id);
  }, [live, queryClient]);
}

// ── Actions ─────────────────────────────────────────────────────────────────

export interface ActionsResult {
  actions: CaseAction[];
  isLoading: boolean;
}

export function useActionsResult(): ActionsResult {
  const { sdk, isAuthenticated } = useUiPath();
  const { useMocks, overlayMocks } = useFlags();
  const { cases, isLoading: casesLoading } = useCases();
  const completions = useCompletions();

  const liveCases = useMemo(
    () => cases.filter((c) => c.isLive && c.instanceId).map((c) => ({ instanceId: c.instanceId, id: c.id })),
    [cases],
  );
  const enabled = !useMocks && Boolean(sdk) && isAuthenticated && liveCases.length > 0;

  const query = useQuery({
    queryKey: [...ACTIONS_KEY, liveCases.map((c) => c.instanceId).join(",")],
    queryFn: () => fetchActions(sdk!, liveCases),
    enabled,
    staleTime: STALE_TIME_MS,
  });

  const actions = useMemo(() => {
    const live = query.data?.actions ?? [];

    // Same rule as the case list: fall back to the demo set only when we could
    // not read, never when the read succeeded and returned nothing. A live case
    // with no open task should show an empty queue, not three invented ones.
    let base: CaseAction[];
    if (!enabled || query.data?.degraded) {
      base = DEMO_ACTIONS;
    } else if (overlayMocks) {
      // The demo actions, re-pointed at the overlaid cases and carrying the
      // real task ids where Action Center has one open.
      base = overlayActions(cases, live);
    } else {
      base = live.map((a) => {
        const demo = DEMO_ACTIONS.find((d) => d.actionType === a.actionType);
        return demo ? mergeAction(demo, a) : a;
      });
    }

    return base.map((action) => {
      const completion = completions[action.id];
      return completion ? { ...action, ...completion } : action;
    });
  }, [query.data, completions, enabled, overlayMocks, cases]);

  // Two waits in series: actions can only be fetched once the cases they hang
  // off are known, so this query has not even started while cases are loading.
  return { actions, isLoading: casesLoading || (enabled && query.isLoading) };
}

export function useActions(): CaseAction[] {
  return useActionsResult().actions;
}

export interface ActionResult {
  action: CaseAction | undefined;
  isLoading: boolean;
}

/** One action by id, with the same not-yet / not-there distinction as `useCase`. */
export function useAction(actionId: string | undefined): ActionResult {
  const { actions, isLoading } = useActionsResult();
  const action = useMemo(() => actions.find((a) => a.id === actionId), [actions, actionId]);
  return { action, isLoading };
}

export function useActionsForCase(caseId: string): CaseAction[] {
  const actions = useActions();
  return useMemo(() => actions.filter((a) => a.caseId === caseId), [actions, caseId]);
}

/**
 * The case's activity feed, authored or derived, with completed decisions
 * folded in. Session events reach it through the case override, so a decision
 * taken during a demo shows up here immediately.
 */
export function useCaseActivity(warrantyCase: WarrantyCase | undefined): ActivityItem[] {
  const actions = useActions();
  return useMemo(() => {
    if (!warrantyCase) return [];
    return activityFor(
      warrantyCase,
      actions.filter((a) => a.caseId === warrantyCase.id),
    );
  }, [warrantyCase, actions]);
}

export function useInsights(): OperationalInsights {
  return DEMO_INSIGHTS;
}

export function useAgentSummary() {
  return AGENT_SUMMARY;
}

// ── Session state ───────────────────────────────────────────────────────────
//
// Decisions taken and events fired during a demo live in module state rather
// than localStorage: a run should start clean every reload, and the presenter
// should never have to clear storage between rehearsals.
//
// Every mutator below takes the case being looked at, not its id. That is the
// whole point: overrides are keyed by the id ON SCREEN, which since the app went
// live-by-default is a Maestro id, not a demo one. Resolving the case being
// changed out of DEMO_CASES instead, as these once did, silently no-ops every
// one of them the moment a live read succeeds, because no demo row carries that
// id. Taking the case itself makes the base state and the override key come from
// the same object, so there is nothing left to mismatch.

type CaseOverride = Partial<WarrantyCase>;
type ActionCompletion = Partial<CaseAction>;

const caseOverrides: Record<string, CaseOverride> = {};
const actionCompletions: Record<string, ActionCompletion> = {};
const listeners = new Set<() => void>();

// useSyncExternalStore compares snapshots by reference, so both stores are
// replaced wholesale on write and the same object is returned until then.
let caseSnapshot: Record<string, CaseOverride> = {};
let completionSnapshot: Record<string, ActionCompletion> = {};

function emit() {
  caseSnapshot = { ...caseOverrides };
  completionSnapshot = { ...actionCompletions };
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function useCaseOverrides(): Record<string, CaseOverride> {
  return useSyncExternalStore(
    subscribe,
    () => caseSnapshot,
    () => caseSnapshot,
  );
}

function useCompletions(): Record<string, ActionCompletion> {
  return useSyncExternalStore(
    subscribe,
    () => completionSnapshot,
    () => completionSnapshot,
  );
}

export function patchCase(caseId: string, patch: CaseOverride) {
  caseOverrides[caseId] = { ...caseOverrides[caseId], ...patch };
  emit();
}

export function recordDecision(
  action: CaseAction,
  outcome: string,
  decidedBy: string,
  rationale: string,
  /** What the signer said about the agent's reasoning, which is the learning signal. */
  reasoning?: ReasoningVerdict,
) {
  actionCompletions[action.id] = {
    status: "Completed",
    completedOutcome: outcome,
    completedBy: decidedBy,
    completedAt: new Date().toISOString(),
    rationale,
    completedReasoning: reasoning,
  };
  emit();
}

/** Puts a decided action back in front of its owner, the console's "Reopen task". */
export function reopenDecision(actionId: string) {
  delete actionCompletions[actionId];
  emit();
}

/** Records which evidence a decision-maker marked useful, the signal capture. */
export function markEvidenceHelpful(
  warrantyCase: WarrantyCase,
  evidenceId: string,
  helpful: boolean | null,
) {
  // The override is read first so two ratings in one render both land; the case
  // on screen is the fallback, and it already has any earlier override folded in.
  const base = caseOverrides[warrantyCase.id]?.evidence ?? warrantyCase.evidence;
  patchCase(warrantyCase.id, {
    evidence: base.map((e) => (e.id === evidenceId ? { ...e, helpful } : e)),
  });
}

/** Adds uploaded documents to a case's evidence, newest first. */
export function addCaseEvidence(warrantyCase: WarrantyCase, documents: EvidenceDocument[]) {
  const existing = caseOverrides[warrantyCase.id]?.evidence ?? warrantyCase.evidence;
  // Same file picked twice is the same document, not two.
  const fresh = documents.filter((d) => !existing.some((e) => e.id === d.id));
  if (fresh.length === 0) return;
  patchCase(warrantyCase.id, {
    evidence: [...fresh, ...existing],
    lastUpdatedAt: new Date().toISOString(),
  });
}

/** Appends a comment to a case's discussion. */
export function addCaseComment(warrantyCase: WarrantyCase, comment: CaseComment) {
  const existing = caseOverrides[warrantyCase.id]?.comments ?? warrantyCase.comments;
  patchCase(warrantyCase.id, { comments: [...existing, comment] });
}

/**
 * The storyboard's scene 15: a customer upload lands mid-case, wakes the case
 * agent, and the agent proposes a reroute nobody asked it for.
 *
 * Fires on the case being looked at rather than on the one the scene was written
 * around. The button sits on every case's page, so pinning the event to a single
 * authored id meant it did nothing on any other case, and nothing at all once
 * the hero case came back from Maestro wearing a live id.
 */
export function fireEvidenceUploadEvent(warrantyCase: WarrantyCase) {
  const existing = caseOverrides[warrantyCase.id]?.evidence ?? warrantyCase.evidence;
  // Fire twice and the second is a no-op, not a duplicate row.
  if (existing.some((e) => e.id === EVIDENCE_UPLOAD_EVENT.document.id)) return;

  patchCase(warrantyCase.id, {
    evidence: [...existing, EVIDENCE_UPLOAD_EVENT.document],
    reassessment: EVIDENCE_UPLOAD_EVENT.reassessment,
    lastUpdatedAt: new Date().toISOString(),
  });
}

/**
 * True once scene 15's upload has landed on this case.
 *
 * Read off the case rather than tracked separately, so it stays right when the
 * session state is reset underneath it, and it lets the menu item say "already
 * arrived" instead of looking live and doing nothing on a second click.
 */
export function hasEvidenceUploadFired(warrantyCase: WarrantyCase): boolean {
  return warrantyCase.evidence.some((e) => e.id === EVIDENCE_UPLOAD_EVENT.document.id);
}

/** Accepts the agent's proposed reroute, opening the lane it recommended. */
export function acceptReassessment(warrantyCase: WarrantyCase, lane: string) {
  const current = caseOverrides[warrantyCase.id] ?? {};
  const lanes = current.activeLanes ?? warrantyCase.activeLanes;
  const trail = current.trail ?? warrantyCase.trail;

  patchCase(warrantyCase.id, {
    activeLanes: lanes.includes(lane) ? lanes : [...lanes, lane],
    reassessment: undefined,
    stageStates: { ...(current.stageStates ?? warrantyCase.stageStates), sx2: "active" },
    trail: [
      ...trail,
      {
        seq: trail.length + 1,
        actor: "human",
        actorLabel: "HT",
        step: `Route to ${lane} accepted`,
        stage: warrantyCase.currentStage,
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      },
    ],
  });
}

/** Clears every decision and event taken this session. */
export function resetDemoState() {
  Object.keys(caseOverrides).forEach((k) => delete caseOverrides[k]);
  Object.keys(actionCompletions).forEach((k) => delete actionCompletions[k]);
  emit();
}
