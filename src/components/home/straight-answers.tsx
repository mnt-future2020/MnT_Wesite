"use client";

import { Accordion } from "@base-ui/react/accordion";
import { PlusIcon } from "lucide-react";
import { nearBlack, sectionCard } from "@/components/site/section-theme";
import { company, straightAnswers } from "@/content/site";
import { cn } from "@/lib/utils";

/*
 * DARK section (near-black). A normal FAQ: the heading across the top, the
 * questions in a full-width list below. Click a question and its answer
 * opens under it; one answer is open at a time.
 * Closed answers stay in the page (hidden until found), so search engines
 * and the browser's find (Ctrl+F) can still reach them.
 */
export function StraightAnswers() {
  return (
    <section
      id="straight-answers"
      aria-labelledby="straight-answers-title"
      data-header-theme="dark"
      style={nearBlack}
      className={cn("dark relative overflow-hidden bg-background py-20 text-foreground lg:py-28", sectionCard)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -left-40 size-160 rounded-full bg-p1/14 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading across the top; on desktop the email line sits on the right. */}
        <header className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <div>
            <p className="text-base font-medium text-brand">{straightAnswers.label}</p>
            <h2
              id="straight-answers-title"
              className="mt-3 font-heading text-[clamp(2.5rem,4.6vw,4.5rem)] leading-none font-medium tracking-[-0.04em]"
            >
              {straightAnswers.titleLines.map((line) => (
                <span key={line} className="block lg:whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p className="text-lg leading-[1.4] text-foreground lg:max-w-xs lg:pb-2 lg:text-right">
            {straightAnswers.moreLead}{" "}
            <a
              href={`mailto:${company.email}`}
              className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {company.email}
            </a>
          </p>
        </header>

        {/* The questions, full width below the heading. The first one starts open. */}
        <Accordion.Root defaultValue={[0]} className="mt-12 border-t border-border lg:mt-16">
          {straightAnswers.items.map((item, index) => (
            <Accordion.Item key={item.question} value={index} className="border-b border-border">
              <Accordion.Header>
                {/* Keyboard users see a soft rounded outline on the question they are on (not shown on mouse clicks). */}
                <Accordion.Trigger className="group/question -mx-4 flex w-[calc(100%+2rem)] items-center justify-between gap-6 rounded-xl px-4 py-6 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring/60 sm:py-7">
                  <span className="font-heading text-xl leading-snug font-medium tracking-[-0.02em] text-foreground sm:text-2xl">
                    {item.question}
                  </span>
                  {/* + turns into x when the answer is open. */}
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-[rotate,background-color,color,border-color] duration-300 group-hover/question:text-foreground group-data-[panel-open]/question:rotate-45 group-data-[panel-open]/question:border-transparent group-data-[panel-open]/question:bg-primary group-data-[panel-open]/question:text-primary-foreground"
                  >
                    <PlusIcon className="size-5" />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel
                hiddenUntilFound
                className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0"
              >
                <p className="max-w-3xl pr-16 pb-7 text-lg leading-[1.4] text-foreground">{item.answer}</p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
