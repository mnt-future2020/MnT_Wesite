"use client";

import { useSyncExternalStore } from "react";
import { PALETTE_KEYS, PALETTE_STORAGE_KEY, palettes, type PaletteId } from "./palettes";

/*
 * TEMPORARY: a small switch fixed at the bottom-left of every page that
 * flips the whole site between the colour palettes, so the senior can
 * compare them. The choice is remembered (localStorage) while browsing.
 */

const CHANGE_EVENT = "mnt-palette-change";
const IDS = Object.keys(palettes) as PaletteId[];

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

function currentPalette(): PaletteId {
  const id = document.documentElement.dataset.palette;
  return id && id in palettes ? (id as PaletteId) : "current";
}

function applyPalette(id: PaletteId) {
  const root = document.documentElement;
  for (const key of PALETTE_KEYS) root.style.removeProperty(key);
  const vars = palettes[id].vars;
  if (vars) for (const [key, value] of Object.entries(vars)) root.style.setProperty(key, value);
  if (id === "current") delete root.dataset.palette;
  else root.dataset.palette = id;
  try {
    localStorage.setItem(PALETTE_STORAGE_KEY, id);
  } catch {
    // Private browsing can block storage; the switch still works for this page.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function PaletteSwitch() {
  const active = useSyncExternalStore(subscribe, currentPalette, () => "current" as PaletteId);

  return (
    <div
      role="group"
      aria-label="Colour palette (for review)"
      className="fixed bottom-4 left-4 z-[70] flex items-center gap-1 rounded-full border border-black/10 bg-white/95 p-1 text-sm text-neutral-900 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.35)] backdrop-blur-md"
    >
      <span className="hidden pr-1 pl-3 font-medium text-neutral-500 sm:inline">Colours</span>
      {IDS.map((id) => {
        const palette = palettes[id];
        const selected = active === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={selected}
            onClick={() => applyPalette(id)}
            className={
              selected
                ? "flex h-9 items-center gap-2 rounded-full bg-neutral-900 px-3.5 font-medium text-white"
                : "flex h-9 items-center gap-2 rounded-full px-3.5 font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            }
          >
            <span aria-hidden="true" className="flex -space-x-1">
              {palette.swatch.map((colour) => (
                <span
                  key={colour}
                  className="size-3.5 rounded-full border border-white"
                  style={{ backgroundColor: colour }}
                />
              ))}
            </span>
            {palette.label}
          </button>
        );
      })}
    </div>
  );
}
