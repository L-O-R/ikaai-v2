
'use client'

import React from 'react'
import Link from 'next/link'
import SubHeading from '../shared/SubHeading'

const ContactCta = () => {
    return (
        <section className="py-20 md:py-28  bg-primary text-white">
            <div className="container-size text-center">
                <SubHeading
                    text="Ready to Make"
                    highlightText="a Difference?"
                />
                <p className="font-sans text-body-lg text-white/80 max-w-2xl mx-auto mb-8">
                    Whether you're looking to partner with us, commission research, or join our team — we'd love to
                    hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="https://forms.google.com/your-survey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-sans text-label-caps uppercase rounded-xl hover:bg-surface-container-lowest transition-colors shadow-lg"
                    >
                        Want a Survey?
                    </Link>
                    <Link
                        href="/services"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-sans text-label-caps uppercase rounded-xl hover:bg-white/10 transition-colors"
                    >
                        Check our Services
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ContactCta