import Image from "next/image";
import logoOnLight from "../../../public/brand/logo.png";
import logoOnDark from "../../../public/brand/logo-on-dark.png";
import { cn } from "@/lib/utils";

/*
 * The MnT Future logo (public/brand).
 *   logo.png          blue "MnT" + grey "Future": for light backgrounds
 *   logo-on-dark.png  same, with "Future" in white: for dark backgrounds
 * The logo keeps its own colours whichever palette is chosen.
 * The favicon is the "M" on its own (src/app/icon.png).
 */

/**
 * The full logo. Set its height with className (for example "h-7").
 * tone "auto" shows the right version for the section it sits in
 * (it follows the `dark` class, like the floating header does).
 */
export function Logo({
  className,
  tone = "auto",
  priority = false,
}: {
  className?: string;
  tone?: "auto" | "light" | "dark";
  priority?: boolean;
}) {
  const image = (src: typeof logoOnLight, extra?: string) => (
    <Image
      src={src}
      alt="MnT Future"
      priority={priority}
      sizes="14rem"
      className={cn("h-full w-auto", extra)}
    />
  );
  return (
    <span className={cn("inline-flex h-7 shrink-0", className)}>
      {tone === "light" ? image(logoOnLight) : null}
      {tone === "dark" ? image(logoOnDark) : null}
      {tone === "auto" ? (
        <>
          {image(logoOnLight, "dark:hidden")}
          {image(logoOnDark, "hidden dark:block")}
        </>
      ) : null}
    </span>
  );
}
