# Plan — change-type badges in "What changed"

A badge before the value on every row of the filed record's manifest: green `+`
for an addition, yellow `O` for a modification, red `−` for a removal.

Worked example: [`ci-coverage-decision-change-badges.html`](./ci-coverage-decision-change-badges.html)

---

## What the rows look like now

`FiledRecord.tsx` draws each change as a four-part grid:

```
[part icon] [part] [ subject · │ fromGlyph from → MoveGlyph toGlyph **to** ↑ · detail ]
```

The change TYPE is currently carried by `MoveGlyph` — a `Plus` in success ink, a
`Trash2` in destructive, a `Pencil` in muted — and only on the three rows that have
no `from` to compare against. A relevance move, a call move, a resolution change
and a refund change get no type marker at all; they are inferred from the arrow.

## What changes

One badge per row, in a column of its own, before the value. It replaces
`MoveGlyph` rather than joining it — two markers for one fact is what the current
row already does badly.

```
[part icon] [part] [BADGE] [ subject · │ fromGlyph from → toGlyph to ↑ · detail ]
```

### The mapping, off the existing `Change` shape

No store change. `changesSince` already produces everything needed:

| badge | rows | test |
|---|---|---|
| green `+` | an evidence item filed by the reviewer | `to === "Added"` |
| red `−` | an evidence item removed | `to === "Removed"` |
| yellow `O` | everything else — resolution, refund, rationale, a relevance move, a call move | the remainder |

The third case is the common one, which is the right way round: a filed decision
mostly consists of things that moved, and additions and removals are the exceptions
worth spotting.

### Its own grid column

```diff
- grid-cols-[14px_88px_minmax(0,1fr)]
+ grid-cols-[14px_88px_20px_minmax(0,1fr)]
```

A badge inline at the head of the value cell would sit at a different x on every
row, because `subject` lengths differ — and the whole point of a type marker is
that you scan the column. 20px holds an 18px badge with the grid's existing
`gap-x-2.5` either side.

### The value stops being bold

`to` is `font-semibold` today, which is how the row currently says "this is the
new value". The badge says it now, so the weight comes off and `to` renders at
normal weight. `subject` KEEPS its semibold — that is the row's identity, not its
change — so an evidence row reads **Renewal within 3 months** · ▁ Low → ▁▂▃ High.

---

## The badge's colours, measured

`primitives.tsx` already resolved this exact question for the folder. Its
`CHIP_TONE` puts the hue in the **rim and the wash** and keeps the ink at
`text-foreground`, and the `PositionTag` note explains why: status ink on a tint
of itself is a contrast trap. The numbers confirm it, badly:

| | light | dark |
|---|---|---|
| hued glyph on its own 10% wash — **success** | 3.78 | 5.61 |
| hued glyph on its own 10% wash — **warning** | **1.78** | 5.17 |
| hued glyph on its own 10% wash — **destructive** | 3.48 | 4.79 |
| solid hue + white ink — success | **4.25** | **2.54** |
| solid hue + white ink — destructive | **3.92** | **3.10** |
| **`text-foreground` on a 10% wash** | **14.6 – 15.5** | **13.7 – 14.2** |

A yellow glyph on a yellow wash measures **1.78:1**. Solid fills fail too, in both
themes. Only the house pattern passes on all three tones.

So: **`border-<hue>/45 bg-<hue>/15 text-foreground`** — `CHIP_TONE`'s recipe with
the rim and wash a step stronger, because this chip is an 18px square rather than
a text pill and a `/30` rim on it is nearly invisible. Ink stays at 13.2–14.7:1.

### The hue is the secondary cue, and that is deliberate

The three washes are almost identical in **luminance** — `+` against `O` measures
1.06:1, `O` against `−` 1.00:1. They differ in hue alone, so in greyscale, or to a
reader with a red-green deficiency, the fills are indistinguishable.

**Which is exactly why the glyph matters.** `+` / `O` / `−` carries the meaning on
its own; the colour agrees with it. Asking the colour to carry it alone would have
been the defect, and the badge you have asked for is the fix.

### One source of truth for the recipe

`CHIP_TONE` is currently private to `primitives.tsx`. Export it as `TONE` and have
the badge consume it, so the folder's chip hues cannot drift into a second
definition. The badge supplies its own metrics — 18px square, centred glyph — and
takes the tone triplet from there.

---

## Two glyph choices for you

**`O` vs `○`.** You wrote `O`. At 11px a capital letter O is a beat away from a
zero, and it sits on a different optical weight from `+` and `−`, which are both
symmetrical strokes. `○` (U+25CB) reads as a shape rather than a letter and matches
their weight. The mock shows both rows side by side; either is one character.
**Recommendation: `○`.**

**`-` vs `−`.** A hyphen is short and rides high; U+2212 MINUS SIGN is drawn to
match the `+` it pairs with. **Recommendation: `−`**, and it changes nothing about
what the row means.

---

## What stays

- **`RankBars` and `CallDot`** flanking the arrow. They are the VALUES on their
  scales, not the change type, and the badge does not replace them.
- **The refund's `↑` / `↓`.** It says which way the money went, which the badge
  does not — a modification can be either. Keeping both is not duplication.
- **The part icon and the part name**, the `from` strikethrough, the `ArrowRight`,
  the `detail` clause, the hover, and every string on every row.
- **The empty state**, with its `Check`. No change of type has happened, so no
  badge applies.

---

## Files touched

| file | change |
|---|---|
| `components/coverage/primitives.tsx` | export `CHIP_TONE` as `TONE` |
| `components/coverage/decision/FiledRecord.tsx` | `ChangeBadge`, the new grid column, `MoveGlyph` removed, `to` unbolded |

Both inside the flagged screen's tree. No store change, no wording change.

---

## Verification

| | check |
|---|---|
| addition | capture an evidence item → green `+`, and the row still reads `… · Added` |
| removal | remove one → red `−` |
| modification | move a relevance, a call, the resolution and the refund → yellow `O` on all four |
| alignment | badges line up down the column regardless of subject length |
| one marker | `Plus` / `Trash2` / `Pencil` no longer appear beside the badge |
| weight | `to` is normal, `subject` is semibold |
| contrast | glyph ink is `foreground` on every badge; no hued-on-hue anywhere |
| greyscale | the three are still distinguishable with colour removed — the glyph does it |
| dark | all three legible on the dark card |
| empty state | unchanged, tick only |
| build | `tsc -b` and `npm run build` clean |
