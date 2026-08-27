import { useSyncExternalStore } from "react";

// Demo feature flags.
//
// Presenter switches, not product configuration: things worth turning off
// mid-rehearsal to see how a beat lands without them. They persist to
// localStorage — unlike the case session state, which resets on reload, a
// presenter setting the room up should not have to set these again on refresh.

export interface FeatureFlags {
  /**
   * Show the second, opposing cause on the decision console.
   *
   * On, the finding reads as a genuine combined cause — two established causes
   * pointing at different payers, which is the whole reason a person is looking
   * at it. Off, only the covering cause shows, and the case reads as a
   * straightforward approval. Useful for contrasting the two.
   */
  showOpposingCause: boolean;
  /** Show the agent's confidence percentage and precedent rollup. */
  showAgentConfidence: boolean;
  /** Show the reasoning tri-state under the decision. */
  showReasoningCapture: boolean;
  /**
   * Show the Case plans entry in the left nav.
   *
   * Off by default: the case plan is design-time material, and the demo's Act
   * III is about running work. The route stays reachable by URL either way, so
   * a presenter can deep-link to it without turning the nav item on.
   */
  showCasePlans: boolean;
  /**
   * Show the morning brief above the work queue.
   *
   * The queue answers "what is waiting"; the brief answers "what happened
   * overnight and what should I do first", which is the question the app is
   * actually opened with. When on, it also absorbs the standalone agent-summary
   * card rather than saying the same thing twice.
   */
  showHomepageSplash: boolean;
  /**
   * Lay the Actions pane out like the console — finding and decision side by
   * side — when there is room for it.
   *
   * "When there is room" is not decoration: the case-details panel takes the
   * same horizontal space, so with that panel open the pane falls back to the
   * stacked layout regardless. Two columns squeezed into a third of the window
   * is worse than one.
   */
  actionSideBySide: boolean;
}

export const DEFAULT_FLAGS: FeatureFlags = {
  showOpposingCause: true,
  showAgentConfidence: true,
  showReasoningCapture: true,
  showCasePlans: false,
  showHomepageSplash: true,
  actionSideBySide: false,
};

export const FLAG_LABELS: Record<keyof FeatureFlags, { label: string; hint: string }> = {
  showOpposingCause: {
    label: "Opposing cause tile",
    hint: "The second cause, on the customer. Off, the case reads as a clean approval.",
  },
  showAgentConfidence: {
    label: "Agent confidence",
    hint: "The percentage and the precedent rollup on the assessment.",
  },
  showReasoningCapture: {
    label: "Reasoning capture",
    hint: "The agree / keep asking / stop asking tri-state under the decision.",
  },
  showCasePlans: {
    label: "Case plans tab",
    hint: "The design-time case plan and its rules. Off by default; /case-plans still works.",
  },
  showHomepageSplash: {
    label: "Morning brief",
    hint: "The overnight summary, trend tiles and pulse cards above the work queue.",
  },
  actionSideBySide: {
    label: "Side-by-side action",
    hint: "Finding and decision in two columns, like the console. Stacks anyway while the case panel is open.",
  },
};

const STORAGE_KEY = "warranty-app-flags";

function read(): FeatureFlags {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_FLAGS;
    const parsed = JSON.parse(raw) as Partial<FeatureFlags>;
    // Spread over the defaults so a flag added later is on for everyone who
    // already has a stored object, rather than silently undefined.
    return { ...DEFAULT_FLAGS, ...parsed };
  } catch {
    return DEFAULT_FLAGS;
  }
}

let snapshot: FeatureFlags = read();
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setFlag<K extends keyof FeatureFlags>(key: K, value: FeatureFlags[K]) {
  snapshot = { ...snapshot, [key]: value };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* a presenter in a private window still gets the flag for this session */
  }
  listeners.forEach((l) => l());
}

export function resetFlags() {
  snapshot = DEFAULT_FLAGS;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function useFlags(): FeatureFlags {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => DEFAULT_FLAGS,
  );
}

/** True when anything differs from the shipped defaults — surfaces a reset. */
export function isModified(flags: FeatureFlags): boolean {
  return (Object.keys(DEFAULT_FLAGS) as (keyof FeatureFlags)[]).some(
    (key) => flags[key] !== DEFAULT_FLAGS[key],
  );
}
