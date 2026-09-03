# Industrial Equipment Warranty Resolution Case App

A UiPath Coded Web App for the FUSION 2026 Keynote 2 demo. It is the **Maestro Case App**
in Act II of the storyboard: the warranty resolution lead's work queue, her decision
console, the case agent's mid-case reassessment, and the execution trail.

The app lives in [`warranty-resolution-app/`](./warranty-resolution-app). Its own
[README](./warranty-resolution-app/README.md) covers running, configuring, and deploying it.

---

## Sources of truth

Three documents define this build. When they disagree, the order below wins.

| Source | What it settles | File |
|---|---|---|
| **FUSION 2026 storyboard (26 Aug)**, Act III scenes 18–22 | What appears on stage: screens, copy, numbers, the beats in order | `docs/FUSION 2026 Storyboards-0826.html` |
| **Coverage decision mock** | The decision console in detail: the two causes, the cost split, the authority meter, the settled state | `docs/coverage-decision-wiith-signals.html` |
| **Case design** (Use Case Explorer reference implementation) | The case shape: 6 primary stages, 4 conditional lanes, per-task actor (AG/PR/HT/API), illustrative SLAs | `docs/Industrial Equipment Warranty Resolution _ Use Case Explorer_files/…Case Design.png` |
| **IXP document set** | The seven real evidence documents behind the case, and what a model can and cannot read off them | `docs/ixp-warranty-documents/` |
| **SDD** | Production rigour: case variables, decision vocabularies, entry/exit conditions, personas, integrations, 4 extra terminal lanes | `docs/warranty-resolution-sdd.md` |

The storyboard outranks the others **for anything on screen**. It is the script. The SDD
outranks them for anything about how the case actually runs. The console mock outranks both
for the coverage decision's own layout and figures, since it is the most specific artefact
for that one screen.

> `docs/FUSION 2026 Storyboards.html` is the superseded 25 Aug cut, kept for reference. It has
> three acts and numbers the case-app scenes 12–16; the 26 Aug cut has four and numbers them
> 18–22. Build against the 0826 file.

### Where the sources diverge, and what the app does

- **Secondary stages.** The case design draws 4 conditional lanes; the SDD defines 8
  (adding Coverage denial, Withdrawal, Commercial/legal handoff, Reopen and reassess).
  The app carries all of them: the 4 demo-visible lanes are always listed on the stage
  rail, the 4 terminal lanes appear only once entered, since they end a case rather than
  sitting dormant.
- **Agents.** The case design types several tasks `AG` (agent). The SDD states the
  opposite: BR-003 reserves every judgement for a named human, so it types no task
  `agent`. The app follows the case design, because that is what the storyboard shows.
  **If the real case plan follows the SDD, flip the `actor` fields in
  `src/lib/warranty/casePlan.ts` and nothing else changes.**
- **SLA targets.** The app uses the case design's illustrative targets (the console header
  reads `SLA 4 HR`, which is what scene 20 shows). The SDD's more conservative production
  set is recorded in a comment on each stage.
- **Which stage the coverage decision sits in.** The 26 Aug storyboard puts WR-2026-0417 in
  **Resolution decision**. The queue row (19), the case detail (21), the stage rail's "now"
  marker (21), and scene 22's Global variables, which source `Coverage.Position` from
  Resolution decision. The console mock still labels the stage "Coverage and evidence
  review", and the case design still lists the coverage task under that stage. **The app
  follows the storyboard**; the case plan is unchanged. If the real case plan keeps the
  coverage decision in Coverage and evidence review, change `stage` on the action in
  `demoData.ts` and `currentStage` on the case. Nothing else depends on it.

---

## The demo, in the app

Scene numbers below are the **26 Aug** cut.

| Scene | Screen | Route |
|---|---|---|
| 18 · 93 out of 100 need nobody | Operational insights | `/performance` |
| 19 · The seven that need a person | Work queue | `/cases` |
| 20 · One decision, in a console | Decision console | `/cases/WR-2026-0417/tasks/coverage-decision` |
| 21 · New evidence, reassessed on its own | Case detail | `/cases/WR-2026-0417` |
| 22 · The execution trail | Case detail → Trail tab | `/cases/WR-2026-0417` |
| 15–17 · Case plan and rules | Case plans | `/case-plans` |

There is also an **Actions** page at `/actions`, the maestro-case-app queue
pattern: every open decision in one list, with the selected one beside it and the
case in a right rail. It is not a storyboard scene; it is how a coordinator
actually works a day. The same decision appears in three places on purpose:

| Surface | What it is for |
|---|---|
| `/cases/$id/tasks/$taskId` | The storyboard's scene-14 console, full screen, signal-capture rail |
| `/actions` | Working the whole queue, with case context alongside |
| Case detail → Actions tab | What is outstanding *on this case*, and where to go next |

**The Actions pane is the decision, and only the decision**: why it reached you, the finding,
and the decision card. It carries no documents, no asset record, no claim breakdown and no
folded supporting record, because all of that is one panel to the right in the case drawer and
a second copy would just be a second copy. A dashed line at the bottom names what is over
there and opens it.

The finding stays, because it is not context: it is the judgement being made.

The full-screen console keeps everything, since it has two columns to put it in.

The plain surfaces render the same `DecisionForm`, so they cannot drift.

### Two consoles, chosen by the action

`DecisionConsolePage` renders one of two shapes, switched on whether the action carries
`causes`:

- **The combined-cause console** (WR-2026-0417 only) follows the 26 Aug design. The finding stays
  open because it is the judgement; the supporting record is present but folded to one line
  each; the money is split by cause attribution; and the authority meter answers whether the
  signer can sign it alone ($9,690 of $10,000, the beat scene 20 says to point at).
- **The plain console** covers everything else. Why it reached you, the evidence, the decision
  form, and the signal-capture rail.

Adding `causes`, `costLines` and `authority` to any other action promotes it to the rich
console; no code change is needed.

**The reasoning tri-state is the point of the screen.** Asked separately from the outcome:
*I agree · I agree, but keep asking me · Stop asking for cases like this*, because agreeing
with a recommendation and wanting to stop being asked are different statements, and only the
second one proposes a rule. Scene 20 calls it out as a beat to read aloud. It is recorded
alongside the outcome and echoed into the Assessment rail as the signer's own reply.

**The Assessment rail** (right) is a conversation, not a widget: it opens with the
recommendation, its confidence meter, and the reasoning behind it. It never decides;
decision controls live in the decision card only, which is a director's note in the
storyboard, not a preference.

### The case tab set

The case detail carries the maestro-case-app tab set, with warranty content:

**Overview · Details · Actions · Stages · SLAs · Documents · Activity · Trail · Comments**

The Actions page's right rail renders the same component in its `rail` variant,
which drops Actions, Stages and SLAs, since you are already looking at the action, and
the queue shows its own clock. Everything else is identical.

A few things worth knowing about the data behind them:

- **SLAs** are computed in `lib/warranty/caseSlas.ts` at three levels: the case
  clock (the SDD §1 P1 override included), one per stage, one per open decision.
  Every pill and countdown in the app reads that one function.
- **Activity** is authored for the three hero cases and *derived* from stage
  states for the other 38 (`lib/warranty/activity.ts`), so the tab is never empty
  and nobody maintains 38 feeds.
- **Stages** derives task state from the stage plus its open decisions, because
  the case row carries no per-task status. A live instance should replace that
  with real task statuses.
- **Trail** is the execution record; **Activity** is the business history. They
  are deliberately separate tabs.

**Scene 15 is fired by hand.** The case detail has a *Simulate customer evidence upload*
button. With `VITE_EVIDENCE_WEBHOOK_URL` set it fires the real webhook and the platform
delivers the event; without one it simulates the same arrival locally so the beat lands
either way.

### The cast is settled

Six names, from the storyboard. Do not invent a seventh. There is no second Priya and no
duplicated engineer.

| Name | Role | Sign-in persona? |
|---|---|---|
| Sarah Chen | Warranty Resolution Lead | yes (default) |
| Miguel Alvarez | Reliability and Controls Engineer | yes |
| Ryan Ochoa | Product Quality Lead | yes |
| Kelsey Nordstrom | Parts and Logistics Lead | yes |
| Priya Raghunathan | Warranty Process Owner | no, appears in rules/data |
| Tom Beckerman | Claims Administrator | no, appears in rules/data |

Note: `J. Alvarez (Northstar, site controls)` in the controls-change audit evidence is the
**customer's** technician, not Miguel Alvarez. That collision is in the storyboard; it is
deliberate and should stay.

### Numbers the talk track quotes

These must stay consistent, because they are said out loud:

- **41** open cases, **3** need a person today, **38** progressing on their own
- **93%** progressing autonomously, **7%** human-intervention rate
- WR-2026-0417: claim **$16,272.50** over **4 lines**, line **down 96 hrs**, decision due in
  **2h 13m** against a **4 hr** SLA
- The gearbox failed **30 months** into a **60-month** rated life; control parameters raised
  **19%** above the commissioned envelope on **2026-02-14**, no written approval (ESA §4.2)
- The split: **$9,690.00** Cobalt Ridge, **$6,582.50** customer, against a **$10,000** limit
- Agent confidence **87%**; precedent **60% agree**; **78%** of similar combined-cause claims
  ended in partial plus goodwill

> These changed wholesale in the 26 Aug cut. The old figures ($18,400, 11 hr down, bearing at
> 4,100 of 20,000 hours) are from the 25 Aug storyboard and should not reappear.

