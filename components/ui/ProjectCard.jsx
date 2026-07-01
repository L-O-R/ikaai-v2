"use client";

import React from "react";

const ProjectCard = ({ project }) => {
    return (
        <div className="group relative overflow-hidden space-y-2 cursor-pointer">
            {/* Image */}
            <div className="bg-surface p-4 rounded-2xl">
                <div className="aspect-4/3 relative overflow-hidden">
                    <img
                        src={project.img}
                        alt={project.title}
                        className="rounded-xl w-full h-full object-cover transition duration-500 group-hover:blur-sm"
                    />
                    {/* Overlay with Logo - centered */}
                    <div className="rounded-xl absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                        <div className="transition duration-500">
                            <img
                                src={project.clientLogo}
                                alt="Client Logo"
                                className="h-30 w-auto object-contain"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Title - below image */}
            <div className=" bg-surface p-4 rounded-2xl">
                <h3 className="font-headline-md text-body-lg font-semibold text-on-surface group-hover:text-primary transition-colors duration-300">
                    {project.title}
                </h3>
            </div>
        </div>
    );
};

export default ProjectCard;