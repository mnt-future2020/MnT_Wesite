import { useSyncExternalStore } from "react";

/** The site's usual easing curve: quick start, soft landing. */
export const EASE = [0.16, 1, 0.3, 1] as const;

const DESKTOP = "(min-width: 1024px)";

function subscribeToScreen(onChange: () => void) {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** True on desktops and laptops (1024px and wider), the same breakpoint as the rest of the site. */
export function useIsDesktop() {
  return useSyncExternalStore(
    subscribeToScreen,
    () => window.matchMedia(DESKTOP).matches,
    () => false
  );
}
