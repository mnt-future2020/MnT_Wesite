import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticleLoading } from "@/components/insights/article-loading";
import { ArticleView } from "@/components/insights/article-view";
import { articles, getArticle } from "@/content/insights";

type Props = { params: Promise<{ slug: string }> };

/** Every article is built ahead of time. */
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

/** Each article's own Google title, description and link preview. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Insights" };
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      publishedTime: article.date,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

/*
 * One article. The address is read inside <Suspense>, as Next.js 16 asks when
 * Partial Prefetching is on (see next.config): the listed articles are still
 * built in full ahead of time. An unknown address shows the "not found" page.
 */
export default function ArticlePage({ params }: Props) {
  return (
    <Suspense fallback={<ArticleLoading />}>
      <Article params={params} />
    </Suspense>
  );
}

async function Article({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
