import { PageHero } from "@/components/site/page-hero";
import { aboutPage } from "@/content/site";

/* About page hero: the shared inner-page hero, with four facts along the bottom. */

export function AboutHero() {
  const { hero } = aboutPage;
  return (
    <PageHero
      titleId="about-title"
      titleLines={hero.titleLines}
      body={hero.body}
      bottom={
        // Phones and tablets: two by two, so "Inside your team" fits on one line.
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {hero.facts.map((fact) => (
            <div key={fact.value}>
              <dt className="font-heading text-[clamp(1.75rem,2.8vw,2.5rem)] leading-none font-medium tracking-[-0.03em]">
                {fact.value}
              </dt>
              <dd className="mt-2 text-sm leading-snug text-muted-foreground sm:text-base">{fact.label}</dd>
            </div>
          ))}
        </dl>
      }
    />
  );
}
