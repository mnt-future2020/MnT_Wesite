import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

/* The robots file (/robots.txt): search engines may read the whole site, and here is the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
