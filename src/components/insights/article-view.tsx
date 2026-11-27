import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { HeroBackdrop } from "@/components/site/hero-backdrop";
import { primaryCta } from "@/content/site";
import { articleData, JsonLd } from "@/lib/structured-data";
import { articles, insightsPage, type Article } from "@/content/insights";
import { ArticleBody } from "./article-body";
import { ArticleCard, ArticleMeta } from "./article-card";

/*
 * One article, to read:
 *   - top (light, with the soft glows): back to all insights, topic, date and
 *     reading time, the title and the summary (no picture, the user's choice);
 *   - the text in an easy-to-read column;
 *   - a dark card: talk to us about this (Book a free strategy session);
 *   - "More insights": the other articles as cards.
 */

export function ArticleView({ article }: { article: Article }) {
  const others = articles.filter((other) => other.slug !== article.slug).slice(0, 3);
  return (
    <article>
      {/* The article's details for Google. */}
      <JsonLd data={articleData(article)} />
      <header
        data-header-theme="light"
        className="relative isolate overflow-hidden bg-background text-foreground"
      >
        <HeroBackdrop />
        <div className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/insights"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              {insightsPage.backLabel}
            </Link>
            <ArticleMeta article={article} className="mt-8" />
            <h1 className="mt-4 font-heading text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.05] font-medium tracking-[-0.035em] text-balance">
              {article.title}
            </h1>
            <p className="mt-6 text-lg leading-[1.5] text-muted-foreground sm:text-xl">{article.summary}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 pb-16 sm:px-8 sm:pb-20">
        <hr className="mt-10 mb-10 border-border sm:mt-12 sm:mb-12" />
        <ArticleBody body={article.body} />

        {/* Talk to us about this. */}
        <aside className="relative mt-16 overflow-hidden rounded-[1.75rem] bg-[#0a0b10] p-7 text-white sm:p-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-28 size-80 rounded-full bg-p1/35 blur-3xl"
          />
          <p className="relative font-heading text-2xl leading-tight font-medium tracking-[-0.02em] sm:text-3xl">
            {insightsPage.cta.title}
          </p>
          <p className="relative mt-3 max-w-xl leading-[1.5] text-white/70">{insightsPage.cta.text}</p>
          <Link
            href={primaryCta.href}
            className="group relative mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-medium text-ink transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {primaryCta.label}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </aside>
      </div>

      {others.length ? (
        <section aria-labelledby="more-insights-title" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <h2
            id="more-insights-title"
            className="border-t border-border pt-12 font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-medium tracking-[-0.03em]"
          >
            {insightsPage.moreTitle}
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <ArticleCard article={other} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
