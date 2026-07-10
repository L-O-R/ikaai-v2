"use client";

import Link from "next/link";

const ServiceCard = ({ service, index, isOpen, toggleService }) => {
    return (
        <div
            className="service-row group border-b border-border-neutral transition-all duration-300"

        >
            <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-gutter py-6 md:py-8 lg:py-10 items-start ${isOpen ? "cursor-default" : "cursor-pointer"}`}
                onClick={() => toggleService(index)}
            >
                <div className="lg:col-span-1 flex items-start justify-between lg:block">
                    <span className="font-label-caps uppercase text-primary tracking-widest font-bold text-headline-sm">
                        0{index + 1}
                    </span>
                    <span className="lg:hidden text-text-muted group-hover:text-primary transition-all duration-300">
                        <span className={`material-symbols-outlined text-2xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                            add
                        </span>
                    </span>
                </div>

                <div className="lg:col-span-6 space-y-3 md:space-y-4">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors duration-300">
                        {service.title}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 md:gap-2 lg:hidden">
                        {service.tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="font-label-caps text-body-sm uppercase tracking-widest text-primary/80 px-3 py-1 md:px-3.5 md:py-1.5 bg-primary-container/15 border border-primary/20 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                        {service.tags.length > 4 && (
                            <span className="font-label-caps text-body-sm uppercase tracking-widest text-text-muted px-3 py-1 md:px-3.5 md:py-1.5 bg-surface-container-low border border-border-neutral rounded-full">
                                +{service.tags.length - 4} more
                            </span>
                        )}
                    </div>

                    <div
                        className={`
              overflow-hidden transition-all duration-500 ease-in-out
              ${isOpen ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0"}
            `}
                    >
                        <p className="font-body-md text-body-md text-on-surface/80 leading-relaxed">
                            {service.description}
                        </p>
                        <Link
                            href={`/services/#${service.slug}`}
                            className="inline-flex items-center gap-1 font-label-caps text-label-caps uppercase text-primary mt-4 group/link"
                        >
                            Learn More
                            <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">
                                arrow_forward
                            </span>
                        </Link>
                    </div>
                </div>

                <div
                    className={`
            lg:col-span-4 hidden lg:flex flex-wrap gap-2 justify-end 
            overflow-hidden transition-all duration-500 ease-in-out
            ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
          `}
                >
                    {service.tags.map((tag) => (
                        <span
                            key={tag}
                            className="font-label-caps text-body-sm font-semibold uppercase tracking-widest text-primary px-4 py-1.5 bg-primary-container/20 border border-primary/40 rounded-full shrink-0"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="lg:col-span-1 hidden lg:flex justify-end items-start pt-1">
                    <span
                        className={`
              material-symbols-outlined 
              text-text-muted group-hover:text-primary 
              transition-all duration-300 
              ${isOpen ? "rotate-45" : ""}
            `}
                    >
                        add
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;