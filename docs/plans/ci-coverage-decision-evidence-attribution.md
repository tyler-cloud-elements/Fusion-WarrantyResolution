# Plan — a hand on every evidence row that moved

One change to the CI coverage decision's evidence list: **the name that today marks a
row the reviewer added also marks a row they edited**, in the same slot, the same ink
and the same size, with the glyph carrying the verb.

Everything is inside `src/components/coverage/` and behind `ciCoverageDecision`.

Worked example: [`ci-coverage-decision-evidence-attribution.html`](./ci-coverage-decision-evidence-attribution.html)

---

## The finding

**`touchedByReviewer` already exists, is already set correctly on both edit paths, and
is drawn nowhere.**

| | |
|---|---|
| declared | [`fixture.ts:81`](../../warranty-resolution-app/src/lib/coverage/fixture.ts) — with a doc block that says exactly what it is for |
| set, weight/call | [`store.ts:344`](../../warranty-resolution-app/src/lib/coverage/store.ts) — `evidence.set` |
| set, content edit | [`store.ts:366`](../../warranty-resolution-app/src/lib/coverage/store.ts) — `evidence.update` |
| read | [`store.ts:494`](../../warranty-resolution-app/src/lib/coverage/store.ts) — the submit bar's parts count, and nothing else |
| drawn | nowhere |

So one flag already covers the whole of your "change weight / change decision / any
edit of that evidence" — the composer editing a row back sets the same flag the two
selects do. **No new state is needed for the core of this.**

And the row it stays silent about is the load-bearing one.
[`rationaleFor`](../../warranty-resolution-app/src/lib/coverage/store.ts:112) reads
`e.importance === "high"` on the renewal item: re-weighting *Renewal within 3 months*
from Low to High is the gesture that makes the agent redraft the rationale, which is
the beat this whole screen is built around. The list currently records that the
reviewer **added** a photo and says nothing about the edit that moved the agent.

The mark is also already the right shape. It was a `Badge` with a tinted ground,
initials and the words "Added by"; all three came off, and what is left is a filled
`UserRound` and a name ([`EvidenceList.tsx:319`](../../warranty-resolution-app/src/components/coverage/EvidenceList.tsx)).
Doubling the number of marked rows is a reason to hold that line, not to reopen it.

---

## 1 · The mark — two verbs, one grammar

[`EvidenceList.tsx:318`](../../warranty-resolution-app/src/components/coverage/EvidenceList.tsx), the `badge` slot

| row state | glyph | text | tooltip and `aria-label` |
|---|---|---|---|
| `addedByReviewer` | `UserRound`, filled | the actor's name | `Added by {name}` |
| `touchedByReviewer` | `Pencil`, stroked | the actor's name | `Edited by {name}` |
| both | `UserRound`, filled | the actor's name | `Added by {name}` |
| neither | *nothing* | | |

Everything except the glyph is identical between the two states: `size-3`,
`text-muted-foreground`, `text-[10.5px]`, `gap-1`, `shrink-0`. The name is the same
string from the same prop. **The glyph is the only thing doing work**, which is why
it has to be a glyph the reader has already met.

### Why `Pencil`

It is this folder's edit mark three times over — the row's own Edit button
([`EvidenceList.tsx:444`](../../warranty-resolution-app/src/components/coverage/EvidenceList.tsx)),
`RationalePanel`, and the `What changed` manifest's Rationale row. `PencilLine` reads
as a text cursor at 12px and is used nowhere in the app. `UserPen` is the tempting
answer — one mark, both words — and at 12px the nib collapses into the shoulder, so
the two states stop being distinguishable, which is the entire point. The mock draws
all four side by side.

**Stroked, not filled.** The silhouette needs `fill="currentColor"` and
`strokeWidth={0}` (both prop and inline style — see the existing comment on why the
inline one is the one that is guaranteed) because a hairline person at 12px is a
smudge. A pencil has the opposite problem: filled, it is a blob. It keeps lucide's
default stroke and takes none of that treatment.

### Why the verb is not a word

"Added by" was deleted from this exact slot on the argument that a person glyph
followed by a name already says somebody put this here. `Edited by Scott Florentino`
measures 120px against the bare name's 74px — 46px more on a line whose title
already truncates. The verb goes where it
costs nothing — `title` for the pointer, `aria-label` for a reader who cannot see the
glyph, which is where the sentence lives today anyway.

### Why "added" wins when both are true

`evidence.set` sets `touchedByReviewer` on any row, the reviewer's own included, so
re-weighting a row you filed leaves both flags true.

Authorship outranks revision: it is one fact, the row is yours, and editing your own
row is not news. It is also the precedence that keeps the mark matching the
affordance — Edit and Remove in the opened body follow `addedByReviewer`
([`:440`](../../warranty-resolution-app/src/components/coverage/EvidenceList.tsx)), so
a row showing the pencil would be one that cannot be edited, which is backwards.

