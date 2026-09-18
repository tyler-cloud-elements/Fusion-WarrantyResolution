# Plan — rename the lead to Scott Florentino behind `ciCoverageDecision`

App-wide while the flag is on: **Sarah Chen → Scott Florentino**, and a bare
**Sarah → Scott**. Flag off, every surface says Sarah Chen again.

---

## 1 · The survey

Fourteen occurrences, eleven of them live. A case-sensitive grep for `Sarah`
finds ten of the eleven — the three that matter most are the ones it misses.

| file | line | what | renders where |
|---|---|---|---|
| `lib/role/RoleProvider.tsx` | 35 | `name: "Sarah Chen"` | sidebar profile, decision stamp, evidence "added by", assessment rail |
| | **36** | **`email: "sarah.chen@cobaltridge.com"`** | sidebar profile line |
| | **38** | **`initials: "SC"`** | the avatar |
| `lib/warranty/demoData.ts` | 277 | `owner` on WR-2026-0417 | case header, work queue |
| | 745 | `reassessment.detail` — "**Sarah's** combined-cause finding" | reassessment card |
| | 1031 | `OWNERS` roster entry | the synthetic filler cases' owners |
| | 1179 | `assignee` on the coverage action | task queue, action detail |
| | 1251, 1370 | effect details, "owner: Sarah Chen" | filed record |
| `lib/coverage/data/coverage-decision.ts` | 250, 400 | secondary-action effects | CI page only |
| | 415 | "off **Sarah Chen's** queue" | CI page only |
| `RoleProvider.tsx` 4, 104 · `overlay.ts` 112 | — | comments | nothing |

### Three things a naive rename gets wrong

**The email and the initials encode the name.** `sarah.chen@cobaltridge.com` is
lowercase, so it survives a `Sarah` grep, and `SC` encodes it in a form no pattern
can find. A rename that changes the name and leaves those two is visibly
half-done: the avatar still reads SC beside "Scott Florentino".

**Three components bypass the provider.** `ROLE_PROFILES` is exported and read
directly by `shell-user-profile-menu-items.tsx:43`, `PersonaSwitcher.tsx:28` and
`CaseDetailsTab.tsx:47`. Renaming inside the provider alone would leave "Sarah
Chen" in the persona switcher menu and in the case-details owner dropdown.

**"Sarah" alone is already derived, not authored.** `HomepageSplash.tsx:284` does
`profile.name.split(" ")[0]` for its greeting — "Good morning, Sarah". Renaming
the full name makes that read "Good morning, Scott" for free. There is no separate
first-name constant to change, so your "if the name is just Sarah" case needs no
rule of its own; it needs the derivation left alone.

---

## 2 · Three surfaces, not fourteen edits

### a. The demo dataset → two memos in `useCases.ts`

That file calls itself "Data access for the whole app" and already reads
`useFlags()`. Everything in `demoData` reaches React through exactly two root
memos — `cases` (line 73) and `actions` (line 260) — and every other hook derives
from them: `useCase` finds in `cases`, `useAction` and `useActionsForCase` in
`actions`, `useCaseActivity` builds from a case it is handed.

So a deep rename applied inside those two memos covers **all six** `demoData`
occurrences, including the free-text possessive at 745 and the `OWNERS` roster,
with no per-field work.

Verified as needing nothing: `AGENT_SUMMARY` and `DEMO_INSIGHTS` carry no name, so
`useAgentSummary` and `useInsights` are untouched; `activity.ts` imports nothing
from `demoData` and derives from what it is given.

### b. The persona → a flag-aware accessor

`ROLE_PROFILES` stays the source of truth. Add:

```ts
/** The cast as the app should show it, which depends on the flag. */
export function useRoleProfiles(): Record<Role, RoleProfile>
```

It returns the raw map, or a clone with the `lead` entry's **name, email and
initials** rewritten. Then four call sites consume it instead of the constant:
the provider itself, plus the three components above.

