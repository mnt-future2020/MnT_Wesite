"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { nearBlack } from "./section-theme";

/**
 * Makes the floating header match the section underneath it.
 * Each page section declares data-header-theme="dark" or "light".
 * Over a dark section the header gets the `dark` class, the same near-black
 * colours as the dark sections, and data-theme="dark" (for its own dark look).
 */
const HEADER_LINE = 40; // px from the top of the window, roughly the header's middle

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

function sectionThemeUnderHeader(): "dark" | "light" {
  // Sections are separate cards with small gaps between them. Use the last section whose
  // top has passed the header line: the one under the header, or (in a gap) the one just above.
  const sections = document.querySelectorAll<HTMLElement>("[data-header-theme]");
  let theme: "dark" | "light" = "light";
  for (const section of sections) {
    if (section.getBoundingClientRect().top > HEADER_LINE) break;
    theme = section.dataset.headerTheme === "dark" ? "dark" : "light";
  }
  return theme;
}

export function HeaderTheme({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  // The homepage opens on a light hero, so the server render starts light.
  const theme = useSyncExternalStore(subscribe, sectionThemeUnderHeader, () => "light" as const);

  const isDark = theme === "dark";
  return (
    <div data-theme={theme} style={isDark ? nearBlack : undefined} className={cn(isDark && "dark", className)}>
      {children}
    </div>
  );
}
