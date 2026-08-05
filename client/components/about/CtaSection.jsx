
import React from 'react'
import Link from 'next/link'
import SubHeading from '../shared/SubHeading'

const CtaSection = () => {
    return (
        <section className="py-20 md:py-28  bg-surface text-on-surface">
            <div className="container-size text-center max-w-4xl">
                <SubHeading
                    text="Join Us in Transforming Rural India"
                    className='flex flex-col'
                />
                <p className="mt-4 font-sans text-body-lg text-on-surface/90 max-w-2xl mx-auto mb-8">
                    Whether you're a researcher, partner, or supporter - your contribution can help create lasting change
                    in communities across India.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-sans text-label-caps uppercase rounded-xl hover:bg-warm-beige transition-colors shadow-lg"
                    >
                        Get in Touch
                    </Link>
                    <Link
                        href="/about/team"
                        className="inline-flex items-center justify-center px-8 py-4 bg-warm-beige/60 text-on-surface font-sans text-label-caps uppercase rounded-xl hover:bg-warm-beige transition-colors"
                    >
                        Meet Our Team
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CtaSection