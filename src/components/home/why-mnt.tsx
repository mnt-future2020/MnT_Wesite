"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { UserRoundIcon } from "lucide-react";
import { whyMnt } from "@/content/site";
import { cn } from "@/lib/utils";

/*
 * Light section. A bento grid of four tiles; each has a short label, one big
 * answer and one simple picture. A switch flips the whole grid between
 * "The usual agency" (grey tiles) and "MnT Future" (bright tiles), and each
 * picture changes with it. It starts on the usual side and flips to MnT
 * once by itself when it comes on screen.
 */

type Side = "usual" | "mnt";

const SIDES: Side[] = ["usual", "mnt"];

/** How long the grid waits on screen before it flips to MnT by itself. */
const AUTO_FLIP_MS = 900;

const EASE = [0.16, 1, 0.3, 1] as const;

export function WhyMnt() {
  const [side, setSide] = useState<Side>("usual");

  // Flip to MnT once, shortly after the grid comes on screen, unless the visitor already used the switch.
  const touched = useRef(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (!inView || touched.current) return;
    const timer = window.setTimeout(() => {
      if (!touched.current) setSide("mnt");
    }, reduceMotion ? 0 : AUTO_FLIP_MS);
    return () => window.clearTimeout(timer);
  }, [inView, reduceMotion]);

  function choose(next: Side) {
    touched.current = true;
    setSide(next);
  }

  return (
    <section
      id="why-mnt"
      aria-labelledby="why-mnt-title"
      data-header-theme="light"
      // A plain full-width section, not a rounded card.
      className="relative overflow-hidden bg-background py-20 text-foreground lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-base font-medium text-brand">{whyMnt.label}</p>
          <h2
            id="why-mnt-title"
            className="mt-3 font-heading text-[clamp(2.5rem,4.6vw,4.5rem)] leading-none font-medium tracking-[-0.04em]"
          >
            {whyMnt.titleLines.map((line) => (
              <span key={line} className="block sm:whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 text-xl leading-[1.4] text-foreground">{whyMnt.body}</p>
        </header>

        {/* The switch. The dark pill slides to the chosen side. */}
        <div className="mt-10 flex justify-center">
          <div
            role="group"
            aria-label="Compare"
            className="inline-flex rounded-full border border-border bg-white p-1 shadow-sm"
          >
            {SIDES.map((option) => {
              const active = side === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(option)}
                  className="relative h-11 rounded-full px-5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-12 sm:px-7 sm:text-base"
                >
                  {active ? (
                    <motion.span
                      layoutId="why-mnt-switch"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                    />
                  ) : null}
                  <span
                    className={cn(
                      "relative transition-colors",
                      active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {whyMnt.options[option]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The bento grid. Phones: one column. Tablets: two. Desktop: three. */}
        <div
          ref={gridRef}
          aria-live="polite"
          className="mx-auto mt-10 grid max-w-6xl gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          <TeamTile side={side} />
          <OwnershipTile side={side} />
          <WayTile side={side} />
          <AfterTile side={side} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ tiles
 * Each tile: a short label, one big answer, and ONE simple picture.
 * Desktop: [ Who builds it (wide) ][ Who owns it ]
 *          [ How it is built ][ When the contract ends (wide) ]
 */

function TeamTile({ side }: { side: Side }) {
  const tile = whyMnt.team;
  const isMnt = side === "mnt";
  return (
    <Tile side={side} mntLayer="bg-linear-to-br from-tint-1 via-tint-2 to-tint-3" className="md:col-span-2">
      <div className="grid h-full gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
        <TileText side={side} label={tile.label} usual={tile.usual} mnt={tile.mnt} />

        {/* Picture: the team, with one tag. */}
        <div aria-hidden="true" className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "grid size-14 place-items-center rounded-full border-4 border-white text-white transition-colors duration-500",
                  isMnt ? "bg-p1" : "bg-[#c9ced9]"
                )}
              >
                <UserRoundIcon className="size-6" />
              </span>
            ))}
          </div>
          <Swap side={side} usual={tile.badge.usual} mnt={tile.badge.mnt} delay={0.15} variant="chip" />
        </div>
      </div>
    </Tile>
  );
}

function OwnershipTile({ side }: { side: Side }) {
  const tile = whyMnt.ownership;
  const isMnt = side === "mnt";
  return (
    <Tile side={side} mntLayer="bg-white">
      <TileText side={side} label={tile.label} usual={tile.usual} mnt={tile.mnt} delay={0.06} />

      {/* Picture: the four things you own, blue on the MnT side. */}
      <div aria-hidden="true" className="mt-auto flex flex-wrap gap-2 pt-8">
        {tile.items.map((item) => (
          <span
            key={item}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-500",
              isMnt ? "bg-brand/10 text-brand" : "bg-foreground/[0.06] text-muted-foreground"
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </Tile>
  );
}

function WayTile({ side }: { side: Side }) {
  const tile = whyMnt.way;
  const isMnt = side === "mnt";
  const spring = { type: "spring", bounce: 0.25, duration: 0.9 } as const;
  const circle = cn(
    "grid size-24 place-items-center rounded-full border text-center text-sm font-medium transition-colors duration-500",
    isMnt ? "border-white/50 bg-white/15 text-white" : "border-foreground/15 bg-white text-muted-foreground"
  );
  return (
    <Tile side={side} mntLayer="bg-linear-to-br from-p1 to-p2">
      <TileText side={side} label={tile.label} usual={tile.usual} mnt={tile.mnt} delay={0.12} invert />

      {/* Picture: your team and the builders. Apart on the usual side, one team on the MnT side. */}
      <div aria-hidden="true" className="mt-auto flex items-center justify-center pt-8">
        <motion.span className={circle} initial={false} animate={{ x: isMnt ? 20 : -36 }} transition={spring}>
          {tile.circles.yours}
        </motion.span>
        <motion.span className={circle} initial={false} animate={{ x: isMnt ? -20 : 36 }} transition={spring}>
          {isMnt ? tile.circles.mnt : tile.circles.usual}
        </motion.span>
      </div>
    </Tile>
  );
}

/** The status line: the same until the contract ends, then flat on the usual side. */
const LINE_MNT = "M0 30 C 20 24, 40 34, 60 28 C 80 22, 100 32, 120 27 C 140 22, 165 33, 200 26";
const LINE_USUAL = "M0 30 C 20 24, 40 34, 60 28 C 80 22, 100 32, 120 27 C 128 50, 160 50, 200 50";

function AfterTile({ side }: { side: Side }) {
  const tile = whyMnt.after;
  const isMnt = side === "mnt";
  return (
    <Tile side={side} mntLayer="bg-white" className="md:col-span-2">
      <div className="grid h-full gap-8 sm:grid-cols-2 sm:items-end">
        <TileText side={side} label={tile.label} usual={tile.usual} mnt={tile.mnt} delay={0.18} />

        {/* Picture: a status line that keeps running, or drops after the contract ends. */}
        <div aria-hidden="true">
          <Swap side={side} usual={tile.status.usual} mnt={tile.status.mnt} delay={0.3} variant="status" />
          <div className="relative mt-4">
            <svg viewBox="0 0 200 56" preserveAspectRatio="none" className="h-16 w-full overflow-visible">
              <line
                x1="125"
                x2="125"
                y1="2"
                y2="54"
                stroke="currentColor"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
                className="text-foreground/25"
              />
              {/* The shape is animated by Motion; the colour fades with CSS so it follows the palette. */}
              <motion.path
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className={cn("transition-[stroke] delay-200 duration-700", isMnt ? "stroke-p1" : "stroke-[#9aa1b5]")}
                initial={false}
                animate={{ d: isMnt ? LINE_MNT : LINE_USUAL }}
                transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
              />
            </svg>
            <span className="absolute top-full left-[62.5%] mt-1.5 -translate-x-1/2 text-xs whitespace-nowrap text-muted-foreground">
              {tile.marker}
            </span>
          </div>
          <div className="h-6" />
        </div>
      </div>
    </Tile>
  );
}

/* ------------------------------------------------------------- building blocks */

/**
 * A tile. Its grey "usual" look is the base; the MnT look (white, pastel or
 * the brand gradient) is a layer on top that fades in and out.
 */
function Tile({
  side,
  mntLayer,
  className,
  children,
}: {
  side: Side;
  mntLayer: string;
  className?: string;
  children: React.ReactNode;
}) {
  const isMnt = side === "mnt";
  return (
    <div
      className={cn(
        "relative isolate flex min-h-64 flex-col overflow-hidden rounded-3xl border bg-[#eceff5] p-7 transition-colors duration-500 sm:p-9 lg:min-h-72",
        isMnt ? "border-border" : "border-transparent",
        className
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 transition-opacity duration-500",
          mntLayer,
          isMnt ? "opacity-100" : "opacity-0"
        )}
      />
      {children}
    </div>
  );
}

/** The tile's label and its one-line answer, which slides to the other side's answer. */
function TileText({
  side,
  label,
  usual,
  mnt,
  delay = 0,
  invert = false,
}: {
  side: Side;
  label: string;
  usual: string;
  mnt: string;
  delay?: number;
  /** White text on the MnT side (for the blue-violet tile). */
  invert?: boolean;
}) {
  const isMnt = side === "mnt";
  return (
    <div>
      <p
        className={cn(
          "text-base font-medium transition-colors duration-500",
          invert && isMnt ? "text-white/80" : "text-muted-foreground"
        )}
      >
        {label}
      </p>
      <div className="relative mt-2 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={side}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay, ease: EASE } }}
            exit={{ y: "-110%", opacity: 0, transition: { duration: 0.3, delay, ease: EASE } }}
            className={cn(
              "font-heading text-[1.75rem] leading-[1.15] font-medium tracking-[-0.025em] text-balance sm:text-[2rem]",
              isMnt ? (invert ? "text-white" : "text-foreground") : "text-foreground/60"
            )}
          >
            {isMnt ? mnt : usual}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** A short tag that slides to the other side's tag: a blue chip, or a green "running" status. */
function Swap({
  side,
  usual,
  mnt,
  delay = 0,
  variant,
}: {
  side: Side;
  usual: string;
  mnt: string;
  delay?: number;
  variant: "chip" | "status";
}) {
  const isMnt = side === "mnt";
  const look = {
    chip: isMnt ? "bg-brand/10 text-brand" : "bg-foreground/[0.07] text-muted-foreground",
    status: isMnt ? "bg-[#059669]/10 text-[#047857]" : "bg-foreground/[0.07] text-muted-foreground",
  }[variant];
  return (
    <span className="relative inline-flex shrink-0 overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={side}
          initial={{ y: "120%", opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.45, delay, ease: EASE } }}
          exit={{ y: "-120%", opacity: 0, transition: { duration: 0.25, delay, ease: EASE } }}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap",
            look
          )}
        >
          {variant === "status" ? (
            <span
              aria-hidden="true"
              className={cn("size-1.5 rounded-full", isMnt ? "bg-[#059669]" : "bg-foreground/30")}
            />
          ) : null}
          {isMnt ? mnt : usual}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
