"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { company, contactPage, privacyLink } from "@/content/site";
import { cn } from "@/lib/utils";

/*
 * Contact page form, in a white card: name and company, email and phone, the
 * topics as tap-to-pick chips (one or more), the message, and Send.
 * Opened from a "Book a free strategy session" button (/contact?topic=session),
 * "Free strategy session" is already picked.
 *
 * NOT CONNECTED YET: the company has not decided where messages go. Send checks
 * the required fields, then shows a note with the email address instead.
 */

const { form } = contactPage;
const topicIds = new Set(form.topics.map((topic) => topic.id));

/** Reads ?topic= from the address. Kept apart so the page can show the form at once while this loads. */
export function ContactFormFromAddress() {
  const topic = useSearchParams().get("topic");
  return <ContactForm initialTopic={topic && topicIds.has(topic) ? topic : null} />;
}

const fieldClass =
  "mt-2 block w-full rounded-xl border border-border bg-background px-4 text-base text-foreground transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground/70 focus:border-p1 focus:ring-4 focus:ring-p1/15";

export function ContactForm({ initialTopic = null }: { initialTopic?: string | null }) {
  const [picked, setPicked] = useState<string[]>(initialTopic ? [initialTopic] : []);
  const [sent, setSent] = useState(false);
  const id = useId();

  // Opened again from a Book button while the page was kept open: tick that topic too.
  // (Adjusted during render when the topic changes, as React recommends, instead of in an effect.)
  const [lastTopic, setLastTopic] = useState(initialTopic);
  if (initialTopic !== lastTopic) {
    setLastTopic(initialTopic);
    if (initialTopic) setPicked((current) => (current.includes(initialTopic) ? current : [...current, initialTopic]));
  }

  function toggle(topic: string) {
    setPicked((current) => (current.includes(topic) ? current.filter((t) => t !== topic) : [...current, topic]));
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // The browser has already checked the required fields. Sending is not connected yet.
        setSent(true);
      }}
      className="rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_30px_70px_-40px_rgb(11_16_36/0.35)] sm:p-8"
    >
      <h2 className="font-heading text-2xl font-medium tracking-[-0.02em]">{form.title}</h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} name="name" autoComplete="name" required {...form.fields.name} />
        <Field id={`${id}-company`} name="company" autoComplete="organization" optional {...form.fields.company} />
        <Field id={`${id}-email`} name="email" type="email" autoComplete="email" required {...form.fields.email} />
        <Field id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" optional {...form.fields.phone} />
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium">{form.topicsLabel}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {form.topics.map((topic) => {
            const on = picked.includes(topic.id);
            return (
              <button
                key={topic.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(topic.id)}
                className={cn(
                  "inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  on
                    ? "border-ink bg-ink text-white"
                    : "border-border bg-background text-foreground hover:border-foreground/30"
                )}
              >
                {on ? <CheckIcon className="size-3.5" aria-hidden="true" /> : null}
                {topic.label}
              </button>
            );
          })}
        </div>
        {/* The picked topics go with the form. */}
        <input type="hidden" name="topics" value={picked.join(",")} />
      </fieldset>

      <div className="mt-6">
        <label htmlFor={`${id}-message`} className="text-sm font-medium">
          {form.fields.message.label}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={5}
          placeholder={form.fields.message.placeholder}
          className={cn(fieldClass, "resize-y py-3 leading-[1.5]")}
        />
      </div>

      <div className="mt-7">
        <button
          type="submit"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {form.submit}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
        <p className="mt-4 text-sm text-muted-foreground">
          {form.privacyNote}{" "}
          <Link href={privacyLink.href} className="underline underline-offset-4 hover:text-foreground">
            {privacyLink.label}
          </Link>
          .
        </p>
      </div>

      <p aria-live="polite" className={cn("text-sm leading-[1.5]", sent ? "mt-5 rounded-xl bg-tint-1 px-4 py-3" : "sr-only")}>
        {sent ? (
          <>
            {form.notConnected}{" "}
            <a href={`mailto:${company.email}`} className="font-medium underline underline-offset-4">
              {company.email}
            </a>
            .
          </>
        ) : null}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  placeholder,
  optional = false,
  ...input
}: {
  id: string;
  label: string;
  placeholder: string;
  optional?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-2 text-sm font-medium">
        {label}
        {optional ? <span className="text-xs font-normal text-muted-foreground">{form.optional}</span> : null}
      </label>
      <input id={id} placeholder={placeholder} className={cn(fieldClass, "h-12")} {...input} />
    </div>
  );
}
