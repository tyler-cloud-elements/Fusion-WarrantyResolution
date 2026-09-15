import { CASE_DOCUMENTS, type CaseDocument } from "./case-documents";
import { DECISION_SIGNALS, type DecisionSignal } from "./decision-signals";
import { PRECEDENT, type Precedent } from "./precedent";

/**
 * THE DECISION PAGE'S SECTIONS, PER CASE.
 *
 * The warranty console's decision page grew three sections — Historical data,
 * Evidence and Documents — out of the assessment widget's three rollups, and the
 * move surfaced a problem the widget never had. The widget is one panel beside
 * three views of ONE case, so reading module data was honest: whichever view was
 * up, it was WR-2026-0417 and those were its signals. The decision page is a route
 * with a case id in it. Rendering the same three modules there would have put
 * WR-2026-0417's evidence, base rate and documents on WR-2026-0421's decision and
 * called them its own.
 *
 * So this is the indirection: three lookups, keyed by case.
 *
 * ## Real for one case, mock for the rest, and said out loud
 *
 * WR-2026-0417 returns the authored fixtures unchanged — it is the case the demo
 * is about, transcribed from the storyboard, and nothing here re-states it. The
 * other two decisions in the dataset get their own smaller sets, written to be
 * coherent with what those cases are about rather than generated: a recurrence
 * disposition and an engineering exception argue different things from a combined
 * cause, and filler with the right shape and the wrong words is worse than
 * nothing on a screen someone is going to project.
 *
 * They are deliberately SHORTER than 0417's. A demo has one case it dwells on,
 * and a supporting case that matched it fact for fact would invite the question of
 * why the tour did not use that one instead.
 *
 * ## Why the lookups live here and not on the case
 *
 * Everything else this page draws hangs off the app's own objects —
 * `action.folds`, `warrantyCase.standing`. These three do not, and that is on
 * purpose: their content is authored in this folder (`./decision-signals.ts`,
 * `./precedent.ts`, `./case-documents.ts`), which is cartographer's, and the
 * embedded app's data layer is upstream's. Threading them onto `CaseAction` would
 * mean extending upstream's types and demo fixtures to carry this repo's content,
 * on files upstream actively edits. The seam already runs this way — the console
 * imports `EVIDENCE_ANCHORS` and the stance context across it — and it runs one
 * way only.
 *
 * ## Anchors on the mock signals
 *
 * The mock sets point only at anchors those cases actually declare. Their actions
 * carry no `causes` and no `folds`, so the finding's anchors are not in their DOM
 * and a signal claiming `causeDefect` would scroll to nothing. They use `verdict`
 * where the action has a verdict line and otherwise declare no anchor at all,
 * which the spotlight reads as "nothing to point at" rather than as an error
 * (./anchor-sections.ts says why absence is a normal answer).
 *
 * **Authored and pure.** No clock, no counters, no reader state — the Signal
 * Collector is prerendered, and a value that differed between build and hydration
 * would be a mismatch.
 */

/** The case the demo is about. Everything else here is scaffolding around it. */
export const DEMO_CASE_ID = "WR-2026-0417";

// ── WR-2026-0421 · recurrence confirmed, closure gated ───────────────────────

const SIGNALS_0421: DecisionSignal[] = [
  {
    id: "sig-0421-recurrence",
    importance: "high",
    short: "Third failure, same subsystem",
    headline: "Three failures in one subsystem inside twelve months",
    description:
      "The sortation drive has failed three times since March, each time in the " +
      "same gearbox family and each time inside its rated term. Two were closed " +
      "as isolated faults. A third occurrence in the same subsystem is what the " +
      "case plan treats as a pattern rather than a coincidence, which is why " +
      "closure is gated on a person confirming it.",
    backs: "Escalate rather than close",
    sources: ["Fieldlink", "WT-9"],
    anchors: [],
  },
  {
    id: "sig-0421-batch",
    importance: "medium",
    short: "One supplier batch across all three",
    headline: "All three units trace to one supplier batch",
    description:
      "Serial ranges on the three failed drives fall inside a single production " +
      "batch shipped in 2025-08. That does not establish a manufacturing defect " +
      "on its own, but it is the fact that makes a quality referral worth " +
      "raising: a batch-level cause is actionable in a way three separate site " +
      "faults are not.",
    backs: "Quality referral, batch-level",
    sources: ["Vault-PLM"],
    anchors: [],
  },
  {
    id: "sig-0421-no-site-cause",
    importance: "low",
    short: "No site cause established",
    headline: "Nothing at the site explains the recurrence",
    description:
      "Duty cycle, ambient conditions and maintenance completion are all within " +
      "envelope for the period, and the operator logs carry no interventions on " +
      "the affected line. The absence of a site cause does not prove a product " +
      "cause; it removes the alternative that would have closed this locally.",
    backs: "No customer contribution charged",
    sources: ["Sentinel"],
    anchors: [],
  },
];

const PRECEDENT_0421: Precedent = {
  window: "Last 24 months",
  criteria: "third occurrence, same subsystem",
  shares: [
    { option: "partial", cases: 3 },
    { option: "full", cases: 14 },
    { option: "deny", cases: 1 },
  ],
};

