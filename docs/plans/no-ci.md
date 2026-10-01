# Plan — `noCi`, the coverage decision with the agent taken out

`noCi`, **off by default**, sits **last** in the left rail. Label **No CI**, hint
*"No diff collection for continuous improvement."*

On, `/cases/WR-2026-0417/tasks/coverage-decision` becomes a blank decision form: no
recommendation, no confidence, no evidence, no pre-filled money or words, and no
record of what moved. The reviewer picks a resolution, types an amount, writes a
rationale, and files.

> **One note on the position.** The ask says "last in the list, after CI narrow".
> Those were the same slot a week ago; `ciDiff` has landed since and sits at 13. This
> goes at **14 — last**, which is the instruction that still reads unambiguously.

---

## What the change actually is

Every bullet in the ask removes the same thing: **the agent**. The recommendation, the
confidence, the evidence it weighed, the money it derived, the words it drafted, the
revisions it left behind, and the diff of what the reviewer did to all of it. What is
left is the form with nothing in it.

That is worth naming because it decides where the work goes. Six of the eleven changes
are *not* rendering — they are the reducer, which owns the money and the words.

---

## 1 · The store is the hard part

Three behaviours are reducer-owned and cannot be undone by a component:

| | today | under `noCi` |
|---|---|---|
| initial `refund` | `min(agent.refund, limit)` | **0** |
| initial `reason` | the agent's assembled draft | **`""`** |
| `resolution.pick` | also sets `refund` from `refundFor(outcome)` | sets the resolution only |
| `refund.set` | also sets `resolution` via `derivedOutcome` | sets the refund only |
| every `reassess` | rewrites `reason`, pushes a revision | no-op |

### The coupling is TWO-WAY, and the ask only names one direction

`resolution.pick` setting the refund is the one the ask calls out. But
[`refund.set`](../../warranty-resolution-app/src/lib/coverage/store.ts) also runs
`derivedOutcome(refund, ceiling)` and **sets the resolution from the amount** — 0 is
Denied, the ceiling is Approved, anything between is PartialPlusGoodwill. Left in, the
reviewer types `$1.00` into the amount and the screen silently picks *Approve partial +
goodwill* for them, which contradicts "user will select manually" two bullets down. Both
directions go.

### `reassess` is reached from eight events, so it is guarded once

`resolution.pick`, `refund.set`, `mode.edit`, `mode.rest` and the four `evidence.*`
cases all funnel through it. Guarding each one is eight places to forget; guarding
`reassess` itself is one, and it is already the function whose whole job is "the agent
has something new to say". Under `noCi` the agent has nothing to say, ever.

### How the flag reaches the reducer

`useCoverageDecision(action, fixture)` gains a third argument, threaded into `Ctx`
beside `limit` and `slots`. Not a `useFlags()` call inside the store: `ctx` is a
`useMemo` and the initialiser reads it once, so the store stays a pure function of what
it is handed and remains testable without a provider.

### Toggling mid-session — the page keys on the flag

`useReducer`'s initialiser runs **once**. Flip the flag on a mounted card and `ctx`
rebuilds but `state` keeps the agent's refund and the agent's paragraph, so the card
would show a "blank" form with $4,940 and three sentences in it.

So `<Decision>` takes `key={noCi ? "no-ci" : "ci"}` in `CoverageDecisionCiPage`. The
toggle remounts the card and the form is genuinely blank.

**The trade, stated:** work in progress is discarded when the flag is flipped. That is
correct here — the flag changes what the form *is*, not how it looks — and it is the
opposite call from `ciNarrow`, which deliberately avoided a remount to keep scroll
position. Different flags, different answers, and the reason is that this one owns
state and that one owns a class.

---

## 2 · Surface by surface

