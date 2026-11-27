import type { Metadata } from "next";
import { ArticleBody } from "@/components/insights/article-body";
import { HeroBackdrop } from "@/components/site/hero-backdrop";
import { formatDate } from "@/content/insights";
import { privacyPage } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/privacy" },
  description: privacyPage.intro,
};

/*
 * Privacy policy: a short light top with the soft glows (title, one line, last
 * updated), then the policy in the same easy-to-read column as the Insights
 * articles. The text is in src/content/privacy.ts (a DRAFT to be checked).
 */
export default function PrivacyPage() {
  return (
    <article>
      <header data-header-theme="light" className="relative isolate overflow-hidden bg-background text-foreground">
        <HeroBackdrop />
        <div className="mx-auto max-w-3xl px-5 pt-28 sm:px-8 sm:pt-40">
          <h1 className="font-heading text-[clamp(2.5rem,5.4vw,4.5rem)] leading-none font-medium tracking-[-0.04em]">
            {privacyPage.title}
          </h1>
          <p className="mt-6 text-lg leading-[1.5] text-muted-foreground sm:text-xl">{privacyPage.intro}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            {privacyPage.updatedLabel}: <time dateTime={privacyPage.updated}>{formatDate(privacyPage.updated)}</time>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 pb-20 sm:px-8 sm:pb-28">
        <hr className="my-10 border-border sm:my-12" />
        <ArticleBody body={privacyPage.body} />
      </div>
    </article>
  );
}
