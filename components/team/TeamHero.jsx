

import React from 'react'

const TeamHero = () => {
    return (
        <section className="relative min-h-screen bg-warm-beige flex items-center justify-center px-4 md:px-8 overflow-hidden pt-32 pb-16 md:pb-24">
            <div className="absolute inset-0 bg-linear-to-br from-primary-container/5 via-transparent to-warm-beige/20" />

            <div className="relative z-10 max-w-container-max mx-auto w-full text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Our Team
                    </span>
                    <h1 className="font-display-lg text-display-lg text-on-surface leading-[1.05] tracking-tight">
                        The People Behind<br />
                        <span className="text-primary">the Impact</span>
                    </h1>
                    <div className="w-20 h-0.5 bg-harvest-gold/60 mx-auto my-6" />
                    <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        A diverse team of researchers, development practitioners, and changemakers united by a common
                        purpose — creating sustainable change in rural India.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8 justify-center">
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Researchers
                        </span>
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Practitioners
                        </span>
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Changemakers
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TeamHero