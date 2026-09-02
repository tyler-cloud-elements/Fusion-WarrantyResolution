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
import { caseConfig, integrationConfig, isAssistantConfigured } from "./config";

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
const threads = new Map<string, Promise<Thread>>();

/** A question in flight, keyed by the exchange carrying its answer. */
interface Pending {
  text: string;
  onChunk?: (soFar: string) => void;
  settle: (err?: Error) => void;
}

interface Thread {
  conversationId: string;
  session: SessionStream;
  /** Exchange id → the question waiting on it. */
  pending: Map<string, Pending>;
  /** The case identifiers go out once, on the first turn. */
  seeded: boolean;
}

/**
 * How long to wait for the server to acknowledge a new session.
 *
 * Then proceed regardless. The acknowledgement matters — sending an exchange
 * before it lands is rejected with EXCHANGE_START_PROCESSING_FAILED — but a
 * server that never acknowledges is not a reason to refuse to try.
 */
const SESSION_ACK_MS = 4_000;

/** How long a question may go unanswered before the local answer takes over. */
const ANSWER_TIMEOUT_MS = 30_000;

async function openThread(sdk: UiPath): Promise<Thread> {
  const agentId = Number(integrationConfig.assistantAgentId);
  const folderId = Number(integrationConfig.assistantFolderId);
  const client = new ConversationalAgent(sdk);

  // Resolve the agent rather than trusting the two numbers in .env. A wrong id
  // otherwise opens a session that simply never answers, which looks like a
  // hung panel; this way it says which agents the folder actually holds.
  const inFolder = await client.getAll(folderId);
  const agent = inFolder.find((a) => a.id === agentId);
  if (!agent) {
    const seen = inFolder.map((a) => `${a.id} (${a.name})`).join(", ") || "none";
    throw new Error(`Agent ${agentId} is not in folder ${folderId}. That folder has: ${seen}.`);
  }

  // The agent-bound shorthand, so agentId and folderId cannot drift from the
  // agent just resolved.
  const conversation = await agent.conversations.create({ autogenerateLabel: true });
  const session = await conversation.startSession({ echo: true });

  await new Promise<void>((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    session.onSessionStarted(finish);
    window.setTimeout(finish, SESSION_ACK_MS);
  });

  const thread: Thread = {
    conversationId: conversation.id,
    session,
    pending: new Map(),
    seeded: false,
  };

  // Wired once per session, not once per question. The answer arrives on the
  // session's own exchange stream, so each exchange is matched back to the
  // question waiting on it by id.
  session.onExchangeStart((exchange) => {
    const waiting = thread.pending.get(exchange.exchangeId);
    if (!waiting) return;

    exchange.onMessageStart((message) => {
      // With echo on, the reader's own turn comes back here too.
      if (!message.isAssistant) return;
      message.onContentPartStart((part) => {
        part.onChunk((chunk) => {
          if (!chunk.data) return;
          waiting.text += chunk.data;
          waiting.onChunk?.(waiting.text);
        });
      });
    });

    exchange.onExchangeEnd(() => waiting.settle());
    exchange.onErrorStart((err) =>
      waiting.settle(new Error(err.message || "The conversational agent errored")),
    );
  });

  return thread;
}

