import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { primaryCta } from "@/content/site";
import { laptopGlowA, laptopGlowB } from "./hero-glow";

/*
 * The hero for inner pages (About, Services, ...). Light, like the homepage hero,
 * but about two-thirds of the screen tall: a big left-aligned heading, one line
 * and the button, then a row along the bottom (`bottom`: facts, quick links).
 * The background keeps the homepage's two soft corner glows (the ring and grid
 * floor stay homepage only). No small label above the heading (the user's rule).
 */

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function PageHero({
  titleId,
  titleLines,
  body,
  bottom,
}: {
  /** Id of the heading, for the section's aria-labelledby. */
  titleId: string;
  /** The heading as it is shown: one line each on larger screens. */
  titleLines: readonly string[];
  body: string;
  /** The row along the bottom of the hero. */
  bottom: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={titleId}
      data-header-theme="light"
      // Starts at the very top of the page, so only the bottom corners are rounded (as the homepage hero).
      className="relative isolate overflow-hidden rounded-b-[1.75rem] bg-background text-foreground sm:rounded-b-[2.5rem]"
    >
      <div aria-hidden="true" className="hero-anim pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className={`hero-blob hero-blob-a ${laptopGlowA}`} />
        <div className={`hero-blob hero-blob-b ${laptopGlowB}`} />
        <div className="hero-dots" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto flex min-h-[min(46rem,78svh)] max-w-7xl flex-col px-5 pt-28 pb-10 sm:px-8 sm:pt-40 sm:pb-14">
        <div className="flex-1">
          <h1
            id={titleId}
            className="hero-rise font-heading text-[clamp(2.75rem,6.2vw,6rem)] leading-none font-medium tracking-[-0.04em]"
            style={delay(0)}
          >
            {titleLines.map((line) => (
              <span key={line} className="block sm:whitespace-nowrap">
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-rise mt-7 max-w-2xl text-lg leading-[1.4] text-foreground sm:text-xl" style={delay(200)}>
            {body}
          </p>
          <div className="hero-rise mt-9" style={delay(320)}>
            <Link
              href={primaryCta.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {primaryCta.label}
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="hero-rise mt-16 border-t border-border pt-8" style={delay(440)}>
          {bottom}
        </div>
      </div>
    </section>
  );
}
