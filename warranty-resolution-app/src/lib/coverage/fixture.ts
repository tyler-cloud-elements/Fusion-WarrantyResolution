/**
 * THE COVERAGE DECISION'S OWN CONTENT — v3-local, on purpose.
 *
 * The evidence the reviewer marks, the agent's recommendation and its reason, and the
 * customer's claim history are authored HERE rather than read from the Signal
 * Collector's shared `_data/` modules. Those modules feed v1, v3 and the two other
 * consoles; this page's content diverged from theirs (three evidence items, a Deny
 * recommendation, a $5,000 ceiling), and editing the shared set would have moved
 * every other screen with it.
 *
 * The money and the agreement dates are NOT here. They come off the case and the
 * action in ./../warranty/demoData.ts — v3's own copy — so the claim total, the four
 * lines, the authority limit and the renewal all print from one place.
 *
 * Keyed by case. Only WR-2026-0417 is authored; every other case gets `null`, and the
 * page says so rather than dressing another case in this one's evidence.
 */

/**
 * How much weight an item of evidence carries — and one value that says it
 * carries none.
 *
 * **`not-relevant` is off the scale rather than the bottom of it.** The other
 * three are magnitudes; this one takes the item out of the reasoning. It exists
 * so the record can show that a reviewer looked at something and dismissed it,
 * which "low" does not say.
 *
 * **Nothing in the reassessment reads it, and that is deliberate for now.** The
 * rules in ../coverage/store.ts only ever test `importance === "high"`, so low,
 * medium and this are already indistinguishable to the agent — adding a branch
 * for it would be inventing a behaviour nobody has specified. It is on the
 * screen to show the affordance exists.
 */
export type Importance = "high" | "medium" | "low" | "not-relevant";
export type EvidenceCall = "approve" | "partial" | "deny";

export interface EvidenceItem {
  id: string;
  name: string;
  note: string;
  /**
   * What this item argues for, as a line of the claim.
   *
   * `null` on anything the reviewer adds without filling it in — it is one of the
   * two optional parts of the composer, and most added items will not have one.
   */
  backs: { label: string; amount: number } | null;
  /** Where it came from. Empty on an added item whose author did not say. */
  sources: string[];
  /**
   * NULLABLE, and that is the point of it being nullable.
   *
   * A row used to be created blank and filled in afterwards, which meant it had to
   * start on something — `medium` / `approve`. Those are judgements, this list
   * feeds the dock's recommendation, and neither had been made by anyone. An item
   * is now built in the composer and committed once, so "not yet decided" is a
   * state it can be in while it is being written, and the row draws no left rule
   * and no icon until somebody chooses.
   */
  importance: Importance | null;
  call: EvidenceCall | null;
  /**
   * True on rows the reviewer added on this screen.
   *
   * What it buys is the chip and the row's own actions: the agent's items are the
   * record and are not the reviewer's to edit or delete, and a list that let you
   * remove either would be one where "three items" stopped meaning anything.
   * Absent rather than `false` on the fixture's own rows — the question is who
   * added it, and the fixture is not a who.
   */
  addedByReviewer?: boolean;
  /**
   * True once the reviewer has changed this row's weight or call.
   *
   * Distinct from `addedByReviewer`, which says who FILED it: an agent's item the
   * reviewer re-weighted is still the agent's item, and still not the reviewer's
   * to delete. What this buys is the submit bar's count of what departs from the
   * agent's proposal — an edited row is a departure and there is otherwise no
   * record that it happened, because the row simply holds its new value.
   */
  touchedByReviewer?: boolean;
}

export const IMPORTANCE_OPTIONS: { value: Importance; label: string }[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
  // Last, under Low, because a reader scans this list as a ladder and this is
  // the step off the end of it. "Not relevant" rather than "None": `importance`
  // is nullable and `null` already means "nobody has answered yet" — the
  // dashed-rim placeholder on ../../components/coverage/LabelledSelect.tsx is
  // that state — so "None" would put two different facts in one word.
  { value: "not-relevant", label: "Not relevant" },
];

export const CALL_OPTIONS: { value: EvidenceCall; label: string }[] = [
  { value: "approve", label: "Approve" },
  { value: "partial", label: "Partially approve" },
  { value: "deny", label: "Deny" },
];

/**
 * The three resolutions, in the order the radios show them. `outcome` is the id the
 * action's options and Maestro use; `label` is the short form the dock has room for.
 */
export interface Resolution {
  outcome: string;
  label: string;
  note: string;
}

/**
 * `note` is the caption under each resolution, and it names WHO PAYS.
 *
 * **Static, and naming nobody.** These used to read "Cobalt Ridge funds it" and
 * "The customer funds it" — the vendor's own name in one of three captions, on a
 * screen that is already headed by the customer's name. A reader scanning three
 * options wants the shape of each outcome, not a cast list, and the name made the
 * three captions read as sentences about different subjects rather than as three
 * values of one field. Two words each, same grammar, no party named.
 *
 * They also have to survive a third of the row at the narrowest pane — three of
 * these share a line — which the long form did not: it truncated to "Cobalt Ridge
 * funds the…".
 *
 * `note` IS ALSO THE STRIP'S SECOND LINE. ../../components/coverage/decision/
 * DecisionSection.tsx prints `resolutionFor(recommended).note` under the agent's
 * position, so the line under "Deny coverage" reads "Waive to customer" too. That
 * is deliberate — one string for one fact — and it is the thing to check first if
 * either of these is ever reworded.
 */
export const RESOLUTIONS: Resolution[] = [
  { outcome: "Approved", label: "Approve", note: "Fund entirely" },
  { outcome: "Denied", label: "Deny", note: "Waive to customer" },
  {
    outcome: "PartialPlusGoodwill",
    label: "Approve partial + goodwill",
    note: "Split cost",
  },
];

export function resolutionFor(outcome: string): Resolution {
  return RESOLUTIONS.find((r) => r.outcome === outcome) ?? RESOLUTIONS[1];
}

export type MoreActionIcon = "evidence" | "customer" | "escalate" | "defer";

export interface MoreAction {
  id: string;
  label: string;
  note: string;
  icon: MoreActionIcon;
}

export const MORE_ACTIONS: MoreAction[] = [
  {
    id: "request-evidence",
    label: "Request evidence",
    note: "Ask the site for the maintenance history.",
    icon: "evidence",
  },
  {
    id: "ask-customer",
    label: "Ask the customer",
    note: "Put the unapproved change to M. Okafor-Reyes first.",
    icon: "customer",
  },
  {
    id: "escalate",
    label: "Escalate now",
    note: "Hand to VP Global Service, undecided.",
    icon: "escalate",
  },
  { id: "defer", label: "Defer 24h", note: "Buys a day. Deepens the SLA breach.", icon: "defer" },
];

/**
 * THE RATIONALE'S RAW MATERIAL — phrasings, not paragraphs.
 *
 * The reason field is not four stored strings that swap. It is five slots, most of
 * them holding the SAME point said at two or three lengths, and ../coverage/store.ts
 * picks a length per slot from how many other slots are filled. That is what makes
 * the paragraph evolve instead of accreting: weighting the renewal does not only add
 * a sentence, it also shortens the two above it.
 *
 * Authored here beside the evidence because every phrase names this case — clause
 * 4.2, the four cost lines, the $5,000 ceiling. The store assembles; the fixture
 * writes.
 *
 * The tiers, and what fills them (see `rationaleFor`):
 *
 *   pressure = renewal high (1) + reviewer evidence for approving (1) + signed (2)
 *
 *   0  the case as it opens         change.full   exclusion.opening
 *   1  one commercial point         change.full   exclusion.mid
 *   2  both, or a bare signature    change.tight  exclusion.mid
 *   3+ signed on top of a point     change.tight  exclusion.tight
 *
 * The commercial slots have their own axis: alone they are whole sentences, together
 * the renewal drops its hedge, and once the decision is SIGNED both collapse to
 * fragments that the store joins into one short sentence — the argument is over, so
 * the text stops arguing and records instead.
 */
export interface RationaleSlots {
  /** The unapproved change. Always present; it is the case. */
  change: { full: string; tight: string };
  /** What the clause does with it. `opening` is the untouched case. */
  exclusion: { opening: string; mid: string; tight: string };
  /** Which evidence row carries the renewal, and how it reads at each length. */
  renewalId: string;
  renewal: { alone: string; withRecord: string; signed: string };
  /** Appears when the reviewer files anything that argues for approving. */
  record: { full: string; signed: string };
  /**
   * One sentence per resolution, written only when the resolution in play is not
   * the agent's. A resolution with no entry writes nothing — which is how going
   * back to the recommendation returns the text to exactly what it was.
   */
  signature: Record<string, string>;
}

export interface CoverageFixture {
  recommendedOutcome: string;
  /**
   * The agent's reason, short, in its own voice — assembled from these rather than
   * written out, so the string the sheet opens with and the string a reassessment
   * produces cannot drift apart.
   */
  rationale: RationaleSlots;
  evidence: EvidenceItem[];
  /** This customer's claim history — the rows the case record does not carry. */
  history: [label: string, value: string][];
}

const FIXTURE_0417: CoverageFixture = {
  recommendedOutcome: "Denied",
  rationale: {
    change: {
      full: "Gearbox configuration was changed by the customer without written approval.",
      tight: "Gearbox configuration changed by the customer, unapproved.",
    },
    /**
     * THE CLAUSE STATES THE RULE; THE FIGURES STATE THE MONEY.
     *
     * These read "puts the labour and freight that followed outside cover", which
     * named the two cost lines the exclusion lands on. The split is already on the
     * screen — the Amount panel prints all four lines and who each one goes to —
     * so the prose was a second copy of a number, in a slot that has to stay true
     * across four lengths and every resolution the reviewer can pick. It now says
     * what the clause DOES, and the panel says what that costs.
     */
    exclusion: {
      opening:
        "Per Clause 4.2, unapproved configuration changes are not approved for " +
        "warranty claims.",
      mid: "Per Clause 4.2, unapproved configuration changes are not covered.",
      tight: "Clause 4.2 excludes unapproved changes.",
    },
    renewalId: "ev-renewal",
    renewal: {
      alone:
        "Renewal is 90 days out on a strategic account. This is a commercial " +
        "concern, not existing coverage.",
      withRecord:
        "Renewal 90 days out on a strategic account — a commercial concern, not coverage.",
      signed: "renewal 90 days out",
    },
    record: {
      full: "Record is clean: six claims in 24 months, all approved, none contested.",
      signed: "record clean",
    },
    signature: {
      PartialPlusGoodwill:
        "Signed partial: parts $3,980 covered, travel $960 as goodwill, labour and " +
        "freight with the customer. $4,940, inside the $5,000 ceiling.",
      Approved: "Signed in full at the $5,000 ceiling; the $3,185 above it is written off.",
      // Denied is the agent's own position on this case, so it never reaches here —
      // and it earns no clause anyway: going back to the recommendation should
      // return the paragraph to what it said before, not add a sentence saying so.
    },
  },
  evidence: [
    {
      id: "ev-defect",
      name: "Defect in warranty",
      note:
        "Failed at 30 of 60 rated months with a defect signature, not wear. Covered " +
        "subsystem, $0 deductible, term still running.",
      backs: { label: "Parts", amount: 3980 },
      sources: ["Fieldlink", "WT-9", "Vault-PLM"],
      importance: "high",
      call: "approve",
    },
    {
      id: "ev-change",
      name: "Unapproved change to controls",
      note:
        "Gearbox ramp and limit settings raised on 2026-02-14, without written " +
        "approval. This triggers Clause 4.2 — these can cause reliability issues " +
        "even if defects were not present.",
      backs: { label: "Labour + freight", amount: 3245 },
      sources: ["Vault-PLM", "Sentinel", "SAP"],
      importance: "high",
      call: "deny",
    },
    {
      id: "ev-renewal",
      name: "Renewal within 3 months",
      note:
        "$2.34M/yr agreement, renews 2026-11-30. $312K credits conceded this year, " +
        "96 hrs down, no goodwill in 12 months.",
      backs: { label: "Travel", amount: 960 },
      sources: ["Helios", "CRSC"],
      importance: "low",
      call: "approve",
    },
  ],
  history: [
    ["Claims filed, 24 months", "6 — all approved, none contested"],
    ["This asset", "First claim · 30 months in service"],
    ["SR-440 at this site", "2 claims across 14 installed units — both approved"],
  ],
};

export function coverageFixtureFor(caseId: string): CoverageFixture | null {
  return caseId === "WR-2026-0417" ? FIXTURE_0417 : null;
}
