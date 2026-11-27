"use client";

import { askMntSwitches, askMntText } from "./config";
import { closeAskMnt, openAskMnt, useAskMntPanel } from "./store";

/** The "Ask MnT" button in the floating header ("Ask" on phones). Opens and closes the panel. */
export function AskMntButton() {
  const { open } = useAskMntPanel();
  if (!askMntSwitches.enabled) return null;

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls="ask-mnt-panel"
      onClick={() => (open ? closeAskMnt() : openAskMnt("button"))}
      // Plain outline, so "Book a session" stays the main button. The colours follow the
      // header, which turns dark over dark sections.
      className="mr-1 inline-flex h-10 items-center rounded-full border border-foreground/15 px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span className="sm:hidden">{askMntText.shortName}</span>
      <span className="max-sm:hidden">{askMntText.name}</span>
    </button>
  );
}
