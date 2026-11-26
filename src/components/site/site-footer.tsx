import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRightIcon } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { nearBlack } from "@/components/site/section-theme";
import { company, footer } from "@/content/site";

/*
 * Site footer, DARK (near-black). Tagline and email on top, the four link
 * columns in the middle, a thin copyright bar, and "MnT Future" written huge
 * across the full width at the very bottom in a faint tone.
 */
export function SiteFooter() {
  return (
    <footer
      data-header-theme="dark"
      style={nearBlack}
      // The last thing on the page: only the top corners are rounded, so it sits flush with the bottom.
      className="dark relative mt-2 overflow-hidden rounded-t-[1.75rem] bg-background text-foreground sm:mt-3 sm:rounded-t-[2.5rem]"
    >
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 lg:pt-24">
        {/* Top: who we are, and how to reach us. */}
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <Link
              href="/"
              aria-label={`${company.name} home`}
              className="inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <Logo tone="dark" className="h-9" />
            </Link>
            <p className="mt-6 max-w-xl font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.03em] text-balance">
              {footer.tagline}
            </p>
          </div>
          <div className="lg:justify-self-end">
            <p className="text-sm text-muted-foreground">Email us</p>
            <a
              href={`mailto:${company.email}`}
              className="group mt-2 inline-flex items-center gap-2 font-heading text-2xl font-medium tracking-[-0.02em] transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-3xl"
            >
              {company.email}
              <ArrowUpRightIcon
                className="size-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <p className="mt-3 text-base text-muted-foreground">{company.base}</p>
          </div>
        </div>

        {/* Middle: the four link columns. */}
        <nav aria-label="Footer" className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-12 sm:grid-cols-4">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-medium text-foreground">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Copyright and social links. */}
        <div className="mt-14 flex flex-col gap-4 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {company.name} · {company.legalName}
          </p>
          <ul className="flex gap-6">
            {company.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                  <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The giant wordmark: full width, faint, slightly cut off at the bottom. */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.2em] text-center font-heading text-[clamp(3.5rem,16vw,18rem)] leading-none font-medium tracking-[-0.05em] whitespace-nowrap select-none"
      >
        <span className="bg-linear-to-b from-white/16 to-white/[0.02] bg-clip-text text-transparent">
          {company.name}
        </span>
      </p>
    </footer>
  );
}

/**
 * The current year. Cached for a day, because the page is pre-built and
 * reading the clock directly during a pre-build is not allowed.
 */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
