import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon, StarIcon } from "lucide-react";
import { company, heroIntro, primaryCta } from "@/content/site";
import { laptopGlowA, laptopGlowB, laptopGlowC } from "@/components/site/hero-glow";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

function HeroBackground() {
  return (
    <div aria-hidden="true" className="hero-anim pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className={`hero-blob hero-blob-a ${laptopGlowA}`} />
      <div className={`hero-blob hero-blob-b ${laptopGlowB}`} />
      <div className={`hero-blob hero-blob-c ${laptopGlowC}`} />
      <div className="hero-ring" />
      <div className="hero-dots" />
      <div className="hero-floor">
        <div className="hero-floor-grid" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
    </div>
  );
}

function Rating() {
  const clutch = company.ratings.find((r) => r.source === "Clutch");
  return (
    <div className="hero-rise mt-9 flex items-center gap-3 text-sm text-muted-foreground" style={delay(480)}>
      <span className="flex text-star" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} className="size-4 fill-current" />
        ))}
      </span>
      <span>
        Rated <strong className="font-semibold text-foreground">{clutch?.score}</strong> on Clutch and Google
      </span>
    </div>
  );
}

function Partners() {
  return (
    <div className="hero-rise pt-14 pb-10 text-center" style={delay(620)}>
      <p className="text-sm text-muted-foreground">Partners and programmes</p>
      <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {company.partners.map((partner) => (
          <li
            key={partner.name}
            title={partner.tier}
            className="font-heading text-lg font-medium tracking-tight text-foreground/45 transition-colors hover:text-foreground/80"
          >
            {partner.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-header-theme="light"
      // Starts at the very top of the page (no gap above), so only the bottom corners are rounded.
      className="relative isolate overflow-hidden rounded-b-[1.75rem] bg-background text-foreground sm:rounded-b-[2.5rem]"
    >
      <HeroBackground />

      {/* Fills the screen, less the small gap below it. */}
      <div className="relative mx-auto flex min-h-[calc(100svh-0.5rem)] max-w-7xl flex-col px-5 pt-28 sm:min-h-[calc(100svh-0.75rem)] sm:px-8">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1
            id="hero-title"
            className="hero-rise max-w-6xl font-heading text-[clamp(2.25rem,5.6vw,6rem)] leading-none font-medium tracking-[-0.04em] text-balance"
            style={delay(0)}
          >
            {heroIntro.lead} <span className="text-gradient">{heroIntro.highlight}</span>
          </h1>

          <p
            className="hero-rise mt-6 max-w-2xl text-lg leading-[1.4] text-foreground sm:text-xl"
            style={delay(160)}
          >
            {heroIntro.sub}
          </p>

          <div
            className="hero-rise mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            style={delay(320)}
          >
            <Link
              href={primaryCta.href}
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
            >
              {primaryCta.label}
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href={heroIntro.secondaryCta.href}
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border bg-background/50 px-6 font-medium backdrop-blur-md transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
            >
              {heroIntro.secondaryCta.label}
            </Link>
          </div>

          <Rating />
        </div>

        <Partners />
      </div>
    </section>
  );
}
