import type { Article } from "@/content/insights";
import { company, siteUrl } from "@/content/site";

/*
 * Hidden details for Google (schema.org "structured data"), so it can show the
 * company and the articles properly in search. Only details the user gave: no
 * phone number until the company sends it.
 */

/** Puts the details in the page as a JSON-LD script. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so the text can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const publisher = {
  "@type": "Organization",
  name: company.name,
  url: siteUrl,
  logo: `${siteUrl}/brand/logo.png`,
};

/** The company: shown on the homepage. */
export const organizationData = {
  "@context": "https://schema.org",
  ...publisher,
  legalName: company.legalName,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.region,
    addressCountry: "IN",
  },
  sameAs: company.socials.map((social) => social.href),
};

/** One article: shown on its page. */
export function articleData(article: Article) {
  const url = `${siteUrl}/insights/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    image: `${siteUrl}${article.image}`,
    datePublished: article.date,
    dateModified: article.date,
    author: publisher,
    publisher,
    mainEntityOfPage: url,
    url,
  };
}
