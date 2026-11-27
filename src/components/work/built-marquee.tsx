"use client";

import { useEffect, useRef } from "react";
import { Instrument_Serif } from "next/font/google";
import { useAnimate, useReducedMotion } from "motion/react";
import { workPage } from "@/content/site";

/*
 * Work page hero, bottom row: the kinds of work in the projects below, as words
 * in an elegant italic serif (Instrument Serif, a contrast to the Google Sans used
 * everywhere else), separated by small blue dots. Kept smaller and softer than the
 * heading so the heading stays the main thing. No icons (the user's
 * choice). They glide slowly from right to left in an endless loop and fade out
 * at both edges. It pauses while the mouse is over it; for people who turned
 * animations off it simply stands still.
 *
 * The loop: the list is repeated so one copy is always wider than the row, then
 * the track (two copies) slides left by exactly one copy and starts again, so
 * the join is never seen.
 */

const serif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
});

/** Seconds for one copy of the list to slide past. */
const LOOP_SECONDS = 40;

export function BuiltMarquee() {
  const { built } = workPage.hero;
  const reduceMotion = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const controls = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const animation = animate(scope.current, { x: ["0%", "-50%"] }, { duration: LOOP_SECONDS, ease: "linear", repeat: Infinity });
    controls.current = animation;
    return () => {
      animation.stop();
      controls.current = null;
    };
  }, [animate, scope, reduceMotion]);

  // One copy = the list twice, so it is always wider than the row; the track holds two copies.
  const copy = [...built, ...built];
  return (
    <div
      onMouseEnter={() => controls.current?.pause()}
      onMouseLeave={() => controls.current?.play()}
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      {/* Screen readers get the list once; the moving copies are hidden from them. */}
      <ul className="sr-only">
        {built.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
      <div ref={scope} aria-hidden="true" className="flex w-max">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {copy.map((item, index) => (
              <span key={`${half}-${index}`} className="flex items-center">
                <span
                  className={`${serif.className} px-6 text-[clamp(1.5rem,2.6vw,2.375rem)] leading-none whitespace-nowrap text-foreground/55 sm:px-8`}
                >
                  {item.label}
                </span>
                <span className="size-2 shrink-0 rounded-full bg-brand" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
