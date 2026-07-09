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
            className="overflow-hidden py-section-mobile md:py-section-desktop px-4 md:px-8 bg-warm-beige"
            id="testimonial-section"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-container-max mx-auto">

                {/* Slider Viewport — overflow-visible so text doesn't get cut */}
                <div className="relative overflow-visible">
                    <div
                        className="flex transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="min-w-full shrink-0 px-0"
                            >
                                {/* Quote Content */}
                                <div className="max-w-6xl mx-auto">
                                    <span className="material-symbols-outlined text-5xl md:text-6xl text-primary/20 mb-4 block">
                                        format_quote
                                    </span>
                                    <blockquote className="font-headline-lg text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-on-surface leading-[1.2] tracking-tight whitespace-normal wrap-break-word">
                                        {testimonial.quote}
                                    </blockquote>
                                    <cite className="not-italic flex items-center gap-4 mt-8">
                                        <div className="w-14 h-14 md:w-14 md:h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl md:text-2xl font-bold shrink-0">
                                            {testimonial.initials}
                                        </div>
                                        <div>
                                            <span className="font-headline-sm text-xl md:text-2xl font-semibold text-on-surface block">
                                                {testimonial.authorName}
                                            </span>
                                            <span className="font-label-caps text-xs md:text-sm uppercase text-text-secondary tracking-widest">
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
                <div className="flex justify-center gap-2 mt-12 md:mt-16">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index
                                ? 'w-12 h-2.5 bg-primary'
                                : 'bg-border-neutral hover:bg-text-muted'
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