import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { GLASS_CLASSES } from "@/components/ui/card";
import { PageContainer } from "@/components/PageContainer";
import { CaseFacts } from "@/components/coverage/CaseFacts";
import { CustomerSection, DocumentsSection, HistorySection } from "@/components/coverage/RecordSections";
import { DecisionSection } from "@/components/coverage/decision/DecisionSection";
import { Pill, TYPE } from "@/components/coverage/primitives";
import { SlaBadge } from "@/components/warranty/badges";
import { AssessmentPanel } from "@/components/warranty/AssessmentPanel";
import { coverageFixtureFor, type CoverageFixture } from "@/lib/coverage/fixture";
import { ciActionOverlay, ciCaseOverlay } from "@/lib/coverage/caseOverlay";
import { useCoverageDecision } from "@/lib/coverage/store";
import { useRole } from "@/lib/role/useRole";
import { recordDecision, reopenDecision } from "@/lib/warranty/useCases";
import { formatRemaining, formatSlaBudget, slaStatusFor } from "@/lib/warranty/sla";
import type { CaseAction, WarrantyCase } from "@/lib/warranty/types";
import { cn } from "@/lib/utils";
// The selection-driven capture bar, lifted out of the host that the fork of this
// screen was embedded in. Its own notes explain the gesture.
import { AddEvidenceBar } from "@/components/coverage/evidence-capture/add-evidence-bar";
import {
  fromCaptureUi,
  useScreenSelection,
} from "@/components/coverage/evidence-capture/use-screen-selection";
import { templateFor } from "@/components/coverage/evidence-capture/evidence-templates";

/**
 * THE COVERAGE DECISION, CI BUILD — behind `ciCoverageDecision`.
 *
 * One reading column, read straight down, in two open sections and three folded
 * ones: **the case** — who and what, the claim, why it reached a person, and the
 * finding established about it — then **the decision**, which runs the evidence it
 * rests on, then the amount and the reasoning, then the call; then history, this
 * customer and the documents, folded.
 *
 * The decision used to be the fourth of seven blocks on a page of its own. It owns
 * a section now, and that section reads in the order the decision is reached rather
 * than leading with the answer — the head still carries the standing position, so
 * the answer is two ranks from the top for anyone who wants it without the reading
 * (../../components/coverage/decision/DecisionSection.tsx has the argument, and the
 * note on the evidence block says what the order costs).
 *
 * ./DecisionConsolePage.tsx renders the previous screen, decides which of the two
 * runs, and is where the case and the action are read — so this page takes both as
 * props rather than loading them again. Off the flag, that page is unchanged and
 * nothing here is reachable.
 */
export function CoverageDecisionCiPage({
  action,
  warrantyCase,
}: {
  action: CaseAction;
  warrantyCase: WarrantyCase;
}) {
  /**
   * THE FORK'S FIGURES, and this is the only place they are applied.
   *
   * ../../lib/coverage/caseOverlay.ts says why: the screen prints the claim, the
   * ceiling and the agreement off the case and the action, and the copy it came
   * from re-authored all three. Overlaying here keeps this app's demo set — and
   * therefore every other screen — untouched.
   */
  const overlaid = useMemo(() => ciActionOverlay(action), [action]);
  const overlaidCase = useMemo(() => ciCaseOverlay(warrantyCase), [warrantyCase]);

  /**
   * Belt and braces. The host only routes here when this returns a fixture, so
   * this branch is unreachable today — but the flag is a presenter switch and the
   * URL is typeable, and a case with no evidence set should say so rather than
   * render an argument built on nothing.
   */
  const fixture = coverageFixtureFor(warrantyCase.id);
  if (!fixture) {
    return (
      <PageContainer>
        <div className="flex flex-col gap-3">
          <BackLink caseId={warrantyCase.id} />
          <p className="text-sm text-muted-foreground">
            The rebuilt decision page is authored for WR-2026-0417 only; {warrantyCase.id} has no
            evidence set yet.
          </p>
        </div>
      </PageContainer>
    );
  }

  return <Decision action={overlaid} warrantyCase={overlaidCase} fixture={fixture} />;
}

