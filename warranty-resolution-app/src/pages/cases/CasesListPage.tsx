import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { RefreshCw, Search, TriangleAlert } from "lucide-react";
import { AiMark } from "@/components/ui/ai-mark";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@/components/PageContainer";
import { MetricTile } from "@/components/dashboard/MetricTile";
import { HomepageSplash } from "@/components/warranty/HomepageSplash";
import {
  CaseStatusBadge,
  IllustrativeTag,
  PriorityBadge,
  QueueReasonPill,
  SlaBadge,
} from "@/components/warranty/badges";
import { useFlags } from "@/lib/flags";
import { cn } from "@/lib/utils";
import { relativeTime } from "@/lib/warranty/format";
import { useAgentSummary, useCases, useInsights } from "@/lib/warranty/useCases";
import { useRole } from "@/lib/role/useRole";
import { isCaseConfigured, isUiPathConfigured } from "@/services/uipath/config";
import { useUiPath } from "@/services/uipath/UiPathProvider";
import type { WarrantyCase } from "@/lib/warranty/types";

// The work queue.
//
// The queue holds only the cases where a person can change the outcome, and each
// one says why it is there — that "why it's here" column is the whole point of
// the screen, so it is never truncated away on narrower viewports.

type QueueTab = "action" | "waiting" | "all";

function tabOf(warrantyCase: WarrantyCase): QueueTab {
  if (warrantyCase.status === "Action required") return "action";
  if (warrantyCase.status === "Waiting on others") return "waiting";
  return "all";
}

function CaseRow({ warrantyCase }: { warrantyCase: WarrantyCase }) {
  return (
    <tr className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/40">
      <td className="py-3 pl-4 pr-3 align-top">
        <Link
          to="/cases/$caseId"
          params={{ caseId: warrantyCase.id }}
          className="block min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <span className="block font-medium text-primary hover:underline">{warrantyCase.id}</span>
          <span className="block truncate text-xs text-muted-foreground">
            {warrantyCase.customer}
          </span>
        </Link>
      </td>
      <td className="px-3 py-3 align-top">
        <span className="block text-sm">{warrantyCase.description}</span>
        <span className="block text-xs text-muted-foreground">{warrantyCase.currentStage}</span>
      </td>
      <td className="px-3 py-3 align-top">
        <span className="block text-sm">{warrantyCase.owner}</span>
        <span className="block text-xs text-muted-foreground">{warrantyCase.ownerRole}</span>
      </td>
      <td className="px-3 py-3 align-top">
        {warrantyCase.queueReason ? (
          <QueueReasonPill reason={warrantyCase.queueReason} />
        ) : (
          <span className="text-sm text-muted-foreground">
            {warrantyCase.activeLanes[0] ?? "Progressing on its own"}
          </span>
        )}
      </td>
      <td className="px-3 py-3 align-top">
        <div className="flex flex-wrap items-center gap-1.5">
          <CaseStatusBadge status={warrantyCase.status} />
          <PriorityBadge priority={warrantyCase.priority} />
        </div>
      </td>
      <td className="py-3 pl-3 pr-4 align-top text-right">
        <SlaBadge status={warrantyCase.slaStatus} />
        <span className="mt-1 block text-xs text-muted-foreground">
          {relativeTime(warrantyCase.lastUpdatedAt)}
        </span>
      </td>
    </tr>
  );
}