const DOCUMENTS_0421: CaseDocument[] = [
  {
    id: "doc-0421-history",
    title: "Sortation line failure history",
    issuer: "Cobalt Ridge FieldLink",
    pages: 6,
    href: CASE_DOCUMENTS[1].href,
    readOff: "Three failures since March, all in the same gearbox family.",
  },
  {
    id: "doc-0421-batch",
    title: "Batch traceability extract",
    issuer: "Vault-PLM",
    pages: 2,
    href: CASE_DOCUMENTS[1].href,
    readOff: "All three serials inside one 2025-08 production batch.",
  },
  {
    id: "doc-0421-sop",
    title: "Warranty resolution SOP v3",
    issuer: "Cobalt Ridge Global Warranty Operations",
    pages: 18,
    href: CASE_DOCUMENTS[CASE_DOCUMENTS.length - 1].href,
    readOff: null,
  },
];

// ── WR-2026-0409 · engineering exception requested ───────────────────────────

const SIGNALS_0409: DecisionSignal[] = [
  {
    id: "sig-0409-outside-envelope",
    importance: "high",
    short: "Duty cycle above rated envelope",
    headline: "The cell has run above its rated duty cycle since commissioning",
    description:
      "The palletiser has averaged 118% of rated cycles per hour since it was " +
      "commissioned, which is outside the envelope the component ratings assume. " +
      "That is not a customer fault — the throughput was specified in the " +
      "original order — but it means the standard coverage test does not answer " +
      "the question, and an engineering view of the exception is what is being " +
      "asked for.",
    backs: "Exception, not a coverage call",
    sources: ["Sentinel", "SAP"],
    anchors: [],
  },
  {
    id: "sig-0409-spec-mismatch",
    importance: "medium",
    short: "Order spec exceeds component rating",
    headline: "The order specified a throughput the components were not rated for",
    description:
      "The as-sold configuration commits to a cycle rate above what the fitted " +
      "drive assembly is rated to sustain. Engineering owns whether that is " +
      "carried as a design concession or corrected in the installed base, and " +
      "neither answer is a warranty decision — which is precisely why this one " +
      "does not resolve itself.",
    backs: "Engineering owns the outcome",
    sources: ["Vault-PLM", "SAP"],
    anchors: [],
  },
];

const PRECEDENT_0409: Precedent = {
  window: "Last 18 months",
  criteria: "spec above component rating, engineering exception",
  shares: [
    { option: "partial", cases: 6 },
    { option: "full", cases: 5 },
    { option: "deny", cases: 0 },
  ],
};

const DOCUMENTS_0409: CaseDocument[] = [
  {
    id: "doc-0409-duty",
    title: "Duty cycle telemetry summary",
    issuer: "Sentinel",
    pages: 4,
    href: CASE_DOCUMENTS[1].href,
    readOff: "118% of rated cycles per hour, sustained since commissioning.",
  },
  {
    id: "doc-0409-order",
    title: "As-sold configuration sheet",
    issuer: "Cobalt Ridge Automation",
    pages: 3,
    href: CASE_DOCUMENTS[1].href,
    readOff: "Committed throughput exceeds the fitted assembly's rating.",
  },
  {
    id: "doc-0409-terms",
    title: "Cobalt Ridge warranty terms",
    issuer: "Cobalt Ridge Automation",
    pages: 12,
    href: CASE_DOCUMENTS[0].href,
    readOff: null,
  },
];

// ── The lookups ──────────────────────────────────────────────────────────────

/**
 * Every case with sections of its own.
 *
 * A map rather than a switch so the three lookups below cannot disagree about
 * which cases are covered — adding a case is one entry, not three.
 */
const BY_CASE: Record<
  string,
  { signals: DecisionSignal[]; precedent: Precedent; documents: CaseDocument[] }
> = {
  [DEMO_CASE_ID]: {
    signals: DECISION_SIGNALS,
    precedent: PRECEDENT,
    documents: CASE_DOCUMENTS,
  },
  "WR-2026-0421": {
    signals: SIGNALS_0421,
    precedent: PRECEDENT_0421,
    documents: DOCUMENTS_0421,
  },
  "WR-2026-0409": {
    signals: SIGNALS_0409,
    precedent: PRECEDENT_0409,
    documents: DOCUMENTS_0409,
  },
};

/**
 * The evidence behind a case's recommendation.
 *
 * An unknown case gets an EMPTY list, not the demo case's. The three sections
 * render nothing when their data is empty, which is the honest outcome for one of
 * the 38 generated background cases: they have no authored decision and inventing
 * one would put five paragraphs of argument under a case that has none. Those
 * cases carry no action either, so the page is not reachable for them today — this
 * is the answer for when one does.
 */
export function signalsForCase(caseId: string): DecisionSignal[] {
  return BY_CASE[caseId]?.signals ?? [];
}

/** How comparable claims went. `null` where the case has no authored base rate. */
export function precedentForCase(caseId: string): Precedent | null {
  return BY_CASE[caseId]?.precedent ?? null;
}

/** The papers the reading was taken from. Empty where there are none. */
export function documentsForCase(caseId: string): CaseDocument[] {
  return BY_CASE[caseId]?.documents ?? [];
}

/**
 * How many signals sit at each rank, for one case.
 *
 * The same derivation `signalTally` does in ./decision-signals.ts, taking the
 * case's own list — so a section header's "3 high" counts the signals actually
 * below it rather than the demo case's.
 */
export function signalTallyFor(signals: DecisionSignal[]): {
  high: number;
  medium: number;
  low: number;
} {
  return signals.reduce(
    (acc, s) => ({ ...acc, [s.importance]: acc[s.importance] + 1 }),
    { high: 0, medium: 0, low: 0 },
  );
}
