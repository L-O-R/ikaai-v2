'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Masonry from './Masonry'


const mediaImages = [
    {
        id: '1',
        img: '/media/1.jpeg',
        alt: 'Field research in rural India',
        desc: 'Researchers collecting data and engaging with rural communities during a field visit in Rajasthan.',
        height: 600,
    },
    {
        id: '3',
        img: '/media/3.jpeg',
        alt: 'Community engagement session',
        desc: 'Community members actively participating in a planning session to shape local development priorities.',
        height: 560,
    },
    {
        id: '4',
        img: '/media/4.jpeg',
        alt: 'Women self-help group meeting',
        desc: 'Women entrepreneurs collaborating to build sustainable livelihoods through collective enterprise.',
        height: 460,
    },
    {
        id: '5',
        img: '/media/5.jpeg',
        alt: 'Farmer training workshop',
        desc: 'Farmers learning climate-resilient practices to improve crop yields and protect their land.',
        height: 640,
    },
    {
        id: '6',
        img: '/media/9.jpeg',
        alt: 'Children in rural school',
        desc: 'Young students in a rural classroom, eager to learn and build a brighter future.',
        height: 500,
    },
    {
        id: '7',
        img: '/media/7.jpeg',
        alt: 'Team at work in the field',
        desc: 'The IKAAI team working alongside community members to document local knowledge and insights.',
        height: 620,
    },
    {
        id: '8',
        img: '/media/8.jpeg',
        alt: 'Community celebration',
        desc: 'A vibrant celebration marking a milestone achieved through collective community effort and collaboration.',
        height: 540,
    },
    {
        id: '9',
        img: '/media/10.jpeg',
        alt: 'Community celebration',
        desc: 'A vibrant celebration marking a milestone achieved through collective community effort and collaboration.',
        height: 600,
    },
    {
        id: '10',
        img: '/media/11.jpeg',
        alt: 'Community celebration',
        desc: 'A vibrant celebration marking a milestone achieved through collective community effort and collaboration.',
        height: 520,
    },
]

const MediaGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null)

    const openLightbox = (image) => {
        setSelectedImage(image)
        document.body.style.overflow = 'hidden'
    }

    const closeLightbox = () => {
        setSelectedImage(null)
        document.body.style.overflow = 'unset'
    }


    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && selectedImage) {
                closeLightbox()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedImage])



    const renderOverlay = (item) => (
        <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 w-full">
                <p className="font-body-md text-sm text-white/95 leading-relaxed line-clamp-3 max-w-xs">
                    {item.desc}
                </p>
                <span className="inline-block mt-2 font-label-caps text-[10px] uppercase tracking-widest text-white/50">
                    Click to enlarge
                </span>
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">zoom_in</span>
            </div>
        </>
    )

    return (
        <section className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-surface">
            <div className="max-w-container-max mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Gallery
                    </span>
                    <h2 className="font-headline-lg font-semibold text-5xl md:text-7xl lg:text-headline-lg text-on-surface">
                        Moments That Matter
                    </h2>
                    <div className="w-16 h-0.5 bg-harvest-gold/60 mx-auto mt-4" />
                    <p className="font-body-md text-body-md text-text-secondary max-w-2xl mx-auto mt-4">
                        A collection of images from our work across rural India — capturing the spirit of community,
                        collaboration, and sustainable change.
                    </p>
                </div>

                {/* Masonry Grid — real variable-height masonry, CSS-animated */}
                <Masonry
                    items={mediaImages}
                    ease="cubic-bezier(0.16, 1, 0.3, 1)"
                    duration={0.6}
                    stagger={0.05}
                    animateFrom="bottom"
                    scaleOnHover={true}
                    hoverScale={0.97}
                    blurToFocus={true}
                    colorShiftOnHover={false}
                    onItemClick={openLightbox}
                    renderOverlay={renderOverlay}
                />
            </div>

            {/* Lightbox with visible text */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        onClick={closeLightbox}
                        aria-label="Close lightbox"
                    >
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </button>

                    <div
                        className="relative max-w-5xl w-full max-h-[90vh] cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
                            <Image
                                src={selectedImage.img}
                                alt={selectedImage.alt}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        </div>

                        {/* Lightbox text — clearly visible with background */}
                        <div className="mt-6 px-4 py-3 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 max-w-2xl mx-auto">
                            <p className="font-headline-md text-xl text-white text-center leading-relaxed">
                                {selectedImage.desc}
                            </p>
                            <p className="font-label-caps text-[10px] uppercase tracking-widest text-white/40 text-center mt-2">
                                {selectedImage.alt}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default MediaGallery