export function CasesListPage() {
  const { cases, isDemo, isLoading, reason, refresh } = useCases();
  const insights = useInsights();
  const summary = useAgentSummary();
  const { profile } = useRole();
  const { isAuthenticated, isLoading: authLoading, login, error: authError } = useUiPath();
  const { showHomepageSplash } = useFlags();

  const [tab, setTab] = useState<QueueTab>("action");
  const [search, setSearch] = useState("");
  const [mineOnly, setMineOnly] = useState(false);

  const counts = useMemo(
    () => ({
      action: cases.filter((c) => tabOf(c) === "action").length,
      waiting: cases.filter((c) => tabOf(c) === "waiting").length,
      all: cases.filter((c) => c.status !== "Closed").length,
    }),
    [cases],
  );

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return cases
      .filter((c) => c.status !== "Closed")
      .filter((c) => (tab === "all" ? true : tabOf(c) === tab))
      .filter((c) => (mineOnly ? c.owner === profile.name : true))
      .filter((c) =>
        query
          ? [c.id, c.customer, c.site, c.description, c.owner, c.currentStage]
              .join(" ")
              .toLowerCase()
              .includes(query)
          : true,
      );
  }, [cases, tab, search, mineOnly, profile.name]);

  const TABS: { key: QueueTab; label: string; count: number }[] = [
    { key: "action", label: "Action required", count: counts.action },
    { key: "waiting", label: "Waiting on others", count: counts.waiting },
    { key: "all", label: "All open", count: counts.all },
  ];

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Work queue</h1>
            <p className="text-sm text-muted-foreground">
              {profile.name} · {profile.title}
            </p>
          </div>
          <Button variant="outline" onClick={refresh} disabled={isLoading}>
            <RefreshCw className={cn("size-4", isLoading && "animate-spin")} />
            Refresh
          </Button>
        </div>

        {/*
          One banner covers every reason the list is not live: no tenant
          configured, no case process key, not signed in, or a failed read. It
          states which, and offers the only action that can change it.
        */}
        {isDemo && (
          <Card className="flex-row flex-wrap items-start gap-3 border-dashed p-4">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning" />
            <div className="min-w-0 flex-1 text-sm">
              <span className="font-medium">Demo data.</span>{" "}
              <span className="text-muted-foreground">
                {!isUiPathConfigured()
                  ? "No UiPath tenant is configured — fill in the VITE_UIPATH_* block in .env."
                  : !isCaseConfigured()
                    ? "No case process key is configured — set VITE_CASE_PROCESS_KEY to the published Maestro case."
                    : !isAuthenticated
                      ? "Sign in to read live case instances from Maestro."
                      : (reason ?? "No live Maestro case instances were read.")}
              </span>
              {authError && <span className="block text-destructive">{authError}</span>}
            </div>
            {isUiPathConfigured() && !isAuthenticated && (
              <Button size="sm" onClick={() => void login()} disabled={authLoading}>
                {authLoading ? "Signing in…" : "Sign in to UiPath"}
              </Button>
            )}
          </Card>
        )}

        {showHomepageSplash && <HomepageSplash />}

        {/* The case agent's account of the queue before anyone opens it. Hidden
            when the brief is on, because the brief opens with the same line. */}
        {!showHomepageSplash && (
          <Card className="gap-2 border-transparent p-5 ring-1 ring-inset ring-insight-400/40">
            <div className="flex items-center gap-2">
              <span className="grid size-5 place-items-center rounded-full text-white [background-image:var(--ai-gradient)]">
                <AiMark className="size-3" />
              </span>
              <span className="text-sm font-semibold">Agent summary</span>
            </div>
            <p className="text-base font-medium">{summary.headline}</p>
            <p className="text-sm text-muted-foreground">{summary.detail}</p>
          </Card>
        )}

        {/* The personal KPI row. Hidden when the brief is on: its trend tiles and
            pulse cards already answer "how are we doing", and two rows of
            headline numbers stacked on one screen is one row too many. */}
        {!showHomepageSplash && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricTile
              label="Avg. coverage decision time"
              value={`${insights.avgCoverageDecisionDays} days`}
            />
            <MetricTile
              label="Restoration commitment adherence"
              value={`${insights.restorationAdherence}%`}
              tone={insights.restorationAdherence < 80 ? "warning" : "success"}
            />
            <MetricTile
              label="Critical cases at SLA risk"
              value={insights.criticalAtRisk}
              sub={`▲ ${insights.criticalAtRiskDelta} since last week`}
              tone="destructive"
            />
            <MetricTile
              label="Repeat-failure candidates"
              value={insights.repeatFailureCandidates}
              sub={insights.repeatFailureNote}
              tone="warning"
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <ButtonGroup>
              {TABS.map((t) => (
                <Button
                  key={t.key}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "font-normal text-muted-foreground",
                    tab === t.key &&
                      "bg-primary/10 font-medium text-primary hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  {t.label} · {t.count}
                </Button>
              ))}
            </ButtonGroup>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMineOnly((v) => !v)}
                className={cn(
                  "font-normal text-muted-foreground",
                  mineOnly &&
                    "bg-primary/10 font-medium text-primary hover:bg-primary/10 hover:text-primary",
                )}
              >
                Assigned to me
              </Button>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search cases, names, stages…"
                  className="h-8 w-64 pl-9 text-sm"
                />
              </div>
            </div>
          </div>

          <Card className="gap-0 overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[62rem] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="w-56 py-2.5 pl-4 pr-3 font-medium">Case</th>
                    <th className="px-3 py-2.5 font-medium">Description</th>
                    <th className="w-48 px-3 py-2.5 font-medium">Owner</th>
                    <th className="w-64 px-3 py-2.5 font-medium">Why it&rsquo;s here</th>
                    <th className="w-44 px-3 py-2.5 font-medium">Status</th>
                    <th className="w-32 py-2.5 pl-3 pr-4 text-right font-medium">SLA</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((c) => (
                    <CaseRow key={c.id} warrantyCase={c} />
                  ))}
                  {visible.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No cases match this view.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            <span>
              {counts.all - counts.action} of {counts.all} open cases are progressing without a person
            </span>
            <IllustrativeTag />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
