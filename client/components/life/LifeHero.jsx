"use client";

import PageHero from "@/components/ui/PageHero";
import { heroData } from "@/lib/data/heroData";

const LifeHero = () => {
  return <PageHero {...heroData.life} />;
};

export default LifeHero;
