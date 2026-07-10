"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProjectCarousel({ gallery, projectTitle }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
    };

    // Auto-rotation effect
    useEffect(() => {
        if (gallery.length <= 1 || isHovered) return;

        const interval = setInterval(() => {
            handleNext();
        }, 4000); // Rotates every 4 seconds

        return () => clearInterval(interval);
    }, [currentIndex, isHovered, gallery.length]);

    return (
        <div
            className="relative w-full group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Carousel Display Box */}
            <div className="relative w-full aspect-16/7 overflow-hidden rounded-2xl bg-surface-container-low border border-border-neutral">
                {gallery.map((item, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                                }`}
                        >
                            <Image
                                src={item.image}
                                alt={item.caption || `${projectTitle} gallery image ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1200px) 100vw, 1200px"
                                priority={index === 0}
                            />
                            {/* Caption overlay */}
                            {item.caption && (
                                <div className="absolute bottom-0 left-0 right-0 p-6 pt-16 bg-linear-to-t from-black/70 via-black/20 to-transparent z-20">
                                    <p className="font-body-md text-body-md text-white/90">
                                        {item.caption}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Navigation Dots */}
            {gallery.length > 1 && (
                <div className="absolute z-30 flex space-x-2.5 bottom-5 left-1/2 -translate-x-1/2">
                    {gallery.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "bg-white scale-125"
                                : "bg-white/40 hover:bg-white/70"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Side Controls (Arrows show up on desktop hover) */}
            {gallery.length > 1 && (
                <>
                    <button
                        type="button"
                        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                        onClick={handlePrev}
                        aria-label="Previous image"
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-black/20 text-white backdrop-blur-xs border border-white/10 hover:bg-black/40 transition-all">
                            <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
                        </span>
                    </button>
                    <button
                        type="button"
                        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                        onClick={handleNext}
                        aria-label="Next image"
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-black/20 text-white backdrop-blur-xs border border-white/10 hover:bg-black/40 transition-all">
                            <span className="material-symbols-outlined text-xl">arrow_forward_ios</span>
                        </span>
                    </button>
                </>
            )}
        </div>
    );
}