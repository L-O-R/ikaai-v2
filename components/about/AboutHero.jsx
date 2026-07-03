
'use client'

import React from 'react'

const AboutHero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden pt-32 pb-16 md:pb-24">
            {/* Background with subtle gradient */}
            <div className="absolute inset-0 bg-primary-container/5" />
            <div className="absolute inset-0 bg-linear-to-br from-primary-container/10 via-transparent to-warm-beige/30" />

            <div className="relative z-10 max-w-container-max mx-auto w-full text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        About Us
                    </span>
                    <h1 className="font-display-lg text-display-lg text-on-surface leading-[1.05] tracking-tight">
                        Unlocking Insights,<br />
                        <span className="text-primary">Transforming Lives</span>
                    </h1>
                    <div className="w-20 h-0.5 bg-harvest-gold/60 mx-auto my-6" />
                    <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        IKAAI India is a research and development organization dedicated to empowering rural communities
                        through rigorous evidence, sustainable livelihoods, and community-driven initiatives.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8 justify-center">
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Research
                        </span>
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Rural Development
                        </span>
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Evidence-Based
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutHero