import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChoiceboxGroup, ChoiceboxItem } from "@/components/ui/choicebox";
import { INK, Label, TYPE } from "@/components/coverage/primitives";
import { ChangeManifest } from "@/components/coverage/decision/ChangeManifest";
import { EvidenceList } from "@/components/coverage/EvidenceList";
import { RationalePanel } from "@/components/coverage/decision/RationalePanel";
import { RecommendedChip } from "@/components/coverage/decision/RecommendedChip";
import { RefundPanel } from "@/components/coverage/decision/RefundPanel";
import { moneyExact, timeOnly } from "@/lib/warranty/format";
import { RESOLUTIONS } from "@/lib/coverage/fixture";
import type { Change, ReasonRevision } from "@/lib/coverage/store";
import type { EvidenceItem } from "@/lib/coverage/fixture";
import type { CaseAction, DecisionEffect } from "@/lib/warranty/types";
import { cn } from "@/lib/utils";

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
        {/* ── WHAT CHANGED — LAST ON THIS CARD ──────────────────────────────
            It sat between the stamp and the form, which put an edit history in
            front of the decision it edited. The record reads what was decided, then
            what it rested on, then what a person did to it — so this is the third
            of those and goes third.

            It is the only place the diff is told ON THIS CARD. The evidence rows
            above used to carry a "you: Low → High" chip built from this same
            `changes` array, filtered to `part === "Evidence"` — the same fact in a
            second grammar, and a partial copy: only evidence changes earned a chip,
            so the row markers and this list could never agree on what "the changes"
            were. (The LIVE card tells it too when `ciDiff` is on, in this same slot
            and through this same component — which is the point of the component.)

            OUTSIDE the `aria-readonly` wrapper above, deliberately. That element is
            the form as signed; this is commentary on how it got that way, and
            marking it read-only would say it was one of the fields.

            THE PANEL ITSELF IS ./ChangeManifest.tsx — ninety lines of grid that used
            to be inline here, which was fine while this was the only card drawing
            it. The seam above stays, because where the record stops being the form
            is this card's fact rather than the panel's. */}
        <ChangeManifest changes={changes} evidenceCount={evidence.length} />
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
