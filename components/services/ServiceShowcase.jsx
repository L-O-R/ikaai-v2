// components/services/ServiceShowcase.jsx
'use client'

import React from 'react'
import Image from 'next/image'
import { servicesData } from '@/data/servicesData'
import ServiceCard from '../ui/ServicesCard'

const ServiceShowcase = () => {
    const firstGroup = servicesData.slice(0, 3)
    const secondGroup = servicesData.slice(3)

    return (
        <section className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-warm-beige">
            <div className="max-w-container-max mx-auto">

                {/* Section intro — minimal */}
                <div className="text-center mb-16 md:mb-20">
                    <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mb-2">
                        What We Do
                    </span>
                    <div className="w-12 h-0.5 bg-harvest-gold/40 mx-auto" />
                </div>

                {/* Service Cards — Group 1 */}
                <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
                    {firstGroup.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>

                {/* Full-width Documentary Image + Field Note */}
                <div className="relative w-full mb-16 md:mb-20">
                    <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '16/7' }}>
                        <Image
                            src="/hero/woman_being_interviewed.jpg"
                            alt="Field researcher interviewing a rural woman"
                            fill
                            className="object-cover"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>

                    {/* Field Note — overlaid on image */}
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-16 max-w-2xl">
                        <span className="font-label-caps text-[10px] uppercase tracking-widest text-harvest-gold/80 block mb-3">
                            Field Note
                        </span>
                        <p className="font-headline-md text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1] tracking-tight">
                            Research begins<br />
                            <span className="text-harvest-gold/70">with listening.</span>
                        </p>
                        <div className="w-16 h-0.5 bg-harvest-gold/50 mt-4" />
                    </div>
                </div>

                {/* Service Cards — Group 2 */}
                <div className="space-y-6 md:space-y-8">
                    {secondGroup.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index + 3} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16 md:mt-20">
                    <p className="font-body-md text-body-md text-text-secondary">
                        Need a custom solution?{' '}
                        <a href="/contact" className="text-primary hover:underline font-semibold transition-colors duration-300">
                            Let's talk
                        </a>
                        {' '}about how we can help.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ServiceShowcase