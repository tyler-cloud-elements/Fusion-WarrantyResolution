import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, ExternalLink, Inbox, Upload } from "lucide-react";
import { AiMark } from "@/components/ui/ai-mark";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/PageContainer";
import { AskAiPanel } from "@/components/warranty/AskAiPanel";
import { CaseTabs } from "@/components/warranty/CaseTabs";
import { ReassessmentCard } from "@/components/warranty/ReassessmentCard";
import { CaseStatusBadge, PriorityBadge, SlaBadge } from "@/components/warranty/badges";
import { money } from "@/lib/warranty/format";
import { formatRemaining, formatSlaBudget } from "@/lib/warranty/sla";
import {
  acceptReassessment,
  fireEvidenceUploadEvent,
  patchCase,
  useActionsForCase,
  useCase,
} from "@/lib/warranty/useCases";
import { useRole } from "@/lib/role/useRole";
import { maestroInstanceUrl } from "@/services/uipath/config";

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
  const warrantyCase = useCase(caseId);
  const actions = useActionsForCase(caseId ?? "");
  const { profile } = useRole();

  const [tab, setTab] = useState("overview");
  // Open the panel automatically only where there is room alongside the case
  // content; on narrower screens it stays closed until invoked.
  const [chatOpen, setChatOpen] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1620,
  );

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
  const instanceUrl = maestroInstanceUrl(warrantyCase.instanceId, warrantyCase.folderKey);
  // Inline editing on the Details tab belongs to whoever owns the case.
  const editable = profile.name === warrantyCase.owner;

  return (
    <div className="flex h-full min-h-0">
      <div className="min-w-0 flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/cases"
              className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="size-4" /> Work queue
            </Link>
            <div className="flex items-center gap-2">
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
                {primaryAction && (
                  <Button asChild>
                    <Link
                      to="/cases/$caseId/tasks/$taskId"
                      params={{ caseId: warrantyCase.id, taskId: primaryAction.id }}
                    >
                      Decide: {primaryAction.title}
                    </Link>
                  </Button>
                )}
                {openActions.length > 0 && (
                  <Button variant="outline" asChild>
                    <Link to="/actions" search={{ case: warrantyCase.id }}>
                      <Inbox className="size-4" />
                      Open in Actions ({openActions.length})
                    </Link>
                  </Button>
                )}
                {/*
                  Scene 15's trigger. A real deployment fires the configured
                  webhook and the platform delivers the event; without one, this
                  simulates the same arrival locally so the beat still lands.
                */}
                <Button variant="outline" onClick={fireEvidenceUploadEvent}>
                  <Upload className="size-4" />
                  Simulate customer evidence upload
                </Button>
              </div>
            </div>
          </Card>

          {warrantyCase.reassessment && (
            <ReassessmentCard
              reassessment={warrantyCase.reassessment}
              acceptLabel="Route to engineering exception"
              onAccept={() => acceptReassessment(warrantyCase.id, "Engineering exception")}
              onOverride={() => acceptReassessment(warrantyCase.id, warrantyCase.currentStage)}
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
