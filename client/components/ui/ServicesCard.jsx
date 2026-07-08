
'use client'

import React from 'react'

const ServiceCard = ({ service, index }) => {
    return (
        <div
            className="group bg-surface rounded-2xl border border-border-neutral transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-primary/50 hover:bg-surface-container-low hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 p-6 md:p-8 lg:p-10">

                {/* Number + Icon */}
                <div className="md:col-span-1 flex flex-col items-start gap-2">
                    <span className="font-headline-md text-4xl md:text-5xl lg:text-6xl font-bold leading-none text-primary/15 group-hover:text-primary/40 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="material-symbols-outlined text-3xl text-primary/40 group-hover:text-primary transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                        {service.icon || 'arrow_forward'}
                    </span>
                </div>

                {/* Title + Description + Deliverables */}
                <div className="md:col-span-7 space-y-4">
                    <h3 className="font-headline-md text-2xl md:text-3xl lg:text-4xl text-on-surface group-hover:text-primary transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                        {service.title}
                    </h3>

                    <p className="font-body-md text-body-md text-text-secondary leading-relaxed max-w-2xl">
                        {service.description}
                    </p>

                    {/* Deliverables */}
                    {service.deliverables && (
                        <div className="pt-3">
                            <span className="font-label-caps text-[10px] uppercase tracking-widest text-text-muted block mb-2">
                                What We Deliver
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {service.deliverables.slice(0, 4).map((item) => (
                                    <span
                                        key={item}
                                        className="font-body-md text-sm text-on-surface/80 bg-surface-container-low group-hover:bg-primary-container/10 group-hover:text-primary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] px-3 py-1 rounded-full border border-border-neutral group-hover:border-primary/30"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Audience */}
                    {service.audience && (
                        <div className="flex items-center gap-2 pt-1">
                            <span className="material-symbols-outlined text-sm text-text-muted group-hover:text-primary transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                                person
                            </span>
                            <span className="font-body-md text-sm text-text-muted">
                                For: <span className="text-on-surface">{service.audience}</span>
                            </span>
                        </div>
                    )}
                </div>

                {/* Tags */}
                <div className="md:col-span-4 flex flex-wrap items-start gap-2 content-start">
                    {service.tags.slice(0, 6).map((tag) => (
                        <span
                            key={tag}
                            className="font-label-caps text-[10px] uppercase tracking-widest text-primary/70 px-3 py-1.5 bg-primary-container/10 border border-primary/20 rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:bg-primary-container/20 group-hover:border-primary/40 group-hover:text-primary"
                        >
                            {tag}
                        </span>
                    ))}
                    {service.tags.length > 6 && (
                        <span className="font-label-caps text-[10px] uppercase tracking-widest text-text-muted px-3 py-1.5 bg-surface-container-low border border-border-neutral rounded-full">
                            +{service.tags.length - 6}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ServiceCard