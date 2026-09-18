# Plan — the submit bar stays on screen after submitting

The submit bar gains a fourth state, `filed`, and `DecisionSection` renders it
under the filed record instead of dropping it. Same box, same position, same
sentence slot: a tick where the spinner was, `Submitted` where `Submit` was, and
no press.

Worked example: [`ci-coverage-decision-submitted-bar.html`](./ci-coverage-decision-submitted-bar.html)

Screen: `/cases/WR-2026-0417/tasks/coverage-decision`, behind `ciCoverageDecision`.

---

## What happens today

`DecisionSection.tsx:551` returns early once `decided` is set, and the branch it
returns is a different card body entirely:

```
decided === null                        decided !== null
────────────────────                    ────────────────────
CardHead "Decision"                     CardHead "Decision"
DecisionHead (position, score)          FiledRecord
evidence block                            ├ stamp + Reopen
RationalePanel                            ├ the form, frozen
resolution choicebox                      └ What changed
SubmitBar            ← last child       (nothing)
```

So the control the reviewer has just pressed is unmounted 500ms after they press
it, and the row their pointer is resting on becomes the bottom edge of a card.
The press is confirmed 600-odd pixels up, at the stamp — which they have to scroll
back to find, because the record that just appeared pushed it up there.

## What changes

`SubmitBar` stays mounted in the `decided` branch, as the last child of the same
card, in a filed state.

```
decided !== null
────────────────────
CardHead "Decision"
FiledRecord
  ├ stamp + Reopen
  ├ the form, frozen
  └ What changed
SubmitBar filed      ← stays
```

---

## 1 · `SubmitBar.tsx` — the fourth state

### The prop

```diff
   unselected: boolean;
   disabled: boolean;
   busy: boolean;
+  /**
+   * The decision is filed, and this is its resting state.
+   *
+   * Outranks `unselected`, `disabled` and `busy` in every branch below: those
+   * three describe a control that has not fired yet, and this one describes one
+   * that has. Nothing can be true of both.
+   */
+  filed?: boolean;
   onSubmit: () => void;
```

### The glyph — into the slot that is already held

The spinner is mounted unconditionally and hidden with `invisible`, precisely so
that pressing Submit cannot widen the button by the icon plus the gap. That
existing invariant is what makes this state free:

```diff
-      <Loader2
-        aria-hidden
-        className={cn("size-4 shrink-0 animate-spin", !busy && "invisible")}
-      />
+      {/* THE SAME 16px SLOT, one of two glyphs in it. The slot is held open on
+          every path — see the note below on why — so this is a swap inside a box
+          that does not move, not an addition to the row. */}
+      {filed ? (
+        <Check aria-hidden className="size-4 shrink-0 text-success" />
+      ) : (
+        <Loader2
+          aria-hidden
+          className={cn("size-4 shrink-0 animate-spin", !busy && "invisible")}
+        />
+      )}
```

### The label

```diff
-        <span className="text-[13px] leading-tight font-semibold">Submit</span>
+        <span className="text-[13px] leading-tight font-semibold">
+          {filed ? "Submitted" : "Submit"}
+        </span>
```

The second line does **not** change. It names the payload — "Resolution, refund,
rationale and 3 evidence items" — and after filing that is the same four parts
stated as a fact rather than a promise. It needs no rewrite and no timestamp: the
stamp prints one, and two clocks on one card are two places to disagree.

### The fill — an inset ring, and the reason is layout

```diff
-        "h-auto shrink-0 flex-row items-center gap-2.5 px-6 py-3.5",
+        "h-auto shrink-0 flex-row items-center gap-2.5 px-6 py-3.5",
+        /**
+         * THE FILED TREATMENT — `TONE.ok`'s values, with the rim as an INSET
+         * RING rather than a border.
+         *
+         * A 1px border would grow the box by 2px in each dimension, and the row
+         * would twitch at the exact moment of filing — the one thing this state
+         * must not do, and the same bug the always-held spinner slot above
+         * exists to prevent. `ring-inset` paints inside the existing box and
+         * costs no layout at all.
+         *
+         * `disabled:opacity-100` for the reason the busy path has it: `disabled`
+         * is true here, and a filed record at half strength reads as broken
+         * rather than as done.
+         */
+        filed &&
+          "bg-success/10 text-foreground ring-1 ring-inset ring-success/30 disabled:opacity-100",
         busy && "disabled:opacity-100",
```

