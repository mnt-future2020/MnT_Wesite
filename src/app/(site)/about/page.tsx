import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { Beliefs } from "@/components/about/beliefs";
import { OurTeam } from "@/components/about/our-team";
import { WhoWeAre } from "@/components/about/who-we-are";

export const metadata: Metadata = {
  title: "About",
  description:
    "MnT Future builds enterprise AI, custom software and digital transformation solutions from Madurai, and stays with every system until it runs in production.",
};

// About page: hero, who we are, what we believe, our team. No closing banner (the user removed it).
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <Beliefs />
      <OurTeam />
    </>
  );
}
