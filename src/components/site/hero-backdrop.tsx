import { laptopGlowA, laptopGlowB } from "./hero-glow";

/**
 * The soft background at the top of inner pages: the two corner glows (blue and
 * lavender, sized for laptops too), the faint dots, and a fade into the page at
 * the bottom. Put it first inside a `relative isolate overflow-hidden` section.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="hero-anim pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className={`hero-blob hero-blob-a ${laptopGlowA}`} />
      <div className={`hero-blob hero-blob-b ${laptopGlowB}`} />
      <div className="hero-dots" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
    </div>
  );
}
