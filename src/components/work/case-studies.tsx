import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { primaryCta, workPage } from "@/content/site";
import { cn } from "@/lib/utils";

/*
 * Work page: every project in one bento grid, light on text (deliberately not
 * the Services page's style). Each card is mostly the client's real website,
 * with its name and industry underneath; the whole card opens the live site.
 *
 * The first project (iSuite AI) is larger: on desktop it takes two columns and
 * two rows, with two small cards stacked beside it and the rest in rows of three
 * below. With five projects the last desktop row has one free space, so a dark
 * "Your project could be next" tile fills it (desktop only: on tablets and
 * phones the grid is already even). Tablets: iSuite spans the full width, the
 * rest two to a row. Phones: one card under another.
 */

type Project = (typeof workPage.projects.items)[number];

export function CaseStudies() {
  const { projects } = workPage;
  return (
    <section aria-labelledby="case-studies-title" data-header-theme="light" className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="text-sm font-medium text-brand">{projects.label}</p>
        <h2
          id="case-studies-title"
          className="mt-3 font-heading text-[clamp(2.5rem,4.6vw,4.5rem)] leading-none font-medium tracking-[-0.04em]"
        >
          {projects.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <ul className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((project, index) => (
            <li key={project.client} className={cn(index === 0 && "md:col-span-2 lg:row-span-2")}>
              <ProjectCard project={project} large={index === 0} />
            </li>
          ))}
          <li className="hidden lg:block">
            {/* Near-black like the dark sections, so it stands apart from the light project cards. */}
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#0a0b10] p-7 text-white">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -bottom-24 size-72 rounded-full bg-p1/35 blur-3xl"
              />
              <p className="relative font-heading text-[1.75rem] leading-[1.1] font-medium tracking-[-0.03em] text-balance">
                {projects.next.title}
              </p>
              <p className="relative mt-3 leading-[1.45] text-white/70">{projects.next.text}</p>
              <Link
                href={primaryCta.href}
                className="group relative mt-auto inline-flex h-11 items-center gap-2 self-start rounded-full bg-white px-5 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {primaryCta.label}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project, large }: { project: Project; large: boolean }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-500 hover:shadow-[0_28px_64px_-35px_rgb(11_16_36/0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      {/* The website: its top part, zooming in gently on hover. The large card's picture
          fills whatever height its two rows give it on desktop. */}
      <div
        className={cn(
          "relative overflow-hidden border-b border-border bg-muted",
          large ? "aspect-[16/10] md:aspect-[21/9] lg:aspect-auto lg:min-h-0 lg:flex-1" : "aspect-[16/10]"
        )}
      >
        <Image
          src={project.image}
          alt={`The ${project.client} website`}
          fill
          sizes={large ? "(min-width: 1024px) 52rem, 100vw" : "(min-width: 1024px) 26rem, (min-width: 768px) 50vw, 100vw"}
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </div>

      {/* Name and industry (and one line on the large card); the arrow turns dark on hover. */}
      <div className={cn("flex items-center justify-between gap-4", large ? "px-6 py-5 sm:px-7 sm:py-6" : "px-5 py-4")}>
        <div className="min-w-0">
          <p
            className={cn(
              "font-heading leading-tight font-medium tracking-[-0.02em]",
              large ? "text-[clamp(1.5rem,2.4vw,2.25rem)]" : "truncate text-lg"
            )}
          >
            {project.client}
          </p>
          <p className={cn("mt-1 text-sm text-muted-foreground", !large && "truncate")}>{project.label}</p>
          {project.line ? <p className="mt-2 leading-[1.4] text-foreground/75">{project.line}</p> : null}
        </div>
        <span
          className={cn(
            "grid shrink-0 place-items-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground",
            large ? "size-12" : "size-10"
          )}
        >
          <ArrowUpRightIcon className={large ? "size-5" : "size-4"} aria-hidden="true" />
        </span>
        <span className="sr-only">(opens {project.domain} in a new tab)</span>
      </div>
    </a>
  );
}
