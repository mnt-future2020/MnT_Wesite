"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRightIcon, ArrowUpIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { askMntSwitches, askMntText, suggestedQuestions } from "./config";
import { EASE } from "./hooks";
import { closeAskMnt, sendMessage, submitCard, useAskMntChat, WORD_MS, type ChatMessage } from "./store";

/*
 * The conversation: title bar, messages, and the typing box. The same chat is used
 * in the desktop side panel and in the phone sheet ("variant").
 */
export function AskMntChat({ variant }: { variant: "panel" | "sheet" }) {
  const { messages, thinking, busy } = useAskMntChat();
  const instant = useReducedMotion() ?? false;
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view, also while a reply is typing itself out.
  useEffect(() => {
    const scroller = scrollRef.current;
    const list = listRef.current;
    if (!scroller || !list) return;
    const toBottom = () => scroller.scrollTo({ top: scroller.scrollHeight });
    toBottom();
    const observer = new ResizeObserver(toBottom);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !draft.trim()) return;
    sendMessage(draft, instant);
    setDraft("");
  }

  // On phones the sheet covers the page, so following a "From:" link closes it.
  const onLink = variant === "sheet" ? closeAskMnt : undefined;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Title bar */}
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-5 pt-4 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <h2 id="ask-mnt-title" className="font-heading text-lg leading-tight font-medium">
              {askMntText.name}
            </h2>
            {askMntSwitches.demo ? (
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {askMntText.demoBadge}
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{askMntText.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={closeAskMnt}
          aria-label={`Close ${askMntText.name}`}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-foreground transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <XIcon className="size-4" aria-hidden="true" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
        <div ref={listRef} className="flex flex-col gap-4">
          <p className="text-[0.95rem] leading-normal text-foreground">{askMntText.greeting}</p>

          {/* Suggested questions, until the visitor asks something. */}
          {messages.length === 0 ? (
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question, instant)}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {question}
                </button>
              ))}
            </div>
          ) : null}

          {messages.map((message) => (
            <Message key={message.id} message={message} onLink={onLink} />
          ))}

          {thinking ? <Thinking /> : null}
        </div>
      </div>

      {/* Typing box */}
      <form
        onSubmit={onSubmit}
        className="shrink-0 border-t border-border px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <div className="relative">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            // Desktop: ready to type as soon as the panel opens. Phones: no keyboard until they tap.
            autoFocus={variant === "panel"}
            maxLength={500}
            aria-label="Your question"
            placeholder={askMntText.placeholder}
            className="h-12 w-full rounded-full border border-border bg-background pr-14 pl-5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/25 lg:text-[0.95rem]"
          />
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            aria-label="Send"
            className="absolute top-1/2 right-1.5 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ArrowUpIcon className="size-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">{askMntText.footnote}</p>
      </form>
    </div>
  );
}

function Message({ message, onLink }: { message: ChatMessage; onLink?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={cn("flex flex-col", message.role === "user" ? "items-end" : "items-start")}
    >
      {message.role === "user" ? (
        <p className="max-w-[85%] rounded-[1.25rem] rounded-br-md bg-primary px-4 py-2.5 text-[0.95rem] leading-snug text-primary-foreground">
          {message.text}
        </p>
      ) : null}

      {message.role === "assistant" ? (
        <>
          <p className="max-w-[94%] text-[0.95rem] leading-normal text-foreground">
            <TypedText text={message.text} typing={message.typing} />
          </p>
          {/* Where the answer came from, once it has finished typing. */}
          {message.source && !message.typing ? (
            <Link
              href={message.source.href}
              onClick={onLink}
              className="mt-2 inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-brand transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              From: {message.source.label}
              <ArrowRightIcon className="size-3" aria-hidden="true" />
            </Link>
          ) : null}
          {message.note && !message.typing ? (
            <p className="mt-1.5 text-xs text-muted-foreground">{message.note}</p>
          ) : null}
        </>
      ) : null}

      {message.role === "card" ? <UnderstoodCard message={message} /> : null}
    </motion.div>
  );
}

