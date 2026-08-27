import { useMemo, useState } from "react";
import { ArrowUp, PanelRightClose, PanelRightOpen, PanelRight } from "lucide-react";
import { AiMark } from "@/components/ui/ai-mark";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/warranty/CoverageConsole";
import { REASONING_OPTIONS } from "@/lib/warranty/demoData";
import { initialsOf, timeOnly } from "@/lib/warranty/format";
import { useRole } from "@/lib/role/useRole";
import { askAgent, localAnswer } from "@/services/uipath/assistantService";
import { isAssistantConfigured } from "@/services/uipath/config";
import { useUiPath } from "@/services/uipath/UiPathProvider";
import type { CaseAction, WarrantyCase } from "@/lib/warranty/types";

// The Assessment rail.
//
// A conversation, not a widget: it opens with the agent's recommendation and the
// reasoning behind it, and the signer's verdict on that reasoning lands in the
// same thread as a reply. That is deliberate — the point of the screen is that
// the reasoning is discussable, and what the person says back is the record.
//
// It never decides. Decision controls live in the decision card only.

interface Message {
  id: string;
  from: "agent" | "user";
  text: string;
  time: string;
}

/** The recommendation, with a segmented confidence meter. */
function RecommendationCard({ action }: { action: CaseAction }) {
  const pct = action.confidencePercent ?? 0;
  const filled = Math.round(pct / 10);

  return (
    <div className="mb-2 rounded-lg border border-border bg-card px-2.5 py-2">
      <Label>Recommendation</Label>
      <p className="mt-0.5 text-[13px] font-semibold leading-snug">
        {action.recommendation.headline}
      </p>

      <div className="mt-2 flex items-center gap-2.5">
        <span className="flex shrink-0 items-start gap-px leading-none">
          <span className="text-[31px] font-bold tracking-tight text-primary tabular-nums">
            {pct}
          </span>
          <span className="mt-1 text-[13px] font-bold text-primary">%</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex h-2.5 items-stretch gap-[2px]" aria-hidden>
            {Array.from({ length: 10 }, (_, i) => (
              <i
                key={i}
                className={cn("flex-1 rounded-[1.5px]", i < filled ? "bg-primary" : "bg-muted")}
              />
            ))}
          </span>
          <span className="mt-1 block text-[8.5px] font-semibold uppercase tracking-widest text-muted-foreground">
            Confidence
          </span>
        </span>
      </div>
    </div>
  );
}

function Bubble({
  message,
  children,
}: {
  message: Message;
  children?: React.ReactNode;
}) {
  const { profile } = useRole();
  const fromAgent = message.from === "agent";

  return (
    <div className={cn("flex items-start gap-1.5", fromAgent ? "flex-row" : "flex-row-reverse")}>
      <span
        className={cn(
          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[9px] font-semibold",
          fromAgent ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
        )}
      >
        {fromAgent ? <AiMark className="size-3" /> : initialsOf(profile.name)}
      </span>
      <div
        className={cn(
          "flex min-w-0 max-w-[85%] flex-col gap-0.5",
          !fromAgent && "items-end",
        )}
      >
        <div
          className={cn(
            "whitespace-pre-line rounded-xl px-2.5 py-1.5 text-[12.5px] leading-relaxed",
            fromAgent
              ? "rounded-tl-sm bg-muted text-foreground"
              : "rounded-tr-sm border border-border bg-card",
          )}
        >
          {children}
          {message.text}
        </div>
        <span className="px-1 text-[10px] leading-none text-muted-foreground">{message.time}</span>
      </div>
    </div>
  );
}

