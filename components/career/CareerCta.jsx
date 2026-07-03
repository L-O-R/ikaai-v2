
'use client'

import React from 'react'
import Link from 'next/link'

const CareerCta = () => {
    return (
        <section className="py-20 md:py-28 px-4 md:px-8 bg-primary text-white">
            <div className="max-w-container-max mx-auto text-center">
                <h2 className="font-headline-lg text-headline-lg text-white mb-6">
                    Ready to Make an Impact?
                </h2>
                <p className="font-body-lg text-body-lg text-white/80 max-w-2xl mx-auto mb-8">
                    Join us in our mission to transform rural communities through research, innovation, and
                    community-driven action.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#open-positions"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-label-caps text-label-caps uppercase rounded-xl hover:bg-surface-container-lowest transition-colors shadow-lg"
                    >
                        View Openings
                    </a>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-label-caps text-label-caps uppercase rounded-xl hover:bg-white/10 transition-colors"
                    >
                        Get in Touch
                    </Link>
                </div>
                <p className="font-body-md text-body-md text-white/60 mt-6">
                    Know someone who'd be a great fit? Refer them to us at <span className="text-white/80">careers@ikaai.org</span>
                </p>
            </div>
        </section>
    )
}

export default CareerCta