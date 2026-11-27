import { ogContentType, ogImage, ogSize } from "@/lib/og-image";

/* This page's share picture (see src/lib/og-image.tsx). */
export const alt = "MnT Future: enterprise technology, intelligent transformation";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Enterprise technology. Intelligent transformation.", line: "Enterprise AI, custom software and digital transformation solutions." });
}