function Decision({
  action,
  warrantyCase,
  fixture,
}: {
  action: CaseAction;
  warrantyCase: WarrantyCase;
  fixture: CoverageFixture;
}) {
  const { profile } = useRole();
  const { state, dispatch, limit, claim, recommended, opening } = useCoverageDecision(action, fixture);
  const [notice, setNotice] = useState<string | null>(null);

  /**
   * THE RECORD IS SELECTABLE, AND A SELECTION OFFERS TO BECOME EVIDENCE.
   *
   * `record` is the scroller below, and the only region of this screen a drag
   * counts in: the dock is chrome, and half a gesture that ended in it is not
   * something to file.
   */
  const record = useRef<HTMLDivElement>(null);
const { selection, readSelection, offer, clear: clearSelection } =
    useScreenSelection(record);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3200);
    return () => clearTimeout(t);
  }, [notice]);

  // Records and STAYS: the decision is a section of the record now, so the record
  // shows it decided rather than sending the reviewer back to the case.
  const submit = (outcome: string, reason: string) => {
    recordDecision(action, outcome, profile.name, reason);
  };

  return (
    /**
     * THE RECORD AND THE RAIL, and the rail starts collapsed.
     *
     * The screen this came from had no right-hand panel: the fork's host put its
     * assessment widget elsewhere. Here the rail is the app's own
     * (../../components/warranty/AssessmentPanel.tsx), the same one the console
     * beside this page shows, and it stays available rather than being dropped on
     * the way in.
     *
     * `defaultOpen={false}` because on this screen it is the second thing, not the
     * first. The record reads straight down in one column and the decision is in
     * it; opening at 330px would push that column narrow before anybody asked a
     * question. Collapsed, it is the 44px strip the panel already draws for
     * itself, one click from the conversation.
     */
    <div className="flex h-full min-h-0">
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div
          ref={record}
          /**
           * `select-text`, AND HERE IT IS BELT RATHER THAN BRACES.
           *
           * The host this came from sets `select-none` on the body — the desktop
           * convention, so dragging across the shell does not blue-wash a sidebar
           * — and there this opt-in was the whole reason a selection could happen
           * at all: without it, no selection, so no bar, and the widget would be
           * correct and permanently invisible. This app sets no such rule, so the
           * class is currently a no-op. It stays, because the day the app does
           * adopt `select-none` the gesture would otherwise die silently.
           *
           * Scoped to the scroller rather than the page, so the dock below stays
           * unselectable — its buttons and totals are not evidence.
           */
          className="min-h-0 flex-1 select-text overflow-y-auto"
          // Mouseup, not `selectionchange`: the latter fires throughout a drag, so
          // the bar would appear mid-gesture and jump with the cursor. This is the
          // moment the drag has a result.
          onMouseUp={(e) => {
            if (fromCaptureUi(e)) return;
            readSelection();
          }}
          onMouseDown={(e) => {
            // The bar lives inside this element, so its own controls must not read
            // as a click away — mousedown lands before their click does.
            if (fromCaptureUi(e)) return;
            clearSelection();
          }}
        >
          {/* THE APP'S GUTTERS — `PageContainer`'s 16 / 24 / 32 by breakpoint and
              its `py-6`, written out because this page manages its own scroll
              container and cannot nest that component (../../components/PageContainer.tsx
              owns the overflow, which the capture surface above owns here).

              `pb-14` stays: the submit bar is the last thing on a long column and
              wants room under it. */}
          <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-4 py-6 pb-14 sm:px-6 lg:px-8">
            {/* THE CASE PAGE'S OWN CHROME — a back-link, then a hero card. A
                reviewer arriving here from ./CaseDetailPage.tsx lands on the
                header they have just left: the same link row, the same glass
                hero, the same 24/700 title and the same captioned `Meta` columns
                beside it. The title used to be a rung short of that page's; see
                `TYPE.page` in ../../components/coverage/primitives.tsx for what
                changed and why the two moves had to happen together.

                IT GOES BACK ONE STEP, NOT ALL THE WAY OUT. The copy this came
                from sent this link to `/cases`, which skipped the page the
                reviewer actually arrived from — the case — and made the only
                route back to it the id in the title. Now it is the same
                breadcrumb the console beside this screen draws
                (./DecisionConsolePage.tsx): the chevron and the case id, back to
                the record this decision belongs to. */}
            <Link
              to="/cases/$caseId"
              params={{ caseId: warrantyCase.id }}
              className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="size-4" /> {warrantyCase.id}
            </Link>

            {/* `items-start`, not `items-center`: the title is two ranks taller
                than the columns beside it now, and centring it against them put the
                captions level with the middle of the heading. The case page's hero
                aligns to the top for the same reason. */}
            <header className={cn(...GLASS_CLASSES, "flex flex-wrap items-start gap-x-10 gap-y-4 p-6")}>
              <div className="mr-auto min-w-0">
              {/* THE CASE ID IS IN THE TITLE, AND IT IS STILL THE LINK.
                  It was printed twice — as the row's right-hand link above, and
                  again in a 12px line under the title next to the customer name —
                  and the customer name was a third copy, since `CaseFacts` states
                  it as the first fact of the card directly below. So the sub-line
                  went whole, and the id moved up into the name of the thing it
                  identifies.

                  It stays an anchor rather than becoming text: that link is the
                  one-click route back to the case record, and dropping the row's
                  copy would otherwise have removed it. Mono and
                  `text-muted-foreground` so it reads as a reference beside the
                  title rather than as part of the sentence, and no underline —
                  colour-on-hover is how every other link in this app is drawn.

                  NOT MONO ANY MORE. The case page sets ids in its plain face —
                  measured, zero monospace runs on it — and `TYPE.meta` dropped the
                  mono face for that reason. This one was a literal `font-mono` at
                  the call site rather than the token, so it had to be taken off
                  here too.

                  12px, and now against a 24px title rather than a 20px one, which
                  only widens the gap it was chosen for. It matches the meta line in
                  the card below and reads as what it is. */}
              <h1 className={cn(TYPE.page, "min-w-0")}>
                {action.title}
                <span className="text-muted-foreground"> · </span>
                <Link
                  to="/cases/$caseId"
                  params={{ caseId: warrantyCase.id }}
                  title={`Open case ${warrantyCase.id}`}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  {warrantyCase.id}
                </Link>
              </h1>
              </div>

              {/* THE THREE READINGS AS CAPTIONED COLUMNS — the case page's own
                  `Meta`, and this reverses the note that stood here.

                  They WERE columns; they were flattened to one uncaptioned line on
                  the argument that each caption names what its value already says.
                  That argument is not wrong about "Action required" — but it is
                  wrong about the set, and it cost this page the arrangement every
                  other screen uses. `CaseDetailPage`'s hero puts `Status`,
                  `Priority`, `Stage` and the SLA budget in exactly these columns,
                  captions at 12px/300, and a reviewer arriving from that page was
                  meeting a different grammar for the same three facts.

                  It also paid for the title. The flattened line is what forced
                  `TYPE.page` down to 20px — four things on one row — so putting the
                  readings back in columns is what lets the heading take the app's
                  24/700. The note on that token has the measurement.

                  The hairline is gone with the line it divided; a column boundary
                  is the separator now, which is what it is on the case page.

                  Same three readings, same order, same words. */}
              <div className="flex flex-wrap items-start gap-x-8 gap-y-4">
                <Meta label="Status">
                  <Pill tone={action.status === "Completed" ? "ok" : "warn"}>
                    {action.status === "Completed" ? "Decided" : "Action required"}
                  </Pill>
                </Meta>
                <Meta label="Stage">{action.stage}</Meta>
                {/* THE APP'S SLA PAIR, not this page's ring. `SlaChip` drew a
                    conic-gradient dial and "2h 13m left" — a widget the app has
                    nowhere else. The case page names the status and prints the time
                    beside it, off the same elapsed-vs-budget figures, so nothing is
                    lost: the proportion stops being drawn and starts being named.
                    The budget moves into the caption, which is where that page
                    keeps it. */}
                <Meta label={formatSlaBudget(action.slaMinutes)}>
                  <span className="flex items-center gap-2">
                    <SlaBadge status={slaStatusFor(action.elapsedMinutes, action.slaMinutes)} />
                    <span className="text-xs font-normal text-muted-foreground tabular-nums">
                      {formatRemaining(action.elapsedMinutes, action.slaMinutes)}
                    </span>
                  </span>
                </Meta>
              </div>
            </header>

            {/* TWO SECTIONS, NOT THREE — and the seam moved rather than closed.
                `CaseFacts` carries the finding (the case, and what was established
                about it); `DecisionSection` carries the evidence under the decision
                it feeds. `CaseInfo`, which used to band the finding and the
                evidence together between them, is gone — each of those two halves
                is now inside the card whose subject it belongs to, and each still
                owns its own band, rows, state and dispatch. */}
            <CaseFacts action={action} warrantyCase={warrantyCase} />
            <DecisionSection
              action={action}
              state={state}
              dispatch={dispatch}
              limit={limit}
              claim={claim}
              recommended={recommended}
              opening={opening}
              deciderName={profile.name}
              onSubmit={submit}
              onReopen={() => reopenDecision(action.id)}
              onMoreAction={(id) => setNotice(`${id.replace(/-/g, " ")} — not wired in this build yet.`)}
            />
            {/* THE SECOND WAY IN. `offer` hands the hook a selection nobody dragged —
                the row's own text and rect — so the bar, the reading lookup and the
                commit below are the same code path a drag takes. Only this section
                gets it: `customer` is the only source with a reading. */}
            <CustomerSection
              warrantyCase={warrantyCase}
              history={fixture.history}
              onCapture={offer}
            />
            {/* UNDER THE CUSTOMER, NOT OVER IT. Both answer "what else should weigh
                on this", and they are not the same rank: this case's own account is
                the nearer fact, and other people's cases qualify it. Reading the
                precedent first made the customer's record land as a footnote to
                cases that are not theirs. */}
            <HistorySection caseId={warrantyCase.id} />
            <DocumentsSection caseId={warrantyCase.id} />
          </div>
        </div>

        {/* INERT ON PURPOSE, for now. The bar is real, the gesture is real, and the
            commit is a no-op until the evidence list is ready to receive one — the
            v3 store already has an `evidence.add` action, and connecting this is
            giving that action a payload and dispatching it here. A placeholder row
            appearing in the list would claim something was recorded. */}
        {selection && (
          <AddEvidenceBar
            // Keyed on the text, so a new drag is a new bar and its half-typed
            // title cannot follow the reader to a different passage. The
            // component's own note explains why this is a key and not an effect.
            key={selection.text}
            selection={selection}
            /**
             * RIGHT-ANCHORED FOR A ROW, CENTRED FOR A DRAG — and the test is which
             * one produced the subject.
             *
             * A drag's rect is the run of words themselves, and the bar belongs over
             * the middle of them. A row's rect is the whole row, so centring puts the
             * panel in the middle of the card when the button that opened it was at
             * the right edge — which reads as some other control answering.
             */
            align={selection.via === "row" ? "right" : "center"}
            // And a row press is already the request, so the bar opens on the field
            // rather than on the question a drag still has to be asked.
            openComposed={selection.via === "row"}
            /**
             * COMMIT — the title is the reader's, the reading is the section's.
             *
             * `templateFor` answers whether the part of the record they dragged
             * across produces evidence at all
             * (../../../../../_components/evidence-capture/evidence-templates.ts).
             * The customer section does; nothing else does yet, and a selection there
             * says so rather than failing silently — a demo where a control
             * occasionally does nothing invisibly is worse than one where it says it
             * did nothing.
             *
             * `addedByReviewer` is what makes the row the reviewer's: it earns the
             * chip and the row's own edit and remove actions, which the agent's three
             * items deliberately do not have.
             *
             * Nothing here persists. The store is a `useReducer` with no storage
             * behind it, so a refresh puts the list back to the fixture's three — by
             * design, and the reason this is safe to demo repeatedly.
             */
            onAdd={(_text, title) => {
              const template = templateFor(selection.source);
              if (!template) {
                setNotice("Only This customer can be filed as evidence.");
                return;
              }
              dispatch({
                type: "evidence.create",
                item: {
                  // The typed line, verbatim. It is the one judgement in the gesture.
                  name: title,
                  note: template.note,
                  // Neither part of the composer was filled in, and an added item is
                  // not required to argue for a line of the claim.
                  backs: null,
                  sources: [],
                  importance: template.importance,
                  call: template.call,
                  addedByReviewer: true,
                },
              });
            }}
            onDismiss={clearSelection}
          />
        )}

        {notice && (
          <div
            role="status"
            className="absolute right-4 bottom-4 z-30 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground shadow-md first-letter:uppercase"
          >
            {notice}
          </div>
        )}
      </div>

      <AssessmentPanel
        action={action}
        warrantyCase={warrantyCase}
        // The rail is a conversation about a specific call, so it has to know
        // which one is on the table. On the console that is the decision card's
        // selection; here the position lives in the coverage store.
        position={state.resolution}
        defaultOpen={false}
      />
    </div>
  );
}

