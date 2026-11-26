/**
 * TEMPORARY (2026-11-25): two colour palettes for the senior to compare.
 * Delete this file, palette-switch.tsx and the script in app/layout.tsx once
 * one is chosen, and copy the chosen values into the --p-* lines of globals.css.
 *
 * "current" is what globals.css already has, so it needs no values here.
 * "logo" is built from the MnT Future logo (public/brand/logo.png):
 *   logo blue #2095f1 ("MnT", the dots), indigo #3e51b6 (the shading in the "M"),
 *   grey #616569 ("Future").
 */

export type PaletteId = "current" | "logo";

export const PALETTE_STORAGE_KEY = "mnt-palette";

export const palettes: Record<
  PaletteId,
  { label: string; swatch: [string, string]; vars: Record<string, string> | null }
> = {
  current: {
    label: "Current",
    swatch: ["#3b5bff", "#7c3aed"],
    vars: null,
  },
  logo: {
    label: "MnT logo",
    swatch: ["#2095f1", "#0f2d64"],
    // Refined (2026-11-25): the first version's baby-blue panels and indigo/cyan looked flat
    // on light sections. Light sections now use the logo blue as an accent with deep navy
    // and soft neutral panels. Dark sections keep the logo blue + indigo the user liked.
    vars: {
      "--p-1": "#2095f1", // the logo blue
      "--p-1-text": "#1565c0", // a deeper shade of it, so small text stays readable on white
      "--p-1-light": "#64b5f6", // the logo blue lightened, for dark sections
      "--p-1-soft": "#bbdefb",
      "--p-2": "#0f2d64", // deep navy: gradients on light sections go logo blue -> navy
      "--p-2-light": "#9fb6e0",
      "--p-3": "#7cc0f7", // a soft sky blue from the logo blue (no cyan)
      "--p-3-light": "#b3dbfb",
      "--p-2-on-dark": "#3e51b6", // dark sections keep the logo indigo (they looked good)
      "--p-3-on-dark": "#64b5f6",
      // Soft see-through fills on light sections: the logo's own blue, indigo and a sky blue.
      // (Navy faded to 20% looks grey, which made "What we build" look muddy.)
      "--p-wash-1": "#2095f1",
      "--p-wash-2": "#3e51b6",
      "--p-wash-3": "#7cc0f7",
      "--p-tint-1": "#f3f6fa", // soft neutral panels instead of baby blue
      "--p-tint-2": "#eef2f7",
      "--p-tint-3": "#f6f8fb",
      "--p-ink": "#0c1a2e", // a deep navy in the logo's blue family, for text and buttons
    },
  },
};

/** Every variable any palette sets, so switching back can clear them all. */
export const PALETTE_KEYS = Array.from(
  new Set(Object.values(palettes).flatMap((p) => (p.vars ? Object.keys(p.vars) : [])))
);

/**
 * A tiny script for the page <head>: it applies the saved palette before the
 * page is painted, so there is no flash of the other colours on load.
 */
export const paletteScript = `(function(){try{var id=localStorage.getItem(${JSON.stringify(
  PALETTE_STORAGE_KEY
)});var all=${JSON.stringify(
  Object.fromEntries(Object.entries(palettes).map(([id, p]) => [id, p.vars]))
)};var vars=id&&all[id];if(!vars)return;var root=document.documentElement;for(var k in vars)root.style.setProperty(k,vars[k]);root.dataset.palette=id;}catch(e){}})();`;