The background cases are generated from a seeded hash, so the counts hold without anyone
maintaining 38 rows by hand. If you change the count, change `AGENT_SUMMARY` too.

**`DEMO_NOW` is captured at module load, not pinned to a fixed date**, deliberately.
A fixed instant looks tidier but rots: the figures stored on each row ("3 hr 12 min
elapsed") stay put while anything computed against real time drifts, so after a week
on the shelf the SLA rows and the activity feed contradict the header. Anchoring to
load keeps every relative figure saying the same thing on any day.

Everything on screen is illustrative. The storyboard says so explicitly, and the app
marks the figures that most look like measurements with an `ILLUSTRATIVE` tag.

---

## The documents

The seven PDFs in `docs/ixp-warranty-documents/` are copied into
`warranty-resolution-app/public/documents/` and are the case's actual evidence. Clicking one
opens it in a full-window viewer: the page on the left in the browser's own PDF viewer, what
IXP read off it on the right.

Each extracted field carries a confidence, and the ones that matter are marked **inferred**,
values stated nowhere in the document that had to be derived by reading two things against
each other. Those are the case:

| Inferred value | Derived from |
|---|---|
| Is the installed drive an approved part? **No** | The work order calls it an "equivalent unit"; terms clause 3.2 excludes exactly that word. Neither document answers it alone. |
| Was the third-party work authorised? **No** | No authorisation field exists anywhere. The service history records that no request was received; clause 4.1 requires one. |
| Warranty expiry **14 Sep 2026** | Commissioning date plus the 24-month term in clause 1.1, and stated outright, so the derived value can be cross-checked. |
| Did the thermal condition predate the third-party work? **Yes, by 78 days** | Finding SF-2026-0114 (18 Jan) against the third-party service (6 Apr). **This is what makes the answer partial coverage rather than a clean denial.** |
| Duration at the raised thermal threshold | **Nothing.** The inspection report says it is not established. A model returning a value here is hallucinating, so the viewer renders the empty field explicitly rather than hiding it. |

> **These documents tell a different version of the case than the console does.** The IXP set
> puts the outage on 17 April 2026 with a $13,307.50 third-party invoice, a gearbox swapped
> for an Altek AD-5500-HD, and controls changed on 6 April. The console mock and the
> storyboard use $16,272.50, a 2026-02-14 config change, and a +19% torque figure. Both are
> in the app as they were given: the console keeps the storyboard's headline numbers because
> that is what is said out loud, and the documents keep theirs because they are the artefacts.
> The IXP README flags the same class of drift in its own material. **Worth reconciling before
> anything ships.**

---

### Customer standing

The account's commercial position (tier, agreement value, renewal, SLA credits year to date,
whether this outage triggered another, goodwill in twelve months, and the site contact) is on
the case's **Details** tab and inside the console's *Customer standing* fold. Both render
`CustomerStandingRows` from `warrantyCase.standing`, so the two cannot drift; the fold used to
carry a prose paraphrase of the same figures.

It is read-only and stamped `Helios`, because a warranty lead weighs an account's tier and
credit balance rather than setting them. It sits with the case because the goodwill line on
the decision is unarguable without it: absorbing $1,240 of travel reads differently against
$312,000 of credits already issued than against none, and `Goodwill, 12 mo: $0` is the row
that makes it defensible, so it renders a real zero rather than an em dash.

### Clocks on WR-2026-0417

One clock needs attention, and it is the one the header shows: **Resolution decision SLA, at
risk, 2 hr 13 min left of 4 hr.** Nothing is breached.

At risk is *derived*, not authored. The stage has burned 107 of 240 minutes, 45% and comfortably
on track by the ordinary 75% threshold, so the escalation comes from somewhere else: a P1
case whose line is still down is at risk on the clock it is currently running, however much of
that clock is left. The clock is not at risk because it is nearly spent; it is at risk because
the thing it protects has been failing for 96 hours. The row says so in place of the usual
"triggered when" line.

That rule (`escalateWhileLineDown` in `caseSlas.ts`) is deliberately narrow. It touches only
the stage the case is actually in. Escalating the case clock and the task clock too would put
three copies of one fact on screen, and it never escalates past At risk, because whether a
clock has *breached* is a question about that clock alone.

The coverage-decision **task** SLA is no longer listed. It fell on the same minute as the
stage it belongs to, being the same budget from the same start, so it was one commitment shown
twice, and once the stage escalated the two sat side by side with identical countdowns
reporting different statuses. A task clock that duplicates its stage's is now dropped.

### Ask about this case

The rail renders the agent's replies as **Markdown**, via `AgentMarkdown` on `react-markdown`
with `remark-gfm` for tables. The agent answers with headings, bold, bullets and GFM tables, and
a plain-text bubble showed all of it literally, `##` and `|---|---|` included. Headings collapse
to two weights, because an agent opening with `##` is not implying a document outline and six
sizes in a chat bubble read as a mistake. A table is the one thing that cannot be made to fit a
330px rail, so it scrolls inside its own box rather than widening the bubble. The reader's own
turns stay plain text: running them through a renderer would eat an asterisk they meant
literally.

