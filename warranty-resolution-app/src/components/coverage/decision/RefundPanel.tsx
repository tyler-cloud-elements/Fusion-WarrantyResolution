import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TYPE } from "@/components/coverage/primitives";
import { moneyExact } from "@/lib/warranty/format";
import type { CoverageEvent } from "@/lib/coverage/store";
import type { CaseAction } from "@/lib/warranty/types";
import { cn } from "@/lib/utils";

/**
 * ITS OWN MODULE, AND THE REASON IS A CYCLE.
 *
 * It lived in ./DecisionSection.tsx, which is where it is used — and it has a
 * second caller now, ./FiledRecord.tsx, which renders it `readOnly` instead of
 * drawing its own copy of the same figures. But `DecisionSection` imports
 * `FiledRecord`, so importing the panel back out of it would have closed a loop
 * between the two files.
 *
 * ./RationalePanel.tsx is the panel beside this one on the card and already has a
 * file of its own, so this is the arrangement the folder was already in.
 */
/**
 * EXPORTED, for the filed record.
 *
 * ./FiledRecord.tsx used to draw its own half-width "Refund & authority" card: the
 * same figures, a different heading, a different rank for the number, and no cost
 * lines at all. One panel, two implementations, and the record's copy was missing
 * the breakdown the decision was built from. It renders this instead, `readOnly`.
 */
export function RefundPanel({
  action,
  refund,
  limit,
  claim,
  readOnly = false,
  dispatch,
}: {
  action: CaseAction;
  refund: number;
  limit: number;
  claim: number;
  /**
   * THE AMOUNT AS SIGNED.
   *
   * The field becomes the figure it was holding, at the same 16/600 rung — so the
   * panel keeps its subject and the number keeps its rank. Everything else on the
   * panel is derived and already read-only: the claim total, the breakdown lines,
   * the customer's half, the authority meter.
   */
  readOnly?: boolean;
  dispatch?: (e: CoverageEvent) => void;
}) {
  const [text, setText] = useState(refund.toFixed(2));
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (!editing) setText(refund.toFixed(2));
  }, [refund, editing]);
  // At or over the ceiling the figure and the meter turn AMBER, not red: red is the
  // page's word for "denies cover", and a refund that needs a second approver is a
  // routing condition, which is what amber says everywhere else here (the header's
  // Action required pill, a held effect).
  const over = refund >= limit;
  const pct = Math.min(100, (refund / limit) * 100);
  const partial = action.options.find((o) => o.outcome === "PartialPlusGoodwill");

  /**
   * THE REFUND IS THE PANEL'S ONE FIGURE.
   *
   * It was one of two 16px figures in a 2-up grid, competing with the amount the
   * customer carries. At 20px with the derived figure demoted to a row beneath it,
   * the panel has a subject: the number the reviewer is setting. 24px was the
   * first try and read as a display figure in a 300px column; 20px is the rung the
   * decision's own position line uses, which is the largest thing this card is
   * allowed to have.
   *
   * `pl-[22px]` and `left-2.5` are kept from the old field rather than retuned for
   * the larger type — both are in the sheet, and a new arbitrary padding is
   * exactly the kind of class this folder drops silently.
   *
   * **It is a binding rather than inline JSX** because it has to render in two
   * places: inside the `Collapsible` when there are cost lines, and on its own
   * when there are none. See its use site for why it sits inside that root.
   */
  /**
   * THE SIGNED FIGURE, where the field was.
   *
   * `text-base font-semibold tracking-tight tabular-nums` is lifted verbatim off
   * the input below, and the 32px box height with it, so the number does not change
   * rank or move the panel's other rows when the decision is filed. What goes is
   * the chrome that says "type here": the rim, the ground, the focus ring and the
   * `$` prefix — the figure prints its own currency through `moneyExact`.
   */
  const refundFigure = (
    <div className="mt-2.5 flex min-w-0 flex-col gap-1">
      <span className={cn(TYPE.small, "text-muted-foreground")}>Refund</span>
      <span className="flex h-8 items-center text-base font-semibold tracking-tight tabular-nums">
        {moneyExact(refund)}
      </span>
    </div>
  );

  const refundField = (
    <label className="mt-2.5 flex min-w-0 flex-col gap-1">
      <span className={cn(TYPE.small, "text-muted-foreground")}>Refund</span>
      <span className="relative inline-flex items-center">
        <span className={cn(TYPE.small, "pointer-events-none absolute left-2.5 text-muted-foreground")}>$</span>
        <input
          type="text"
          inputMode="decimal"
          value={text}
          onFocus={() => setEditing(true)}
          onChange={(e) => {
            setText(e.target.value);
            const n = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
            dispatch?.({ type: "refund.set", value: Number.isFinite(n) ? n : 0 });
          }}
          onBlur={() => {
            setEditing(false);
            setText(refund.toFixed(2));
          }}
          /**
           * 16/600 IN A 32px BOX, DOWN FROM 20/700 IN 40.
           *
           * It was a second display figure: 20px bold, a few pixels from the claim's
           * 24px bold, two numbers competing to be the one the card is about — and
           * this is the one field on the card a person types into, which was dressed
           * as a headline. 16/600 is the card-head step rather than the display step,
           * and it is still the largest thing inside its own panel, which is the job.
           *
           * `pl-[18px]` follows the `$` down: the prefix is `TYPE.small` now, so the
           * old 22px left it floating.
           */
          className="h-8 w-full rounded-lg border border-border bg-background pr-2.5 pl-[18px] text-left text-base font-semibold tracking-tight tabular-nums focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        />
      </span>
    </label>
  );

  return (
    /* 12/14 padding and a fixed width. The panel used to be `p-4` in a half-card
       column; both of those were spent on a group of four short figures. See the
       wrapper's note for why the width is a hard 300px rather than a ratio. */
    <div className="flex flex-col rounded-xl border border-border bg-card px-3.5 py-3 lg:w-[300px] lg:shrink-0">
      {/* ── THE HEAD CARRIES THE BREAKDOWN ─────────────────────────────────
          `Amount` on the left, the claim total and the disclosure on the right —
          the shape the Rationale head beside it already had, so the two now read
          as one pair rather than as two panels styled on different days.

          It also deletes a row. The trigger used to be a fourth line at the foot
          of the panel, under the authority meter, printing the same total this
          head now prints; folding it up here is worth about 28px and costs
          nothing, because a head with a control in it is what this card does
          everywhere else.

          The `Collapsible` has to WRAP both the head and the content — Radix
          needs its trigger and its panel under one root — which is why the head
          is inside it rather than the other way round. */}
      {action.costLines && action.costLines.length > 0 ? (
        <Collapsible>
          <div className="flex min-h-[24px] items-center gap-2">
            <span className={cn(TYPE.small, "font-semibold")}>Amount</span>
            <CollapsibleTrigger className="group ml-auto flex cursor-pointer items-center gap-1.5 rounded-md text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
              <span className={cn(TYPE.small, "font-semibold tabular-nums")}>{moneyExact(claim)}</span>
              <span className={cn(TYPE.small, "text-muted-foreground")}>Breakdown</span>
              <ChevronDown
                aria-hidden
                className="size-3 shrink-0 text-muted-foreground transition-transform duration-150 group-data-[state=open]:rotate-180"
              />
            </CollapsibleTrigger>
          </div>
          {/* THE FIELD SITS BETWEEN THE TRIGGER AND THE CONTENT, and that is the
              whole point of it being here rather than after the `Collapsible`.
              With the lines above the field, opening the breakdown pushed the
              refund input down the panel — the one control in here that must not
              move under the pointer. Radix needs its trigger and its panel under
              one root, so the root stretches to include the field and the content
              opens BELOW it. Nothing above the lines moves when they appear. */}
          {readOnly ? refundFigure : refundField}

          <CollapsibleContent>
            <div className="flex flex-col gap-1.5 pt-2.5">
              {action.costLines.map((line) => {
                const alloc = partial?.allocation?.[line.id as keyof NonNullable<typeof partial.allocation>];
                return (
                  <div
                    key={line.id}
                    title={alloc ? `${alloc.why} · ${alloc.to === "vendor" ? "to us" : "to the customer"} under the split` : undefined}
                    className={cn(TYPE.small, "flex items-baseline justify-between gap-3")}
                  >
                    <span className="min-w-0 truncate font-medium text-muted-foreground">{line.name}</span>
                    <span className="shrink-0 font-medium tabular-nums">{moneyExact(line.amount)}</span>
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <>
          <div className="flex min-h-[24px] items-center">
            <span className={cn(TYPE.small, "font-semibold")}>Amount</span>
          </div>
          {readOnly ? refundFigure : refundField}
        </>
      )}


      {/* Derived, so a row rather than a field — and it keeps its own caption
          because "Paid by the customer" is the half of the split that is easy to
          forget is being decided. */}
      {/* `TYPE.body` — 12 → 14. The refund came down to 16 and this is its other
          half; at 12 against a 20px figure it read as a footnote to a headline,
          which is not the relationship. Now it is one figure and its consequence. */}
      <div className={cn(TYPE.body, "mt-2.5 flex items-baseline justify-between gap-3 text-muted-foreground")}>
        Paid by the customer
        <b className="font-semibold tabular-nums text-foreground">{moneyExact(claim - refund)}</b>
      </div>

      {/* THE AUTHORITY CHECK, ON ONE LINE.
          It was a raised box holding three stacked elements — a figure, a bar and a
          caption — that between them say one thing: how much of the signer's limit
          this commits. Inline, the bar takes the slack between the number and the
          words, and the box goes with the stacking: nothing here needed raising out
          of a panel that is already inside a card. */}
      {/* `mt-auto` — the authority check sits on the panel's floor, so the slack
          the shorter column has is a gap between the figures and the check rather
          than an empty strip under everything. */}
      {/* THE CEILING, AS ONE PHRASE.
          It read `$0.00` — of — `$5,000.00` — meter — `your limit`, with the label
          stranded on the far side of the bar from the figures it labels. A slash
          binds the two numbers into the fraction they are and `ceiling` sits with
          them, so the line reads `$0.00/$5,000.00 ceiling` in one go. The word
          matches the case card above, which already calls this the approval
          ceiling. The meter then takes the rest of the line rather than splitting
          it. */}
      <div className={cn(TYPE.small, "mt-auto flex items-center gap-2.5 pt-3 text-muted-foreground")}>
        <span className="shrink-0 tabular-nums">
          <b className={cn("font-bold", over ? "text-warning-foreground" : "text-foreground")}>
            {moneyExact(refund)}
          </b>
          /<b className="font-bold text-foreground">{moneyExact(limit)}</b> ceiling
        </span>
        <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-primary/20">
          <span
            className={cn(
              "block h-full rounded-full transition-[width,background-color] duration-200",
              over ? "bg-warning" : "bg-primary",
            )}
            style={{ width: `${pct}%` }}
          />
        </span>
      </div>

    </div>
  );
}
