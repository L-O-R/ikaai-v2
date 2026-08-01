
import React from 'react'
import Link from 'next/link'
import SubHeading from '../shared/SubHeading'

const LifeCta = () => {
    return (
        <section className="py-20 md:py-28  bg-surface">
            <div className="container-size text-center">
                <SubHeading
                    text="Join Our"
                    highlightText="Team"
                />
                <p className="font-sans text-body-lg text-text-secondary max-w-2xl mx-auto mb-8">
                    If you're passionate about research, rural development, and making a difference — we'd love to hear
                    from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/careers"
                        className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-sans text-label-caps uppercase rounded-xl hover:bg-primary-container transition-colors shadow-lg"
                    >
                        Explore Careers
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-sans text-label-caps uppercase rounded-xl hover:bg-primary hover:text-white transition-colors"
                    >
                        Get in Touch
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default LifeCta