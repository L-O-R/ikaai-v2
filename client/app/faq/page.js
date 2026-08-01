"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { faqData } from '@/lib/data/faqData';

// Reusable Accordion Item Component
function AccordionItem({ id, question, answer, isOpen, onToggle }) {
    return (
        <div className="border-b border-border-neutral last:border-0 py-5 transition-colors duration-200">
            <h3>
                <button
                    type="button"
                    id={`faq-title-${id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${id}`}
                    onClick={onToggle}
                    className="w-full flex items-center justify-between text-left group py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary cursor-pointer"
                >
                    <span className="text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors duration-200">
                        {question}
                    </span>
                    <span
                        className={`material-symbols-outlined text-text-secondary group-hover:text-primary transition-transform duration-300 ease-out text-body-md shrink-0 ml-4 ${isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        aria-hidden="true"
                    >
                        expand_more
                    </span>
                </button>
            </h3>

            <div
                id={`faq-content-${id}`}
                role="region"
                aria-labelledby={`faq-title-${id}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="text-body-md text-text-secondary leading-relaxed pt-3 pb-2 max-w-6xl">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FAQPage() {
    const [openId, setOpenId] = useState(null);
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const handleToggle = (id) => {
        setOpenId((prevOpenId) => (prevOpenId === id ? null : id));
    };

    // Auto-detect categories if faqData includes a `category` field.
    // If it doesn't, this just resolves to ['All'] and the filter UI hides itself.
    const categories = useMemo(() => {
        const set = new Set((faqData || []).map((f) => f.category).filter(Boolean));
        return ['All', ...Array.from(set)];
    }, []);

    const filteredFaqs = useMemo(() => {
        const q = query.trim().toLowerCase();
        return (faqData || []).filter((faq) => {
            const matchesCategory =
                activeCategory === 'All' || faq.category === activeCategory;
            const matchesQuery =
                q === '' ||
                faq.question?.toLowerCase().includes(q) ||
                faq.answer?.toLowerCase().includes(q);
            return matchesCategory && matchesQuery;
        });
    }, [query, activeCategory]);

    return (
        <main className="bg-surface min-h-screen text-on-surface selection:bg-text-muted/20">
            {/* FAQPage structured data for SEO rich results */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: (faqData || []).map((faq) => ({
                            "@type": "Question",
                            name: faq.question,
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: faq.answer,
                            },
                        })),
                    }),
                }}
            />

            {/* 1. Hero Section */}
            <section
                className=" py-section-mobile md:py-section-desktop relative overflow-hidden flex items-center"
                aria-labelledby="faq-hero-title"
            >
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#1b1b1b_1px,transparent_1px)] bg-size-[16px_16px]" />

                <div className="container-size relative z-10 text-center md:text-left">
                    <div className="max-w-4xl">
                        <span className="text-label-caps block text-text-muted mb-3 uppercase tracking-[0.15em] font-semibold">
                            Resources & Support
                        </span>
                        <h1
                            id="faq-hero-title"
                            className="text-display-lg text-on-surface font-bold tracking-tight mb-stack-md leading-[1.125]"
                        >
                            Frequently Asked Questions
                        </h1>
                        <p className="text-body-lg text-text-secondary leading-relaxed max-w-2xl">
                            Find answers regarding Ikaai India&apos;s services, project implementations, empirical research, institutional partnerships, and geographic operations.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. FAQ Accordion Section */}
            <section
                className="py-section-mobile md:py-section-desktop"
                aria-label="FAQ Directory"
            >
                <div className="container-size ">
                    <div className="max-w-7xl mx-auto">
                        {/* Search input */}
                        <div className="relative mb-stack-md">
                            <span
                                className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-[20px]!"
                                aria-hidden="true"
                            >
                                search
                            </span>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search questions..."
                                aria-label="Search frequently asked questions"
                                className="w-full bg-surface-container-lowest border border-border-neutral rounded-lg pl-12 pr-4 py-3 text-body-md text-on-surface placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            />
                        </div>

                        {/* Category filter pills — only shown when faqData actually has categories */}
                        {categories.length > 1 && (
                            <div
                                className="flex flex-wrap gap-2 mb-stack-md"
                                role="group"
                                aria-label="Filter FAQs by category"
                            >
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setActiveCategory(cat)}
                                        aria-pressed={activeCategory === cat}
                                        className={`text-body-sm font-semibold px-4 py-2 rounded-full border transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${activeCategory === cat
                                            ? 'bg-primary text-on-primary border-primary'
                                            : 'bg-surface-container-lowest text-text-secondary border-border-neutral hover:border-primary hover:text-primary'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="bg-surface-container-lowest border border-border-neutral rounded-xl p-stack-md md:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.01)]">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq) => (
                                    <AccordionItem
                                        key={faq.id}
                                        id={faq.id}
                                        question={faq.question}
                                        answer={faq.answer}
                                        isOpen={openId === faq.id}
                                        onToggle={() => handleToggle(faq.id)}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-stack-lg">
                                    <p className="text-body-md text-text-secondary">
                                        No questions match &quot;{query}&quot;. Try a different search term.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Contact CTA Section */}
            <section
                className="py-section-mobile md:py-section-desktop border-t border-border-neutral bg-surface-container-low"
                aria-labelledby="faq-cta-title"
            >
                <div className="container-size px-gutter text-center">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="w-12 h-12 rounded-full bg-warm-beige flex items-center justify-center mx-auto" aria-hidden="true">
                            <span className="material-symbols-outlined text-primary text-[24px]!">
                                help_outline
                            </span>
                        </div>

                        <div className="space-y-2">
                            <SubHeading
                                text="Still have"
                                highlightText=" questions?"
                            />
                            <p className="text-body-md text-text-secondary leading-relaxed max-w-md mx-auto">
                                If you require further support, specific research details, or partnership inquiries, please contact our team directly.
                            </p>
                        </div>

                        <div className="pt-2">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center bg-primary text-on-primary font-semibold text-body-md px-8 py-4 rounded-lg hover:bg-primary-container transition-all duration-300 shadow-sm hover-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
                            >
                                <span>Contact Us</span>
                                <span className="material-symbols-outlined ml-2 !text-[18px]" aria-hidden="true">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}