function threadFor(sdk: UiPath, key: string): Promise<Thread> {
  const existing = threads.get(key);
  if (existing) return existing;
  // Cached as the promise, not the result, so two questions asked in quick
  // succession share one conversation instead of racing to open two.
  const opening = openThread(sdk).catch((err) => {
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

export interface CaseIdentifiers {
  /** The Maestro case instance GUID. */
  caseInstanceId?: string;
  /** The folder GUID the instance lives in. */
  folderKey?: string;
}

/**
 * The GUIDs off a case, for the agent's tools.
 *
 * `instanceId` is empty on a demo row, and on the overlay it is the live
 * instance the row is painted over — which is exactly the one the agent should
 * open. The folder falls back to the configured case folder, since a case read
 * from that folder lives in it whether or not the row says so.
 *
 * Empty strings are dropped rather than sent: `folderKey: ` with nothing after
 * it is worse than an absent line, because a tool will try to use it.
 */
export function caseIdentifiers(warrantyCase: {
  instanceId?: string;
  folderKey?: string;
}): CaseIdentifiers {
  return {
    caseInstanceId: warrantyCase.instanceId || undefined,
    folderKey: warrantyCase.folderKey || caseConfig.folderKey || undefined,
  };
}

export interface AskOptions {
  /** Groups questions into one conversation. Usually the case id. */
  threadKey: string;
  /**
   * The GUIDs the agent's case-lookup tools need.
   *
   * Not optional in practice: without them the agent has a question about a
   * case it cannot open, and its tools fail on the missing arguments. They go
   * out as their own labelled lines rather than inside the prose or a JSON
   * blob, so a tool can lift them without parsing English.
   */
  identifiers?: CaseIdentifiers;
  /** A short description of the case, for the agent's first turn. */
  seedContext?: string;
  /** Called with the answer so far, as it streams. */
  onChunk?: (soFar: string) => void;
}

/**
 * The first turn's preamble: identifiers first, then the summary.
 *
 * Exported because this is the contract with the agent's tools — labelled lines
 * they lift the GUIDs from — and a format that drifts silently is how the panel
 * ends up asking about a case the agent cannot open.
 */
export function seedBlock(options: AskOptions): string {
  const ids: string[] = [];
  if (options.identifiers?.caseInstanceId) {
    ids.push(`caseInstanceId: ${options.identifiers.caseInstanceId}`);
  }
  if (options.identifiers?.folderKey) {
    ids.push(`folderKey: ${options.identifiers.folderKey}`);
  }

  return [
    ids.length ? `Case identifiers (use these for tool calls):\n${ids.join("\n")}` : "",
    options.seedContext ? `Case summary: ${options.seedContext}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

/**
 * Asks the configured Conversational Agent, streaming the reply.
 *
 * The transport is a WebSocket and the shape is nested: a session carries
 * exchanges, an exchange carries messages, a message carries content parts, and
 * text arrives as chunks on those parts.
 *
 * The message is sent through the explicit lifecycle — `startMessage`,
 * `sendContentPart`, `sendMessageEnd` — rather than the one-shot
 * `sendMessageWithContentPart`, which the service accepts without ever
 * answering. The exchange id is a upper-cased UUID for the same reason: the
 * service rejects other shapes with EXCHANGE_START_PROCESSING_FAILED.
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

  const thread = await threadFor(sdk, options.threadKey);

  // Match the SDK's own id shape — it uses crypto.randomUUID().toUpperCase(),
  // and the service rejects anything else.
  const exchangeId = crypto.randomUUID().toUpperCase();

  const seed = thread.seeded ? "" : seedBlock(options);
  thread.seeded = true;
  const payload = seed ? `Context:\n${seed}\n\n${question}` : question;

  return new Promise<string>((resolve, reject) => {
    let settled = false;
    const timer = window.setTimeout(
      () => settle(new Error("The conversational agent did not answer in time")),
      ANSWER_TIMEOUT_MS,
    );

    function settle(err?: Error) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      const answer = thread.pending.get(exchangeId)?.text ?? "";
      thread.pending.delete(exchangeId);
      if (err) reject(err);
      else if (answer.trim()) resolve(answer);
      else reject(new Error("The conversational agent returned an empty answer"));
    }

    thread.pending.set(exchangeId, { text: "", onChunk: options.onChunk, settle });

    try {
      const exchange = thread.session.startExchange({ exchangeId });
      const message = exchange.startMessage({ role: MessageRole.User });
      void message
        .sendContentPart({ data: payload })
        .then(() => message.sendMessageEnd())
        .catch((err: unknown) =>
          settle(err instanceof Error ? err : new Error("Could not send the question")),
        );
    } catch (err) {
      settle(err instanceof Error ? err : new Error("Could not start the exchange"));
    }
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
