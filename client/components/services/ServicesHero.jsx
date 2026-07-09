"use client";

import PageHero from "@/components/ui/PageHero";
import { heroData } from "@/data/heroData";

const ServicesHero = () => {
  return <PageHero {...heroData.services} />;
};

export default ServicesHero;
