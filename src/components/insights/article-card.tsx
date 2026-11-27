import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { formatDate, insightsPage, readingMinutes, type Article } from "@/content/insights";
import { cn } from "@/lib/utils";

/*
 * Article cards for the Insights page and the "More insights" row: the article's
 * photo on top (zooming in gently on hover), then topic, date and reading time,
 * the title, two lines of summary and "Read article". All cards are the same
 * size. The whole card opens the article.
 */

export function ArticleMeta({ article, className }: { article: Article; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground", className)}>
      <span className="font-medium text-brand">{article.topic}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{readingMinutes(article)} min read</span>
    </p>
  );
}

const cardClass =
  "group overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-500 hover:shadow-[0_28px_64px_-35px_rgb(11_16_36/0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

function ReadMore() {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
      {insightsPage.readLabel}
      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </span>
  );
}

export function ArticleCard({ article, headingLevel = "h2" }: { article: Article; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link href={`/insights/${article.slug}`} className={cn(cardClass, "flex h-full flex-col")}>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(min-width: 1024px) 26rem, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <ArticleMeta article={article} />
        <Heading className="mt-3 font-heading text-[1.375rem] leading-snug font-medium tracking-[-0.02em] text-balance sm:text-2xl">
          {article.title}
        </Heading>
        <p className="mt-3 line-clamp-2 leading-[1.5] text-muted-foreground">{article.summary}</p>
        <div className="mt-auto pt-6">
          <ReadMore />
        </div>
      </div>
    </Link>
  );
}
