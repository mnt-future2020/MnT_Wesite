import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesStory } from "@/components/services/services-story";
import { WaysToWork } from "@/components/services/ways-to-work";

export const metadata: Metadata = {
  title: "AI, Software, Cloud & Security Services",
  alternates: { canonical: "/services" },
  description:
    "AI agents and voice AI, custom software, web and mobile apps, integrations, data, cloud and cybersecurity, built for your business.",
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