The case page's content column is an `@container`, and the tab layouts key off it. `lg:` reads
the *viewport*, which with the Ask panel open said "wide" while the column had 380px less to
work with: 958px of Overview in 632px of room, cut off under the panel and only reachable by
scrolling the whole case sideways. The nine-tab strip scrolls within itself for the same
reason.


The rail's composer talks to a **Conversational Agent**: agent `162896` in folder `713281` on
the FUSION tenant, set in `.env` as `VITE_ASSISTANT_AGENT_ID` / `VITE_ASSISTANT_FOLDER_ID`, and
needing the `ConversationalAgents` scope.

**The agent's tools need the case's GUIDs, and the panel has to hand them over.** They go out
on the first turn as their own labelled lines, not inside prose and not inside JSON, so a tool
can lift them without parsing English:

```
Case identifiers (use these for tool calls):
caseInstanceId: cb386569-618f-44b7-9fb7-677c0661e181
folderKey: cbf6dec7-939a-4eeb-ab3f-f78065dc9b27

Case summary: WR-2026-0417, Northstar Retail Distribution, …
```

**The thread owns them, not the caller.** Once a conversation is open for a case, every
question on it carries that case's GUIDs regardless of what the click passed. Depending on
each caller to supply the same identifiers on every render is how they went out inconsistently.
A later read can *refine* them (an overlaid row has no instance id until the live read lands);
nothing can clear them. In dev, each question logs what it is carrying **before** the socket is
opened, so the contract is visible even when the connection is what failed.

**They go out on every turn, not just the first.** The agent does not carry them forward, so a
tool call on the second question had no case to open, which is why a suggested question like
"How long is left on the clock?" failed while the opening one worked. Three short lines
repeated is a trivial cost against a failure that only appears on the *second* question, which
is exactly the kind a demo finds live. The prose summary stays first-turn-only, being bulky and
genuinely one-time.

`caseIdentifiers()` reads them off the case, falling back to the configured case folder when
the row carries none, and **drops empty values rather than sending a blank line**, because a tool will
try to use `folderKey:` with nothing after it. `turnPayload()` and `seedBlock()` are exported so
both the format and the every-turn rule are testable, because a contract that drifts silently is
how the panel ends up asking about a case the agent cannot open.

Four details are load-bearing, all learned the hard way in
`~/Workspaces/TT-DevconLoanOrigination/loan-origination-app-0511-maestrolab`, which is the
reference implementation:

| Detail | Why |
|---|---|
| Resolve the agent via `getAll(folderId)` before opening a session | A wrong id otherwise opens a session that never answers, which looks like a hung panel. It now says which agents that folder actually holds. |
| Wait for `onSessionStarted` before the first exchange | Sending ahead of the acknowledgement is rejected with `EXCHANGE_START_PROCESSING_FAILED`. A 4-second cap, then proceed anyway. |
| `exchangeId` must be `crypto.randomUUID().toUpperCase()` | Matches the SDK's own `makeId`; other shapes are rejected the same way. |
| `startMessage` → `sendContentPart` → `sendMessageEnd` | The one-shot `sendMessageWithContentPart` is accepted and then never answered. |

Handlers are wired **once per session** and matched back to the question by exchange id, since
the answer arrives on the session's own exchange stream. Chunks stream into the reply bubble as
they arrive rather than appearing whole at the end.

One conversation is kept per case + action, so a follow-up still has the first turn to refer
back to. The cache holds the *promise*, not the result, so two questions asked in quick
succession share one conversation rather than racing to open two.

Every failure (unconfigured, signed out, unreachable, silent, empty, or errored) falls back
to `localAnswer`, which answers from the case in front of the reader and **says why the agent
did not**: "Answered from case context. The agent could not: Client Authorization Failed." The
reason used to go only to the console, which meant every failure looked identical from the
outside and could not be reported as anything but "it didn't work".

The deadline is on **silence, not on the whole answer**: 45 seconds since the last chunk, not
since the question. A question that walks several tools ("what is blocking closure?" covers
stages, tasks and clocks) runs past any sensible total, and a fixed cap was throwing away
answers that were still arriving. Partial text is kept rather than discarded: a stream that
stalls after saying something useful has still said it.

## The decision screens

The Actions queue **collapses to a rail**, with a toggle in its header and a rail carrying the open
count to bring it back, remembered in localStorage like the right-hand panel. The resize handle
is withdrawn while collapsed, since there is nothing to drag and it would read as a second,
broken way to reopen the list.

The decision pane has **two independent scrollers** when it is side by side: reading the
finding no longer drags the decision off screen, and scrolling a long rationale does not move
the argument it is about. Stacked, the pane scrolls as one, because a single column is one
continuous read. That replaced sticky positioning on the decision card, which only pinned the
top of a card taller than the viewport and so put the submit button out of reach.

`/actions` holds a skeleton for two seconds before it renders, set by `INTRO_SKELETON_MS` in
`ActionsPage`. Deliberate, and not a fetch: on demo data the queue is already in memory and
appearing instantly reads as a screenshot rather than a system that went and looked. It is a
**floor, not an addition**: a live read that takes longer keeps the skeleton up rather than
waiting the two seconds out first. It plays on entering the route, not on switching between
actions once you are there. Delete the `!settled` term to remove it.


Two screens render the same decision: `/actions` (queue beside it) and
`/cases/:id/tasks/:taskId` (full width). They share their parts, so a change lands in both.

**The header states the case before anything argues about it.** Customer, standing, the claim
as filed, then one line of asset and cover, then the sentence about why a person is looking at
it. It replaced a "Why this reached you" card that asked the reader to take the escalation on
trust.

Kept deliberately thin: the serial, the identity check and the agreement's reference number
are all a click away in the case drawer, none of them changes the decision, and carrying them
here pushed the finding below the fold. The claim total is the one duplication allowed. The
decision card shows a total too, but a different one, since this is the claim **as filed** and
fixed while the card's totals move with the position. They cannot disagree. The mock's
agent-recommendation tile stays out, because that one would restate the decision card and go
stale the moment a position changed.

**The two-column split is a container query, not a breakpoint.** `xl:` measured the window,
which says nothing about the space left in the pane after the queue and whichever rail is
open. At 1280px it was putting a 420px decision card beside a 115px finding. The pane is now
an `@container` and the split turns on at `@min-[736px]`, which is what the two tracks
actually need (340 + 16 gap + 380). Both tracks carry real minimums, so neither can be
squeezed to nothing.

Opening **Ask about this case** no longer restacks the pane. The two rails are not equivalent: the
case rail is `flex-1` and claims whatever is left, so with it open there is genuinely no room
for two columns; the ask rail is a fixed 330px the pane can usually absorb. Reflowing for it
also felt destructive: you open it to ask about the decision and the decision jumps out from
beside the finding to underneath it. At laptop widths (~1500px) four columns still cannot fit
in one window, so it stacks there; from ~1800px the layout holds.

The decision card is rendered **once**, as a grid child. It used to be mounted twice, one copy
per layout, which threw away its state, a half-typed rationale included, every time the
layout flipped.

**The finding is two rows, not two cards** under `compactFinding`, which is on. A cause
collapses to its side, its title and one clause; the full argument, the established stamp and
the sources open underneath. The verdict drops its slab in this mode, because under two rows
it is already the heaviest thing on the card. The flag exists so the before and after can be
shown side by side rather than argued about: 836px of cards against 356px of rows.

**The policy test is the argument, not supporting material.** Seven clauses, each with a
verdict and the system that answered. Three verdicts, not two: a check nobody could run is not
a check that came back clean. Operator-error contribution is **open** because the site never provided
its maintenance history, which is why the rationale calls it unestablished and why no third
cause is charged to anyone. Collapsing open into fail would charge the customer for a missing
document; collapsing it into pass would clear them of something nobody looked at.

**The "Ask about this case" rail answers the position.** It is not a static summary:

- Evidence opens into five signals, each naming what it bought (`Parts, $8,450.00 to us`) and
  taking a thumb. The thumb is on the signal, not the conclusion. Which input was misread is
  feedback an agent can act on, "I disagree" is not.
- Precedent opens into the distribution, including the forty percent who did something else.
- Moving off the recommendation draws a challenge that **prices the departure**: "puts the
  whole $16,272.50 on the customer". That clause is derived from the cost split, so it cannot
  drift from the table beside it. It is the agent's standing stance rather than a thread entry,
  so moving again replaces it; anything the reader said stays.
- The reply chips are filtered by position. Moving to denial and moving to full coverage are
  opposite mistakes, and what an agent should offer to hear about each differs: against a
  denial, that the change was causal; against full coverage, that operator error was never
  established. A chip that fits every position fits none of them.

The coverage position lives in the host page, not the decision card, because the rail answers
it as well as the card setting it. `CoverageDecisionCard` takes an optional `position` /
`onPositionChange` and keeps its own state when they are absent.

### Case ids on screen

Demo ids are `WR-2026-0417`. Live ones are the case process name with a run number welded on,
`IndustrialWarrantyResolution-16331444`, three times the width of the columns they have to
live in, and identical across every case in the tenant.

`shortCaseId()` in `lib/warranty/format.ts` elides **the middle**, keeping the run number
whole: `Indust…-16331444`. Cutting the tail instead would leave rows that cannot be told
apart, which is the opposite of what an identifier is for. Anything at or under the cap, meaning every
demo id, passes through untouched, so this is invisible until the app is pointed at a tenant.

