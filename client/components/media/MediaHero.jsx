"use client";

import PageHero from "@/components/ui/PageHero";
import { heroData } from "@/data/heroData";

const MediaHero = () => {
  return <PageHero {...heroData.media} />;
};

export default MediaHero;
