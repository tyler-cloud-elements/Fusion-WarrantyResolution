import { AiMark } from "@/components/ui/ai-mark";

/**
 * THE AGENT'S OWN PICK, marked where the choice is made.
 *
 * ITS OWN MODULE for the same reason ./RefundPanel.tsx has one: it is needed by
 * ./DecisionSection.tsx and by ./FiledRecord.tsx, and the first of those imports
 * the second, so it cannot live in either.
 *
 * The filed record is the new caller. Its hand-rolled resolution cards carried no
 * marker at all — while a comment in that file claimed they did — so a signed
 * decision could not say which of the three the agent had opened on. Same chip,
 * same place on the card, whether the decision is being made or being read.
 */
export function RecommendedChip() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-insight-100 px-1.5 py-px text-[10.5px] font-semibold whitespace-nowrap text-foreground dark:bg-insight-800 dark:text-white">
      <AiMark className="size-[11px] shrink-0 text-insight-600 dark:text-white" />
      Agent recommended
    </span>
  );
}
