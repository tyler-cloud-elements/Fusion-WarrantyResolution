# Plan — open with no resolution selected

Four changes to the CI coverage decision, all inside the flagged screen's own
tree. Nothing outside it moves, and the flag-OFF console is untouched.

Worked example: [`ci-coverage-decision-unselected.html`](./ci-coverage-decision-unselected.html)

---

## What it does today, and why that is the problem

The card opens with **Deny already selected**, because the store seeds
`resolution` from the agent's recommendation:

```ts
resolution: agent.outcome,          // store.ts, the reducer's initialiser
```

So the reviewer arrives at a screen where the decision appears already made, the
head announces "Deny coverage · Agent recommended", and Submit is live. The only
thing separating "the agent proposes this" from "I have decided this" is a
sentence in the head — and pressing Submit without touching anything files a
denial the reviewer never actively chose.

## What it does after

The card opens with **nothing selected**. The recommendation is still stated —
twice, deliberately: the head says what the agent proposes, and the recommended
card wears the badge. Submit is disabled until the reviewer picks one. Every
other behaviour is unchanged.

---

## 1 · Open unselected

`store.ts`, the reducer's initialiser:

```diff
- resolution: agent.outcome,
+ // NOTHING IS SELECTED AT MOUNT, and that is the whole point of the screen:
+ // the agent proposes and a person decides, so the card must not open holding
+ // a decision nobody made. The recommendation is still on screen — the head
+ // names it and the card it belongs to wears the badge — it is just not
+ // standing in the answer's place.
+ resolution: "",
```

**`""` is already a state this store models.** `mode.edit` with no preselect
does `{ ...s, mode: "edit", resolution: "", refund: 0 }`, and `DecisionSection`
already guards for it: `const overridden = state.resolution !== "" && …`. So
this is turning on a path that exists rather than inventing one.

### The refund keeps the agent's figure

`refund` stays seeded from `agent.refund`. The alternative — `refund: 0`, which
is what `mode.edit` pairs with an empty resolution — would blank the one number
that tells the reviewer what the recommendation actually costs. The head says
the position on screen is the agent's proposal; the money under it should be
that proposal's money.

On this case the two are indistinguishable anyway: the recommendation is Deny,
whose vendor total is `$0.00`. The difference would only show on a case
recommending a split. If you would rather it open at zero, it is one line in
the same initialiser and one more clause in §5.

### One door out that is not a card

`refund.set` derives a resolution from the typed figure — the reducer's own
coupling — so typing into the refund field also leaves the unselected state.
That is correct rather than a leak: naming a number *is* making the call, and
the field already sets `touched.resolution`. Worth knowing it exists.

### The rationale is unaffected

`reason` still opens as the agent's draft for its recommended position, so
`reasonMissing` stays false and the only thing gating Submit is the new
condition. The panel's label already says whose words they are.

---

## 2 · The badge moves onto the recommended card

`ChoiceboxItem` has carried a `badge` slot since it was ported, and its own doc
block says what it is for: *"an optional `badge` slot beside the title — which is
why the resolution row can carry 'Recommended' without it landing on top of the
option's own name."* The slot has been unused.

```tsx
badge={r.outcome === recommended ? <RecommendedChip /> : undefined}
```

`RecommendedChip` is `PositionTag`'s resting half — the `AiMark` in insight ink
plus "Agent recommended" — lifted into a shared local so the head and the card
cannot drift apart on either the wording or the tint.

### The comment that has to be rewritten

The current code says the opposite, at length:

> NO BADGE. The recommended option used to carry a "Recommended" chip here,
> which said a second time what the head already says at the top of the card —
> and went on saying it about a card the reviewer had already moved off, because
> the tag marked the AGENT'S pick while the selection ring marked theirs.

Both halves of that argument are answered by this change rather than ignored:

- **"Said a second time"** — it did, when Deny was preselected, because the head
  and the card were reporting the same selection. They are no longer the same
  thing: the head reports the *decision* and the card marks the *proposal*. In
  the opening state those coincide in content but not in role, and once the
  reviewer picks anything the head moves and the badge stays put.
- **"Went on saying it about a card the reviewer had already moved off"** — that
  was the bug when the badge was the only marker of the agent's pick and the head
  was ambiguous. It is now the *intended* behaviour: after an override the badge
  is the only thing left on screen saying which option the agent wanted, which is
  exactly what a reviewer re-reading their own override needs.

So the comment is replaced with that reasoning, not deleted.

---

## 3 · The head gains a third state

`DecisionHead` today has two: the agent's position, and the reviewer's. It needs
a third for "no position yet", and the confidence has to survive into it —
the score is the agent's confidence in *its own* proposal, which nothing has
contradicted, so it stays at full strength (`overridden` is already `false` when
`resolution === ""`, so the existing dimming needs no change).

```tsx
<DecisionHead
  // null while nothing is picked; the head then names the recommendation
  // instead of standing in for a decision.
  position={state.resolution ? fullName(overridden ? state.resolution : recommended) : null}
  recommendation={fullName(recommended)}
  direction={directionRule(state.resolution || recommended)}
  overridden={overridden}
  confidence={confidence}
  stamp={…}
/>
```

Rendered, the three states are:

| state | the head's value line |
|---|---|
| nothing selected | `No resolution selected` · `◆ Agent recommended` `Deny coverage` `●` |
| Deny selected | `Deny coverage` `●` `◆ Agent recommended` |
| Approve / Partial selected | `Approve partial coverage + goodwill` `●` `👤 Human override` |

The unselected line puts "No resolution selected" at the head's 18px rung in
`text-muted-foreground` — the rung is the head's subject and the ink says the
subject is absent — then the badge and the recommendation's name at the
surrounding 13px, with the direction dot belonging to the recommendation rather
than to a choice nobody made.

The mock shows this as one wrapping row and as two stacked rows. **One row is the
recommendation**: the two selected states are single rows, and a head that
changes height on the first click is a head that reflows the whole card under the
pointer.

---

## 4 · Submit is disabled until a resolution is picked

```diff
- disabled={reasonMissing || busy}
+ disabled={!state.resolution || reasonMissing || busy}
```

`submit()` gets the same guard, since it is reachable by keyboard:

```diff
- if (reasonMissing || busy) return;
+ if (!state.resolution || reasonMissing || busy) return;
```

### The sentence beside it needs a third value

This is the one addition beyond the literal ask, and it is here because the
alternative is worse. `SubmitBar`'s sentence is a two-way switch — **Change in
position** or **No change in position.** — and with nothing selected it would say
"No change in position." next to a dead button, which reads as a broken control
rather than as a step not yet taken.

So the bar takes an `unselected` prop and the sentence gets a third branch:

```tsx
<b className="font-semibold text-foreground">No resolution selected.</b>
```

Same slot, same shape, same voice as the other two. No new mechanism.

The button's payload line — "Resolution, refund, rationale and 3 evidence items"
— is unchanged. It names what travels when the button is pressed, which is still
all four parts on every path, and the button cannot be pressed yet.

---

## 5 · `departuresOf` must not count an absence as a departure

This is the bug the other four changes would introduce if it were left alone.

```ts
const resolution = s.resolution !== s.agent.outcome;   // "" !== "Denied" → true
```

At mount, with nothing selected, the submit bar would read **"Change in position
· 1 of 4 parts: resolution."** before the reviewer has done anything.

```diff
+ // NOT PICKING ONE IS NOT A DEPARTURE. The comparison answers "is the position
+ // on screen the agent's or yours"; with nothing on screen the question has no
+ // answer yet, and `"" !== "Denied"` would report the absence as a disagreement.
+ const resolution = s.resolution !== "" && s.resolution !== s.agent.outcome;
  const refund = s.refund !== Math.min(s.agent.refund, limit);
```

`refund` needs no guard while the refund opens at the agent's figure. It would
need one if §1's alternative were taken.

---

## 6 · The resolution cards read as buttons

