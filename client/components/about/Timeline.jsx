
'use client'

import React from 'react'

const timelineData = [
    {
        year: '2008',
        title: 'The Beginning',
        description: 'IKAAI India was founded with a vision to bridge research and rural development in Rajasthan.',
    },
    {
        year: '2012',
        title: 'Expanding Reach',
        description: 'Expanded operations to Maharashtra and Madhya Pradesh, building a network of field researchers.',
    },
    {
        year: '2016',
        title: 'Research Excellence',
        description: 'Launched comprehensive baseline studies and impact assessments for government and NGO partners.',
    },
    {
        year: '2020',
        title: 'National Presence',
        description: 'Reached 8 states across India, impacting over 1 million lives through evidence-based interventions.',
    },
    {
        year: '2024',
        title: 'Looking Forward',
        description: 'Continuing to innovate with data-driven solutions for rural development and policy advisory.',
    },
]

const Timeline = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-surface">
            <div className="max-w-container-max mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Our Journey
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                        Timeline of Impact
                    </h2>
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mx-auto mt-4" />
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-container/20 -translate-x-1/2" />

                    <div className="space-y-8 md:space-y-12">
                        {timelineData.map((item, index) => {
                            const isEven = index % 2 === 0
                            return (
                                <div key={item.year} className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    {/* Dot */}
                                    <div className="absolute left-4 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-white -translate-x-1/2 z-10" />

                                    {/* Content */}
                                    <div className={`pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                        <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border-neutral hover-lift transition-all duration-300">
                                            <span className="font-headline-md text-headline-sm text-primary block">
                                                {item.year}
                                            </span>
                                            <h3 className="font-headline-md text-lg text-on-surface mt-2">
                                                {item.title}
                                            </h3>
                                            <p className="font-body-md text-body-md text-text-secondary mt-2 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Timeline