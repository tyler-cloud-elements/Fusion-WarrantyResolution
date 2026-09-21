# Plan — make the CI coverage decision look like the rest of the app

Style only. Every change below swaps a bespoke treatment for the app component that
already does that job. **No information is added, removed or reworded; no section,
row or fold moves; no control changes behaviour.**

Worked examples:

- [`ci-coverage-decision-app-alignment.html`](./ci-coverage-decision-app-alignment.html) — the measured gap, element by element
- [`ci-coverage-decision-app-alignment-result.html`](./ci-coverage-decision-app-alignment-result.html) — the finished page, top to bottom, light and dark

Screen: `/cases/WR-2026-0417/tasks/coverage-decision`, behind `ciCoverageDecision`.

---

## The reference, and one thing it is not

Measured on `/cases/WR-2026-0417` (case detail) and `/cases` (work queue) — the two
screens named as the target.

**The flag-OFF console is not the reference.** It is denser than either: 36 uppercase
runs, 7 monospace runs, 9.5px badges. The CI page is already closer to the app than the
screen it replaces, which is worth saying because it means this is a finishing pass, not
a rescue.

## The measured gap

| element | case page (target) | CI page (now) |
|---|---|---|
| page `h1` | **24px / 700** | 20px / 600 |
| status chip | no rim · `/15` wash · **status-coloured ink** · `2px 8px` | **1px `/30` rim** · `/10` wash · neutral ink · `3px 10px` |
| header readings | caption over value, caption `12px/300` | three values inline, no captions |
| SLA | `SlaBadge` + remaining text | bespoke conic-gradient ring + text |
| monospace | **0 runs** | 2 runs |
| case facts | `**Asset** SR-440 · **Owner** …` | a lucide icon before each fact |
| big figure | none — claim is inline meta | **24px / 700**, the app's `h1` rung |
| breadcrumb | destination-named, `14px` | case-named, `12px` |
| header card padding | `24px` (`p-6`) | `20px` (`p-5`) |
| page gutters | `PageContainer` 16 / 24 / 32 | bespoke `24px`, max `1180px` |
| card radius + surface | 18px glass | **18px glass** ✅ |
| card head rank | 16px / 600 | **16px / 600** ✅ |

Two of twelve are already right — the earlier reskin got the cards and the section
heads. What is left is the header's whole vocabulary plus four small things.

---

## 1 · The chip — `ToneChip` → the app's `Badge`

The single biggest tell. Every status on this page is a rimmed, neutral-ink pill; every
status everywhere else is rimless, tinted and **status-coloured**, so the meaning is
legible from the colour of the word.

`Pill` in `coverage/primitives.tsx` is already a thin alias, so repointing it moves every
status on the page at once:

```diff
 export function Pill({ tone, children, className }) {
-  return <ToneChip tone={tone} className={className}>{children}</ToneChip>;
+  return <Badge variant="secondary" status={STATUS_FOR[tone]}>{children}</Badge>;
 }
```

`TONE`'s six names map onto `Badge`'s four statuses plus `outline`:

| `ToneChip` tone | `Badge` |
|---|---|
| `ok` | `status="success"` |
| `bad` | `status="error"` |
| `warn` | `status="warning"` |
| `info` | `status="info"` |
| `brand` | `status="info"` |
| `plain` | `variant="outline"` |

**The catch, and it is the reason this is not a one-line change.** That file moved *away*
from `Badge` deliberately: the findings group had grown bordered chips for its verdict and
its two cause sides, and the page then spoke two chip languages at once. So the direct
`ToneChip` users move in the same commit or the swap just relocates the inconsistency:

- `coverage/Finding.tsx:104` — the "no rule covers both causes" verdict
- `coverage/Finding.tsx:157` — the on-us / on-them cause markers
- `coverage/CaseFacts.tsx:65` — the `Strategic` chip

After that, `ToneChip` has no callers on this page and `TONE` is only read by
`FiledRecord`'s change badges, which are 18px glyph squares rather than text pills and
should keep it.

## 2 · The header — same facts, the app's arrangement

Three readings inline with no captions → the app's `Meta` columns, caption above value at
`12px/300`. Same three readings, same order.

```
Status              Stage                 SLA 4 HR
[Action required]   Resolution decision   [At risk]  2 hr 13 min left
```

- `SlaChip`'s conic ring → `SlaBadge` + the remaining time as muted text, which is the
  hero's own pairing. Both derive from the same elapsed-vs-budget figure, so nothing is
  lost; the proportion stops being drawn and starts being named.
- The case id and customer drop to a `12px` muted sub-line under the title, as the hero
  does with `WR-2026-0417 · Joliet DC`.

**This is what pays for the 24px `h1`.** The title sits at 20px today because it shares a
line with four other things — `primitives.tsx` says so and measured it at 620px of 1132.
Moving the readings into columns frees the line, so the app's `24/700` fits without
crowding. **The two changes are one change**, and doing the `h1` alone would reintroduce
exactly the crowding that note describes.

## 3 · The small four

| | now | proposed |
|---|---|---|
| monospace | `TYPE.meta` is `font-mono text-[11px]` | `text-xs` muted — the case page uses mono nowhere |
| case facts | a lucide glyph before each | `**Asset** SR-440 · SN 2823-1147`, the hero's form |
| claim figure | `TYPE.figure` 24/700 | 20/600 — stays put, keeps emphasis, stops out-ranking the title above it |
| breadcrumb | 12px | 14px, the app's crumb rung |

`Label` also goes `font-normal` → `font-light` to match `Meta`'s caption.

## 4 · Container

`PageContainer` in place of the bespoke wrapper, so the gutters are the app's 16 / 24 / 32
and the vertical padding is `py-6`. The header card goes `p-5` → `p-6`, which is the
hero's padding; the other cards keep `p-5`, which is what every other non-hero card in the
app uses.

---

## Deliberately not in this change

- **The page toolbar.** Both reference screens carry Refresh and Ask AI top-right; this
  page has neither. Adding them is new *functionality*, which is outside the brief — named
  so the remaining gap is known rather than forgotten.
- **The centred reading column.** The case page is full-width with a right rail; this is a
  1180px centred column. Going full-width would restructure the layout rather than restyle
  it. The gutters align; the column stays.
- **Section order, wording, folds, controls, and the evidence / resolution / manifest
  internals.** All untouched — the last change already put those on the app's components.

---

## Files

| file | change |
|---|---|
| `components/coverage/primitives.tsx` | `Pill` → `Badge` with the tone map; `TYPE.meta` drops mono; `Label` → `font-light` |
| `components/coverage/Finding.tsx` | verdict chip and the two cause markers → `Badge` |
| `components/coverage/CaseFacts.tsx` | `Strategic` chip → `Badge`; icon-led fact strip → bold-label strip; claim figure 24/700 → 20/600 |
| `pages/cases/CoverageDecisionCiPage.tsx` | `h1` → 24/700; readings → `Meta` columns; `SlaChip` → `SlaBadge` + text; id/customer → sub-line; breadcrumb 12 → 14px; `PageContainer`; hero `p-6` |

No store, no reducer, no data props, no new tokens. Every edit is a class or a component
swap, which is what makes it safe in one pass and revertible in pieces.

## Phasing

Independent, in ascending risk:

1. **The small four + container** — pure token edits, no structural change.
2. **The chip** — `primitives.tsx` plus the three direct `ToneChip` callers, together.
3. **The header** — `Meta` columns and the `h1` rung, as one change.

## Checks

- [ ] `tsc -b` and `npm run build` clean
- [ ] Every status on the page is rimless with status-coloured ink; `ToneChip` has no
      remaining callers outside `FiledRecord`'s change badges
- [ ] `h1` computes 24px / 700; no other element on the page is at that rung
- [ ] 0 monospace runs, matching the case page
- [ ] Header readings are caption-over-value at `12px/300`
- [ ] Section order, row order and fold order byte-identical to before — probed off the DOM
- [ ] Submit, reopen, evidence edits and the composer all behave exactly as now
- [ ] Both themes; the narrow layout where the columns stack
- [ ] Flag off, and any case without a fixture, still render the old console untouched
