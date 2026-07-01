"use client";

import React, { useState } from "react";

const servicesData = [
    {
        id: 1,
        number: "01",
        title: "Social & Development Research",
        tags: ["Baseline Studies", "Endline Studies", "Needs Assessment", "Participatory Rural Appraisal", "Community Profiling", "Stakeholder Mapping"],
        description:
            "Evidence-based research across social, economic, and rural development sectors. We design rigorous studies to understand community needs, program contexts, and social determinants that shape development outcomes.",
    },
    {
        id: 2,
        number: "02",
        title: "Monitoring & Evaluation",
        tags: ["Theory of Change", "MEL Frameworks", "Program Evaluation", "Performance Indicators", "Logframe Design", "Data Quality Assurance", "Real-time Monitoring"],
        description:
            "Designing robust monitoring systems and evaluating development interventions. We build MEL frameworks, design indicators, and deliver evaluations that genuinely inform program improvement and accountability to funders.",
    },
    {
        id: 3,
        number: "03",
        title: "Data Collection & Analytics",
        tags: ["CAPI Surveys", "FGDs", "IDIs", "GIS Mapping", "Dashboards", "Data Visualisation", "Statistical Analysis"],
        description:
            "End-to-end primary data collection using CAPI, KoBoToolbox, and ODK. Quantitative surveys, qualitative FGDs and IDIs, GIS-based mapping, and analytics — turning raw field data into clean, decision-ready insights.",
    },
    {
        id: 4,
        number: "04",
        title: "Impact Assessment",
        tags: ["CSR Evaluation", "SDG Alignment", "Outcome Measurement", "Social Return on Investment", "Contribution Analysis", "Theory-based Evaluation"],
        description:
            "Measuring program outcomes, CSR effectiveness, and long-term social impact. We work with corporate foundations, government agencies, and NGOs to demonstrate accountability and tell the story of change with credible evidence.",
    },
    {
        id: 5,
        number: "05",
        title: "Capacity Building",
        tags: ["Training", "Workshops", "Institutional Strengthening", "Enumerators Training", "MEL Design", "Data Management", "Report Writing"],
        description:
            "Training institutions, researchers, enumerators, and community organisations to build lasting internal capacity. From field team inductions to executive workshops on MEL design — we transfer knowledge, not just deliverables.",
    },
    {
        id: 6,
        number: "06",
        title: "Policy & Advisory Support",
        tags: ["Policy Briefs", "Strategic Advisory", "Research Synthesis", "Evidence Gap Analysis", "Program Design", "Sectoral Assessments"],
        description:
            "Research-backed policy recommendations and strategic advisory for government bodies, bilateral agencies, and development foundations. We translate field evidence into actionable guidance that informs program design and public policy.",
    },
    {
        id: 7,
        number: "07",
        title: "Knowledge Management & Dissemination",
        tags: ["Knowledge Products", "Case Studies", "Research Reports", "Learning Briefs", "Documentation", "Knowledge Sharing", "Communications Strategy"],
        description:
            "Creating and disseminating knowledge products that make research accessible and actionable. From detailed reports to learning briefs and case studies — we ensure your findings reach the right audiences and drive real change.",
    },
];

const Services = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleService = (index) => {
        if (openIndex !== index) {
            setOpenIndex(index);
        }
    };

    return (
        <section
            className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-warm-beige"
            id="services-section"
        >
            <div className="max-w-container-max mx-auto">
                {/* Header */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-end border-b border-border-neutral pb-10 md:pb-14 mb-0">
                    <div className="md:col-span-5">
                        <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                            Our Services
                        </span>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface">
                            Capabilities We Offer
                        </h2>
                    </div>
                    <div className="md:col-span-6 md:col-start-7 md:pb-2">
                        <p className="font-body-lg text-body-lg text-text-secondary">
                            Helping governments, NGOs, CSR foundations and development agencies make evidence-based
                            decisions.
                        </p>
                    </div>
                </div>

                {/* Services List */}
                <div id="services-list">
                    {servicesData.slice(0, 6).map((service, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={service.id}
                                className={`px-4 service-row group border-b border-border-neutral ${idx === servicesData.length - 1 ? "border-b-0" : ""
                                    }`}
                            >
                                <div
                                    className="grid grid-cols-1 md:grid-cols-12 gap-gutter py-6 md:py-8 items-start cursor-pointer"
                                    onClick={() => toggleService(idx)}
                                >
                                    <div className="md:col-span-1">
                                        <span className="font-label-caps uppercase text-primary tracking-widest text-2xl font-bold">
                                            0{idx + 1}
                                        </span>
                                    </div>

                                    <div className="md:col-span-6 space-y-2">
                                        <h3 className="font-headline-md text-headline-sm text-on-surface group-hover:text-primary transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        <div
                                            className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                                                {service.description}
                                            </p>
                                            <a
                                                href="#"
                                                className="inline-flex items-center gap-1 font-label-caps text-label-caps uppercase text-primary mt-3 group/link"
                                            >
                                                Learn More
                                                <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">
                                                    arrow_forward
                                                </span>
                                            </a>
                                        </div>
                                    </div>

                                    <div
                                        className={`md:col-span-4 flex flex-wrap gap-2 justify-end overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        {service.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-label-caps text-xs uppercase tracking-widest text-primary px-4 py-1.5 bg-primary-container/20 border border-primary/40 rounded-full shrink-0"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Arrow */}
                                    <div className="md:col-span-1 flex justify-end items-start pt-1">
                                        <span
                                            className={`material-symbols-outlined text-text-muted group-hover:text-primary transition-all duration-300 ${isOpen ? "rotate-45" : ""
                                                }`}
                                        >
                                            add
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;