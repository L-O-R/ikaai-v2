'use client'

import React from 'react'

const OurApproach = () => {
    const approaches = [
        {
            icon: 'psychology',
            title: 'Evidence-Based',
            description: 'Rigorous research forms the foundation of all our program designs.',
        },
        {
            icon: 'group',
            title: 'Community-Led',
            description: 'Local ownership ensures long-term sustainability of initiatives.',
        },
        {
            icon: 'trending_up',
            title: 'Scalable Impact',
            description: 'Designing models that can be adapted across diverse rural contexts.',
        },
        {
            icon: 'handshake',
            title: 'Collaborative',
            description: 'Partnering with government and civil society for broader reach.',
        },
    ]

    return (
        <section className="py-section-mobile md:py-section-desktop  bg-surface" id="approach-section">
            <div className="container mx-auto">

                {/* Header + Description - Left aligned */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 md:mb-16">
                    <div className="lg:col-span-6">
                        <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                            Methodology
                        </span>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface leading-[1.1] tracking-tight">
                            Our Approach
                        </h2>
                        <div className="w-16 h-0.5 bg-harvest-gold/60 mt-4" />
                    </div>
                    <div className="lg:col-span-5 lg:col-start-8">
                        <p className="font-body-lg text-body-lg text-text-secondary leading-relaxed">
                            We believe in systemic change driven by evidence and rooted in community participation. Our
                            methodology ensures interventions are sustainable, scalable, and contextually relevant.
                        </p>
                    </div>
                </div>

                {/* Approach Cards - 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {approaches.map((item, index) => (
                        <div
                            key={item.title}
                            className="group flex flex-col gap-3 p-6 md:p-8 bg-surface-container-low rounded-2xl border border-border-neutral transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 cursor-default"
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:bg-primary-container/20 group-hover:scale-105">
                                <span className="material-symbols-outlined text-2xl md:text-3xl">
                                    {item.icon}
                                </span>
                            </div>

                            {/* Title */}
                            <h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors duration-300">
                                {item.title}
                            </h4>

                            {/* Description */}
                            <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                                {item.description}
                            </p>

                            {/* Subtle accent indicator — appears on hover */}
                            <div className="w-8 h-0.5 bg-harvest-gold/0 group-hover:bg-harvest-gold/60 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] mt-1" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurApproach