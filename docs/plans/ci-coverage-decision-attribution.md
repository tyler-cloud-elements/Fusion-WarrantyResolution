# Plan — attribution badge and the What changed panel

Three changes to the CI coverage decision, all inside `src/components/coverage/`
and all behind `ciCoverageDecision`. Nothing outside the folder moves.

Worked examples:
- [`ci-coverage-decision-badge.html`](./ci-coverage-decision-badge.html) — items 1 and 2
- [`ci-coverage-decision-what-changed.html`](./ci-coverage-decision-what-changed.html) — item 3

---

## The finding that shapes all three

**`Change.by` is computed and never drawn.** `changesSince()` in
[`lib/coverage/store.ts:511`](../../warranty-resolution-app/src/lib/coverage/store.ts)
attributes every line to `"you"` or `"agent"`, and
[`FiledRecord.tsx:101`](../../warranty-resolution-app/src/components/coverage/decision/FiledRecord.tsx)
reduces it to a single number for the stamp. The panel itself prints none of it —
the tally that used to say "2 by you · 1 by the agent in answer" was deleted as
redundant wording, and the per-line attribution went with it.

That is exactly what you asked for in item 3: **a visual indicator that adds
information rather than words.** The data is already there and already correct.

The same fact drives items 1 and 2: the head's badge and the panel's rows are
answering the same question — *whose call is this* — so they should answer it
with the same two glyphs.

---

## 1 & 2 · The badge — `PositionTag`

[`DecisionSection.tsx:124`](../../warranty-resolution-app/src/components/coverage/decision/DecisionSection.tsx)

| | now | after |
|---|---|---|
| resting | `Recommended` | `◆ Agent recommended` |
| moved | `Override` | `👤 Human override` |

### The glyphs

`AiMark` (`components/ui/ai-mark.tsx`) for the agent — the Apollo Vertex mark the
app uses on every AI-driven surface, in nine files already. `UserRound` for the
reviewer, drawn exactly as `EvidenceList.tsx:274` draws it on an
`addedByReviewer` row: `size-3`, `fill="currentColor"`, `strokeWidth={0}` both as
prop and inline style. So the pair the panel uses below is the pair the head
uses, and neither is a new mark.

A glyph on *both* states, not just the recommended one. They are two values of one
field, and a badge that grows an icon when it changes reads as two different
components rather than one that moved.

### The stale comment that has to go

The current doc block argues the glyph was *removed* on purpose:

> It carried a `Sparkles` glyph, which is the same mark the AI avatar 12px to its
> left already makes — the strip said "this is the agent" twice on one line

**There is no AI avatar on the head any anymore.** The row renders `⚖ Decision`,
then `Deny coverage · ● · Recommended` — confirmed in the running app. The avatar
that argument depended on is gone, so the badge is now the only AI signal on the
line and the glyph has nothing to duplicate. The comment gets rewritten to say
that, rather than left standing as a reason not to do what we are doing.

The same block's contrast note **stays true and stays honoured**: `text-insight-600`
on `bg-insight-100` is 3.86:1, under the 4.5:1 that 11px type needs, which is why
the label takes `text-foreground` (12.81:1). So:

- **label** → `text-foreground`, unchanged. Still 12.81:1.
- **glyph** → `text-insight-600`. Icons are held to WCAG 1.4.11's 3:1 for non-text
  contrast, not 4.5:1, and 3.86:1 clears it. The hue lands on the mark, where it
  says "agent", and off the text, where it was failing.

Not the `--ai-gradient` disc treatment (`size-5 rounded-full` + gradient) that
`DecisionConsolePage` and `AssessmentPanel` use: that is sized for a 20px avatar
beside a heading, and inside an 11px pill it would be a third bordered object in a
row that already has a dot and a chip.

### Width

"Agent recommended" is 17 characters against 11, plus a 12px mark and its gap —
roughly 62px wider. The head's value row is already `flex-wrap` with `gap-2`
(`DecisionSection.tsx:246`), so at narrow widths the badge wraps to its own line
under the position rather than pushing anything. Nothing downstream constrains it:
the old worry about the label collapsing to "Rec" was about a second badge inside
the resolution card, and that badge no longer exists.

`whitespace-nowrap` stays, so the badge wraps as a unit and never breaks
mid-phrase.

---

## 3 · The What changed panel

[`FiledRecord.tsx:250`](../../warranty-resolution-app/src/components/coverage/decision/FiledRecord.tsx)

Your constraint: **no more verbose wording, base structure is fine.** So every
string on every row is unchanged — `part`, `subject`, `from`, `to` and `detail`
all print exactly what they print today. What changes is what sits *beside* them.

### Four additions, all glyphs

**a. A part icon**, 16px, muted, in its own leading column. The word stays; the
icon is the scan target.

| part | icon | why that one |
|---|---|---|
| Resolution | `Scale` | the Decision head's own icon, 200px up the card |
| Refund | `Banknote` | the one new import — the app has no money glyph today |
| Rationale | `Pencil` | the folder's edit glyph (`EvidenceList`, `RationalePanel`) |
| Evidence | `Highlighter` | the folder's evidence glyph (`EvidenceComposer`) |

**b. The attribution, at the row's right edge.** `AiMark` in `text-insight-600`
for `by: "agent"`, `UserRound` filled in `text-muted-foreground` for `by: "you"`.
No label — the head's badge teaches the pair, and this is the same pair. This is
the new information; everything else here is polish.

**c. The move, drawn with the folder's own value glyphs.** `RankBars` and
`CallDot` already exist in
[`LabelledSelect.tsx`](../../warranty-resolution-app/src/components/coverage/LabelledSelect.tsx)
and are what the evidence rows above draw, so a reader recognises them:

| the change | drawn as |
|---|---|
| relevance moved | `RankBars(from)` → `RankBars(to)`, flanking the arrow |
| call moved | `CallDot(from)` → `CallDot(to)` |
| refund moved | `ArrowUp` / `ArrowDown`, success ink up, muted down |
| item added | `Plus`, success ink |
| item removed | `Trash2`, destructive ink |
| rationale rewritten | `Pencil`, muted |
| nothing changed | `Check` in success ink beside the existing sentence |

**d. The arrow becomes an icon.** `ArrowRight` at `size-3`, muted, replacing the
`→` character. With glyphs either side of it, a text arrow sits on the wrong
baseline.

### How the panel knows which glyph to draw

`from` and `to` arrive pre-formatted — `"High"`, `"Approve"`, `"$4,940.00"` — so
three of the seven rows above need the value behind the string.

**Recommended: one new optional field on `Change`.**

```ts
/** Which way an ordinal move went, where the values were numbers. */
up?: boolean;
```

Set in one place, `changesSince`'s Refund branch, where `s.refund` and
`openingRefund` are still numbers:

```ts
up: s.refund > openingRefund,
```

The two enums need nothing new: `label()` is a pure title-case of the enum value,
so the panel inverts it with a four-entry lookup — `"Not relevant"` →
`"not-relevant"` — and a string outside both sets simply draws no glyph. That
keeps the store edit to one line and the drawing knowledge in the component that
draws.

**The alternative**, if you would rather nothing infer: carry `fromValue`/`toValue`
as the raw `Importance | EvidenceCall | number` alongside the labels. More
explicit, three new fields, and the component still has to switch on their type.
Say the word and I will do it that way instead.

### Layout

One structural change, and it is alignment rather than shape:

```diff
- flex items-baseline gap-2.5 px-3.5 py-2   // part in a w-[88px] spacer
+ grid grid-cols-[16px_88px_minmax(0,1fr)_auto] items-center gap-x-2.5 px-3.5 py-2
```

The fixed-width part column is doing a grid's job in a flex row, which is why the
values do not line up once rows carry glyphs of different widths. A real grid
aligns the icon, the word, the value and the attribution down the whole list.

`items-baseline` → `items-center`, now that rows carry glyphs rather than only text.
Plus `hover:bg-muted/40` per row, so a long manifest is readable across.

The header row, the `border-b border-border/50` separators, the `rounded-xl border`
container and the empty-state sentence are all untouched.

---

## Files touched

| file | change |
|---|---|
| `components/coverage/decision/DecisionSection.tsx` | `PositionTag`: two strings, two glyphs, and its doc block rewritten |
| `components/coverage/decision/FiledRecord.tsx` | the What changed rows: grid, part icons, move glyphs, attribution |
| `lib/coverage/store.ts` | one optional `up?: boolean` on `Change`, set in the Refund branch |

Three files, all inside the flagged screen's own tree. `ui/ai-mark.tsx`,
`ui/dropdown-menu.tsx`, `LabelledSelect.tsx` and everything under
`components/warranty/` are read from, not edited — so the flag-OFF console and the
rest of the app are untouched, and `git status` should still show the same three
pre-existing modified files plus these.

---

## Verification

| | check |
|---|---|
| badge, resting | `◆ Agent recommended`, mark in insight ink, label in foreground |
| badge, moved | `👤 Human override` on `bg-muted`, same height, head does not reflow on the first click |
| badge, narrow | wraps as a unit below the position at ~900px, never mid-phrase |
| badge, dark | both states legible on `.dark`; insight mark against `insight-800` |
| panel, each part | file a decision that moves all four — resolution, refund, rationale, and an evidence row — and check one icon per row |
| panel, relevance | Low → High draws one bar then three, same glyph as the row above |
| panel, call | Approve → Deny draws `✓` then `✗` in their own inks |
| panel, added/removed | capture an item, then remove one, and check `Plus` / `Trash2` |
| panel, refund | a higher refund draws `ArrowUp` in success ink, a lower one `ArrowDown` in muted |
| panel, attribution | a reviewer edit shows `UserRound`; an agent reassessment shows `AiMark` |
| panel, empty | submit with no changes: `Check` beside the existing sentence, wording identical |
| wording | diff the strings — `part`, `subject`, `from`, `to`, `detail` and the empty sentence all byte-identical |
| flag OFF | the console's own decision card and its `DecisionForm` unchanged |
| build | `tsc -b` and `npm run build` clean |

---

## Applied, and what differed from the plan

**One improvement over the plan.** The enum inverses are exact rather than
hand-rolled: `label()` in the store is now exported as `changeValueLabel`, and the
manifest maps `IMPORTANCE_OPTIONS` / `CALL_OPTIONS` through the very function that
printed the strings. The plan proposed a four-entry lookup in the component, which
would have been a second copy of the title-case free to drift — and would have been
*wrong* for calls: the store spells `partial` as "Partial" while `CALL_OPTIONS`
labels it "Partially approve", so matching on the option label would have silently
dropped the `CallDot` on every call change.

Everything else is as planned: one `up?: boolean` on `Change`, set in the Refund
branch; `PART_ICON` giving Scale / Banknote / Pencil / Highlighter; `ValueGlyph`
reusing `RankBars` and `CallDot`; `MoveGlyph` for Added / Removed / Rewritten;
`Hand` drawing `AiMark` or `UserRound`; the grid replacing the flex-plus-spacer;
`ArrowRight` replacing the `→` character; and a `Check` on the empty state.

### Verified in the running app

| | result |
|---|---|
| badge, resting | `Agent recommended` with the `AiMark` in insight ink |
| badge, moved | `Human override` with the filled `UserRound`, on `bg-muted`, beside the `updated 10:50 AM` stamp |
| all six move kinds | filed a decision that moved the resolution, the refund, the rationale, one relevance, one call, and added an item — one part icon per row, `▁ Low → ▁▂▃ High` off `RankBars`, `✓ Approve → ✗ Deny` off `CallDot`, `+ Added` in success ink, and an up arrow on the refund |
| the attribution, which is the point | five rows drew `by you` and the Rationale row drew `by the agent` — read back off the DOM's own `aria-label`s. The agent re-drafting in answer to the reviewer's edits is now legible at a glance, and was invisible before |
| alignment | the four columns line up down the list despite glyphs of different widths |
| empty state | the sentence is byte-identical — read back off the DOM — with one `Check` added |
| wording | no string changed anywhere: `part`, `subject`, `from`, `to`, `detail` and the empty sentence all print what they printed |
| containment | nothing outside `components/coverage/` and `lib/coverage/` imports from them except the CI page and the flag branch, so the flag-OFF console is untouched |
| build | `tsc -b` clean, `npm run build` clean, zero console errors on a fresh load |

### Then reverted, by request: the attribution column

The third mark at each row's right edge — `AiMark` against `UserRound` — came
back out. On a filed record almost every line is the reviewer's, so the column was
a stack of one glyph with an occasional exception in it, and it put a third thing
to read on a row whose job is to say what the value used to be.

`Change.by` stays in the store and the stamp above the manifest still counts it.
What remains on each row is the part icon and the move: `Scale`/`Banknote`/`Pencil`/
`Highlighter` on the left, then `RankBars`, `CallDot`, `Plus`/`Trash2`/`Pencil`, the
refund's direction arrow and `ArrowRight` through the middle. The grid dropped its
trailing `auto` column; `AiMark` and `UserRound` dropped out of this file's imports.

The head's badge is unaffected — it keeps both marks, which is where the pair
earns its place: there it distinguishes two states of one field rather than
labelling a list that is nearly all one value.
