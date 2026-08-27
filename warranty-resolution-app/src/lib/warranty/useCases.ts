// Data access for the whole app.
//
// One rule governs everything here: the demo dataset is the floor, live Maestro
// data is an overlay. A live instance whose business id matches a demo case
// merges over it, keeping the demo's presentation fields (customer, asset,
// evidence) where Maestro carries none. That way pointing the app at a real case
// mid-build improves it rather than emptying it.

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  AGENT_SUMMARY,
  DEMO_ACTIONS,
  DEMO_CASES,
  DEMO_INSIGHTS,
  EVIDENCE_UPLOAD_EVENT,
} from "./demoData";
import { activityFor } from "./activity";
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

/** Live fields win; demo fields fill the gaps Maestro does not carry. */
function mergeCase(demo: WarrantyCase, live: WarrantyCase): WarrantyCase {
  return {
    ...demo,
    ...live,
    customer: live.customer || demo.customer,
    site: live.site || demo.site,
    description: live.description || demo.description,
    owner: live.owner || demo.owner,
    ownerRole: live.ownerRole || demo.ownerRole,
    claimValue: live.claimValue || demo.claimValue,
    asset: {
      model: live.asset.model || demo.asset.model,
      serial: live.asset.serial || demo.asset.serial,
      description: live.asset.description || demo.asset.description,
      inServiceMonths: live.asset.inServiceMonths || demo.asset.inServiceMonths,
      warrantyStatus: live.asset.warrantyStatus || demo.asset.warrantyStatus,
    },
    evidence: live.evidence.length ? live.evidence : demo.evidence,
    trail: live.trail.length ? live.trail : demo.trail,
    variables: { ...demo.variables, ...live.variables },
    isLive: true,
  };
}

/**
 * Live instances, with the demo row of the same id filling gaps Maestro does
 * not carry. Demo rows with no live counterpart are NOT appended: once the app
 * is reading a real case, padding the queue with fictional rows would make the
 * counts lie. Callers decide when to show the demo set instead — never blended.
 */
function mergeCases(live: WarrantyCase[]): WarrantyCase[] {
  const byId = new Map(DEMO_CASES.map((c) => [c.id, c]));
  return live.map((liveCase) => {
    const demo = byId.get(liveCase.id);
    return demo ? mergeCase(demo, liveCase) : liveCase;
  });
}

export interface CasesResult {
  cases: WarrantyCase[];
  /** True when nothing live was read and the list is the bundled dataset. */
  isDemo: boolean;
  isLoading: boolean;
  reason?: string;
  refresh: () => void;
}

export function useCases(): CasesResult {
  const { sdk, isAuthenticated } = useUiPath();
  const { useMocks } = useFlags();
  const queryClient = useQueryClient();

  // Live is the default. The demo dataset is what you get when the flag asks for
  // it, when there is no tenant, or when the read fails — never a silent blend
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
    } else if (live.length > 0) {
      base = mergeCases(live);
    } else {
      // Reading live worked and the case genuinely has no instances. An empty
      // queue is the truth here; falling back to demo rows would invent work.
      base = [];
    }

    return base.map((c) => (overrides[c.id] ? { ...c, ...overrides[c.id] } : c));
  }, [query.data, overrides, useMocks, enabled]);

  const refresh = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: CASES_KEY });
  }, [queryClient]);

  const reason = useMocks
    ? "Demo data — the Use demo data flag is on"
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
    isLoading: enabled && query.isLoading,
    reason,
    refresh,
  };
}

export function useCase(caseId: string | undefined): WarrantyCase | undefined {
  const { cases } = useCases();
  return useMemo(() => cases.find((c) => c.id === caseId), [cases, caseId]);
}

// ── Actions ─────────────────────────────────────────────────────────────────

/**
 * Live fields win; the demo action supplies the argument Action Center does not
 * carry — the causes, the cost lines, the authority limit, the recommendation.
 * Matched on `actionType`, which is the Action App's own dispatch code.
 */
function mergeAction(demo: CaseAction, live: CaseAction): CaseAction {
  return {
    ...demo,
    ...live,
    title: live.title || demo.title,
    stage: live.stage || demo.stage,
    assignee: live.assignee || demo.assignee,
    whyThisReachedYou: live.whyThisReachedYou || demo.whyThisReachedYou,
    options: live.options.length && !demo.options.length ? live.options : demo.options,
    recommendation: live.recommendation.headline ? live.recommendation : demo.recommendation,
  };
}

