import Link from "next/link";
import { ArrowRightIcon, CheckIcon, FileTextIcon, UserRoundIcon } from "lucide-react";
import { nearBlack } from "@/components/site/section-theme";
import { method, servicesPage } from "@/content/site";
import { cn } from "@/lib/utils";

/*
 * Services page: "Ways to work with us". The three ways to hire us as three
 * cards side by side, each starting with the customer's own question ("Not sure
 * yet?"), then a plain title, a small picture and what happens. No durations,
 * prices or payment terms: the senior has not confirmed them.
 * The middle one, the core offering, is a dark card that stands a little taller.
 * Phones and tablets: the cards stack.
 */

type Way = (typeof servicesPage.ways.options)[number];

export function WaysToWork() {
  const { ways } = servicesPage;
  return (
    <section id="ways" aria-labelledby="ways-title" data-header-theme="light" className="scroll-mt-20 bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <div>
            <p className="text-sm font-medium text-brand">{ways.label}</p>
            <h2
              id="ways-title"
              className="mt-3 font-heading text-[clamp(2.5rem,4.6vw,4.5rem)] leading-none font-medium tracking-[-0.04em]"
            >
              {ways.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-[1.4] text-foreground sm:text-xl">{ways.body}</p>
        </div>

        <ul className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-3 lg:items-stretch">
          {ways.options.map((way) => (
            <WayCard key={way.id} way={way} />
          ))}
        </ul>

        <p className="mt-12 text-center text-lg leading-[1.4] lg:mt-16">
          {ways.help.lead}{" "}
          <Link
            href={ways.help.link.href}
            className="group inline-flex items-center gap-1.5 font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {ways.help.link.label}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}

function WayCard({ way }: { way: Way }) {
  // The core offering: a dark card (near-black, like the dark sections), a little taller on desktop.
  const featured = way.id === "team";
  return (
    <li
      style={featured ? nearBlack : undefined}
      className={cn(
        "flex flex-col rounded-[1.75rem] border p-6 sm:p-8",
        featured
          ? "dark border-transparent bg-background text-foreground shadow-[0_30px_70px_-30px_rgb(11_16_36/0.6)] lg:-my-5 lg:py-12"
          : "border-border bg-card"
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "grid h-36 place-items-center rounded-2xl px-4",
          featured ? "bg-white/[0.06]" : "bg-linear-150 from-tint-1 via-p1-soft/70 to-p1/45"
        )}
      >
        {way.id === "sprint" ? <SprintPicture /> : null}
        {way.id === "team" ? <TeamPicture /> : null}
        {way.id === "project" ? <MilestonePicture /> : null}
      </div>

      {/* The customer's question, then the plain answer. */}
      <div className="mt-7 flex flex-wrap items-center justify-between gap-2">
        <p className="text-lg font-medium text-brand">{way.question}</p>
        {way.badge ? (
          <span className="rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">{way.badge}</span>
        ) : null}
      </div>
      <h3 className="mt-2 font-heading text-[clamp(1.75rem,2.4vw,2.25rem)] leading-[1.05] font-medium tracking-[-0.03em]">
        {way.title}
      </h3>
      <p className="mt-4 leading-[1.4] text-foreground/80">{way.text}</p>

      {/* Who it suits and what you get, along the bottom of the card (no times or prices). */}
      <div className="mt-auto pt-7">
        <dl className="grid grid-cols-2 gap-4 border-t border-border pt-5">
          <div>
            <dt className="text-xs text-foreground/60">Good for</dt>
            <dd className="mt-1 text-sm font-medium">{way.goodFor}</dd>
          </div>
          <div>
            <dt className="text-xs text-foreground/60">You get</dt>
            <dd className="mt-1 text-sm font-medium">{way.youGet}</dd>
          </div>
        </dl>
      </div>
    </li>
  );
}

/** Start with a plan: days of study, ending in a written plan. */
function SprintPicture() {
  return (
    <div className="flex items-center gap-4">
      <div>
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: 10 }, (_, day) => (
            <span key={day} className="size-4 rounded-[5px] bg-brand" style={{ opacity: 0.3 + day * 0.07 }} />
          ))}
        </div>
      </div>
      <ArrowRightIcon className="size-4 shrink-0 text-foreground/40" />
      <span className="flex items-center gap-1.5 rounded-xl bg-card px-3 py-2 text-xs font-medium shadow-sm ring-1 ring-border">
        <FileTextIcon className="size-4 text-brand" />
        Written plan
      </span>
    </div>
  );
}

/** Embedded team: your people and ours in one row, working as one team. */
function TeamPicture() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex -space-x-2.5">
        {[0, 1, 2].map((person) => (
          <span
            key={`yours-${person}`}
            className="grid size-11 place-items-center rounded-full bg-[#2a2c35] text-white/75 ring-2 ring-[#15161c]"
          >
            <UserRoundIcon className="size-5" />
          </span>
        ))}
        {[0, 1, 2].map((person) => (
          <span
            key={`ours-${person}`}
            className="grid size-11 place-items-center rounded-full bg-brand text-white ring-2 ring-[#15161c]"
          >
            <UserRoundIcon className="size-5" />
          </span>
        ))}
      </div>
      <p className="text-[0.6875rem] text-white/60">Your team and ours, working as one</p>
    </div>
  );
}

/** Discovery to production: the five steps as milestones, the first three done. */
function MilestonePicture() {
  return (
    <div className="w-full max-w-xs">
      <div className="relative grid grid-cols-5 justify-items-center">
        {/* The line joining the milestones, from the first to the last. */}
        <span className="absolute inset-x-[10%] top-1/2 h-0.5 -translate-y-1/2 bg-brand/25" />
        {method.map((step, index) => (
          <span
            key={step.name}
            className={cn(
              "relative grid size-7 place-items-center rounded-full",
              index < 3 ? "bg-brand text-white" : "bg-card text-foreground/40 ring-1 ring-border"
            )}
          >
            {index < 3 ? <CheckIcon className="size-3.5" /> : <span className="size-1.5 rounded-full bg-current" />}
          </span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-5 justify-items-center text-[0.625rem] text-foreground/60">
        {method.map((step) => (
          <span key={step.name}>{step.name}</span>
        ))}
      </div>
      <p className="mt-3 text-center text-[0.6875rem] font-medium text-brand">Built stage by stage</p>
    </div>
  );
}
