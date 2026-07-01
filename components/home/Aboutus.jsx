import React from 'react'
import ImpactUs from '../ui/ImpactUs'

const Aboutus = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-warm-beige">
            <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
                <div className="md:col-span-8">
                    <h2 className="font-headline-lg text-headline-md text-primary mb-6">
                        Building stronger rural communities through research, innovation, and action.
                    </h2>
                </div>
                <div className="md:col-span-4 flex items-end pb-4">
                    <p className="font-body-md text-body-lg text-text-secondary">
                        We bridge the gap between academic insights and on-the-ground realities, creating scalable solutions
                        that address the unique challenges of rural India.
                    </p>
                </div>
            </div>
            <ImpactUs />
        </section>

    )
}

export default Aboutus