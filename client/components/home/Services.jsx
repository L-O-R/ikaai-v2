"use client";

import { servicesData } from "@/lib/data/servicesData";
import { useState } from "react";
import ServiceCard from "../ui/HomeServiceCard";
const Services = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleService = (index) => {
        if (openIndex !== index) {
            setOpenIndex(index);
        }
    };

    return (
        <section
            className="py-section-mobile md:py-section-desktop  bg-warm-beige"
            id="services-section"
        >
            <div className="container mx-auto">
                {/* Header - unchanged */}
                <div className="grid grid-cols-1 gap-gutter items-end border-b border-border-neutral pb-8 md:pb-12 lg:pb-14 mb-0">
                    <div>
                        <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                            Our Services
                        </span>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface">
                            Capabilities We Offer
                        </h2>
                    </div>
                    <div className="md:pb-2 mt-4 lg:mt-0">
                        <p className="font-body-lg text-body-lg text-text-secondary">
                            Helping governments, NGOs, CSR foundations and development agencies make evidence-based decisions.
                        </p>
                    </div>
                </div>

                {/* Services List - using the new card */}
                <div id="services-list">
                    {servicesData.slice(0, 7).map((service, idx) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={idx}
                            isOpen={openIndex === idx}
                            toggleService={toggleService}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;