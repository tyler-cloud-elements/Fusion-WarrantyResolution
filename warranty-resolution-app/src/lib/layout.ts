import { useFlags } from "@/lib/flags";
import { cn } from "@/lib/utils";

/**
 * HOW WIDE A PAGE'S CONTENT IS ALLOWED TO BE, in one place.
 *
 * The app had no single answer to this. `PageContainer` capped nothing and ran to
 * the window edge; the CI coverage decision held itself to 1180px; the console
 * beside it to 1460px; the case detail to nothing again. Four pages, three
 * different answers, none of them stated anywhere a reader would look.
 *
 * `ciNarrow` is the switch, and this is where the number it switches to lives.
 *
 * **960px, and it is a measured floor rather than a round number.** The three
 * resolution cards are what bind: "Approve partial + goodwill" needs 198px to sit
 * on one line, so the row needs 618px of content, and 960 leaves each card 290px.
 * The rationale field lands at ~580px, still about 75 characters at 13px, which is
 * a comfortable measure rather than a cramped one. Below roughly 900 the cards
 * start wrapping and the gain turns into a cost.
 *
 * **What it buys is horizontal travel.** Measured on the running decision page at
 * a 1600px window: between an evidence row's name and its first control there are
 * 581px of nothing, because the name sits at the left edge and the two selects at
 * the right. At 960 that span is 361px. The cards themselves lose very little —
 * the widest prose block on the page is 724px, set by the card's own internal
 * split, not by the page.
 */
const NARROW_MAX = "max-w-[960px]";

/**
 * The cap to merge into a page's content wrapper, or nothing.
 *
 * Returns a class rather than a boolean so every call site spells the same
 * intent, and so `cn` — tailwind-merge — resolves it against whatever wider
 * `max-w-*` that site already carries. The two decision pages do carry one, which
 * is why this has to win rather than be added alongside.
 *
 * `w-full` travels with it: a `max-w` on a flex child that has no basis would
 * otherwise shrink to its content instead of filling up to the cap.
 */
export function usePageWidthClass(): string | undefined {
  const { ciNarrow } = useFlags();
  return ciNarrow ? cn("mx-auto w-full", NARROW_MAX) : undefined;
}
