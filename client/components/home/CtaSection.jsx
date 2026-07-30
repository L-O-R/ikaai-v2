import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CtaSection = () => {
    return (
        <section className="relative py-24 md:py-36 min-h-[80dvh]  text-white text-center overflow-hidden" id="cta-section">
            <div className="absolute inset-0">
                <Image
                    className="w-full h-full object-cover object-center"
                    width={1000}
                    height={1000}
                    src="/hero/woman-community-survey.jpg"
                    alt="Partner With Communities. Create Lasting Impact"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/70 to-black/20" />

                <div className="absolute inset-0 bg-white/5 mix-blend-soft-light" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
                <div className="w-12 h-0.5 bg-harvest-gold/80" />
                <h2 className="font-headline-lg text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white">
                    Every partnership begins with a conversation.
                </h2>

                <p className="font-body-lg text-body-md text-white/85 max-w-3xl leading-relaxed">
                    Whether you're a government agency, CSR foundation, development partner, academic institution, or nonprofit, we collaborate to transform research into measurable social impact.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Link
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-label-caps text-label-caps uppercase rounded-xl hover:bg-warm-beige hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                        href="/contact"
                    >
                        Start a Conversation
                    </Link>

                </div>
            </div>
        </section>
    )
}

export default CtaSection