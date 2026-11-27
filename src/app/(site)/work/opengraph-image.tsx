import { ogContentType, ogImage, ogSize } from "@/lib/og-image";

/* This page's share picture (see src/lib/og-image.tsx). */
export const alt = "MnT Future work";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Real platforms, still running.", line: "Websites, online stores and business software we have built." });
}
