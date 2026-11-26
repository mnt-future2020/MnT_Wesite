import { ClosingCta } from "@/components/home/closing-cta";
import { Hero } from "@/components/home/hero";
import { HowWeWork } from "@/components/home/how-we-work";
import { OurWork } from "@/components/home/our-work";
import { StraightAnswers } from "@/components/home/straight-answers";
import { WhatWeBuild } from "@/components/home/what-we-build";
import { WhyMnt } from "@/components/home/why-mnt";

// Homepage, built section by section.
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <OurWork />
      <HowWeWork />
      <WhyMnt />
      <StraightAnswers />
      <ClosingCta />
    </>
  );
}
