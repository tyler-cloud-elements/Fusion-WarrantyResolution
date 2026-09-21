import type { ReactNode } from "react";
import { usePageWidthClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

// Padded, independently-scrolling container for standard pages. (Actions and the
// claim detail manage their own full-height layouts instead.)
export function PageContainer({ children, className }: { children: ReactNode; className?: string }) {
  const width = usePageWidthClass();
  // DS layout-grid margins: 16 / 24 / 32px across mobile / tablet / desktop.
  return (
    <div className={cn("h-full overflow-y-auto px-4 py-6 sm:px-6 lg:px-8", className)}>
      {/* THE CAP GOES INSIDE THE SCROLLER, not on it.
          Capping the scrolling element would centre the scrollbar in the window
          along with the content, which reads as a panel rather than as a page.
          The scroller stays full width and keeps its bar at the edge; only what
          it holds is narrowed (../lib/layout.ts).

          Always rendered, even when the flag is off and it carries no classes, so
          toggling the flag does not remount the subtree and lose scroll position
          or any open editor inside it. */}
      <div className={width}>{children}</div>
    </div>
  );
}
