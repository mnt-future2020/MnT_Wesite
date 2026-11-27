import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ArticleCard } from "@/components/insights/article-card";
import { HeroBackdrop } from "@/components/site/hero-backdrop";
import { articles, insightsPage } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  alternates: { canonical: "/insights" },
  description: insightsPage.body,
};

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/*
 * Insights page: one light section with the soft glows at the top. The heading
 * and one line, then every article as a same-size card, newest first: three to a
 * row on desktop, two on tablets, one on phones. No wide featured card, filters
 * or labels (the user's choice).
 */
export default function InsightsPage() {
  return (
    <section
      aria-labelledby="insights-title"
      data-header-theme="light"
      className="relative isolate overflow-hidden rounded-b-[1.75rem] bg-background text-foreground sm:rounded-b-[2.5rem]"
    >
      <HeroBackdrop />

      <div className="mx-auto max-w-7xl px-5 pt-28 pb-20 sm:px-8 sm:pt-40 sm:pb-28">
        <h1
          id="insights-title"
          className="hero-rise font-heading text-[clamp(2.75rem,6.2vw,6rem)] leading-none font-medium tracking-[-0.04em]"
          style={delay(0)}
        >
          {insightsPage.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="hero-rise mt-7 max-w-2xl text-lg leading-[1.4] sm:text-xl" style={delay(200)}>
          {insightsPage.body}
        </p>

        <ul className="hero-rise mt-14 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3" style={delay(320)}>
          {articles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