Every call site pairs it with `title={fullId}`, so hovering still gives the id whole. The one
place the full id is rendered outright is the decision card's `sr-only` legend: a screen reader
has no column to overflow, and an elided identifier is worse to hear.

## Feature flags

Presenter switches, in the sidebar footer under **Feature flags**. They persist to
localStorage. Unlike case session state, which resets on reload, someone setting a
room up should not have to set them twice.

| Flag | Default | What turning it off does |
|---|---|---|
| Opposing cause tile | on | Drops the second cause, on the customer. The heading, the "both established" stamp and the verdict box all change with it. With one cause the case is a clean approval, and claiming a combined cause would be a lie. |
| Agent confidence | on | Hides the percentage and the precedent rollup. |
| Reasoning capture | **off** | The agree / keep asking / stop asking tri-state under the decision. Off by default: it asks the signer to grade the agent's reasoning as well as make the call, and that rail already collects it per signal, with a thumb, which is the more useful shape of the same feedback. |
| Case plans tab | **off** | The only flag that is off by default. The case plan is design-time material and Act III is about running work, so the nav entry is hidden. `/case-plans` still resolves by URL either way, so a presenter can deep-link to it without turning the nav on. |
| Use actions | **off** | Where a case's task button lands. The button reads the same either way, reading "3 open tasks", and only the destination changes: off, it opens the decision directly, which is the shorter path from a case already in front of you; on, it goes to the Actions queue, where someone working a shift would start. Off by default, because from a case you are already looking at, a queue is a detour. |
| Compact finding | on | Each cause is one row: which side it lands on, what it is, and the clause that establishes it, with the argument, the provenance stamp and the sources an expand away. About a hundred words less on a pane already carrying a decision, and the two sides stay beside each other in the narrow Actions layout where the cards stack. Off, the two full cause cards come back: they land harder on a projector, the rows read better for someone working the queue. |
| Side-by-side action | on | Lays the Actions pane out like the console, finding left and decision right. **Falls back to stacked whenever a right panel is open**, because the case drawer and the ask rail take the same width; two columns squeezed into a third of the window is worse than one. |
| Use demo data | on | Ignore the live tenant and run on the bundled dataset. **On by default**: the app opens in the state it can always be trusted in, with the storyboard's exact numbers, no sign-in, nothing that depends on a tenant being up. Turning it off is the single switch that goes live, and it is what arms the overlay. While on it **overrides the overlay** and hides every link out to the tenant (Open case run, New case), because demo rows point at nothing and a dead link reads as a bug. |
| Overlay mock on live | on | Keeps the demo queue and paints the tenant over it. Off, the two sources never mix, and a successful read shows only what the tenant has. On is the demonstrable setting and is why it leads; off is the honest one. **Inert until Use demo data is turned off**, which is the shipped state; the sidebar row says so rather than looking live. |
| Morning brief | on | The overnight summary above the work queue: greeting, narrative, four trend tiles, and three pulse cards (cases by stage, SLA posture, autonomy rate). Every figure is computed from the same case list the queue renders, so it cannot disagree with the table underneath it. **When on it also hides two things that would otherwise say the same thing twice:** the standalone "Agent summary" card (the brief opens with that exact line) and the personal KPI row. Turn it off and both come back. |

> The KPI row it hides (avg. coverage decision time, restoration adherence, critical cases at
> SLA risk, repeat-failure candidates) is storyboard scene 19 content. With the brief on by
> default those four figures are not on screen. If the talk track needs them, turn the brief
> off for that beat, or move them into the brief.

Note that turning the opposing cause off does **not** rewrite the case narrative. The banner
still describes a combined cause, because that is what the case is. The flag hides the tile,
which is what it is for.

### The cost split is computed, not authored

Picking a coverage position re-attributes every claim line, and the table, the totals and the
authority meter move with it. That is the point of the screen: you can see what a position
costs before you sign it.

| Position | Cobalt Ridge | Customer | Authority |
|---|---|---|---|
| Approve partial + goodwill | $9,690.00 | $6,582.50 | ✓ within the $10,000 limit, sign alone |
| Approve full coverage | $16,272.50 | $0.00 | ▲ exceeds the limit, routes for co-approval |
| Deny coverage | $0.00 | $16,272.50 | ▲ $0, but a denial is a customer commitment, so it routes for sign-off |

**A denial is its own state, not "$0 and therefore fine."** Committing the customer to fund
the repair still routes for sign-off. Reading the meter as "under the limit" there would be
exactly the wrong conclusion, so `authorityFor` returns three states rather than a boolean.

Each position also carries its own rationale draft and downstream effects. The two that
depart from the recommendation ship an **empty** draft plus an override note. The signer
writes the reason rather than editing the agent's, and their effects include held items
(denial letter held, dispatch held) rendered as pauses rather than ticks.

