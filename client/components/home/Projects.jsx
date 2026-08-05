"use client";

import ProjectCard from "@/components/ui/ProjectCard";
import { getErrorMessage } from "@/lib/api/apiErrors";
import { getFeaturedProjects } from "@/lib/api/getFeaturedProjects";
import Link from "next/link";
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
            className="py-section-mobile md:py-section-desktop bg-background"
            id="projects-section"
        >
            <div className="container-size">
                {/* 
                  Header Wrapper:
                  - Flex layout to position heading on the left and the CTA link on the right.
                  - Stacks vertically on mobile and aligns side-by-side on larger viewports.
                */}
                <div className="mb-12 md:mb-18 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 ">
                    <div>
                        <span className="font-sans text-headline-sm uppercase tracking-widest text-text-muted block mb-2">
                            Selected
                        </span>
                        <h2 className="font-display text-headline-xl2 font-extrabold tracking-tighter text-on-surface leading-none">
                            Projects
                            <span className="ml-3 inline-block w-3.5 h-3.5 rounded-full bg-on-surface" />
                        </h2>
                    </div>

                    {/* View All Projects CTA Link */}
                    <Link
                        href="/projects"
                        className="font-sans text-label-caps uppercase font-bold text-primary inline-flex items-center gap-1 group/btn shrink-0 pb-1"
                    >
                        View All Projects
                        <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">
                            arrow_forward
                        </span>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {[0, 1, 2, 3].map((item) => (
                            <div key={item} className="space-y-2">
                                {/* Using valid bg-surface-container from your final @theme */}
                                <div className="h-24 rounded-2xl bg-surface-container animate-pulse" />
                                <div className="aspect-4/3 rounded-2xl bg-surface-container animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <p className="font-sans text-body-md text-text-muted">{error}</p>
                ) : featured.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {featured.map((project) => (
                            <Link href={`/projects/${project.slug}`} key={project.id}>
                                <ProjectCard
                                    project={project}
                                    bg_color="bg-warm-beige" /* Contributes beautiful contrast on white bg */
                                />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="font-sans text-body-md text-text-muted">
                        Featured projects will appear here once they are published.
                    </p>
                )}
            </div>
        </section>
    );
};

export default Projects;