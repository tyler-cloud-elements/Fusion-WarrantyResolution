/**
 * THE EVIDENCE BEHIND THE RECOMMENDATION — the signals the assessment agent
 * read, and what each one holds up.
 *
 * Its own file, and the split from its two neighbours is deliberate:
 *
 *  - `./types.ts` is the shape of a FACT the assessment widget draws — a score, a
 *    status, a series. It says so at the top, and a signal is not one of those.
 *  - `./conversation.ts` is the record of two parties working out what the data
 *    means. A signal is neither the turn nor the reading; it is the reason a
 *    position was taken.
 *
 * Three contracts, three files — the argument those two already make for each
 * other.
 *
 * **These are extracted from the console underneath**
 * (../_views/coverage-decision-console): the finding, the policy test, the cost
 * table, the customer card and the prior history. Every figure and date below
 * appears on that screen. They line up with the sentences of the
 * rationale the console drafts for the recommended position — the `draft` field
 * on the `partial` option in ./coverage-decision.ts — which is what makes this a
 * reading of that decision rather than a second opinion about it.
 *
 * **`importance` is how much the decision LEANS on the signal**, which is not the
 * same as how certain the signal is. A signal can be certain and still rank low,
 * where what it holds up is a boundary on the split rather than the split itself.
 *
 * **Authored and pure.** No clock, no counters, no reader state. The Signal
 * Collector is a prerendered route, so a value that differed between build and
 * hydration would be a mismatch — and what a reviewer THOUGHT of a signal is
 * runtime state that belongs next to the render, never folded into this file. An
 * authored fixture that carried a thumb would be asserting an opinion nobody
 * recorded.
 */

import { EVIDENCE_ANCHORS, type EvidenceAnchorId } from "./evidence-anchors";

/**
 * How much weight the recommendation puts on a signal.
 *
 * Three steps and no fourth. A fourth would need a rendering distinguishable from
 * its neighbours in a 237px column, and there isn't one — see the bar meter in
 * ../_components/assessment-chat/evidence-list.tsx.
 */
export type SignalImportance = "high" | "medium" | "low";

export interface DecisionSignal {
  /** Unique — the React key and the handle the feedback map is keyed by. */
  id: string;
  importance: SignalImportance;
  /**
   * The collapsed row's whole text. Kept under ~34 characters because it shares
   * one line with the bar meter and a chevron inside the panel's bubble.
   *
   * Not a truncation of `headline` — a shortened sentence reads as a bug, so this
   * is written as its own phrase and `headline` appears on expand.
   */
  short: string;
  /** The full title, shown once the row is open. */
  headline: string;
  /** The paragraph behind it. */
  description: string;
  /**
   * The line of the decision this signal holds up, in the fewest words that
   * still name the money. Sits under `short` on the collapsed row, so it is
   * short for the same reason.
   */
  backs: string;
  /** The systems it was read from — drawn as chips when the row is open. */
  sources: string[];
  /**
   * Where on screen this was read — one or more anchors the view declares
   * (./evidence-anchors.ts). Opening the Evidence section drops a numbered marker
   * on each, so the evidence can be read in place rather than only in the panel.
   *
   * More than one where the fact is genuinely stated twice: §4.2 appears both as
   * Cause 2 and as the failing row of the policy test, and both are where a
   * reviewer would look for it. Never a list of everywhere the topic is mentioned
   * — a marker on each of nine tangentially related boxes is an overlay nobody
   * reads.
   *
   * The first anchor is the one a row scrolls to when it is expanded, so it should
   * be the fullest statement of the fact rather than the nearest.
   */
  anchors: EvidenceAnchorId[];
}

/**
 * The five, in the order the recommendation depends on them: why a split at all,
 * why the part is in, why the labour and freight are out, why the travel is a
 * gift, and what the whole decision is worth getting right.
 *
 * **The last one is a frame rather than a finding**, and it is `high` deliberately.
 * The four above argue about who pays which line; this one says what the argument
 * costs. A $2,340,000 agreement renewing inside twelve months makes a contested
 * denial more expensive than the $16,272.50 claim it would save, which is the kind
 * of fact that changes what "getting it right" means without changing a single
 * coverage clause. Ranking it `medium` beside the goodwill headroom would have
 * filed it as another commercial nicety; it is the reason the others are urgent.
 *
 * **There was a fifth, and where it went is the point.** `sig-operator-error-open`
 * said that a third contribution is unestablished and stays open, and its whole
 * argument was the one prior case that went the other way — WR-2025-0331, closed as
 * operator error with no evidence trail. That case is now a section of its own on
 * the decision page ("Historical data", from ./precedent.ts), so keeping the signal
 * would have put the same reasoning twice on one screen, once as evidence about
 * THIS claim and once as the base rate it is measured against. The base rate is the
 * truer home for it: it is not a fact about this gearbox.
 *
 * It was also the only `low` — what it held up was a boundary on the split rather
 * than the split itself — so the list it left is four signals that each carry a line
 * of the decision.
 */
export const DECISION_SIGNALS: DecisionSignal[] = [
  {
    id: "sig-combined-cause",
    importance: "high",
    short: "Two causes, neither sole",
    headline: "Two causes, both established, neither sole",
    description:
      "A defect inside its term and an unapproved configuration change, each " +
      "proven against the agreement's clauses, neither excluding the other. No " +
      "coverage rule in the case plan resolves a combined cause, which is why " +
      "the case escalated to a person at 09:46 rather than closing itself. A " +
      "split by cause attribution is the only position that answers the finding " +
      "as found: denial and full coverage each require treating one established " +
      "cause as if it were not there.",
    backs: "A split, not all-or-nothing",
    sources: ["Case", "Helios"],
    anchors: [EVIDENCE_ANCHORS.verdict, EVIDENCE_ANCHORS.policyTally],
  },
  {
    id: "sig-defect-in-term",
    importance: "high",
    short: "Defect inside its rated term",
    headline: "The defect signature puts the part inside cover",
    description:
      "The gearbox failed 30 months into a 60-month rated service life, with " +
      "bearing race spalling consistent with a manufacturing defect and not " +
      "with overload, contamination or missed lubrication. Established on site " +
      "on 03-20, first-time fix confirmed. The component sits in a covered " +
      "subsystem under an agreement that runs to 2027-09-02 with a $0 " +
      "deductible, so nothing about the term or the scope stands in the way.",
    backs: "Parts — $8,450.00 to us",
    sources: ["Fieldlink", "WT-9", "Vault-PLM"],
    anchors: [EVIDENCE_ANCHORS.causeDefect],
  },
  {
    id: "sig-unapproved-change",
    importance: "high",
    short: "§4.2 change never approved",
    headline: "§4.2 fails, and it fails on exactly the costs the change caused",
    description:
      "Drive control parameters — acceleration ramp and current limit — were " +
      "raised above the commissioned envelope on 2026-02-14 with no approval " +
      "record, and ESA §4.2 requires configuration changes to be approved in " +
      "writing before they take effect. The labour and the expedited freight " +
      "are downstream of that change, which is what makes them separable: the " +
      "original part carried a six-week lead time, so the $3,900 air freight is " +
      "the cost of recovering from the change rather than of the defect.",
    backs: "Labour + freight — $6,582.50",
    sources: ["Vault-PLM", "Sentinel", "SAP"],
    anchors: [EVIDENCE_ANCHORS.causeConfig, EVIDENCE_ANCHORS.policyFail],
  },
  {
    id: "sig-goodwill-headroom",
    importance: "medium",
    short: "Goodwill has room and a reason",
    headline: "Goodwill has both room and a reason",
    description:
      "Strategic tier, an ESA worth $2,340,000 a year to a 2027-09-02 renewal, " +
      "$312,000 of SLA credits already conceded year to date, and a credit " +
      "triggered by this 96-hour outage with no divert available. Against that, " +
      "$0 of goodwill has been extended to this account in twelve months — so " +
      "absorbing travel is a first concession on a strained relationship, not " +
      "the latest of several.",
    backs: "Travel — $1,240.00 absorbed",
    sources: ["Helios", "CRSC"],
    anchors: [EVIDENCE_ANCHORS.customerGoodwill, EVIDENCE_ANCHORS.customerCredits],
  },
  {
    id: "sig-renewal-exposure",
    importance: "high",
    short: "Renewal inside twelve months",
    headline: "A $2,340,000 agreement comes up for renewal inside the year",
    description:
      "Strategic tier, and the extended service agreement is worth $2,340,000 a " +
      "year to a renewal on 2027-09-02 — inside twelve months, which is when the " +
      "account team opens the conversation and when this claim stops being a " +
      "claim and becomes something the customer brings to a negotiation. Set " +
      "against that, the whole claim is $16,272.50. What the decision turns on is " +
      "therefore not only who pays: a defensible split signed today costs a " +
      "fraction of what a contested denial costs at renewal, and the 96 hours " +
      "already lost are the part that will be remembered either way.",
    backs: "$16,272.50 against $2.34M a year",
    sources: ["Helios", "CRSC"],
    anchors: [EVIDENCE_ANCHORS.customerRenewal, EVIDENCE_ANCHORS.customerValue],
  },
];

/**
 * How many signals sit at each rank.
 *
 * Derived rather than written down, so adding a signal above changes the count
 * the widget prints without anybody editing a second place — the rule this app
 * follows for `CLAIM_TOTAL` in ./coverage-decision.ts, for the same reason.
 */
export function signalTally(
  signals: DecisionSignal[] = DECISION_SIGNALS,
): Record<SignalImportance, number> {
  return signals.reduce(
    (acc, s) => ({ ...acc, [s.importance]: acc[s.importance] + 1 }),
    { high: 0, medium: 0, low: 0 } as Record<SignalImportance, number>,
  );
}