`lib/warranty/costSplit.ts` owns all of it. The claim's lines carry amounts only; who pays
each one belongs to the position, so a claim does not change shape when the decision does.

### Two panels, one column

The Actions pane's right column holds **either** the case drawer **or** the ask rail, never
both. They share the space, so the state is one value (`"case" | "assessment" | null`, the
internal name kept so saved preferences survive the rename) rather
than two booleans that could represent an impossible state. Both sit under the action header,
so the action's identity stays put whichever is showing, and each header carries a control to
swap to the other.

---

## Wiring it to the real case

The app runs on a bundled demo dataset out of the box and needs no UiPath tenant. Live data
is an overlay, not a replacement: a live instance whose business id matches a demo case
merges over it, keeping the demo's presentation fields where Maestro carries none. Pointing
the app at a half-built case improves it rather than emptying it.

To go live:

1. Publish the case in Maestro and copy its **processKey**.
2. Fill in `warranty-resolution-app/.env`. See `.env.example`. At minimum:
   `VITE_UIPATH_BASE_URL`, `VITE_UIPATH_ORG_NAME`, `VITE_UIPATH_TENANT_NAME`,
   `VITE_UIPATH_CLIENT_ID`, `VITE_CASE_PROCESS_KEY`.
   `VITE_UIPATH_BASE_URL` is the **api** host, not the portal. The portal origin sends no
   `Access-Control-Allow-Origin`, so from a browser every call dies in preflight; identity
   answers on the api host too (it 302s to the portal), so one value covers auth and data.
   Links *out* are the other direction: `portalUrl()` in `config.ts` derives `cloud.` back
   from `api.` for "Open case run", Action Center and Jobs, since an API host renders nothing
   for a person. `VITE_UIPATH_PORTAL_URL` overrides the derivation.
3. Reconcile `src/lib/warranty/casePlan.ts` against the published plan. The service layer
   matches live stage and task names against those definitions by **normalised name**
   (lowercased, non-alphanumerics stripped), so keeping the names identical is the whole
   of the wiring.
4. Reconcile the decision `actionType` codes against the deployed Action App schema,
   SDD §4 SME review item 10. Each human task declares its dispatch code in `casePlan.ts`.
5. Turn **Use demo data** off in the sidebar's Feature flags, then sign in from the work
   queue. That flag is the switch: on, nothing reads the tenant and no link points at it.

### External App scopes

```
OR.Execution OR.Folders OR.Tasks OR.Jobs OR.Users PIMS
ConversationalAgents
DataFabric.Data.Read DataFabric.Data.Write DataFabric.Schema.Read
```

`OR.Jobs` starts a case from the queue; `ConversationalAgents` powers "Ask about this case". `DataFabric.*`
only for evidence documents. The redirect URI must be the app's own origin + path. For a
Coded App that is `https://<org>.uipath.host/<routing-name>`.

---

## Running against the live tenant

The app ships on demo data. **Use demo data** is on, which is the one switch between the two
worlds. Turn it off to go live; everything below then applies.
`warranty-resolution-app/.env` (gitignored) carries the FUSION tenant; `.env.example` carries
the shape.

| Setting | Value |
|---|---|
| Base URL / org / tenant | `https://api.uipath.com` · `businessorchestration` · `FUSION` |
| Portal origin (derived) | `https://cloud.uipath.com` |
| External App client id | `52be2376-b348-492a-9ea5-c7ec704141e6` |
| Case processKey | `6ea32614-e78e-46d7-84eb-8b27599a014e` |
| Folder key | `cbf6dec7-939a-4eeb-ab3f-f78065dc9b27` |

**Live and demo never blend, except deliberately under one flag.** With **Overlay live on
demo** off, the queue is one or the other and the banner names which and why: a *failed* read
falls back to the demo set, a *successful* read that returns nothing shows an empty queue,
because padding a real queue with fictional rows would make the counts lie.

With the overlay **on**, which is the default, they blend on purpose and narrowly. The demo cases
stay the queue and keep everything the story rests on; four things come from the tenant:

| From the tenant | Why |
|---|---|
| Case id | The row *is* the real case, and its route is the real route |
| Instance and folder key | "Open case run" opens the actual run |
| Stage state | The board shows where the process got to, not where the script says, except `status`, below |
| Action task id | Signing the decision completes a real Action Center task |

Pairing is **positional, newest instance first**. A Maestro instance id has no relationship
to a demo business id, so there is nothing to match on. Newest-first is the demo's own working
order: `DEMO_CASES` opens with the three cases that need a person, Sarah Chen's `WR-2026-0417`
first, so the run started minutes before the keynote becomes her case, and starting another
from **New case** makes that new one the hero in turn.

