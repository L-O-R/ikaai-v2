'use client'

import React, { useState, useEffect, useCallback } from 'react'

const testimonials = [
    {
        id: 1,
        quote: "The research provided by IKAAI didn't just give us data; it gave us a roadmap to effectively implement our agricultural policies in regions we previously struggled to reach.",
        authorName: "Dr. Rajesh Kumar",
        authorTitle: "Director of Rural Development, State Government",
        initials: "RK",
    },
    {
        id: 2,
        quote: "Working with IKAAI transformed our approach to community engagement. Their evidence-based insights helped us design programs that truly resonate with the needs of rural families.",
        authorName: "Ms. Priya Sharma",
        authorTitle: "CEO, Rural Livelihoods Foundation",
        initials: "PS",
    },
    {
        id: 3,
        quote: "The Monitoring & Evaluation framework developed by IKAAI is the most robust we've seen. It has completely changed how we measure our CSR impact across tribal districts.",
        authorName: "Mr. Vikram Mehta",
        authorTitle: "Head of CSR, National Development Corp",
        initials: "VM",
    },
    {
        id: 4,
        quote: "IKAAI's field research is unparalleled. Their teams blend academic rigour with deep community trust, resulting in data that is both reliable and human-centered.",
        authorName: "Prof. Anjali Desai",
        authorTitle: "Chair of Development Studies, IIT Delhi",
        initials: "AD",
    },
]

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const totalSlides = testimonials.length

    const goToSlide = useCallback((index) => {
        if (index < 0) {
            setCurrentIndex(totalSlides - 1)
        } else if (index >= totalSlides) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(index)
        }
    }, [totalSlides])

    // Auto-slide logic
    useEffect(() => {
        if (isPaused) return

        const interval = setInterval(() => {
            goToSlide(currentIndex + 1)
        }, 7000)

        return () => clearInterval(interval)
    }, [currentIndex, goToSlide, isPaused])

    return (
        <section
            className="overflow-hidden py-section-mobile md:py-section-desktop bg-warm-beige"
            id="testimonial-section"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="container-size">

                {/* Viewport wrapper with overflow-hidden */}
                <div className="relative overflow-hidden">
                    <div
                        className="flex transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="w-full shrink-0 px-4"
                            >
                                {/* Quote Content */}
                                <div className="max-w-5xl mx-auto">
                                    <span className="material-symbols-outlined text-headline-lg text-primary/20 mb-3 sm:mb-4 block">
                                        format_quote
                                    </span>
                                    <blockquote className="font-display text-headline-sm font-normal text-on-surface leading-[1.2] tracking-tight whitespace-normal wrap-break-word">
                                        {testimonial.quote}
                                    </blockquote>
                                    <cite className="not-italic flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                                        <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-body-lg font-bold shrink-0">
                                            {testimonial.initials}
                                        </div>
                                        <div>
                                            <span className="font-display text-body-lg font-semibold text-on-surface block">
                                                {testimonial.authorName}
                                            </span>
                                            <span className="font-sans text-label-caps uppercase text-text-secondary">
                                                {testimonial.authorTitle}
                                            </span>
                                        </div>
                                    </cite>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-10 sm:mt-12 md:mt-16">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 rounded-full transition-all duration-500 ease-in-out cursor-pointer ${currentIndex === index
                                ? 'w-10 sm:w-12 bg-primary cursor-default'
                                : 'w-2 bg-border-neutral hover:bg-text-muted'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection