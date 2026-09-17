import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TYPE } from "@/components/coverage/primitives";
import type { Departures } from "@/lib/coverage/store";
import { cn } from "@/lib/utils";

/**
 * SIGNING OFF THE CARD — the whole card, and the button has to say so.
 *
 * **It used to say `Submit — Deny coverage · $0.00`, and stand above the
 * evidence.** Both halves of that were wrong, and the position was the worse one:
 * whatever a button says, a control that sits ABOVE a block cannot read as
 * submitting it. The evidence moved into this card so the reassessment would be
 * visible while it was being caused (../decision/DecisionSection.tsx has that
 * argument) — but the actions stayed where they had been when the list lived
 * somewhere else, so the four evidence judgements read as reference material the
 * decision was taken against rather than as part of what is being filed.
 *
 * So this is the last thing in the card, and it declares the payload in the two
 * places a reader looks: the button's own second line names all four parts, and
 * the sentence beside it says which of them the person moved.
 *
 * **ONE LABEL — `Submit` — AND NOTHING HERE NAMES THE AGENT.** Both halves of
 * that are a deliberate reversal.
 *
 * It read `Agree & submit` / `Override & submit`, chosen so a reviewer departing
 * from an 87%-confident recommendation did not press the same words as one who
 * agreed with everything. The paragraph beside it read "Departing from the agent
 * on 2 of 4 parts" or "Taking the agent's position on all four parts, unchanged".
 * Between them the strip, the card head and these two put the agent in the
 * reviewer's sentence four times on one screen, and "agree" / "override" only mean
 * anything relative to somebody — so the verb was naming it too.
 *
 * The distinction did not go, it moved: the paragraph now says **No change in
 * position** or **Change in position**, which is the same fact stated about the
 * DECISION rather than about a relationship to a machine. That also removed a trap
 * the old verb had. Re-weighting a row can make the agent move to meet the
 * reviewer — the renewal goes to high, the agent reassesses to where the reviewer
 * was already heading — and the old button asked about the resolution while the
 * old sentence counted parts, so the two could disagree about the same act. One
 * label cannot.
 *
 * **What it does NOT do is change the payload.** `onSubmit` carries the resolution
 * and the reason exactly as before, and the evidence has always travelled with
 * them in the reducer's state. Nothing new is submitted — the button has stopped
 * under-describing what already was.
 */
export function SubmitBar({
  more,
  departures,
  evidenceCount,
  unselected,
  disabled,
  busy,
  onSubmit,
}: {
  /** The `···` menu. A slot, so this file needs to know nothing about its actions. */
  more: ReactNode;
  departures: Departures;
  evidenceCount: number;
  /**
   * No resolution picked yet, which is how the card opens.
   *
   * THE SENTENCE NEEDS THIS, and it is the only reason the prop exists. It was a
   * two-way switch — change in position, or no change — and both readings assume a
   * position. With none picked it said "No change in position." beside a button
   * that cannot be pressed, which reads as a broken control rather than as a step
   * not yet taken. Third value, same slot, same voice.
   *
   * Separate from `disabled` even though the button is disabled on this path too:
   * `disabled` is also true for a missing rationale and while a submit is in
   * flight, and neither of those is this.
   */
  unselected: boolean;
  disabled: boolean;
  busy: boolean;
  onSubmit: () => void;
}) {
  const departed = departures.parts > 0;

  return (
    <div className="flex items-center gap-3 border-t border-border/70 pt-3.5">
      {more}
      <p className={cn(TYPE.small, "m-0 min-w-0 flex-1 leading-relaxed text-muted-foreground")}>
        {unselected ? (
          // FIRST, because it outranks the other two: until a resolution is picked
          // there is no position for them to be a reading of.
          <b className="font-semibold text-foreground">No resolution selected.</b>
        ) : departed ? (
          <>
            <b className="font-semibold text-foreground">Change in position</b> ·{" "}
            {departures.parts} of 4 parts: {listOf(namesOf(departures))}.
          </>
        ) : (
          <b className="font-semibold text-foreground">No change in position.</b>
        )}
      </p>
      <Button
        disabled={disabled}
        aria-busy={busy}
        onClick={onSubmit}
        // A ROW: the spinner's slot, then a two-line stack. The two lines earn the
        // unusual shape — the first is the act, the second is the payload, and
        // splitting them is what lets the payload be named without the act becoming
        // a sentence. `h-auto` and the padding override the size default;
        // `items-center` is the base's, and it is what centres the spinner against
        // the pair rather than against the first line.
        //
        // `disabled:opacity-100` WHILE BUSY, and only while busy. The base carries
        // `disabled:opacity-50`, and `disabled` is true on both paths here — the
        // rationale being empty, and the submit being in flight. Sharing one
        // treatment made those read the same, and a spinner at half strength reads
        // as broken rather than working. Dim still means "not yet"; full strength
        // plus a spinner means "going".
        className={cn(
          // THE BOX GROWS, AND THE PADDING IS WHAT GROWS IT. It was pinned at
          // 48px so the label could not push it out; that pin is gone and the
          // padding opens instead — `py-3.5`/`px-6` against `py-2.5`/`px-5`,
          // which against the original `py-2`/`px-4` is the second opening.
          // `h-auto` so the height is the content's, which is what lets the
          // two-line stack set it rather than a magic number.
          //
          // THE PADDING HAD TO CARRY THIS ALONE, because the type went DOWN in
          // the same change: the label came off 15px to meet the resolution
          // cards at 13 (see the stack below). Height is `py` × 2 + the stack,
          // and the stack lost ~2px, so anything less than `py-3.5` would have
          // read as the button shrinking.
          "h-auto shrink-0 flex-row items-center gap-2.5 px-6 py-3.5",
          /**
           * THE PRIMARY BUTTON, which is the `default` variant and therefore no
           * class at all — this note exists because it was briefly two other things.
           *
           * It was filled with a slate, first to match a picked resolution card and
           * then a step darker than one, while the cards were carrying filled
           * selections. The cards no longer fill (../../ui/choicebox.tsx), so the
           * reason is gone: this is the one action on the page and it wears the
           * app's action colour, as every other primary button does.
           *
           * **Its ink is white on `--primary`, which measures 3.19:1.** That is
           * under the 4.5 an AA pass wants for 13px semibold — and it is the
           * `default` variant's behaviour app-wide, not something this screen
           * introduced. Fixing it belongs in `ui/button.tsx` (a darker
           * `--primary-700` fill would clear it) rather than in one button behind a
           * flag, so it is recorded here and left alone.
           */
          /**
           * A PRESSED STATE, because the base button has none.
           *
           * `ui/button.tsx` carries `hover:bg-primary/90` and stops there, so a
           * press on this control produced no feedback at all until the spinner
           * arrived — and that is 500ms later, deliberately
           * (../decision/DecisionSection.tsx stages it so the section does not
           * change shape under the pointer). Half a second of nothing on the one
           * button that files the decision reads as a click that missed.
           *
           * Two cues, because one was not enough on a 61px block: the fill takes a
           * step past `hover:bg-primary/90`, and the whole button drops 1px.
           * `transition-all` is already on the base, so both animate.
           *
           * SCOPED HERE rather than added to the variant. That file is every button
           * in the app, and a press state is worth having everywhere — but not as a
           * side effect of a change to one screen behind a flag.
           *
           * `disabled:pointer-events-none` on the base means neither cue can fire
           * while the button is dim or in flight, which is what should happen.
           */
          "active:translate-y-px active:bg-primary/80",
          busy && "disabled:opacity-100",
        )}
      >
        {/* ── THE SPINNER, BEFORE THE TEXT AND OUTSIDE IT ────────────────────
            Three arrangements were tried and the difference between them is
            where this sits in the tree, not what it looks like.

            Inside line 1, with a slot held open when idle: the label ended up
            24px in from the padding edge while the payload line below started
            flush against it, so a left-aligned button's two lines did not share
            a left edge.

            Inside line 1, trailing: alignment fine, but a spinner after a
            43-character payload line reads as belonging to the payload.

            Here — a sibling of the stack, not a child of a line — it is beside
            BOTH lines and centred against them, and it is the arrangement that
            can widen the button. That is worth stating because the earlier note
            claimed it could not: inside line 1 it cannot, since the payload line
            governs the width and line 1 has slack to swallow anything added to
            it. Out here the spinner is added to the stack's full width instead.

            **THE SLOT IS ALWAYS HELD, AND THAT IS THE FIX, NOT A DETAIL.** Out
            here the spinner used to be mounted only while `busy`, so pressing
            Submit widened the button by the icon plus the gap — 26px of reflow
            on the one control whose job is to look pressed rather than to move.
            The earlier note recorded that growth approvingly; it was a bug with
            a rationale. `invisible` keeps the box in the layout and takes it out
            of the paint, so idle, disabled and busy measure identically.

            The empty gutter this leaves when idle is the price, and it is the
            right way round: a fixed 16px inset reads as an icon slot, whereas a
            button that jumps as it commits reads as a mis-click. */}
        <Loader2
          aria-hidden
          className={cn("size-4 shrink-0 animate-spin", !busy && "invisible")}
        />

        <span className="flex min-w-0 flex-col items-start gap-0.5">
          {/* 13px SEMIBOLD, and it is now one rung ABOVE the resolution cards'
              titles rather than level with them (../../ui/choicebox.tsx). It was
              15, which made the act two rungs louder than the three things it
              acts on; both files then met at 13 so neither out-shouted the other.
              The cards have since dropped to 12 — three choices should not weigh
              as much as the single control that files them — so this keeps 13 and
              the one-rung gap is deliberate. Changing this means changing that.

              `leading-tight` stays. The two lines are a stack inside a control,
              not prose, and the button's height is measured off them. */}
          <span className="text-[13px] leading-tight font-semibold">Submit</span>
          {/* The payload, named. Not a count of what changed — that is the
              sentence's job — but what goes when this is pressed, which is all
              four parts on every path.

              `text-xs` (12px) — the rung the cards' own descriptions use, up
              from an off-scale 10.5. It sits one step under the label exactly as
              a card's description sits under its title, so the pair reads as the
              same object in a different colour.

              `tabular-nums` because the count changes under the reviewer: a
              proportional digit set re-measures the line on the way from 9 to
              10 items, which is the same reflow the spinner slot above exists to
              stop. */}
          <span className="text-xs leading-tight font-normal tabular-nums opacity-85">
            Resolution, refund, rationale and {evidenceCount}{" "}
            {evidenceCount === 1 ? "evidence item" : "evidence items"}
          </span>
        </span>

        {/* The visible text never changes, so nothing here is announced without
            this. `aria-busy` above marks the control; this says it in words for a
            reader who cannot see a spinner. */}
        <span aria-live="polite" className="sr-only">
          {busy ? "Submitting the decision" : ""}
        </span>
      </Button>
    </div>
  );
}

/** The departing parts, in the order the card presents them. */
function namesOf(d: Departures): string[] {
  const out: string[] = [];
  if (d.resolution) out.push("resolution");
  if (d.refund) out.push("refund");
  if (d.rationale) out.push("rationale");
  if (d.evidence > 0) {
    out.push(`${d.evidence} evidence ${d.evidence === 1 ? "change" : "changes"}`);
  }
  return out;
}

/** `a`, `a and b`, `a, b and c` — an Oxford-comma-free list, which is the house style. */
function listOf(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
