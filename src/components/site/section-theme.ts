/**
 * Some page sections are full-width rounded cards (curved edges, no gaps at the
 * sides): Hero, How we work, FAQ and the footer.
 * What we build, Our work and Why MnT are plain. The small gaps between sections
 * (set on <main> in app/(site)/layout.tsx) show the page background, which is the
 * same light colour as the light sections, so only the dark cards' curves show.
 * "Book a session" is a smaller black box with light space around it.
 */
export const sectionCard = "rounded-[1.75rem] sm:rounded-[2.5rem]";

/**
 * Colours for the DARK sections of the page: neutral near-black.
 *
 * A dark section uses:
 *   className="dark bg-background text-foreground ..."
 *   style={nearBlack}
 *   data-header-theme="dark"
 *
 * The `dark` class gives the dark versions of every colour; these inline variables then
 * replace the navy-tinted ones with neutral near-black ones. They are set here, on the
 * section, rather than in globals.css, so they apply without restarting the dev server.
 */
export const nearBlack = {
  "--background": "#0a0b10",
  "--foreground": "#f2f3f6",
  "--card": "#121319",
  "--card-foreground": "#f2f3f6",
  "--muted": "#17181f",
  "--muted-foreground": "#a1a3ad",
  "--secondary": "#17181f",
  "--accent": "#17181f",
  "--border": "rgb(255 255 255 / 0.09)",
  "--input": "rgb(255 255 255 / 0.12)",
  "--primary": "#f4f5f8",
  "--primary-foreground": "#0a0b10",
  "--ring": "var(--p-1-light)",
  "--brand": "var(--p-1-light)",
  // Dark sections can use a different second/third colour from light ones (see globals.css).
  "--p-2": "var(--p-2-on-dark)",
  "--p-3": "var(--p-3-on-dark)",
} as React.CSSProperties;
