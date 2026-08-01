import React from 'react'
import Link from 'next/link'

const ServicesCta = () => {
    return (
        <section className="py-20 md:py-28 bg-surface border-t border-border-neutral">
            <div className="container-size">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-surface-container-low rounded-[2.5rem] p-8 md:p-16 border border-border-neutral shadow-xs">
                    
                    {/* Left Column: Heading + Description (Pill badge removed) */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">
                        <h2 className="font-display text-display-lg text-on-surface font-extrabold tracking-tight leading-none mb-6">
                            Let's build a foundation for <span className="text-primary">measurable change.</span>
                        </h2>
                        <p className="font-sans text-body-lg text-text-secondary leading-relaxed max-w-xl">
                            We collaborate with governments, development agencies, and corporate foundations across India to design, monitor, and evaluate high-impact initiatives. 
                        </p>
                    </div>

                    {/* Right Column: Refined Interactive Action Cards */}
                    <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                        {/* Project Card */}
                        <Link 
                            href="/contact?subject=Commission%20Study"
                            className="group bg-white border border-border-neutral p-6 rounded-[2rem] hover:border-primary hover:bg-surface-container/30 transition-all duration-300 flex items-start gap-4 text-left cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-3xl text-primary bg-primary/5 p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                partner_exchange
                            </span>
                            <div>
                                <h3 className="font-display text-headline-sm text-on-surface group-hover:text-primary transition-colors duration-200 uppercase font-bold tracking-wide">
                                    Commission a Study
                                </h3>
                                <p className="font-sans text-xs text-text-muted mt-1.5 leading-relaxed">
                                    Partner with us for baseline, midline, endline, and impact evaluation studies.
                                </p>
                            </div>
                        </Link>

                        {/* Network Card */}
                        <Link 
                            href="/careers"
                            className="group bg-white border border-border-neutral p-6 rounded-[2rem] hover:border-primary hover:bg-surface-container/30 transition-all duration-300 flex items-start gap-4 text-left cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-3xl text-primary bg-primary/5 p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                group_add
                            </span>
                            <div>
                                <h3 className="font-display text-headline-sm text-on-surface group-hover:text-primary transition-colors duration-200 uppercase font-bold tracking-wide">
                                    Join Our Network
                                </h3>
                                <p className="font-sans text-xs text-text-muted mt-1.5 leading-relaxed">
                                    Are you a researcher or field coordinator? Connect with Ikaai's pan-India roster.
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicesCta
