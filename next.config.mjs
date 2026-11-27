/*
 * Plain JavaScript on purpose (not next.config.ts).
 *
 * Hostinger's build server runs an older Linux, so Next.js cannot load its fast
 * built-in compiler there and uses a slower WebAssembly copy instead. That copy
 * cannot read a TypeScript config file, and it only works with the webpack
 * builder, which is why "build" in package.json says `next build --webpack`.
 * Tailwind is set up in postcss.config.mjs so it works with either builder.
 */

/** @type {import("next").NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
