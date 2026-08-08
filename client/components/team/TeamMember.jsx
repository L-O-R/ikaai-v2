"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

const TeamMember = ({ name, role, bio, image }) => {
    const [showBio, setShowBio] = useState(false);

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setShowBio(false);
        };

        if (showBio) {
            window.addEventListener('keydown', closeOnEscape);
            return () => window.removeEventListener('keydown', closeOnEscape);
        }
    }, [showBio]);

    return (
        <>
            <article className="group flex flex-col items-center text-center">
                <div className="relative h-52 w-52 rounded-full  sm:h-80 sm:w-80">
                    <div className="relative h-full w-full  overflow-y-clip">
                        {image ? (
                            <Image
                                src={image}
                                alt={name}
                                fill
                                sizes="(min-width: 1280px) 250px, 200px"
                                className="object-contain object-bottom z-20"
                            />
                        ) : (
                            <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                                <span className="material-symbols-outlined text-display-lg! text-text-muted">person</span>
                            </div>
                        )}
                        {/*  */}
                        <div className='absolute top-15 lg:top-23 left-0 overflow-hidden w-full h-full rounded-full ring-4 ring-white z-10 bg-gray-100'></div>
                    </div>
                </div>

                <div className="relative mt-5 flex flex-col items-center">
                    <h3 className="font-display text-body-lg text-primary font-extrabold tracking-wide uppercase leading-tight">
                        {name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="font-sans text-body-md text-text-muted font-bold uppercase tracking-widest">
                            {role}
                        </span>
                        {bio && (
                            <button
                                type="button"
                                onClick={() => setShowBio(true)}
                                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-border-neutral text-primary opacity-0 transition-all group-hover:opacity-100 hover:border-primary hover:bg-primary hover:text-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary cursor-pointer"
                                aria-label={`Read more about ${name}`}
                            >
                                <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                            </button>
                        )}
                    </div>
                </div>
            </article>

            {bio && showBio && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <button
                        type="button"
                        className="absolute inset-0 bg-on-surface/45 backdrop-blur-sm cursor-default"
                        onClick={() => setShowBio(false)}
                        aria-label="Close bio"
                    />
                    <section
                        className="relative z-10 w-full max-w-lg rounded-4xl bg-surface p-6 shadow-2xl sm:p-8"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={`bio-title-${name.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                        <div>
                            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-text-muted">Team member</span>
                            <h4 id={`bio-title-${name.replace(/\s+/g, '-').toLowerCase()}`} className="mt-1 font-display text-headline-md font-extrabold uppercase tracking-wide text-primary leading-tight">
                                {name}
                            </h4>
                            <span className="mt-1 block font-sans text-body-md font-bold uppercase tracking-widest text-text-muted">
                                {role}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowBio(false)}
                            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-border-neutral bg-surface-container-high text-text-secondary transition-colors hover:bg-border-neutral hover:text-on-surface cursor-pointer"
                            aria-label="Close bio"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                        <div className="mt-6 border-t border-border-neutral pt-5">
                            <h5 className="font-sans text-xs font-bold uppercase tracking-widest text-text-muted">Description</h5>
                            <p className="mt-3 font-sans text-body-md leading-relaxed text-on-surface/90">
                                {bio}
                            </p>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default TeamMember;
