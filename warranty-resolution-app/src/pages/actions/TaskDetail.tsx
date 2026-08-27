import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleAlert,
  Clock,
  ExternalLink,
  Maximize2,
  PanelRight,
  PanelRightClose,
  PanelRightOpen,
  Sparkles,
} from "lucide-react";
import { AiMark } from "@/components/ui/ai-mark";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AskAiPanel } from "@/components/warranty/AskAiPanel";
import { AssessmentPanel } from "@/components/warranty/AssessmentPanel";
import { CaseTabs } from "@/components/warranty/CaseTabs";
import { FindingCauses } from "@/components/warranty/CoverageConsole";
import { CoverageDecisionCard } from "@/components/warranty/CoverageDecisionCard";
import { DecisionHeader } from "@/components/warranty/DecisionHeader";
import { PolicyTestCard } from "@/components/warranty/PolicyTest";
import { DecisionForm } from "@/components/warranty/DecisionForm";
import { PriorityBadge, SlaBadge } from "@/components/warranty/badges";
import { appOrigin } from "@/lib/app-base";
import { useFlags } from "@/lib/flags";
import { cn } from "@/lib/utils";
import { initialsOf, money, shortCaseId, timeOnly } from "@/lib/warranty/format";
import { formatElapsed, formatSlaBudget, slaStatusFor } from "@/lib/warranty/sla";
import { reopenDecision, useActionsForCase } from "@/lib/warranty/useCases";
import type { CaseAction, WarrantyCase } from "@/lib/warranty/types";

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{children}</span>
    </div>
  );
}

/**
 * Says where the rest went.
 *
 * The action pane deliberately carries no documents, no asset record and no
 * claim breakdown — they are in the case panel. Without a pointer that reads as
 * an omission rather than a decision, so this names what is over there and
 * opens it.
 */
function CaseContextHint({
  warrantyCase,
  railOpen,
  onOpenRail,
  onOpenDocuments,
}: {
  warrantyCase: WarrantyCase;
  railOpen: boolean;
  onOpenRail: () => void;
  onOpenDocuments: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-dashed border-border px-3 py-2.5 text-xs text-muted-foreground">
      <PanelRight className="size-3.5 shrink-0" />
      <span>
        Documents, the asset record, the claim breakdown and the case history are in the case
        panel.
      </span>
      <button
        type="button"
        onClick={onOpenDocuments}
        className="font-medium text-primary hover:underline"
      >
        {warrantyCase.evidence.length} documents
      </button>
      {!railOpen && (
        <>
          <span aria-hidden>·</span>
          <button type="button" onClick={onOpenRail} className="font-medium text-primary hover:underline">
            Show the case panel
          </button>
        </>
      )}
    </div>
  );
}

/**
 * One action, with the case beside it.
 *
 * The action work is the left column; the right rail is the same case tab set
 * the detail page uses, in its compact variant. Both sit under one header, so
 * the action's identity stays put while the rail is browsed.
 */
