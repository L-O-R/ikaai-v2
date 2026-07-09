"use client";

import PageHero from "@/components/ui/PageHero";
import { heroData } from "@/data/heroData";

const LifeHero = () => {
  return <PageHero {...heroData.life} />;
};

export default LifeHero;
