# Plan — align the filed record with the live decision card

Filing the decision re-orders the card and re-draws four of its sections in bespoke
markup. The record becomes the same sections, in the same sequence, rendered by the
same components in a read-only mode.

Worked example: [`ci-coverage-decision-filed-alignment.html`](./ci-coverage-decision-filed-alignment.html)

Screen: `/cases/WR-2026-0417/tasks/coverage-decision`, behind `ciCoverageDecision`.

> Pre-existing, and unrelated to the submitted-bar change
> ([`ci-coverage-decision-submitted-bar.md`](./ci-coverage-decision-submitted-bar.md)).
> That change made it visible by putting the live bar and the record on one screen.

---

## The root cause, stated once

`FiledRecord.tsx` does not render the live components. It re-implements them. So every
restyle of the live card — and there have been several, all documented in the files
themselves — lands on one side only. The order drift and the five card divergences below
are not five bugs; they are one bug with five symptoms, and reordering the existing
markup would fix the cheapest symptom and leave the cause.

**So the fix is to render the live components read-only, not to restyle the copies.**

---

## 1 · The order

Probed off the running DOM, both states:

| live card | filed record, today | proposed |
|---|---|---|
| Decision head | Stamp + `Reopen` | Stamp + `Reopen` *(kept — see §6)* |
| **1 Evidence** | 1 Resolution | **1 Evidence** |
| **2 Amount + Rationale** | 2 Refund & authority + Rationale | **2 Amount + Rationale** |
| **3 Resolution** | 3 Evidence | **3 Resolution** |
| 4 Submit bar | 4 What changed | **4 What changed** |
| — | 5 Submitted bar | 5 Submitted bar |

The record runs the body **backwards**. The live card's own note explains the sequence it
is reversing — "the order the decision is actually reached: what the case rests on, then
the amount and the reasoning, then the call" — and a record of that decision has no
reason to read in the opposite direction.

`What changed` stays last: it is the only block with no live counterpart, and its own note
already argues for that position. It also stays outside the `aria-readonly` wrapper,
because it is commentary rather than one of the fields.

---

## 2 · The resolution cards — `ChoiceboxItem`, frozen

Five divergences, all measured on the running page:

| | live `ChoiceboxItem` | filed, today |
|---|---|---|
| ground | `bg-muted` on all three, always | transparent; `bg-primary/5` on the picked one |
| picked ring | 3px `primary/18`, soft, inline `boxShadow` | 1px solid `primary` (`ring-1 ring-primary`) |
| unpicked | `border-transparent`, full opacity | `border-border`, `opacity: .45` |
| radio marker | a real 14px dot, filled when picked | **none** |
| agent's pick | `RecommendedChip` beside the title | **nowhere** |

The last one is the one that costs a reader something: the record cannot say where the
decision started. `FiledRecord`'s own note claims otherwise — *"the one the agent opened
on is marked"* — and no code does it. **That comment is stale and should go with the fix.**

### `readOnly` on the group, not `disabled` on the items

`ChoiceboxItem` already has `disabled`, and it is the wrong lever: it applies
`opacity-50` to whatever it is on, so the picked card would dim too.

```diff
 export function ChoiceboxGroup({
   name,
   type = "radio",
   value,
   onValueChange,
+  readOnly = false,
```

```diff
 export function ChoiceboxItem({
   …
   disabled,
+  /**
+   * THE GROUP IS A RECORD, NOT A CONTROL.
+   *
+   * Distinct from `disabled`, which dims what it is on: here the PICKED card keeps
+   * its full treatment — rim, ring, marker, badge — and the unpicked ones go to
+   * 45%, because "one of three" is part of what was decided. The input is
+   * `disabled` underneath so arrow keys and form submission stay inert.
+   */
+  readOnly,
```

- input gets `disabled`, so nothing is focusable or checkable
- `cursor-default`, and the `hover:bg-muted/70` comes off
- picked: unchanged — `bg-muted`, `border-primary`, the 3px soft ring, the filled dot, the badge
- unpicked: `bg-muted`, `border-transparent`, `opacity-45`

The dimming is the record's own good idea and it survives. The `bg-primary/5` does not:
`choicebox.tsx` rejected a filled selection twice, once for looking like the Submit
button and once because white on `--primary` is 3.19:1.

---

## 3 · The evidence list — `EvidenceList`, read-only

| | live, from `COL` | filed, hard-coded |
|---|---|---|
| relevance column | `w-[136px]` | `w-[64px]` |
| decision column | `w-[160px]` | `w-[84px]` |
| column headings | present, each with a `COL_HINT` | absent |
| value grammar | `RankBars` + `CallDot` | plain text |

`evidenceColumns.ts` exists precisely so that the band's headings, every row and the
composer's line agree on these edges — its note says so at length. The filed record is a
fourth thing that never reads it.

**The value grammar is the sharpest of the four.** A filed record draws relevance as the
word "High" in its evidence rows and as three bars in its `What changed` manifest — two
grammars for one value, 200px apart, on one card. Rendering the live list read-only
settles it at the glyphs, which is what the manifest already chose.

```diff
 export function EvidenceList({
   evidence,
   dispatch,
   addedByName,
+  /**
+   * THE LIST AS FILED. The rows still OPEN — that was always the point
+   * (./FiledRecord.tsx's note on losing it was the regression) — but the two
+   * selects render as their values in the same two columns, the row actions go,
+   * and the composer's "Add evidence" goes with them.
+   */
+  readOnly = false,
 })
```

