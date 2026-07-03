"use client";

import React from "react";
import { updatesData } from "@/data/updatesData";
import Link from "next/link";

const Updates = () => {
    return (
        <section
            className="py-section-mobile md:py-section-desktop px-4 md:px-8 bg-surface"
            id="updates-section"
        >
            <div className="max-w-container-max mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                        Updates
                    </span>
                    <h2 className="font-headline-lg font-semibold text-5xl md:text-7xl lg:text-headline-lg text-on-surface">
                        From Ikaai India
                    </h2>
                    <p className="font-body-md text-body-md text-text-secondary max-w-xl mt-4">
                        Stay connected with our latest news, events, and impact stories.
                    </p>
                </div>

                {/* Grid - 2 columns on md, 1 on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

                    {updatesData.map((update) => (
                        <Link
                            href={update.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={update.id}
                        >
                            <div

                                className="relative group h--auto lg:h-85 bg-surface-container-low rounded-2xl overflow-hidden border border-border-neutral hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Image */}
                                <div className="aspect-4/3 relative overflow-hidden bg-surface-container-high">
                                    <img
                                        src={update.image}
                                        alt={update.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-headline-md text-xl text-on-surface group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                        {update.title}
                                    </h3>

                                </div>
                                {/* readmore on hover */}
                                <span className="absolute bottom-3 right-3 bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full group-hover:block hidden">
                                    Read More
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Updates;