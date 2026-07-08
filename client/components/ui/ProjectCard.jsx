import React from "react";

const ProjectCard = ({ project }) => {
    return (
        <div className="group relative overflow-hidden space-y-2 cursor-pointer">
            {/* Title - above image with hover indicator */}
            <div className="bg-surface p-4 rounded-2xl transition-colors duration-300 flex items-center justify-between group-hover:bg-surface-container-low">
                <h3 className="font-headline-md text-body-lg font-semibold text-on-surface group-hover:text-primary transition-colors duration-300">
                    {project.title}
                </h3>
                {/* Arrow indicator - appears on hover */}
                <span className="material-symbols-outlined text-primary text-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                    arrow_forward
                </span>
            </div>

            {/* Image Container */}
            <div className="bg-surface p-2 rounded-2xl">
                <div className="aspect-4/3 relative overflow-hidden rounded-xl group-hover:scale-[1.02] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {/* Image with zoom + blur on hover */}
                    <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:blur-xs"
                    />

                    {/* Overlay with Logo - centered */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 flex items-center justify-center pointer-events-none transition-all duration-500 rounded-xl">
                        <div className="transition-transform duration-500 group-hover:scale-110">
                            <img
                                src={project.clientLogo}
                                alt="Client Logo"
                                className="h-30 w-auto object-contain opacity-40 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;