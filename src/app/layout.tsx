import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import { paletteScript } from "@/components/site/palettes";
import "./globals.css";

/**
 * Google Sans (open source on Google Fonts) for headings and body text alike.
 * Next.js has no size measurements for Google Sans yet, so it cannot build its automatic
 * size-matched stand-in font (it warned "Failed to find font override values"). The
 * stand-in is switched off and named here instead: the system font shows for a moment
 * while Google Sans loads.
 */
const googleSans = Google_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mntfuture.com"),
  title: {
    default: "MnT Future: commerce platforms and AI systems you own",
    template: "%s | MnT Future",
  },
  description:
    "MnT Future builds commerce platforms you own, AI agents and automation that reach production, and ready applications we brand and customise. Senior engineers only.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the palette script below may set colour variables on <html>
    // before React loads (TEMPORARY, with the palette switch).
    <html lang="en" className={`${googleSans.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: paletteScript }} />
      </head>
      {/* The page background (set in globals.css) is the same light colour as the light sections,
          so the gaps between section cards blend into them. */}
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
