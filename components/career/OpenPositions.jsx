
'use client'

import React, { useState } from 'react'

const jobListings = [
    {
        id: 1,
        title: 'Senior Research Associate',
        location: 'Rajasthan, India',
        type: 'Full-time',
        department: 'Research',
        description: 'Lead and execute research projects focused on rural development, livelihoods, and community engagement. You\'ll design studies, manage field teams, and contribute to policy-relevant publications.',
    },
    {
        id: 2,
        title: 'Monitoring & Evaluation Specialist',
        location: 'Maharashtra, India',
        type: 'Full-time',
        department: 'M&E',
        description: 'Design and implement MEL frameworks for development programs. Provide technical support to partners, conduct evaluations, and ensure data-driven decision making.',
    },
    {
        id: 3,
        title: 'Field Data Coordinator',
        location: 'Madhya Pradesh, India',
        type: 'Contract',
        department: 'Field Operations',
        description: 'Manage field data collection teams, ensure data quality, and coordinate with community stakeholders. Experience with CAPI and mobile data collection tools is required.',
    },
    {
        id: 4,
        title: 'Communications & Outreach Manager',
        location: 'Delhi, India',
        type: 'Full-time',
        department: 'Communications',
        description: 'Lead our communications strategy, manage digital presence, and develop outreach materials. You\'ll amplify our research findings and stories through various channels.',
    },
    {
        id: 5,
        title: 'Research Intern',
        location: 'Remote / India',
        type: 'Internship',
        department: 'Research',
        description: 'Support research teams with literature reviews, data analysis, and fieldwork preparation. A great opportunity to gain hands-on experience in development research.',
    },
]

const OpenPositions = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const toggleJob = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section id='open-positions' className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-surface">
            <div className="max-w-container-max mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Open Positions
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                        Join Our Team
                    </h2>
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mx-auto mt-4" />
                    <p className="font-body-md text-body-md text-text-secondary max-w-2xl mx-auto mt-4">
                        We're looking for passionate individuals who want to make a difference. Explore our current
                        openings and find your place at IKAAI India.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {jobListings.map((job, index) => {
                        const isOpen = openIndex === index
                        return (
                            <div
                                key={job.id}
                                className="bg-warm-beige rounded-2xl border border-border-neutral overflow-hidden transition-all duration-300 hover:border-primary/30"
                            >
                                <button
                                    onClick={() => toggleJob(index)}
                                    className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 focus:outline-none group"
                                >
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-headline-md text-xl text-on-surface group-hover:text-primary transition-colors">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-3 mt-1">
                                            <span className="font-label-caps text-[10px] uppercase tracking-widest text-text-muted flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">location_on</span>
                                                {job.location}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-text-muted" />
                                            <span className="font-label-caps text-[10px] uppercase tracking-widest text-text-muted flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">work</span>
                                                {job.type}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-text-muted" />
                                            <span className="font-label-caps text-[10px] uppercase tracking-widest text-primary/70">
                                                {job.department}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className={`material-symbols-outlined text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                            expand_more
                                        </span>
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2 border-t border-border-neutral">
                                        <p className="font-body-md text-body-md text-text-secondary leading-relaxed mb-4">
                                            {job.description}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4">
                                            <a
                                                href={`mailto:careers@ikaai.org?subject=Application for ${job.title}`}
                                                className="inline-flex items-center gap-1 font-label-caps text-label-caps uppercase text-primary hover:text-primary/80 transition-colors group/link"
                                            >
                                                Apply Now
                                                <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">
                                                    arrow_forward
                                                </span>
                                            </a>
                                            <span className="font-body-md text-xs text-text-muted">
                                                or send your CV to careers@ikaai.org
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="text-center mt-10">
                    <p className="font-body-md text-body-md text-text-secondary">
                        Don't see a role that fits? <a href="mailto:careers@ikaai.org" className="text-primary hover:underline">Send us your CV</a> and we'll keep you in mind for future opportunities.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default OpenPositions