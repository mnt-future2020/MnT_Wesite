"use client";

import { useRef, useSyncExternalStore } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowUpRightIcon } from "lucide-react";
import { nearBlack, sectionCard } from "@/components/site/section-theme";
import { howWeWork, method } from "@/content/site";
import { cn } from "@/lib/utils";

/*
 * DARK section (near-black). The five steps are drawn as a staircase: five bars
 * that rise from left to right, with the step name and what you get above each one.
 * The heading sits in the empty space above the low steps.
 * Phones and tablets: the bars lie on their side and get longer step by step.
 */

/** Desktop bar heights (rem) and phone/tablet bar widths (%), step 1 to 5. */
const BAR_HEIGHTS = [6, 12, 18, 24, 30];
const BAR_WIDTHS = [40, 55, 70, 85, 100];

/** Dim up to the glowing brand gradient: the colour gets stronger as the steps rise. */
const BAR_COLOURS = [
  "bg-white/[0.06] text-white/70",
  "bg-p1/20 text-p1-soft",
  "bg-p1/40 text-white",
  "bg-p1/80 text-white",
  "bg-linear-to-br from-p1 to-p2 text-white shadow-[0_0_70px_-12px_color-mix(in_srgb,var(--p-2)_70%,transparent)]",
];

/** Time between one bar starting to rise and the next (desktop). */
const STAGGER_MS = 120;

const DESKTOP = "(min-width: 1024px)";

function subscribeToDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function HowWeWork() {
  // Desktop: all bars rise (one after another) as soon as the floor of the staircase comes on screen.
  // No negative margin here: when this is the last section, the page ends before a raised trigger line can be reached.
  const floorRef = useRef<HTMLDivElement>(null);
  const floorInView = useInView(floorRef, { once: true });
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    () => window.matchMedia(DESKTOP).matches,
    () => false
  );
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-title"
      data-header-theme="dark"
      style={nearBlack}
      className={cn("dark relative overflow-hidden bg-background py-20 text-foreground lg:py-28", sectionCard)}
    >
      {/* Soft blue and violet glows behind the tall steps. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -bottom-56 size-176 rounded-full bg-p1/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 size-120 rounded-full bg-p2/12 blur-3xl"
      />

      {/* Desktop: the heading and the staircase share one grid cell, so the heading
          fills the empty space above steps 1 and 2. */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:grid">
        <header className="lg:col-start-1 lg:row-start-1 lg:max-w-[calc((100%-5rem)*0.4+1.25rem)] lg:self-start">
          <p className="text-base font-medium text-brand">{howWeWork.label}</p>
          <h2
            id="how-we-work-title"
            className="mt-3 font-heading text-[clamp(2.5rem,4.6vw,4.5rem)] leading-none font-medium tracking-[-0.04em]"
          >
            {howWeWork.titleLines.map((line) => (
              <span key={line} className="block lg:whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-md text-xl leading-[1.4] text-foreground">{howWeWork.body}</p>
        </header>

        <ol className="mt-12 grid gap-8 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:grid-cols-5 lg:items-end lg:gap-5">
          {method.map((stage, index) => (
            <Step
              key={stage.name}
              index={index}
              name={stage.name}
              line={stage.short}
              shownOnDesktop={floorInView}
              isDesktop={isDesktop}
              reduceMotion={reduceMotion === true}
            />
          ))}
        </ol>

        <div ref={floorRef} aria-hidden="true" className="h-px lg:col-start-1 lg:row-start-2" />
      </div>
    </section>
  );
}

function Step({
  index,
  name,
  line,
  shownOnDesktop,
  isDesktop,
  reduceMotion,
}: {
  index: number;
  name: string;
  line: string;
  shownOnDesktop: boolean;
  isDesktop: boolean;
  reduceMotion: boolean;
}) {
  // Phones and tablets: each step grows in on its own as you scroll down to it.
  const ref = useRef<HTMLLIElement>(null);
  const itemInView = useInView(ref, { once: true, amount: 0.6 });
  const shown = reduceMotion || (isDesktop ? shownOnDesktop : itemInView);
  const isLast = index === method.length - 1;

  const style = {
    "--bar-h": `${BAR_HEIGHTS[index]}rem`,
    "--bar-w": `${BAR_WIDTHS[index]}%`,
    "--bar-delay": `${index * STAGGER_MS}ms`,
    "--text-delay": `${index * STAGGER_MS + 250}ms`,
  } as React.CSSProperties;

  return (
    <li ref={ref} className="group/step flex flex-col-reverse gap-4 lg:flex-col lg:gap-5" style={style}>
      {/* Step name and what you get. Desktop: above the bar. Phones: below it. */}
      <div
        className={cn(
          "transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none lg:delay-(--text-delay)",
          shown ? "opacity-100" : "translate-y-3 opacity-0"
        )}
      >
        <h3 className="font-heading text-2xl font-medium tracking-[-0.02em] transition-colors lg:text-[1.75rem] lg:group-hover/step:text-brand">
          {name}
        </h3>
        <p className="mt-2 text-lg leading-[1.4] text-foreground">{line}</p>
      </div>

      {/* The bar. Desktop: rises from the floor. Phones: grows to the right. */}
      <div
        aria-hidden="true"
        className={cn(
          "relative flex h-14 w-(--bar-w) items-center overflow-hidden rounded-2xl px-5 lg:h-(--bar-h) lg:w-full lg:items-end lg:p-6",
          "transition-[clip-path] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none lg:delay-(--bar-delay)",
          // Once shown, the clip reaches 5rem past the bar so the last bar's glow is not cut off.
          shown ? "[clip-path:inset(-5rem)]" : "[clip-path:inset(0_100%_0_0)] lg:[clip-path:inset(100%_0_0_0)]",
          BAR_COLOURS[index]
        )}
      >
        {/* Turns the bar white on hover (desktop). */}
        <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 lg:group-hover/step:opacity-100" />
        <span className="relative font-heading text-2xl leading-none font-medium tracking-[-0.03em] transition-colors lg:text-5xl lg:group-hover/step:text-[#0a0b10]">
          {String(index + 1).padStart(2, "0")}
        </span>
        {isLast ? (
          <ArrowUpRightIcon className="absolute top-1/2 right-5 size-6 -translate-y-1/2 transition-colors lg:top-6 lg:right-6 lg:size-7 lg:translate-y-0 lg:group-hover/step:text-[#0a0b10]" />
        ) : null}
      </div>
    </li>
  );
}
