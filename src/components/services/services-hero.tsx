import { PageHero } from "@/components/site/page-hero";
import { servicesPage } from "@/content/site";
import { ServiceJumpLinks } from "./service-jump-links";

/*
 * Services page hero: the shared inner-page hero. Along the bottom, the four
 * service groups as quick links that scroll smoothly to their part of the page.
 */

export function ServicesHero() {
  const { hero } = servicesPage;
  return (
    <PageHero
      titleId="services-title"
      titleLines={hero.titleLines}
      body={hero.body}
      bottom={<ServiceJumpLinks />}
    />
  );
}
