import Aboutus from "@/components/home/Aboutus";
import Client from "@/components/home/Client";
import CtaSection from "@/components/home/CtaSection";
import HeroSection from "@/components/home/HeroSection";
import ImpactMoment from "@/components/home/ImpactMoment";
import OurCommitmentSection from "@/components/home/OurCommitmentSection";
import Projects from "@/components/home/Projects";
import Services from "@/components/home/Services";
import Updates from "@/components/home/Updates";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Aboutus />
      <Client />
      <ImpactMoment />
      <Services />
      <Projects />
      <OurCommitmentSection />
      <Updates />
      <CtaSection />
    </main>
  );
}
