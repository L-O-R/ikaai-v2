import Aboutus from "@/components/home/Aboutus";
import Client from "@/components/home/Client";
import CtaSection from "@/components/home/CtaSection";
import HeroSection from "@/components/home/HeroSection";
import ImpactMoment from "@/components/home/ImpactMoment";
import OurApproach from "@/components/home/OurApproach";
import Presence from "@/components/home/Presense";
import Projects from "@/components/home/Projects";
import Services from "@/components/home/Services";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Updates from "@/components/home/Updates";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Aboutus />
      <Client />
      <ImpactMoment />

      <Services />
      <OurApproach />
      {/* <Presence /> */}
      <Projects />
      <Updates />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
