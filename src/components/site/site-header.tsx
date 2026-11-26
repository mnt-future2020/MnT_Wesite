import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { nav, primaryCta } from "@/content/site";
import { HeaderTheme } from "./header-theme";
import { MobileNav } from "./mobile-nav";

/**
 * Floating glass navigation bar. It turns dark or light to match the section under it.
 * Over dark sections it is a lighter glass with a clear edge, so it stands out from the black.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <HeaderTheme className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border border-border/70 bg-background/60 pr-2 pl-5 text-foreground shadow-[0_8px_32px_-12px_rgb(6_9_20/0.25)] backdrop-blur-xl transition-colors duration-300 data-[theme=dark]:border-white/15 data-[theme=dark]:bg-white/[0.07] data-[theme=dark]:shadow-[0_8px_32px_-12px_rgb(0_0_0/0.6),inset_0_1px_0_rgb(255_255_255/0.06)]">
        <Link
          href="/"
          aria-label="MnT Future home"
          className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Logo className="h-7" priority />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-base text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring dark:text-white dark:hover:bg-white/10"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href={primaryCta.href}
            className="hidden h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:inline-flex"
          >
            Book a session
          </Link>
          <MobileNav />
        </div>
      </HeaderTheme>
    </header>
  );
}
