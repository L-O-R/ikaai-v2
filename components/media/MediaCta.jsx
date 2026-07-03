// root/components/media/MediaCta.jsx
'use client'

import React from 'react'
import Link from 'next/link'

const MediaCta = () => {
    return (
        <section className="py-20 md:py-28 px-4 md:px-8 bg-primary text-white">
            <div className="max-w-container-max mx-auto text-center">
                <h2 className="font-headline-lg font-semibold text-5xl md:text-7xl lg:text-headline-lg text-white mb-6">
                    See Our Work in Action
                </h2>
                <p className="font-body-lg text-body-lg text-white/80 max-w-2xl mx-auto mb-8">
                    Every photograph tells a story of change. From community workshops to field research — these
                    moments define our journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/stories"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-label-caps text-label-caps uppercase rounded-xl hover:bg-surface-container-lowest transition-colors shadow-lg"
                    >
                        Read Our Stories
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-label-caps text-label-caps uppercase rounded-xl hover:bg-white/10 transition-colors"
                    >
                        Get in Touch
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default MediaCta