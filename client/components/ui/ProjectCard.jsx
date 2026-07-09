"use client";

import { getProjectDetail } from "@/data/getProjectDetail";
import { useState } from "react";

const ProjectCard = ({ project }) => {
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
            className="group relative overflow-hidden space-y-2 cursor-pointer"
            onMouseEnter={loadStats}
        >
            <div className="bg-surface p-4 rounded-2xl transition-colors duration-300 flex items-center justify-between group-hover:bg-surface-container-low">
                <h3 className="font-headline-md text-body-lg font-semibold text-on-surface group-hover:text-primary transition-colors duration-300">
                    {project.title}
                </h3>
                <span className="material-symbols-outlined text-primary text-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                    arrow_forward
                </span>
            </div>

            <div className="bg-surface p-2 rounded-2xl">
                <div className="aspect-4/3 relative overflow-hidden rounded-xl group-hover:scale-[1.02] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <img
                        src={imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:blur-xs"
                    />

                    <div className="absolute inset-0 bg-inverse-surface/30 group-hover:bg-inverse-surface/70 flex items-center justify-center pointer-events-none transition-all duration-500 rounded-xl">
                        {project.clientLogo ? (
                            <div className="transition-transform duration-500 group-hover:scale-110">
                                <img
                                    src={project.clientLogo}
                                    alt={`${project.client || "Client"} logo`}
                                    className="h-30 w-auto object-contain opacity-40 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                />
                            </div>
                        ) : (
                            <span className="font-label-caps text-label-caps uppercase tracking-widest text-inverse-on-surface/70">
                                {project.client}
                            </span>
                        )}
                    </div>

                    <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 transition-all duration-300">
                        <div className="rounded-xl bg-surface/95 border border-border-neutral p-3 shadow-lg">
                            {isLoadingStats ? (
                                <p className="font-body-md text-body-md text-text-muted">Loading stats...</p>
                            ) : statsToShow.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {statsToShow.map((stat, index) => (
                                        <div
                                            key={`${stat.title}-${index}`}
                                            className={`${index > 1 ? "hidden md:flex" : "flex"} flex-col gap-1`}
                                        >
                                            <span className="font-statistic-num text-2xl text-primary leading-none">
                                                {stat.value}
                                            </span>
                                            <span className="font-label-caps text-[10px] uppercase tracking-widest text-text-muted">
                                                {stat.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : ("")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
