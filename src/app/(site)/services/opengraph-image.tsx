import { ogContentType, ogImage, ogSize } from "@/lib/og-image";

/* This page's share picture (see src/lib/og-image.tsx). */
export const alt = "MnT Future services";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Make your business run smarter.", line: "AI, custom software, apps, data, cloud and security services." });
}
