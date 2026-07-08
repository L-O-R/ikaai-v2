import React from 'react'

const OurApproach = () => {
    return (
        <section className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-surface" id="approach-section">
            <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                <div>
                    <span
                        className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">Methodology</span>
                    <h2 className="font-headline-lg font-semibold text-5xl md:text-7xl lg:text-headline-lg text-on-surface mb-5">Our Approach</h2>
                    <p className="font-body-lg text-body-lg text-text-secondary mb-8">
                        We believe in systemic change driven by evidence and rooted in community participation. Our
                        methodology ensures interventions are sustainable, scalable, and contextually relevant.
                    </p>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3 p-6 bg-surface-container-low rounded-2xl border border-border-neutral">
                        <div
                            className="w-11 h-11 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">psychology</span>
                        </div>
                        <h4 className="font-headline-md text-lg font-semibold text-on-surface">Evidence-Based</h4>
                        <p className="font-body-md text-text-secondary text-sm">Rigorous research forms the foundation of all
                            our program designs.</p>
                    </div>
                    <div className="flex flex-col gap-3 p-6 bg-surface-container-low rounded-2xl border border-border-neutral">
                        <div
                            className="w-11 h-11 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">group</span>
                        </div>
                        <h4 className="font-headline-md text-lg font-semibold text-on-surface">Community-Led</h4>
                        <p className="font-body-md text-text-secondary text-sm">Local ownership ensures long-term sustainability
                            of initiatives.</p>
                    </div>
                    <div className="flex flex-col gap-3 p-6 bg-surface-container-low rounded-2xl border border-border-neutral">
                        <div
                            className="w-11 h-11 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">trending_up</span>
                        </div>
                        <h4 className="font-headline-md text-lg font-semibold text-on-surface">Scalable Impact</h4>
                        <p className="font-body-md text-text-secondary text-sm">Designing models that can be adapted across
                            diverse rural contexts.</p>
                    </div>
                    <div className="flex flex-col gap-3 p-6 bg-surface-container-low rounded-2xl border border-border-neutral">
                        <div
                            className="w-11 h-11 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">handshake</span>
                        </div>
                        <h4 className="font-headline-md text-lg font-semibold text-on-surface">Collaborative</h4>
                        <p className="font-body-md text-text-secondary text-sm">Partnering with government and civil society for
                            broader reach.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurApproach