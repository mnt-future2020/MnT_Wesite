"use client";

import { useLayoutEffect } from "react";
import { HeroBackdrop } from "@/components/site/hero-backdrop";

/*
 * Shown for a moment while an article loads (mostly the first time it is opened).
 * It jumps to the top straight away, so the reader does not first see the bottom of
 * the page (the footer) and then a jump; and it looks like the top of the article
 * (the soft glows, with grey lines where the title and summary will be), so the page
 * does not flash empty. It is as tall as the screen, so the footer stays out of view.
 */
export function ArticleLoading() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bar = "rounded-full bg-foreground/[0.07] motion-safe:animate-pulse";
  return (
    <div aria-busy="true" aria-label="Loading the article" className="min-h-svh">
      <div data-header-theme="light" className="relative isolate overflow-hidden bg-background">
        <HeroBackdrop />
        <div className="mx-auto max-w-3xl px-5 pt-28 pb-16 sm:px-8 sm:pt-40">
          <div className={`h-4 w-28 ${bar}`} />
          <div className={`mt-8 h-4 w-52 ${bar}`} />
          <div className={`mt-5 h-10 w-full sm:h-12 ${bar}`} />
          <div className={`mt-3 h-10 w-3/4 sm:h-12 ${bar}`} />
          <div className={`mt-8 h-5 w-full ${bar}`} />
          <div className={`mt-3 h-5 w-5/6 ${bar}`} />
        </div>
      </div>
    </div>
  );
}
