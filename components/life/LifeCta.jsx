// app/about/components/LifeCta.jsx
import React from 'react'
import Link from 'next/link'

const LifeCta = () => {
    return (
        <section className="py-20 md:py-28 px-4 md:px-8 bg-surface">
            <div className="max-w-container-max mx-auto text-center">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
                    Join Our Team
                </h2>
                <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mx-auto mb-8">
                    If you're passionate about research, rural development, and making a difference — we'd love to hear
                    from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/careers"
                        className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-label-caps text-label-caps uppercase rounded-xl hover:bg-primary-container transition-colors shadow-lg"
                    >
                        Explore Careers
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-label-caps text-label-caps uppercase rounded-xl hover:bg-primary hover:text-white transition-colors"
                    >
                        Get in Touch
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default LifeCta