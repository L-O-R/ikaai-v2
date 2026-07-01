import React from 'react'

const TestimonialsSection = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-warm-beige" id="testimonial-section">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                    <div className="md:col-span-8">
                        <span
                            className="material-symbols-outlined text-5xl md:text-6xl text-primary/20 mb-4 block">format_quote</span>
                        <blockquote
                            className="font-headline-lg text-3xl md:text-5xl text-on-surface tracking-tight">
                            "The research provided by IKAAI didn't just give us data; it gave us a roadmap to effectively
                            implement our agricultural policies in regions we previously struggled to reach."
                        </blockquote>
                        <cite className="not-italic flex items-center gap-4 mt-8">
                            <div className="testimonial-portrait bg-primary/10 text-primary shrink-0">
                                RK
                            </div>
                            <div>
                                <span className="font-headline-md text-xl font-bold text-on-surface block">Dr. Rajesh
                                    Kumar</span>
                                <span className="font-label-caps text-xs uppercase text-text-secondary">Director of Rural
                                    Development, State Government</span>
                            </div>
                        </cite>
                    </div>
                    <div className="md:col-span-4 hidden md:block">
                        <div className="aspect-3/4 rounded-2xl overflow-hidden bg-primary/5 border border-border-neutral">
                            <div className="w-full h-full flex items-center justify-center text-primary/20">
                                <span className="material-symbols-outlined text-7xl">person</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection