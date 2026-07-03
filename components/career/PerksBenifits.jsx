
'use client'

import React from 'react'

const perksData = [
    {
        icon: 'health_and_safety',
        title: 'Health Insurance',
        description: 'Comprehensive health coverage for you and your family, ensuring peace of mind.'
    },
    {
        icon: 'school',
        title: 'Professional Development',
        description: 'Annual budget for courses, workshops, and conferences to support your growth.'
    },
    {
        icon: 'schedule',
        title: 'Flexible Working Hours',
        description: 'Flexible schedules that respect your work-life balance and personal commitments.'
    },
    {
        icon: 'explore',
        title: 'Field Exposure',
        description: 'Opportunities to work directly with rural communities and understand ground realities.'
    },
]

const PerksBenefits = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-warm-beige">
            <div className="max-w-container-max mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Perks & Benefits
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                        We Take Care of Our People
                    </h2>
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mx-auto mt-4" />
                    <p className="font-body-md text-body-md text-text-secondary max-w-2xl mx-auto mt-4">
                        We believe that doing meaningful work goes hand-in-hand with feeling supported, valued, and
                        empowered.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {perksData.map((perk) => (
                        <div key={perk.title} className="bg-surface rounded-2xl p-6 md:p-8 border border-border-neutral text-center hover-lift transition-all duration-300 h-full flex flex-col">
                            <div className="w-14 h-14 rounded-full bg-primary-container/10 flex items-center justify-center mx-auto mb-4 shrink-0">
                                <span className="material-symbols-outlined text-3xl text-primary">{perk.icon}</span>
                            </div>
                            <h3 className="font-headline-md text-xl text-on-surface mb-3">{perk.title}</h3>
                            <p className="font-body-md text-body-md text-text-secondary leading-relaxed flex-grow">
                                {perk.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PerksBenefits