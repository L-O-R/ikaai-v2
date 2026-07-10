"use client";

import PageHero from "@/components/ui/PageHero";
import { heroData } from "@/lib/data/heroData";

const AboutHero = () => {
  return <PageHero {...heroData.about} />;
};

export default AboutHero;
