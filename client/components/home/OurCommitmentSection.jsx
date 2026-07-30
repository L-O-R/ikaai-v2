'use client'
import React, { useRef, useState, useEffect } from 'react';

// Unified list of commitments with corresponding Material Symbols names
const commitments = [
    {
        title: "Viksit Bharat 2047",
        description: "Supporting evidence-based policy and programme implementation that contributes to India's long-term development goals.",
        icon: "account_balance" // Institution/Pillar icon
    },
    {
        title: "Sustainable Development Goals (SDGs)",
        description: "Helping organizations measure, evaluate, and strengthen their contribution to the UN Sustainable Development Goals.",
        icon: "language" // Global Earth icon
    },
    {
        title: "Climate Action & Net Zero",
        description: "Supporting sustainability, renewable energy, environmental assessments, and climate-resilient development initiatives.",
        icon: "eco" // Leaf/Eco icon
    },
    {
        title: "Skill Development",
        description: "Building institutional capacity through training, knowledge sharing, and evidence-driven learning.",
        icon: "school" // Cap/Academic icon
    },
    {
        title: "Inclusive Growth",
        description: "Promoting equitable development through research in health, education, livelihoods, governance, and social inclusion.",
        icon: "groups" // Diverse groups icon
    },
    {
        title: "Innovation & Digital Transformation",
        description: "Leveraging technology, AI, GIS, and data analytics to improve decision-making and public service delivery.",
        icon: "memory" // Microchip/Tech icon
    },
    {
        title: "Atmanirbhar Bharat",
        description: "Supporting self-reliance through research, policy advisory, MSME development, entrepreneurship, and sustainable livelihood initiatives.",
        icon: "engineering" // Tech/Gears icon
    },
    {
        title: "Sustainable Urban Development",
        description: "Supporting sustainable, inclusive, and resilient cities through urban research, planning, governance, and infrastructure advisory.",
        icon: "location_city" // City skyline icon
    },
    {
        title: "Rural Development & Inclusive Growth",
        description: "Strengthening rural communities through evidence-based research that enhances livelihoods, agriculture, social welfare, and inclusive development.",
        icon: "agriculture" // Farming/Agriculture icon
    },
    {
        title: "Good Governance & Evidence-Based Policymaking",
        description: "Enabling better governance through credible research, monitoring, evaluation, and policy advisory that support informed decision-making.",
        icon: "gavel" // Legal/Policy gavel icon
    }
];

