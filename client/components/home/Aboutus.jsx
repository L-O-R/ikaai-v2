import React from 'react'
import ImpactUs from '../ui/ImpactUs'

const Aboutus = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop  bg-warm-beige">
            <div className="container-size grid grid-cols-1 md:grid-cols-12 gap-gutter md:mb-16">
                <div className="md:col-span-6">
                    <h2 className="font-display text-headline-lg font-bold text-primary mb-6">
                        Building stronger rural communities through research, innovation, and action.
                    </h2>
                </div>
                <div className="md:col-span-6 flex items-end pb-4 ">
                    <p className="font-sans text-body-lg text-text-secondary leading-normal">
                        Ikaai India is research, advisory, and impact-driven consulting firm committed to transforming insights into meaningful action. We partner with governments, development organizations, corporations, and institutions to design, strengthen, and deliver solutions that create measurable and sustainable impact.
                    </p>
                </div>
            </div>
            <ImpactUs />
        </section>

    )
}

export default Aboutus