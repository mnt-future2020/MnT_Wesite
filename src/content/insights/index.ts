import { aiCallsAndMessages } from "./ai-calls-and-messages";
import { chooseSoftwareCompany } from "./choose-software-company";
import { keepBusinessDataSafe } from "./keep-business-data-safe";
import { outgrownSpreadsheets } from "./outgrown-spreadsheets";
import { planBeforeBuildingAnApp } from "./plan-before-building-an-app";
import { readymadeOrCustomSoftware } from "./readymade-or-custom-software";

/*
 * Insights: the company's articles. IT topics tied to our services, written for
 * business owners in plain words (not company news).
 *
 * TO ADD AN ARTICLE: copy one of the article files in this folder, change its
 * details and text, put its photo in public/insights/, and add it to the
 * `articles` list below. The Insights page, the article's own page
 * (/insights/<slug>), its Google title and its reading time all come from that
 * file.
 *
 * Photos: free-to-use photos from Unsplash (Unsplash License: free for business
 * use, no credit required; the source is noted in each article file). About
 * 1600px wide, landscape. Not AI-made images (the user found them fake-looking).
 *
 * The text (`body`) is written like a simple document:
 *   ## A heading           ### A smaller heading
 *   - a bullet point       1. a numbered point
 *   > a highlighted line   **bold words**   [link text](/contact)
 * Leave an empty line between paragraphs, headings and lists.
 *
 * The six articles below are DRAFTS for the senior to check. Set each `date`
 * to the day it is really published.
 */

export type Article = {
  /** The end of the article's address: /insights/<slug>. Lowercase words joined by dashes. */
  slug: string;
  title: string;
  /** One or two sentences: shown on the card, under the title, and to Google. */
  summary: string;
  /** One or two words for the small label (AI, Software, Data, Cloud ...). */
  topic: string;
  /** Publishing date, written as YYYY-MM-DD. */
  date: string;
  /** The card's photo, in public/insights/ (for example "/insights/my-article.jpg"). */
  image: string;
  /** What the photo shows, in a few words (read out by screen readers). */
  imageAlt: string;
  body: string;
};

/** Every article. The newest date comes first on the Insights page. */
export const articles: Article[] = [
  aiCallsAndMessages,
  readymadeOrCustomSoftware,
  outgrownSpreadsheets,
  planBeforeBuildingAnApp,
  keepBusinessDataSafe,
  chooseSoftwareCompany,
].sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/** Reading time in minutes, from the number of words (about 200 words a minute). */
export function readingMinutes(article: Article): number {
  const words = article.body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** "2026-11-27" -> "27 Nov 2026". */
export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`)
  );
}

/** The Insights page's own heading and line. */
export const insightsPage = {
  titleLines: ["Insights."],
  body: "Practical guides on AI, software and technology for growing businesses.",
  readLabel: "Read article",
  moreTitle: "More insights",
  backLabel: "All insights",
  /** The dark card at the end of every article. */
  cta: {
    title: "Want to talk about this for your business?",
    text: "Meet our team for free and get a clear written plan.",
  },
};
