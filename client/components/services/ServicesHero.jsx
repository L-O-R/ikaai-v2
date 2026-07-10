"use client";

import PageHero from "@/components/ui/PageHero";
import { heroData } from "@/lib/data/heroData";

const ServicesHero = () => {
  return <PageHero {...heroData.services} />;
};

export default ServicesHero;
