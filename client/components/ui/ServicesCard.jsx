"use client";

import React, { useState } from "react";

const ServiceCard = ({ service, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const allServices = service.services || [];
    const visibleServices = isExpanded ? allServices : allServices.slice(0, 6);
    const remainingCount = allServices.length - 6;

    return (
        <div
            id={`${service.slug}`}
            className="group bg-surface rounded-2xl transition-all duration-300 ease-in-out hover:bg-warm-beige hover:shadow-xl"
        >
            <div className="p-6 md:p-8 lg:p-10 space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                    <div className="md:col-span-1 flex flex-col items-start">
                        <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-none text-primary/30 group-hover:text-primary transition-all duration-300">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>

                    <div className="md:col-span-11 space-y-4">
                        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-on-surface group-hover:text-primary transition-colors duration-300 font-bold">
                            {service.title}
                        </h3>

                        <p className="font-sans text-body-md text-text-secondary leading-relaxed max-w-3xl">
                            {service.description}
                        </p>
                    </div>
                </div>

                {allServices.length > 0 && (
                    <div className="border-t border-border-neutral pt-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-sans text-xs uppercase tracking-widest text-text-muted font-bold block">
                                Key Service Offerings ({allServices.length})
                            </span>

                            {remainingCount > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="font-sans text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1 cursor-pointer group/toggle"
                                >
                                    <span className="group-hover/toggle:underline">
                                        {isExpanded ? "Show Less" : "Show All"}
                                    </span>
                                    <span className="material-symbols-outlined text-body-sm shrink-0">
                                        {isExpanded ? "expand_less" : "expand_more"}
                                    </span>
                                </button>
                            )}
                        </div>

                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-12 gap-y-2 select-none pl-1">
                            {visibleServices.map((item) => (
                                <div
                                    key={item}
                                    className="break-inside-avoid-column flex items-center gap-2.5 py-1.5 leading-tight"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                                    <span className="font-sans text-body-sm text-text-secondary font-medium">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceCard;