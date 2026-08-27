// The "Ask AI" panel's backend.
//
// When a Conversational Agent is configured (VITE_ASSISTANT_AGENT_ID +
// VITE_ASSISTANT_FOLDER_ID), questions stream from it. When it is not — which is
// the default — `localAnswer` answers from the case in front of the user. That
// fallback is deliberate: a demo should never show a dead panel, and the local
// answers are honest about being local.

import type { UiPath } from "@uipath/uipath-typescript/core";
import { money } from "@/lib/warranty/format";
import { formatRemaining } from "@/lib/warranty/sla";
import type { WarrantyCase } from "@/lib/warranty/types";
import { integrationConfig, isAssistantConfigured } from "./config";

export interface AssistantMessage {
  role: "assistant" | "user";
  text: string;
  /** True when the answer came from local case context rather than the agent. */
  local?: boolean;
}

export const SUGGESTED_QUESTIONS = [
  "Why did this case reach a person?",
  "What is the evidence position?",
  "What is blocking closure?",
  "How long is left on the clock?",
];

/**
 * Streams an answer from the configured Conversational Agent.
 *
 * The SDK's conversational surface has moved between minor versions, so this
 * resolves the entry point at run time and reports a clear error instead of
 * failing to compile against whichever shape is installed.
 */
export async function askAgent(
  sdk: UiPath,
  question: string,
  context: Record<string, unknown>,
): Promise<string> {
  if (!isAssistantConfigured()) {
    throw new Error("No conversational agent configured");
  }

  const conversations = (sdk as unknown as Record<string, unknown>).conversations;
  if (!conversations || typeof conversations !== "object") {
    throw new Error("This SDK build exposes no conversational agent client");
  }

  const client = conversations as {
    create?: (input: unknown) => Promise<unknown>;
    sendMessage?: (input: unknown) => Promise<unknown>;
  };

  if (typeof client.create !== "function" || typeof client.sendMessage !== "function") {
    throw new Error("Conversational agent client is missing create/sendMessage");
  }

  const session = (await client.create({
    agentId: Number(integrationConfig.assistantAgentId),
    folderId: Number(integrationConfig.assistantFolderId),
  })) as { id?: string; conversationId?: string };

  const response = (await client.sendMessage({
    conversationId: session.conversationId ?? session.id,
    agentId: Number(integrationConfig.assistantAgentId),
    folderId: Number(integrationConfig.assistantFolderId),
    message: question,
    context,
  })) as { content?: string; message?: string; text?: string };

  const answer = response.content ?? response.message ?? response.text;
  if (!answer) throw new Error("Agent returned an empty response");
  return answer;
}

/**
 * Answers from the case in hand. Keyword-matched on purpose: it is a fallback,
 * not a model, and pretending otherwise in a demo would be worse than useless.
 */
export function localAnswer(question: string, warrantyCase: WarrantyCase): string {
  const q = question.toLowerCase();

  if (q.includes("why") && (q.includes("person") || q.includes("here") || q.includes("reach"))) {
    return warrantyCase.queueReason
      ? `${warrantyCase.queueReason}. The case is in ${warrantyCase.currentStage}, owned by ${warrantyCase.owner} (${warrantyCase.ownerRole}).`
      : `Nothing is waiting on a person. ${warrantyCase.id} is in ${warrantyCase.currentStage} and progressing on its own.`;
  }

  if (q.includes("evidence")) {
    if (warrantyCase.evidence.length === 0) {
      return "No evidence documents are attached to this case yet.";
    }
    const lines = warrantyCase.evidence.map(
      (e) => `• ${e.title}${e.verdict ? ` — ${e.verdict}` : ""}`,
    );
    return `${warrantyCase.evidence.length} evidence items are attached:\n${lines.join("\n")}`;
  }

  if (q.includes("block") || q.includes("clos")) {
    if (warrantyCase.activeLanes.length > 0) {
      return `Closure is gated by ${warrantyCase.activeLanes.join(" and ")}. Until that lane completes, ${warrantyCase.currentStage} cannot complete.`;
    }
    return `Nothing is gating closure beyond the normal path. The case is in ${warrantyCase.currentStage}.`;
  }

  if (q.includes("clock") || q.includes("sla") || q.includes("long") || q.includes("due")) {
    return `${warrantyCase.currentStage} carries a ${Math.round(warrantyCase.slaMinutes / 60)}-hour clock. ${formatRemaining(warrantyCase.elapsedMinutes, warrantyCase.slaMinutes)} — currently ${warrantyCase.slaStatus.toLowerCase()}.`;
  }

  if (q.includes("cost") || q.includes("value") || q.includes("claim")) {
    return `The claim value on ${warrantyCase.id} is ${money(warrantyCase.claimValue)}.`;
  }

  if (q.includes("who") || q.includes("owner") || q.includes("assign")) {
    return `${warrantyCase.owner} — ${warrantyCase.ownerRole} — owns ${warrantyCase.id} in ${warrantyCase.currentStage}.`;
  }

  return `${warrantyCase.id} · ${warrantyCase.customer} · ${warrantyCase.site}. Currently in ${warrantyCase.currentStage}, ${warrantyCase.slaStatus.toLowerCase()} against its clock, owned by ${warrantyCase.owner}. Ask about the evidence, what is blocking closure, or the clock.`;
}
