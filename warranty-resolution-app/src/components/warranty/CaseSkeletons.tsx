import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/PageContainer";

// Placeholders for the two screens you can land on cold.
//
// Both are reachable by URL, so a refresh starts with no cases in memory and
// spends a beat restoring the token and reading the instance. These stand in for
// that beat. They trace the real layout — hero, meta row, tabs — so the page
// does not jump when the data replaces them.

function Line({ className }: { className?: string }) {
  return <Skeleton className={className ?? "h-4 w-40"} />;
}

/** A dimmed, inert copy of the back link, so the header does not pop in. */
function BackLink() {
  return (
    <span className="flex w-fit items-center gap-1 text-sm text-muted-foreground/60">
      <ChevronLeft className="size-4" /> Work queue
    </span>
  );
}

export function CaseDetailSkeleton() {
  return (
    <div className="h-full overflow-y-auto p-6" aria-busy="true" aria-label="Loading case">
      <div className="flex flex-col gap-6">
        <BackLink />

        <Card className="gap-0 p-0">
          <div className="flex flex-wrap items-start gap-x-10 gap-y-4 p-6">
            <div className="mr-auto flex min-w-0 flex-col gap-2">
              <Line className="h-7 w-64" />
              <Line className="h-3 w-44" />
              <Line className="h-4 w-[28rem] max-w-full" />
              <Line className="h-3 w-80 max-w-full" />
            </div>

            {/* The four meta columns: label over value. */}
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Line className="h-3 w-16" />
                <Line className="h-5 w-24" />
              </div>
            ))}

            <div className="flex w-full flex-wrap items-center gap-2">
              <Line className="h-9 w-52" />
              <Line className="h-9 w-40" />
            </div>
          </div>
        </Card>

        {/* Tab strip, then the overview's two columns. */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }, (_, i) => (
              <Line key={i} className="h-8 w-24" />
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <Card className="p-6">
              <div className="flex flex-col gap-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <Line key={i} className={i === 0 ? "h-5 w-48" : "h-4 w-full"} />
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex flex-col gap-3">
                {Array.from({ length: 4 }, (_, i) => (
                  <Line key={i} className={i === 0 ? "h-5 w-32" : "h-4 w-full"} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DecisionConsoleSkeleton() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading decision">
        <BackLink />
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Card className="p-6">
            <div className="flex flex-col gap-4">
              <Line className="h-6 w-72" />
              <Line className="h-4 w-full" />
              <Line className="h-4 w-5/6" />
              <div className="mt-2 flex flex-col gap-2">
                {Array.from({ length: 4 }, (_, i) => (
                  <Line key={i} className="h-11 w-full" />
                ))}
              </div>
              <Line className="h-9 w-40" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex flex-col gap-3">
              {Array.from({ length: 6 }, (_, i) => (
                <Line key={i} className={i === 0 ? "h-5 w-36" : "h-4 w-full"} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
