"use client";

import { Suspense, useEffect } from "react";
import { AnimatePresence, MotionConfig, motion, useDragControls, type PanInfo } from "motion/react";
import { AskMntChat } from "./ask-mnt-chat";
import { AskMntNudges } from "./ask-mnt-nudges";
import { askMntSwitches } from "./config";
import { EASE, useIsDesktop } from "./hooks";
import { closeAskMnt, useAskMntPanel } from "./store";

/*
 * Ask MnT (DEMO, no AI yet; see config.ts).
 *   Desktop: the "Ask MnT" header button opens a tall panel on the right;
 *            the page stays visible and usable.
 *   Phones and tablets: the "Ask" header button opens a full-screen sheet from the bottom.
 *            Swipe it down by its top (the grab bar and the title row) to close it.
 *   Everywhere: two nudges, beside Our work and the FAQ.
 * "Reduce motion" on the visitor's device turns the movement off (MotionConfig "user").
 */
export function AskMnt() {
  if (!askMntSwitches.enabled) return null;
  return (
    <MotionConfig reducedMotion="user">
      <AskMntLayer />
    </MotionConfig>
  );
}

/** How far (px) or how fast (px/s) a downward swipe must go to close the phone sheet. */
const CLOSE_DISTANCE = 120;
const CLOSE_SPEED = 500;

/** The top part of the sheet (grab bar + title row) that starts a swipe, in px. */
const GRAB_ZONE = 96;

function AskMntLayer() {
  const { open } = useAskMntPanel();
  const isDesktop = useIsDesktop();
  const dragControls = useDragControls();

  // Phones: a swipe that starts on the top of the sheet drags it down; buttons there still work.
  function startSwipe(event: React.PointerEvent<HTMLElement>) {
    const target = event.target as Element;
    if (target.closest("button, a, input, textarea")) return;
    const top = event.currentTarget.getBoundingClientRect().top;
    if (event.clientY - top > GRAB_ZONE) return;
    dragControls.start(event);
  }

  function endSwipe(_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    if (info.offset.y > CLOSE_DISTANCE || info.velocity.y > CLOSE_SPEED) closeAskMnt();
  }

  // Esc closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAskMnt();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Phones: the page behind the sheet stays still.
  useEffect(() => {
    if (!open || isDesktop) return;
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = before;
    };
  }, [open, isDesktop]);

  return (
    <>
      {/* Desktop: the side panel, below the header. */}
      <AnimatePresence>
        {open && isDesktop ? (
          <motion.section
            key="panel"
            id="ask-mnt-panel"
            role="dialog"
            aria-labelledby="ask-mnt-title"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 32 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-21 right-5 bottom-5 z-40 flex w-100 flex-col overflow-hidden rounded-3xl border border-border bg-card text-foreground shadow-[0_24px_60px_-20px_rgb(12_26_46/0.35)]"
          >
            <AskMntChat variant="panel" />
          </motion.section>
        ) : null}
      </AnimatePresence>

      {/* Phones and tablets: a dimmed page and a sheet that slides up. */}
      <AnimatePresence>
        {open && !isDesktop ? (
          <motion.div
            key="scrim"
            aria-hidden="true"
            onClick={closeAskMnt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[65] bg-ink/40"
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {open && !isDesktop ? (
          <motion.section
            key="sheet"
            id="ask-mnt-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ask-mnt-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.38, ease: EASE }}
            // Swipe down to close: only from the top part (see startSwipe), so the chat still scrolls.
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 1 }}
            onDragEnd={endSwipe}
            onPointerDown={startSwipe}
            className="fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] bottom-0 z-[70] flex flex-col overflow-hidden rounded-t-[1.75rem] bg-card text-foreground shadow-[0_-20px_50px_-20px_rgb(12_26_46/0.4)]"
          >
            {/* The grab bar: a bigger invisible strip around it, easy to catch with a thumb. */}
            <div aria-hidden="true" className="flex h-5 shrink-0 cursor-grab touch-none items-end justify-center">
              <span className="h-1.5 w-10 rounded-full bg-border" />
            </div>
            <AskMntChat variant="sheet" />
          </motion.section>
        ) : null}
      </AnimatePresence>

      {/* The nudges read the page address; with Cache Components that needs a Suspense boundary. */}
      {askMntSwitches.nudges ? (
        <Suspense fallback={null}>
          <AskMntNudges />
        </Suspense>
      ) : null}
    </>
  );
}
