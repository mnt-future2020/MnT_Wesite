import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesStory } from "@/components/services/services-story";
import { WaysToWork } from "@/components/services/ways-to-work";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Enterprise AI and voice AI, custom enterprise software, SaaS, web and mobile apps, API integration, data and BI, cloud, DevOps and cybersecurity from MnT Future.",
};

// Services page: the hero, every service, and the ways to work with us (no closing banner: the user removed it).
export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesStory />
      <WaysToWork />
    </>
  );
}
