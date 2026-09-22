# Plan — `ciDiff`, the live "What changed"

`ciDiff`, **off by default**, sits directly under **CI narrow** in the left rail. On,
the coverage decision's `What changed` manifest is drawn on the live card as well as
the filed one — hidden while nothing has moved, and recomputed on every render once
something has.

Scope is `/cases/WR-2026-0417/tasks/coverage-decision` and the components behind it.
Everything is inside the `ciCoverageDecision` surface already.

Every figure below was read off the running app at a 1173px window, not estimated.

---

## The finding: the diff is already live, it is just never asked

`changesSince`
([`store.ts:587`](../../warranty-resolution-app/src/lib/coverage/store.ts)) is a pure
function of `(opening, state, limit, money, name)`. `opening` is frozen at mount by
`useMemo` and already returned from `useCoverageDecision`. `DecisionSection` already
takes it as a prop, and already calls `changesSince` — once, inside `submit`.

| | today | needed |
|---|---|---|
| the diff function | pure, exported | unchanged |
| `opening` | already a prop of `DecisionSection` | unchanged |
| the call | once, in `submit` | also once per render |
| the panel | ~90 lines of JSX inside `FiledRecord` | extracted |
| per-render cost | `departuresOf` already runs every render | one more pass over 3 evidence items |

So the live computation is one line beside the one that is already there:

```ts
const departures = departuresOf(state, limit);          // exists
const changes = changesSince(opening, state, limit, moneyExact, fullName);  // new
```

**No new state, no new plumbing, no store change.** That is the whole reason this is
worth doing as a flag rather than a project.

---

## 1 · One bug the live panel would expose — the phantom Resolution row

**`changesSince` has never run before a resolution was picked, and it does not survive
it.**

At mount `state.resolution` is `""` — deliberately, and the store has a long note on
why ([`store.ts:746`](../../warranty-resolution-app/src/lib/coverage/store.ts)). But
`changesSince` opens with an unguarded comparison:

```ts
if (s.resolution !== opening.outcome) {
  out.push({ part: "Resolution", from: name(opening.outcome), to: name(s.resolution), … });
}
```

`opening.outcome` is `"Denied"`. `"" !== "Denied"`, so the row fires. And `name` is
`fullName`, which falls through to `resolutionFor(o).label`, which falls back to
`RESOLUTIONS[1]` — Deny — for any outcome it does not know, `""` included.

So the live panel would open, before the reviewer has touched anything, showing:

> **Resolution** · ~~Deny coverage~~ → Deny · *by agent*

A row claiming the resolution moved, from a value to the same value spelled shorter,
attributed to the agent. And because `changes.length` is 1, the panel would be
**visible at mount** — the exact opposite of "if there is no change, it is not going
to be visible".

**This is not hypothetical and it is not new.** `departuresOf` carries a guard for
precisely this case, with a comment recording the same bug being fixed in the submit
bar ([`store.ts:510`](../../warranty-resolution-app/src/lib/coverage/store.ts)):

> *"`"" !== "Denied"` is true, so without this the submit bar read `Change in position
> · 1 of 4 parts: resolution.` at mount, before the reviewer had done anything."*

**The fix is that guard, in the function that is missing it:**

```diff
-  if (s.resolution !== opening.outcome) {
+  // NOT HAVING PICKED ONE IS NOT A CHANGE — the same guard `departuresOf` carries,
+  // for the same reason, and unreachable until this function runs before a pick.
+  if (s.resolution !== "" && s.resolution !== opening.outcome) {
```

It is a no-op for the filed record, which can only be reached with a resolution
selected. It is load-bearing for everything below.

**Checked for siblings, and there are none.** The other three comparisons are all
sound at mount: `s.refund` is seeded `Math.min(agent.refund, limit)` against an
`openingRefund` of `Math.min(opening.refund, limit)` off the same `base`, so they
start equal; `s.reason` is seeded from `assess(…)` with the identical arguments that
built `base.reason`, so they start equal; and the evidence starts as
`fixture.evidence`, which *is* `opening.evidence`. Only the resolution opens departed
from itself.

---

## 2 · The extraction — `ChangeManifest`

The panel is currently inline JSX in `FiledRecord` plus five helpers above it. Both
cards have to draw it, and this repo has now been bitten twice by the alternative:
the data table carried a verbatim copy of `GLASS_CLASSES` and drifted the moment the
card's fill changed, and before that the filed record was a bespoke copy of the live
form and disagreed with it in eight places.

**New file: `components/coverage/decision/ChangeManifest.tsx`.** What moves, verbatim:

| | from `FiledRecord.tsx` |
|---|---|
| `PART_ICON` | :42 |
| `rankOf` / `callOf` / `ValueGlyph` | :66–:122 |
| `CHANGE_KIND` / `kindOf` / `ChangeBadge` | :124–:151 |
| the panel JSX | :415–:490 |

Its imports go with it — `ArrowDown`, `ArrowRight`, `ArrowUp`, `Banknote`,
`Highlighter`, `Pencil`, `Scale`, `CallDot`, `RankBars`, `changeValueLabel`,
`CALL_OPTIONS`, `IMPORTANCE_OPTIONS`, `TONE`. `FiledRecord` keeps `Check`, `Scale`
and the rest for its own use; `Check` is still needed by the `Recorded` block and by
the manifest's empty state, so it lands in both.

`FiledRecord` then renders what it used to inline:

```tsx
<ChangeManifest changes={changes} evidenceCount={evidence.length} />
```

**The seam stays in `FiledRecord`.** The `border-t border-border/70 pt-3.5` wrapper is
positional — it says "the record stops being the form here" — and the live card wants
the same seam for the same reason, but the two callers should each say so rather than
have the component assume it is always preceded by a form.

---

## 3 · Where it goes on the live card

**The same slot: after the resolutions, above the submit bar.**

This is not the neutral choice, it is the one that costs nothing at the moment of
filing. `FiledRecord` is the live form rendered read-only — that is the whole argument
of the filed-alignment pass — and the manifest is already its last block. Putting the
live manifest anywhere else means that pressing Submit *moves* it, on a card whose
recent history is a commit spent on the submit bar not moving under the pointer.

Same slot, same seam, same component: filing changes the panel's contents from live to
frozen and changes nothing else about it.

**The alternative, and why not.** Under the head, near the top — on the argument that
a reviewer working the evidence rows never sees a panel 700px below them. It is a real
argument and `DecisionSection`'s own note already concedes the general version of it:
the refund and the rationale moved below the rows, so "those two answers land off
screen for a reviewer working the rows near the top of a long list." But the head
strip is what answers the agent in view, and it already does; the manifest answers a
different question — *what am I about to file* — which belongs beside the control that
files it.

---

## 4 · The empty case

> *"if there is no change, it's not going to be visible"*

Live: `changes.length === 0` renders **nothing at all** — no panel, no seam, no gap.

Filed: the tick sentence stays exactly as it is. "The resolution, the refund, the
rationale and all 3 evidence items are as the case opened" is a positive statement a
record should make; a live card making it before the reviewer has started is noise.

**The caller decides, not the component.** `ChangeManifest` keeps the empty branch it
has today, and the live site guards:

```tsx
{flags.ciDiff && changes.length > 0 && (
  <div className="border-t border-border/70 pt-3.5">
    <ChangeManifest changes={changes} evidenceCount={state.evidence.length} />
  </div>
)}
```

A `hideWhenEmpty` prop would put the same condition inside the component and then have
the caller guard the seam anyway, which is the condition written twice.

---

## 5 · Two baselines, 16px apart — measured, and already shipping

This is the one thing worth arguing about before building.

The submit bar directly below diffs against `state.agent`, which **moves**. The
manifest diffs against `opening`, which **does not**. The store is explicit that this
is deliberate ([`store.ts:534`](../../warranty-resolution-app/src/lib/coverage/store.ts)):
two baselines, two questions, and conflating them "would make the record say nothing
changed on exactly the cases where the agent came round to the reviewer."

**Driven on the running app** — re-weight *Renewal within 3 months* Low → High, pick
Deny, submit:

| | says |
|---|---|
| the manifest | **2 rows** — `Rationale · Rewritten`, `Evidence · Renewal within 3 months · Low → High` |
| the submit bar, 16px under it | **"1 of 4 parts: 1 evidence change."** |

Both are correct. The rationale was rewritten *by the agent* in answer to the
re-weight, so it moved since the case opened (manifest) but has not departed from what
the agent currently says (bar).

**The mitigating fact: this already ships.** The filed card today reads *"Filed ·
change in position, 1 of 4 parts: 1 evidence change."* directly beneath a two-row
manifest. The live panel does not create the disagreement, it shows it 500ms earlier.

**Recommendation: ship it and change nothing.** Reconciling the two would mean giving
one of them the other's baseline, which the store spent a doc block explaining is
wrong. If it reads badly at the podium, the cheap fix is a caption on the manifest
header naming its baseline ("since the case opened") — one string, no logic — and that
is worth holding until somebody has actually looked at it.

---

## 6 · The attribution column — still no

`changesSince` tags every row `by: "you" | "agent"` and the manifest does not draw it.
That was decided for the filed record on the grounds that almost every line there is
the reviewer's, so the column was a stack of one glyph.

**The live mix is different, and it still does not need one.** On the live card the
agent's only move is the rationale rewrite — `reassess` touches `reason`,
`reasonHistory`, `reasonAt` and `touched.reason`, and explicitly not `resolution` or
`refund`. And that row already distinguishes itself in words: `changesSince` gives it
`detail: "replaced when the position moved"` when the agent wrote it against `"you
edited the draft"` when the reviewer did. Measured output:
`Rationale ○ Rewritten · replaced when the position moved`.

Everything else on the live card is the reviewer's by construction —
`resolution.pick` sets `touched: { resolution: true, refund: true }`, and every
evidence row is `by: "you"`. So a `by` column would be a stack of one glyph here too,
with the one exception already legible in the detail text.

---

## 7 · Layout — what it costs when it appears

Measured on the filed card at a 1173px window, two rows:

| | px |
|---|---|
| manifest panel | **108** (header 37, rows 35 + 34) |
| panel width | 809 |
| `pt-3.5` above it | 14 |
| the card's own `gap-4` | 16 |
| **total the card grows** | **139** at two rows, ~103 at one, +35 per further row |

The live card measured 775px at that moment, so it would become ~914px.

**Every insertion pushes the submit bar down; there is no placement that does not.**
What varies is whether the reviewer is looking at it when it happens:

- **The demo beat is safe.** Re-weighting an evidence row fires the panel ~700px below
  the pointer, off screen. By the time the reviewer scrolls to the resolutions the
  panel is already there and nothing moves under them.
- **The sharp case is picking a resolution first.** Choosing Approve as the opening
  action adds a Resolution row *and* a Refund row at once — ~173px appearing between
  the cards just clicked and the Submit button being reached for.

Not worth reserving space for (an empty bordered box is worse than a jump), and not
worth animating (nothing else on this card animates height). Worth knowing, and worth
watching once at the podium.

---

## Files touched

| file | change |
|---|---|
| `lib/flags.ts` | `ciDiff` in `FeatureFlags`, `DEFAULT_FLAGS` (`false`) and `FLAG_LABELS`, each **directly after `ciNarrow`** — the panel renders `Object.keys(FLAG_LABELS)` order |
| `lib/coverage/store.ts` | one guard in `changesSince` (§1) |
| `components/coverage/decision/ChangeManifest.tsx` | **new** — the panel and its five helpers, moved verbatim (§2) |
| `components/coverage/decision/FiledRecord.tsx` | renders `<ChangeManifest>`; ~150 lines and 13 imports leave |
| `components/coverage/decision/DecisionSection.tsx` | `useFlags()`, one `changesSince` call, the guarded block before `<SubmitBar>` (§3, §4) |

Five files, and the only new logic in any of them is a boolean guard.

`DecisionSection` reads `useFlags()` directly rather than taking a prop — the same
shape `usePageWidthClass` uses, and the page above it does not otherwise care.

Nothing under `components/warranty/` moves, so the flag-OFF console is untouched.

---

## Verification

| | check |
|---|---|
| **mount** | flag on, nothing touched — **no panel, no seam** (this is §1's guard; without it a phantom Resolution row shows here) |
| re-weight | *Renewal* Low → High — panel appears with 2 rows, `Rationale · Rewritten` and the evidence move |
| pick the agent's own | Deny — **no** Resolution row (`Denied === opening.outcome`) |
| pick an override | Approve — Resolution *and* Refund rows appear together |
| back to zero | undo an evidence edit via the composer — note the row **persists**, because `touchedByReviewer` is sticky by design while `changesSince` diffs values; the panel may show fewer rows than the evidence marks suggest, which is correct and worth eyeballing once |
| rationale | type in the field — `Rationale · Rewritten · you edited the draft`, and it does not flicker per keystroke |
| submit | the panel does not move, does not change size, and freezes — same slot, same seam |
| reopen | the panel returns live and agrees with the values on screen |
| **flag off** | the live card is byte-identical to today and the filed record still draws its manifest — the extraction must be invisible with the flag off |
| nav | **CI diff** at position 13, directly under **CI narrow** at 12 |
| dark | panel legible on `--card`; the badge tones are `TONE`, unchanged |
| narrow | with `ciNarrow` also on, the panel reflows at 960 and the 4-column grid holds |
| build | `tsc -b` and `npm run build` clean |

---

## Open, with defaults

1. **§5 — the two baselines.** Default is to ship the disagreement, since the filed
   card already ships it. The alternative is a `since the case opened` caption on the
   header.
2. **§3 — the slot.** Default is above the submit bar, matching the record. The
   alternative is under the head, which trades filing-time stability for visibility
   while working the rows.

Everything else I would build as written.

---

## Applied

Built as written, with both open questions taken at their defaults — the two
baselines left to disagree (§5), and the panel above the submit bar (§3). Nothing
differed from the plan.

### §1 was real, and the guard is what makes the flag work at all

Confirmed by building it: with `ciDiff` on and the guard in, the card mounts with **no
panel**. The guard is not a nicety — without it the panel is visible at mount on every
load, which is the one behaviour the flag was asked not to have.

### Verified in the running app

Driven at 1440x900, flag on unless stated.

| | result |
|---|---|
| **mount** | no panel, no seam — card has its usual 6 children |
| re-weight *Renewal* Low → High | panel appears, 2 rows, **108px**, second-to-last child, seam `border-t border-border/70 pt-3.5` |
| **card growth** | 775 → 914px = **139px**, the figure §7 predicted from the filed card |
| pick Approve (override) | Resolution and Refund rows appear together — `Deny coverage → Approve full coverage`, `$0.00 → $5,000.00` — 4 rows, 178px (+70, so 35px/row as predicted) |
| pick Deny (the agent's own) | both drop back off; 2 rows, 108px again |
| **submit** | exactly **one** manifest on the page, same 108px, same rows, same seam, still second-to-last — the panel does not move at the moment of filing, which was the argument for the slot |
| reopen | back to the live card, panel live and agreeing |
| the §5 disagreement, seen | 4 manifest rows above *"3 of 4 parts"*, and 2 rows above *"1 of 4 parts"* — as described, and as the filed card already read |
| **flag off** | no live panel before submit; the filed record still draws the manifest, and its empty branch still reads *"…all 3 evidence items are as the case opened"* — which also checks the `evidenceCount` prop |
| dark | badge ink `oklch(0.985 0 0)` on the 0.1 wash / 0.3 rim — `TONE` untouched; panel border resolves to the dark `--border` |
| rail | **CI Coverage decision → CI narrow → CI diff**, read off the rendered panel |
| console | no errors |
| build | `tsc -b` and `npm run build` clean |

### What the extraction cost

`FiledRecord.tsx` loses 127 lines of helpers, 76 of panel JSX and 9 imports, and gains
one element. `ChangeManifest.tsx` is 251 lines, all of them moved rather than written —
the panel renders byte-identically on the filed card, which the flag-off pass confirms.