export function TaskDetail({
  action,
  warrantyCase,
  onCompleted,
}: {
  action: CaseAction;
  warrantyCase: WarrantyCase | undefined;
  onCompleted?: () => void;
}) {
  const [railTab, setRailTab] = useState("overview");
  const caseActions = useActionsForCase(action.caseId);

  const { actionSideBySide } = useFlags();

  /**
   * Which panel occupies the right column — one piece of state, not two
   * booleans, because the two panels share the space and can never both be
   * open. Two booleans would let an impossible state be represented.
   *
   * A remembered choice always wins. Without one, the side-by-side flag decides:
   * the right column and the second column are the same width, so defaulting the
   * case panel open with that flag on would mean the layout it asks for is never
   * the one you see. Opening the panel from here still stacks the pane, which is
   * the fallback the flag's hint promises.
   */
  const [rightPanel, setRightPanel] = useState<"case" | "assessment" | null>(() => {
    const stored = localStorage.getItem("actions.rightPanel");
    if (stored === "none") return null;
    if (stored === "case" || stored === "assessment") return stored;
    return actionSideBySide ? null : "case";
  });
  useEffect(() => {
    localStorage.setItem("actions.rightPanel", rightPanel ?? "none");
  }, [rightPanel]);

  const railOpen = rightPanel === "case";
  const chatOpen = rightPanel === "assessment";

  const slaStatus = slaStatusFor(action.elapsedMinutes, action.slaMinutes);
  // Same switch the full-screen console uses: an action carrying established
  // causes gets the combined-cause treatment, everything else the plain form.
  const rich = Boolean(action.causes?.length);
  // Two columns only when the flag asks for it AND nothing else is competing for
  // the width. The case panel and the assessment rail both take the same space,
  // so with either open the pane stacks — which is what the flag's hint promises.
  const sideBySide = actionSideBySide && rich && rightPanel === null;

  // The policy test travels as a fold on the action; the Actions pane has no
  // fold stack, so it is pulled out and shown as its own card.
  // Only the departure is state; the recommendation is the resting value. Held
  // here rather than in the decision card because the assessment rail answers
  // the position too — see CoverageDecisionCard's `position` prop.
  const [chosen, setChosen] = useState<string | null>(null);
  useEffect(() => setChosen(null), [action.id]);
  const position = chosen ?? action.recommendation.recommendedOutcome;
  const setPosition = setChosen;

  const policyTest = action.folds?.find((f) => f.id === "policy-test");
  const agreementName = policyTest?.label.replace(/^Policy test\s*—\s*/, "") ?? "";

  return (
    <div className="flex h-full flex-1 overflow-x-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={action.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cnFlex(rightPanel !== null)}
        >
          {/* Header — spans the action work and the case rail beneath it. */}
          <header className="flex flex-wrap items-start gap-x-10 gap-y-4 border-b border-border px-6 py-4">
            <div className="mr-auto flex min-w-0 flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{action.title}</h1>
                {action.blocking && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                    <CircleAlert className="size-3" />
                    Blocking
                  </span>
                )}
                <PriorityBadge priority={action.priority} />
              </div>
              <span className="text-sm text-muted-foreground">{action.stage}</span>
            </div>

            <MetaItem label="Case ID">
              <Link
                to="/cases/$caseId"
                params={{ caseId: action.caseId }}
                className="tabular-nums text-primary transition-colors hover:underline"
                title={action.caseId}
              >
                {shortCaseId(action.caseId)}
              </Link>
            </MetaItem>
            <MetaItem label="Due">{timeOnly(action.dueAt)}</MetaItem>
            <MetaItem label="Assignee">
              <span className="flex items-center gap-2">
                <Avatar className="size-5">
                  <AvatarFallback className="text-xs">
                    {initialsOf(action.assignee)}
                  </AvatarFallback>
                </Avatar>
                {action.assignee}
              </span>
            </MetaItem>
            <MetaItem label="SLA">
              <span className="flex items-center gap-2">
                <SlaBadge status={slaStatus} />
                <span className="flex items-center gap-1 text-xs font-normal text-muted-foreground tabular-nums">
                  <Clock className="size-3" />
                  {formatSlaBudget(action.slaMinutes)} · {formatElapsed(action.elapsedMinutes)}
                </span>
              </span>
            </MetaItem>

            <div className="flex items-center gap-2">
              {/* The console is the same decision, full-screen, with the
                  signal-capture rail — the storyboard's scene-14 surface. */}
              <Button variant="outline" size="sm" asChild>
                <Link
                  to="/cases/$caseId/tasks/$taskId"
                  params={{ caseId: action.caseId, taskId: action.id }}
                >
                  <Maximize2 className="size-4" />
                  Open console
                </Link>
              </Button>
              {!chatOpen && (
                <Button variant="ai" onClick={() => setRightPanel("assessment")}>
                  <AiMark className="size-4" />
                  {rich ? "Assessment" : "Ask AI"}
                </Button>
              )}
            </div>
          </header>

          <div className="flex min-h-0 flex-1 overflow-hidden">
            {/*
              Action work — the decision, and only the decision.
              Everything that supports it (the documents, the asset record, the
              claim breakdown, the history) is one panel to the right, so this
              column does not carry a second copy of it. The finding stays,
              because it is not context: it is the judgement being made.
            */}
            <div
              className={cn(
                "min-w-[340px] flex-1 overflow-y-auto p-5",
                sideBySide
                  ? "grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_420px] [&>*]:min-w-0"
                  : "flex flex-col gap-4 [&>*]:shrink-0",
              )}
            >
              {warrantyCase && rich ? (
                <>
                  {/* Reading column: what is being decided, then the finding. */}
                  <div className="flex min-w-0 flex-col gap-4">
                    <DecisionHeader action={action} warrantyCase={warrantyCase} />

                    <FindingCauses action={action} columns={sideBySide ? 2 : 1} />

                    {/* The clauses the finding is tested against. It sits under
                        the causes because it is what turns two established facts
                        into a coverage position — and because the one failing
                        clause is the reason the split falls where it does. */}
                    {policyTest?.checks?.length ? (
                      <PolicyTestCard
                        checks={policyTest.checks}
                        agreement={agreementName}
                        marked={policyTest.marked}
                      />
                    ) : null}

                    {!sideBySide && (
                      <CoverageDecisionCard
                        action={action}
                        warrantyCase={warrantyCase}
                        onCompleted={onCompleted}
                        onReopen={() => reopenDecision(action.id)}
                        position={position}
                        onPositionChange={setPosition}
                      />
                    )}

                    <CaseContextHint
                      warrantyCase={warrantyCase}
                      railOpen={railOpen}
                      onOpenRail={() => setRightPanel("case")}
                      onOpenDocuments={() => {
                        setRightPanel("case");
                        setRailTab("documents");
                      }}
                    />
                  </div>

                  {/* Deciding column — sticky, like the console's. */}
                  {sideBySide && (
                    <div className="xl:sticky xl:top-0">
                      <CoverageDecisionCard
                        action={action}
                        warrantyCase={warrantyCase}
                        onCompleted={onCompleted}
                        onReopen={() => reopenDecision(action.id)}
                        position={position}
                        onPositionChange={setPosition}
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Card className="gap-2 p-5">
                    <span className="text-base font-semibold">Why this reached you</span>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {action.whyThisReachedYou}
                    </p>
                  </Card>

                  {warrantyCase && (
                    <DecisionForm
                      action={action}
                      warrantyCase={warrantyCase}
                      onCompleted={onCompleted}
                    />
                  )}

                  {warrantyCase && (
                    <CaseContextHint
                      warrantyCase={warrantyCase}
                      railOpen={railOpen}
                      onOpenRail={() => setRightPanel("case")}
                      onOpenDocuments={() => {
                        setRightPanel("case");
                        setRailTab("documents");
                      }}
                    />
                  )}
                </>
              )}
            </div>

            {/* The right-edge controls, shown only when the case panel is shut —
                once it is open its own header carries the assessment toggle, and
                two of the same control on one edge is one too many. */}
            {warrantyCase && !railOpen && (
              <div className="flex shrink-0 flex-col items-center gap-1 border-l border-border py-4">
                <button
                  type="button"
                  onClick={() => setRightPanel("case")}
                  aria-label="Show case details"
                  title="Show case details"
                  className="grid size-11 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <PanelRightOpen className="size-4" />
                </button>
                {!chatOpen && rich && (
                  <button
                    type="button"
                    onClick={() => setRightPanel("assessment")}
                    aria-label="Show assessment"
                    title="Show assessment"
                    className="grid size-11 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  >
                    <Sparkles className="size-4" />
                  </button>
                )}
              </div>
            )}

            {/* Assessment — same column as the case rail, and replaces it. Both
                sit under the action header rather than beside it, so the
                action's identity stays put whichever panel is showing. */}
            {warrantyCase && chatOpen && !rich && (
              <AskAiPanel warrantyCase={warrantyCase} onClose={() => setRightPanel(null)} />
            )}

            {warrantyCase && chatOpen && rich && (
              <AssessmentPanel
                action={action}
                warrantyCase={warrantyCase}
                onClose={() => setRightPanel(null)}
                onShowCase={() => setRightPanel("case")}
                position={position}
              />
            )}

            {/* Case rail — the same tabs as the detail page, compact variant. */}
            {warrantyCase && railOpen && (
              <aside className="flex min-w-[300px] flex-1 flex-col overflow-hidden border-l border-border">
                <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-base font-semibold">
                        {warrantyCase.customer}
                      </span>
                      <a
                        href={`${appOrigin()}/cases/${warrantyCase.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open case in a new tab"
                        title="Open case in a new tab"
                        className="grid size-6 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    </div>
                    <div className="truncate text-xs text-muted-foreground" title={warrantyCase.id}>
                      {shortCaseId(warrantyCase.id)} · {warrantyCase.asset.model} ·{" "}
                      {money(warrantyCase.claimValue)}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    {rich && (
                      <button
                        type="button"
                        onClick={() => setRightPanel("assessment")}
                        aria-label="Show assessment"
                        title="Show assessment"
                        className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Sparkles className="size-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setRightPanel(null)}
                      aria-label="Hide case details"
                      className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <PanelRightClose className="size-4" />
                    </button>
                  </div>
                </div>
                <CaseTabs
                  warrantyCase={warrantyCase}
                  actions={caseActions}
                  tab={railTab}
                  onTabChange={setRailTab}
                  variant="rail"
                />
              </aside>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

/** The action column takes double weight while a right panel shares the row. */
function cnFlex(panelOpen: boolean): string {
  return `flex min-h-0 flex-col overflow-hidden ${panelOpen ? "flex-[2]" : "flex-1"}`;
}
