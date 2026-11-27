import { AskMnt } from "@/components/ask-mnt/ask-mnt"; // Ask MnT (demo): remove this line and <AskMnt /> below to take it out
import { SamePageScroll } from "./same-page-scroll";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * The frame around every page: skip link, floating header, the page itself,
 * footer. Used by the site layout and by the "page not found" page, so both
 * look the same.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      {/* The small gaps between sections (none at the sides). */}
      <main id="main" className="flex flex-1 flex-col gap-2 sm:gap-3">
        {children}
      </main>
      <SiteFooter />
      {/* A link to the page you are already on scrolls back to the top. */}
      <SamePageScroll />
      {/* Ask MnT (demo): the side panel / phone sheet and the nudges. */}
      <AskMnt />
    </>
  );
}
