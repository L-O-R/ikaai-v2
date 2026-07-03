
'use client'

import React from 'react'

const whyJoinData = [
    {
        icon: 'trending_up',
        title: 'Impact-Driven Work',
        description: 'See the tangible results of your research on rural communities. Every project creates measurable change in people\'s lives.'
    },
    {
        icon: 'school',
        title: 'Growth & Learning',
        description: 'Continuous professional development through training, mentorship, and hands-on experience in diverse field settings.'
    },
    {
        icon: 'diversity_3',
        title: 'Collaborative Culture',
        description: 'Work alongside passionate researchers, development practitioners, and community leaders who share your commitment to change.'
    },
    {
        icon: 'balance',
        title: 'Work-Life Balance',
        description: 'We believe in sustainable work practices that support your well-being and professional growth.'
    },
]

const WhyJoinUs = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-warm-beige">
            <div className="max-w-container-max mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Why Join Us
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                        Be Part of Something Bigger
                    </h2>
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {whyJoinData.map((item) => (
                        <div key={item.title} className="bg-surface rounded-2xl p-6 md:p-8 border border-border-neutral text-center hover-lift transition-all duration-300 h-full flex flex-col">
                            <div className="w-14 h-14 rounded-full bg-primary-container/10 flex items-center justify-center mx-auto mb-4 shrink-0">
                                <span className="material-symbols-outlined text-3xl text-primary">{item.icon}</span>
                            </div>
                            <h3 className="font-headline-md text-xl text-on-surface mb-3">{item.title}</h3>
                            <p className="font-body-md text-body-md text-text-secondary leading-relaxed flex-grow">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyJoinUs