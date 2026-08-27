// The bundled demo dataset.
//
// WR-2026-0417 and its evidence, decision options, agent recommendation,
// reassessment and execution trail are transcribed verbatim from the FUSION 2026
// storyboard, Act II scenes 13–16 — these are the exact words that appear on
// stage, so edit them only alongside the storyboard. WR-2026-0421 and
// WR-2026-0409 come from the scene-13 queue. The remaining 38 open cases are
// generated deterministically so the counts the talk track quotes hold up:
// 41 open, 3 needing a person, 38 progressing on their own.
//
// This dataset is the fallback whenever VITE_CASE_PROCESS_KEY is unset or the
// Maestro read fails. `caseService.ts` merges live instances over the top by id.

import { PRIMARY_STAGES } from "./casePlan";
import type {
  AgentSignal,
  CaseAction,
  OperationalInsights,
  PolicyCheck,
  PrecedentSlice,
  Priority,
  ReasoningOption,
  StageState,
  SuggestedReply,
  WarrantyCase,
} from "./types";

/**
 * Anchors every relative timestamp in this file.
 *
 * Captured at module load, NOT pinned to a fixed instant. A fixed instant looks
 * tidier but rots: the stored per-stage figures ("3 hr 12 min elapsed") stay put
 * while anything computed against real time drifts, so after a week on the shelf
 * the SLA rows and the activity feed contradict the header. Anchoring to load
 * keeps every relative figure — clocks, countdowns, "16 hr ago" — saying the
 * same thing on any day, which is what the demo actually needs.
 */
export const DEMO_NOW = new Date();

function minutesAgo(m: number): string {
  return new Date(DEMO_NOW.getTime() - m * 60_000).toISOString();
}

function daysAgo(d: number): string {
  return minutesAgo(d * 24 * 60);
}

function minutesFromNow(m: number): string {
  return new Date(DEMO_NOW.getTime() + m * 60_000).toISOString();
}

/**
 * The agreement, tested clause by clause against this claim.
 *
 * Seven checks, and the two that are not passes are the case: §4.2 fails on the
 * unapproved configuration change, and operator-error contribution is *open* —
 * nobody could run it, because the site never provided its maintenance history.
 * That distinction is load-bearing. An open check has not been decided against
 * the customer, which is why the rationale says the contribution is unestablished
 * rather than absent, and why no third cause is charged to anyone.
 */
const POLICY_CHECKS_0417: PolicyCheck[] = [
  {
    id: "pc-term",
    verdict: "pass",
    name: "Asset within agreement term",
    detail: "Failure 2026-03-09, agreement runs to 2027-09-02",
    source: "Helios",
  },
  {
    id: "pc-subsystem",
    verdict: "pass",
    name: "Failure within a covered subsystem",
    detail: "Induction conveyor drive, component 8400-DRV-GBX",
    source: "WT-9",
  },
  {
    id: "pc-rated-life",
    verdict: "pass",
    name: "Component within rated service life",
    detail: "30 of 60 months",
    source: "Vault-PLM",
  },
  {
    id: "pc-config",
    verdict: "fail",
    name: "Approved-configuration clause §4.2",
    detail: "Control parameters changed 2026-02-14. No written approval on record.",
    source: "Vault-PLM",
  },
  {
    id: "pc-parts",
    verdict: "pass",
    name: "Original-parts clause §6.1",
    detail: "Alternate 8400-DRV-GBX-45B fitted — form, fit and function validated",
    source: "Vault-PLM",
  },
  {
    id: "pc-evidence",
    verdict: "pass",
    name: "Evidence completeness",
    detail: "6 of 6 required items present",
    source: "Case",
  },
  {
    id: "pc-operator",
    verdict: "open",
    name: "Operator-error contribution",
    detail:
      "Not established — site maintenance history was not provided. This remains open at the point of decision.",
  },
];

/**
 * What the agent leaned on, in the order it matters.
 *
 * Five, not fifty: the rail is an argument, and an argument that lists
 * everything it touched is not one. Three carry the split itself, one prices
 * the goodwill, and the last is the one that says what is *not* being charged —
 * which is the signal a reviewer is most likely to disagree with, and so the
 * one most worth having on the list.
 */
const SIGNALS_0417: AgentSignal[] = [
  {
    id: "sig-combined-cause",
    importance: "high",
    short: "Two causes, neither sole",
    backs: "A split, not all-or-nothing",
    detail:
      "The policy test comes back 5 pass, 1 fail, 1 open — a defect inside its term and an unapproved configuration change, each proven, neither excluding the other. No coverage rule in the case plan resolves a combined cause, which is why the case escalated to a person rather than closing itself. A split by cause attribution is the only position that answers the finding as found: denial and full coverage each require treating one established cause as if it were not there.",
    sources: ["Case", "Helios"],
  },
  {
    id: "sig-defect-in-term",
    importance: "high",
    short: "Defect inside its rated term",
    backs: "Parts — $8,450.00 to us",
    detail:
      "The gearbox failed 30 months into a 60-month rated service life, with bearing race spalling consistent with a manufacturing defect and not with overload, contamination or missed lubrication. Established on site on 03-20, first-time fix confirmed. The component sits in a covered subsystem under an agreement that runs to 2027-09-02 with a $0 deductible, so nothing about the term or the scope stands in the way.",
    sources: ["FieldLink", "WT-9", "Vault-PLM"],
  },
  {
    id: "sig-unapproved-change",
    importance: "high",
    short: "§4.2 change never approved",
    backs: "Labour + freight — $6,582.50",
    detail:
      "Drive control parameters — acceleration ramp and current limit — were raised above the commissioned envelope on 2026-02-14 with no approval record, and ESA §4.2 requires configuration changes to be approved in writing before they take effect. The labour and the expedited freight are downstream of that change, which is what makes them separable: the original part carried a six-week lead time, so the $3,900 air freight is the cost of recovering from the change rather than of the defect.",
    sources: ["Vault-PLM", "Sentinel", "SAP"],
  },
  {
    id: "sig-goodwill-headroom",
    importance: "medium",
    short: "Goodwill has room and a reason",
    backs: "Travel — $1,240.00 absorbed",
    detail:
      "A strategic account at $184,000 a year, 96 hours down with no divert, and $312,000 of credits already issued this year against a budget that still has headroom. Travel and per diem is the smallest line on the claim and the one least attributable to either cause, which makes it the right one to absorb: it reads as a gesture rather than as a concession on the coverage argument.",
    sources: ["SAP", "Case"],
  },
  {
    id: "sig-operator-error-open",
    importance: "low",
    short: "Operator error left open",
    backs: "No third cause charged",
    detail:
      "Site maintenance history was never provided, so operator-error contribution could not be tested and stays open at the point of decision. It is on the record as unestablished rather than dismissed — nothing has been charged to the customer on account of it, and if the history arrives later this is the check that would reopen the split.",
    sources: ["—"],
  },
];

/**
 * How comparable cases went. Sixty percent agree is not an endorsement — it is
 * also forty percent who did something else, which is why the two dissenting
 * positions are listed with their counts rather than rolled into "other".
 */
const PRECEDENT_0417: PrecedentSlice[] = [
  { outcome: "PartialPlusGoodwill", label: "Partial coverage", cases: 24 },
  { outcome: "Approved", label: "Full coverage", cases: 10 },
  { outcome: "Denied", label: "Denial", cases: 6 },
];

/**
 * The objections worth raising, per position.
 *
 * `forOptions` is what stops these reading as a generic feedback widget. Moving
 * to denial and moving to full coverage are opposite mistakes, and the thing an
 * agent should offer to hear about each is different: against a denial, that the
 * change was causal; against full coverage, that operator error was never
 * established. A chip that fits every position fits none of them.
 */
const REPLIES_0417: SuggestedReply[] = [
  {
    id: "cr-which-rule-freight",
    kind: "ask-back",
    label: "Which rule moves the freight?",
    body: "Which rule puts freight on the customer? The policy test cites the configuration change, but I cannot see the rule that moves freight specifically — and I have to name it in the rationale.",
    answer:
      "ESA §4.2 itself — it voids cover for what an unapproved change causes, and the expedite is downstream of the change: the approved part carried a six-week lead time, so the $3,900 air freight only exists because the failure happened when it did. There is no freight-specific rule, and if you need one named in the rationale, §4.2 is the one to cite.",
  },
  {
    id: "cr-prior-goodwill",
    kind: "missing-context",
    label: "Prior goodwill on this site",
    body: "Travel has been absorbed at this site before and was never recorded as a concession, so this is not a first gesture.",
    answer:
      "The headroom I tested against was wrong, then. If travel has already been absorbed here and never recorded, this is not a first goodwill gesture and I should not have priced it as one.",
    forOptions: ["Denied", "PartialPlusGoodwill"],
  },
  {
    id: "cr-change-was-causal",
    kind: "disagree",
    label: "The change caused it, not a defect",
    body: "Raising the acceleration ramp and the current limit above the commissioned envelope is what broke this gearbox. Bearing race spalling is what an over-driven drive does. Thirty months into a sixty-month life is not evidence of a defect when the duty it was run at was changed four weeks earlier.",
    answer:
      "Taken as causal rather than contributing, the defect finding does not hold up on its own — a rated life means the duty it was rated for, and that changed in February.",
    forOptions: ["Denied"],
  },
  {
    id: "cr-site-knew",
    kind: "disagree",
    label: "The site made the change knowingly",
    body: "The site changed the drive parameters without asking, and knew the approval requirement. That is not a shared cause — it is the customer's cause.",
    answer:
      "If the requirement was known and the change was made anyway, that reads as acceptance of the risk rather than an oversight, and it weakens the case for absorbing the travel as goodwill.",
    forOptions: ["Denied"],
  },
  {
    id: "cr-operator-error-open",
    kind: "disagree",
    label: "Operator error isn't established",
    body: "The unapproved configuration change is on the record, but nobody has established that it caused the failure — there is no maintenance history for the period and no engineering finding. Moving labour and freight to the customer on a contribution that is still open puts the whole split on something we have not proved.",
    answer:
      "You're right that the contribution is still open. §4.2 does not require the change to be proven causal, only unapproved — but if you want the split to rest on cause rather than clause, that is a different argument and the labour is the line it turns on.",
    forOptions: ["Approved"],
  },
];

// ── The hero case: WR-2026-0417 ─────────────────────────────────────────────

const CASE_0417: WarrantyCase = {
  id: "WR-2026-0417",
  instanceId: "",
  folderKey: "",
  customer: "Northstar Retail Distribution",
  customerSegment: "Strategic",
  site: "Joliet DC · Line 3 / Induct",
  asset: {
    model: "SR-440",
    serial: "SR440-2023-1147",
    description: "Induction drive gearbox · Line 3 / Induct",
    inServiceMonths: 30,
    warrantyStatus:
      "Extended Service Agreement NRD-ESA-2024-0219 · active to 2027-09-02 · deductible $0.00",
    identityConfirmed: true,
  },
  priority: "P1",
  status: "Action required",
  // Storyboard 26 Aug moved this case to Resolution decision — scenes 19, 21
  // and 22 all agree, and scene 22's Global variables source Coverage.Position
  // from Resolution decision. The console mock still labels the stage "Coverage
  // and evidence review"; the storyboard is the script, so it wins.
  currentStage: "Resolution decision",
  activeLanes: [],
  owner: "Sarah Chen",
  ownerRole: "Warranty Resolution Lead",
  description: "Coverage disputed — combined cause finding",
  queueReason: "No rule resolves a combined cause",
  claimValue: 16272.5,
  lineStatus: "Down · no divert",
  // How long the customer's line has been down — the talk track's number, and a
  // different clock from the case's own. The line failed four days ago; the
  // claim reached us twelve hours ago, which is where this case starts.
  lineDownHours: 96,
  // Just before the first entry in the trail below (11 hr 40 min ago).
  //
  // It used to be 96 hours, borrowed from the line-down figure, which put the
  // case three days past its 24-hour P1 budget and stamped BREACHED on a case
  // whose every other clock is green — including the header two lines up, which
  // reads "2 hr 13 min left". Nothing on the case happened in that window
  // either: its earliest event is 11 hr 40 min old.
  openedAt: minutesAgo(11 * 60 + 45),
  lastUpdatedAt: minutesAgo(12),
  slaMinutes: 4 * 60,
  elapsedMinutes: 4 * 60 - 133,
  slaStatus: "At risk",
  stageStates: {
    s1: "completed",
    s2: "completed",
    s3: "completed",
    s4: "active",
    s5: "pending",
    s6: "pending",
  },
  // The seven documents in docs/ixp-warranty-documents/, with what IXP read off each.
  // `inferred: true` marks the values stated nowhere in the document that had to
  // be derived — the ones the whole case turns on, and the ones a reviewer is
  // actually checking. One field is deliberately empty: the duration at the
  // raised thermal threshold is not established, and a model returning nothing
  // there is the right answer.
  evidence: [
    {
      id: "ev-0417-1",
      kind: "pdf",
      title: "Third-party service report",
      verdict: "Non-approved part · 3 controls changed · no OEM authorisation",
      issuer: "Meridian Industrial Services",
      reference: "W/O MIS-44182",
      pages: 2,
      fileUrl: "documents/third-party-service-report.pdf",
      body:
        "Meridian replaced the main sort drive on 6 April 2026 after the customer reported intermittent stoppages and overtemp faults. The OEM unit was quoted at a three-week lead time, so the customer authorised substitution with an \"equivalent unit\" from Meridian's stock — an Altek AD-5500-HD, fitted with a 6mm adapter plate fabricated on site.\n\nThe replacement would not hold the existing acceleration profile, so three controls parameters were raised. The technician recorded that full OEM commissioning was NOT performed, and noted twice that raising the thermal cutback is a stopgap and the root cause of the original overheating was never established.",
      table: {
        columns: ["Parameter", "Was", "Set to", "Reason"],
        rows: [
          ["ACCEL_RAMP_MS", "420", "610", "Reduce inrush on start"],
          ["CURRENT_LIM_PCT", "115", "135", "Prevent nuisance trip at divert"],
          ["THERM_CUTBACK_C", "68", "82", "Substitute unit runs warmer by spec"],
        ],
      },
      extracted: [
        { label: "Vendor", value: "Meridian Industrial Services", confidence: 99 },
        { label: "Work order", value: "MIS-44182", confidence: 99 },
        { label: "Date of service", value: "6 April 2026", confidence: 98 },
        {
          label: "Removed part",
          value: "CR-DRV-4410-B (Rev B) · s/n 4410B-22781",
          confidence: 97,
        },
        {
          label: "Installed part",
          value: "Altek AD-5500-HD · s/n AD55-91043",
          confidence: 97,
        },
        {
          label: "Is the installed drive an approved part?",
          value: "No",
          inferred: true,
          confidence: 91,
          source:
            'Work order calls it an "equivalent unit"; terms clause 3.2 excludes components described as equivalent or compatible. Neither document answers it alone.',
        },
        {
          label: "Was the third-party work authorised?",
          value: "No",
          inferred: true,
          confidence: 88,
          source:
            "No authorisation field exists on any document. Derived from the service history recording that no request was received, read against clause 4.1.",
        },
        { label: "Full validation performed", value: "No", confidence: 96 },
        { label: "Non-approved part cost", value: "$11,480.00 of $13,307.50", confidence: 94, source: "Read from the parts table, not the summary line." },
        { label: "Parts subtotal", value: "$11,820.00", confidence: 95 },
        { label: "Labour subtotal", value: "$1,487.50 · 8.5 hr", confidence: 95 },
      ],
      addedAt: minutesAgo(6 * 60),
      addedBy: "Customer submission",
      helpful: true,
    },
    {
      id: "ev-0417-2",
      kind: "pdf",
      title: "Installed asset service history",
      verdict: "Open finding SF-2026-0114 predates the third-party work",
      issuer: "Cobalt Ridge Automation · Installed Base Records",
      reference: "CRA-SR440-2113-0087",
      pages: 2,
      fileUrl: "documents/installed-asset-service-history.pdf",
      body:
        "Six visits since commissioning on 14 September 2024. Visit 4, on 18 January 2026, recorded an open finding: main sort drive case temperature at 64C under sustained load against a nominal 52–58C for this duty, with no fault codes and no line stop. Site was advised to monitor and check bay ventilation; a thermal survey within ninety days was recommended and never happened.\n\nVisit 5 is not a Cobalt Ridge visit. It records, from a customer email of 9 April, that a contract maintenance provider replaced the drive and adjusted controls. No prior authorisation request was received.",
      extracted: [
        { label: "Asset serial", value: "CRA-SR440-2113-0087", confidence: 99 },
        { label: "Commissioned", value: "14 September 2024", confidence: 99 },
        {
          label: "Warranty expiry",
          value: "14 September 2026",
          inferred: true,
          confidence: 96,
          source:
            "Derivable from the commissioning date plus the 24-month term in clause 1.1 — and stated outright here, so the derived value can be cross-checked.",
        },
        { label: "Open finding", value: "SF-2026-0114 · 18 January 2026", confidence: 98 },
        { label: "Finding detail", value: "Drive case 64C vs 52–58C nominal", confidence: 95 },
        {
          label: "Did the thermal condition predate the third-party work?",
          value: "Yes — by 78 days",
          inferred: true,
          confidence: 93,
          source:
            "Finding dated 18 January against third-party service on 6 April. This is what makes the answer partial coverage rather than a clean denial.",
        },
        { label: "Authorisation request received", value: "None", confidence: 97 },
      ],
      addedAt: minutesAgo(5 * 60 + 50),
      addedBy: "Assemble warranty and service evidence",
      helpful: true,
    },
    {
      id: "ev-0417-3",
      kind: "pdf",
      title: "Cobalt Ridge warranty terms",
      verdict: "Clause 3.2 and clause 4.1 both engaged",
      issuer: "Cobalt Ridge Automation",
      reference: "Clause-numbered T&Cs",
      pages: 2,
      fileUrl: "documents/cobalt-ridge-warranty-terms.pdf",
      body:
        "Clause 1.1 sets a twenty-four month term from commissioning. Clause 3.1 covers component failure within the term. Clause 3.2 states that components described as \"equivalent\" or \"compatible\" are specifically not approved parts. Clause 4.1 requires written authorisation before a drive replacement.",
      extracted: [
        { label: "Warranty term", value: "24 months from commissioning", source: "Clause 1.1", confidence: 99 },
        { label: "Component failure covered", value: "Yes, within term", source: "Clause 3.1", confidence: 98 },
        {
          label: "Equivalent parts approved?",
          value: "No — specifically excluded",
          source: "Clause 3.2",
          confidence: 98,
        },
        {
          label: "Prior written authorisation required?",
          value: "Yes, before drive replacement",
          source: "Clause 4.1",
          confidence: 98,
        },
      ],
      addedAt: minutesAgo(5 * 60 + 40),
      addedBy: "Assemble warranty and service evidence",
      helpful: null,
    },
    {
      id: "ev-0417-4",
      kind: "pdf",
      title: "Returned part inspection",
      verdict: "Preliminary — no common failure mechanism established",
      issuer: "Cobalt Ridge Component Analysis Laboratory",
      reference: "CAL-2026-0731 · RMA CRA-RMA-2026-0442",
      pages: 3,
      fileUrl: "documents/returned-part-inspection.pdf",
      body:
        "Unit 4 of 4 in the open review of thermal failures across the SR-440 drive family. All four returned units show the same discoloration in the same location and elevated junction resistance against a new reference, though none exceeds the rejection limit individually. Three of the four came from sites where aisle ambient exceeded 27C during the failure period.\n\nThe analyst is explicit that the evidence does not yet separate a component-attributable cause from an installation-and-environment one, and that no conclusion should be drawn from this report alone.",
      table: {
        columns: ["Measurement", "This unit", "Units 1–3", "New reference"],
        rows: [
          ["Thermal interface thickness (mm)", "0.31", "0.28 – 0.34", "0.25 nominal"],
          ["Heatsink flatness deviation (mm)", "0.04", "0.03 – 0.06", "< 0.08 spec"],
          ["Junction resistance (mOhm)", "4.7", "4.4 – 5.1", "3.9 typical"],
          ["Fan free-run (rpm)", "3,180", "3,110 – 3,240", "3,200 nominal"],
        ],
      },
      extracted: [
        { label: "Report", value: "CAL-2026-0731 · issued 21 April 2026", confidence: 99 },
        { label: "Sample position", value: "Unit 4 of 4", confidence: 98 },
        { label: "Disposition", value: "HOLD", confidence: 97 },
        {
          label: "Common failure mechanism established?",
          value: "No — sample too small, confounded by ambient",
          inferred: true,
          confidence: 86,
          source:
            "Derived from the observations and the analyst comment; the report states no conclusion outright.",
        },
        {
          label: "Duration at raised thermal threshold",
          value: "",
          inferred: true,
          source:
            "The report says the duration is not established. Nothing to extract — this is the negative case, and the one most likely to produce a confident hallucination.",
        },
      ],
      addedAt: minutesAgo(5 * 60 + 20),
      addedBy: "Quality / Reliability",
      helpful: null,
    },
    {
      id: "ev-0417-5",
      kind: "pdf",
      title: "Warranty claim intake email",
      verdict: "P1 · line down 6:40, carrier cutoffs at risk",
      issuer: "Northstar Retail Distribution",
      reference: "Captured to WR-2026-0417",
      pages: 2,
      fileUrl: "documents/warranty-claim-intake-email.pdf",
      body:
        "Tobias Okafor, Maintenance Supervisor at the Joliet DC, reporting the main sort line stopped at about 6:40 during the peak outbound wave. Operators report the same overtemp fault seen on and off, then a hard stop that would not reset. Trailers staged, hand sorting at roughly fifteen percent of rate, carrier cutoffs missed by ten o'clock.\n\nStates a full day down at this building runs to roughly $275,000 in expedite and penalty costs.",
      extracted: [
        { label: "Reported by", value: "Tobias Okafor · Maintenance Supervisor", confidence: 99 },
        { label: "Reported failure time", value: "17 April 2026, ~06:40 CDT", confidence: 96 },
        { label: "Site", value: "Joliet Distribution Center", confidence: 99 },
        { label: "Claimed daily exposure", value: "$275,000", confidence: 94 },
        {
          label: "Impact tier",
          value: "P1 — line down, no divert",
          inferred: true,
          confidence: 92,
          source:
            "No tier is stated. Derived from the full stop, the staged trailers and the carrier-cutoff deadline.",
        },
        {
          label: "Is this the same fault as the open finding?",
          value: "Consistent — same overtemp signature",
          inferred: true,
          confidence: 79,
          source: "Reported fault read against SF-2026-0114. Consistent, not proven.",
        },
      ],
      addedAt: minutesAgo(11 * 60 + 30),
      addedBy: "Support portal",
      helpful: null,
    },
    {
      id: "ev-0417-6",
      kind: "pdf",
      title: "Warranty resolution SOP v3",
      verdict: "Governs this decision",
      issuer: "Cobalt Ridge Automation",
      reference: "SOP v3",
      pages: 3,
      fileUrl: "documents/warranty-SOP-v3.pdf",
      body:
        "The internal procedure governing warranty resolution — evidence requirements, authority thresholds, and the route each coverage position takes.",
      extracted: [
        { label: "Applies to", value: "Warranty resolution, all impact tiers", confidence: 97 },
        { label: "Version", value: "v3", confidence: 99 },
      ],
      addedAt: minutesAgo(5 * 60),
      addedBy: "Policy library",
      helpful: null,
    },
    {
      id: "ev-0417-7",
      kind: "pdf",
      title: "Claim evidence packet (combined)",
      verdict: "3 documents in one file, unsplit",
      issuer: "Northstar Retail Distribution",
      reference: "As submitted",
      pages: 7,
      fileUrl: "documents/claim-evidence-packet-combined.pdf",
      body:
        "Three separate documents submitted as a single file with no separator pages — which is how customers actually send evidence. Split and classified on ingest rather than pre-processed by hand.",
      extracted: [
        { label: "Documents detected", value: "3", inferred: true, confidence: 95, source: "Split on layout and header change; no separator pages present." },
        { label: "Total pages", value: "7", confidence: 99 },
      ],
      addedAt: minutesAgo(11 * 60 + 20),
      addedBy: "Customer submission",
      helpful: null,
    },
  ],
  trail: [
    {
      seq: 1,
      actor: "event",
      actorLabel: "EVT",
      step: "New customer photos uploaded to the case",
      stage: "Intake",
      time: "09:14 AM",
    },
    {
      seq: 2,
      actor: "agent",
      actorLabel: "AG",
      step: "Case manager: checks photos against the combined-cause finding",
      stage: "Resolution decision",
      time: "09:14 AM",
    },
    {
      seq: 3,
      actor: "agent",
      actorLabel: "AG",
      step: "Case manager: selects route to engineering exception, confidence high",
      stage: "Resolution decision",
      time: "09:15 AM",
    },
    {
      seq: 4,
      actor: "human",
      actorLabel: "HT",
      step: "Miguel confirms the cause before coverage is finalized",
      stage: "Engineering exception",
      time: "09:41 AM",
    },
  ],
  variables: {
    "Case.Id": "WR-2026-0417",
    "Asset.Id": "SR-440",
    "Coverage.Position": "Partial + goodwill",
    "Recurrence.Count": 4,
  },
  caseManagerMode: "hybrid",
  activity: [
    {
      id: "a-0417-1",
      category: "task",
      level: "stage",
      actor: "Case manager",
      title: "Case created from a customer outage report",
      detail: "Northstar Retail Distribution · Joliet DC sortation line 3",
      time: minutesAgo(11 * 60 + 40),
      stage: "Intake and impact triage",
    },
    {
      id: "a-0417-2",
      category: "task",
      level: "task",
      actor: "Automation",
      title: "Identify installed asset",
      detail: "SR-440 drive · SN 4471-882 matched in the installed base",
      time: minutesAgo(11 * 60 + 34),
      stage: "Intake and impact triage",
    },
    {
      id: "a-0417-3",
      category: "human",
      level: "task",
      actor: "Tom Beckerman",
      title: "Classify customer impact",
      detail: "P1 — production line down, 11 hours and counting",
      time: minutesAgo(11 * 60 + 2),
      stage: "Intake and impact triage",
      hitl: [
        { kind: "assigned", actor: "Tom Beckerman", time: minutesAgo(11 * 60 + 30) },
        { kind: "completed", actor: "Tom Beckerman", time: minutesAgo(11 * 60 + 2) },
      ],
    },
    {
      id: "a-0417-4",
      category: "agent",
      level: "task",
      actor: "Evidence agent",
      title: "Preserve and summarize initial evidence",
      detail: "Telemetry window, alarm history and the service record pulled and summarised",
      time: minutesAgo(10 * 60 + 50),
      stage: "Intake and impact triage",
    },
    {
      id: "a-0417-5",
      category: "rules",
      level: "milestone",
      actor: "Case manager",
      title: "Intake and impact triage completed",
      detail: "Required tasks completed — coverage and containment start in parallel",
      time: minutesAgo(10 * 60 + 40),
      stage: "Intake and impact triage",
    },
    {
      id: "a-0417-6",
      category: "rules",
      level: "stage",
      actor: "Case manager",
      title: "Entered Coverage and evidence review",
      detail: "Global Warranty Operations · 4 hr clock",
      time: minutesAgo(4 * 60 + 40),
      stage: "Coverage and evidence review",
    },
    {
      id: "a-0417-7",
      category: "task",
      level: "task",
      actor: "Automation",
      title: "Assemble warranty and service evidence",
      detail: "3 documents retrieved from the warranty and service systems",
      time: minutesAgo(4 * 60 + 30),
      stage: "Coverage and evidence review",
    },
    {
      id: "a-0417-8",
      category: "agent",
      level: "task",
      actor: "Evidence agent",
      title: "Flag missing and conflicting facts",
      detail:
        "Two established causes point to different payers — no rule resolves a combined cause",
      time: minutesAgo(3 * 60 + 58),
      stage: "Coverage and evidence review",
    },
    {
      id: "a-0417-9",
      category: "ai",
      level: "milestone",
      actor: "Case manager",
      title: "Routed to a person for the coverage position",
      detail:
        "Allocating between two causes sits inside the resolution lead's delegated authority",
      time: minutesAgo(3 * 60 + 12),
      stage: "Coverage and evidence review",
      actionId: "coverage-decision",
    },
  ],
  comments: [
    {
      author: "Tom Beckerman",
      role: "Claims Administrator",
      time: minutesAgo(9 * 60),
      text: "Site confirmed the line is fully down, not degraded. Treating as P1 for the clock.",
    },
    {
      author: "Miguel Alvarez",
      role: "Reliability and Controls Engineer",
      time: minutesAgo(3 * 60 + 40),
      text: "The torque increase is real but it isn't the sole cause — the bearing was already failing early. Happy to look again if new evidence lands.",
    },
  ],
  isLive: false,
};

/**
 * Scene 15's mid-case event, kept separate so the demo can fire it on demand
 * rather than showing the case as already reassessed.
 *
 * Carries no case id on purpose. It was written around WR-2026-0417, but the
 * button that fires it applies it to whichever case is open — a case read from
 * Maestro has a live id, and an authored id here only invited the event to be
 * filed against a case nobody is looking at.
 */
export const EVIDENCE_UPLOAD_EVENT = {
  document: {
    // Deliberately not in the ev-0417-N sequence: this document arrives at run
    // time, and a sequential id would collide the moment the authored set grows.
    id: "ev-0417-upload-photos",
    kind: "zip" as const,
    title: "customer-photos-sr440.zip",
    verdict: "Customer-submitted photos of the failed drive",
    body:
      "The customer uploads new photos through the portal. It behaves the same way new proof-of-loss evidence does when it lands on an insurance claim mid-case.",
    addedAt: minutesAgo(2),
    addedBy: "Northstar Retail Distribution (portal)",
    isNew: true,
    helpful: null,
  },
  reassessment: {
    trigger: "Customer-submitted photos of the failed drive",
    headline: "Coverage position may no longer hold",
    detail:
      "Nobody routed this. The upload event woke the case agent, which checked the new photos against Sarah's combined-cause finding and flagged that the wear pattern no longer clearly supports it.",
    confidence: "high" as const,
    recommendedOutcome:
      "Send to engineering to re-examine cause before the coverage position is finalized",
    evidenceBasis: ["Combined-cause finding", "New customer photos", "Wear-pattern delta"],
  },
};

// ── The other two cases in the queue ────────────────────────────────────────

const CASE_0421: WarrantyCase = {
  id: "WR-2026-0421",
  instanceId: "",
  folderKey: "",
  customer: "Northstar Retail Distribution",
  site: "Joliet DC · sortation line 1",
  asset: {
    model: "SR-440 drive",
    serial: "4471-903",
    description: "Conveyor sortation drive, line 1 head pulley",
    inServiceMonths: 9,
    warrantyStatus: "Under warranty",
  },
  priority: "P2",
  status: "Action required",
  currentStage: "Close and learn",
  activeLanes: ["Product-quality escalation"],
  owner: "Ryan Ochoa",
  ownerRole: "Product Quality Lead",
  description: "Repeat-failure pattern needs a human call",
  queueReason: "Recurrence confirmed, gates closure",
  claimValue: 12750,
  openedAt: daysAgo(9),
  lastUpdatedAt: minutesAgo(96),
  slaMinutes: 24 * 60,
  elapsedMinutes: 19 * 60,
  slaStatus: "At risk",
  stageStates: {
    s1: "completed",
    s2: "completed",
    s3: "completed",
    s4: "completed",
    s5: "completed",
    s6: "active",
    sx4: "active",
  },
  evidence: [
    {
      id: "ev-0421-1",
      kind: "pdf",
      title: "Recurrence scan — SR-440 drive family",
      verdict: "4 related failures in 12 months",
      body:
        "Four SR-440 bearing failures across three customers inside twelve months, all within the first 18 months of service. Three share the same supplier lot. The v2 recurrence gate holds closure until this is reviewed.",
      addedAt: minutesAgo(180),
      addedBy: "Detect recurrence and severity",
      helpful: null,
    },
  ],
  trail: [
    {
      seq: 1,
      actor: "agent",
      actorLabel: "AG",
      step: "Recurrence scan: 4 related failures found on the SR-440 drive family",
      stage: "Close and learn",
      time: "10:12 AM",
    },
    {
      seq: 2,
      actor: "agent",
      actorLabel: "AG",
      step: "Recurrence gate holds closure, enters Product-quality escalation",
      stage: "Close and learn",
      time: "10:12 AM",
    },
  ],
  variables: {
    "Case.Id": "WR-2026-0421",
    "Asset.Id": "SR-440",
    "Coverage.Position": "Approved",
    "Recurrence.Count": 4,
  },
  caseManagerMode: "hybrid",
  activity: [
    {
      id: "a-0421-1",
      category: "rules",
      level: "stage",
      actor: "Case manager",
      title: "Entered Close and learn",
      detail: "Quality / Reliability · 1 business day",
      time: minutesAgo(19 * 60),
      stage: "Close and learn",
    },
    {
      id: "a-0421-2",
      category: "task",
      level: "task",
      actor: "Automation",
      title: "Reconcile coverage and actual cost",
      detail: "Covered and actual cost reconciled — no open items",
      time: minutesAgo(6 * 60),
      stage: "Close and learn",
    },
    {
      id: "a-0421-3",
      category: "agent",
      level: "task",
      actor: "Recurrence agent",
      title: "Detect recurrence and severity",
      detail: "4 related SR-440 bearing failures in 12 months; 3 share a supplier lot",
      time: minutesAgo(180),
      stage: "Close and learn",
    },
    {
      id: "a-0421-4",
      category: "rules",
      level: "milestone",
      actor: "Case manager",
      title: "Recurrence gate held closure",
      detail: "relatedFailures >= 4 — entered Product-quality escalation (case plan v2)",
      time: minutesAgo(178),
      stage: "Close and learn",
      actionId: "quality-disposition",
    },
    {
      id: "a-0421-5",
      category: "rules",
      level: "stage",
      actor: "Case manager",
      title: "Entered Product-quality escalation",
      detail: "Quality / Reliability · before case closure",
      time: minutesAgo(176),
      stage: "Product-quality escalation",
    },
  ],
  comments: [
    {
      author: "Ryan Ochoa",
      role: "Product Quality Lead",
      time: minutesAgo(120),
      text: "Pulling the lot trace before I disposition this. If three of four share a lot it's a supplier conversation, not a one-off.",
    },
  ],
  isLive: false,
};

const CASE_0409: WarrantyCase = {
  id: "WR-2026-0409",
  instanceId: "",
  folderKey: "",
  customer: "Northstar Retail Distribution",
  site: "Columbus DC · palletiser cell 2",
  asset: {
    model: "PX-210 palletiser",
    serial: "2109-114",
    description: "Palletiser gantry axis drive",
    inServiceMonths: 22,
    warrantyStatus: "Under warranty",
  },
  priority: "P2",
  status: "Action required",
  currentStage: "Diagnose and contain",
  activeLanes: ["Engineering exception"],
  owner: "Miguel Alvarez",
  ownerRole: "Reliability and Controls Engineer",
  description: "Engineering sign-off on a spec deviation",
  queueReason: "Repair exceeds standard spec",
  claimValue: 24900,
  lineStatus: "Degraded",
  openedAt: daysAgo(2),
  lastUpdatedAt: minutesAgo(48),
  slaMinutes: 4 * 60,
  elapsedMinutes: 2 * 60 + 20,
  slaStatus: "On track",
  stageStates: {
    s1: "completed",
    s2: "completed",
    s3: "active",
    s4: "pending",
    s5: "pending",
    s6: "pending",
    sx2: "active",
  },
  evidence: [
    {
      id: "ev-0409-1",
      kind: "pdf",
      title: "Repair scope estimate",
      verdict: "Exceeds standard spec",
      body:
        "The proposed gantry axis repair replaces the rail carriage with a heavier-duty variant not on the approved parts list for this configuration. Equivalence has not been established, so BR-006 sends it to Engineering before a route can be authorised.",
      addedAt: minutesAgo(140),
      addedBy: "Define cause and repair scope",
      helpful: null,
    },
  ],
  trail: [
    {
      seq: 1,
      actor: "human",
      actorLabel: "HT",
      step: "Field Service records repair scope beyond approved spec",
      stage: "Diagnose and contain",
      time: "11:04 AM",
    },
    {
      seq: 2,
      actor: "agent",
      actorLabel: "AG",
      step: "Case manager: routes to Engineering exception, confidence high",
      stage: "Diagnose and contain",
      time: "11:05 AM",
    },
  ],
  variables: {
    "Case.Id": "WR-2026-0409",
    "Asset.Id": "PX-210",
    "Coverage.Position": "Approved",
    "Recurrence.Count": 1,
  },
  caseManagerMode: "hybrid",
  activity: [
    {
      id: "a-0409-1",
      category: "rules",
      level: "stage",
      actor: "Case manager",
      title: "Entered Diagnose and contain",
      detail: "Field Service · 2 hr containment recommendation",
      time: minutesAgo(6 * 60),
      stage: "Diagnose and contain",
    },
    {
      id: "a-0409-2",
      category: "human",
      level: "task",
      actor: "Field Service",
      title: "Define cause and repair scope",
      detail: "Rail carriage replacement exceeds the approved parts list for this configuration",
      time: minutesAgo(140),
      stage: "Diagnose and contain",
      hitl: [
        { kind: "assigned", actor: "Field Service", time: minutesAgo(5 * 60) },
        { kind: "completed", actor: "Field Service", time: minutesAgo(140) },
      ],
    },
    {
      id: "a-0409-3",
      category: "ai",
      level: "milestone",
      actor: "Case manager",
      title: "Routed to Engineering exception",
      detail: "Equivalence not established — BR-006 reserves the judgement for Engineering",
      time: minutesAgo(138),
      stage: "Diagnose and contain",
      actionId: "engineering-exception",
    },
  ],
  comments: [],
  isLive: false,
};

// ── The 38 cases progressing on their own ───────────────────────────────────

const CUSTOMERS: { name: string; sites: string[] }[] = [
  { name: "Northstar Retail Distribution", sites: ["Joliet DC", "Columbus DC", "Reno DC"] },
  { name: "Meridian Grocery Logistics", sites: ["Lehigh Valley DC", "Tracy DC"] },
  { name: "Halden Parcel Network", sites: ["Memphis hub", "Newark hub", "Dallas hub"] },
  { name: "Britelane Home Goods", sites: ["Savannah DC", "Bakersfield DC"] },
  { name: "Corvane Pharma Supply", sites: ["Indianapolis DC", "Allentown DC"] },
  { name: "Portage Cold Chain", sites: ["Green Bay DC", "Modesto DC"] },
  { name: "Ashford Apparel Group", sites: ["Greensboro DC", "El Paso DC"] },
];

const ASSETS = [
  { model: "SR-440 drive", description: "Conveyor sortation drive" },
  { model: "SR-380 drive", description: "Conveyor merge drive" },
  { model: "PX-210 palletiser", description: "Palletiser gantry axis drive" },
  { model: "LT-90 lift table", description: "Scissor lift table hydraulic pack" },
  { model: "CV-6 crossbelt", description: "Crossbelt sorter carriage" },
  { model: "WR-12 wrapper", description: "Stretch wrapper turntable drive" },
];

const OWNERS: { name: string; role: string }[] = [
  { name: "Sarah Chen", role: "Warranty Resolution Lead" },
  { name: "Miguel Alvarez", role: "Reliability and Controls Engineer" },
  { name: "Ryan Ochoa", role: "Product Quality Lead" },
  { name: "Kelsey Nordstrom", role: "Parts and Logistics Lead" },
  { name: "Tom Beckerman", role: "Claims Administrator" },
];

const PRIORITIES: Priority[] = ["P1", "P2", "P3", "P3", "P4"];

/** FNV-1a — a stable pseudo-random source so every render draws the same list. */
function seed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const DESCRIPTIONS = [
  "Drive bearing failure under warranty term",
  "Intermittent overload trips on merge section",
  "Hydraulic pack leak, unit isolated",
  "Carriage misalignment after retrofit",
  "Gearbox noise flagged by telemetry",
  "Encoder fault, throughput degraded",
  "Turntable drive stall under full load",
  "Belt tracking fault after belt change",
];

const WAITING_REASONS = [
  "Awaiting customer evidence",
  "Parts reserved, awaiting dispatch window",
  "Awaiting site access confirmation",
  "Awaiting supplier lot trace",
];

function buildBackgroundCase(index: number): WarrantyCase {
  const id = `WR-2026-${String(340 + index).padStart(4, "0")}`;
  const s = seed(id);
  const customer = CUSTOMERS[s % CUSTOMERS.length];
  const site = customer.sites[(s >> 3) % customer.sites.length];
  const asset = ASSETS[(s >> 5) % ASSETS.length];
  const owner = OWNERS[(s >> 7) % OWNERS.length];
  const stageIdx = (s >> 9) % PRIMARY_STAGES.length;
  const stage = PRIMARY_STAGES[stageIdx];

  // A third of the background cases are blocked on somebody outside the team;
  // the rest are genuinely moving on their own.
  const waiting = s % 3 === 0;
  const priority = PRIORITIES[(s >> 11) % PRIORITIES.length];

  const stageStates: Record<string, StageState> = {};
  PRIMARY_STAGES.forEach((st, i) => {
    stageStates[st.id] = i < stageIdx ? "completed" : i === stageIdx ? "active" : "pending";
  });

  const slaMinutes = stage.slaMinutes ?? 24 * 60;
  // Spread elapsed time across the SLA band so a handful land at risk.
  const elapsedMinutes = Math.round((slaMinutes * ((s >> 13) % 95)) / 100);
  const slaStatus =
    elapsedMinutes >= slaMinutes
      ? "Breached"
      : elapsedMinutes / slaMinutes >= 0.75
        ? "At risk"
        : "On track";

  return {
    id,
    instanceId: "",
    folderKey: "",
    customer: customer.name,
    site: `${site} · line ${1 + ((s >> 15) % 4)}`,
    asset: {
      model: asset.model,
      serial: `${1000 + (s % 8999)}-${100 + ((s >> 4) % 899)}`,
      description: asset.description,
      inServiceMonths: 3 + (s % 33),
      warrantyStatus: "Under warranty",
    },
    priority,
    status: waiting ? "Waiting on others" : "Progressing",
    currentStage: stage.name,
    activeLanes: waiting && s % 6 === 0 ? ["Waiting for customer evidence"] : [],
    owner: owner.name,
    ownerRole: owner.role,
    description: DESCRIPTIONS[(s >> 17) % DESCRIPTIONS.length],
    queueReason: undefined,
    claimValue: 2400 + (s % 42) * 620,
    openedAt: daysAgo(1 + (s % 14)),
    lastUpdatedAt: minutesAgo(15 + (s % 900)),
    slaMinutes,
    elapsedMinutes,
    slaStatus,
    stageStates,
    evidence: [],
    trail: [
      {
        seq: 1,
        actor: "process",
        actorLabel: "PR",
        step: "Create and correlate warranty case",
        stage: "Intake and impact triage",
        time: "—",
      },
      {
        seq: 2,
        actor: "agent",
        actorLabel: "AG",
        step: waiting
          ? `Case manager: holding — ${WAITING_REASONS[(s >> 19) % WAITING_REASONS.length]}`
          : `Case manager: advanced to ${stage.name}`,
        stage: stage.name,
        time: "—",
      },
    ],
    variables: {
      "Case.Id": id,
      "Asset.Id": asset.model.split(" ")[0],
      "Coverage.Position": stageIdx >= 2 ? "Approved" : "Pending",
      "Recurrence.Count": s % 3,
    },
    // Left empty on purpose: `activityFor` derives a stage-and-task spine from
    // the stage states, so 38 rows do not need 38 hand-written feeds.
    activity: [],
    comments: [],
    caseManagerMode: "hybrid",
    isLive: false,
  };
}

const BACKGROUND_CASES = Array.from({ length: 38 }, (_, i) => buildBackgroundCase(i));

/** 41 open cases: 3 that need a person today, 38 progressing on their own. */
export const DEMO_CASES: WarrantyCase[] = [CASE_0417, CASE_0421, CASE_0409, ...BACKGROUND_CASES];

// ── Open human tasks ────────────────────────────────────────────────────────

export const DEMO_ACTIONS: CaseAction[] = [
  {
    id: "coverage-decision",
    caseId: "WR-2026-0417",
    actionType: "coverage-decision",
    title: "Coverage decision — combined cause finding",
    // See the note on CASE_0417.currentStage: the 26 Aug storyboard puts this
    // decision in Resolution decision, the console mock still says Coverage and
    // evidence review. The storyboard wins.
    stage: "Resolution decision",
    assignee: "Sarah Chen",
    priority: "P1",
    blocking: true,
    dueAt: minutesFromNow(133),
    slaMinutes: 4 * 60,
    elapsedMinutes: 4 * 60 - 133,
    whyThisReachedYou:
      "The gearbox failed 30 months into a 60-month rated life — but the drive was reconfigured above its commissioned limits in February with no written approval. Both causes are established and no coverage rule resolves a combined cause, which is why this is with a person.",
    options: [
      {
        outcome: "Denied",
        label: "Deny coverage",
        rationale: "The customer funds the repair. A written reason is required.",
        supported: false,
        allocation: {
          parts: { to: "customer", why: "Not covered" },
          labour: { to: "customer", why: "Not covered" },
          travel: { to: "customer", why: "Not covered" },
          freight: { to: "customer", why: "Not covered" },
        },
        draftRationale: "",
        overrideNote:
          "A denial requires a written reason the customer will see. Please record it.",
        effects: [
          { title: "Coverage position written to WT-9", detail: "denied" },
          { title: "No accrual raised in SAP", detail: "$0" },
          { title: "Denial letter drafted — VP sign-off required", hold: true },
          { title: "FieldLink dispatch held", hold: true },
          { title: "SLA credit exposure flagged to Finance", detail: "$312,000 YTD" },
          { title: "Decision written to the ledger", detail: "override of the recommendation" },
        ],
      },
      {
        outcome: "Approved",
        label: "Approve full coverage",
        rationale:
          "Cobalt Ridge funds the repair under the extended service agreement.",
        supported: false,
        allocation: {
          parts: { to: "vendor", why: "Covered in full" },
          labour: { to: "vendor", why: "Covered in full" },
          travel: { to: "vendor", why: "Covered in full" },
          freight: { to: "vendor", why: "Covered in full" },
        },
        draftRationale: "",
        overrideNote:
          "Full coverage waives the ESA §4.2 approved-configuration failure. Please record why.",
        effects: [
          { title: "Coverage position written to WT-9", detail: "approved in full" },
          { title: "Cost collector opened in SAP", detail: "$16,272.50 accrual" },
          { title: "Routed to N. Brennan-Kowalczyk for co-approval", hold: true },
          { title: "FieldLink dispatch held pending co-approval", hold: true },
          { title: "Quality referral raised", detail: "recurrence flag, WR-2025-0331" },
          { title: "Decision written to the ledger", detail: "override of the recommendation" },
        ],
      },
      {
        outcome: "PartialPlusGoodwill",
        label: "Approve partial coverage + goodwill",
        rationale: "Splits the claim by cause attribution.",
        supported: true,
        allocation: {
          parts: { to: "vendor", why: "Failed inside its term" },
          labour: { to: "customer", why: "Caused by the unapproved change" },
          travel: { to: "vendor", why: "Goodwill — strategic account", goodwill: true },
          freight: { to: "customer", why: "Expedite caused by the change" },
        },
        draftRationale:
          "Both contributing causes are established and neither is sole. The gearbox failed 30 months into a 60-month rated life, with a defect signature inconsistent with load or contamination, so the part itself is covered. The control parameters were raised above the commissioned envelope on 2026-02-14 with no written approval, engaging ESA §4.2, so the labour and the expedited freight that change caused are not. Travel is absorbed as goodwill given the 96-hour outage on a strategic account. Operator-error contribution is unestablished and has not been weighed against the customer.",
        effects: [
          { title: "Coverage position written to WT-9", detail: "partial, with rationale" },
          { title: "Cost collector opened in SAP", detail: "$9,690.00 accrual" },
          { title: "Customer notification drafted", detail: "owner: Sarah Chen" },
          { title: "FieldLink dispatch released", detail: "restoration proceeds" },
          { title: "Quality referral raised", detail: "recurrence flag, WR-2025-0331" },
          { title: "Decision written to the ledger", detail: "proposed and decided agree" },
        ],
      },
    ],
    recommendation: {
      headline: "Approve partial coverage + goodwill",
      detail:
        "Both causes are proven, and neither is sole: the gearbox failed halfway through its rated life, but the drive's control settings were raised above its commissioned limits in February with no written approval. So we cover the part, the customer covers the labour and the freight that change caused, and we absorb the travel.",
      confidence: "high",
      recommendedOutcome: "PartialPlusGoodwill",
      evidenceBasis: [
        "Third-party service report",
        "Approved configuration baseline",
        "Controls change audit",
      ],
    },
    confidencePercent: 87,
    precedent: "60% agree",
    precedentBreakdown: PRECEDENT_0417,
    precedentBasis: "Last 18 months · combined cause, strategic account",
    signals: SIGNALS_0417,
    replies: REPLIES_0417,
    peerContext:
      "Across similar combined-cause claims, 78% ended in partial plus goodwill.",
    claimTotal: 16272.5,
    claimLineSummary: "4 lines · parts, labour, travel, freight",
    tiles: [
      { label: "Line status", value: "96 hrs", note: "Down · no divert", tone: "alarm" },
      { label: "Decision due", value: "2h 13m", note: "13:46 CT · blocking", tone: "clock" },
    ],
    causes: [
      {
        side: "covered",
        label: "Cause 1",
        title: "Component defect, inside its term",
        body:
          "Induction drive gearbox internal failure. The component was 30 months into a 60-month rated service life. Bearing race spalling consistent with a manufacturing defect — not with overload, contamination, or missed lubrication. Replaced on site, first-time fix confirmed.",
        summary: "30 of 60 months · defect signature, not wear",
        points: "Points to covered",
        established: "ESTABLISHED 03-20 ON SITE",
        sources: ["FieldLink", "WT-9"],
      },
      {
        side: "excluded",
        label: "Cause 2",
        title: "Configuration change, unapproved",
        body:
          "Drive control parameters were changed on 2026-02-14 — acceleration ramp and current limit raised above the commissioned envelope. No approval record exists. ESA §4.2 requires configuration changes to be approved in writing before they take effect.",
        summary: "Limits raised 02-14 · no approval on record",
        points: "Points to excluded",
        established: "CHANGE LOGGED 02-14",
        sources: ["Vault-PLM", "Sentinel"],
      },
    ],
    verdict: {
      // Says what follows from the two rows, not what the header already said.
      // `whyThisReachedYou` sits directly above this and covers the escalation;
      // repeating it here is what made the block read like a slogan.
      headline: "No rule covers both causes.",
      detail:
        "Each holds up on its own evidence, and they point opposite ways — the defect toward cover, the unapproved change away from it. The agreement is silent on what happens when both apply, so the split has to be decided here.",
    },
    costLines: [
      { id: "parts", name: "Parts — gearbox", amount: 8450 },
      { id: "labour", name: "Labour — 14.5 hrs", amount: 2682.5 },
      { id: "travel", name: "Travel & per diem", amount: 1240 },
      { id: "freight", name: "Expedited freight", amount: 3900 },
    ],
    authority: {
      limit: 10000,
      approver: "N. Brennan-Kowalczyk, VP Global Service",
    },
    folds: [
      {
        id: "coverage-basis",
        label: "Coverage basis",
        summary: "ESA active to 2027-09-02 · $0 deductible",
        body: "Extended Service Agreement NRD-ESA-2024-0219, active to 2027-09-02, $0.00 deductible. Asset identity confirmed against the installed base: SR-440, SR440-2023-1147, Joliet DC, Line 3 / Induct.",
      },
      {
        id: "policy-test",
        label: "Policy test — ESA NRD-ESA-2024-0219",
        summary: "7 checks · 5 pass, 1 fail, 1 open",
        marked: 3,
        checks: POLICY_CHECKS_0417,
      },
      {
        id: "claim-as-filed",
        label: "Claim as filed",
        summary: "4 lines · $16,272.50",
        body: "Parts $8,450.00 · Labour 14.5 hrs $2,682.50 · Travel & per diem $1,240.00 · Expedited freight $3,900.00.",
      },
      {
        id: "prior-history",
        label: "Prior history & recurrence",
        summary: "WR-2025-0331 · 4 failures in 90 days",
        marked: 1,
        body: "Four SR-440 failures across the installed base in 90 days. Prior claim WR-2025-0331 on the same drive family closed as covered. The recurrence gate on Close and learn will hold this case until a quality disposition is recorded.",
      },
      {
        id: "customer-standing",
        label: "Customer standing",
        summary: "Strategic · $184,000/yr · $312,000 credits YTD",
        marked: 2,
        body: "Strategic account. $184,000 annual service revenue, $312,000 in credits year to date. The 96-hour outage is the longest on this site in two years.",
      },
      {
        id: "timeline",
        label: "Timeline",
        summary: "7 events · report to decision-ready in 1 hr 41 min",
        body: "06:14 alarm · 06:31 case created · 07:02 asset identified · 07:44 impact classified P1 · 08:20 evidence assembled · 09:12 conflicting facts flagged · 09:55 decision-ready.",
      },
    ],
    effects: [
      { title: "Coverage position written to WT-9", detail: "partial, with rationale" },
      { title: "Cost collector opened in SAP", detail: "$9,690.00 accrual" },
      { title: "Customer notification drafted", detail: "owner: Sarah Chen" },
      { title: "FieldLink dispatch released", detail: "restoration proceeds" },
      { title: "Quality referral raised", detail: "recurrence flag, WR-2025-0331" },
      { title: "Decision written to the ledger", detail: "proposed and decided agree" },
    ],
    draftRationale:
      "Both contributing causes are established and neither is sole. The gearbox failed 30 months into a 60-month rated life, with a defect signature inconsistent with load or contamination, so the part itself is covered. The control parameters were raised above the commissioned envelope on 2026-02-14 with no written approval, engaging ESA §4.2, so the labour and the expedited freight that change caused are not. Travel is absorbed as goodwill given the 96-hour outage on a strategic account. Operator-error contribution is unestablished and has not been weighed against the customer.",
    status: "Open",
    rationale:
      "Both contributing causes are established and neither is sole. The gearbox failed 30 months into a 60-month rated life, with a defect signature inconsistent with load or contamination, so the part itself is covered. The control parameters were raised above the commissioned envelope on 2026-02-14 with no written approval, engaging ESA §4.2, so the labour and the expedited freight that change caused are not. Travel is absorbed as goodwill given the 96-hour outage on a strategic account. Operator-error contribution is unestablished and has not been weighed against the customer.",
  },
  {
    id: "quality-disposition",
    caseId: "WR-2026-0421",
    actionType: "quality-disposition",
    title: "Confirm escalation criteria",
    stage: "Product-quality escalation",
    assignee: "Ryan Ochoa",
    priority: "P2",
    blocking: true,
    dueAt: minutesFromNow(5 * 60),
    slaMinutes: 24 * 60,
    elapsedMinutes: 19 * 60,
    whyThisReachedYou:
      "The recurrence scan found four related SR-440 bearing failures inside twelve months, three of them sharing a supplier lot. The v2 recurrence gate holds closure until a person decides whether this is a product-quality issue or a coincidence.",
    options: [
      {
        outcome: "InvestigationOpened",
        label: "Open quality investigation",
        rationale:
          "Three of four failures share a supplier lot, which is the pattern an investigation is for.",
        supported: true,
      },
      {
        outcome: "MonitoringPlan",
        label: "Record monitoring plan",
        rationale: "Supported if the lot correlation is judged coincidental at this sample size.",
        supported: true,
      },
      {
        outcome: "NoAction",
        label: "Record no-action rationale",
        rationale:
          "Not supported: four failures inside the gate threshold need a recorded disposition, not a dismissal.",
        supported: false,
      },
    ],
    recommendation: {
      headline: "Open quality investigation",
      detail:
        "Four related failures on the SR-440 drive family in twelve months, three from one supplier lot, all inside the first 18 months of service.",
      confidence: "high",
      recommendedOutcome: "InvestigationOpened",
      evidenceBasis: ["Recurrence scan — SR-440 drive family"],
    },
    peerContext:
      "Of the 6 recurrence gates raised this quarter, 4 opened an investigation and 2 recorded a monitoring plan.",
    status: "Open",
  },
  {
    id: "engineering-exception",
    caseId: "WR-2026-0409",
    actionType: "engineering-exception",
    title: "Review cause and constraints",
    stage: "Engineering exception",
    assignee: "Miguel Alvarez",
    priority: "P2",
    blocking: true,
    dueAt: minutesFromNow(100),
    slaMinutes: 4 * 60,
    elapsedMinutes: 2 * 60 + 20,
    whyThisReachedYou:
      "The proposed repair replaces the rail carriage with a heavier-duty variant that is not on the approved parts list for this configuration. Equivalence has not been established, so the technical judgement sits with Engineering before a route can be authorised.",
    options: [
      {
        outcome: "Approved",
        label: "Approve for resolution",
        rationale:
          "Supported once the equivalence standard is met — the heavier carriage exceeds the original load rating on every axis.",
        supported: true,
      },
      {
        outcome: "ReturnForDiagnosis",
        label: "Return for further diagnosis",
        rationale: "Supported if the root cause is judged unconfirmed from the current evidence.",
        supported: true,
      },
      {
        outcome: "ControlledEscalation",
        label: "Raise controlled escalation",
        rationale:
          "Not supported: nothing here reaches the commercial or legal threshold.",
        supported: false,
      },
    ],
    recommendation: {
      headline: "Approve for resolution",
      detail:
        "The substitute carriage exceeds the original load rating on every axis and has an equivalence record from the PX-210 retrofit programme.",
      confidence: "medium",
      recommendedOutcome: "Approved",
      evidenceBasis: ["Repair scope estimate"],
    },
    status: "Open",
  },
];

// ── Fleet-level numbers ─────────────────────────────────────────────────────

export const DEMO_INSIGHTS: OperationalInsights = {
  autonomousRate: 93,
  interventionRate: 7,
  atSlaRisk: 4,
  bottleneckStage: "Coverage and evidence review",
  bottleneckLabel: "Evidence review",
  // The point of this chart is that fewer cases ENTER the queue — not that the
  // queue drains faster. Entered falls while completed stays roughly flat.
  queueEntryTrend: [
    { period: "Mar", entered: 41, completed: 38 },
    { period: "Apr", entered: 36, completed: 37 },
    { period: "May", entered: 29, completed: 31 },
    { period: "Jun", entered: 22, completed: 24 },
    { period: "Jul", entered: 15, completed: 17 },
    { period: "Aug", entered: 9, completed: 11 },
  ],
  // On-track share climbing while breaches fall — the "improving" the card claims.
  slaTrend: {
    onTrack: [24, 25, 27, 26, 29, 30, 31],
    breached: [6, 5, 5, 4, 2, 1, 0],
  },
  stageAccumulation: [
    { stage: "Coverage and evidence review", cases: 14 },
    { stage: "Diagnose and contain", cases: 9 },
    { stage: "Resolution decision", cases: 7 },
    { stage: "Intake and impact triage", cases: 5 },
    { stage: "Restore and validate", cases: 4 },
    { stage: "Close and learn", cases: 2 },
  ],
  avgCoverageDecisionDays: 1.8,
  restorationAdherence: 71,
  criticalAtRisk: 5,
  criticalAtRiskDelta: 1,
  repeatFailureCandidates: 7,
  repeatFailureNote: "4 linked to one drive family",
};

/**
 * What the signer says about the *reasoning*, asked separately from the outcome.
 * Storyboard scene 20 calls this out as a beat to read aloud, and it is the
 * learning signal continuous improvement reads later.
 */
export const REASONING_OPTIONS: ReasoningOption[] = [
  {
    value: "agree",
    label: "I agree with the reasoning",
    effect: "Recorded as agreement with no standing instruction — you'll still see the next one.",
  },
  {
    value: "agree-keep-asking",
    label: "I agree, but keep asking me",
    effect: "Recorded as agreement, and this case type stays in your queue.",
  },
  {
    value: "stop-asking",
    label: "Stop asking for cases like this",
    effect: "Proposed as a rule. Cases matching this shape stop waiting for a person once approved.",
  },
];

export const AGENT_SUMMARY = {
  headline: "3 cases need a person today, out of 41 open.",
  detail:
    "The other 38 are progressing on their own. Each one arrives with a reason and a recommendation.",
  footnote: "38 of 41 open cases are progressing without a person",
};
