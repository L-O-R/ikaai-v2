"use client";

import Image from 'next/image';
import React from 'react';

const TeamMember = ({ name, role, bio, tagline, image }) => {
    return (
        <div className="group relative aspect-square rounded-2xl overflow-hidden border border-border-neutral bg-surface-container-high shadow-xs">


            {image ? (
                <div className="relative w-full h-full bg-white mix-blend-multiply overflow-hidden">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top scale-100 group-hover:scale-105 group-hover:blur-sm transition-all duration-500 ease-out"
                    />
                </div>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-surface-container">
                    <span className="material-symbols-outlined text-6xl text-text-muted">person</span>
                </div>
            )}

            <div className="absolute top-4 right-4 z-20 max-w-[75%] text-right">
                <span className="inline-block bg-surface-container-high/95 backdrop-blur-md text-earth-copper border border-primary/30 font-label-caps text-body-sm font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm leading-snug">
                    {role}
                </span>
            </div>

            <div className="absolute inset-0 bg-linear-to-t from-on-surface/90 via-on-surface/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-95" />

            <div className="absolute bg-linear-to-t from-on-surface/90 via-on-surface/80 to-transparent inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end transition-transform duration-500 ease-out transform translate-y-0">


                <div className="transition-transform duration-500 ease-out transform group-hover:-translate-y-2">
                    <h3 className="font-headline-md text-headline-sm text-inverse-on-surface font-bold leading-tight">
                        {name}
                    </h3>
                    {tagline && (
                        <p className="font-body-md text-body-sm text-inverse-on-surface/90 mt-1 leading-snug group-hover:hidden transition-all">
                            {tagline}
                        </p>
                    )}
                </div>

                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                    <div className="overflow-hidden ">
                        <p className="font-body-md text-body-md text-inverse-on-surface/90 leading-relaxed pt-3 border-t border-white/20 ">
                            {bio}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TeamMember;