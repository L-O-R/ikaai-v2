import React from "react";
import SubHeading from "../shared/SubHeading";
import ImpactUs from "../ui/ImpactUs";
import ScrollReveal from "../ui/ScrollReveal";

const Aboutus = () => {
  return (
    <section className="py-section-mobile md:py-section-desktop bg-surface">
      <div className="container-size grid grid-cols-1 md:grid-cols-12 gap-gutter md:mb-16">
        <ScrollReveal className="md:col-span-6">
          <SubHeading
            text="From Ground"
            highlightText="to the Boardroom"
            className="flex flex-col"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="md:col-span-6 flex items-end pb-4">
          <p className="font-sans text-body-lg text-text-secondary leading-normal">
            Ikaai India is research, advisory, and impact-driven consulting firm
            committed to transforming insights into meaningful action. We
            partner with governments, development organizations, corporations,
            and institutions to design, strengthen, and deliver solutions that
            create measurable and sustainable impact.
          </p>
        </ScrollReveal>
      </div>
      <ScrollReveal delay={0.2}>
        <ImpactUs />
      </ScrollReveal>
    </section>
  );
};

export default Aboutus;