The `lead` triple is rewritten **explicitly**, not by pattern: the email needs
`scott.florentino@cobaltridge.com` rather than a substring swap, and `SC → SF`
cannot be pattern-matched safely — "SC" would match far too much.

### c. `coverage-decision.ts` → edited outright

Its only consumer is `RecordSections.tsx`, which is only in the coverage tree,
which only renders on the flagged page. When the flag is off nothing reads those
three strings, so they can simply say Scott Florentino. No accessor, no flag read.

---

## 3 · The rename itself

`src/lib/warranty/ciPersona.ts`:

```ts
/** Ordered, and the order is the whole correctness argument. */
const SUBSTITUTIONS: [RegExp, string][] = [
  [/\bSarah Chen\b/g, "Scott Florentino"],
  [/\bSarah\b/g, "Scott"],
];

export function renameText(s: string): string
export function renameDeep<T>(value: T): T
```

**Order matters.** "Sarah Chen" must resolve before "Sarah", or the full name
becomes "Scott Chen".

**Possessives fall out for free.** `\bSarah\b` matches in "Sarah's" because the
apostrophe is a non-word character, so line 745 becomes "Scott's combined-cause
finding" and line 415 "off Scott Florentino's queue". Both are correct English
without a rule of their own.

**Word boundaries, so no substring damage.** Nothing else in the app contains the
letters — checked — but the boundary is what keeps that true after the next
`demoData` edit.

**`renameDeep` skips identifier keys.** `id`, `caseId`, `actionId`, `instanceId`.
I verified no identifier carries the name today; the skip list is what stops a
future one being silently rewritten and breaking a lookup.

---

## 4 · Files touched

| file | change |
|---|---|
| `lib/warranty/ciPersona.ts` | **new** — the substitutions, `renameText`, `renameDeep` |
| `lib/warranty/useCases.ts` | `ciCoverageDecision` into the two existing `useFlags()` calls; `renameDeep` inside the `cases` and `actions` memos |
| `lib/role/RoleProvider.tsx` | `useRoleProfiles()`; the provider consumes it |
| `components/ui/shell-user-profile-menu-items.tsx` | read the accessor |
| `components/warranty/PersonaSwitcher.tsx` | read the accessor |
| `components/warranty/CaseDetailsTab.tsx` | read the accessor |
| `lib/coverage/data/coverage-decision.ts` | three strings, edited outright |

Seven files. No component that merely *displays* a name changes — the rename
happens where the data is read, which is the point.

---

## 5 · Two edges worth your decision

**A name written while the flag was on survives turning it off.**
`recordDecision(action, outcome, profile.name, reason)` writes the decider into
session state, and `CaseDetailsTab`'s owner dropdown writes a chosen owner. Both
merge back through the `actions` / `cases` memos — where the rename only runs
Sarah→Scott, never the reverse. So a decision filed as Scott Florentino still says
Scott after the flag goes off.

It self-heals on reload: `useCases.ts` keeps session state in module memory
precisely so "a run should start clean every reload". A mid-demo toggle is the only
way to see it, and `resetDemoState()` clears it on demand. **Recommendation: leave
it, and know it.** Making the rename reversible would mean mapping Scott→Sarah as
well, and then a case genuinely owned by a Scott could never be shown.

`CaseDetailsTab:79` has a sharper version: it looks a title up by
`p.name === v`. Pick an owner with the flag on, turn it off, and the lookup misses
and the role goes blank. Fixed for free by having that component read the accessor
— both sides of the comparison then come from one map.

**The flag's label no longer describes it.** `ciCoverageDecision` is labelled "CI
Coverage decision" / "Showcase the coverage decision page for CI", and it would now
also rename the lead across every screen. You asked for this flag, so I would keep
it and widen the hint — something like "…and renames the lead to Scott Florentino
app-wide". Say if you would rather have a second flag; it is a five-line addition
and the rename would read `flags.ciPersonaName` instead.

---

## 6 · Verification

Flag **on**, every surface that names the lead:

