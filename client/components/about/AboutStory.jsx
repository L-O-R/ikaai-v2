import Image from 'next/image'
import React from 'react'

const AboutStory = () => {
    return (
        <section className="bg-surface py-section-mobile md:py-section-desktop">
            <div className="container-size px-gutter">
                <div>
                    <span className="font-sans text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Founders&apos; Message
                    </span>

                    <h2 className="font-display text-headline-lg font-semibold text-on-surface mb-6">
                        Every great journey begins with an idea. Ours began with a shared purpose.
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-start mt-12">
                    <div>

                        <p className="font-sans text-body-md text-text-secondary leading-relaxed mb-4">
                            Our journey started in 2021 with freelance Monitoring &amp;
                            Evaluation and research assignments alongside different Government
                            of India ministries. We came from different domains - one of us in
                            international cooperation, the other in national statistics - but
                            shared the same belief: <span className='italic font-semibold'>research should do more than produce
                                reports.</span> It should help solve problems and create lasting impact.
                        </p>
                        <p className="font-sans text-body-md text-text-secondary leading-relaxed">
                            That belief led us to found <span className="font-semibold text-on-surface">Ikaai India </span> in
                            May 2023. What began as a company focused on Monitoring, Evaluation
                            &amp; Learning has since grown into a multidisciplinary research and
                            advisory organization — one that still holds the same purpose we
                            started with: creating knowledge that drives better decisions,
                            stronger institutions, and meaningful change for society.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-4/3 rounded-2xl overflow-hidden bg-surface-container-low border border-border-neutral">
                            <div className="w-full h-full flex items-center justify-center text-primary/20">
                                <Image
                                    src={'/team/devashish-chauhan.png'}
                                    alt='devashish-chauhan'
                                    width={500}
                                    height={500}
                                    className='w-full h-full object-cover object-top'
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutStory