'use client'

import React from 'react'
import LogoLoop from '../ui/LogoLoop'

const clients = [
    { src: "/client/up.png", alt: "Uttar Pradesh Government" },
    { src: "/client/cbm.png", alt: "CBM" },
    { src: "/client/CMPDIL.png", alt: "CMPDIL" },
    { src: "/client/igsss.png", alt: "IGSSS" },
    { src: "/client/DelhiPolice.png", alt: "Delhi Police" },
    { src: "/client/leprosy.png", alt: "Leprosy Mission" },
    { src: "/client/Mamta.png", alt: "Mamta" },
    { src: "/client/National.png", alt: "National Foundation" },
    { src: "/client/NPCL.png", alt: "NPCL" },
]



const Client = () => {
    return (
        <section className="py-20 md:py-28 bg-surface overflow-hidden">
            <div className="max-w-container-max mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                        Trusted By
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                        Organizations That Trust Us
                    </h2>
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mx-auto mt-4" />
                    <p className="font-body-md text-body-md text-text-secondary max-w-2xl mx-auto mt-4">
                        Governments, NGOs, and development agencies that rely on our
                        research and development expertise to drive evidence-based change.
                    </p>
                </div>

                {/* 3-Column vertical marquee grid */}
                <div className="grid grid-cols-3 gap-4 md:gap-8 h-[400px] md:h-[480px]">

                    {/* Column 1 — scrolls up */}
                    <div className="overflow-hidden">
                        <LogoLoop
                            logos={clients}
                            direction="up"
                            logoHeight={120}
                            gap={36}
                            speed={8}
                            pauseOnHover
                            className="h-full w-full"
                        />
                    </div>

                    {/* Column 2 — scrolls down */}
                    <div className="overflow-hidden">
                        <LogoLoop
                            logos={clients}
                            direction="down"
                            logoHeight={120}
                            gap={36}
                            speed={10}
                            pauseOnHover
                            className="h-full w-full"
                        />
                    </div>

                    {/* Column 3 — scrolls up */}
                    <div className="overflow-hidden">
                        <LogoLoop
                            logos={clients}
                            direction="up"
                            logoHeight={120}
                            gap={36}
                            speed={9}
                            pauseOnHover
                            className="h-full w-full"
                        />
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Client
