
'use client'

import React from 'react'
import Link from 'next/link'

const ContactCta = () => {
    return (
        <section className="py-20 md:py-28 px-4 md:px-8 bg-primary text-white">
            <div className="max-w-container-max mx-auto text-center">
                <h2 className="font-headline-lg font-semibold text-5xl md:text-7xl lg:text-headline-lg text-white mb-6">
                    Ready to Make a Difference?
                </h2>
                <p className="font-body-lg text-body-lg text-white/80 max-w-2xl mx-auto mb-8">
                    Whether you're looking to partner with us, commission research, or join our team — we'd love to
                    hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="https://forms.google.com/your-survey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-label-caps text-label-caps uppercase rounded-xl hover:bg-surface-container-lowest transition-colors shadow-lg"
                    >
                        Want a Survey?
                    </Link>
                    <Link
                        href="/services"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-label-caps text-label-caps uppercase rounded-xl hover:bg-white/10 transition-colors"
                    >
                        Check our Services
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ContactCta