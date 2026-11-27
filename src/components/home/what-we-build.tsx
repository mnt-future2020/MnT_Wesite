"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, ChevronDownIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { serviceGroups, whatWeBuild, type ServiceArea, type ServiceGroup } from "@/content/site";
import { cn } from "@/lib/utils";
import { AgentVisual, AppsVisual, CloudVisual, DataVisual } from "./service-visuals";

/*
 * Light section with a tab bar: AI | Software & apps | Data & integration | Cloud & security.
 * The four tabs hold the service areas (see serviceGroups in site.ts).
 *
 * Desktop (1024px and wider): the section pins while you scroll (about 1.2
 * screens of scrolling per tab), and the active tab moves to the right as you go.
 * One box below the tabs shows the active tab: its areas as a list on the left
 * (open one to see its services), the product picture on a soft gradient on the right.
 *
 * Phones and tablets: the tab bar is its own card that sticks under the
 * header. Below it, the four tabs are separate cards with space between
 * them. The active tab follows your scroll; tapping a tab scrolls to its card.
 */

const TAB_COUNT = serviceGroups.length;
const EASE = [0.16, 1, 0.3, 1] as const;
const DESKTOP = "(min-width: 1024px)";

const visuals: Record<ServiceGroup["id"], React.ComponentType> = {
  ai: AgentVisual,
  software: AppsVisual,
  data: DataVisual,
  cloud: CloudVisual,
};

/** Space taken by the floating header, so content is not hidden under it. */
function headerSpace() {
  return window.matchMedia("(min-width: 640px)").matches ? 80 : 76;
}

export function WhatWeBuild() {
  const sectionRef = useRef<HTMLElement>(null);
  const tabBarRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const group = serviceGroups[active];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Desktop: how far through the current tab the reader has scrolled (fills the bar under the tab).
  const tabProgress = useTransform(scrollYProgress, (value) => {
    const position = value * TAB_COUNT;
    const index = Math.min(TAB_COUNT - 1, Math.floor(position));
    return Math.min(1, Math.max(0, position - index));
  });

  // Desktop: the scroll position decides the active tab.
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!window.matchMedia(DESKTOP).matches) return;
    setActive(Math.min(TAB_COUNT - 1, Math.floor(value * TAB_COUNT)));
  });

  // Phones and tablets: the card that has reached the sticky tab bar decides the active tab.
  useEffect(() => {
    function onScroll() {
      if (window.matchMedia(DESKTOP).matches) return;
      const threshold = headerSpace() + (tabBarRef.current?.offsetHeight ?? 56) + 48;
      let current = 0;
      cardRefs.current.forEach((card, index) => {
        if (card && card.getBoundingClientRect().top <= threshold) current = index;
      });
      setActive(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function selectTab(index: number) {
    if (window.matchMedia(DESKTOP).matches) {
      // Desktop: scroll to the part of the pinned section that shows this tab.
      const section = sectionRef.current;
      if (!section) return;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const travel = section.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + ((index + 0.02) / TAB_COUNT) * travel, behavior: "smooth" });
      setActive(index);
      return;
    }
    // Phones and tablets: scroll to that card, just under the sticky tab bar.
    const card = cardRefs.current[index];
    if (!card) return;
    const offset = headerSpace() + (tabBarRef.current?.offsetHeight ?? 56) + 16;
    window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      id="what-we-build"
      aria-labelledby="what-we-build-title"
      data-header-theme="light"
      // A plain full-width section, not a rounded card. Desktop height sets the scroll speed:
      // 560svh gives each of the four tabs a little over one screen of scrolling.
      className="relative bg-background text-foreground lg:h-[560svh]"
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pt-24 pb-16 sm:px-8 lg:min-h-0 lg:pb-6 lg:[@media(max-height:820px)]:pt-20 lg:[@media(max-height:820px)]:pb-4">
          {/* Heading: one line each. */}
          <h2
            id="what-we-build-title"
            className="font-heading text-[clamp(2.5rem,4.6vw,4.5rem)] leading-none font-medium tracking-[-0.04em] lg:[@media(max-height:820px)]:text-[2.25rem]"
          >
            {whatWeBuild.titleLines.map((line) => (
              <span key={line} className="block lg:whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>

          {/*
            Desktop: this is the single box (tabs on top, one service below). It is as tall
            as its content, so the list starts right under each heading.
            Phones and tablets: a plain wrapper, so the tab bar can stick while the cards scroll.
          */}
          <div className="mt-8 flex flex-col lg:mt-6 lg:min-h-0 lg:overflow-hidden lg:rounded-2xl lg:border lg:border-border lg:bg-card lg:shadow-[0_24px_60px_-30px_rgb(11_16_36/0.18)] lg:[@media(max-height:820px)]:mt-4">
            <nav
              ref={tabBarRef}
              aria-label="What we build"
              className="z-20 shrink-0 overflow-hidden border-border bg-card max-lg:sticky max-lg:top-19 max-lg:rounded-xl max-lg:border max-lg:shadow-[0_12px_28px_-16px_rgb(11_16_36/0.35)] sm:max-lg:top-20 lg:border-b"
            >
              <div className="grid grid-cols-4">
                {serviceGroups.map((tab, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => selectTab(index)}
                      className={cn(
                        "relative border-r border-border px-2 py-4 text-sm font-medium transition-colors last:border-r-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:text-base max-lg:py-3.5 lg:[@media(max-height:820px)]:py-3",
                        isActive
                          ? "bg-p1/12 text-foreground lg:bg-p1/[0.04]"
                          : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {/* Desktop: the tab's colour fills from left to right as you scroll through it,
                          as a gradient from light to slightly darker at the moving edge. */}
                      {isActive ? (
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-0 hidden origin-left bg-linear-to-r from-p1/[0.04] via-p1/12 to-p1/25 lg:block"
                          style={{ scaleX: tabProgress }}
                        />
                      ) : null}
                      {/* Phones get the short label, so four tabs fit in one row. */}
                      <span className="relative sm:hidden">{tab.tabShort}</span>
                      <span className="relative max-sm:hidden">{tab.tab}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Desktop: one service at a time. */}
            <div className="hidden lg:grid lg:grid-cols-2">
              {/* The texts of all four tabs share one cell, so the box is always as tall as the
                  tallest tab and keeps the same size in every tab. Only the active one is
                  visible; the others are hidden and cannot be focused. */}
              <div className="grid">
                {serviceGroups.map((item, index) => {
                  const isActive = index === active;
                  return (
                    <div
                      key={item.id}
                      aria-hidden={!isActive || undefined}
                      inert={!isActive}
                      className={cn(
                        "[grid-area:1/1] transition-[opacity,translate] duration-300 ease-out",
                        isActive ? "translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
                      )}
                    >
                      <TabText group={item} active={isActive} />
                    </div>
                  );
                })}
              </div>
              <VisualPanel group={group} animate />
            </div>

            {/* Phones and tablets: four separate cards with space between them. */}
            <div className="mt-5 grid gap-5 lg:hidden">
              {serviceGroups.map((item, index) => (
                <div
                  key={item.id}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_-30px_rgb(11_16_36/0.18)]"
                >
                  <TabText group={item} />
                  <VisualPanel group={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The picture side. Phones and tablets show the card's own picture; desktop (`animate`) keeps all four. */
function VisualPanel({ group, animate = false }: { group: ServiceGroup; animate?: boolean }) {
  const Visual = visuals[group.id];
  return (
    <div className="relative flex items-center justify-center overflow-hidden border-t border-border bg-linear-to-br from-wash-1/30 via-wash-2/22 to-wash-3/25 p-6 sm:p-10 lg:border-t-0 lg:border-l lg:p-8 lg:[@media(max-height:820px)]:p-6">
      {animate ? (
        // Desktop: all four pictures share one cell (like the texts), so this side keeps the
        // same height in every tab; only the active picture is visible. On short screens the
        // pictures are zoomed down (zoom, unlike a transform, also shrinks the space they take).
        <div aria-hidden="true" className="grid w-full max-w-xl lg:[@media(max-height:820px)]:[zoom:0.82]">
          {serviceGroups.map((item) => {
            const ItemVisual = visuals[item.id];
            const isActive = item.id === group.id;
            return (
              <div
                key={item.id}
                className={cn(
                  "self-center [grid-area:1/1] transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isActive ? "translate-y-0 scale-100 opacity-100" : "invisible translate-y-4 scale-[0.97] opacity-0"
                )}
              >
                <ItemVisual />
              </div>
            );
          })}
        </div>
      ) : (
        <div aria-hidden="true" className="w-full max-w-xl">
          <Visual />
        </div>
      )}
    </div>
  );
}

/** How long each list item stays open before the next one opens, in seconds. */
const AUTOPLAY_SECONDS = 4.5;

/**
 * The bar beside the open list item. It fills from top to bottom over
 * AUTOPLAY_SECONDS, then calls onDone so the next item opens.
 * It pauses when asked, and stays full (no auto-moving) for reduced motion.
 */
function AutoplayBar({ paused, onDone }: { paused: boolean; onDone: () => void }) {
  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const reduceMotion = useReducedMotion();
  const controls = useRef<ReturnType<typeof animate> | null>(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    const animation = animate(scope.current, { scaleY: [0, 1] }, { duration: AUTOPLAY_SECONDS, ease: "linear" });
    controls.current = animation;
    animation.then(() => {
      if (!cancelled) onDoneRef.current();
    });
    return () => {
      cancelled = true;
      animation.stop();
      controls.current = null;
    };
  }, [animate, scope, reduceMotion]);

  useEffect(() => {
    if (paused) controls.current?.pause();
    else controls.current?.play();
  }, [paused]);

  return (
    <span
      ref={scope}
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-0.5 origin-top bg-brand"
      style={reduceMotion ? undefined : { transform: "scaleY(0)" }}
    />
  );
}

function TabText({ group, active = true }: { group: ServiceGroup; active?: boolean }) {
  const [openItem, setOpenItem] = useState(0);
  // The list moves on its own like a carousel. It pauses while hovered,
  // while something inside has keyboard focus, while it is off screen,
  // or (desktop) while its tab is not the active one.
  const listRef = useRef<HTMLUListElement>(null);
  const inView = useInView(listRef, { amount: 0.4 });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused || !inView || !active;

  function showNext() {
    setOpenItem((current) => (current + 1) % group.areas.length);
  }

  return (
    // No full-height setting here: on phones it stretched the text over the whole card and
    // pushed the picture out of the bottom of the card, leaving an empty space.
    <div>
      <div className="p-6 sm:p-8 lg:[@media(max-height:820px)]:px-7 lg:[@media(max-height:820px)]:py-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="text-sm font-medium text-brand">{group.label}</p>
          <Link
            href={group.link.href}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            {group.link.label}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
        <h3 className="mt-3 font-heading text-[clamp(1.75rem,2.4vw,2.25rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance lg:[@media(max-height:820px)]:mt-2 lg:[@media(max-height:820px)]:text-[1.625rem]">
          {group.headline}
        </h3>
        <p className="mt-3 max-w-lg leading-[1.4] text-foreground lg:[@media(max-height:940px)]:hidden">
          {group.lead}
        </p>
      </div>

      {/* The tab's service areas. The open one shows its services. */}
      <ul
        ref={listRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={(event) => {
          // Only keyboard focus pauses it; a mouse click should not stop the carousel.
          if (event.target.matches(":focus-visible")) setFocused(true);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
        className="border-t border-border"
      >
        {group.areas.map((area, index) => {
          const isOpen = index === openItem;
          return (
            <li key={area.href} className="relative border-b border-border last:border-b-0">
              {isOpen ? (
                <>
                  {/* Track, and a bar that fills over a few seconds before the next item opens. */}
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-brand/20" />
                  <AutoplayBar key={openItem} paused={paused} onDone={showNext} />
                </>
              ) : null}
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenItem(index)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-6 py-3.5 text-left font-medium transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:px-8 lg:py-3 lg:[@media(max-height:820px)]:py-2.5",
                  isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {area.name}
                <ChevronDownIcon
                  aria-hidden="true"
                  className={cn("size-4 shrink-0 transition-transform duration-300", isOpen && "rotate-180")}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <AreaServices area={area} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** An open area: its services in two columns (one on phones), then a link to its page. */
function AreaServices({ area }: { area: ServiceArea }) {
  return (
    <div className="px-6 pb-4 sm:px-8 lg:pb-3.5 lg:[@media(max-height:820px)]:pb-3">
      {/* Two columns of up to four rows, filled top to bottom, so every area takes the same
          height (some have six services, some seven) and the box does not jump as the list moves. */}
      <ul className="grid gap-x-6 gap-y-1.5 text-sm leading-[1.4] text-foreground sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4 lg:[@media(max-height:820px)]:gap-y-1">
        {area.services.map((service) => (
          <li key={service.name} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-brand" />
            {service.name}
          </li>
        ))}
      </ul>
      <Link
        href={area.href}
        className="mt-3 inline-block text-sm font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-ring lg:[@media(max-height:820px)]:mt-2"
      >
        Learn more
      </Link>
    </div>
  );
}
