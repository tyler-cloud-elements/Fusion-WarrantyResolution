// The backend for "Ask about this case".
//
// With a Conversational Agent configured (VITE_ASSISTANT_AGENT_ID +
// VITE_ASSISTANT_FOLDER_ID), questions stream from it over a WebSocket. Without
// one — or when it is unreachable, silent, or errors — `localAnswer` answers
// from the case in front of the reader. That fallback is deliberate: a demo
// should never show a dead panel, and the local answers say they are local.

import type { UiPath } from "@uipath/uipath-typescript/core";
import {
  ConversationalAgent,
  MessageRole,
  type SessionStream,
} from "@uipath/uipath-typescript/conversational-agent";
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
 * One live conversation per thread, so context carries between questions.
 *
 * Asking "what about the freight?" after "why is this a combined cause?" only
 * works if the agent still has the first turn — a fresh conversation per
 * question would make every follow-up a non-sequitur. Keyed by case (or case +
 * action), so two cases never share a thread.
 */
const threads = new Map<string, Promise<SessionHandle>>();

interface SessionHandle {
  conversationId: string;
  session: SessionStream;
}

/** The agent has this long to say something before the local answer takes over. */
const FIRST_TOKEN_TIMEOUT_MS = 20_000;

function agentIds() {
  return {
    agentId: Number(integrationConfig.assistantAgentId),
    folderId: Number(integrationConfig.assistantFolderId),
  };
}

async function openThread(sdk: UiPath, key: string): Promise<SessionHandle> {
  const { agentId, folderId } = agentIds();
  const client = new ConversationalAgent(sdk);
  const conversation = await client.conversations.create(agentId, folderId, {
    label: `Warranty Resolution · ${key}`,
  });

  // `echo` off: the panel already renders what the reader typed, and echoing it
  // back would show every question twice.
  const session = conversation.startSession({ echo: false });

  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("The conversational agent did not open a session")),
      FIRST_TOKEN_TIMEOUT_MS,
    );
    session.onSessionStarted(() => {
      clearTimeout(timer);
      resolve();
    });
    session.onAnyErrorStart((err) => {
      clearTimeout(timer);
      reject(new Error(err.message || "The conversational agent refused the session"));
    });
  });

  return { conversationId: conversation.id, session };
}

function threadFor(sdk: UiPath, key: string): Promise<SessionHandle> {
  const existing = threads.get(key);
  if (existing) return existing;
  // Cached as the promise, not the result, so two questions asked in quick
  // succession share one conversation instead of racing to open two.
  const opening = openThread(sdk, key).catch((err) => {
    threads.delete(key);
    throw err;
  });
  threads.set(key, opening);
  return opening;
}

/** Drops a thread, so the next question starts a new conversation. */
export function endThread(key: string): void {
  const handle = threads.get(key);
  threads.delete(key);
  void handle?.then(({ session }) => session.sendSessionEnd()).catch(() => {});
}

export interface AskOptions {
  /** Groups questions into one conversation. Usually the case id. */
  threadKey: string;
  /** Case facts sent with the question, so the agent is not guessing. */
  context?: Record<string, unknown>;
  /** Called with the answer so far, as it streams. */
  onChunk?: (soFar: string) => void;
}

/**
 * Asks the configured Conversational Agent, streaming the reply.
 *
 * The transport is a WebSocket, and the shape is nested: a session carries
 * exchanges, an exchange carries messages, a message carries content parts, and
 * the text arrives as chunks on those parts. Handlers are attached to the
 * exchange this call starts rather than to the session, because an exchange is
 * one question and its answer — listening at the session level would also catch
 * turns belonging to other questions in flight.
 *
 * Rejects rather than returning something vague when the agent is unreachable,
 * silent, or errors: the caller falls back to `localAnswer`, and a demo that
 * quietly shows a worse answer as though it came from the agent is worse than
 * one that says where the answer came from.
 */
export async function askAgent(
  sdk: UiPath,
  question: string,
  options: AskOptions,
): Promise<string> {
  if (!isAssistantConfigured()) {
    throw new Error("No conversational agent configured");
  }

  const { session } = await threadFor(sdk, options.threadKey);
  const exchange = session.startExchange();

  return new Promise<string>((resolve, reject) => {
    let text = "";
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error("The conversational agent did not answer in time"));
    }, FIRST_TOKEN_TIMEOUT_MS);

    const finish = (err?: Error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (err) reject(err);
      else if (text.trim()) resolve(text);
      else reject(new Error("The conversational agent returned an empty answer"));
    };

    exchange.onMessageStart((message) => {
      // The reader's own question comes back on this exchange too when echo is
      // on elsewhere; only the assistant's turn is the answer.
      if (!message.isAssistant) return;
      message.onContentPartStart((part) => {
        part.onChunk((chunk) => {
          if (!chunk.data) return;
          text += chunk.data;
          // Every chunk buys another window — a long answer streaming steadily
          // is working, not hung.
          timer.refresh?.();
          options.onChunk?.(text);
        });
      });
    });

    exchange.onExchangeEnd(() => finish());
    exchange.onErrorStart((err) =>
      finish(new Error(err.message || "The conversational agent errored")),
    );

    void exchange
      .sendMessageWithContentPart({
        data: options.context
          ? `${question}\n\n---\nCase context:\n${JSON.stringify(options.context, null, 2)}`
          : question,
        role: MessageRole.User,
        mimeType: "text/plain",
      })
      .catch((err: unknown) =>
        finish(err instanceof Error ? err : new Error("Could not send the question")),
      );
  });
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
