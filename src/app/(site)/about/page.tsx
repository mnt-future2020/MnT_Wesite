import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { Beliefs } from "@/components/about/beliefs";
import { OurTeam } from "@/components/about/our-team";
import { WhoWeAre } from "@/components/about/who-we-are";

export const metadata: Metadata = {
  title: "About Us: Technology Company in Madurai",
  alternates: { canonical: "/about" },
  description:
    "MnT Future is a technology company in Madurai, India. We plan, build and launch software and AI for businesses, and stay with it after it goes live.",
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