export function useActions(): CaseAction[] {
  const { sdk, isAuthenticated } = useUiPath();
  const { useMocks } = useFlags();
  const { cases } = useCases();
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

  return useMemo(() => {
    const live = query.data?.actions ?? [];

    // Same rule as the case list: fall back to the demo set only when we could
    // not read, never when the read succeeded and returned nothing. A live case
    // with no open task should show an empty queue, not three invented ones.
    let base: CaseAction[];
    if (!enabled || query.data?.degraded) {
      base = DEMO_ACTIONS;
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
  }, [query.data, completions, enabled]);
}

export function useAction(actionId: string | undefined): CaseAction | undefined {
  const actions = useActions();
  return useMemo(() => actions.find((a) => a.id === actionId), [actions, actionId]);
}

export function useActionsForCase(caseId: string): CaseAction[] {
  const actions = useActions();
  return useMemo(() => actions.filter((a) => a.caseId === caseId), [actions, caseId]);
}

/**
 * The case's activity feed — authored or derived, with completed decisions
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
  /** What the signer said about the agent's reasoning — the learning signal. */
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

/** Puts a decided action back in front of its owner — the console's "Reopen task". */
export function reopenDecision(actionId: string) {
  delete actionCompletions[actionId];
  emit();
}

/** Records which evidence a decision-maker marked useful — the signal capture. */
export function markEvidenceHelpful(caseId: string, evidenceId: string, helpful: boolean | null) {
  const current = caseOverrides[caseId]?.evidence;
  const base = current ?? DEMO_CASES.find((c) => c.id === caseId)?.evidence ?? [];
  patchCase(caseId, {
    evidence: base.map((e) => (e.id === evidenceId ? { ...e, helpful } : e)),
  });
}

/** Adds uploaded documents to a case's evidence, newest first. */
export function addCaseEvidence(caseId: string, documents: EvidenceDocument[]) {
  const target = DEMO_CASES.find((c) => c.id === caseId);
  if (!target) return;
  const existing = caseOverrides[caseId]?.evidence ?? target.evidence;
  // Same file picked twice is the same document, not two.
  const fresh = documents.filter((d) => !existing.some((e) => e.id === d.id));
  if (fresh.length === 0) return;
  patchCase(caseId, {
    evidence: [...fresh, ...existing],
    lastUpdatedAt: new Date().toISOString(),
  });
}

/** Appends a comment to a case's discussion. */
export function addCaseComment(caseId: string, comment: CaseComment) {
  const target = DEMO_CASES.find((c) => c.id === caseId);
  if (!target) return;
  const existing = caseOverrides[caseId]?.comments ?? target.comments;
  patchCase(caseId, { comments: [...existing, comment] });
}

/**
 * The storyboard's scene 15: a customer upload lands mid-case, wakes the case
 * agent, and the agent proposes a reroute nobody asked it for.
 */
export function fireEvidenceUploadEvent() {
  const target = DEMO_CASES.find((c) => c.id === EVIDENCE_UPLOAD_EVENT.caseId);
  if (!target) return;

  const existing = caseOverrides[target.id]?.evidence ?? target.evidence;
  if (existing.some((e) => e.id === EVIDENCE_UPLOAD_EVENT.document.id)) return;

  patchCase(target.id, {
    evidence: [...existing, EVIDENCE_UPLOAD_EVENT.document],
    reassessment: EVIDENCE_UPLOAD_EVENT.reassessment,
    lastUpdatedAt: new Date().toISOString(),
  });
}

/** Accepts the agent's proposed reroute, opening the lane it recommended. */
export function acceptReassessment(caseId: string, lane: string) {
  const target = DEMO_CASES.find((c) => c.id === caseId);
  if (!target) return;

  const current = caseOverrides[caseId] ?? {};
  const lanes = current.activeLanes ?? target.activeLanes;
  const trail = current.trail ?? target.trail;

  patchCase(caseId, {
    activeLanes: lanes.includes(lane) ? lanes : [...lanes, lane],
    reassessment: undefined,
    stageStates: { ...(current.stageStates ?? target.stageStates), sx2: "active" },
    trail: [
      ...trail,
      {
        seq: trail.length + 1,
        actor: "human",
        actorLabel: "HT",
        step: `Route to ${lane} accepted`,
        stage: target.currentStage,
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
