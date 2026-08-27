import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CaseAction, WarrantyCase } from "@/lib/warranty/types";

/**
 * What is being decided, stated before anything is argued.
 *
 * This replaced a "Why this reached you" card, which asked the reader to take
 * the escalation on trust. The facts underneath it are cheap to state and are
 * what the coverage argument actually rests on — whose asset, confirmed how,
 * under which agreement, live until when — so they lead, and the sentence about
 * why a person is looking at it closes the block rather than standing alone.
 *
 * The console mock puts a claim-total and an agent-recommendation tile here too.
 * Both are deliberately left out: the decision card two columns over states the
 * total, the split and the recommendation, and saying them twice invites them to
 * disagree the moment a position is changed.
 */
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
      </div>

      <p className="flex flex-wrap items-center gap-x-1.5 text-[11.5px] leading-relaxed text-muted-foreground">
        <span>
          Asset <b className="font-semibold text-foreground">{asset.model}</b>
        </span>
        <span className="font-mono">{asset.serial}</span>
        {asset.identityConfirmed && (
          <span className="inline-flex items-center gap-0.5 text-success">
            <Check className="size-3" aria-hidden />
            identity confirmed
          </span>
        )}
        <span aria-hidden>·</span>
        <span>{warrantyCase.site}</span>
      </p>

      {asset.warrantyStatus && (
        <p className="text-[11.5px] leading-relaxed text-muted-foreground">
          {asset.warrantyStatus}
        </p>
      )}

      {action.whyThisReachedYou && (
        <p className="mt-1.5 text-[13px] leading-relaxed">{action.whyThisReachedYou}</p>
      )}
    </Card>
  );
}
