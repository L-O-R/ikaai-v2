"use client";

import { servicesData } from "@/data/servicesData";
import React, { useState } from "react";



const Services = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleService = (index) => {
        if (openIndex !== index) {
            setOpenIndex(index);
        }
    };

    return (
        <section
            className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-warm-beige"
            id="services-section"
        >
            <div className="max-w-container-max mx-auto">
                {/* Header */}
                <div className="grid grid-cols-1  gap-gutter items-end border-b border-border-neutral pb-8 md:pb-12 lg:pb-14 mb-0">
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
                            Helping governments, NGOs, CSR foundations and development agencies make evidence-based
                            decisions.
                        </p>
                    </div>
                </div>

                {/* Services List */}
                <div id="services-list">
                    {servicesData.slice(0, 7).map((service, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={service.id}
                                className={`service-row group border-b border-border-neutral transition-all duration-300 ${idx === servicesData.length - 1 ? "border-b-0" : ""
                                    }`}
                            >
                                <div
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-gutter py-6 md:py-8 lg:py-10 items-start cursor-pointer"
                                    onClick={() => toggleService(idx)}
                                >
                                    {/* Number - always visible */}
                                    <div className="lg:col-span-1 flex items-start justify-between lg:block">
                                        <span className="font-label-caps uppercase text-primary tracking-widest text-xl md:text-2xl lg:text-3xl font-bold">
                                            0{idx + 1}
                                        </span>
                                        {/* Arrow - visible on mobile/tablet only */}
                                        <span className="lg:hidden text-text-muted group-hover:text-primary transition-all duration-300">
                                            <span className={`material-symbols-outlined text-2xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                                                add
                                            </span>
                                        </span>
                                    </div>

                                    {/* Title + Description + Mobile Tags */}
                                    <div className="lg:col-span-6 space-y-3 md:space-y-4">
                                        <h3 className="font-headline-md text-xl md:text-2xl lg:text-3xl text-on-surface group-hover:text-primary transition-colors duration-300">
                                            {service.title}
                                        </h3>

                                        {/* Tags — visible on mobile/tablet only (always shown) */}
                                        <div className="flex flex-wrap gap-1.5 md:gap-2 lg:hidden">
                                            {service.tags.slice(0, 4).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="font-label-caps text-[10px] md:text-xs uppercase tracking-widest text-primary/80 px-3 py-1 md:px-3.5 md:py-1.5 bg-primary-container/15 border border-primary/20 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {service.tags.length > 4 && (
                                                <span className="font-label-caps text-[10px] md:text-xs uppercase tracking-widest text-text-muted px-3 py-1 md:px-3.5 md:py-1.5 bg-surface-container-low border border-border-neutral rounded-full">
                                                    +{service.tags.length - 4} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Description - expands on all screen sizes */}
                                        <div
                                            className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            <p className="font-body-md text-body-md text-on-surface/80 leading-relaxed">
                                                {service.description}
                                            </p>
                                            <a
                                                href="#"
                                                className="inline-flex items-center gap-1 font-label-caps text-label-caps uppercase text-primary mt-4 group/link"
                                            >
                                                Learn More
                                                <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">
                                                    arrow_forward
                                                </span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Tags — visible on desktop only (expand with description) */}
                                    <div
                                        className={`lg:col-span-4 hidden lg:flex flex-wrap gap-2 justify-end overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        {service.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-label-caps text-xs uppercase tracking-widest text-primary px-4 py-1.5 bg-primary-container/20 border border-primary/40 rounded-full shrink-0"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Arrow - visible on desktop only */}
                                    <div className="lg:col-span-1 hidden lg:flex justify-end items-start pt-1">
                                        <span
                                            className={`material-symbols-outlined text-text-muted group-hover:text-primary transition-all duration-300 ${isOpen ? "rotate-45" : ""
                                                }`}
                                        >
                                            add
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;