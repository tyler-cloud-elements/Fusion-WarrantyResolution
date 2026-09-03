import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronLeft,
  ExternalLink,
  FlaskConical,
  Inbox,
  RefreshCw,
  RotateCcw,
  Upload,
} from "lucide-react";
import { AiMark } from "@/components/ui/ai-mark";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageContainer } from "@/components/PageContainer";
import { AskAiPanel } from "@/components/warranty/AskAiPanel";
import { CaseDetailSkeleton } from "@/components/warranty/CaseSkeletons";
import { CaseTabs } from "@/components/warranty/CaseTabs";
import { ReassessmentCard } from "@/components/warranty/ReassessmentCard";
import { CaseStatusBadge, PriorityBadge, SlaBadge } from "@/components/warranty/badges";
import { cn } from "@/lib/utils";
import { money } from "@/lib/warranty/format";
import { formatRemaining, formatSlaBudget } from "@/lib/warranty/sla";
import {
  acceptReassessment,
  fireEvidenceUploadEvent,
  hasEvidenceUploadFired,
  patchCase,
  resetDemoState,
  useActionsForCase,
  useCase,
  useCaseAutoRefresh,
} from "@/lib/warranty/useCases";
import { liveLinksAllowed, useFlags } from "@/lib/flags";
import { useRole } from "@/lib/role/useRole";
import { maestroInstanceUrl } from "@/services/uipath/config";

/** "1 open task" / "3 open tasks" — the same words wherever the button goes. */
function taskLabel(count: number): string {
  return `${count} open ${count === 1 ? "task" : "tasks"}`;
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="text-xs font-light text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{children}</span>
    </div>
  );
}