Read-only renders each control as `<RankBars/> High` and `<CallDot/> Approve`, right-
aligned in `COL.relevance` / `COL.decision` — the cells the triggers occupied, so the
column edges do not move between the two states.

**This is the largest piece of the change** and the one to build first, because the row
is where the two implementations diverge most.

---

## 4 · Amount and rationale

### Amount — `RefundPanel`, read-only

| | live | filed, today |
|---|---|---|
| width | `lg:w-[300px] lg:shrink-0` in a flex row | half the card, in `lg:grid-cols-2` |
| heading | `Amount`, with a `Breakdown` disclosure | `Refund & authority` |
| the figure | a 32px input, 16/600 | `TYPE.title` text |
| cost lines | the `Collapsible`, 3 lines | **dropped entirely** |
| meter + ceiling | yes | yes |

Two things to fix beyond the dress. The **heading**: one panel, two names, and `Amount`
is the live one. The **cost lines**: the record drops the breakdown the decision was
built from, which is a fact about the filing, not chrome. Read-only keeps the
`Collapsible` and renders the figure as text at the same 16/600 rung the input used, so
the rank is identical.

The 300px flex column replaces the 2-up grid. `DecisionSection`'s note is explicit that
ratio-based grids do not survive here and `flex` + `lg:w-[300px]` + `lg:shrink-0` is the
only set that does — so this is a copy of a solved problem, not a new layout.

### Rationale — `RationalePanel`, read-only

The record prints the final paragraph and nothing else. `state.reasonHistory` holds the
revisions, and the live panel shows `edited 14:28` with a `Current` chip and lets a
reviewer page back through them. On a filed decision that history is *more* interesting,
not less — the agent rewrote this paragraph when the position moved, and the manifest
says only "Rationale · Rewritten".

Read-only keeps the stamp and the revision navigation, and swaps the textarea for the
paragraph.

---

## 5 · Also found, not in the brief

- **`FiledRecord`'s stale comment** on the agent's pick being marked (§2). Delete with the fix.
- **`SHOW_RECORDED`** — the hidden downstream-effects block sits *inside* the
  `aria-readonly` form wrapper, between the evidence and `What changed`. It has no live
  counterpart, so it belongs beside `What changed`, after the four aligned sections. Still
  off; still a constant, for the reasons its own note gives.
- **Panel headings are a different rank on each side.** Live sections use the `Label`
  primitive; the record uses `TYPE.body font-semibold`. Reusing the components settles
  this for free.
- **No `Relevance` / `Decision` hints in the record.** They come back with the band.

---

## 6 · Deliberately NOT aligned: the head

The live card opens with `DecisionHead` — the position at 20px, the direction rule, the
confidence score, the `updated` stamp. The record opens with `CardHead "Decision"` and the
green stamp.

**Leave it.** The stamp is the record's header and it carries `Reopen`; `FiledRecord`'s
note already argues that a `DecisionHead` over a green tick says the same word twice. The
brief named the four body sections and not this one.

**One thing does get lost, and it is worth a decision:** the agent's **confidence score**
has no home on the filed card. It is a fact about the decision as filed — 87%, or whatever
the reassessment left it at — and the record drops it silently. Cheapest fix is a line in
the stamp's second row, beside the decider and the time. **Flagged, not assumed** — say if
you want it in and I will add it; it is one line either way.

---

## 7 · Phasing

The four sections are independent. In risk order:

1. **Order** — move three JSX blocks. No new props, no visual change. Ships alone.
2. **Resolution → `ChoiceboxItem` + `readOnly`** — small, self-contained, and it is the
   most visible divergence.
3. **Amount + Rationale → `readOnly`** — two panels, each gaining a text-instead-of-field
   branch.
4. **Evidence → `EvidenceList` + `readOnly`** — the largest, and it deletes
   `FiledEvidence` / `FiledEvidenceRow` outright.

Each step deletes bespoke markup rather than adding a mode beside it, so the drift cannot
come back through the door it came in.

---

## Files

| file | change |
|---|---|
| `components/coverage/decision/FiledRecord.tsx` | reorder to evidence → amount+rationale → resolution → what changed; render the live components read-only; delete the hand-rolled resolution cards, `FiledEvidence` and `FiledEvidenceRow`; drop the stale agent's-pick comment; move `SHOW_RECORDED` out of the form wrapper |
| `components/ui/choicebox.tsx` | `readOnly` on `ChoiceboxGroup` / `ChoiceboxItem` |
| `components/coverage/EvidenceList.tsx` | `readOnly` — values in `COL` cells, no row actions, no composer |
| `components/coverage/decision/RationalePanel.tsx` | `readOnly` — paragraph instead of textarea, history kept |
| `components/coverage/decision/DecisionSection.tsx` | `RefundPanel` gains `readOnly`; it lives in this file |

No store change. `SubmitBar` is untouched. Nothing outside the flag — `FiledRecord` has
exactly one importer (`DecisionSection`), which has exactly one (`CoverageDecisionCiPage`).

## Checks

- [ ] `tsc -b` and `npm run build` clean
- [ ] Section order identical in both states, probed off the DOM
- [ ] Resolution: picked card's ring is 3px `primary/18` in both states; marker present; chip on the agent's pick
- [ ] Evidence: `w-[136px]` / `w-[160px]` in both states; rows still open; no control is focusable
- [ ] `aria-readonly` still wraps the four fields and still excludes `What changed`
- [ ] Reopen returns the live card with every value intact
- [ ] Both themes; the narrow Actions layout where the columns stack
