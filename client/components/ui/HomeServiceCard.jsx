"use client";

import Link from "next/link";

const ServiceCard = ({ service, index, isOpen, toggleService }) => {
    // Standardize source: use tags for high-level preview, or fallback to services
    const itemsList = service.tags || service.services || [];
    const initialItems = itemsList.slice(0, 4);
    const remainingItems = itemsList.slice(4);

    return (
        <div className="service-row group border-b border-border-neutral transition-all duration-300 hover:bg-primary/5">
            <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-gutter py-6 md:py-8 lg:py-10 items-start ${isOpen ? "cursor-default" : "cursor-pointer"
                    }`}
                onClick={() => toggleService(index)}
            >
                {/* Number & Mobile Toggle Icon */}
                <div className="lg:col-span-1 flex items-start justify-between lg:block">
                    <span className="font-sans uppercase text-primary tracking-widest font-bold text-headline-sm">
                        0{index + 1}
                    </span>
                    <span className="lg:hidden text-text-muted group-hover:text-primary transition-all duration-300">
                        <span
                            className={`material-symbols-outlined text-2xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""
                                }`}
                        >
                            add
                        </span>
                    </span>
                </div>

                {/* Title & Accordion Content */}
                <div className="lg:col-span-6 space-y-3 md:space-y-4">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors duration-300 font-bold">
                        {service.title}
                    </h3>

                    {/* Mobile Tags */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 lg:hidden">
                        {initialItems.map((item) => (
                            <span
                                key={item}
                                className="font-sans text-xs uppercase tracking-wider text-primary font-bold px-3 py-1 bg-surface-container-high border border-primary/30 rounded-full"
                            >
                                {item}
                            </span>
                        ))}
                        {!isOpen && remainingItems.length > 0 && (
                            <span className="font-sans text-xs uppercase tracking-wider text-on-surface font-semibold px-3 py-1 bg-warm-beige border border-border-neutral rounded-full">
                                +{remainingItems.length} More
                            </span>
                        )}
                        {isOpen &&
                            remainingItems.map((item) => (
                                <span
                                    key={item}
                                    className="font-sans text-xs uppercase tracking-wider text-primary font-bold px-3 py-1 bg-surface-container-high border border-primary/30 rounded-full"
                                >
                                    {item}
                                </span>
                            ))}
                    </div>

                    {/* Expandable Body Text & Link */}
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"
                            }`}
                    >
                        <p className="font-sans text-body-md text-text-secondary leading-relaxed">
                            {service.description}
                        </p>
                        <Link
                            href={`/services/#${service.slug}`}
                            className="inline-flex items-center gap-1 font-sans text-label-caps uppercase font-bold text-primary mt-4 group/link hover:underline"
                        >
                            Learn More
                            <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">
                                arrow_forward
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Desktop Tags Column */}
                <div className="lg:col-span-4 hidden lg:flex flex-col items-end gap-2">
                    {/* Primary 4 Badges */}
                    <div className="flex flex-wrap gap-2 justify-end">
                        {initialItems.map((item) => (
                            <span
                                key={item}
                                className="font-sans text-xs uppercase tracking-wider text-primary font-bold px-3.5 py-1.5 bg-surface-container-high border border-primary/30 rounded-full shrink-0 shadow-2xs"
                            >
                                {item}
                            </span>
                        ))}
                        {!isOpen && remainingItems.length > 0 && (
                            <span className="font-sans text-xs uppercase tracking-wider text-on-surface font-semibold px-3.5 py-1.5 bg-warm-beige border border-border-neutral rounded-full shrink-0">
                                +{remainingItems.length} More
                            </span>
                        )}
                    </div>

                    {/* Expanded Extra Badges */}
                    <div
                        className={`flex flex-wrap gap-2 justify-end overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[300px] opacity-100 pt-1" : "max-h-0 opacity-0"
                            }`}
                    >
                        {remainingItems.map((item) => (
                            <span
                                key={item}
                                className="font-sans text-xs uppercase tracking-wider text-primary font-bold px-3.5 py-1.5 bg-surface-container-high border border-primary/30 rounded-full shrink-0"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Desktop Toggle Arrow */}
                <div className="lg:col-span-1 hidden lg:flex justify-end items-start pt-1">
                    <span
                        className={`material-symbols-outlined text-text-muted group-hover:text-primary transition-all duration-300 text-2xl ${isOpen ? "rotate-45" : ""
                            }`}
                    >
                        add
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;