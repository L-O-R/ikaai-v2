import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SubHeading from '../shared/SubHeading'

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

            <div className="relative z-10 max-w-4xl flex flex-col items-start gap-6 px-section-mobile">
                <p className="mb-stack-md font-sans text-label-caps uppercase tracking-[0.2em] text-primary-fixed">
                    Beyond Research
                </p>

                <SubHeading
                    text="Every insight begins with people"
                    className='text-left'
                />

                <p className="mt-stack-lg max-w-xl text-left font-sans text-body-lg text-surface/90 space-y-2 flex flex-col">
                    <span>Behind every statistic is a story.</span>
                    <span>Behind every household is a lived reality.</span>
                    <span>Behind every community is the opportunity to create lasting change.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Link
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-sans text-label-caps uppercase rounded-xl hover:bg-warm-beige hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
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