| surface | expected |
|---|---|
| sidebar profile | Scott Florentino · scott.florentino@cobaltridge.com · avatar **SF** |
| persona switcher menu | Scott Florentino, Warranty Resolution Lead |
| morning brief | "Good morning, **Scott**" — the derived first name |
| work queue | WR-2026-0417 owner Scott Florentino |
| case header / Details tab | owner Scott Florentino; the owner dropdown lists him |
| task queue + action detail | assignee Scott Florentino |
| reassessment card | "…against **Scott's** combined-cause finding" |
| filed record stamp | "Scott Florentino · 10:51 AM · submitted…" |
| evidence added by the reviewer | chip reads Scott Florentino |
| CI page secondary actions | "owner: Scott Florentino", "off Scott Florentino's queue" |
| filler cases | any owned by the lead read Scott Florentino |

Flag **off**: every row above reads Sarah Chen / sarah.chen@cobaltridge.com / SC /
"Sarah's" again, on a fresh load.

Also: `grep -rin "sarah" src` should return **only the three comments** plus
`ciPersona.ts`'s own substitution table. The comments stay — they record why the
demo cast is what it is, and rewriting history to match a flag would make them lie.

`tsc -b` and `npm run build` clean.

---

## Applied

Built as planned. `tsc -b` and `npm run build` clean, zero console errors.

`src/lib/warranty/ciPersona.ts` is new; eight files touched. `demoData.ts` and
`RoleProvider.tsx` still say **Sarah Chen** — they are the source of truth and the
flag-off answer. The rename happens on read.

### Verified with the flag ON

| surface | reads |
|---|---|
| sidebar, both blocks | `Scott Florentino` · `scott.florentino@cobaltridge.com` · avatar **SF** |
| shell profile menu | `Scott Florentino` / `scott.florentino@cobaltridge.com` |
| both persona switchers | `Scott Florentino`; Miguel, Ryan and Kelsey untouched |
| morning brief | "Good morning, **Scott**" — the derived first name, no rule of its own |
| work queue owner column | `Scott Florentino` |
| case header, Details tab, owner dropdown | `Scott Florentino` |
| the case's AI summary prose | "…owned by **Scott Florentino**." |
| task queue + action detail | "Assigned to **Scott Florentino**" |
| CI decision page | `Scott Florentino` |

`Sarah` count on every page: **0**.

### Verified with the flag OFF

Every surface back to `Sarah Chen`, the email to `sarah.chen@cobaltridge.com`, the
avatar to `SC`, the greeting to "Good morning, Sarah". `Scott` count: **0**.

And the coverage-decision URL renders the **old console**, which confirms the
reasoning in §2c: nothing reads `coverage-decision.ts` with the flag off, so
hardcoding those three strings is safe.

### The substitutions, unit-checked

| input | output |
|---|---|
| `owner: Sarah Chen` | `owner: Scott Florentino` |
| `against Sarah's combined-cause finding` | `against Scott's …` |
| `against Sarah’s …` (curly apostrophe) | `against Scott’s …` |
| `off Sarah Chen's queue` | `off Scott Florentino's queue` |
| `Good morning, Sarah` | `Good morning, Scott` |
| `Sarahcorp Ltd` | **unchanged** |
| `MacSarah` | **unchanged** |

Both apostrophe forms work, and the word boundary holds against substrings.

### Decided while building

**The flag's documentation was widened**, since it now does two things. The hint
reads "Showcase the coverage decision page for CI, and name the lead Scott
Florentino app-wide", and the interface comment spells out which surfaces move.
Still one flag, as asked.

**`CaseDetailsTab` needed more than an import swap.** Its owner options *and* its
title lookup were module-scope constants off `ROLE_PROFILES`, and a constant
evaluated at import cannot read a flag. Both moved into a `resolveField` the
component applies to the owner field only; `CARDS` stays a constant. This also
closed the sharper bug §5 flagged — the lookup matched on `p.name`, so a renamed
dropdown over an un-renamed table would have blanked the role.

**The known edge stands as described.** A decision filed while the flag was on
still names Scott after turning it off, because the rename runs one way only. It
clears on reload, since session state is module memory by design.
