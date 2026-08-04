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
                <div className="relative h-52 w-52 rounded-full bg-white p-1.5 ring-4 ring-white  sm:h-80 sm:w-80">
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-surface-container-high">
                        {image ? (
                            <Image
                                src={image}
                                alt={name}
                                fill
                                sizes="(min-width: 1280px) 250px, 200px"
                                className="object-cover object-top"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-surface-container-high">
                                <span className="material-symbols-outlined text-6xl text-text-muted">person</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-5 flex flex-col items-center">
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
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-border-neutral text-primary opacity-0 transition-all group-hover:opacity-100 hover:border-primary hover:bg-primary hover:text-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary cursor-pointer"
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
                        className="relative z-10 w-full max-w-lg rounded-[2rem] bg-surface p-6 shadow-2xl sm:p-8"
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
