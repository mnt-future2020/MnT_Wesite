import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
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
    default: "MnT Future: Enterprise AI, custom software and digital transformation",
    template: "%s | MnT Future",
  },
  description:
    "MnT Future builds enterprise AI, custom software, voice AI, SaaS, web and mobile apps, integrations, data, cloud and security solutions. Enterprise Technology. Intelligent Transformation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${googleSans.variable} h-full antialiased`}>
      {/* The page background (set in globals.css) is the same light colour as the light sections,
          so the gaps between section cards blend into them. */}
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
