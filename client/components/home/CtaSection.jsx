import React from 'react'

const CtaSection = () => {
    return (
        <section className="relative py-24 md:py-32 px-4 md:px-8 text-white text-center overflow-hidden" id="cta-section">
            <div className="absolute inset-0">
                <img className="w-full h-full object-cover"
                    data-alt="Vast rural landscape with farmers working in fields at golden hour"
                    src="./featuredImage.png" />
                <div className="cta-overlay absolute inset-0"></div>
            </div>
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
                <h2 className="font-display-lg-mobile md:font-headline-lg text-white text-3xl font-semibold" >
                    Together,<br />we can transform<br />rural India.
                </h2>
                <p className="font-body-lg text-white/90 max-w-2xl">
                    Join us in our mission to unlock potential and create sustainable change across thousands of villages.
                    Your support makes our field research and community interventions possible.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-3">
                    <a className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-label-caps text-label-caps uppercase rounded-xl hover:bg-surface-container-lowest transition-colors shadow-lg"
                        href="#">Connect Now</a>
                    <a className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-label-caps text-label-caps uppercase rounded-xl hover:bg-white/10 transition-colors"
                        href="#">Partner With Us</a>
                </div>
            </div>
        </section>
    )
}

export default CtaSection