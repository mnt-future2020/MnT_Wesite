import { useSyncExternalStore } from "react";
import { askMntText, demoAnswers, type AnswerSource } from "./config";

/*
 * Two small shared stores, so the header button, the nudges and the
 * panel can all reach them without wrapping the site in a provider:
 *   1. the panel: open or closed, and what opened it
 *   2. the demo conversation: kept while the panel is closed and across pages
 */

type Listener = () => void;

function createStore<T>(initial: T) {
  let state = initial;
  const listeners = new Set<Listener>();
  return {
    get: () => state,
    set(patch: Partial<T>) {
      state = { ...state, ...patch };
      listeners.forEach((listener) => listener());
    },
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    initial,
  };
}

/* ---------------------------------------------------------------- the panel */

/** Where the visitor opened it from (kept for later: which way in visitors use most). */
export type OpenedFrom = "button" | "nudge";

const panel = createStore<{ open: boolean; from: OpenedFrom }>({ open: false, from: "button" });

export function useAskMntPanel() {
  return useSyncExternalStore(panel.subscribe, panel.get, () => panel.initial);
}

export const getAskMntPanel = panel.get;

/** Opens the panel. With a question, the question is asked straight away. */
export function openAskMnt(from: OpenedFrom, question?: string, instant = false) {
  panel.set({ open: true, from });
  if (question) sendMessage(question, instant);
}

export function closeAskMnt() {
  panel.set({ open: false });
}

/* --------------------------------------------------------- the conversation */

/** How fast a reply "types" itself, one word at a time. */
export const WORD_MS = 38;

export type CardDetails = { need: string; name: string; contact: string };

export type ChatMessage =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; text: string; source?: AnswerSource; note?: string; typing: boolean }
  | { id: number; role: "card"; need: string; sent?: CardDetails };

/** start → (answer) → askedNeed → (visitor says what they need) → card → sent */
type Stage = "start" | "askedNeed" | "card" | "sent";

const chat = createStore<{ messages: ChatMessage[]; thinking: boolean; busy: boolean; stage: Stage }>({
  messages: [],
  thinking: false,
  busy: false,
  stage: "start",
});

export function useAskMntChat() {
  return useSyncExternalStore(chat.subscribe, chat.get, () => chat.initial);
}

type Reply =
  | { kind: "text"; text: string; source?: AnswerSource; note?: string; stage?: Stage }
  | { kind: "card"; need: string };

let nextId = 1;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const typingTime = (text: string) => text.split(" ").length * WORD_MS + 120;

/** Decides the demo's reply. The real version will ask the AI instead. */
function planReplies(text: string): Reply[] {
  const { stage } = chat.get();
  const lower = text.toLowerCase();
  const exact = demoAnswers.find((item) => item.question.toLowerCase() === lower);
  const byKeyword = demoAnswers.find((item) => item.keywords.some((word) => lower.includes(word)));
  // After "What are you planning to build?", a plain sentence is the visitor's need,
  // even if it mentions WhatsApp; only a question gets a ready-made answer.
  const match = exact ?? (stage !== "askedNeed" || lower.endsWith("?") ? byKeyword : undefined);

  if (match) {
    const replies: Reply[] = [{ kind: "text", text: match.answer, source: match.source }];
    if (stage === "start") replies.push({ kind: "text", text: askMntText.followUp, stage: "askedNeed" });
    return replies;
  }
  if (stage === "askedNeed") {
    return [
      { kind: "text", text: askMntText.understoodIntro },
      { kind: "card", need: text },
    ];
  }
  if (stage === "start") {
    return [
      { kind: "text", text: askMntText.demoFallback },
      { kind: "text", text: askMntText.followUp, stage: "askedNeed" },
    ];
  }
  return [{ kind: "text", text: askMntText.demoFallback }];
}

/** Shows the logo dots, then each reply typing itself out. */
async function play(replies: Reply[], instant: boolean) {
  chat.set({ busy: true });
  for (const reply of replies) {
    chat.set({ thinking: true });
    await wait(instant ? 150 : 850);

    if (reply.kind === "card") {
      chat.set({
        thinking: false,
        stage: "card",
        messages: [...chat.get().messages, { id: nextId++, role: "card", need: reply.need }],
      });
      continue;
    }

    const id = nextId++;
    chat.set({
      thinking: false,
      ...(reply.stage ? { stage: reply.stage } : {}),
      messages: [
        ...chat.get().messages,
        { id, role: "assistant", text: reply.text, source: reply.source, note: reply.note, typing: !instant },
      ],
    });
    if (!instant) {
      await wait(typingTime(reply.text));
      chat.set({
        messages: chat
          .get()
          .messages.map((message) =>
            message.id === id && message.role === "assistant" ? { ...message, typing: false } : message
          ),
      });
    }
  }
  chat.set({ busy: false });
}

/** The visitor sends a message (typed, a suggested question, or from a nudge). */
export function sendMessage(text: string, instant = false) {
  const clean = text.trim();
  if (!clean || chat.get().busy) return;
  const replies = planReplies(clean);
  chat.set({ messages: [...chat.get().messages, { id: nextId++, role: "user", text: clean }] });
  void play(replies, instant);
}

/** The visitor sends the "What we understood" card. */
export function submitCard(id: number, details: CardDetails, instant = false) {
  if (chat.get().busy) return;
  chat.set({
    stage: "sent",
    messages: chat
      .get()
      .messages.map((message) => (message.id === id && message.role === "card" ? { ...message, sent: details } : message)),
  });
  void play([{ kind: "text", text: askMntText.sentReply, note: askMntText.demoSentNote }], instant);
}