/** Shows a reply one word at a time, like a real AI writing it. */
function TypedText({ text, typing }: { text: string; typing: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!typing) return;
    const timer = setInterval(() => setCount((value) => value + 1), WORD_MS);
    return () => clearInterval(timer);
  }, [typing]);

  return <>{typing ? text.split(" ").slice(0, count).join(" ") : text}</>;
}

/** "Thinking": the round blue dots from the logo (inside the u's of "Future"), pulsing in turn. */
function Thinking() {
  const still = useReducedMotion();

  if (!askMntSwitches.logoDots) {
    return <p className="text-sm text-muted-foreground">Thinking…</p>;
  }
  return (
    <div role="status" aria-label="Thinking" className="flex h-6 items-center gap-1.5">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="size-2 rounded-full bg-p1"
          animate={still ? { opacity: 0.7 } : { scale: [1, 1.4, 1], opacity: [0.35, 1, 0.35] }}
          transition={
            still ? undefined : { duration: 0.9, repeat: Infinity, delay: index * 0.15, ease: "easeInOut" }
          }
        />
      ))}
    </div>
  );
}

const field =
  "mt-1 block w-full rounded-xl border border-border bg-card px-3 text-base text-foreground outline-none transition-colors focus:border-foreground/25 lg:text-sm";

/**
 * "What we understood": the visitor's need in their own words (they can correct it),
 * plus their name and how to reach them. Once sent, it shows what was sent.
 */
function UnderstoodCard({ message }: { message: Extract<ChatMessage, { role: "card" }> }) {
  const instant = useReducedMotion() ?? false;
  const [need, setNeed] = useState(message.need);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [missing, setMissing] = useState(false);

  if (message.sent) {
    return (
      <div className="w-full rounded-2xl border border-border bg-background p-4">
        <p className="text-sm font-medium">{askMntText.understoodTitle}</p>
        <dl className="mt-3 grid gap-2 text-sm">
          {[
            [askMntText.needLabel, message.sent.need],
            [askMntText.nameLabel, message.sent.name],
            [askMntText.contactLabel, message.sent.contact],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {askMntText.sentLabel}
        </p>
      </div>
    );
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!need.trim() || !name.trim() || !contact.trim()) {
      setMissing(true);
      return;
    }
    submitCard(message.id, { need: need.trim(), name: name.trim(), contact: contact.trim() }, instant);
  }

  return (
    <form onSubmit={onSubmit} className="w-full rounded-2xl border border-border bg-background p-4">
      <p className="text-sm font-medium">{askMntText.understoodTitle}</p>

      <label className="mt-3 block">
        <span className="text-xs text-muted-foreground">{askMntText.needLabel}</span>
        <textarea
          value={need}
          onChange={(event) => setNeed(event.target.value)}
          rows={2}
          className={cn(field, "resize-none py-2")}
        />
      </label>
      <label className="mt-2.5 block">
        <span className="text-xs text-muted-foreground">{askMntText.nameLabel}</span>
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setMissing(false);
          }}
          autoComplete="name"
          className={cn(field, "h-10")}
        />
      </label>
      <label className="mt-2.5 block">
        <span className="text-xs text-muted-foreground">{askMntText.contactLabel}</span>
        <input
          value={contact}
          onChange={(event) => {
            setContact(event.target.value);
            setMissing(false);
          }}
          autoComplete="email"
          className={cn(field, "h-10")}
        />
      </label>

      {missing ? <p className="mt-2 text-xs text-destructive">{askMntText.missingDetails}</p> : null}

      <button
        type="submit"
        className="mt-3.5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {askMntText.sendLabel}
        <ArrowRightIcon className="size-4" aria-hidden="true" />
      </button>
    </form>
  );
}
