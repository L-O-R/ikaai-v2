// app/about/components/LifeCulture.jsx
import React from 'react'

const cultureValues = [
    {
        icon: 'lightbulb',
        title: 'Curiosity-Driven',
        description: 'We ask the hard questions, challenge assumptions, and always seek deeper understanding.',
    },
    {
        icon: 'diversity_3',
        title: 'Collaborative Spirit',
        description: 'Great ideas come from diverse perspectives. We work across disciplines and geographies.',
    },
    {
        icon: 'school',
        title: 'Continuous Learning',
        description: 'We invest in growth — through training, mentorship, and learning from the communities we serve.',
    },
    {
        icon: 'balance',
        title: 'Wellbeing & Balance',
        description: 'We believe that sustainable impact starts with a healthy, supported team.',
    },
]

const LifeCulture = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-surface">
            <div className="max-w-container-max mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Our Culture
                    </span>
                    <h2 className="font-headline-lg font-semibold text-5xl md:text-7xl lg:text-headline-lg text-on-surface">
                        How We Work
                    </h2>
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {cultureValues.map((value) => (
                        <div key={value.title} className="bg-warm-beige rounded-2xl p-6 md:p-8 border border-border-neutral text-center hover-lift transition-all duration-300">
                            <div className="w-14 h-14 rounded-full bg-primary-container/10 flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-3xl text-primary">{value.icon}</span>
                            </div>
                            <h3 className="font-headline-md text-lg text-on-surface mb-3">{value.title}</h3>
                            <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LifeCulture