Today each card is `bg-card` on a `border-border` rim — the same surface as the
card containing them, so the three read as regions of the panel rather than as
things to press. The selected one changes its border colour and gains a 3px
tinted ring.

Both options below give the unselected state a filled `bg-muted` ground, which
is what makes them read as controls. They differ in the selected state, and the
mock shows both in light and dark:

### Option A — tinted selection *(recommended)*

| | |
|---|---|
| unselected | `bg-muted border-border hover:bg-muted/70` |
| selected | `bg-primary/10 border-primary` + the existing ring |

The radio marker, the title, the description and the badge all keep their inks,
so nothing inside the card has to change and the badge's insight tint still sits
on a near-neutral ground.

### Option B — solid selection, matching Submit literally

| | |
|---|---|
| unselected | `bg-muted border-transparent hover:bg-muted/70` |
| selected | `bg-primary text-primary-foreground border-primary` |

Closest to "in line with the submit button", and the mock shows the cost: the
radio marker has to invert to `primary-foreground`, the description needs
`text-primary-foreground/80`, and **the badge has to change colour on the one
card that carries it** — insight-600 on teal fails both contrast and the app's
own meaning for that hue. It also puts a solid teal block 200px above a solid
teal Submit button, so the card competes with the control that files it.

### One token trap, either way

`--primary-50` and `--primary-100` are re-declared in `.dark` **with their light
values** — `oklch(0.95 0.035 218)` is a near-white in both themes. So the tint
must be `bg-primary/10`, an alpha on the theme-aware `--primary`, and not
`bg-primary-100`, which would paint a pale blue block on a dark card.

---

## Files touched

| file | change |
|---|---|
| `lib/coverage/store.ts` | `resolution: ""` at mount; the `departuresOf` guard |
| `components/coverage/decision/DecisionSection.tsx` | the head's third state; the badge on the recommended card; the submit guard; a rewritten comment |
| `components/coverage/decision/SubmitBar.tsx` | an `unselected` prop and the sentence's third branch |
| `components/ui/choicebox.tsx` | the button-like grounds |

`choicebox.tsx` is used **only** by the coverage tree — confirmed by grep — so
restyling it reaches nothing else. Everything else here is inside
`components/coverage/` or `lib/coverage/`.

---

## Verification

| | check |
|---|---|
| opens unselected | no radio filled, no card tinted, Submit dim |
| the recommendation is still legible | head says `No resolution selected` + `Agent recommended Deny coverage`; the Deny card wears the badge |
| confidence survives | 87% at full strength, not dimmed — nothing has contradicted the agent yet |
| the bar does not cry wolf | reads `No resolution selected.`, **not** "Change in position · 1 of 4 parts" |
| picking Deny | head → `Deny coverage · ◆ Agent recommended`, bar → `No change in position.`, Submit live |
| picking Approve or Partial | head → `👤 Human override`, confidence dims, bar counts the parts |
| going back to Deny | head returns to `Agent recommended`, bar back to no change |
| typing a refund from cold | derives a resolution and leaves the unselected state, as the reducer always has |
| keyboard | Submit cannot be fired by Enter while unselected |
| the head does not reflow | one row in all three states |
| evidence + reassessment | unchanged: re-weighting a row still moves the agent's rationale and stamp |
| submit → record → reopen | reopening keeps the filed position selected — see the note below; the store is not reset |
| flag OFF | the console's own `CoverageDecisionCard` and `DecisionForm` untouched |
| build | `tsc -b` and `npm run build` clean |

---

## One thing to decide

**§6, option A or B.** A is my recommendation — it gives you the filled
unselected ground you asked for and a clearly-pressed selected state, without
putting a second solid teal block on the card or forcing the badge to change
colour. B is in the mock so you can see the alternative rather than take my word
for it.

---

## Applied

Built with **option B**. `tsc -b` and `npm run build` clean, zero console errors.

### Verified in the running app

