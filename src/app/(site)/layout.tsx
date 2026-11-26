import { PaletteSwitch } from "@/components/site/palette-switch";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
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
      {/* TEMPORARY: colour palette switch for the senior's review. */}
      <PaletteSwitch />
    </>
  );
}
