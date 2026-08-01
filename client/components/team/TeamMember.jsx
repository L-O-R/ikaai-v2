"use client";

import Image from 'next/image';
import React, { useState } from 'react';

const TeamMember = ({ name, role, bio, tagline, image }) => {
    const [showBio, setShowBio] = useState(false);

    return (
        <div className={`group relative bg-white border border-border-neutral p-6 rounded-[2rem] shadow-[6px_6px_0px_0px_var(--color-surface-container)] transition-all duration-300 ease-out flex flex-col items-center text-center overflow-hidden ${showBio ? '' : 'hover:shadow-[2px_3px_0px_0px_var(--color-border-neutral)] hover:-translate-y-1.5 hover:-rotate-1'}`}>

            {/* Top Tape Accent (Tailwind v4 classes, no style tags) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-primary/10 rounded-b-md border-x border-b border-primary/20 backdrop-blur-xs z-10" />

            {/* Avatar Section */}
            <div className="relative w-40 h-40 rounded-full bg-surface-container-high border-4 border-white shadow-md overflow-hidden flex items-center justify-center select-none">
                {image ? (
                    <div className="relative w-full h-full bg-surface-dim overflow-hidden">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            sizes="(min-width: 1280px) 250px, 200px"
                            className="object-cover object-top"
                        />
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-surface-container-high">
                        <span className="material-symbols-outlined text-6xl text-text-muted">person</span>
                    </div>
                )}
            </div>

            {/* Member Details */}
            <div className="mt-5 flex flex-col items-center flex-1">
                <h3 className="font-display text-lg text-primary font-extrabold tracking-wide uppercase leading-tight">
                    {name}
                </h3>
                <span className="font-sans text-xs text-text-muted font-bold uppercase tracking-widest mt-1">
                    {role}
                </span>
                {tagline && (
                    <p className="font-sans text-body-sm text-text-secondary mt-3 leading-relaxed max-w-[90%] flex-1">
                        {tagline}
                    </p>
                )}
            </div>

            {/* Read More Button (shown if bio is available) */}
            {bio && (
                <button
                    onClick={() => setShowBio(true)}
                    className="mt-4 px-4 py-1.5 rounded-full bg-surface-container-high hover:bg-border-neutral text-on-surface font-sans text-xs font-bold tracking-wider transition-colors duration-200 cursor-pointer"
                >
                    Read More
                </button>
            )}

            {/* Simple pop-up overlay (not a modal, light background, no scrollbars) */}
            {bio && showBio && (
                <div className="absolute inset-0 bg-surface-container-low p-6 flex flex-col justify-start text-left z-30 transition-all duration-300">

                    {/* Pop-up Header */}
                    <div className="flex justify-between items-start border-b border-border-neutral pb-3 mb-4">
                        <div>
                            <h4 className="font-display text-base text-primary font-extrabold uppercase tracking-wide leading-tight">
                                {name}
                            </h4>
                            <span className="font-sans text-[10px] text-text-muted font-bold uppercase tracking-widest block mt-0.5">
                                {role}
                            </span>
                        </div>
                        <button
                            onClick={() => setShowBio(false)}
                            className="w-7 h-7 rounded-full bg-white hover:bg-surface-container-high border border-border-neutral flex items-center justify-center text-text-secondary hover:text-on-surface transition-colors cursor-pointer"
                            aria-label="Close bio"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>

                    {/* Pop-up Body: highly readable and fits without scrollbars */}
                    <div className="flex-1 overflow-hidden">
                        <p className="font-sans text-xs sm:text-body-sm text-on-surface/90 leading-relaxed">
                            {bio}
                        </p>
                    </div>

                    <div className="text-[9px] font-sans tracking-widest uppercase text-text-muted mt-4 text-center border-t border-border-neutral/50 pt-2">
                        Ikaai India
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamMember;