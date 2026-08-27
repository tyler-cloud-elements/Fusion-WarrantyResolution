// The case plan: six primary stages on the spine, conditional lanes hanging off
// it, and the terminal lanes that end a case without completing it.
//
// This file is the single place the case shape is declared. It is transcribed
// from the "Industrial Equipment Warranty Resolution Case Design" reference
// implementation, cross-checked against docs/warranty-resolution-sdd.md §2. When the
// real Maestro case is published, reconcile THIS file with it — `caseService.ts`
// matches live stage/task names against these definitions by normalised name, so
// keeping the names identical is what wires the app to the running case.
//
// SLA targets are the design's illustrative ones, which is what the demo shows
// on screen (the console header reads "SLA 4 HR" for Coverage and evidence
// review). The SDD proposes a more conservative set for production — noted per
// stage below — and both are deliberately kept visible.

import type { StageDefinition, TaskActor, TaskDefinition } from "./types";

const HOUR = 60;
const DAY = 24 * HOUR;

/** Primary stages, in the order the case enters them. */
export const PRIMARY_STAGES: StageDefinition[] = [
  {
    id: "s1",
    name: "Intake and impact triage",
    kind: "primary",
    sla: "30 min critical triage",
    slaMinutes: 30,
    owner: "Customer Support",
    description:
      "Registers the coordination case, acknowledges the customer report, classifies business impact and safety, and verifies the asset serial so the warranty claim can be linked.",
    // SDD §2 s1 proposes 1 d at 75% at-risk.
    tasks: [
      { id: "t11", name: "Create and correlate warranty case", actor: "process" },
      { id: "t12", name: "Identify installed asset", actor: "api" },
      {
        id: "t13",
        name: "Classify customer impact",
        actor: "human",
        actionType: "assess-impact",
        outcomes: ["Assessed"],
      },
      { id: "t14", name: "Preserve and summarize initial evidence", actor: "agent" },
    ],
  },
  {
    id: "s2",
    name: "Coverage and evidence review",
    kind: "primary",
    sla: "4 hr initial review",
    slaMinutes: 4 * HOUR,
    owner: "Global Warranty Operations",
    description:
      "Assembles entitlement and service evidence, flags what is missing or contradictory, reviews configuration changes, and records the coverage position with a written rationale.",
    // SDD §2 s2 proposes 5 d at 70% at-risk; task SLA 5 d on the coverage decision.
    tasks: [
      { id: "t21", name: "Assemble warranty and service evidence", actor: "api" },
      { id: "t22", name: "Flag missing and conflicting facts", actor: "agent" },
      {
        id: "t23",
        name: "Review configuration changes",
        actor: "human",
        actionType: "configuration-review",
        outcomes: ["Reviewed", "OutOfEnvelope"],
      },
      {
        id: "t24",
        name: "Form coverage position",
        actor: "human",
        actionType: "coverage-decision",
        outcomes: ["Approved", "PartialPlusGoodwill", "Denied", "ExceptionPending", "EvidenceRequested"],
      },
    ],
  },
  {
    id: "s3",
    name: "Diagnose and contain",
    kind: "primary",
    sla: "2 hr containment recommendation",
    slaMinutes: 2 * HOUR,
    owner: "Field Service",
    description:
      "Correlates alarms with service history, gets containment approved so the site can be made safe, and defines the cause and repair scope.",
    // SDD §2 s3 proposes 4 h at 75% at-risk — the P1 downtime driver.
    tasks: [
      { id: "t31", name: "Correlate alarms and service history", actor: "agent" },
      {
        id: "t32",
        name: "Approve safe containment",
        actor: "human",
        actionType: "containment-approval",
        outcomes: ["Approved", "Rejected"],
      },
      { id: "t33", name: "Coordinate site-owned containment", actor: "process" },
      {
        id: "t34",
        name: "Define cause and repair scope",
        actor: "human",
        actionType: "diagnose",
        outcomes: ["RouteReady", "EngineeringNeeded"],
      },
    ],
  },
  {
    id: "s4",
    name: "Resolution decision",
    kind: "primary",
    sla: "4 hr in-policy decision",
    slaMinutes: 4 * HOUR,
    owner: "Global Warranty Operations",
    description:
      "Builds comparable resolution options, evaluates them against policy and delegated authority, and authorises the route the case will take.",
    // SDD §2 s4 proposes 1 d at 75% at-risk; readiness task SLA 1 d.
    tasks: [
      { id: "t41", name: "Build comparable resolution options", actor: "agent" },
      { id: "t42", name: "Evaluate policy and delegation", actor: "api" },
      {
        id: "t43",
        name: "Approve technical exception",
        actor: "human",
        actionType: "joint-readiness",
        outcomes: ["BothReady", "ApprovedException", "ReturnToCoverage", "ReturnToTechnical"],
      },
      {
        id: "t44",
        name: "Authorize commercial outcome",
        actor: "human",
        actionType: "route-approval",
        outcomes: [
          "Repair",
          "Replacement",
          "AlternatePart",
          "Denial",
          "Withdrawal",
          "CommercialLegal",
        ],
      },
    ],
  },
  {
    id: "s5",
    name: "Restore and validate",
    kind: "primary",
    sla: "2 hr dispatch after readiness",
    slaMinutes: 2 * HOUR,
    owner: "Field Service",
    description:
      "Reserves and tracks approved parts, dispatches qualified service, confirms the site is ready for safe service, and captures the customer's validation of the restored outcome.",
    // SDD §2 s5 proposes 3 d at 75% at-risk (provisional — SME review item 5).
    tasks: [
      { id: "t51", name: "Reserve and track approved parts", actor: "api" },
      { id: "t52", name: "Dispatch qualified service", actor: "process" },
      {
        id: "t53",
        name: "Confirm safe-service readiness",
        actor: "human",
        actionType: "service-readiness",
        outcomes: ["Ready", "Blocked"],
      },
      {
        id: "t54",
        name: "Validate restored outcome",
        actor: "human",
        actionType: "customer-validation",
        outcomes: ["Validated", "Failed"],
      },
    ],
  },
  {
    id: "s6",
    name: "Close and learn",
    kind: "primary",
    sla: "1 business day",
    slaMinutes: DAY,
    owner: "Quality / Reliability",
    description:
      "Reconciles covered against actual cost, finalises the decision ledger, detects recurrence and severity, and confirms closure or routes to a quality escalation.",
    // SDD §2 s6 proposes 10 d at 70% at-risk (provisional — SME review item 5).
    tasks: [
      { id: "t61", name: "Reconcile coverage and actual cost", actor: "api" },
      { id: "t62", name: "Finalize decision ledger", actor: "agent" },
      { id: "t63", name: "Detect recurrence and severity", actor: "agent" },
      {
        id: "t64",
        name: "Confirm closure or quality escalation",
        actor: "human",
        actionType: "closure-disposition",
        outcomes: ["Close", "QualityInvestigation", "Reopen"],
      },
    ],
  },
];

/**
 * Conditional lanes. These are the four the case design draws and the four the
 * storyboard's stage rail lists, so they are the ones the demo can open.
 */
export const CONDITIONAL_STAGES: StageDefinition[] = [
  {
    id: "sx1",
    name: "Waiting for customer evidence",
    kind: "conditional",
    sla: "Reminders per impact tier",
    slaMinutes: 3 * DAY,
    owner: "Global Warranty Operations",
    description:
      "Requests the specific evidence that is missing, tracks the response, and resumes the decision clock the moment it lands.",
    tasks: [
      { id: "sx11", name: "Request targeted evidence", actor: "process" },
      { id: "sx12", name: "Summarize new uploads", actor: "agent" },
      {
        id: "sx13",
        name: "Review evidence sufficiency",
        actor: "human",
        actionType: "evidence-followup",
        outcomes: ["Received", "EscalatedNoResponse"],
      },
      { id: "sx14", name: "Resume affected decision clock", actor: "api" },
    ],
  },
  {
    id: "sx2",
    name: "Engineering exception",
    kind: "conditional",
    sla: "4 hr critical review",
    slaMinutes: 4 * HOUR,
    owner: "Engineering",
    description:
      "Prepares the technical exception brief and takes the safety, technical-uncertainty, and equivalence decision that no rule can settle.",
    tasks: [
      { id: "sx21", name: "Prepare technical exception brief", actor: "agent" },
      {
        id: "sx22",
        name: "Review cause and constraints",
        actor: "human",
        actionType: "engineering-exception",
        outcomes: ["Approved", "ReturnForDiagnosis", "ControlledEscalation"],
      },
      {
        id: "sx23",
        name: "Approve deviation and test",
        actor: "human",
        actionType: "deviation-approval",
        outcomes: ["Approved", "Rejected"],
      },
      { id: "sx24", name: "Notify resolution owner", actor: "process" },
    ],
  },
  {
    id: "sx3",
    name: "Parts substitution review",
    kind: "conditional",
    sla: "Same-day review",
    slaMinutes: 2 * DAY,
    owner: "Parts / Logistics",
    description:
      "Checks approved alternates and stock, compares compatibility evidence, and takes the authority approval an alternate part requires.",
    tasks: [
      { id: "sx31", name: "Check approved alternates and stock", actor: "api" },
      { id: "sx32", name: "Compare compatibility evidence", actor: "agent" },
      {
        id: "sx33",
        name: "Approve alternate and validation",
        actor: "human",
        actionType: "parts-substitution",
        outcomes: ["Approved", "Rejected", "Escalate"],
      },
      { id: "sx34", name: "Update reservation and commitment", actor: "process" },
    ],
  },
  {
    id: "sx4",
    name: "Product-quality escalation",
    kind: "conditional",
    sla: "Before case closure",
    slaMinutes: null,
    owner: "Quality / Reliability",
    description:
      "Finds related failures across the installed base and records the quality disposition. Added in case plan v2 as the recurrence gate before a case can close.",
    tasks: [
      { id: "sx41", name: "Find related failures and assets", actor: "agent" },
      {
        id: "sx42",
        name: "Confirm escalation criteria",
        actor: "human",
        actionType: "quality-disposition",
        outcomes: ["InvestigationOpened", "MonitoringPlan", "NoAction"],
      },
      { id: "sx43", name: "Open linked quality investigation", actor: "process" },
      {
        id: "sx44",
        name: "Assign containment and learning owner",
        actor: "human",
        actionType: "learning-owner",
        outcomes: ["Assigned"],
      },
    ],
  },
];

/**
 * Terminal lanes from SDD §2 (sx5–sx8). They end the case without completing it,
 * so they sit off the progress rail and only appear once entered. The case
 * design diagram does not draw them; the SDD's exit conditions require them.
 */
export const TERMINAL_STAGES: StageDefinition[] = [
  {
    id: "sx5",
    name: "Coverage denial and customer notice",
    kind: "terminal",
    sla: "Not set",
    slaMinutes: null,
    owner: "Global Warranty Operations",
    description: "Records the denial and issues the customer notice. Exits the case as denied.",
    tasks: [
      {
        id: "sx51",
        name: "Record denial and notify customer",
        actor: "human",
        actionType: "denial-notice",
        outcomes: ["DenialRecorded"],
      },
    ],
  },
  {
    id: "sx6",
    name: "Withdrawal or cancellation",
    kind: "terminal",
    sla: "Not set",
    slaMinutes: null,
    owner: "Global Warranty Operations",
    description:
      "Records a customer withdrawal or cancellation, the confirming contact, and any work already incurred.",
    tasks: [
      {
        id: "sx61",
        name: "Record withdrawal or cancellation",
        actor: "human",
        actionType: "withdrawal",
        outcomes: ["WithdrawalRecorded"],
      },
    ],
  },
  {
    id: "sx7",
    name: "Commercial or legal handoff",
    kind: "terminal",
    sla: "Not set",
    slaMinutes: null,
    owner: "Commercial / Legal",
    description:
      "Hands the full decision history to the receiving team after a controlled escalation. Exits the case.",
    tasks: [
      {
        id: "sx71",
        name: "Handoff commercial or legal escalation",
        actor: "human",
        actionType: "commercial-legal",
        outcomes: ["HandoffAccepted"],
      },
    ],
  },
  {
    id: "sx8",
    name: "Reopen and reassess",
    kind: "terminal",
    sla: "Not set",
    slaMinutes: null,
    owner: "Global Warranty Operations",
    description:
      "Records why a closed or closing case is reopened and returns it to coverage, technical, or closure reassessment with history preserved.",
    tasks: [
      {
        id: "sx81",
        name: "Reopen case for new evidence or challenge",
        actor: "human",
        actionType: "reopen",
        outcomes: ["CoverageReassessment", "TechnicalReassessment", "ClosureReassessment"],
      },
    ],
  },
];

export const ALL_STAGES: StageDefinition[] = [
  ...PRIMARY_STAGES,
  ...CONDITIONAL_STAGES,
  ...TERMINAL_STAGES,
];

export const PRIMARY_STAGE_NAMES = PRIMARY_STAGES.map((s) => s.name);

/** Normalise a stage or task name so live Maestro names match these definitions. */
export function normaliseName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const STAGE_BY_NORMALISED = new Map(ALL_STAGES.map((s) => [normaliseName(s.name), s]));

export function findStage(name: string): StageDefinition | undefined {
  return STAGE_BY_NORMALISED.get(normaliseName(name));
}

export function stageById(id: string): StageDefinition | undefined {
  return ALL_STAGES.find((s) => s.id === id);
}

export function findTask(actionType: string): TaskDefinition | undefined {
  for (const stage of ALL_STAGES) {
    const task = stage.tasks.find((t) => t.actionType === actionType);
    if (task) return task;
  }
  return undefined;
}

/** The stage a given action type belongs to — used to label a task in the queue. */
export function stageForActionType(actionType: string): StageDefinition | undefined {
  return ALL_STAGES.find((s) => s.tasks.some((t) => t.actionType === actionType));
}

export const ACTOR_LABEL: Record<TaskActor, string> = {
  agent: "Agent",
  process: "Process",
  human: "Human",
  api: "API",
  timer: "Timer",
  event: "Event",
};

/** Short chips matching the case design legend. */
export const ACTOR_CHIP: Record<TaskActor, string> = {
  agent: "AG",
  process: "PR",
  human: "HT",
  api: "API",
  timer: "TM",
  event: "EVT",
};

/**
 * Case plan versions. v2 is the storyboard's live change: a product-quality
 * escalation gate added before a case can close.
 */
export const CASE_PLAN_VERSIONS = [
  {
    version: "v1",
    label: "Initial case plan",
    publishedAt: "2026-08-14T09:00:00Z",
    note: "Six primary stages, three conditional lanes.",
  },
  {
    version: "v2",
    label: "product-quality gate",
    publishedAt: "2026-08-24T16:20:00Z",
    note: "Adds Product-quality escalation (4 tasks). Close and learn now requires recurrence reviewed = true; the recurrence-detected event targets the new stage. Running cases can migrate without restarting.",
  },
] as const;

export const CURRENT_PLAN_VERSION = "v2";
