import { PageHero } from "@/components/site/page-hero";
import { workPage } from "@/content/site";
import { BuiltMarquee } from "./built-marquee";

/*
 * Work page hero: the shared inner-page hero. Along the bottom, the kinds of work
 * in the projects below, gliding slowly across (see BuiltMarquee).
 */

export function WorkHero() {
  const { hero } = workPage;
  return (
    <PageHero
      titleId="work-title"
      titleLines={hero.titleLines}
      body={hero.body}
      bottom={
        <div>
          <p className="text-sm text-muted-foreground">{hero.builtLabel}</p>
          <div className="mt-5">
            <BuiltMarquee />
          </div>
        </div>
      }
    />
  );
}
