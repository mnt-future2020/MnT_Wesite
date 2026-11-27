import { ogContentType, ogImage, ogSize } from "@/lib/og-image";

/* This page's share picture (see src/lib/og-image.tsx). */
export const alt = "MnT Future insights";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Insights.", line: "Practical guides on AI, software and technology for growing businesses." });
}
