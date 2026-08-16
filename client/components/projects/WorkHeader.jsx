import React from "react";
import { heroData } from "@/lib/data/heroData";
import PageHero from "../ui/PageHero";

const WorkHeader = () => {
  return <PageHero {...heroData.work} />;
};

export default WorkHeader;
