'use client'

import React from 'react'

const CareerHero = () => {
    return (
        <section className="relative min-h-screen flex items-center px-4 md:px-8 mb-12">
            <div className="max-w-container-max mx-auto w-full">
                <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                    Careers
                </span>
                <h1 className="font-headline-lg text-6xl md:text-8xl lg:text-[9rem] font-semibold text-on-surface mb-4 leading-[1.05]">
                    Join Us in<br />
                    <span className="text-primary">Transforming Rural India</span>
                </h1>
                <div className="w-40 h-0.5 bg-harvest-gold/60 mb-8" />
                <p className="font-body-md text-body-md text-text-secondary max-w-2xl">
                    Be part of a passionate team dedicated to evidence-based research and sustainable development.
                    Together, we're creating lasting change for rural communities across India.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
                <span className="font-label-caps text-[10px] uppercase tracking-widest">Scroll</span>
                <div className="animate-scroll-down">
                    <span className="material-symbols-outlined text-2xl">expand_more</span>
                </div>
            </div>
        </section>
    )
}

export default CareerHero