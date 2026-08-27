import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { moneyExact } from "@/lib/warranty/format";
import type { CaseAction, WarrantyCase } from "@/lib/warranty/types";

/**
 * What is being decided, stated before anything is argued.
 *
 * This replaced a "Why this reached you" card, which asked the reader to take
 * the escalation on trust. What is here instead is what the coverage argument
 * rests on — whose asset, where, under an agreement live until when — and the
 * sentence about why a person has it closes the block rather than standing
 * alone.
 *
 * Deliberately thin. The serial, the identity check and the agreement number are
 * all in the case drawer a click away, and none of them changes the decision;
 * carrying them here only pushed the finding below the fold. What stays is what
 * a reader would ask for before reading the argument.
 *
 * The claim total is the exception to the no-duplication rule. The decision card
 * also shows a total, but a different one: this is the claim **as filed**, fixed,
 * while the card's totals move with the position. They cannot disagree, and
 * knowing the size of the thing before reading the argument is worth a figure.
 *
 * The mock's agent-recommendation tile is still left out — that one would
 * genuinely restate the decision card, and would go stale the moment a position
 * changed.
 */
/**
 * The agreement in the two clauses that bear on the decision.
 *
 * `warrantyStatus` reads "Extended Service Agreement NRD-ESA-2024-0219 · active
 * to 2027-09-02 · deductible $0.00". The reference number is filing detail; what
 * a reader needs here is that cover is live and what it costs them to use it, so
 * the agreement's own identifier is dropped and the rest kept as written.
 */
function coverageTerms(warrantyStatus: string): string {
  return warrantyStatus
    .split("·")
    .map((part) => part.trim())
    .filter((part) => part && !/^(extended service agreement|esa)\b/i.test(part))
    .join(" · ");
}

export function DecisionHeader({
  action,
  warrantyCase,
  className,
}: {
  action: CaseAction;
  warrantyCase: WarrantyCase;
  className?: string;
}) {
  const { asset } = warrantyCase;
  const claim = action.claimTotal ?? warrantyCase.claimValue;
  const terms = coverageTerms(asset.warrantyStatus);

  return (
    <Card className={cn("gap-1.5 p-4", className)}>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="font-mono text-[11.5px] tracking-tight text-muted-foreground">
          {warrantyCase.id}
        </span>
        <h2 className="text-[15px] font-semibold leading-tight">{warrantyCase.customer}</h2>
        {warrantyCase.customerSegment && (
          <span className="rounded bg-muted px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-muted-foreground">
            {warrantyCase.customerSegment}
          </span>
        )}

        {/* The size of the thing, before the argument about who pays it. */}
        {claim > 0 && (
          <span className="ml-auto flex shrink-0 items-baseline gap-1.5">
            <span className="text-[9px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">
              Claim as filed
            </span>
            <b className="text-[15px] font-semibold tabular-nums">{moneyExact(claim)}</b>
          </span>
        )}
      </div>

      <p className="flex flex-wrap items-center gap-x-1.5 text-[11.5px] leading-relaxed text-muted-foreground">
        <b className="font-semibold text-foreground">{asset.model}</b>
        <span aria-hidden>·</span>
        <span>{warrantyCase.site}</span>
        {terms && (
          <>
            <span aria-hidden>·</span>
            <span>{terms}</span>
          </>
        )}
      </p>

      {action.whyThisReachedYou && (
        <p className="mt-1 text-[13px] leading-relaxed">{action.whyThisReachedYou}</p>
      )}
    </Card>
  );
}