export function AssessmentPanel({
  action,
  warrantyCase,
  onClose,
  onShowCase,
}: {
  action: CaseAction;
  warrantyCase: WarrantyCase;
  /** When set, the host owns open/closed and the panel's own strip is dropped. */
  onClose?: () => void;
  /** Swap this panel for the case details — they share one column. */
  onShowCase?: () => void;
}) {
  const { sdk, isAuthenticated } = useUiPath();
  const canUseAgent = isAssistantConfigured() && isAuthenticated && Boolean(sdk);

  const hostControlled = Boolean(onClose);
  const [open, setOpen] = useState(true);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [replies, setReplies] = useState<Message[]>([]);

  // The opening turn is the assessment itself, so the rail reads as the agent
  // having already said its piece before the person arrived.
  const opening = useMemo<Message>(
    () => ({
      id: "assessment",
      from: "agent",
      text: action.recommendation.detail,
      time: timeOnly(new Date(Date.now() - 40 * 60_000).toISOString()),
    }),
    [action.recommendation.detail],
  );

  // A recorded reasoning verdict joins the thread as the person's own reply,
  // followed by what recording it actually did.
  const verdictMessages = useMemo<Message[]>(() => {
    if (!action.completedReasoning) return [];
    const option = REASONING_OPTIONS.find((o) => o.value === action.completedReasoning);
    if (!option) return [];
    return [
      { id: "verdict", from: "user", text: option.label, time: "Just now" },
      { id: "verdict-effect", from: "agent", text: option.effect, time: "Now" },
    ];
  }, [action.completedReasoning]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;

    const asked: Message = {
      id: `q-${Date.now()}`,
      from: "user",
      text: question,
      time: "Just now",
    };
    setReplies((r) => [...r, asked]);
    setDraft("");
    setPending(true);

    const answer = canUseAgent
      ? await askAgent(sdk!, question, {
          caseId: warrantyCase.id,
          actionType: action.actionType,
          recommendation: action.recommendation.recommendedOutcome,
        }).catch(() => localAnswer(question, warrantyCase))
      : localAnswer(question, warrantyCase);

    setReplies((r) => [
      ...r,
      { id: `a-${Date.now()}`, from: "agent", text: answer, time: "Now" },
    ]);
    setPending(false);
  }

  if (!hostControlled && !open) {
    return (
      <div className="shrink-0 border-l border-border">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Show assessment"
          title="Show assessment"
          className="flex h-full w-11 flex-col items-center py-4 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <PanelRightOpen className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <aside className="flex min-h-0 w-full shrink-0 flex-col overflow-hidden border-l border-border bg-background sm:w-[330px]">
      <div className="flex h-10 shrink-0 items-center gap-1 border-b border-border px-3">
        <span className="min-w-0 flex-1 truncate text-sm font-medium">Assessment</span>
        {/* The two panels share this column, so switching between them is one
            click rather than close-then-open. */}
        {onShowCase && (
          <button
            type="button"
            onClick={onShowCase}
            aria-label="Show case details"
            title="Show case details"
            className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <PanelRight className="size-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => (onClose ? onClose() : setOpen(false))}
          aria-label="Hide assessment"
          className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <PanelRightClose className="size-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2.5">
        <div className="flex flex-col gap-2">
          <Bubble message={opening}>
            <RecommendationCard action={action} />
          </Bubble>

          {/* Two rollups the agent leans on, stated rather than buried. */}
          <div className="ml-6 flex flex-col text-[11.5px]">
            <div className="flex items-center gap-1.5 py-1">
              <span className="font-semibold text-foreground">Evidence</span>
              <span className="ml-auto shrink-0 text-[10.5px] text-muted-foreground tabular-nums">
                {warrantyCase.evidence.length} signals ·{" "}
                {warrantyCase.evidence.filter((e) => e.helpful).length} marked useful
              </span>
            </div>
            {action.precedent && (
              <div className="flex items-center gap-1.5 py-1">
                <span className="font-semibold text-foreground">Precedent</span>
                <span className="ml-auto shrink-0 text-[10.5px] text-muted-foreground tabular-nums">
                  {action.precedent}
                </span>
              </div>
            )}
          </div>

          {verdictMessages.map((message) => (
            <Bubble key={message.id} message={message} />
          ))}
          {replies.map((message) => (
            <Bubble key={message.id} message={message} />
          ))}
          {pending && (
            <div className="ml-6 text-[12.5px] text-muted-foreground">Thinking…</div>
          )}
        </div>
      </div>

      <div className="shrink-0 border-t border-border p-2.5">
        {!canUseAgent && (
          <p className="mb-2 text-[10px] leading-snug text-muted-foreground">
            Answering from case context. Set VITE_ASSISTANT_AGENT_ID and
            VITE_ASSISTANT_FOLDER_ID to route these to a Conversational Agent.
          </p>
        )}
        <div className="relative">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && void send(draft)}
            placeholder="Ask about this assessment…"
            className="h-10 rounded-lg pr-11 text-sm"
          />
          <button
            type="button"
            aria-label="Send"
            onClick={() => void send(draft)}
            className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-white transition-opacity hover:opacity-90 [background-image:var(--ai-gradient)]"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