The queue stays exactly the demo set: all 41 rows, three of them needing a person. Instances
past the last demo case are **not** appended: the screen's claim is three out of forty-one,
and a tenant carrying a dozen rehearsal runs would bury it. Demo cases past the end of the
live set stay demo, so the queue still tells the story when the tenant holds one instance or
none. Turn the overlay off to see everything the tenant actually has.

One field resists the pattern: **`status` stays demo.** It is not really a stage fact. It is
what the queue sorts and counts on, and a rehearsal instance sitting in *Progressing* would
quietly empty the three-cases-need-you claim, leaving the app telling the truth about an
instance nobody came to see instead of the story everybody did.

Live stage states *merge* rather than replace: live wins on every stage it names, and demo
stages the live plan says nothing about survive. A matching plan therefore takes over
completely, and a diverging one degrades to showing what it knows instead of blanking the
board.

The merge logic lives in `src/lib/warranty/overlay.ts`, kept free of hooks so it can be read
and tested on its own, because which field crosses over is the most consequential decision in the
app, and getting it wrong makes the screen quietly lie about a real case.

- **Cases** come from `CaseInstances.getAll({ processKey })`, with stages, variables and
  execution history per instance. A live instance whose business id matches a demo row takes
  the demo's presentation fields (customer, asset, evidence) where Maestro carries none.
- **Actions** come from Action Center via `Tasks.getAll`, matched to their case instance.
  Action Center carries the title, assignee, status, priority and clock. It does **not**
  carry the console's argument (the two causes, the cost lines, the authority limit), so
  those are merged from the demo action with the same `actionType`. `mapTask` never invents a
  finding Maestro did not send.
- **Open case run** on the case detail deep-links to the instance in Maestro, folder key
  included, which the page needs to resolve the run.

### New case

The button beside Refresh on the work queue starts a process job with:

```json
{ "demoScenario": "Standard", "demoRunId": "WR-RUN-0001", "ownerEmail": "tyler.toth@uipath.com" }
```

Scenario is one of Standard · MissingEvidence · Rejected · Critical. The run id is minted
fresh per dialog (seeded from the clock, so two people on one tenant do not collide) and is
editable. Owner defaults to the signed-in user's email and is free text.

Two things worth knowing:

- **`inputArguments` goes to Orchestrator as a JSON string, not an object.** An object
  silently starts the job with no arguments, which looks like success and produces an empty
  case.
- **It starts `VITE_NEW_CASE_PROCESS_KEY`, which falls back to the case process.** Those demo
  arguments read like a seeding wrapper rather than the case's own intake contract, so if a
  separate launcher process exists, point that variable at it, with no code change.

---

## What is NOT built

Called out so nobody assumes otherwise:

- **No Maestro writes beyond task completion and starting a job.** Pause, cancel, reopen and instance
  migration (scene 16's *Migrate* dialog) are not implemented. The SDK exposes
  `pause`/`close`/`reopen` on `CaseInstances` if they are wanted.
- **No real evidence storage.** `VITE_EVIDENCE_ENTITY_ID` reads documents from a Data
  Fabric entity, but uploading is not wired.
- **The Ask AI panel answers locally by default.** Set `VITE_ASSISTANT_AGENT_ID` and
  `VITE_ASSISTANT_FOLDER_ID` to route it to a Conversational Agent. The SDK's
  conversational surface is resolved at run time, so verify it against your installed SDK
  version before relying on it.
- **Session state is in memory.** Decisions and fired events reset on reload, on purpose:
  a rehearsal should start clean without anyone clearing localStorage.

---

## Deploying

```bash
./deploy-app.sh warranty-resolution-app          # bumps the patch version
./deploy-app.sh warranty-resolution-app 1.0.0    # or pin one
```

The script builds with `UIPATH_BUILD=1` (relative asset base), **fails** if the bundle came
out with absolute `/assets` paths, then packs, publishes and deploys. Pass `--path-name` by
hand on the **first** deploy only. See the comment at the top of the script.

---

## Repo layout

```
AGENTS.md                    this file, the build brief
README.md                    repo overview
deploy-app.sh                build → pack → publish → deploy
docs/                        every reference this build was made from
  warranty-resolution-sdd.md                       the solution design
  FUSION 2026 Storyboards-0826.html                the demo script (26 Aug, build against this)
  FUSION 2026 Storyboards.html                     the superseded 25 Aug cut
  coverage-decision-wiith-signals.html             the decision console mock
  Industrial Equipment Warranty Resolution _ …     the Use Case Explorer page + case design PNG
  ixp-warranty-documents/                          the seven evidence PDFs + their generator
warranty-resolution-app/     the app
```

Each saved `.html` has a matching `_files/` directory holding its assets. Open the HTML and
it renders offline. The pair must keep the same base name or the page loses its own assets, so
do not rename one without the other. The storyboard's readable content is the `saved_resource.html`
*inside* its `_files/` directory; the top-level HTML is just the frame around it.
