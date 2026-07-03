"use client";

import React from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import { projectsData } from "@/data/project";

const Projects = () => {
    const featured = projectsData.filter((p) => p.isFeatured);


    return (
        <section
            className="py-section-mobile md:pt-section-desktop px-4 md:px-8 bg-warm-beige"
            id="projects-section"
        >
            <div className="max-w-container-max mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                        Our Projects
                    </span>
                    <h2 className="font-headline-lg font-semibold text-5xl md:text-7xl lg:text-headline-lg text-on-surface">
                        Making Impact Across India
                    </h2>
                    <p className="font-body-md text-body-md text-text-secondary max-w-xl mt-4">
                        From rural development to urban sanitation — see how we’re helping
                        communities thrive.
                    </p>
                </div>

                {/* Grid – 2 columns on md+, 1 on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {featured.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;