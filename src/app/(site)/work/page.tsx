import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/closing-cta";
import { CaseStudies } from "@/components/work/case-studies";
import { WorkHero } from "@/components/work/work-hero";

export const metadata: Metadata = {
  title: "Our Work: Websites, Stores & Business Software",
  description:
    "Live websites, online stores and business software MnT Future has built. Open them and see them working.",
  alternates: { canonical: "/work" },
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
