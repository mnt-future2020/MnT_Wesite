import type { MetadataRoute } from "next";
import { articles } from "@/content/insights";
import { siteUrl } from "@/content/site";

/*
 * The sitemap (/sitemap.xml): every page and every article, for Google.
 * New articles are added by themselves. Add new pages to `pages`.
 */
const pages = ["", "/services", "/work", "/about", "/insights", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/privacy" ? 0.3 : 0.8,
    })),
    ...articles.map((article) => ({
      url: `${siteUrl}/insights/${article.slug}`,
      lastModified: article.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
