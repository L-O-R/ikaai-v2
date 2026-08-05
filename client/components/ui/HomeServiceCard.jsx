"use client";

import Link from "next/link";

const ServiceCard = ({ service, index, isOpen, toggleService }) => {
    // Falls back to your clean, formatted services array
    const itemsList = service.services || [];

    // stable preview of the top 5 primary services
    const displayServices = itemsList.slice(0, 5);

    return (
        <div className="service-row group border-b border-border-neutral transition-all duration-300 hover:bg-primary/5">
            <div
                className={`flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 py-6 md:py-8 lg:py-10 ${isOpen ? "cursor-default" : "cursor-pointer"
                    }`}
                onClick={() => toggleService(index)}
            >
                {/* 1. Left Section: Number and Core Content Area */}
                <div className="flex items-start gap-4 md:gap-6 lg:gap-8 flex-1 max-w-3xl">
                    {/* Number Indicator */}
                    <span className="font-sans uppercase text-primary tracking-widest font-bold text-headline-sm shrink-0">
                        0{index + 1}
                    </span>

                    {/* Content Stack */}
                    <div className="flex-1 space-y-4">
                        {/* Title Row (with Mobile-Only Trigger) */}
                        <div className="flex items-center justify-between lg:block">
                            <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors duration-300 font-bold">
                                {service.title}
                            </h3>
                            <span className="lg:hidden text-text-muted group-hover:text-primary transition-all duration-300">
                                <span
                                    className={`material-symbols-outlined text-2xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""
                                        }`}
                                >
                                    add
                                </span>
                            </span>
                        </div>

                        {/* Mobile List: Core Services (Only rendered on toggle) */}
                        {isOpen && (
                            <div className="flex flex-col gap-2.5 lg:hidden pl-1 animate-fade-in">
                                <span className="font-sans text-xs uppercase tracking-widest text-text-muted font-bold">
                                    Core Services
                                </span>
                                <div className="flex flex-col gap-2">
                                    {displayServices.map((item) => (
                                        <div
                                            key={item}
                                            className="font-sans text-xs text-text-secondary font-semibold flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Expandable Body Text & Dynamic Transition Link */}
                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"
                                }`}
                        >
                            <p className="font-sans text-body-md text-text-secondary leading-relaxed">
                                {service.description}
                            </p>
                            <Link
                                href={`/services/#${service.slug}`}
                                className="inline-flex items-center gap-1 font-sans text-label-caps uppercase font-bold text-primary mt-5 group/link hover:underline"
                            >
                                Learn More
                                <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex items-start justify-between gap-12 shrink-0 lg:w-105 select-none pl-4">

                    {/* Desktop: Core Services List (Only rendered on toggle) */}
                    {isOpen ? (
                        <div className="flex flex-col items-start gap-3 transition-opacity duration-300">
                            <span className="font-sans text-xs uppercase tracking-widest text-text-muted font-bold">
                                Core Services
                            </span>
                            <div className="flex flex-col gap-2.5">
                                {displayServices.map((item) => (
                                    <div
                                        key={item}
                                        className="font-sans text-b0dy-md text-text-secondary font-semibold flex items-center gap-2.5 leading-tight"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Empty placeholder to maintain flex-justification structure when closed
                        <div className="w-0" />
                    )}

                    {/* Toggle Icon (Pushed to the far right via layout) */}
                    <div className="pt-1">
                        <span
                            className={`material-symbols-outlined text-text-muted group-hover:text-primary transition-all duration-300 text-2xl ${isOpen ? "rotate-45" : ""
                                }`}
                        >
                            add
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ServiceCard;