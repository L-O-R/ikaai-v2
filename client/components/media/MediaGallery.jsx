'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Masonry from './Masonry'
import SubHeading from '../shared/SubHeading'


const mediaImages = [
    {
        id: "1",
        img: "/media/1.jpg",
        alt: "Researchers conducting household interviews in Delhi JJ clusters",
        desc: "Household interviews being conducted with residents of JJ clusters in Delhi",
        height: 620,
    },
    {
        id: "2",
        img: "/media/2.png",
        alt: "Interview with mothers at an Anganwadi centre",
        desc: "Interviews being conducted with mothers of children aged 0-6 years at Anganwadi centres",
        height: 560,
    },
    {
        id: "3",
        img: "/media/3.jpg",
        alt: "Senior citizen participating in a field interview",
        desc: "Interviews being conducted with senior citizens to capture their views and experiences",
        height: 600,
    },
    {
        id: "4",
        img: "/media/4.jpg",
        alt: "Interview with visually impaired students during research",
        desc: "Interviews being conducted with visually impaired students to understand their experiences",
        height: 540,
    },
    {
        id: "5",
        img: "/media/5.jpg",
        alt: "Taxpayer survey at GST office in Kolkata",
        desc: "Interviews with taxpayers at the GST office in Kolkata",
        height: 640,
    },
    {
        id: "6",
        img: "/media/6.jpg",
        alt: "KAP survey for Lok Sabha elections in Uttar Pradesh",
        desc: "KAP survey being conducted for Lok Sabha elections in Uttar Pradesh",
        height: 500,
    },
    {
        id: "7",
        img: "/media/7.jpg",
        alt: "Key informant interviews with faculty and staff",
        desc: "Key informant interviews being conducted with faculty and staff in colleges and schools",
        height: 650,
    },
    {
        id: "8",
        img: "/media/8.jpg",
        alt: "Site verification and stakeholder interaction",
        desc: "Site verification and stake holder interaction.",
        height: 520,
    },
    {
        id: "9",
        img: "/media/9.jpg",
        alt: "Site visit at State Transmission Utility in Andhra Pradesh",
        desc: "Site visit at STU in Andhra Pradesh",
        height: 610,
    },
    {
        id: "10",
        img: "/media/10.png",
        alt: "Community engagement during field research",
        desc: "A vibrant celebration marking a milestone achieved through collective community effort and collaboration.",
        height: 560,
    },
    {
        id: "11",
        img: "/media/11.png",
        alt: "Impact assessment site visit to State Transmission Utility",
        desc: "Site visit to STUs as part of the impact assessment of an energy sector project",
        height: 600,
    },
    {
        id: "12",
        img: "/media/12.jpg",
        alt: "Stakeholder consultation at APTRANSCO",
        desc: "Stake holder intercation at APTRANSCO",
        height: 540,
    },
    {
        id: "13",
        img: "/media/13.jpg",
        alt: "Interview with adolescent girls during field study",
        desc: "team conducting an interview with adolescent girls as part of the study",
        height: 590,
    },
    {
        id: "14",
        img: "/media/14.png",
        alt: "Field researchers interviewing adolescent girls",
        desc: "team conducting an interview with adolescent girls as part of the study",
        height: 560,
    },
    {
        id: "15",
        img: "/media/15.png",
        alt: "Third-party assessment at Anganwadi centre in Jammu and Kashmir",
        desc: "Third-party assessment being conducted at Anganwadi centres in Jammu & Kashmir",
        height: 630,
    },
    {
        id: "16",
        img: "/media/16.jpg",
        alt: "Renewable energy transmission infrastructure project",
        desc: "Transmission infrastructure constructed under renewable energy sector project",
        height: 500,
    },
    {
        id: "17",
        img: "/media/17.jpg",
        alt: "Power transmission infrastructure under renewable energy initiative",
        desc: "Transmission system infrastructure built under renewable energy sector project",
        height: 580,
    },
    {
        id: "18",
        img: "/media/18.jpg",
        alt: "Anthropometric assessment of children in Manipur",
        desc: "Anthropometric assessments of children being conducted in Manipur",
        height: 620,
    },
    {
        id: "19",
        img: "/media/19.png",
        alt: "In-depth interview with a senior citizen respondent",
        desc: "An in-depth interview being conducted with a senior citizen respondent",
        height: 560,
    },
    {
        id: "20",
        img: "/media/20.jpg",
        alt: "Anthropometric measurements at Anganwadi centres",
        desc: "Anthropometric measurements being recorded for children at Angandwadi centres across India",
        height: 640,
    },
    {
        id: "21",
        img: "/media/21.jpg",
        alt: "CSR impact assessment in West Bengal",
        desc: "CSR impact assessment being conducted in West Bengal",
        height: 570,
    },
    {
        id: "22",
        img: "/media/22.png",
        alt: "Dietary recall and KAP assessment with mothers in Maharashtra",
        desc: "Dietary recall exercise and KAP assessment being conducted with mothers of 0-6 years in Maharashtra",
        height: 620,
    },
    {
        id: "23",
        img: "/media/23.png",
        alt: "Endline assessment at Anganwadi centre",
        desc: "Endline assessment being carried out at Anganwadi centres for the malnutrition project",
        height: 540,
    },
    {
        id: "24",
        img: "/media/24.jpg",
        alt: "Field assessment for malnutrition project",
        desc: "Endline assessment being carried out at Anganwadi centres for the malnutrition project",
        height: 610,
    },
    {
        id: "25",
        img: "/media/25.jpg",
        alt: "Face-to-face interview with social welfare department beneficiaries",
        desc: "Face-to-face interviews being conducted with SWDs as part of the evaluation study",
        height: 560,
    },
    {
        id: "26",
        img: "/media/26.png",
        alt: "Field team at State Transmission Utility in Andhra Pradesh",
        desc: "Field team on-site at a State Transmission Utility (STU), Andhra Pradesh for the assessment",
        height: 630,
    },
    {
        id: "27",
        img: "/media/27.jpg",
        alt: "Household survey in Delhi informal settlements",
        desc: "Household interviews being conducted with residents of JJ clusters in Delhi",
        height: 590,
    },
];

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
                <p className="font-sans text-sm text-white/95 leading-relaxed line-clamp-3 max-w-xs">
                    {item.desc}
                </p>
                <span className="inline-block mt-2 font-sans text-[10px] uppercase tracking-widest text-white/50">
                    Click to enlarge
                </span>
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">zoom_in</span>
            </div>
        </>
    )

    return (
        <section className="py-section-mobile md:py-section-desktop  bg-surface">
            <div className="container-size">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="font-sans text-label-caps uppercase text-primary tracking-widest block mb-4">
                        Gallery
                    </span>
                    <SubHeading
                        text="Moments That"
                        highlightText="Matter"
                    />
                    <p className="font-sans text-body-md text-text-secondary max-w-2xl mx-auto mt-4">
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
                                sizes="(min-width: 1024px) 1024px, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2rem)"
                                priority
                            />
                        </div>

                        {/* Lightbox text — clearly visible with background */}
                        <div className="mt-6 px-4 py-3 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 max-w-2xl mx-auto">
                            <p className="font-display text-xl text-white text-center leading-relaxed">
                                {selectedImage.desc}
                            </p>
                            <p className="font-sans text-[10px] uppercase tracking-widest text-white/40 text-center mt-2">
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