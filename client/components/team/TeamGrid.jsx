
import React from 'react'
import TeamMember from './TeamMember'

const teamData = [
    {
        name: 'Dr. Ananya Sharma',
        role: 'Director of Research',
        bio: 'PhD in Development Studies with 15+ years of experience in rural research and policy advisory.',
        image: null,
    },
    {
        name: 'Vikram Singh',
        role: 'Head of Programs',
        bio: 'Expert in community-led development and livelihood programs across 8 states.',
        image: null,
    },
    {
        name: 'Priya Patel',
        role: 'Senior Researcher',
        bio: 'Specializes in impact assessment and monitoring & evaluation for development projects.',
        image: null,
    },
    {
        name: 'Rahul Deshmukh',
        role: 'Data & Analytics Lead',
        bio: 'Drives data collection, analytics, and visualization for evidence-based decision making.',
        image: null,
    },
    {
        name: 'Dr. Meera Iyer',
        role: 'Policy Advisor',
        bio: 'Brings expertise in policy research and strategic advisory for government and NGO partners.',
        image: null,
    },
    {
        name: 'Amit Kumar',
        role: 'Field Operations Manager',
        bio: 'Manages field teams and community engagement across rural India.',
        image: null,
    },
]

const TeamGrid = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-surface">
            <div className="max-w-container-max mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Meet the Team
                    </span>
                    <h2 className="font-headline-lg font-semibold text-5xl md:text-7xl lg:text-headline-lg text-on-surface">
                        Experts in Action
                    </h2>
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {teamData.map((member) => (
                        <TeamMember key={member.name} {...member} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TeamGrid