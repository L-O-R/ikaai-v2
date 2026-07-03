import React from 'react'

const MediaHero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden pt-32 pb-16 md:pb-24">

            <div className="absolute inset-0 bg-linear-to-br from-primary-container/5 via-transparent to-warm-beige/20" />
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,#00511e_1px,transparent_1px)] bg-[length:24px_24px]" />

            <div className="relative z-10 max-w-container-max mx-auto w-full text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Media
                    </span>
                    <h1 className="font-display-lg text-display-lg text-on-surface leading-[1.05] tracking-tight">
                        Visual Stories<br />
                        <span className="text-primary">From the Field</span>
                    </h1>
                    <div className="w-20 h-0.5 bg-harvest-gold/60 mx-auto my-6" />
                    <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        A glimpse into the communities, people, and moments that define our work across rural India.
                        Each image tells a story of resilience, collaboration, and transformation.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8 justify-center">
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Field Work
                        </span>
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Communities
                        </span>
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Impact
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MediaHero