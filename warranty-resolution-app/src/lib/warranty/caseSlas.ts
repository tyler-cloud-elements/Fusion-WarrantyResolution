// Every clock on a case, at all three levels.
//
// A warranty case carries more than one SLA at once: the case clock (4 d, or the
// 24 h P1 override from SDD §1), a clock per stage it has entered, and a clock
// per open human task. The SLAs tab shows all of them; the Overview widget shows
// the case clock plus whatever needs attention. Both read this one function, so a
// pill in the list can never contradict a countdown in the console.

import { ALL_STAGES, findStage, PRIMARY_STAGES } from "./casePlan";
import { slaStatusFor } from "./sla";
import type { CaseAction, CaseSlaEntry, SlaStatus, WarrantyCase } from "./types";

const MINUTE = 60_000;

/**
 * SDD §1 variable SLA rule: `vars.priority === "P1"` ⇒ 24 h, else 4 d. The case
 * row carries its own `slaMinutes` for the stage it is in, so the case clock is
 * derived here rather than stored, and stays right when priority changes.
 */
export function caseSlaMinutes(warrantyCase: WarrantyCase): number {
  return warrantyCase.priority === "P1" ? 24 * 60 : 4 * 24 * 60;
}

export function caseSlaLabel(warrantyCase: WarrantyCase): string {
  return warrantyCase.priority === "P1"
    ? "Warranty Resolution P1 Case SLA"
    : "Warranty Resolution Case SLA";
}

/**
 * Minutes the case has been open, measured from `openedAt`.
 *
 * Demo rows anchor their timestamps to module load (see `DEMO_NOW`), so this is
 * the same measurement for a demo case and a live one — no special case needed,
 * and a demo left on the shelf does not age out of step with the per-stage
 * figures stored on the row.
 */
function caseElapsedMinutes(warrantyCase: WarrantyCase, now: number): number {
  const opened = Date.parse(warrantyCase.openedAt);
  if (Number.isNaN(opened)) return warrantyCase.elapsedMinutes;
  return Math.max(0, Math.round((now - opened) / MINUTE));
}

function dueFrom(now: number, elapsedMinutes: number, budgetMinutes: number): Date {
  return new Date(now + (budgetMinutes - elapsedMinutes) * MINUTE);
}

/**
 * All clocks on the case, most urgent first within each level.
 *
 * A stage that has not been entered yet contributes a "Not triggered" row rather
 * than being omitted: the SLAs tab is where someone asks "what clocks exist on
 * this case", and the answer includes the ones that have not started.
 */
export function getCaseSlas(
  warrantyCase: WarrantyCase,
  actions: CaseAction[],
  now: number = Date.now(),
): CaseSlaEntry[] {
  const entries: CaseSlaEntry[] = [];

  // ── Case level ────────────────────────────────────────────────────────────
  const caseBudget = caseSlaMinutes(warrantyCase);
  const caseElapsed = caseElapsedMinutes(warrantyCase, now);
  entries.push({
    id: "case",
    level: "case",
    label: caseSlaLabel(warrantyCase),
    dueAt: dueFrom(now, caseElapsed, caseBudget),
    status:
      warrantyCase.status === "Closed"
        ? "Met"
        : slaStatusFor(caseElapsed, caseBudget),
    condition:
      warrantyCase.priority === "P1"
        ? "priority is P1 — 24-hour line-down clock"
        : "the case is opened",
  });

  // ── Stage level ───────────────────────────────────────────────────────────
  // Primary stages always appear; a conditional lane only once it is open, since
  // a dormant lane has no clock to report.
  const laneStages = warrantyCase.activeLanes
    .map(findStage)
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  for (const stage of [...PRIMARY_STAGES, ...laneStages]) {
    const state = warrantyCase.stageStates[stage.id] ?? "pending";

    if (stage.slaMinutes == null) {
      entries.push({
        id: `stage:${stage.id}`,
        level: "stage",
        label: `${stage.name} SLA`,
        dueAt: new Date(now),
        status: "Not triggered",
        condition: `${stage.sla.toLowerCase()} — no clock configured`,
      });
      continue;
    }

    let status: SlaStatus;
    let elapsed = 0;
    if (state === "completed") {
      status = "Met";
    } else if (state === "skipped" || state === "pending") {
      status = "Not triggered";
    } else {
      // The case row carries an elapsed figure for the stage it is in. A stage
      // running in parallel (coverage and containment do, per BR-002) has no
      // entry timestamp on the row, so it is measured from the case clock.
      //
      // That over-states a parallel stage's age by however long intake took, and
      // it is deliberately NOT clamped to the budget: clamping would park every
      // long-running parallel stage at exactly 100% and report a breach that is
      // an artefact of the clamp rather than of the case. A live instance
      // replaces this with real stage entry times.
      elapsed =
        stage.name === warrantyCase.currentStage ? warrantyCase.elapsedMinutes : caseElapsed;
      status = slaStatusFor(elapsed, stage.slaMinutes);
    }

    entries.push({
      id: `stage:${stage.id}`,
      level: "stage",
      label: `${stage.name} SLA`,
      dueAt: dueFrom(now, elapsed, stage.slaMinutes),
      status,
      condition:
        state === "pending"
          ? `${stage.name} is entered`
          : state === "skipped"
            ? "the stage was bypassed"
            : `${stage.name} was entered`,
    });
  }

  // ── Action level ──────────────────────────────────────────────────────────
  for (const action of actions) {
    entries.push({
      id: `action:${action.id}`,
      level: "action",
      label: `${action.title} task SLA`,
      dueAt: dueFrom(now, action.elapsedMinutes, action.slaMinutes),
      status:
        action.status === "Completed"
          ? "Met"
          : slaStatusFor(action.elapsedMinutes, action.slaMinutes),
      condition: `${action.stage} raised the task`,
    });
  }

  return entries;
}

/** Stage rows for one stage id, so the Stages tab can show its clock inline. */
export function stageSla(
  warrantyCase: WarrantyCase,
  stageId: string,
  actions: CaseAction[],
  now: number = Date.now(),
): CaseSlaEntry | undefined {
  return getCaseSlas(warrantyCase, actions, now).find((s) => s.id === `stage:${stageId}`);
}

/** Owner group for a stage, from the case plan. */
export function stageOwner(stageId: string): string {
  return ALL_STAGES.find((s) => s.id === stageId)?.owner ?? "Unassigned";
}
