"use client";

import { getProjectDetail } from "@/lib/api/getProjectDetail";
import Image from "next/image";
import { useState } from "react";

const ProjectCard = ({ project, bg_color }) => {
    const [statistics, setStatistics] = useState(project.statistics || []);
    const [isLoadingStats, setIsLoadingStats] = useState(false);
    const [hasRequestedStats, setHasRequestedStats] = useState(Boolean(project.statistics?.length));

    const loadStats = async () => {
        if (hasRequestedStats || !project.slug) return;

        setHasRequestedStats(true);
        setIsLoadingStats(true);

        try {
            const detail = await getProjectDetail(project.slug);
            setStatistics(detail.statistics || []);
        } catch {
            setStatistics([]);
        } finally {
            setIsLoadingStats(false);
        }
    };

    const statsToShow = statistics.slice(0, 4);
    const imageSrc = project.img || "/featuredImage.png";

    return (
        <div
            className="group relative overflow-hidden space-y-2 cursor-pointer w-full"
            onMouseEnter={loadStats}
        >

            <div className={`${bg_color} text-on-surface p-4 rounded-2xl transition-all duration-300 flex items-center justify-between h-24 group-hover:bg-primary group-hover:text-surface`}>

                <h3 className="font-display text-body-lg font-semibold line-clamp-2 flex-1 pr-4 transition-colors duration-300 leading-snug">
                    {project.title}
                </h3>


                <span className="material-symbols-outlined text-black text-headline-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-surface shrink-0">
                    arrow_forward
                </span>
            </div>

            <div className="bg-surface p-2 rounded-2xl">
                <div className="aspect-4/3 relative overflow-hidden rounded-xl group-hover:scale-[1.02] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <Image
                        width={500}
                        height={500}
                        src={imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:blur-xs"
                    />

                    <div className="absolute inset-0 bg-inverse-surface/30 group-hover:bg-inverse-surface/70 flex items-center justify-center pointer-events-none transition-all duration-500 rounded-xl">
                        {project.clientLogo ? (
                            <div className="transition-transform duration-500 group-hover:scale-110">
                                <Image
                                    width={200}
                                    height={200}
                                    src={project.clientLogo}
                                    alt={`${project.client || "Client"} logo`}
                                    className="h-30 w-auto object-contain opacity-40 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                />
                            </div>
                        ) : (
                            <span className="font-sans text-label-caps uppercase tracking-widest text-inverse-on-surface/70">
                                {project.client}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;