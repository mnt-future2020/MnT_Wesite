import { KeyRoundIcon, UserRoundIcon } from "lucide-react";
import { nearBlack, sectionCard } from "@/components/site/section-theme";
import { aboutPage } from "@/content/site";
import { cn } from "@/lib/utils";

/*
 * About page: "What we believe". The page's one DARK section (near-black, a
 * full-width rounded card like the homepage's dark sections), so the page goes
 * light, dark, light. Four big cards, one per promise: the promise with its
 * short line right under it (no numbers: the user removed the "01 / 04"
 * counter), and a small drawn picture on a dark glass panel. They stack as you scroll: each card
 * sticks a little lower than the one before, and the next card slides up over
 * it, like a deck being laid down. The cards get bluer one by one (the last one
 * is the blue gradient), and each has a faint light edge along its top so the
 * layers stand out from the background.
 *
 * The cards are solid colours (not see-through), so the covered card never
 * shows through. They are kept shorter than the screen, so nothing is hidden
 * while a card is stuck. No overflow-hidden on the section: it would stop the
 * cards sticking.
 */

type Belief = (typeof aboutPage.beliefs.items)[number];

/** Card colours: more and more logo blue mixed into the dark grey (solid), then the gradient. */
const CARD_STYLES = [
  "border border-white/[0.08] bg-[color-mix(in_srgb,var(--p-1)_7%,#121319)] text-foreground",
  "border border-white/[0.08] bg-[color-mix(in_srgb,var(--p-1)_14%,#121319)] text-foreground",
  "border border-white/[0.08] bg-[color-mix(in_srgb,var(--p-1)_24%,#121319)] text-foreground",
  "bg-linear-150 from-p1 to-p2 text-white",
];


export function Beliefs() {
  const { beliefs } = aboutPage;
  return (
    <section
      aria-labelledby="beliefs-title"
      data-header-theme="dark"
      style={nearBlack}
      className={cn("dark bg-background text-foreground", sectionCard)}
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <div>
            <p className="text-sm font-medium text-brand">{beliefs.label}</p>
            <h2
              id="beliefs-title"
              className="mt-3 font-heading text-[clamp(2.5rem,4.6vw,4.5rem)] leading-none font-medium tracking-[-0.04em]"
            >
              {beliefs.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-[1.4] text-muted-foreground sm:text-xl">{beliefs.body}</p>
        </div>

        <ul className="mt-12 flex flex-col gap-6 sm:mt-16 lg:gap-10">
          {beliefs.items.map((item, index) => (
            <BeliefCard key={item.line} item={item} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function BeliefCard({ item, index }: { item: Belief; index: number }) {
  const onBrand = index === CARD_STYLES.length - 1;
  return (
    <li
      // Each card sticks a little lower than the one before, so the edges of the stack show.
      style={{ "--i": index } as React.CSSProperties}
      className={cn(
        "sticky top-[calc(5.5rem+var(--i)*0.75rem)] grid gap-6 rounded-[1.75rem] p-6 shadow-[0_-18px_50px_-24px_rgb(0_0_0/0.85)] sm:p-10 lg:top-[calc(6.5rem+var(--i)*1.25rem)] lg:min-h-[26rem] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12 lg:p-12",
        CARD_STYLES[index]
      )}
    >
      {/* A faint light edge along the top. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"
      />

      <div className="flex flex-col">
        <p className="font-heading text-[clamp(2rem,4vw,3.75rem)] leading-[1.04] font-medium tracking-[-0.04em] text-balance">
          {item.line}
        </p>
        <p className={cn("mt-5 max-w-md text-lg leading-[1.4] sm:text-xl", onBrand ? "text-white/80" : "text-muted-foreground")}>
          {item.text}
        </p>
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center rounded-2xl border p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] sm:p-7",
          onBrand ? "border-white/15 bg-black/25" : "border-white/10 bg-white/[0.04]"
        )}
      >
        <BeliefPicture picture={item.picture} />
      </div>
    </li>
  );
}

function BeliefPicture({ picture }: { picture: Belief["picture"] }) {
  switch (picture) {
    case "live":
      return <LivePicture />;
    case "own":
      return <OwnPicture />;
    case "honest":
      return <HonestPicture />;
    case "inside":
      return <InsidePicture />;
  }
}

/** Traffic bar heights (%) for the live system chart. */
const TRAFFIC = [38, 52, 44, 60, 48, 66, 58, 72, 54, 68, 80, 62, 74, 70, 86, 64, 78, 90, 72, 84];

/** "We stay until it runs": a live production system, with its traffic coming in. */
function LivePicture() {
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Production</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>
      </div>
      <div className="mt-6 flex h-32 items-end gap-1 sm:h-40 sm:gap-1.5">
        {TRAFFIC.map((height, index) => (
          <span
            key={index}
            style={{ height: `${height}%` }}
            className="flex-1 rounded-t-[3px] bg-linear-to-t from-p1/20 to-p1 shadow-[0_0_14px_-4px_var(--p-1)]"
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="rounded-full bg-white/[0.07] px-2.5 py-1">Real data</span>
        <span className="rounded-full bg-white/[0.07] px-2.5 py-1">Watched</span>
      </div>
    </div>
  );
}

const OWNED = ["Platform", "Data", "Servers", "Code"];

/** "You own all of it": the four things, each marked as yours. */
function OwnPicture() {
  return (
    <ul className="w-full max-w-sm divide-y divide-border">
      {OWNED.map((thing) => (
        <li key={thing} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
          <span className="grid size-8 place-items-center rounded-full bg-white/[0.07] text-brand">
            <KeyRoundIcon className="size-4" />
          </span>
          <span className="flex-1 font-medium">{thing}</span>
          <span className="rounded-full bg-p1/15 px-2.5 py-1 text-xs font-medium text-brand">Yours</span>
        </li>
      ))}
    </ul>
  );
}

/** "We tell you when it is no": cost is bigger than the return, so the answer is no. */
function HonestPicture() {
  return (
    <div className="w-full max-w-sm">
      <p className="text-sm font-medium">Should we build it?</p>
      <div className="mt-5 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground">Cost</p>
          <div className="mt-1.5 h-3 w-[88%] rounded-full bg-foreground/80" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Return</p>
          <div className="mt-1.5 h-3 w-[42%] rounded-full bg-p1" />
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <span className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">Yes</span>
        <span className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background">No, not yet</span>
      </div>
    </div>
  );
}

/** "We work inside your team": one of us among your people, inside your environment. */
function InsidePicture() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-dashed border-white/25 p-4 sm:p-5">
      <p className="text-xs text-white/70">Your environment</p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {[0, 1, 2, 3, 4, 5].map((seat) =>
          seat === 3 ? (
            <span
              key={seat}
              className="grid size-11 place-items-center rounded-full bg-white text-[0.7rem] font-semibold text-p1 ring-4 ring-white/20"
            >
              MnT
            </span>
          ) : (
            <span key={seat} className="grid size-11 place-items-center rounded-full bg-white/[0.08] text-foreground/55">
              <UserRoundIcon className="size-5" />
            </span>
          )
        )}
      </div>
      <div className="mt-4 flex gap-4 text-xs text-white/70">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-foreground/25" /> Your team
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-white" /> MnT
        </span>
      </div>
    </div>
  );
}
