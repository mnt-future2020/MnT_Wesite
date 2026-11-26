"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, PlusIcon, XIcon } from "lucide-react";
import { featuredWork, ourWork, primaryCta, type FeaturedProject } from "@/content/site";
import { cn } from "@/lib/utils";

/*
 * Light section. A large intro panel with a slanted edge on the left, and a
 * row of slanted cards on the right. The cards start a little smaller; the
 * round arrows (or dragging with the mouse) make them grow to full size and
 * slide over the panel.
 * Phones and tablets: the panel sits on top; the cards are swiped sideways,
 * or moved one at a time with the round arrows under them.
 */

const DESKTOP = "(min-width: 1024px)";
/** How far (px) the pointer must move before a press becomes a drag rather than a click. */
const DRAG_START_PX = 6;
/** A short drag (px) still moves one card. */
const DRAG_ONE_CARD_PX = 60;

/** Card width and gap on desktop (in rem); one slide moves by one card plus one gap. */
const CARD_REM = 30;
const GAP_REM = 1.5;
/**
 * The card row starts at 54% of the width; keep this much space after the last card
 * (the slant makes each card's top lean about 3rem to the right, so this includes that).
 */
const TRACK_START = 0.54;
const END_SPACE_REM = 5;
/** How small the cards are before the first arrow click. */
const START_SCALE = 0.93;

function subscribeToResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

/** Lines up content with the page's 80rem container on wide screens. */
const containerPad = "pl-[max(1.25rem,calc((100vw-80rem)/2+2rem))]";

export function OurWork() {
  const slideCount = featuredWork.length + 1; // client websites, then "your platform could be next"
  const rowRem = slideCount * CARD_REM + (slideCount - 1) * GAP_REM;

  // Work out how many clicks it takes until the last card is fully on screen.
  const viewportWidth = useSyncExternalStore(subscribeToResize, () => window.innerWidth, () => 1440);
  const rem = 16;
  const roomForRow = viewportWidth * (1 - TRACK_START) - END_SPACE_REM * rem;
  const overflow = Math.max(0, rowRem * rem - roomForRow);
  const lastIndex = Math.max(1, Math.ceil(overflow / ((CARD_REM + GAP_REM) * rem)));

  const [requestedIndex, setIndex] = useState(0);
  const index = Math.min(requestedIndex, lastIndex);

  // Each click moves one card, but never further than "last card fully visible".
  const trackStyle = {
    "--slide": `max(calc(${-index} * ${CARD_REM + GAP_REM}rem), calc(${(1 - TRACK_START) * 100}vw - ${END_SPACE_REM}rem - ${rowRem}rem))`,
    "--scale": index === 0 ? START_SCALE : 1,
  } as React.CSSProperties;

  const trackRef = useRef<HTMLDivElement>(null);

  // Phones and tablets: whether the arrows can still move back or forward.
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function update() {
      if (!track) return;
      setCanPrev(track.scrollLeft > 4);
      setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
    }
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /** Phones and tablets: scroll the swipe row by one card. */
  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (first.offsetWidth + gap), behavior: "smooth" });
  }

  // Desktop: drag the row with the mouse (or a finger). The row follows the pointer, then
  // settles on the nearest card. The live offset is a CSS variable, so dragging does not
  // re-render the section.
  const drag = useRef<{ id: number; startX: number; dx: number; moved: boolean } | null>(null);
  const swallowClick = useRef(false);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    swallowClick.current = false;
    if (!window.matchMedia(DESKTOP).matches) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = { id: event.pointerId, startX: event.clientX, dx: 0, moved: false };
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state || event.pointerId !== state.id) return;
    const track = event.currentTarget;
    state.dx = event.clientX - state.startX;
    if (!state.moved && Math.abs(state.dx) > DRAG_START_PX) {
      state.moved = true;
      track.setPointerCapture(event.pointerId);
      track.dataset.dragging = "";
    }
    if (!state.moved) return;
    // Past either end the row only gives a little, then springs back.
    const pastEnd = (index === 0 && state.dx > 0) || (index === lastIndex && state.dx < 0);
    track.style.setProperty("--drag", `${pastEnd ? state.dx * 0.25 : state.dx}px`);
  }

  function onPointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state || event.pointerId !== state.id) return;
    drag.current = null;
    const track = event.currentTarget;
    delete track.dataset.dragging;
    track.style.setProperty("--drag", "0px");
    if (!state.moved) return;
    // A drag must not also open the card it ended on.
    swallowClick.current = true;
    let steps = Math.round(-state.dx / ((CARD_REM + GAP_REM) * rem));
    if (steps === 0 && Math.abs(state.dx) > DRAG_ONE_CARD_PX) steps = state.dx < 0 ? 1 : -1;
    setIndex(Math.max(0, Math.min(lastIndex, index + steps)));
  }

  return (
    <section
      id="our-work"
      aria-labelledby="our-work-title"
      data-header-theme="light"
      // A plain full-width section, not a rounded card, like "What we build" above it.
      // The negative top margin removes the gap, so the two run together.
      className="relative -mt-2 overflow-hidden bg-background py-20 text-foreground sm:-mt-3 lg:py-24"
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Case studies"
        className="relative lg:h-[min(38rem,86svh)]"
      >
        {/* Intro panel. Desktop: slanted right edge; the cards slide over it.
            Once the cards start moving, the panel also eases a little to the left. */}
        <div
          className={cn(
            "relative mx-5 overflow-hidden rounded-3xl border border-border bg-linear-to-br from-tint-1 via-tint-2 to-tint-3 sm:mx-8",
            "lg:absolute lg:inset-y-0 lg:-left-24 lg:mx-0 lg:w-[64%] lg:origin-bottom-left lg:-skew-x-6 lg:rounded-l-none lg:border-l-0",
            "lg:transition-[translate,scale] lg:duration-700 lg:ease-[cubic-bezier(0.16,1,0.3,1)]",
            index > 0 && "lg:-translate-x-20 lg:scale-[0.96]"
          )}
        >
          <div aria-hidden="true" className="absolute -top-24 -right-10 size-96 rounded-full bg-wash-1/15 blur-3xl" />
          <div
            className={cn(
              "relative flex h-full flex-col justify-center p-8 sm:p-10 lg:skew-x-6 lg:p-0 lg:pr-[24%]",
              "lg:pl-[calc(max(1.25rem,calc((100vw-80rem)/2+2rem))+6rem)]",
              "lg:transition-opacity lg:duration-700",
              index > 0 && "lg:opacity-60"
            )}
          >
            <p className="text-base font-medium text-brand">{ourWork.label}</p>
            <h2
              id="our-work-title"
              className="mt-3 font-heading text-[clamp(2.5rem,4.6vw,4.5rem)] leading-none font-medium tracking-[-0.04em]"
            >
              {ourWork.titleLines.map((line) => (
                <span key={line} className="block lg:whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-md text-xl leading-[1.4] text-foreground">{ourWork.body}</p>
            <div>
              <Link
                href={ourWork.cta.href}
                className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {ourWork.cta.label}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Cards. Phones and tablets: swipe sideways, or use the arrows below.
            Desktop: moved and enlarged by the arrows, or dragged with the mouse. */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onClickCapture={(event) => {
            if (!swallowClick.current) return;
            swallowClick.current = false;
            event.preventDefault();
            event.stopPropagation();
          }}
          // Stops the browser's own image dragging from taking over a mouse drag.
          onDragStart={(event) => event.preventDefault()}
          className={cn(
            "mt-6 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden",
            "lg:absolute lg:inset-y-0 lg:left-[54%] lg:mt-0 lg:snap-none lg:items-center lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0",
            "lg:origin-left lg:[transform:translateX(calc(var(--slide)_+_var(--drag,0px)))_scale(var(--scale))] lg:transition-transform lg:duration-700 lg:ease-[cubic-bezier(0.16,1,0.3,1)]",
            // Desktop dragging: a grab cursor, and no easing or text selection while the row follows the pointer.
            "lg:cursor-grab lg:touch-pan-y lg:data-dragging:cursor-grabbing lg:data-dragging:transition-none lg:data-dragging:select-none"
          )}
          style={trackStyle}
        >
          {featuredWork.map((project, i) => (
            <Slide key={project.client} position={i} total={slideCount}>
              <ProjectCard project={project} />
            </Slide>
          ))}
          <Slide position={featuredWork.length} total={slideCount}>
            <YoursCard />
          </Slide>
        </div>

        {/* Arrows (desktop), at the right edge. The back arrow only appears once you have moved forward.
            At the end, the next arrow becomes an X that takes everything back to the start. */}
        <div className="absolute right-8 bottom-0 z-10 hidden items-center gap-3 lg:flex">
          {index > 0 ? (
            <ArrowButton label="Previous case study" onClick={() => setIndex(Math.max(0, index - 1))}>
              <ArrowLeftIcon className="size-5" aria-hidden="true" />
            </ArrowButton>
          ) : null}
          {index === lastIndex ? (
            <ArrowButton label="Back to the start" onClick={() => setIndex(0)}>
              <XIcon className="size-5" aria-hidden="true" />
            </ArrowButton>
          ) : (
            <ArrowButton label="Next case study" onClick={() => setIndex(Math.min(lastIndex, index + 1))}>
              <ArrowRightIcon className="size-5" aria-hidden="true" />
            </ArrowButton>
          )}
        </div>
      </div>

      {/* Phones and tablets: a hint on the left, back and next arrows on the right. */}
      <div className={cn("mt-2 flex items-center justify-between gap-4 pr-5 sm:pr-8 lg:hidden", containerPad)}>
        <p className="text-sm text-muted-foreground">Swipe to see more</p>
        <div className="flex items-center gap-2.5">
          <ArrowButton label="Previous case study" size="small" disabled={!canPrev} onClick={() => scrollByCard(-1)}>
            <ArrowLeftIcon className="size-5" aria-hidden="true" />
          </ArrowButton>
          <ArrowButton label="Next case study" size="small" disabled={!canNext} onClick={() => scrollByCard(1)}>
            <ArrowRightIcon className="size-5" aria-hidden="true" />
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}

function Slide({ position, total, children }: { position: number; total: number; children: React.ReactNode }) {
  return (
    <article
      role="group"
      aria-roledescription="slide"
      aria-label={`${position + 1} of ${total}`}
      className="relative h-[26rem] w-[85%] shrink-0 snap-start overflow-hidden rounded-3xl bg-ink text-white shadow-[0_28px_60px_-28px_rgb(11_16_36/0.45)] sm:w-[60%] lg:h-[28rem] lg:w-[30rem] lg:origin-bottom-left lg:-skew-x-6"
    >
      {children}
    </article>
  );
}

/**
 * Project card: the website picture fills the whole card. Only the bottom of
 * the picture is shaded (behind the text); the top half stays at full brightness.
 */
function ProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <>
      {/* Picture layer. On desktop it is wider than the card and kept upright,
          so it covers the slanted corners and the website is not slanted. */}
      <div className="absolute inset-0 lg:-inset-x-14 lg:skew-x-6">
        <Image
          src={project.image}
          alt={`The ${project.client} website`}
          fill
          sizes="(min-width: 1024px) 37rem, (min-width: 640px) 60vw, 85vw"
          className="object-cover object-top"
        />
        {/* Shade behind the text only. It fades out by the middle of the card
            (a little higher on phones, where the text takes more of the card). */}
        <div className="absolute inset-x-0 bottom-0 h-[66%] bg-linear-to-t from-black/90 via-black/55 to-transparent lg:h-[58%]" />
      </div>

      {/* Text layer, kept upright inside the slanted card. */}
      <div className="relative flex h-full flex-col p-6 sm:p-7 lg:skew-x-6 lg:px-11 lg:py-8">
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-xs font-medium backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-[#34d399]" aria-hidden="true" />
          Live
        </span>
        <div className="mt-auto [text-shadow:0_1px_14px_rgb(0_0_0/0.45)]">
          <p className="font-heading text-[1.875rem] leading-tight font-medium">{project.client}</p>
          <h3 className="mt-1.5 text-lg leading-snug text-white/90">{project.tagline}</h3>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-white"
          >
            Visit website
            <span className="sr-only"> of {project.client} (opens in a new tab)</span>
            <ArrowUpRightIcon
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </>
  );
}

function YoursCard() {
  return (
    <div className="relative flex h-full flex-col p-6 sm:p-7 lg:skew-x-6 lg:px-11 lg:py-8">
      <span className="grid size-14 place-items-center rounded-full bg-white text-ink">
        <PlusIcon className="size-6" aria-hidden="true" />
      </span>
      <div className="mt-auto">
        <p className="font-heading text-[1.875rem] leading-tight font-medium">{ourWork.yoursTitle}</p>
        <p className="mt-2 text-lg leading-snug text-white/80">{ourWork.yoursBody}</p>
        <Link
          href={primaryCta.href}
          className="group mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-ink transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {primaryCta.label}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

/** A round black arrow button. `small` is for phones and tablets; `disabled` fades it at either end. */
function ArrowButton({
  label,
  size = "large",
  disabled = false,
  onClick,
  children,
}: {
  label: string;
  size?: "large" | "small";
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-[opacity,background-color] hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-25 disabled:shadow-none",
        size === "small" ? "size-12" : "size-14"
      )}
    >
      {children}
    </button>
  );
}
