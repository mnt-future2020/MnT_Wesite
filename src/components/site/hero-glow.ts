/*
 * Laptop-size hero glows.
 *
 * The hero glows (.hero-blob-a/-b/-c in globals.css) have fixed sizes (44rem,
 * 38rem, 30rem). On the user's desktop they light the corners and leave the
 * middle white; on a smaller laptop screen the same fixed sizes cover much more
 * of the width, so the blue and lavender run together and tint the whole hero
 * (the user: "for desktop it is looking good but in laptop the colour is merged").
 *
 * These classes make the glows scale with the screen width between 1024px and
 * 1799px, in the same proportions as on a 1920px-wide desktop, with a floor so
 * they never get too small. Screens 1800px and wider (the user's desktop) keep
 * the original sizes EXACTLY: the desktop look must not change (a first try
 * scaled up to 2559px and changed the user's desktop). Phones and tablets keep
 * their own sizes from globals.css (these classes start at 1024px).
 *
 * They are Tailwind classes with `!` (important) because the glow sizes in
 * globals.css are plain CSS, which would otherwise win.
 */

export const laptopGlowA =
  "lg:max-[1799px]:size-[clamp(28rem,36.67vw,44rem)]! lg:max-[1799px]:left-[clamp(-12rem,-10vw,-6rem)]! lg:max-[1799px]:top-[clamp(-14rem,-11.67vw,-7rem)]! lg:max-[1799px]:blur-[clamp(56px,4.17vw,80px)]!";

export const laptopGlowB =
  "lg:max-[1799px]:size-[clamp(24rem,31.67vw,38rem)]! lg:max-[1799px]:right-[clamp(-10rem,-8.33vw,-5rem)]! lg:max-[1799px]:top-[clamp(-8rem,-6.67vw,-4rem)]! lg:max-[1799px]:blur-[clamp(56px,4.17vw,80px)]!";

export const laptopGlowC =
  "lg:max-[1799px]:size-[clamp(18rem,25vw,30rem)]! lg:max-[1799px]:blur-[clamp(56px,4.17vw,80px)]!";
