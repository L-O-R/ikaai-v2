
import React from 'react'
import Link from 'next/link'

const CtaSection = () => {
    return (
        <section className="py-20 md:py-28  bg-primary text-white">
            <div className="container-size text-center">
                <SubHeading
                    text="Join Us in Transforming"
                    highlightText="Rural India"
                    className='flex flex-col'
                />
                <p className="font-sans text-body-lg text-white/80 max-w-2xl mx-auto mb-8">
                    Whether you're a researcher, partner, or supporter — your contribution can help create lasting change
                    in communities across India.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-sans text-label-caps uppercase rounded-xl hover:bg-surface-container-lowest transition-colors shadow-lg"
                    >
                        Get in Touch
                    </Link>
                    <Link
                        href="/about/team"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-sans text-label-caps uppercase rounded-xl hover:bg-white/10 transition-colors"
                    >
                        Meet Our Team
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CtaSection