/**
 * Label over value, copied from ../cases/CaseDetailPage.tsx.
 *
 * A copy rather than an import: it is six lines, it is private there, and lifting
 * it into a shared module would be a change to a file this page has no other
 * reason to touch. If a third caller appears it should move.
 */
function BackLink({ caseId }: { caseId: string }) {
  return (
    <Link
      to="/cases/$caseId"
      params={{ caseId }}
      className="inline-flex h-7 items-center gap-1 rounded-md px-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
    >
      <ChevronLeft className="size-3.5" /> Back
    </Link>
  );
}

/**
 * ONE CAPTIONED READING — the case page's `Meta`, transcribed.
 *
 * `CaseDetailPage` declares this shape privately and this page needs the same one,
 * so it is written out rather than imported: a page importing a helper out of
 * another page is a dependency between two routes, and this is six lines.
 *
 * The caption is `font-light` (300) and the value `font-medium` (500) — measured off
 * that hero, where `Status` / `Priority` / `Stage` all compute 12px/300 over
 * 14px/500. The weights are what make the pair read as a label and its reading
 * rather than as two lines of equal rank.
 *
 * It replaces this page's `SlaChip`, which drew a conic-gradient dial beside the
 * time left. That was the one bordered-widget-shaped thing in a header with no other
 * widget in it, and the app has no dial anywhere; the status word and the remaining
 * time say the same two things off the same figures.
 */
function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="text-xs font-light text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{children}</span>
    </div>
  );
}
