import { PRIMARY_STAGES } from "./casePlan";
import { relativeTime } from "./format";
import { formatRemaining } from "./sla";
import type { WarrantyCase } from "./types";

// The case agent's account of where the case has got to.
//
// Deliberately about *progress*, not about what is owed: the Action needed card
// sitting beside it already states the open decision and why it landed on a
// person, and the two were saying the same thing twice. This one answers the
// question you ask before picking the work up, which is what has happened so
// far and what is left.

function stageCounts(warrantyCase: WarrantyCase) {
  const done = PRIMARY_STAGES.filter(
    (s) => warrantyCase.stageStates[s.id] === "completed",
  ).length;
  const index = PRIMARY_STAGES.findIndex((s) => s.name === warrantyCase.currentStage);
  const remaining = index >= 0 ? PRIMARY_STAGES.slice(index + 1) : [];
  return { done, total: PRIMARY_STAGES.length, remaining };
}

// Stage names are joined with commas and never with "and", because half of them
// contain one: "Coverage and evidence review and Diagnose and contain are
// closed" is a sentence nobody can parse. They also keep their own
// capitalisation, since they are names rather than descriptions.

/** What is behind the case. */
function behind(warrantyCase: WarrantyCase): string {
  const closed = PRIMARY_STAGES.filter(
    (s) => warrantyCase.stageStates[s.id] === "completed",
  ).map((s) => s.name);
  if (closed.length === 0) return "";
  return `Closed so far: ${closed.join(", ")}.`;
}

/** What is still ahead of it. */
function ahead(warrantyCase: WarrantyCase): string {
  const { remaining } = stageCounts(warrantyCase);
  if (remaining.length === 0) return "Nothing follows this stage.";
  return `Still to come: ${remaining.map((s) => s.name).join(", ")}.`;
}

/**
 * Three or four sentences on where the case stands.
 *
 * A live reassessment still wins: when the case agent has something to say about
 * a route change, that is more urgent than a progress report and it says it in
 * its own words.
 */
export function caseProgressSummary(warrantyCase: WarrantyCase): string {
  if (warrantyCase.reassessment) return warrantyCase.reassessment.detail;

  const { done, total } = stageCounts(warrantyCase);
  const opened = relativeTime(warrantyCase.openedAt).replace(" ago", "");
  const clock = formatRemaining(warrantyCase.elapsedMinutes, warrantyCase.slaMinutes);

  const sentences = [
    `${done} of ${total} stages are complete. The case has been open for ${opened} ` +
      `and is now in ${warrantyCase.currentStage}, owned by ${warrantyCase.owner}.`,
    behind(warrantyCase),
    warrantyCase.evidence.length > 0
      ? `${warrantyCase.evidence.length} documents are attached and read.`
      : "No documents are attached yet.",
    ahead(warrantyCase),
    `The stage clock is ${warrantyCase.slaStatus.toLowerCase()} with ${clock}.`,
  ];

  if (warrantyCase.activeLanes.length > 0) {
    sentences.push(
      `${warrantyCase.activeLanes.join(" and ")} ${
        warrantyCase.activeLanes.length === 1 ? "is" : "are"
      } running alongside it.`,
    );
  }

  return sentences.filter(Boolean).join(" ");
}

/**
 * The facts under the summary.
 *
 * Progress facts, not decision facts. "Why it needs a person" used to sit here
 * and is now only on the Action needed card, which is where someone acts on it.
 */
export function caseProgressFacts(
  warrantyCase: WarrantyCase,
): { label: string; value: string }[] {
  const { done, total } = stageCounts(warrantyCase);
  return [
    { label: "Progress", value: `${done} of ${total} stages complete` },
    { label: "Current stage", value: warrantyCase.currentStage },
    {
      label: "Coverage position",
      value: String(warrantyCase.variables["Coverage.Position"] ?? "Not yet set"),
    },
    {
      label: "Open lanes",
      value: warrantyCase.activeLanes.length ? warrantyCase.activeLanes.join(", ") : "None",
    },
    { label: "Last update", value: relativeTime(warrantyCase.lastUpdatedAt) },
  ];
}
