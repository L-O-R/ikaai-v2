
import React from 'react'

const AboutStory = () => {
    return (
        <section className=" bg-surface py-section-mobile md:py-section-desktop">
            <div className="max-w-container-max mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
                    <div>
                        <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                            Our Story
                        </span>
                        <h2 className="font-headline-lg text-headline-md text-on-surface mb-6">
                            Building Stronger Communities
                        </h2>
                        <div className="w-16 h-0.5 bg-harvest-gold/60 mb-6" />
                        <p className="font-body-lg text-body-lg text-text-secondary leading-relaxed mb-4">
                            Founded with a vision to bridge the gap between academic research and on-the-ground
                            development, IKAAI India has been working at the intersection of evidence and action for
                            over 15 years.
                        </p>
                        <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                            Our journey began in rural Rajasthan, where we recognized that sustainable change requires
                            a deep understanding of community needs, rigorous data, and a collaborative approach that
                            places people at the centre of development.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-4/3 rounded-2xl overflow-hidden bg-surface-container-low border border-border-neutral">
                            <div className="w-full h-full flex items-center justify-center text-primary/20">
                                <span className="material-symbols-outlined text-8xl">photo_camera</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-3 lg:-right-6 bg-primary text-white px-6 py-4 rounded-xl shadow-lg">
                            <span className="font-statistic-num font-semibold text-4xl md:text-6xl lg:text-statistic-num block leading-none">15+</span>
                            <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-primary-container/80">
                                Years of Impact
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutStory