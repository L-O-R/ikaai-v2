
import React from 'react'
import SubHeading from '../shared/SubHeading'

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
            <div className="container-size">
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-sans text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Life in Action
                    </span>
                    <SubHeading
                        text="Moments That"
                        highlightText="Matter"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {eventsData.map((event) => (
                        <div key={event.title} className="bg-surface rounded-2xl p-6 md:p-8 border border-border-neutral flex items-start gap-4 md:gap-6 hover-lift transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-2xl text-primary">{event.icon}</span>
                            </div>
                            <div>
                                <h3 className="font-display text-lg text-on-surface mb-2">{event.title}</h3>
                                <p className="font-sans text-body-md text-text-secondary leading-relaxed">
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