// The CI build's cast change, in one place.
//
// While `ciCoverageDecision` is on the warranty lead is Scott Florentino; off, she
// is Sarah Chen again, which is who the demo dataset and the storyboard name. The
// flag is read at the three places data enters the app, never at a render site —
// see `renameDeep` below on why that distinction is the whole design.

import type { Role, RoleProfile } from "@/lib/role/RoleProvider";

/**
 * ORDERED, AND THE ORDER IS THE CORRECTNESS ARGUMENT.
 *
 * The full name has to resolve before the bare one, or "Sarah Chen" becomes
 * "Scott Chen" — the second rule would fire on the first rule's leftovers.
 *
 * **Possessives need no rule of their own.** `\bSarah\b` matches inside "Sarah's",
 * because an apostrophe is a non-word character, so the dataset's "Sarah's
 * combined-cause finding" becomes "Scott's" and the CI page's "off Sarah Chen's
 * queue" becomes "off Scott Florentino's". Both are correct English for free.
 *
 * **Word boundaries, so no substring is damaged.** Nothing else in the app
 * contains these letters today — checked — and the boundary is what keeps that
 * true after the next edit to the demo set.
 */
const SUBSTITUTIONS: readonly (readonly [RegExp, string])[] = [
  [/\bSarah Chen\b/g, "Scott Florentino"],
  [/\bSarah\b/g, "Scott"],
] as const;

/** One string, rewritten. Unchanged strings come back by identity. */
export function renameText(value: string): string {
  let out = value;
  for (const [pattern, replacement] of SUBSTITUTIONS) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

/**
 * KEYS WHOSE VALUES ARE NEVER PROSE, and so are never rewritten.
 *
 * No identifier in the dataset carries the name today — verified — so this changes
 * nothing right now. It is here so that the day one does, a lookup does not break
 * silently: an id rewritten on the way out stops matching the id it was stored
 * under, and the failure surfaces as a case that cannot be found rather than as a
 * name that looks wrong.
 */
const OPAQUE_KEYS = new Set(["id", "caseId", "actionId", "instanceId", "taskId", "key"]);

/**
 * EVERY STRING IN A STRUCTURE, REWRITTEN — applied where the demo set enters the
 * app rather than where a name is drawn.
 *
 * The alternative was a `displayName()` helper called at each render site, and it
 * is the wrong shape twice over. The name is not only in fields called `owner` and
 * `assignee`: it is inside free text — the reassessment card's "…against Sarah's
 * combined-cause finding" — and inside effect details assembled as sentences. A
 * per-field rename misses those, and a per-site helper has to be remembered at
 * every new site forever. This is remembered once, at two memos in ./useCases.ts.
 *
 * Structurally identical output, so React's memo comparisons downstream behave as
 * they did: a new object graph per rename, which is exactly what the memo it runs
 * inside already produced.
 */
export function renameDeep<T>(value: T): T {
  if (typeof value === "string") return renameText(value) as unknown as T;
  if (Array.isArray(value)) return value.map((item) => renameDeep(item)) as unknown as T;
  // `typeof null === "object"`, and a Date or a class instance would be mangled by
  // the spread below — the demo set holds only plain objects, arrays, strings,
  // numbers, booleans and null, so anything else is passed through untouched.
  if (value === null || typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype) {
    return value;
  }
  const out: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) {
    out[key] = OPAQUE_KEYS.has(key) ? item : renameDeep(item);
  }
  return out as T;
}

/**
 * THE LEAD'S THREE FIELDS, REWRITTEN EXPLICITLY RATHER THAN BY PATTERN.
 *
 * `renameDeep` cannot do this job. The email is `sarah.chen@cobaltridge.com`,
 * lowercase, which the capitalised patterns above do not match — and deliberately
 * so, since a case-insensitive rule would be a rule about any occurrence of the
 * letters anywhere. The initials are `SC`, which encodes the name in a form no
 * pattern can find safely: a rule for "SC" would fire on half the codebase.
 *
 * So the persona is a known triple and is named as one. Leaving either of the
 * other two behind is the visible failure mode — an avatar reading SC beside
 * "Scott Florentino".
 */
const LEAD_OVERRIDE = {
  name: "Scott Florentino",
  email: "scott.florentino@cobaltridge.com",
  initials: "SF",
} as const;

/**
 * The cast with the lead renamed. `lead` is the only persona that moves; the other
 * four are untouched, so they come back by identity.
 */
export function renameProfiles(
  profiles: Record<Role, RoleProfile>,
): Record<Role, RoleProfile> {
  return { ...profiles, lead: { ...profiles.lead, ...LEAD_OVERRIDE } };
}