| # | where | change |
|---|---|---|
| 1 | `CaseFacts` | the `Finding` comes out |
| 2 | `DecisionHead` | `confidence` passed `null`; the `PositionTag` and the recommendation name come out of both branches |
| 3 | `DecisionSection` | no `EvidenceList` |
| 4 | `RefundPanel` | unchanged — it is already an editable field; only the coupling that fed it goes |
| 5 | `RationalePanel` | `bare` — the header's right-hand cluster comes out |
| 6 | the three resolution cards | no `RecommendedChip` |
| 7 | `SubmitBar` | no reading sentence |
| 8 | `FiledRecord` | no evidence, no chip, `bare` rationale, **no `What changed`** |
| 9 | `ChangeManifest` on the live card | not rendered, whatever `ciDiff` says |

### The head keeps its absence line; the footer loses its sentence

Two elements currently read *"No resolution selected"* and the ask removes one of them.
The bullet is filed under **"in the footer of the section"**, so it is
`SubmitBar`'s bold sentence that goes. The head's 18px line stays: it is the head's
*subject*, and dropping it leaves the largest row on the card empty until something is
picked. What comes out of the head is the tag and the recommendation beside it — which
is what "showcase just selected resolution" asks for.

### The rationale header loses all three controls, not two

The ask names "the last edited and versioning dropdown". There is a third control in
that cluster: the **show-changes highlighter**, which diffs the current text against the
last revision. Under `noCi` `history` is permanently empty, so it is a control that can
never do anything — and `Last edited` is *already* hidden in that state, since it is
gated on `edited && editedAt`. Hiding the cluster as a unit is the only version of this
that leaves no dead affordance behind. One prop, `bare`, drops all three.

### The filed bar says `Filed`, and stops there

`SubmitBar`'s filed sentence reads *"Filed · change in position, 2 of 4 parts: …"*. That
is a changes indicator on the same row the ask empties, so under `noCi` the bar reads
**`Filed`** and nothing else.

---

## 3 · Submit gating needs no code, and that is worth checking rather than assuming

`disabled={!state.resolution || reasonMissing || busy}` already requires both a
resolution and a non-empty rationale. The ask is satisfied by the existing line.

What changes is that the second clause **starts mattering**. Today the rationale is
pre-filled by the agent, so `reasonMissing` is false from mount and the resolution is
the only real gate. Under `noCi` the field opens empty, so picking a resolution leaves
Submit disabled until something is typed. Same code, newly load-bearing — which is
exactly the kind of thing to verify on the running app rather than reason about.

---

## 4 · `ciDiff` becomes inert, and the rail should say so

`noCi` removes the manifest from both cards. `ciDiff`'s only job is to add the manifest
to the live one, so with `noCi` on that switch does nothing.

The app already has a mechanism for this — `suppressedFlags` in `flags.ts`, whose note
says the point out loud: *"leaving its toggle looking live invites someone to flip it
mid-demo and conclude the app is broken."* `ciDiff` gets an entry:

> *Overridden by No CI. The diff is not collected.*

A presenter flipping CI diff under No CI otherwise gets silence and no explanation.

---

## 5 · Where each component reads the flag

Split, deliberately:

- **`CaseFacts`, `DecisionSection`, `FiledRecord`** call `useFlags()`. They are page-level
  compositions of this one screen and already know what page they are on.
- **`RationalePanel` and `SubmitBar`** take a **prop** (`bare`, `showReading`). They are
  presentational leaves that render in the live card and the filed record both, and
  wiring a demo flag into a leaf makes it unusable anywhere the flag does not apply.

`CaseFacts` is used by this page only, so hiding the finding there cannot reach the
console or the actions pane, which draw `Finding` themselves.

---

## Files

| file | change |
|---|---|
| `lib/flags.ts` | `noCi` last in the interface, `DEFAULT_FLAGS` (`false`) and `FLAG_LABELS`; a `suppressedFlags` entry for `ciDiff` |
| `lib/coverage/store.ts` | `noCi` on `Ctx`; the `reassess` guard; `resolution.pick` and `refund.set` decoupled; the initialiser's `refund` and `reason` |
| `pages/cases/CoverageDecisionCiPage.tsx` | read the flag, pass it to the store, `key` the card on it |
| `components/coverage/CaseFacts.tsx` | hide the `Finding` |
| `components/coverage/decision/DecisionSection.tsx` | head, evidence, chip, and the two props |
| `components/coverage/decision/RationalePanel.tsx` | `bare` |
| `components/coverage/decision/SubmitBar.tsx` | `showReading` |
| `components/coverage/decision/FiledRecord.tsx` | evidence, chip, `bare`, and the manifest |

---

## Verification

| | check |
|---|---|
| **flag off** | the whole page is byte-identical to today — this is the regression that matters most |
| rail | **No CI** last, under **CI diff**; hint reads as specified |
| mount, on | no finding, no confidence, no tag, no recommendation, no evidence; amount **$0.00**; rationale **empty** |
| submit gate | disabled at mount; pick a resolution → **still disabled**; type a rationale → enabled |
| the coupling, forward | picking each of the three resolutions leaves the amount at whatever the reviewer set |
| the coupling, reverse | typing an amount does **not** select a resolution |
| the rationale | picking a resolution does not write, replace or append to it |
| rationale header | no stamp, no picker, no highlighter |
| resolution cards | no `Agent recommended` chip on any of the three |
| footer | no sentence at all before filing |
| **filed** | no evidence, no chip, no manifest, `bare` rationale, and the bar reads just `Filed` |
| `ciDiff` on **and** `noCi` on | still no manifest anywhere, and the rail marks CI diff overridden |
| reopen | returns to the blank form with what the reviewer entered intact |
| toggle live | flipping the flag on a part-filled card resets it (by the `key`), rather than leaving agent values in a "blank" form |
| build | `tsc -b` and `npm run build` clean |

---

## Applied

Built as written. Three things turned up during the build that the brief did not name,
all of the same kind — a changes indicator, or a reference to a section that is no
longer there.

### 1 · The reverse coupling (predicted in §1, confirmed)

`refund.set` derived the resolution from the amount. Verified before the fix and after:
typing `$2,500` now leaves all three resolution cards unselected, where it would have
selected *Approve partial + goodwill*.

### 2 · The stamp counted changes too

The filed record's stamp reads `Scott Florentino · 11:16 AM · submitted after 3 changes`.
That is a third changes indicator, after the manifest and the bar — and worse, it counts
against `opening`, the **agent's** position. Under `noCi` a reviewer who types a
rationale into an empty field and names a figure has "changed" the rationale and the
refund away from values that were never on their screen. Not a smaller number, the wrong
question. The clause is dropped; the stamp reads name and time.

### 3 · The submit button promised evidence the form does not have

Its second line reads `Resolution, refund, rationale and 3 evidence items` — naming a
section `noCi` removes, and counting rows the reviewer cannot see. It reads
`Resolution, refund and rationale` under the flag.

### Verified in the running app

| | result |
|---|---|
| **flag off, mount** | finding, confidence, `Agent recommended`, evidence, footer sentence and the agent's 162-character rationale all present |
| **flag off, filed** | `What changed` present, evidence present, stamp counts, footer reads `Filed · no change in position.`, payload names 3 evidence items — no regression |
| on, mount | no finding, no confidence, no tag, no recommendation, no evidence; amount **$0.00**; rationale **empty**; no header controls; card down to 5 children |
| reverse coupling | typing `$2,500` selects **no** resolution |
| forward coupling | picking *Approve full coverage* leaves the amount at what the reviewer typed and the rationale empty |
| head | reads `Approve full coverage` alone — no tag, no score |
| **submit gate** | disabled at mount; **still disabled** with a resolution picked; enabled on the first character of a rationale |
| filed | no manifest, no evidence, no chip, no header controls; stamp `Scott Florentino · 11:16 AM`; footer `Filed` |
| reopen | blank form returns with the reviewer's own resolution and rationale intact |
| `ciDiff` + `noCi` | no manifest anywhere, and the rail reads *"Overridden by No CI. The diff is not collected."* |
| rail | **No CI** last, under CI diff, hint exactly as specified |
| build | `tsc -b` and `npm run build` clean |

**Not observed, true by construction:** the live-toggle remount. The flags panel lives in
the sidebar footer and this page renders without the sidebar, so the flag cannot be
flipped while looking at the card — reaching it means navigating, which remounts anyway.
The `key` is in place for the case where that stops being true.
