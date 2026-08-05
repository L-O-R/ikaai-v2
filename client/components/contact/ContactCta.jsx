
'use client'

import React from 'react'
import Link from 'next/link'
import SubHeading from '../shared/SubHeading'

const ContactCta = () => {
    return (
        <section className="py-20 md:py-28  bg-surface text-on-surface">
            <div className="container-size text-center">
                <SubHeading
                    text="Ready to Make a Diffrence"
                />
                <p className="font-sans text-body-lg text-on-surface/80 max-w-2xl mx-auto mt-4 mb-8">
                    Whether you're looking to partner with us, commission research, or join our team - we'd love to
                    hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdEJU5a7WVLR-SEuPuk3IQPcXWDDTP5J92yW_q2gi2bPmGYgg/viewform?usp=sharing&ouid=100914497929313730290"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-sans text-label-caps uppercase rounded-xl hover:bg-surface-container-lowest transition-colors shadow-sm hover:shadow-lg shadow-on-surface/10"
                    >
                        Want a Survey?
                    </Link>
                    <Link
                        href="/services"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-on-surface/60 text-on-surface font-sans text-label-caps uppercase rounded-xl hover:bg-white/10 transition-colors"
                    >
                        Check our Services
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ContactCta