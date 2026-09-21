import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Banknote,
  Check,
  Highlighter,
  Pencil,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChoiceboxGroup, ChoiceboxItem } from "@/components/ui/choicebox";
import { INK, Label, TONE, TYPE } from "@/components/coverage/primitives";
import { CallDot, RankBars } from "@/components/coverage/LabelledSelect";
import { EvidenceList } from "@/components/coverage/EvidenceList";
import { RationalePanel } from "@/components/coverage/decision/RationalePanel";
import { RecommendedChip } from "@/components/coverage/decision/RecommendedChip";
import { RefundPanel } from "@/components/coverage/decision/RefundPanel";
import { moneyExact, timeOnly } from "@/lib/warranty/format";
import { CALL_OPTIONS, IMPORTANCE_OPTIONS, RESOLUTIONS } from "@/lib/coverage/fixture";
import { changeValueLabel, type Change, type ReasonRevision } from "@/lib/coverage/store";
import type { EvidenceItem } from "@/lib/coverage/fixture";
import type { CaseAction, DecisionEffect } from "@/lib/warranty/types";
import { cn } from "@/lib/utils";

/**
 * THE MANIFEST'S GLYPHS — two readings per row, neither of them a word.
 *
 * The rows say what they said before, character for character. What is new sits
 * beside the text: which part moved, and how it moved.
 *
 * **Not who moved it.** `changesSince` tags every line `by: "you" | "agent"`
 * (../../../lib/coverage/store.ts), and a third mark at the row's right edge drew
 * it — `AiMark` against `UserRound`, the head's own pair. It came back out: on a
 * filed record almost every line is the reviewer's, so the column was a stack of
 * the same glyph with an occasional exception in it, and it put a third thing to
 * read on a row whose job is to say what the value used to be. The attribution
 * stays in the data for whatever wants it next; the stamp above still counts it.
 */

/** One 14px muted glyph per part. The word stays; this is the scan target. */
const PART_ICON: Record<Change["part"], typeof Scale> = {
  // The Decision head's own icon, 200px up the same card.
  Resolution: Scale,
  // The one glyph this app did not already have — there is no money icon in it.
  Refund: Banknote,
  // The folder's edit glyph (../EvidenceList.tsx, ./RationalePanel.tsx).
  Rationale: Pencil,
  // The folder's evidence glyph (../EvidenceComposer.tsx).
  Evidence: Highlighter,
};

/**
 * The enums, inverted off the store's own spelling.
 *
 * A relevance move draws `RankBars` and a call move draws `CallDot` — the exact
 * components the evidence rows above this panel draw, so neither is a vocabulary
 * the reader has to learn twice. Both need the enum back out of a printed label,
 * and `changeValueLabel` is the function that printed it, so mapping the options
 * through it is an exact inverse rather than a guess at one.
 *
 * A string in neither set — a money figure, "Added", a resolution name — falls
 * through to `null` and the row draws no value glyph, which is correct: those are
 * not points on a scale.
 */
const rankOf = (v: string | null) =>
  IMPORTANCE_OPTIONS.find((o) => changeValueLabel(o.value) === v)?.value ?? null;
const callOf = (v: string | null) =>
  CALL_OPTIONS.find((o) => changeValueLabel(o.value) === v)?.value ?? null;

/** The value's own glyph, where the value is on a scale the reader knows. */
function ValueGlyph({ value }: { value: string | null }) {
  const rank = rankOf(value);
  if (rank) return <RankBars value={rank} />;
  const call = callOf(value);
  if (call) return <CallDot value={call} />;
  return null;
}

/**
 * WHAT KIND OF CHANGE IT WAS — one badge per row, in a column of its own.
 *
 * `+` green for something filed, `−` red for something removed, `○` amber for
 * everything that moved. Three types over six kinds of row, and the third is the
 * common one, which is the right way round: a filed decision mostly consists of
 * things that shifted, and an addition or a removal is the exception worth
 * spotting.
 *
 * **It replaced an inline glyph that typed only half the rows.** A `Plus`, a
 * `Trash2` or a `Pencil` sat in the value cell keyed off `to`, which meant only
 * the three entries with no `from` were marked — a resolution change, a refund
 * change and both evidence moves carried no type at all and had to be inferred
 * from the arrow. Every row is typed now, and one marker replaces the other rather
 * than joining it.
 *
 * **It also took the emphasis off the value.** `to` was `font-semibold`, which is
 * how the row used to say "this is the new one". The badge says it, so the value
 * renders at normal weight and only `subject` stays bold — the row's identity
 * rather than its change.
 *
 * ## The hue is in the rim and the wash, and the ink is neutral
 *
 * Straight off `TONE` (../primitives.tsx), whose note carries the argument and the
 * numbers. Briefly: a hued glyph on a tint of its own hue measures **1.78:1** for
 * the amber one, and solid fills fail too — 4.25:1 for success and 3.92:1 for
 * destructive against white, both under AA, and worse in dark. `foreground` on a
 * wash is 13.2–14.7:1 and is the only treatment that passes on all three.
 *
 * The rim and wash are a step stronger than `ToneChip`'s because this is an 18px
 * square rather than a text pill, and a `/30` rim on it is close to invisible.
 *
 * **THE GLYPH IS THE PRIMARY CUE AND THE COLOUR AGREES WITH IT**, which is not a
 * compromise. The three washes are near-identical in luminance — `+` against `○`
 * is 1.06:1 — so they differ in hue alone, and in greyscale or to a red-green
 * deficient reader the fills are the same. A badge that carried the meaning in
 * colour alone would have been unreadable to those readers; `+` / `○` / `−` is
 * legible without any colour at all.
 *
 * `○` U+25CB rather than a capital O: at 11px the letter is a beat away from a
 * zero and sits on a different optical weight from the two symmetrical strokes it
 * pairs with. `−` U+2212 rather than a hyphen, for the same reason — a hyphen is
 * short and rides high against the `+`.
 */
const CHANGE_KIND = {
  added: { tone: "ok", glyph: "+", label: "added" },
  removed: { tone: "bad", glyph: "\u2212", label: "removed" },
  modified: { tone: "warn", glyph: "\u25CB", label: "modified" },
} as const;

function kindOf(change: Change): keyof typeof CHANGE_KIND {
  if (change.to === "Added") return "added";
  if (change.to === "Removed") return "removed";
  return "modified";
}

function ChangeBadge({ change }: { change: Change }) {
  const { tone, glyph, label } = CHANGE_KIND[kindOf(change)];
  return (
    <span
      // The row's own text says what moved and to what; this says which of the
      // three kinds it is, and a screen reader needs that in words.
      aria-label={label}
      className={cn(
        "inline-grid size-[18px] shrink-0 place-items-center rounded-md border text-[11px] leading-none font-bold",
        TONE[tone],
      )}
    >
      <span aria-hidden>{glyph}</span>
    </span>
  );
}

/**
 * SHOW THE "RECORDED" CARD — off, by request, and off is why this is a constant
 * rather than a flag.
 *
 * The card lists the six downstream effects a filed decision sets in motion —
 * the WT-9 write, the SAP accrual, the notification, the dispatch release, the
 * quality referral, the ledger entry. It is not wanted on screen for now.
 *
 * **Not a `FeatureFlags` entry** (../../../lib/flags.ts). Those are presenter
 * switches — things worth toggling mid-rehearsal to see how a beat lands — and
 * they earn a row in the panel and a line of persisted localStorage each. This
 * is not a switch anybody wants at the podium; it is a section held back until
 * it is asked for. A constant says that, costs nothing, and greps.
 *
 * **Not commented-out JSX either.** The block still type-checks and still reads
 * `effects`, so a change to `DecisionEffect` cannot quietly rot it while it is
 * off. Turning it back on is one word here.
 */
const SHOW_RECORDED: boolean = false;

/**
 * THE FORM, FILED — the same four parts, in the same order, frozen.
 *
 * **What landed here before showed two of them.** A headline, six downstream
 * effects and the rationale; the refund was a bare number with neither the
 * authority it was checked against nor the figure the customer was left with, and
 * the evidence under it was the LIVE list — still editable, "Add evidence" and
 * all, on a card stamped Decided. The submit bar had just declared four parts; the
 * record showed half of them and let one of those halves keep moving.
 *
 * **So it is the form again — and now it is literally the form.** Evidence, then
 * the amount and the reasoning, then the call: the live card's own order, rendered
 * by the live card's own components in a read-only mode. Nothing to learn on
 * arrival and nothing to hunt for, because each value sits exactly where it was
 * typed. That is the whole argument for this shape over a differently-organised
 * receipt, and it only actually holds now that the two sides cannot diverge.
 *
 * **It did diverge, and that was the bug.** The order was the reverse of the live
 * card's — resolution first, evidence last — and the four sections were bespoke
 * copies, so every restyle of the live card reached one side only: 64px and 84px
 * evidence columns against the live list's 136 and 160, a 1px solid selection ring
 * against a 3px soft one, no radio markers, no `Agent recommended` chip, a dropped
 * cost-line breakdown, a dropped revision history, and relevance printed as a word
 * here while the manifest below printed it as bars. One card, disagreeing with
 * itself in eight places. See `ci-coverage-decision-filed-alignment.md`.
 *
 * The unchosen resolutions still stay on screen, dimmed, because "one of three" is
 * part of what was decided — that is this file's own idea and it survives as
 * `readOnly` on the choicebox group. The one the agent opened on is marked, which
 * for a long time this note claimed and no code did.
 *
 * **`What changed` is last, and outside the form.** It was above it, on the
 * argument that a reader wants "did anybody depart from the machine, and who"
 * before the values — but that is an edit history in front of the decision it
 * edited, and the record already answers the same question in its stamp. The
 * values first, then how they got there.
 *
 * Attribution is still the point of the panel rather than decoration on it: on
 * this fixture a reviewer who re-weights one row moves the agent, which then
 * rewrites the resolution, the refund and the rationale, and a manifest that
 * credited all four to the person would be wrong about three.
 *
 * **Read-only, and that is a behaviour change made on purpose.** The list was
 * editable after a decision before, defended on the grounds that it had always
 * been. That held while the evidence sat in another card and was not part of what
 * the button submitted. It stopped holding when the bar started naming the
 * evidence in the payload: a record that can be edited after it is signed is not a
 * record. `Reopen` is the way back, and it is unchanged.
 */
export function FiledRecord({
  action,
  outcome,
  refund,
  reason,
  reasonHistory,
  reasonAt,
  reasonMine,
  evidence,
  at,
  limit,
  claim,
  recommended,
  deciderName,
  changes,
  effects,
  fullName,
  shortName,
  onReopen,
}: {
  /** For the amount panel's cost lines and the partial split's allocation. */
  action: CaseAction;
  outcome: string;
  refund: number;
  reason: string;
  /** The rationale's revisions, timestamp and authorship, frozen with the rest. */
  reasonHistory: ReasonRevision[];
  reasonAt: string | null;
  reasonMine: boolean;
  /** The list AS SUBMITTED — frozen at the press, not the live one. */
  evidence: EvidenceItem[];
  at: string;
  limit: number;
  claim: number;
  /** The agent's own pick, so the frozen cards can still mark where this started. */
  recommended: string;
  deciderName: string;
  changes: Change[];
  effects: DecisionEffect[];
  /** The section's own display names, passed rather than re-derived. */
  fullName: (outcome: string) => string;
  shortName: (outcome: string) => string;
  onReopen: () => void;
}) {
  // Only the stamp still counts anything — the manifest below stopped tallying
  // itself, so the agent's half of the split has no reader left.
  const byYou = changes.filter((c) => c.by === "you").length;


  return (
    <div className="flex flex-col gap-4">
      {/* ── the stamp ── */}
      <div className="flex items-start gap-3">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-success text-success-foreground">
          <Check className="size-3" />
        </span>
        <div className="min-w-0 flex-1">
          <div className={TYPE.title}>
            {fullName(outcome)} — <span className="tabular-nums">{moneyExact(refund)}</span> refunded
          </div>
          {/* "Submitted", and the count — nothing about whose position it was.
              It read "signed on the agent's position, unchanged" or "signed after
              2 changes of your own", which named the agent, used a word no other
              string on the card uses any more, and spent eight words on a number.
              The manifest below already itemises what moved. */}
          <div className={cn(TYPE.small, INK.ink2)}>
            {deciderName} · {timeOnly(at)} ·{" "}
            {byYou === 0
              ? "submitted with no changes"
              : `submitted after ${byYou} ${byYou === 1 ? "change" : "changes"}`}
          </div>
        </div>
        <Button variant="outline" onClick={onReopen}>
          Reopen
        </Button>
      </div>

      {/* The seam the live card puts under its head, for the same reason: the
          stamp above is two ranks of type with no box around it, so without this
          the evidence band reads as a third rank of the same block. */}
      <div className="h-px bg-border" />

      {/* ── THE FORM, FROZEN — AND IT IS THE LIVE FORM ──────────────────────
          Evidence, then the amount and the reasoning, then the call. The SAME
          order the live card runs in (../decision/DecisionSection.tsx), and the
          same components rendering it.

          **It used to be neither.** This block drew its own resolution cards, its
          own "Refund & authority" panel, its own rationale box and its own
          evidence list, in the reverse order — resolution first, evidence last. So
          the record read bottom-to-top against the card it was a record of, and
          every restyle of the live card landed on one side only. The drift that
          produced was not subtle: 64px and 84px evidence columns against the live
          list's 136 and 160, a 1px solid selection ring against a 3px soft one, no
          radio markers, no `Agent recommended` chip, and relevance printed as a
          word here while the manifest below printed it as bars.

          Rendering the live components read-only is what stops that coming back —
          there is no second implementation left to drift.

          `aria-readonly` stays on the wrapper: every control below is inert, and
          that is a fact a screen reader needs rather than something it can read off
          the dimming. */}
      <div aria-readonly className="flex flex-col gap-4">
        {/* 1 · THE EVIDENCE, which opens the body — the live list, frozen. The
               rows still open; the two selects are their values, in the two cells
               the selects occupied. */}
        <EvidenceList evidence={evidence} actorName={deciderName} readOnly />

        {/* 2 · AMOUNT · RATIONALE — the live flex with its 300px money column, not
               the 2-up grid this used to be. `DecisionSection`'s own note explains
               at length why a ratio grid does not survive here and why this exact
               set of classes is the only one that does. */}
        <div className="flex flex-col gap-4 lg:flex-row">
          <RefundPanel action={action} refund={refund} limit={limit} claim={claim} readOnly />
          <RationalePanel
            value={reason}
            history={reasonHistory}
            editedAt={reasonAt}
            edited={reasonHistory.length > 0}
            mine={reasonMine}
            readOnly
            /* Unreachable: `readOnly` puts the field in the same state a
               superseded revision is read in, which takes no caret. Required
               because every live caller needs it. */
            onChange={() => {}}
          />
        </div>

        {/* 3 · THE THREE RESOLUTIONS, frozen — the real `Choicebox`, so the picked
               card keeps the rim, the 3px ring and the filled marker it had while
               it was being picked, and the agent's own pick keeps its chip.

               The unchosen two stay on screen at 45%: "one of three" is part of
               what was decided. That was this file's own good idea and it survives
               as `readOnly` on the group (../../ui/choicebox.tsx). */}
        <div>
          <Label>Resolution</Label>
          <ChoiceboxGroup
            className="mt-2"
            name={`resolution-filed-${action.id}`}
            value={outcome}
            /* Unreachable: every input is disabled and the group drops its own
               handler when read-only. */
            onValueChange={() => {}}
            ariaLabel="Resolution, as signed"
            readOnly
          >
            {RESOLUTIONS.map((r) => (
              <ChoiceboxItem
                key={r.outcome}
                name={`resolution-filed-${action.id}`}
                value={r.outcome}
                selected={r.outcome === outcome}
                title={shortName(r.outcome)}
                description={r.note}
                badge={r.outcome === recommended ? <RecommendedChip /> : undefined}
              />
            ))}
          </ChoiceboxGroup>
        </div>
      </div>

      {/* THE SEAM ABOVE THE MANIFEST — the submit bar's own, deliberately.

          `border-t border-border/70` + `pt-3.5` is character for character what
          ./SubmitBar.tsx puts above itself, and the card's `gap-4` sits above
          both — so the rule over `What changed` and the rule under it are the
          same rule at the same spacing, rather than two lines that happen to be
          1px and grey.

          It earns one because this is where the record stops being the form. The
          three sections above are the values as signed; this and the bar below are
          commentary and action, and each of those now opens on a seam. The hairline
          under the stamp is a different object — `h-px bg-border`, full strength,
          matching the live card's head — and it stays that way: it separates a
          heading from a body, not one block from the next. */}
      <div className="border-t border-border/70 pt-3.5">
        {/* ── WHAT CHANGED — LAST, AND THE ONLY PLACE THE DIFF IS TOLD ──────
            It sat between the stamp and the form, which put an edit history in
            front of the decision it edited. The record reads what was decided, then
            what it rested on, then what a person did to it — so this is the third
            of those and goes third.

            It is also the ONLY one now. The evidence rows below used to carry a
            "you: Low → High" chip built from this same `changes` array, filtered to
            `part === "Evidence"` — the same fact in a second grammar, and a partial
            copy: only evidence changes earned a chip, so the row markers and this
            list could never agree on what "the changes" were.

            OUTSIDE the `aria-readonly` wrapper above, deliberately. That element is
            the form as signed; this is commentary on how it got that way, and
            marking it read-only would say it was one of the fields. */}
        <div className="overflow-hidden rounded-xl border border-border">
          {/* NO TALLY. It read "2 by you · 1 by the agent in answer" over a list of
              exactly those rows — a count of the thing directly beneath it, which a
              reader can do by looking. The empty case said "nothing — filed as the
              agent proposed it" and the paragraph below already says that in full,
              so nothing is lost there either. */}
          <div className="flex items-baseline gap-2 border-b border-border/60 px-3.5 py-2">
            <span className={cn(TYPE.body, "font-semibold")}>What changed</span>
          </div>
          {changes.length === 0 ? (
            /* THE SENTENCE IS UNCHANGED; the tick is what it gained. A paragraph on
               its own read as prose the reader has to finish to learn it says
               "nothing" — the mark says it before the words do. */
            <p className={cn(TYPE.small, INK.ink2, "m-0 flex items-start gap-2 px-3.5 py-2.5")}>
              <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden />
              <span>
                The resolution, the refund, the rationale and all {evidence.length} evidence items are
                as the case opened.
              </span>
            </p>
          ) : (
            changes.map((c, i) => {
              const PartIcon = PART_ICON[c.part];
              return (
                /* A GRID, NOT A FLEX ROW WITH A SPACER.
                   The part used to sit in a `w-[88px]` box inside a flex row, which
                   is a grid column done by hand — and it only held while every row
                   started with plain text. Rows carry glyphs of different widths
                   now, so the four readings are four real columns and they line up
                   down the whole list.

                   `items-center` for the same reason: `items-baseline` aligned text
                   that no longer sits alone on its line. */
                <div
                  key={`${c.part}-${i}`}
                  // A COLUMN FOR THE BADGE, not an inline chip at the head of the
                  // value cell. Inline it would sit at a different x on every row,
                  // because `subject` lengths differ — and scanning the column is the
                  // whole point of a type marker.
                  className="grid grid-cols-[14px_88px_20px_minmax(0,1fr)] items-center gap-x-2.5 border-b border-border/50 px-3.5 py-2 transition-colors last:border-0 hover:bg-muted/40"
                >
                  <PartIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                  <span className={cn(TYPE.small, "text-muted-foreground")}>{c.part}</span>
                  <ChangeBadge change={c} />
                  <span className={cn(TYPE.small, "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1")}>
                    {/* The subject leads, because on an evidence row "Low → High" is
                        meaningless until you know which row moved. */}
                    {c.subject ? <span className="font-semibold">{c.subject} ·</span> : null}
                    {c.from ? (
                      <>
                        <ValueGlyph value={c.from} />
                        <span className="text-muted-foreground line-through">{c.from}</span>
                        {/* An icon rather than the `→` character: with glyphs either
                            side of it, a text arrow sits on the wrong baseline. */}
                        <ArrowRight className="size-3 shrink-0 text-muted-foreground" aria-hidden />
                      </>
                    ) : null}
                    <ValueGlyph value={c.to} />
                    {/* Normal weight — the badge in the column to the left carries
                        the emphasis this used to. */}
                    <span>{c.to}</span>
                    {/* AFTER the figure, because it reads as a verdict on the move
                        rather than as part of the value: "$4,940.00, and that is
                        up". Only the refund sets it — the store's note says why. */}
                    {c.up === true ? (
                      <ArrowUp className="size-3.5 shrink-0 text-success" aria-label="up" />
                    ) : c.up === false ? (
                      <ArrowDown className="size-3.5 shrink-0 text-muted-foreground" aria-label="down" />
                    ) : null}
                    {c.detail ? <span className="text-muted-foreground">· {c.detail}</span> : null}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* HIDDEN, NOT DELETED — see `SHOW_RECORDED` at the top of this file.

          OUT OF THE FORM WRAPPER, and beside the manifest rather than inside the
          fields. It lists what a filed decision sets in motion downstream, which is
          neither one of the four parts that were signed nor a diff of them — it is
          the third record-only block on this card, and the two of them belong
          together after the form rather than one of them sitting among the
          values. */}
      {SHOW_RECORDED && (
        <div className="rounded-xl border border-border bg-card p-4">
          <span className={cn(TYPE.body, "mb-2 block font-semibold")}>Recorded</span>
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {effects.map((e) => (
              <li
                key={e.title}
                className={cn(TYPE.small, "flex gap-2", e.hold ? "text-warning-foreground" : INK.ink2)}
              >
                <Check className={cn("mt-0.5 size-3 shrink-0", e.hold ? "text-warning" : "text-success")} />
                <span>
                  {e.title}
                  {e.detail ? <span className="text-muted-foreground"> — {e.detail}</span> : null}
                  {e.hold ? <span className="text-warning"> · held</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
