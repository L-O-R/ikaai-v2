"use client";

import { servicesData } from "@/lib/data/servicesData";
import { useState } from "react";
import ServiceCard from "../ui/HomeServiceCard";
import SubHeading from "../shared/SubHeading";
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
            <div className="container-size">
                {/* Header - unchanged */}
                <div className="grid grid-cols-1 gap-gutter items-end border-b border-border-neutral pb-8 md:pb-12 lg:pb-14 mb-0">
                    <div>
                        <span className="font-sans text-label-caps uppercase text-text-muted tracking-widest block mb-3">
                            What we do
                        </span>
                        <SubHeading
                            text="Solutions"
                            highlightText=""
                        />
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