### Shape

The badge becomes a small `Hand` component in this file rather than a ternary inline
in the `badge` prop — two states, a glyph choice, a tooltip and an `aria-label` is
more than a prop expression should carry, and the existing 20-line comment already
wants somewhere to live.

`hasBody` ([`:308`](../../warranty-resolution-app/src/components/coverage/EvidenceList.tsx))
is **unchanged**. An edited agent row grows no controls, and all three authored rows
have notes, so they open already.

---

## 2 · Optional — the time

*Not asked for. Recommended, and separable: item 1 ships without it and the tooltip
just reads `Edited by Scott Florentino`.*

Two nullable fields on `EvidenceItem`, each written by its own path:

```ts
/** When the reviewer filed this row. Absent on the case's own items. */
addedAt?: string;
/** When the reviewer last changed it. Absent until they do. */
touchedAt?: string;
```

Set from `ctx.now()`, which the reducer already has and already uses for
`reasonAt` — `evidence.create` stamps `addedAt`, `evidence.set` and `evidence.update`
stamp `touchedAt`. The tooltip reads whichever field matches the verb it printed, so
a row added at 10:44 and edited at 10:51 says `Added by Scott Florentino · 10:44 AM`,
consistent with the glyph rather than contradicting it.

**Two fields, not one.** A single "last acted" stamp would make an added-then-edited
row print the edit's time under the word "Added".

Inline rather than in the tooltip was rejected: ~46px more on a truncating line, to
print a time nobody compares across rows inside one sitting.

---

## 3 · Optional, and the one call I want your answer on — does the agent get a name?

*The symmetric reading of your ask: if a reviewer's hand is named, name the agent's.
Both are drawn in §4 of the mock. My recommendation is **A**, but this is a taste call
and it is cheap either way.*

**A — unmarked means untouched (recommended).** One mark per departure from what the
agent filed. The eye finds the two rows a human moved without filtering them out of a
full column, and after this change the absence reads cleanly for the first time —
today a blank row means either "untouched" or "edited, invisibly", which is why the
absence was worth nothing.

**B — every row names its hand**, `AiMark` in `text-insight-600` + "Coverage agent".
Complete, and it is the same trade the filed record's attribution column already lost
on once: a column with a mark on every row is a column you read past. It also
overstates the claim — the agent did not author *Defect in warranty*, IXP extracted it
— and naming an author is a promise about provenance this demo cannot keep.

---

## 4 · Two edges, one of them a live tripwire

### a. The composer asserts authorship on the edit path

[`EvidenceComposer.tsx:129`](../../warranty-resolution-app/src/components/coverage/EvidenceComposer.tsx)
— `toItem()` hardcodes `addedByReviewer: true`, and `toItem` feeds **both**
`evidence.create` and `evidence.update`.

Unreachable today: Edit only renders on rows that already have the flag. But it is a
tripwire pointed at exactly the thing this change makes more likely — the day an
agent row becomes editable, editing one would silently relabel it as reviewer-authored
and grow a Remove button on a row that is supposed to be the record.

**Fix it in the same pass, in the store rather than the composer**: `evidence.update`
takes a patch, so it should not be able to change who added a row. Strip the key on
the way through, beside the `touchedByReviewer: true` that is already being set there.
One line, and it makes the invariant true rather than merely unreached.

### b. `touchedByReviewer` is sticky

Move a select and move it back: the flag stays true, so the row keeps the pencil while
`changesSince` — which diffs against `opening` — correctly reports nothing changed.
The list and the manifest then disagree about that row.

**Recommendation: accept it.** "You touched this" is true, the submit bar already
counts it that way ([`store.ts:494`](../../warranty-resolution-app/src/lib/coverage/store.ts)),
and making the mark derive from a diff against `opening` would mean threading `opening`
into a list that is currently a pure renderer of items. Worth knowing about; not worth
that. Say the word if you would rather the mark clear itself and I will do it that way.

### c. Persona switching re-labels the rows

Unchanged, and still correct — the existing doc block argues it at length. The prop is
renamed `addedByName` → `actorName`, since it now names the hand behind two verbs
rather than one.

---

## 5 · The filed record

`FiledRecord` renders the same component with `readOnly`
([`FiledRecord.tsx:329`](../../warranty-resolution-app/src/components/coverage/decision/FiledRecord.tsx)),
so it inherits all of this for free — the prop rename is the only edit in that file.

The marks matter **more** there. It is the record, and "who moved this" is the question
somebody coming back to a filed decision arrives with. It also puts the list and the
`What changed` manifest 200px below it into agreement for the first time: the manifest
already prints one row per re-weighted item, so the evidence list was the only surface
claiming nothing had happened.

---

## Files touched

| file | change |
|---|---|
| `components/coverage/EvidenceList.tsx` | the `badge` slot becomes a `Hand` component — two glyphs, one name, tooltip + `aria-label`; prop renamed |
| `lib/coverage/store.ts` | `evidence.update` stops accepting `addedByReviewer` in its patch (§4a); *optional:* stamp `addedAt` / `touchedAt` (§2) |
| `lib/coverage/fixture.ts` | *optional:* the two timestamp fields (§2) |
| `components/coverage/decision/DecisionSection.tsx:705` | prop rename only |
| `components/coverage/decision/FiledRecord.tsx:329` | prop rename only |

Five files, three of them one-line. Nothing under `components/warranty/` moves, so the
flag-OFF console is untouched.

---

## Verification

| | check |
|---|---|
| added | file an item — filled `UserRound` + your name, exactly as today, unchanged pixel for pixel |
| edited, weight | move *Renewal within 3 months* Low → High — pencil + your name appears, and the agent redrafts as it does now |
| edited, call | flip a call on an agent row — same mark |
| edited, content | edit one of your own rows through the composer — still the person, not the pencil (§1 precedence) |
| both | add a row, then re-weight it — `UserRound`, and Edit/Remove still in its body |
| untouched | the remaining agent rows carry no mark |
| tooltip | hover each mark — `Added by …` / `Edited by …`, with the time if §2 ships |
| screen reader | `aria-label` carries the same sentence; the glyph is `aria-hidden` |
| width | at ~900px the title truncates and the name does not; the mark never wraps mid-name |
| dark | both glyphs and the name legible on `--card`; name is 6.1:1 |
| filed | submit — the same marks on the read-only list, no controls, and they agree with the `What changed` rows |
| §4a | patch `evidence.update` with `addedByReviewer: true` in a test dispatch and confirm the item does not take it |
| flag OFF | `components/warranty/CoverageConsole.tsx` and its evidence list unchanged |
| build | `tsc -b` and `npm run build` clean |

---

## What I need from you before building

1. **§3 — the agent's rows: A or B?** Default is A.
2. **§2 — timestamps in the tooltip: yes or no?** Default is yes; item 1 does not
   depend on it.

Everything else I would build as written.

---

## Applied, and what differed from the plan

Built with both open calls taken at their defaults — **A** (the agent's rows stay
unmarked) and **yes** to timestamps — and then one change on review.

### The change: one glyph, not two

**`Pencil` came back out. Both states draw the same filled `UserRound`.**

The plan's central argument was that the glyph should carry the verb, since
everything else about the two marks is identical. On review that is the wrong
division: the mark answers *whose hand is on this row*, and the answer is the same
person either way, so two glyphs made one question look like two.

**What this costs, stated plainly:** an added row and an edited one are now visually
identical. The verb survives in the tooltip and the `aria-label` only. That is a
deliberate trade, and it changes what §1's precedence rule is for — "added wins" no
longer decides which glyph a doubly-flagged row draws, it decides which sentence and
which timestamp the tooltip tells.

The affordance still separates the two: an added row opens with Edit and Remove, a
re-weighted agent row opens without them. So the list still distinguishes "yours" from
"the agent's, moved by you" — by what you can do to it rather than by its mark.

`Pencil` stays imported in the file; it is the Edit button's own glyph.

### Everything else is as written

`Hand` in `EvidenceList.tsx` with the precedence and the two sentences; `actorName`
through all three call sites; `addedAt` / `touchedAt` on `EvidenceItem`, stamped off
`ctx.now()` in the three evidence cases; `evidence.update` stripping
`addedByReviewer` from its patch; the file-level doc rewritten to separate "marked"
from "editable"; `hasBody` untouched; the agent's rows unmarked.

### Verified in the running app

| | result |
|---|---|
| edited, agent row | re-weighted *Renewal within 3 months* Low → High — mark appears, `Edited by Scott Florentino · 12:04 PM` off the DOM's own `aria-label` |
| the beat still fires | the same gesture made the agent redraft the rationale, and the row that caused it is now the one carrying a mark — which was the whole finding |
| added | filed *Site photos, drive coupling* — `Added by Scott Florentino · 12:03 PM` |
| **both** | re-weighted that added row to High and confirmed the select moved — the mark still reads `Added by … · 12:03 PM`, the add's stamp, not the edit's |
| one glyph | both marked rows render `lucide lucide-user-round size-3 shrink-0`, read back off the DOM — identical |
| untouched rows | *Defect in warranty* and *Unapproved change to controls* carry no mark |
| tooltip | present in the DOM as `role="tooltip"` with the right sentence, alongside the column head's own. Confirmed by reading the DOM; the synthetic hover would not hold it still for a screenshot |
| **persists through submit** | filed the decision — both marks survive on the read-only record, with no controls, and agree with the two Evidence rows in `What changed` |
| build | `tsc -b` clean, `npm run build` clean |

| dark | both marks legible on `--card` under `.dark` — checked on the filed record |
| narrow | at a 900px viewport the marks hold their line, nothing truncates or wraps |
