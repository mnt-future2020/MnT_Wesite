import { ogContentType, ogImage, ogSize } from "@/lib/og-image";

/* This page's share picture (see src/lib/og-image.tsx). */
export const alt = "About MnT Future";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "We build it. We stay until it runs.", line: "A technology company in Madurai, India." });
}
