// root/components/contact/ContactHero.jsx
'use client'

import React from 'react'

const ContactHero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden pt-32 pb-16 md:pb-24">
            <div className="absolute inset-0 bg-linear-to-br from-primary-container/5 via-transparent to-warm-beige/20" />

            <div className="relative z-10 max-w-container-max mx-auto w-full text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Get in Touch
                    </span>
                    <h1 className="font-display-lg text-display-lg text-on-surface leading-[1.05] tracking-tight">
                        Let's Connect<br />
                        <span className="text-primary">and Create Impact</span>
                    </h1>
                    <div className="w-20 h-0.5 bg-harvest-gold/60 mx-auto my-6" />
                    <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Have a question, want to partner with us, or need research support? We'd love to hear from you.
                        Reach out and let's make a difference together.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8 justify-center">
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Research
                        </span>
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Partnerships
                        </span>
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Support
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactHero