"use client";

import { useEffect } from "react";

/*
 * Clicking a link to the page you are already on (for example "About us" in the
 * navbar or footer while on the About page) should take you back to the top.
 * Next.js does nothing in that case, because the page has not changed, so this
 * listens for clicks on any such link and scrolls to the top smoothly.
 *
 * Links to another page are left to Next.js (they already open at the top), and
 * so are links to a section of the page (a "#..." link such as /services#ways).
 * Links clicked inside the phone menu wait until the menu has closed, because an
 * open menu holds the page still.
 */

/** How long the phone menu takes to close and let the page move again. */
const MENU_CLOSE_MS = 350;

export function SamePageScroll() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      // Only plain left clicks: Ctrl/Cmd/Shift-click opens a new tab or window instead.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.target && link.target !== "_self") return;

      const url = new URL(link.href, window.location.href);
      const samePage =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        !url.hash;
      if (!samePage) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const toTop = () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      if (link.closest('[role="dialog"]')) window.setTimeout(toTop, MENU_CLOSE_MS);
      else toTop();
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
