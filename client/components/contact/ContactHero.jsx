"use client";

import PageHero from "@/components/ui/PageHero";
import { heroData } from "@/data/heroData";

const ContactHero = () => {
  return <PageHero {...heroData.contact} />;
};

export default ContactHero;
