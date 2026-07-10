"use client";

import PageHero from "@/components/ui/PageHero";
import { heroData } from "@/lib/data/heroData";

const MediaHero = () => {
  return <PageHero {...heroData.media} />;
};

export default MediaHero;
