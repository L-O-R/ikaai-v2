
'use client'

import React from 'react'
import SubHeading from '../shared/SubHeading';

const timelineData = [
    {
        year: "2021",
        title: "The Beginning",
        description:
            "Began our journey by undertaking freelance Monitoring & Evaluation and research assignments in different sectors across India.",
    },
    {
        year: "2022",
        title: "Shared Vision",
        description:
            "Built a shared vision to create a research organization focused on quality, credibility, and impact.",
    },
    {
        year: "May 2023",
        title: "Ikaai India Founded",
        description:
            "Founded Ikaai India with the mission of transforming data into meaningful insights and actionable recommendations.",
    },
    {
        year: "2024",
        title: "Expansion",
        description:
            "Expanded into health, agriculture, livelihoods, governance, environment, energy, education, CSR, and public policy research.",
    },
    {
        year: "December 2024",
        title: "International Milestone",
        description:
            "Successfully completed our first internationally funded development evaluation project.",
    },
    {
        year: "2025",
        title: "Government Studies",
        description:
            "Began executing large-scale, multi-state research and evaluation studies for Government of India ministries and public institutions.",
    },
    {
        year: "March 2025",
        title: "DDA Empanelment",
        description:
            "Empanelled with the Delhi Development Authority (DDA), strengthening our presence in public sector research and urban development.",
    },
    {
        year: "2026",
        title: "Growing Impact",
        description:
            "Successfully completed 20+ studies and reached 1.25L+ respondents through large-scale studies across India.",
    },
    {
        year: "Looking Ahead",
        title: "The Future",
        description:
            "Expanding our expertise across seven core domains, strengthening partnerships across India, and building collaborations with global development organizations to create meaningful impact through research, advisory, and innovation.",
    },
];

const Timeline = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop  bg-surface">
            <div className="container-size">
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-sans text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Our Journey
                    </span>
                    <SubHeading
                        text="Timeline"
                        highlightText="of Impact"
                    />
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mx-auto mt-4" />
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-container/20 -translate-x-1/2" />

                    <div className="space-y-8 md:space-y-12">
                        {timelineData.map((item, index) => {
                            const isEven = index % 2 === 0
                            return (
                                <div key={item.year} className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    {/* Dot */}
                                    <div className="absolute left-4 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-white -translate-x-1/2 z-10" />

                                    {/* Content */}
                                    <div className={`pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                        <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border-neutral hover-lift transition-all duration-300">
                                            <span className="font-display text-headline-sm text-primary block">
                                                {item.year}
                                            </span>
                                            <h3 className="font-display text-lg text-on-surface mt-2">
                                                {item.title}
                                            </h3>
                                            <p className="font-sans text-body-md text-text-secondary mt-2 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Timeline