Measured in the worked example: states 1, 3 and 4 all come out **340.84 × 59.99**.

### It cannot be pressed

```diff
       <Button
-        disabled={disabled}
+        // `filed` folded in here rather than left to the call site, so the state
+        // cannot be rendered live by a caller that forgets the other prop.
+        disabled={disabled || filed}
         aria-busy={busy}
-        onClick={onSubmit}
+        onClick={filed ? undefined : onSubmit}
```

The base variant carries `disabled:pointer-events-none`, so neither `active:`
cue nor any hover can fire. The `sr-only` live region stays exactly as it is —
`busy ? "Submitting the decision" : ""` yields `""` here, which is what we want:
the announcement belongs to the stamp, and two would talk over each other.

### The sentence

A fourth reading in the same slot and the same voice, and it goes **first**,
because it outranks the other three the way `unselected` outranks the last two:

```diff
       <p className={cn(TYPE.small, "m-0 min-w-0 flex-1 leading-relaxed text-muted-foreground")}>
-        {unselected ? (
+        {filed ? (
+          // PAST TENSE, NOT A NEW FACT. `Filed` takes the bold lead the other
+          // three give their first clause, and the departure count follows it
+          // lowercased — so the row still answers "what went, and did anybody
+          // move it" without the stamp above having to be read first.
+          <>
+            <b className="font-semibold text-foreground">Filed</b>
+            {departed
+              ? ` · change in position, ${departures.parts} of 4 parts: ${listOf(namesOf(departures))}.`
+              : " · no change in position."}
+          </>
+        ) : unselected ? (
           <b className="font-semibold text-foreground">No resolution selected.</b>
         ) : departed ? (
```

`Check` joins the `lucide-react` import.

---

## 2 · `DecisionSection.tsx` — keep it mounted

### Freeze the departures at the press

The sentence is computed from live state today (`departuresOf(state, limit)`).
After filing it has to come off the snapshot instead — the same reason
`FiledRecord` takes a frozen evidence list rather than reading the store: a record
that re-derives itself from state that can still move is not a record.

```diff
   const [decided, setDecided] = useState<{
     outcome: string;
     refund: number;
     reason: string;
     at: string;
     evidence: EvidenceItem[];
     changes: Change[];
+    departures: Departures;
   } | null>(null);
```

```diff
       setDecided({
         outcome: state.resolution,
         refund: state.refund,
         reason: state.reason,
         at: new Date().toISOString(),
         evidence: state.evidence,
         changes: changesSince(opening, state, limit, moneyExact, fullName),
+        // The value this render already computed, which is the pre-submit one —
+        // captured for the same reason the evidence list is.
+        departures,
       });
```

`Departures` joins the type import from `@/lib/coverage/store`.

### Render the bar in the decided branch

Last child of the card, after `FiledRecord`:

```diff
           onReopen={() => {
             onReopen();
             setDecided(null);
           }}
         />
+        {/* THE BAR, STILL HERE. Same component, same position — last child of
+            the card, which is where it sits in the live branch too. The stamp at
+            the top of the record and this at the bottom both say the decision is
+            filed, and that is not a duplication: the stamp heads the RECORD, and
+            this is the resting state of the ACTION. They are ~600px apart in a
+            card you scroll, so they are never competing for one glance. */}
+        <SubmitBar
+          // NO `···`. Its four entries all pause the claim or hand it on, and
+          // none of that is coherent against a decision that is already filed.
+          // The slot keeps its 36px and paints nothing, so the sentence starts at
+          // the same x before and after — measured at 93px in the worked example.
+          more={<span aria-hidden className="size-9 shrink-0" />}
+          departures={decided.departures}
+          evidenceCount={decided.evidence.length}
+          unselected={false}
+          disabled
+          busy={false}
+          filed
+          onSubmit={() => {}}
+        />
```

### Reopen

Unchanged, and it already does the right thing: `onReopen` clears `decided`, the
live branch comes back, and the bar returns to its armed state with the same
`departures` it had. One door back, and it stays the stamp's.

---

## 3 · Why a wash and not the `success` variant

`ui/button.tsx` has a `success` variant — `bg-success text-white` — and it is the
wrong reach twice.

**It reads as pressable.** A filled block at full strength is how this card spells
"the primary action", and the filed bar is not an action at all.

**And it fails contrast.** White on `--success` measures **4.25:1**, under the 4.5
an AA pass wants at 13px semibold. That is not a new measurement — it is the exact
figure `FiledRecord.tsx` already records when it rejected solid fills for its
change badges, and the reason that file settled on a rim, a wash and neutral ink.
`foreground` on a `/10` wash measures **13.2–14.7:1** and passes in both themes.

Reusing `TONE.ok`'s values means this button is not a fourth opinion about a
question the folder has already answered twice.

Dark needs no override: `--success` is re-declared in `.dark`, so `bg-success/10`
and `ring-success/30` — both alphas on the theme-aware token — track it on their
own. No hard-coded green anywhere in the state.

---

## 4 · The one alternative worth naming: `Reopen` in the left slot

The bar's left slot is empty in the filed state, and the obvious thing to put
there is `Reopen` — which would give the bar a live control instead of an empty
gutter, and put the way back where the hand already is.

**Not yet, and the reason is that `Reopen` is already somewhere.** Moving it means
taking it out of the stamp, and the stamp is where a reader looking at a filed
record looks for it — it is the record's header, and the record is what they came
back to change. Leaving it in both places is worse than either: the way back from a
signed decision should have exactly one door.

The empty 36px is the price, and it is the right way round — the same trade the
spinner slot takes three lines up, for the same reason. If the gutter turns out to
bother anyone at the podium, relocating `Reopen` is a five-line change to two
files and this note is where the argument is.

---

## 5 · Known gap this makes more visible — and does not cause

`decided` is in-session React state. Reload the page after filing and it is
`null`, so the live form renders again with the bar armed — while the header pill
20px above reads **Decided**, off `action.status === "Completed"`, which
`recordDecision` did persist.

That disagreement exists today and is untouched by this plan. It gets easier to
notice, because "Decided" in the header over `Submit` in the bar is a sharper
contradiction than "Decided" over a form. The fix is to seed `decided` from the
action when its status is `Completed` — but the action does not persist the refund,
the frozen evidence list or the changes, so a seeded record could only show two of
the four parts, which is the exact regression `FiledRecord`'s own note describes
getting out of. It needs the store to persist a filed snapshot, and that is its own
change.

**Out of scope, flagged, and not made worse by anything here.**

---

## Files

| file | change |
|---|---|
| `components/coverage/decision/SubmitBar.tsx` | `filed` prop; `Check` in the glyph slot; `Submitted` label; inset-ring wash; `disabled \|\| filed`; fourth sentence reading |
| `components/coverage/decision/DecisionSection.tsx` | freeze `departures` into `decided`; render `<SubmitBar filed>` after `FiledRecord`; `Departures` type import |

No store change, no new tokens, no change to `FiledRecord`, and nothing outside the
flag.

## Checks — all run, on the dev server at `/cases/WR-2026-0417/tasks/coverage-decision`

- [x] `tsc -b` exit 0; `npm run build` exit 0, and `CoverageDecisionCiPage` still
      splits out as its own 85.09 kB lazy chunk
- [x] **Filed measures identically to armed** — 332.49 × 61.25 in both, and the
      sentence starts at x=157 in both (the mock's own figures are 340.84 × 59.99
      and x=93; it is a standalone page at a different width, so the invariant is
      what carries over, not the numbers)
- [x] The ring renders `inset 0 0 0 1px` — no border, no layout cost
- [x] The filed button is `disabled`, `pointer-events: none`, `opacity: 1`; a
      programmatic `.click()` throws nothing and changes nothing
- [x] Exactly one `Reopen` on the card, and zero `···` menus in the filed state
- [x] Reopen returns `Submit`, enabled, with the `···` back and the live sentence
      restored — and a second submit/reopen/submit cycle behaves identically
- [x] Both sentence readings: `Filed · change in position, 2 of 4 parts: resolution
      and refund.` and `Filed · no change in position.`
- [x] Dark: the wash and ring track `--success`'s dark value (`oklab(0.7 …)` against
      light's `0.57`) with no override
- [x] No console errors

### And the paths that had to stay untouched

- [x] **Flag off**, same URL — the old two-column console renders and `SubmitBar` is
      not in the tree at all
- [x] **Flag on, WR-2026-0421** (no fixture) — old console, `SubmitBar` absent
- [x] `SubmitBar` has exactly one importer (`DecisionSection`), which has exactly one
      (`CoverageDecisionCiPage`). Nothing outside the flag can see either.
