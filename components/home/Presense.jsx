"use client";

import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import * as d3 from "d3";
import { projectsData } from "@/data/project";

// Build highlighted states dynamically from projectsData
const getHighlightedStates = () => {
    const stateMap = {};
    projectsData.forEach((project) => {
        const state = project.location;
        if (!stateMap[state]) {
            stateMap[state] = { count: 0 };
        }
        stateMap[state].count += 1;
    });
    const result = {};
    Object.keys(stateMap).forEach((state) => {
        result[state] = {
            projects: `${stateMap[state].count} Active Projects`,
            color: "#116d2f",
        };
    });
    return result;
};

const HIGHLIGHTED = getHighlightedStates();

const Presence = memo(() => {
    const mapRef = useRef(null);
    const containerRef = useRef(null);
    const tooltipRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const rafIdRef = useRef(null);
    const pathRefs = useRef({});

    // Throttled tooltip update using requestAnimationFrame
    const updateTooltip = useCallback((event, name) => {
        if (!tooltipRef.current || !containerRef.current) return;
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => {
            const rect = containerRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left + 14;
            const y = event.clientY - rect.top - 56;
            tooltipRef.current.style.left = x + "px";
            tooltipRef.current.style.top = y + "px";
        });
    }, []);

    useEffect(() => {
        if (isLoaded || !containerRef.current) return;

        const container = containerRef.current;
        const svg = d3.select(mapRef.current);
        const tooltip = tooltipRef.current;
        const tooltipState = tooltip?.querySelector("#tooltip-state");
        const tooltipProjects = tooltip?.querySelector("#tooltip-projects");

        const width = container.offsetWidth || 600;
        const height = width * 1.15;

        svg
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        const projection = d3.geoMercator()
            .center([82.5, 22.5])
            .scale(width * 1.18)
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        fetch(
            "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson"
        )
            .then((r) => r.json())
            .then((data) => {
                projection.fitSize([width, height], data);

                // Draw paths
                svg
                    .selectAll("path")
                    .data(data.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("fill", (d) => {
                        const name = d.properties.NAME_1;
                        return HIGHLIGHTED[name] ? HIGHLIGHTED[name].color : "#e5e2e1";
                    })
                    .attr("stroke", "#fcf9f8")
                    .attr("stroke-width", 1)
                    .style("cursor", (d) =>
                        HIGHLIGHTED[d.properties.NAME_1] ? "pointer" : "default"
                    )
                    .style("transition", "fill 0.15s ease") // smooth transition
                    .each(function (d) {
                        // Store reference for later use
                        const name = d.properties.NAME_1;
                        if (HIGHLIGHTED[name]) {
                            pathRefs.current[name] = this;
                        }
                    })
                    .on("mouseenter", function (event, d) {
                        const name = d.properties.NAME_1;
                        if (!HIGHLIGHTED[name]) return;
                        // Use CSS class instead of direct attr change
                        d3.select(this).classed("highlighted", true);
                        if (tooltipState && tooltipProjects) {
                            tooltipState.textContent = name;
                            tooltipProjects.textContent = HIGHLIGHTED[name].projects;
                            tooltip?.classList.remove("hidden");
                        }
                    })
                    .on("mousemove", function (event, d) {
                        const name = d.properties.NAME_1;
                        if (!HIGHLIGHTED[name]) return;
                        updateTooltip(event, name);
                    })
                    .on("mouseleave", function (event, d) {
                        const name = d.properties.NAME_1;
                        if (!HIGHLIGHTED[name]) return;
                        d3.select(this).classed("highlighted", false);
                        tooltip?.classList.add("hidden");
                        if (rafIdRef.current) {
                            cancelAnimationFrame(rafIdRef.current);
                            rafIdRef.current = null;
                        }
                    });

                // Add circles for highlighted states
                svg
                    .selectAll("circle")
                    .data(data.features.filter((d) => HIGHLIGHTED[d.properties.NAME_1]))
                    .enter()
                    .append("circle")
                    .attr("cx", (d) => path.centroid(d)[0])
                    .attr("cy", (d) => path.centroid(d)[1])
                    .attr("r", 5)
                    .attr("fill", "#D8A428")
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 1.5)
                    .style("pointer-events", "none");

                // Add CSS for hover effect (instead of JS)
                const style = document.createElement("style");
                style.textContent = `
          .india-state {
            transition: fill 0.15s ease;
          }
          .india-state.highlighted {
            fill: #92e99c !important;
          }
        `;
                svg.node().appendChild(style);

                setIsLoaded(true);
            })
            .catch((err) => console.error("Map load error:", err));

        return () => {
            // Cleanup
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
    }, [isLoaded, updateTooltip]);

    return (
        <section
            className="pb-section-mobile md:pb-section-desktop px-4 md:px-8 bg-surface overflow-hidden"
            id="presence-section"
        >
            <div className="max-w-container-max mx-auto">
                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                        Our Presence
                    </span>
                    <div className=" flex justify-between">
                        <h2 className="font-headline-lg text-headline-lg text-on-surface max-w-2xl">
                            Research with
                            <br />
                            National Reach.
                            <br />
                            Local Impact.
                        </h2>
                        <p className="self-end font-body-md text-body-lg text-text-secondary max-w-xl mt-4">
                            We have worked in states/UTs of Rajasthan, Maharashtra, Madhya
                            Pradesh and Delhi — with experts and consultants spread across India
                            including North Eastern states and remote terrains.
                        </p>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                    {/* Map */}
                    <div className="md:col-span-7 relative" ref={containerRef}>
                        <svg
                            ref={mapRef}
                            className="w-full h-auto"
                            id="india-map"
                        ></svg>
                        {/* Tooltip */}
                        <div
                            ref={tooltipRef}
                            className="absolute hidden pointer-events-none z-20 bg-inverse-surface text-white rounded-xl px-4 py-3 min-w-[180px] shadow-lg"
                        >
                            <p id="tooltip-state" className="font-headline-md text-sm text-white"></p>
                            <p
                                id="tooltip-projects"
                                className="font-label-caps text-[10px] uppercase tracking-widest text-white/60 mt-1"
                            ></p>
                        </div>
                    </div>

                    {/* Stats + Pills */}
                    <div className="md:col-span-5 flex flex-col gap-8">
                        <div className="grid grid-cols-2 gap-px bg-border-neutral rounded-2xl overflow-hidden border border-border-neutral">
                            <div className="bg-surface p-6">
                                <span className="font-statistic-num text-4xl text-primary block">
                                    {Object.keys(HIGHLIGHTED).length}
                                </span>
                                <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mt-1">
                                    States
                                </span>
                            </div>
                            <div className="bg-surface p-6">
                                <span className="font-statistic-num text-4xl text-primary block">
                                    {projectsData.length}
                                </span>
                                <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mt-1">
                                    Projects
                                </span>
                            </div>
                            <div className="bg-surface p-6 col-span-2">
                                <span className="font-statistic-num text-5xl text-primary block">
                                    {projectsData.filter((p) => p.isFeatured).length} Featured
                                </span>
                                <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mt-1">
                                    Highlighted Projects
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-surface-container-low border border-border-neutral">
                                <span className="material-symbols-outlined text-primary text-xl">
                                    translate
                                </span>
                                <span className="font-body-md text-body-md text-on-surface">
                                    No Language Barrier
                                </span>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-surface-container-low border border-border-neutral">
                                <span className="material-symbols-outlined text-primary text-xl">
                                    bar_chart
                                </span>
                                <span className="font-body-md text-body-md text-on-surface">
                                    Reliable Data
                                </span>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-surface-container-low border border-border-neutral">
                                <span className="material-symbols-outlined text-primary text-xl">
                                    public
                                </span>
                                <span className="font-body-md text-body-md text-on-surface">
                                    Nationwide Reach
                                </span>
                            </div>
                        </div>

                        <a
                            href="#"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-label-caps text-label-caps uppercase rounded-xl hover:bg-primary-container transition-colors"
                        >
                            Learn More
                            <span className="material-symbols-outlined text-sm">
                                arrow_forward
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
});

Presence.displayName = "Presence";

export default Presence;