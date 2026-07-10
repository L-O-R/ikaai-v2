
import React from 'react'

const MissionVision = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop  bg-warm-beige">
            <div className="container mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Our Compass
                    </span>
                    <h2 className="font-headline-lg text-headline-md text-on-surface">
                        Mission &amp; Vision
                    </h2>
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Mission */}
                    <div className="bg-surface-container-low rounded-2xl p-8 md:p-10 border border-border-neutral hover-lift transition-all duration-300">
                        <div className="w-14 h-14 rounded-full bg-primary-container/10 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-3xl text-primary">flag</span>
                        </div>
                        <h3 className="font-headline-md text-headline-sm text-on-surface mb-4">Our Mission</h3>
                        <p className="font-body-lg text-body-lg text-text-secondary leading-relaxed">
                            To empower rural communities across India through rigorous research, sustainable livelihoods,
                            and community-driven development initiatives that create lasting, measurable change.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="bg-primary-container text-white rounded-2xl p-8 md:p-10 border border-primary/20 hover-lift transition-all duration-300">
                        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-3xl text-white">visibility</span>
                        </div>
                        <h3 className="font-headline-md text-headline-sm text-white mb-4">Our Vision</h3>
                        <p className="font-body-lg text-body-lg text-white/90 leading-relaxed">
                            A rural India where every community has access to evidence-based solutions, sustainable
                            livelihoods, and the opportunity to shape its own development journey.
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { icon: 'psychology', label: 'Evidence-Based' },
                        { icon: 'group', label: 'Community-Led' },
                        { icon: 'trending_up', label: 'Scalable Impact' },
                        { icon: 'handshake', label: 'Collaborative' },
                    ].map((value) => (
                        <div key={value.label} className="bg-warm-beige rounded-xl p-6 text-center border border-border-neutral">
                            <span className="material-symbols-outlined text-3xl text-primary block mb-3">{value.icon}</span>
                            <span className="font-label-caps text-label-caps uppercase text-on-surface tracking-widest">
                                {value.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MissionVision