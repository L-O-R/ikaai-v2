"use client";

import * as d3 from "d3";
import Link from "next/link";
import { getProjectLocations } from "@/data/getProjectLocations";
import { getErrorMessage } from "@/data/apiErrors";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

const INDIA_GEOJSON_URL =
    "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson";

let indiaGeoJsonPromise;

const getIndiaGeoJson = () => {
    if (!indiaGeoJsonPromise) {
        indiaGeoJsonPromise = fetch(INDIA_GEOJSON_URL)
            .then((r) => {
                if (!r.ok) throw new Error("Unable to load the India map.");
                return r.json();
            })
            .catch((err) => {
                indiaGeoJsonPromise = null;
                throw err;
            });
    }

    return indiaGeoJsonPromise;
};

const Presence = memo(() => {
    const mapRef = useRef(null);
    const containerRef = useRef(null);
    const tooltipRef = useRef(null);
    const rafIdRef = useRef(null);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const highlighted = useMemo(() => {
        const stateMap = {};

        projects.forEach((project) => {
            const state = project.location?.trim();
            if (!state) return;
            stateMap[state] = (stateMap[state] || 0) + 1;
        });

        return Object.fromEntries(
            Object.entries(stateMap).map(([state, count]) => [
                state,
                { projects: `${count} ${count === 1 ? "Project" : "Projects"}` },
            ])
        );
    }, [projects]);

    const updateTooltip = useCallback((event) => {
        if (!tooltipRef.current || !containerRef.current) return;
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => {
            const rect = containerRef.current.getBoundingClientRect();
            tooltipRef.current.style.left = `${event.clientX - rect.left + 14}px`;
            tooltipRef.current.style.top = `${event.clientY - rect.top - 56}px`;
        });
    }, []);

    useEffect(() => {
        let isMounted = true;

        getProjectLocations()
            .then((data) => {
                if (isMounted) setProjects(data.results || []);
            })
            .catch((err) => {
                if (isMounted) setError(getErrorMessage(err, "Unable to load project locations."));
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (isLoading || !containerRef.current) return;

        let isMounted = true;
        const container = containerRef.current;
        const svg = d3.select(mapRef.current);
        const tooltip = tooltipRef.current;
        const tooltipState = tooltip?.querySelector("#tooltip-state");
        const tooltipProjects = tooltip?.querySelector("#tooltip-projects");
        const width = container.offsetWidth || 600;
        const height = width * 1.15;

        svg.selectAll("*").remove();
        svg.attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet");

        const projection = d3.geoMercator()
            .center([82.5, 22.5])
            .scale(width * 1.18)
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        getIndiaGeoJson()
            .then((data) => {
                if (!isMounted) return;

                projection.fitSize([width, height], data);

                svg
                    .selectAll("path")
                    .data(data.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("class", (d) => {
                        const name = d.properties.NAME_1;
                        return highlighted[name]
                            ? "india-state fill-primary stroke-surface cursor-pointer"
                            : "india-state fill-surface-variant stroke-surface";
                    })
                    .attr("stroke-width", 1)
                    .style("transition", "fill 0.15s ease")
                    .on("mouseenter", function (_event, d) {
                        const name = d.properties.NAME_1;
                        if (!highlighted[name]) return;

                        d3.select(this).classed("fill-on-primary-container", true).classed("fill-primary", false);
                        if (tooltipState && tooltipProjects) {
                            tooltipState.textContent = name;
                            tooltipProjects.textContent = highlighted[name].projects;
                            tooltip?.classList.remove("hidden");
                        }
                    })
                    .on("mousemove", (event, d) => {
                        if (!highlighted[d.properties.NAME_1]) return;
                        updateTooltip(event);
                    })
                    .on("mouseleave", function (_event, d) {
                        if (!highlighted[d.properties.NAME_1]) return;
                        d3.select(this).classed("fill-on-primary-container", false).classed("fill-primary", true);
                        tooltip?.classList.add("hidden");
                        if (rafIdRef.current) {
                            cancelAnimationFrame(rafIdRef.current);
                            rafIdRef.current = null;
                        }
                    });

                svg
                    .selectAll("circle")
                    .data(data.features.filter((d) => highlighted[d.properties.NAME_1]))
                    .enter()
                    .append("circle")
                    .attr("cx", (d) => path.centroid(d)[0])
                    .attr("cy", (d) => path.centroid(d)[1])
                    .attr("r", 5)
                    .attr("class", "fill-harvest-gold stroke-surface-container-lowest pointer-events-none")
                    .attr("stroke-width", 1.5);
            })
            .catch(() => {
                if (isMounted) setError("Unable to load the India map.");
            });

        return () => {
            isMounted = false;
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
    }, [highlighted, isLoading, updateTooltip]);

    const stateCount = Object.keys(highlighted).length;
    const featuredCount = projects.filter((project) => project.featured || project.isFeatured).length;

    return (
        <section
            className="pb-section-mobile md:pb-section-desktop px-4 md:px-8 bg-surface overflow-hidden"
            id="presence-section"
        >
            <div className="max-w-container-max mx-auto">
                <div className="mb-12 md:mb-16">
                    <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                        Our Presence
                    </span>
                    <div className="flex flex-col justify-between">
                        <h2 className="font-headline-lg text-headline-lg text-on-surface ">
                            National Reach.
                            <br /> Local Impact.
                        </h2>
                        <p className=" font-body-md text-body-lg text-text-secondary max-w-xl mt-4">
                            Our project footprint is updated from the CMS, highlighting
                            locations where published projects have taken place.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                    <div className="lg:col-span-7 relative min-h-[320px]" ref={containerRef}>
                        {isLoading ? (
                            <div className="aspect-[1/1.15] rounded-2xl bg-surface-container-high animate-pulse" />
                        ) : (
                            <svg ref={mapRef} className="w-full h-auto" id="india-map" />
                        )}
                        <div
                            ref={tooltipRef}
                            className="absolute hidden pointer-events-none z-20 bg-inverse-surface text-inverse-on-surface rounded-xl px-4 py-3 min-w-[180px] shadow-lg"
                        >
                            <p id="tooltip-state" className="font-headline-md text-sm text-inverse-on-surface" />
                            <p
                                id="tooltip-projects"
                                className="font-label-caps text-[10px] uppercase tracking-widest text-inverse-on-surface/60 mt-1"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-8">
                        {error && (
                            <div className="rounded-xl border border-error-container bg-error-container/30 px-4 py-3 font-body-md text-body-md text-on-error-container">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-px bg-border-neutral rounded-2xl overflow-hidden border border-border-neutral">
                            <div className="bg-surface p-6">
                                <span className="font-statistic-num text-4xl text-primary block">
                                    {stateCount}
                                </span>
                                <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mt-1">
                                    States
                                </span>
                            </div>
                            <div className="bg-surface p-6">
                                <span className="font-statistic-num text-4xl text-primary block">
                                    {projects.length}
                                </span>
                                <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mt-1">
                                    Projects
                                </span>
                            </div>
                            <div className="bg-surface p-6 col-span-2">
                                <span className="font-statistic-num text-5xl text-primary block">
                                    {featuredCount} Featured
                                </span>
                                <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mt-1">
                                    Highlighted Projects
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            {["translate", "bar_chart", "public"].map((icon, index) => (
                                <div
                                    key={icon}
                                    className="flex items-center gap-3 px-5 py-4 rounded-xl bg-surface-container-low border border-border-neutral"
                                >
                                    <span className="material-symbols-outlined text-primary text-xl">
                                        {icon}
                                    </span>
                                    <span className="font-body-md text-body-md text-on-surface">
                                        {["No Language Barrier", "Reliable Data", "Nationwide Reach"][index]}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/work"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-on-primary font-label-caps text-label-caps uppercase rounded-xl hover:bg-primary-container transition-colors"
                        >
                            Learn More
                            <span className="material-symbols-outlined text-sm">
                                arrow_forward
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
});

Presence.displayName = "Presence";

export default Presence;