export function CaseDetailPage() {
  const { caseId } = useParams({ strict: false }) as { caseId: string };
  const { warrantyCase, isLoading, isRefreshing, refresh } = useCase(caseId);
  const actions = useActionsForCase(caseId ?? "");
  const { profile } = useRole();
  const flags = useFlags();
  // Drives the upload item's done state, so a second click reads as spent
  // rather than as a button that stopped working.
  const uploadFired = Boolean(warrantyCase && hasEvidenceUploadFired(warrantyCase));

  // An open case is still being moved by the process, so it re-reads itself
  // every ten seconds for as long as this page is on screen.
  useCaseAutoRefresh(warrantyCase);

  const [tab, setTab] = useState("overview");
  // Open the panel automatically only where there is room alongside the case
  // content; on narrower screens it stays closed until invoked.
  const [chatOpen, setChatOpen] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1620,
  );

  // Undefined while loading is not the same as absent. Landing here by URL —
  // a refresh, a pasted link — starts with an empty store, and calling that a
  // missing case put a 404 on screen for a case that was seconds from arriving.
  if (isLoading && !warrantyCase) return <CaseDetailSkeleton />;

  if (!warrantyCase) {
    return (
      <PageContainer>
        <div className="flex flex-col gap-3">
          <Link
            to="/cases"
            className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-4" /> Work queue
          </Link>
          <p className="text-sm text-muted-foreground">Case {caseId} not found.</p>
        </div>
      </PageContainer>
    );
  }

  const openActions = actions.filter((a) => a.status === "Open");
  const primaryAction = openActions[0];
  // Demo rows carry no instance id, so this is already null for them — the flag
  // check is the explicit half of the same rule: under demo data nothing links
  // out, because there is nothing on the other end.
  const instanceUrl = liveLinksAllowed(flags)
    ? maestroInstanceUrl(warrantyCase.instanceId, warrantyCase.folderKey)
    : null;
  // Inline editing on the Details tab belongs to whoever owns the case.
  const editable = profile.name === warrantyCase.owner;

  return (
    <div className="flex h-full min-h-0">
      {/*
        A container, so the tab layouts below react to this column's width
        rather than the window's. With the Ask panel open the column is 380px
        narrower while `lg:` still reads the viewport as wide — which is how a
        two-column Overview ended up 958px of content in 632px of room, cut off
        under the panel and only reachable by scrolling sideways.
      */}
      <div className="@container min-w-0 flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/cases"
              className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="size-4" /> Work queue
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refresh}
                disabled={isRefreshing}
                title="Refresh this case"
              >
                <RefreshCw className={cn("size-4", isRefreshing && "animate-spin")} />
                Refresh
              </Button>
              {instanceUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={instanceUrl} target="_blank" rel="noreferrer">
                    Open case run
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              )}
              {!chatOpen && (
                <Button variant="ai" onClick={() => setChatOpen(true)}>
                  <AiMark className="size-4" />
                  Ask AI
                </Button>
              )}
            </div>
          </div>

          {/* Hero header */}
          <Card className="gap-0 p-0">
            <div className="flex flex-wrap items-start gap-x-10 gap-y-4 p-6">
              <div className="mr-auto min-w-0">
                <h1 className="text-2xl font-bold tracking-tight">{warrantyCase.customer}</h1>
                <div className="text-xs text-muted-foreground">
                  {warrantyCase.id} · {warrantyCase.site}
                </div>
                <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                  {warrantyCase.description}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted-foreground">
                  <span>
                    <span className="font-semibold text-foreground">Asset</span>{" "}
                    {warrantyCase.asset.model} · SN {warrantyCase.asset.serial}
                  </span>
                  <span aria-hidden>·</span>
                  <span>
                    <span className="font-semibold text-foreground">Claim value</span>{" "}
                    {money(warrantyCase.claimValue)}
                  </span>
                  <span aria-hidden>·</span>
                  <span>
                    <span className="font-semibold text-foreground">Owner</span> {warrantyCase.owner}
                  </span>
                </div>
              </div>
              <Meta label="Status">
                <CaseStatusBadge status={warrantyCase.status} />
              </Meta>
              <Meta label="Priority">
                <PriorityBadge priority={warrantyCase.priority} />
              </Meta>
              <Meta label="Stage">{warrantyCase.currentStage}</Meta>
              <Meta label={formatSlaBudget(warrantyCase.slaMinutes)}>
                <span className="flex items-center gap-2">
                  <SlaBadge status={warrantyCase.slaStatus} />
                  <span className="text-xs font-normal text-muted-foreground tabular-nums">
                    {formatRemaining(warrantyCase.elapsedMinutes, warrantyCase.slaMinutes)}
                  </span>
                </span>
              </Meta>

              <div className="flex w-full flex-wrap items-center gap-2">
                {/*
                  One button, and only its destination is a setting.
                  It reads the same either way — the count is what a reader
                  scans for — so the label does not shift under someone who has
                  learned where it is. `useActions` sends it to the queue;
                  without it, it opens the decision directly, which is the
                  shorter path from a case already in front of you.
                */}
                {openActions.length > 0 && (
                  <Button asChild>
                    {flags.useActions || !primaryAction ? (
                      <Link to="/actions" search={{ case: warrantyCase.id }}>
                        <Inbox className="size-4" />
                        {taskLabel(openActions.length)}
                      </Link>
                    ) : (
                      <Link
                        to="/cases/$caseId/tasks/$taskId"
                        params={{ caseId: warrantyCase.id, taskId: primaryAction.id }}
                      >
                        <Inbox className="size-4" />
                        {taskLabel(openActions.length)}
                      </Link>
                    )}
                  </Button>
                )}
                {/*
                  Manual actions — a presenter's controls, deliberately one step
                  back from the case's own buttons.
                     Everything else in this row is work: decide the action, open
                  the queue. These stand in for events the platform would deliver
                  on its own — a real deployment fires the configured webhook and
                  the event arrives — so they belong behind a menu that says as
                  much, rather than sitting at the same weight as "Decide" and
                  inviting a click mid-demo.
                */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {/* Pushed to the end of the row — same area, last in line. */}
                    <Button variant="outline" className="ml-auto">
                      <FlaskConical className="size-4" />
                      Manual actions
                      <ChevronDown className="size-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="start" className="w-80">
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      Fired by hand, in place of the real event
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onSelect={() => fireEvidenceUploadEvent(warrantyCase)}
                      disabled={uploadFired}
                      className="flex items-start gap-2 py-2"
                    >
                      <Upload className="mt-0.5 size-4 shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">Customer evidence upload</span>
                        <span className="block text-xs leading-snug text-muted-foreground">
                          {uploadFired
                            ? "Already arrived on this case."
                            : "New photos land mid-case and wake the case agent."}
                        </span>
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onSelect={resetDemoState}
                      className="flex items-start gap-2 py-2"
                    >
                      <RotateCcw className="mt-0.5 size-4 shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">Reset session state</span>
                        <span className="block text-xs leading-snug text-muted-foreground">
                          Clears every decision and event taken since the page loaded.
                        </span>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>

          {warrantyCase.reassessment && (
            <ReassessmentCard
              reassessment={warrantyCase.reassessment}
              acceptLabel="Route to engineering exception"
              onAccept={() => acceptReassessment(warrantyCase, "Engineering exception")}
              onOverride={() => acceptReassessment(warrantyCase, warrantyCase.currentStage)}
            />
          )}

          <CaseTabs
            warrantyCase={warrantyCase}
            actions={actions}
            tab={tab}
            onTabChange={setTab}
            variant="page"
            editable={editable}
            onSaveCase={(patch) => patchCase(warrantyCase.id, patch)}
          />
        </div>
      </div>

      {chatOpen && <AskAiPanel warrantyCase={warrantyCase} onClose={() => setChatOpen(false)} />}
    </div>
  );
}