export default function OurCommitmentSection() {
    const scrollContainerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [maxScrollIndex, setMaxScrollIndex] = useState(commitments.length - 1);

    // Update current active slide index during manual swipe/scroll
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;

        // Calculate dynamic card spacing
        const firstCard = scrollContainerRef.current.firstChild;
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth + 24; // Width + gap (24px)
        const index = Math.round(scrollLeft / cardWidth);
        setCurrentIndex(index);

        // Calculate dynamic max indices based on visible container viewport
        const maxIndex = Math.round((scrollWidth - clientWidth) / cardWidth);
        setMaxScrollIndex(maxIndex);
    };

    // Initial setup and resize tracking to establish accurate pagination bounds
    useEffect(() => {
        handleScroll();
        window.addEventListener('resize', handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    }, []);

    const scroll = (direction) => {
        if (!scrollContainerRef.current) return;

        const firstCard = scrollContainerRef.current.firstChild;
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth + 24; // Width + gap
        const { scrollLeft } = scrollContainerRef.current;

        const targetScroll = direction === 'left'
            ? scrollLeft - cardWidth
            : scrollLeft + cardWidth;

        scrollContainerRef.current.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    };

    return (
        <section
            className="bg-surface py-section-mobile md:py-section-desktop border-t border-border-neutral relative overflow-hidden"
            aria-labelledby="commitments-heading"
        >
            {/* Fine texture alignment overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#1b1b1b_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="container mx-auto px-gutter relative z-10">

                {/* Header Row: Flex container to place navigation buttons adjacent to the header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-stack-lg gap-6">
                    <div className="max-w-2xl">
                        <span className="text-label-caps block text-text-muted mb-2 uppercase tracking-[0.15em] font-semibold">
                            Our Commitment
                        </span>
                        <h2
                            id="commitments-heading"
                            className="text-headline-lg text-on-surface font-bold tracking-tight mb-stack-sm leading-[1.2em]"
                        >
                            National Development Priorities
                        </h2>
                        <p className="text-body-lg text-text-secondary leading-relaxed">
                            Aligning institutional research capabilities with strategic frameworks and sustainable execution pathways to drive systemic, evidence-based change.
                        </p>
                    </div>

                    {/* Navigation controls positioned symmetrically */}
                    <div className="flex gap-3 h-fit self-start md:self-end">
                        <button
                            onClick={() => scroll('left')}
                            disabled={currentIndex === 0}
                            className={`w-12 h-12 rounded-full border border-border-neutral flex items-center justify-center transition-all duration-200 cursor-pointer ${currentIndex === 0
                                ? 'opacity-40 pointer-events-none'
                                : 'bg-surface-container-lowest hover:bg-warm-beige text-on-surface'
                                }`}
                            aria-label="Scroll left to previous commitment"
                        >
                            <span className="material-symbols-outlined !text-[24px]" aria-hidden="true">
                                chevron_left
                            </span>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={currentIndex >= maxScrollIndex}
                            className={`w-12 h-12 rounded-full border border-border-neutral flex items-center justify-center transition-all duration-200 cursor-pointer ${currentIndex >= maxScrollIndex
                                ? 'opacity-40 pointer-events-none'
                                : 'bg-surface-container-lowest hover:bg-warm-beige text-on-surface'
                                }`}
                            aria-label="Scroll right to next commitment"
                        >
                            <span className="material-symbols-outlined !text-[24px]" aria-hidden="true">
                                chevron_right
                            </span>
                        </button>
                    </div>
                </div>

                {/* Horizontal Snap-Scroll Track */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto gap-6 snap-x snap-mandatory scroll-smooth pb-8"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {commitments.map((commitment, index) => (
                        <article
                            key={index}
                            className="group flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start bg-surface-container-lowest border border-border-neutral rounded-xl p-stack-md md:p-8 hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-300 ease-out hover-lift relative"
                        >
                            {/* Card Header with Material Icon */}
                            <div className="mb-6 flex items-center justify-between">
                                <div
                                    className="w-12 h-12 rounded-lg bg-warm-beige/60 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/10"
                                    aria-hidden="true"
                                >
                                    <span className="material-symbols-outlined text-primary !text-[24px]" style={{ fontVariationSettings: '"FILL" 0, "wght" 400' }}>
                                        {commitment.icon}
                                    </span>
                                </div>
                                <span className="text-body-sm font-semibold text-text-muted tracking-wider opacity-30 select-none">
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                            </div>

                            {/* Text Content */}
                            <div className="space-y-3 pr-4">
                                <h3 className="text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors duration-300">
                                    {commitment.title}
                                </h3>
                                <p className="text-body-md text-text-secondary leading-relaxed">
                                    {commitment.description}
                                </p>
                            </div>

                            {/* Persistent Rightward Transition Icon */}
                            <div className="absolute bottom-6 right-6 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true">
                                <span className="material-symbols-outlined text-primary !text-[20px]">
                                    arrow_forward
                                </span>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom Dot Progress Bar matching original landing page patterns */}
                <div className="flex justify-center items-center gap-2 mt-4" aria-hidden="true">
                    {commitments.map((_, dotIndex) => {
                        const isVisible = dotIndex <= maxScrollIndex;
                        if (!isVisible && maxScrollIndex > 0) return null;

                        const isActive = currentIndex === dotIndex;
                        return (
                            <button
                                key={dotIndex}
                                onClick={() => {
                                    if (scrollContainerRef.current) {
                                        const cardWidth = scrollContainerRef.current.firstChild.offsetWidth + 24;
                                        scrollContainerRef.current.scrollTo({
                                            left: dotIndex * cardWidth,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${isActive
                                    ? 'w-6 bg-primary'
                                    : 'w-1.5 bg-border-neutral hover:bg-text-muted'
                                    }`}
                                aria-label={`Go to slide ${dotIndex + 1}`}
                            />
                        );
                    })}
                </div>

            </div>
        </section>
    );
}