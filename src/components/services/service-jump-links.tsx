"use client";

import { ArrowDownIcon } from "lucide-react";
import { serviceGroups } from "@/content/site";

/*
 * The Services hero's quick links to the four groups. A click scrolls smoothly
 * down to the group (instantly for people who turned animations off) and puts
 * the group in the address bar, so the link can still be shared.
 */

export function ServiceJumpLinks() {
  function jump(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    // Phones and tablets: two by two (phones show the short names, so each fits on one line).
    // Desktop: one row of four.
    <nav aria-label="Services on this page">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {serviceGroups.map((group) => (
          <li key={group.id}>
            <a
              href={`#${group.id}`}
              onClick={(event) => jump(event, group.id)}
              className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <span className="flex items-center gap-2 font-heading text-[clamp(1.25rem,2vw,1.75rem)] leading-tight font-medium tracking-[-0.03em] transition-colors group-hover:text-brand">
                <span className="sm:hidden">{group.tabShort}</span>
                <span className="max-sm:hidden">{group.tab}</span>
                <ArrowDownIcon
                  className="size-[0.8em] shrink-0 text-muted-foreground transition-[color,translate] group-hover:translate-y-0.5 group-hover:text-brand"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-2 block text-sm leading-snug text-muted-foreground sm:text-base">{group.short}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
