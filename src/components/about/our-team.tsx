import { ArrowUpRightIcon } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { LinkedInMark } from "@/components/site/linkedin-mark";
import { aboutPage } from "@/content/site";
import { cn } from "@/lib/utils";

/*
 * About page: "Our team". Light section. Four cards of the same size, one per
 * person, in a single row on desktop. Text only (no photos, the user's choice):
 * the name and role, one short line, and along the bottom a LinkedIn button
 * with the MnT Future logo on the right. Cards lift a little on hover.
 * The first and last cards are the blue gradient; the two in between are white
 * with a thin blue gradient edge along the top. On tablets (two by two) the
 * blue cards sit corner to corner. Phones: one column.
 */

type Person = (typeof aboutPage.team.people)[number];

/** Which cards (by position) are blue. */
const BLUE_CARDS = [0, 3];

export function OurTeam() {
  const { team } = aboutPage;
  return (
    <section aria-labelledby="team-title" data-header-theme="light" className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <div>
            <p className="text-sm font-medium text-brand">{team.label}</p>
            <h2
              id="team-title"
              className="mt-3 font-heading text-[clamp(2.5rem,4.6vw,4.5rem)] leading-none font-medium tracking-[-0.04em]"
            >
              {team.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-[1.4] text-foreground sm:text-xl">{team.body}</p>
        </div>

        <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {team.people.map((person, index) => (
            <TeamCard key={`${person.name}-${index}`} person={person} blue={BLUE_CARDS.includes(index)} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function TeamCard({ person, blue }: { person: Person; blue: boolean }) {
  return (
    <li
      className={cn(
        "group relative flex min-h-[17rem] flex-col overflow-hidden rounded-[1.5rem] p-6 transition duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7",
        blue
          ? "bg-linear-150 from-p1 to-p2 text-white shadow-[0_30px_60px_-34px_rgb(15_45_100/0.7)]"
          : "border border-border bg-card shadow-[0_18px_40px_-32px_rgb(11_16_36/0.45)] hover:shadow-[0_30px_60px_-34px_rgb(11_16_36/0.5)]"
      )}
    >
      {blue ? (
        // A soft glow in the top corner.
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-16 size-56 rounded-full bg-white/15 blur-3xl"
        />
      ) : (
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-p1 to-p2" />
      )}

      <div className="relative pt-2">
        <h3 className="font-heading text-2xl leading-tight font-medium tracking-[-0.03em]">{person.name}</h3>
        <p className={cn("mt-2 text-sm font-medium", blue ? "text-white/80" : "text-brand")}>{person.role}</p>
      </div>
      <p className={cn("relative mt-5 leading-[1.45]", blue ? "text-white/80" : "text-muted-foreground")}>{person.line}</p>

      <div className="relative mt-auto flex items-center justify-between gap-3 pt-7">
        <LinkedInButton person={person} blue={blue} />
        <Logo tone={blue ? "dark" : "light"} className="h-4" />
      </div>
    </li>
  );
}

function LinkedInButton({ person, blue }: { person: Person; blue: boolean }) {
  const buttonClass = cn(
    "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors",
    blue ? "bg-white text-foreground" : "border border-border"
  );
  const content = (
    <>
      <LinkedInMark className="size-4 text-[#0a66c2]" />
      LinkedIn
      <ArrowUpRightIcon
        className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </>
  );
  // No LinkedIn link yet: the button shows, but does not link anywhere. Add the links before launch.
  if (!person.linkedin) {
    return <span className={cn(buttonClass, !blue && "text-muted-foreground")}>{content}</span>;
  }
  return (
    <a
      href={person.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${person.name} on LinkedIn (opens in a new tab)`}
      className={cn(
        buttonClass,
        blue ? "hover:bg-white/90" : "hover:border-foreground/30 hover:bg-tint-1",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      )}
    >
      {content}
    </a>
  );
}
