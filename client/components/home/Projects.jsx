"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import { getErrorMessage } from "@/data/apiErrors";
import { getFeaturedProjects } from "@/data/getFeaturedProjects";
import { useEffect, useState } from "react";

const Projects = () => {
    const [featured, setFeatured] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        getFeaturedProjects()
            .then((data) => {
                if (isMounted) setFeatured(data.results.slice(0, 4));
            })
            .catch((err) => {
                if (isMounted) setError(getErrorMessage(err, "Unable to load featured projects."));
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section
            className="py-section-mobile md:pt-section-desktop px-4 md:px-8 bg-warm-beige"
            id="projects-section"
        >
            <div className="max-w-container-max mx-auto">
                <div className="mb-12">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                        Our Projects
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                        Making Impact Across India
                    </h2>
                    <p className="font-body-md text-body-md text-text-secondary max-w-xl mt-4">
                        From rural development to urban sanitation, see how we are helping
                        communities thrive.
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {[0, 1, 2, 3].map((item) => (
                            <div key={item} className="space-y-2">
                                <div className="h-16 rounded-2xl bg-surface-container-high animate-pulse" />
                                <div className="aspect-4/3 rounded-2xl bg-surface-container-high animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <p className="font-body-md text-body-md text-text-muted">{error}</p>
                ) : featured.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {featured.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <p className="font-body-md text-body-md text-text-muted">
                        Featured projects will appear here once they are published.
                    </p>
                )}
            </div>
        </section>
    );
};

export default Projects;
