'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const images = [
    { src: '/hero/children_learning.jpg', label: 'Children Learning' },
    { src: '/hero/woman_being_interviewed.jpg', label: 'Woman Being Interviewed' },
    { src: '/hero/enumerator.jpg', label: 'Enumerator in the Field' },
    { src: '/hero/community_meeting.jpg', label: 'Community Meeting' },
    { src: '/hero/farmer.jpg', label: 'Farmer Interaction' },
]

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const intervalRef = useRef(null)

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 5000)

        return () => clearInterval(intervalRef.current)
    }, [])

    return (
        <section className="relative min-h-screen flex overflow-hidden pt-32 pb-12 text-on-secondary">
            <div className="absolute inset-0 z-0">
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
                            sizes="100vw"
                        />
                    </div>
                ))}

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
            </div>

            <div className="max-w-container-max w-full mx-auto z-10 flex flex-col justify-between px-4 md:px-8 relative">
                <div>
                    <h1 className="text-headline-xl  font-headline-lg">
                        ikaai India
                    </h1>
                    <p className="text-xl md:text-3xl lg:-mt-6 ml-1 md:ml-2 lg:ml-4">Research and Consultancy</p>
                </div>

                <div className="flex flex-col md:flex-row justify-between max-md:gap-4">
                    <p className="self-end text-xl flex flex-col gap-1">
                        <span>Measuring impact</span>
                        <span className="md:ml-10">across Bharat</span>
                    </p>
                    <ul className="list-none space-y-2 text-xl">
                        <li>Social & Development Research</li>
                        <li>Data Collection & Analytics</li>
                        <li>Impact Assessment</li>
                        <li>Capacity Building workshops</li>
                        <li>Policy & Advisory consultancy</li>
                    </ul>
                </div>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/70 text-sm font-body-md tracking-wider">
                    <span className="font-label-caps text-xs tracking-widest">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                    </span>
                    <span>{images[currentIndex].label}</span>
                </div>
            </div>
        </section>
    )
}

export default HeroSection