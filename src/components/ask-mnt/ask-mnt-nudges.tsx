"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRightIcon, XIcon } from "lucide-react";
import { askMntNudges, askMntText, type Nudge } from "./config";
import { EASE } from "./hooks";
import { getAskMntPanel, openAskMnt, useAskMntPanel } from "./store";

const SHOW_AFTER = 700; // ms after the section reaches the middle of the screen
const SHOW_FOR = 9000; // then it slides away by itself

// Each nudge shows once per page load: moving between pages does not bring it back,
// but refreshing the page does (easy to show in the demo). For the real site this can
// become once per visit by remembering it in sessionStorage instead.
const seenThisLoad = new Set<string>();
const seen = (id: string) => seenThisLoad.has(id);
const markSeen = (id: string) => {
  seenThisLoad.add(id);
};

/**
 * Small pop-ups: "Want something like this? [Ask MnT]" beside Our work, and
 * "Still have a question? [Ask MnT]" beside the FAQ. Each appears once per page load,
 * when its section reaches the middle of the screen, and slides away after a few
 * seconds, when the section leaves, or when closed.
 */
export function AskMntNudges() {
  const pathname = usePathname();
  const { open } = useAskMntPanel();
  const instant = useReducedMotion() ?? false;
  const [shown, setShown] = useState<{ nudge: Nudge; path: string } | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const showTimers = new Map<string, ReturnType<typeof setTimeout>>();
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    for (const nudge of askMntNudges) {
      const section = document.getElementById(nudge.sectionId);
      if (!section) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (seen(nudge.id)) return;
            showTimers.set(
              nudge.id,
              setTimeout(() => {
                if (getAskMntPanel().open) return;
                markSeen(nudge.id);
                setShown({ nudge, path: window.location.pathname });
                clearTimeout(hideTimer);
                hideTimer = setTimeout(
                  () => setShown((current) => (current?.nudge.id === nudge.id ? null : current)),
                  SHOW_FOR
                );
              }, SHOW_AFTER)
            );
          } else {
            clearTimeout(showTimers.get(nudge.id));
            setShown((current) => (current?.nudge.id === nudge.id ? null : current));
          }
        },
        // "In view" means the section crosses the middle band of the screen.
        { rootMargin: "-45% 0px -45% 0px" }
      );
      observer.observe(section);
      observers.push(observer);
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
      showTimers.forEach((timer) => clearTimeout(timer));
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  // Hidden while the panel is open, and never carried over to another page.
  const nudge = shown && shown.path === pathname && !open ? shown.nudge : null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 lg:bottom-6">
      <AnimatePresence>
        {nudge ? (
          <motion.div
            key={nudge.id}
            role="status"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="pointer-events-auto flex max-w-full items-center gap-1 rounded-full border border-border bg-card/95 py-1.5 pr-1.5 pl-4 text-foreground shadow-[0_16px_40px_-16px_rgb(12_26_46/0.4)] backdrop-blur-xl"
          >
            <span className="mr-2 truncate text-sm">{nudge.text}</span>
            <button
              type="button"
              onClick={() => {
                setShown(null);
                openAskMnt("nudge", nudge.question, instant);
              }}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {askMntText.nudgeAction}
              <ArrowRightIcon className="size-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setShown(null)}
              aria-label={askMntText.nudgeDismiss}
              className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