| | result |
|---|---|
| opens unselected | no radio filled, no card tinted, Submit dim |
| the head's first state | `No resolution selected` in muted at the 18px rung, then `◆ Agent recommended` `Deny coverage` `●` — wrapping to a second line only where the pane is narrow, as designed |
| confidence survives | 87% at full strength while nothing is selected |
| the bar does not cry wolf | `No resolution selected.` — **not** "Change in position · 1 of 4 parts" |
| the cards read as controls | three `bg-muted` grounds, no rims; the selected one is solid `primary`, and its computed background is `oklch(0.64 0.115 208)` — byte-identical to the Submit button's, read off the running page |
| the marker inverts | white ring and white dot on the filled card; dark-on-teal in dark mode |
| the badge inverts | insight chip on the unselected card, and on the filled one a `primary-foreground` chip with `primary` ink and mark |
| Deny picked | head → `Deny coverage · ◆ Agent recommended`, bar → `No change in position.`, Submit live |
| Partial picked | head → `👤 Human override · updated 9:45 PM`, confidence dims, bar → `Change in position · 2 of 4 parts: resolution and refund.` — and the badge stays on the Deny card, which is now the only thing on screen saying what the agent wanted |
| dark | all four states legible; the tint is `bg-primary/10`-free by construction since option B fills solid, so the `--primary-100` trap never arises |
| build | clean, and the screen is an 84.8 kB chunk |

### One thing the plan got wrong

The verification table claimed reopening a filed decision would return to the
unselected state "since the section remounts its store". **It does not.**
`onReopen` calls `reopenDecision(action.id)` and `setDecided(null)`; the reducer
is untouched, so the card comes back with the position the reviewer filed still
selected — confirmed by reading the radiogroup's `data-value` after a reopen.

Left as it is, on the reading that reopening means "let me revise what I filed",
and losing the position you just signed would be worse than keeping it. It does
mean the unselected state is reachable only on a fresh mount — navigating to the
URL or reloading. If reopen should clear the selection instead, that is one
dispatch in `onReopen` and worth deciding deliberately rather than by accident.

---

## The resolution cards, settled after three passes

§6 offered a tinted selection (A) and a solid `primary` one (B). B was built, then
twice revised on review, and the landing place is neither:

| | unselected | selected | Submit |
|---|---|---|---|
| shipped first | `bg-muted` | solid `primary` | `primary` |
| then | `bg-muted` | solid `muted-foreground` | `muted-foreground`, then `foreground` |
| **now** | `bg-muted` | **`bg-muted` — unchanged — rim + ring + marker in `primary`** | **`primary`** |

**The fill stays put and only the rim moves.** Filling a picked card — with the
action's teal or with a slate — made a choice wear the dress of the control that
commits it, 200px above that control and in the same ink. The rim, the 3px ring and
the marker say "this one" without borrowing it.

The `bg-muted` ground survives from B and is what the exercise was for: it is what
makes three choices read as controls rather than as regions of the panel they sit
in, and it does that job whether or not one is picked.

Submit is the `default` variant again — the one action on the page, in the app's
action colour — plus the pressed state it never had: a step past
`hover:bg-primary/90` and a 1px drop, scoped to this button rather than added to
the variant.

### Recorded and not fixed

White on `--primary` measures **3.19:1**, under the 4.5 an AA pass wants for 13px
semibold. That is the `default` button variant's behaviour **app-wide**, not
something this screen introduced, and the fix belongs in `ui/button.tsx` — a
`--primary-700` fill clears it — rather than in one button behind a flag. Noted in
`SubmitBar.tsx` beside the class it describes.

### Sizes, after

| | padding | radius | title | description | marker | height |
|---|---|---|---|---|---|---|
| Submit | 14 / 24 | 10px | 13 / 600 | 12px | 16px | 61px |
| cards | 10 / 12 | 10px | 12 / 600 | 11px | 14px | **57px** |

The type was never larger than Submit's — it was level with it. The box was: 14px
padding all round and a 14px radius, which measured 91px against Submit's 61. Both
came down a step and the type followed, so the action is unambiguously the loudest
thing on the card. This reverses a note in `choicebox.tsx` and another in
`SubmitBar.tsx` that had deliberately put the two on one rung; both are rewritten
rather than left contradicting the code.
