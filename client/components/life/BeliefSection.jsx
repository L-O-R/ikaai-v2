'use client'

import React from 'react'

const beliefsData = {
    title: "What We Believe In",
    beliefs: [
        {
            title: "We are integrated",
            description: "We connect dots. Be it of disciplines, cultures, teams or points of view - synergies and respect drive our research, outreach, and behaviour."
        },
        {
            title: "We have an international outlook",
            description: "We observe the planet as a whole and believe that an international outlook helps us serve India better. At the Council, we recognise and work on local, national, and global challenges. We aim to keep all research outputs internationally relevant."
        },
        {
            title: "We are independent",
            description: "Without our independence, we are nothing. With it, we have nothing to fear. At the Council, we separate funding from findings and take no institutional positions. All monitoring and evaluation systems are designed to prevent conflict of interest. Editorial independence is most sacred to us."
        },
        {
            title: "We are a team",
            description: "Public policy needs many minds to work together. At the Council, leadership is by initiative, not seniority. Anyone can conceive an idea, do the initial research, and build a team across focus areas to execute their vision. We are dreamers!"
        },
        {
            title: "We believe in rigour",
            description: "We understand that public policy is a conservative business. It is not easy to convince millions of people about the need for change. At the Council, facts are sacred. We strive to translate our research outcomes into improved governance."
        },
        {
            title: "We communicate to change",
            description: "We believe in strategic outreach as the means to disseminate our research and its impact. We experiment with diverse communication channels, informing and engaging with our stakeholders from across the world."
        }
    ]
}

const BeliefCard = ({ title, description }) => {
    return (
        <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-border-neutral hover-lift transition-all duration-300 group h-full flex flex-col">
            <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center mb-4 shrink-0">
                <span className="material-symbols-outlined text-primary text-xl">verified</span>
            </div>
            <h3 className="font-headline-md text-xl text-on-surface group-hover:text-primary transition-colors mb-3">
                {title}
            </h3>
            <p className="font-body-md text-body-md text-text-secondary leading-relaxed flex-grow">
                {description}
            </p>
        </div>
    )
}

const BeliefSection = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-surface">
            <div className="max-w-container-max mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Our Values
                    </span>
                    <h2 className="font-headline-lg font-semibold text-5xl md:text-7xl lg:text-headline-lg text-on-surface">
                        {beliefsData.title}
                    </h2>
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mx-auto mt-4" />
                </div>

                {/* Beliefs Grid — equal heights */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
                    {beliefsData.beliefs.map((belief, index) => (
                        <BeliefCard
                            key={index}
                            title={belief.title}
                            description={belief.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BeliefSection