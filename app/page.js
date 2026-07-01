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
      <section className="py-24 md:py-36 px-4 md:px-8 bg-white" id="pause-section">
        <div className="max-w-8xl mx-auto text-center">
          <p className="pause-quote font-display-lg text-on-surface leading-[1.1] tracking-tight">
            “Every dataset<br className="hidden sm:block" />represents<br className="hidden sm:block" />a real family.”
          </p>
          <div className="w-16 h-0.5 bg-primary/30 mx-auto mt-8"></div>
        </div>
      </section>
      <Services />
      <OurApproach />
      <Presence />
      <Projects />
      <Updates />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
