'use client'

import React from 'react'
import Image from 'next/image'

const LifeHero = () => {
    return (
        <section className="bg-surface relative min-h-screen flex flex-col items-center justify-start px-4 md:px-8 overflow-hidden pt-32 pb-16 md:pb-24">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 via-transparent to-warm-beige/20" />

            {/* Text content - centered */}
            <div className="relative z-10 max-w-container-max mx-auto w-full text-center flex-1 flex items-center justify-center">
                <div className="max-w-3xl mx-auto">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Life at IKAAI
                    </span>
                    <h1 className="font-display-lg text-display-lg text-on-surface leading-[1.05] tracking-tight">
                        A Culture of<br />
                        <span className="text-primary">Purpose &amp; Passion</span>
                    </h1>
                    <div className="w-20 h-0.5 bg-harvest-gold/60 mx-auto my-6" />
                    <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        At IKAAI India, we believe that meaningful work happens when people are inspired, supported, and
                        connected to a purpose larger than themselves.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8 justify-center">
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Purpose
                        </span>
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Passion
                        </span>
                        <span className="font-label-caps text-label-caps uppercase text-primary/80 tracking-widest px-4 py-2 border border-primary/30 rounded-full">
                            Impact
                        </span>
                    </div>
                </div>
            </div>

            {/* Image container - 16:9, static at 90% width */}
            <div
                className="relative w-full max-w-[90%] mx-auto mt-8 md:mt-12"
                style={{
                    aspectRatio: '16 / 9',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                }}
            >
                <Image
                    src="/life/main.png"
                    alt="Life at IKAAI - Team culture"
                    fill
                    className="object-cover rounded-[24px]"
                    sizes="100vw"
                    priority
                />
            </div>
        </section>
    )
}

export default LifeHero