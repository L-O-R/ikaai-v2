"use client";

import PageHero from "@/components/ui/PageHero";
import { heroData } from "@/data/heroData";

const CareerHero = () => {
  return <PageHero {...heroData.careers} />;
};

export default CareerHero;
