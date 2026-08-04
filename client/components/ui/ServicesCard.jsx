'use client'

import React, { useState } from 'react'

const ServiceCard = ({ service, index }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    // Fallback to tags if services array isn't populated
    const allServices = service.services || service.tags || []
    const visibleServices = isExpanded ? allServices : allServices.slice(0, 4)
    const remainingCount = allServices.length - 4

    return (
        <div
            id={`${service.slug}`}
            className="group bg-surface rounded-2xl border border-border-neutral transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-primary/50 hover:bg-surface-container-low hover:shadow-xl"
        >
            <div className="p-6 md:p-8 lg:p-10 space-y-6">

                {/* Top Section: Number + Title + Description */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">

                    {/* Number Identifier */}
                    <div className="md:col-span-1 flex flex-col items-start">
                        <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-none text-primary/30 group-hover:text-primary transition-all duration-300">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-11 space-y-4">
                        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-on-surface group-hover:text-primary transition-colors duration-300">
                            {service.title}
                        </h3>

                        {service.tagline && (
                            <p className="font-sans text-body-sm font-bold uppercase tracking-wider text-earth-copper">
                                {service.tagline}
                            </p>
                        )}

                        <p className="font-sans text-body-md text-text-secondary leading-relaxed max-w-3xl">
                            {service.description}
                        </p>

                        {/* Audience Info */}

                    </div>
                </div>

                {/* Middle Section: Services Offered */}
                {allServices.length > 0 && (
                    <div className="border-t border-border-neutral pt-5 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="font-sans text-xs uppercase tracking-widest text-text-muted font-bold block">
                                Key Service Offerings ({allServices.length})
                            </span>

                            {remainingCount > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="font-sans text-xs uppercase tracking-wider text-primary font-bold flex items-center gap-1 cursor-pointer"
                                >
                                    {isExpanded ? (
                                        <>
                                            Show Less
                                            <span className="material-symbols-outlined text-body-sm">expand_less</span>
                                        </>
                                    ) : (
                                        <>
                                            Show All
                                            <span className="material-symbols-outlined text-body-sm">expand_more</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* High-Contrast Tags */}
                        <div className='flex flex-warp gap-4 items-center' >
                            <ul className='flex flex-wrap gap-8 transition-all duration-500 ease-in-out'>
                                {visibleServices.map((item) => (
                                    <li
                                        key={item}
                                        className="list-disc font-sans text-body-sm uppercase tracking-wider text-primary font-bold"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {!isExpanded && remainingCount > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setIsExpanded(true)}
                                    className="font-sans text-body-sm uppercase tracking-wider text-on-surface font-semibold px-3.5 py-1.5 bg-warm-beige border border-border-neutral rounded-full hover:border-primary hover:text-primary transition-all cursor-pointer"
                                >
                                    +{remainingCount} More
                                </button>
                            )}
                        </div>
                    </div>
                )}



            </div>
        </div>
    )
}

export default ServiceCard