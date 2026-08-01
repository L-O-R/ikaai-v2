'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { servicesData } from '@/lib/data/servicesData'
import Link from 'next/link'

const INTERVAL_MS = 6000

const images = [
    { src: '/hero/community-research-field-visit.jpg', label: 'Research Begins With Listening' },
    { src: '/hero/rural-household-community-engagement.jpg', label: 'Working Together for Inclusive Development' },
    { src: '/hero/community-dialogue-village-meeting.jpg', label: 'Communities Shape Every Solution' },
    { src: '/hero/mushroom-processing-value-chain.jpg', label: 'From Production to Prosperity' },
]

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const intervalRef = useRef(null)
    const progressRef = useRef(null)
    const startTimeRef = useRef(null)

    const goTo = useCallback((index) => {
        setCurrentIndex(index)
        setProgress(0)
        startTimeRef.current = performance.now()
    }, [])

    const startCycle = useCallback(() => {
        clearInterval(intervalRef.current)
        clearInterval(progressRef.current)
        startTimeRef.current = performance.now()

        // Progress ticker (every 50ms)
        progressRef.current = setInterval(() => {
            const elapsed = performance.now() - startTimeRef.current
            setProgress(Math.min((elapsed / INTERVAL_MS) * 100, 100))
        }, 50)

        // Slide advance
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
            setProgress(0)
            startTimeRef.current = performance.now()
        }, INTERVAL_MS)
    }, [])

    useEffect(() => {
        startCycle()
        return () => {
            clearInterval(intervalRef.current)
            clearInterval(progressRef.current)
        }
    }, [startCycle])

    const handleGoTo = (index) => {
        clearInterval(intervalRef.current)
        clearInterval(progressRef.current)
        goTo(index)
        startCycle()
    }

    return (
        // The outer section fills the full viewport height with the header offset
        <section className="relative flex overflow-hidden" style={{ height: '100svh', paddingTop: 'var(--header-height, 5rem)' }}>

            {/* ── SLIDESHOW CARD ── 2.5% margin each side, rounded corners */}
            <div
                className="relative flex-1 overflow-hidden mx-6 mb-6 rounded-3xl"
            >
                {/* ── IMAGES ── */}
                {images.map((img, index) => (
                    <div
                        key={img.src}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <Image
                            src={img.src}
                            alt={img.label}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            sizes="95vw"
                        />
                    </div>
                ))}

                {/* ── OVERLAYS ── */}
                {/* Darker overall overlay and gradients for superior contrast and readability */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-linear-to-b from-black/55 via-transparent to-black/85" />
                <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />

                {/* ── CONTENT LAYER ── */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-10 text-white">

                    {/* TOP ROW: Title block (left) & Services list (right) */}
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6 w-full">
                        {/* Title block */}
                        <div>
                            <h1 className="font-display leading-none tracking-tight font-bold text-white drop-shadow-xl text-headline-xl">
                                ikaai India
                            </h1>
                            <p className="font-sans text-lg md:text-2xl text-white/95 mt-3 ml-1 font-semibold tracking-wide drop-shadow-md">
                                Research and Consultancy
                            </p>
                        </div>

                        {/* Services list */}
                        <div className=" w-full lg:w-auto mt-4 lg:mt-20">
                            <ul className="flex flex-col gap-x-4 gap-y-2 lg:gap-x-0 lg:space-y-1.5 list-none">
                                {servicesData.map((service, index) => (
                                    <li key={index}>
                                        <Link
                                            href={`/services#${service.slug}`}
                                            className="font-sans text-body-md text-white hover:text-emerald-300 font-semibold tracking-wide transition-colors duration-200"
                                        >
                                            {service.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* BOTTOM ROW: Measuring Impact (left) & Pagination (right) */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 w-full mt-auto">

                        {/* Measuring impact accross bharat */}
                        <div className="max-w-3xs">
                            <p className="font-sans text-body-md tracking-widest text-white/95 capitalize drop-shadow-md pl-3 leading-normal">
                                Measuring impact accross bharat
                            </p>
                        </div>

                        {/* PAGINATION — bottom right */}
                        <div className="flex flex-col items-start sm:items-end gap-3 pb-1 shrink-0">

                            {/* Slide dots with animated progress arc */}
                            <div className="flex items-center gap-2">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleGoTo(idx)}
                                        aria-label={`Go to slide ${idx + 1}`}
                                        className="relative w-8 h-1.5 rounded-full overflow-hidden bg-white/30 hover:bg-white/50 cursor-pointer transition-colors duration-200 focus:outline-none"
                                    >
                                        {/* Animated fill for the active slide */}
                                        {idx === currentIndex && (
                                            <span
                                                className="absolute inset-y-0 left-0 bg-white rounded-full transition-none"
                                                style={{ width: `${progress}%` }}
                                            />
                                        )}
                                        {/* Completed slides show full white */}
                                        {idx < currentIndex && (
                                            <span className="absolute inset-0 bg-white rounded-full" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Counter + current label */}
                            <div className="flex items-baseline gap-2 text-white/70">
                                <span className="font-mono text-xs tracking-widest">
                                    {String(currentIndex + 1).padStart(2, '0')}
                                    <span className="text-white/40 mx-1">/</span>
                                    {String(images.length).padStart(2, '0')}
                                </span>
                                <span className="font-sans text-xs text-white/60 hidden md:inline">
                                    {images[currentIndex].label}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection