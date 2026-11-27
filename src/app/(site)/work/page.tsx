import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/closing-cta";
import { CaseStudies } from "@/components/work/case-studies";
import { WorkHero } from "@/components/work/work-hero";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Live websites, apps and platforms MnT Future built for businesses in India, Australia and Malaysia. Open them and see them working.",
};

// Work page: the hero, the projects, and the dark "Book a session" banner.
export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <CaseStudies />
      <ClosingCta />
    </>
  );
}
