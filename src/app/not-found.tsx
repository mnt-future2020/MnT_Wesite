import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { HeroBackdrop } from "@/components/site/hero-backdrop";
import { SiteShell } from "@/components/site/site-shell";
import { notFoundPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
};

/*
 * "Page not found" (404): shown for any address that does not exist, and for an
 * article address that is not in the list. It brings its own header and footer
 * (SiteShell), because it sits outside the site layout.
 * Light, with the soft glows and a huge faint "404" behind the text. A short
 * line, "Back to home", and links to the main pages.
 */
export default function NotFound() {
  return (
    <SiteShell>
      <section
        aria-labelledby="not-found-title"
        data-header-theme="light"
        className="relative isolate flex min-h-[min(48rem,88svh)] items-center overflow-hidden rounded-b-[1.75rem] bg-background text-foreground sm:rounded-b-[2.5rem]"
      >
        <HeroBackdrop />
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-center font-heading text-[clamp(10rem,34vw,30rem)] leading-none font-medium tracking-[-0.06em] select-none"
        >
          <span className="bg-linear-to-b from-p1/14 to-p1/[0.02] bg-clip-text text-transparent">404</span>
        </p>

        <div className="mx-auto w-full max-w-7xl px-5 pt-28 pb-16 text-center sm:px-8 sm:pt-36">
          <p className="text-sm font-medium text-brand">{notFoundPage.label}</p>
          <h1
            id="not-found-title"
            className="mx-auto mt-4 max-w-3xl font-heading text-[clamp(2.5rem,5.4vw,5rem)] leading-none font-medium tracking-[-0.04em] text-balance"
          >
            {notFoundPage.title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-[1.45] text-muted-foreground sm:text-xl">
            {notFoundPage.body}
          </p>

          <Link
            href="/"
            className="group mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {notFoundPage.home}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          <nav aria-label="Main pages" className="mt-12">
            <p className="text-sm text-muted-foreground">{notFoundPage.linksLead}</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {notFoundPage.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex h-10 items-center rounded-full border border-border bg-card/70 px-4 text-sm font-medium backdrop-blur-sm transition-colors hover:border-foreground/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </SiteShell>
  );
}
