"use client";

import PageHero from "@/components/ui/PageHero";
import { heroData } from "@/lib/data/heroData";

const TeamHero = () => {
  return <PageHero {...heroData.team} />;
};

export default TeamHero;
