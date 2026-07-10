
import React from 'react'

const eventsData = [
    {
        title: 'Field Visits',
        description: 'Regular visits to communities across India — understanding ground realities and building connections.',
        icon: 'explore',
    },
    {
        title: 'Team Retreats',
        description: 'Annual gatherings that strengthen bonds, share learning, and recharge our collective energy.',
        icon: 'groups',
    },
    {
        title: 'Workshops & Training',
        description: 'Continuous skill-building in research methods, data analytics, and development practice.',
        icon: 'workspace_premium',
    },
    {
        title: 'Community Celebrations',
        description: 'Celebrating milestones with the communities we work alongside — because their success is our success.',
        icon: 'celebration',
    },
]

const LifeEvents = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop  bg-warm-beige">
            <div className="container mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Life in Action
                    </span>
                    <h2 className="font-headline-lg text-headline-md text-on-surface">
                        Moments That Matter
                    </h2>
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {eventsData.map((event) => (
                        <div key={event.title} className="bg-surface rounded-2xl p-6 md:p-8 border border-border-neutral flex items-start gap-4 md:gap-6 hover-lift transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-2xl text-primary">{event.icon}</span>
                            </div>
                            <div>
                                <h3 className="font-headline-md text-lg text-on-surface mb-2">{event.title}</h3>
                                <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LifeEvents