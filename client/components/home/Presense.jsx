"use client";

import * as d3 from "d3";
import Link from "next/link";
import { getProjectLocations } from "@/lib/api/getProjectLocations";
import { getErrorMessage } from "@/lib/api/apiErrors";
import { memo, useEffect, useMemo, useRef, useState } from "react";

// ─── Custom media query hook ──────────────────────────────
function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const media = window.matchMedia(query);
        const update = () => setMatches(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, [query]);

    return matches;
}

// ─── helpers ────────────────────────────────────────────────
const extractStateName = (locationStr) => {
    if (!locationStr) return "";
    const parts = locationStr.split(",");
    return parts[parts.length - 1].trim().toLowerCase();
};

// ─── component ──────────────────────────────────────────────
const Presence = memo(() => {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const sectionRef = useRef(null);
    const hasAnimatedRef = useRef(false);
    const hoveredNodeRef = useRef(null); // tracks which node is actively hovered

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const isMobile = useMediaQuery("(max-width: 768px)");

    // ── fetch data ──
    useEffect(() => {
        let mounted = true;
        getProjectLocations()
            .then((data) => {
                if (mounted) setProjects(data.results || []);
            })
            .catch((err) => {
                if (mounted) setError(getErrorMessage(err, "Unable to load project locations."));
            })
            .finally(() => {
                if (mounted) setIsLoading(false);
            });
        return () => { mounted = false; };
    }, []);

    // ── compute states & counts ──
    const stateMap = useMemo(() => {
        const map = {};
        projects.forEach((p) => {
            const state = extractStateName(p.location);
            if (state) map[state] = (map[state] || 0) + 1;
        });
        return map;
    }, [projects]);

    const stateEntries = useMemo(() => {
        return Object.entries(stateMap)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [stateMap]);

    const stateCount = stateEntries.length;
    const projectCount = projects.length;
    const yearsCount = 15;

    // ── network layout ──
    const networkData = useMemo(() => {
        if (!stateEntries.length) return { nodes: [], links: [] };

        const nodes = stateEntries.map((s, i) => ({
            id: s.name,
            count: s.count,
            index: i,
        }));

        // ring topology
        const links = [];
        for (let i = 0; i < nodes.length; i++) {
            const j = (i + 1) % nodes.length;
            links.push({ source: i, target: j });
        }

        // force simulation
        const simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(-200))
            .force("link", d3.forceLink(links).distance(80).strength(0.5))
            .force("collide", d3.forceCollide(30))
            .force("center", d3.forceCenter(0, 0))
            .stop();

        for (let i = 0; i < 150; i++) simulation.tick();

        // normalise to viewBox 1000x800 with padding
        let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
        nodes.forEach(n => {
            if (n.x < xMin) xMin = n.x;
            if (n.x > xMax) xMax = n.x;
            if (n.y < yMin) yMin = n.y;
            if (n.y > yMax) yMax = n.y;
        });
        const padding = 60;
        const width = 1000, height = 800;
        const scaleX = (width - 2 * padding) / (xMax - xMin || 1);
        const scaleY = (height - 2 * padding) / (yMax - yMin || 1);
        const scale = Math.min(scaleX, scaleY);
        const cx = (xMin + xMax) / 2;
        const cy = (yMin + yMax) / 2;

        nodes.forEach(n => {
            n.x = (n.x - cx) * scale + width / 2;
            n.y = (n.y - cy) * scale + height / 2;
        });

        return { nodes, links };
    }, [stateEntries]);

    // ── D3 render + animation ──
    useEffect(() => {
        if (isLoading || isMobile || !svgRef.current || !networkData.nodes.length) return;

        const svgNode = svgRef.current;
        const tooltip = tooltipRef.current;
        const width = 1000, height = 800;
        const { nodes, links } = networkData;

        const svg = d3.select(svgNode);
        svg.selectAll("*").remove();

        svg.attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("width", "100%")
            .style("height", "auto");

        const linkGroup = svg.append("g").attr("class", "links");
        const nodeGroup = svg.append("g").attr("class", "nodes");
        const labelGroup = svg.append("g").attr("class", "labels");

        const linkLines = linkGroup
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y)
            .attr("stroke", "#bfcabb")
            .attr("stroke-width", 1.5)
            .attr("stroke-dasharray", function () {
                const len = this.getTotalLength ? this.getTotalLength() : 60;
                return `${len} ${len}`;
            })
            .attr("stroke-dashoffset", function () {
                const len = this.getTotalLength ? this.getTotalLength() : 60;
                return len;
            });

        const nodeCircles = nodeGroup
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 12)
            .attr("fill", "#bfcabb")
            .attr("stroke", "#fcf9f8")
            .attr("stroke-width", 2)
            .style("opacity", 0)
            .style("cursor", "pointer");

        const labels = labelGroup
            .selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .attr("x", d => d.x)
            .attr("y", d => d.y + 24)
            .attr("text-anchor", "middle")
            .attr("font-family", "var(--font-manrope), sans-serif")
            .attr("font-size", "10px")
            .attr("letter-spacing", "0.08em")
            .attr("text-transform", "uppercase")
            .attr("fill", "#555555")
            .style("opacity", 0)
            .text(d => d.id);

        // ── Intersection Observer (one-shot entrance animation) ──
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedRef.current) {
                    if (reducedMotion) {
                        linkLines.attr("stroke-dashoffset", 0).attr("stroke-dasharray", null);
                        nodeCircles.style("opacity", 1).attr("fill", "#00511e");
                        labels.style("opacity", 1);
                    } else {
                        animateNetwork();
                    }
                    hasAnimatedRef.current = true;
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });

        if (sectionRef.current) observer.observe(sectionRef.current);

        const animateNetwork = () => {
            linkLines
                .transition()
                .delay((d, i) => i * 20)
                .duration(800)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0)
                .on("end", function () {
                    d3.select(this).attr("stroke-dasharray", null);
                });

            nodeCircles
                .transition()
                .delay((d, i) => 300 + i * 60)
                .duration(400)
                .ease(d3.easeCubicOut)
                .style("opacity", 1)
                .attr("fill", "#00511e");

            labels
                .transition()
                .delay((d, i) => 300 + i * 60)
                .duration(400)
                .ease(d3.easeCubicOut)
                .style("opacity", 1);
        };

        // ── Hover: reset helper (used by leave + as a safety net) ──
        const resetAll = () => {
            nodeCircles.interrupt()
                .transition()
                .duration(200)
                .attr("r", 12)
                .attr("fill", "#00511e")
                .style("opacity", 1);

            linkLines.interrupt()
                .transition()
                .duration(200)
                .attr("stroke", "#bfcabb")
                .attr("stroke-width", 1.5);

            if (tooltip) tooltip.classList.add("hidden");
        };

        // ── Hover events ──
        const handleMouseEnter = (event, d) => {
            hoveredNodeRef.current = d;

            // interrupt any transitions still running from a previous hover
            nodeCircles.interrupt();
            linkLines.interrupt();

            d3.select(event.currentTarget)
                .transition()
                .duration(200)
                .attr("r", 18)
                .attr("fill", "#00A1DF");

            linkLines
                .filter(link => link.source === d || link.target === d)
                .transition()
                .duration(200)
                .attr("stroke", "#00511e")
                .attr("stroke-width", 2.5);

            nodeCircles
                .filter(node => node !== d)
                .transition()
                .duration(200)
                .style("opacity", 0.3);

            if (tooltip) {
                const stateName = d.id;
                const count = stateMap[stateName] || 0;
                const tooltipState = tooltip.querySelector("#tooltip-state");
                const tooltipProjects = tooltip.querySelector("#tooltip-projects");
                if (tooltipState) tooltipState.textContent = stateName;
                if (tooltipProjects) tooltipProjects.textContent = `${count} ${count === 1 ? "Project" : "Projects"}`;
                tooltip.classList.remove("hidden");
                const rect = svgNode.getBoundingClientRect();
                const x = event.clientX - rect.left + 12;
                const y = event.clientY - rect.top - 40;
                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
            }
        };

        const handleMouseMove = (event) => {
            if (!tooltip) return;
            const rect = svgNode.getBoundingClientRect();
            const x = event.clientX - rect.left + 12;
            const y = event.clientY - rect.top - 40;
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
        };

        const handleMouseLeave = (event, d) => {
            // Ignore a stale leave event if a different node has since become active
            if (hoveredNodeRef.current !== d) return;
            hoveredNodeRef.current = null;
            resetAll();
        };

        // Safety net: if the pointer leaves the whole SVG, always reset
        d3.select(svgNode).on("mouseleave.reset", () => {
            hoveredNodeRef.current = null;
            resetAll();
        });

        nodeCircles
            .on("mouseenter", handleMouseEnter)
            .on("mousemove", handleMouseMove)
            .on("mouseleave", handleMouseLeave);

        return () => {
            observer.disconnect();
            d3.select(svgNode).on("mouseleave.reset", null);
        };
    }, [isLoading, isMobile, networkData, stateMap]);

    // ── Mobile list ──
    const renderMobileList = () => (
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6">
            {stateEntries.map(({ name, count }) => (
                <div key={name} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-body-md text-body-md text-on-surface">
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </span>
                    <span className="font-label-caps text-label-caps text-text-muted">
                        ({count})
                    </span>
                </div>
            ))}
        </div>
    );

    // ── render (single column) ──
    return (
        <section
            ref={sectionRef}
            className="py-section-mobile md:py-section-desktop bg-surface overflow-hidden"
            id="presence-section"
        >
            <div className="container mx-auto">
                <div className="flex flex-col gap-10 md:gap-14 items-start max-w-4xl mx-auto">
                    {/* Text block */}
                    <div className="space-y-6 w-full text-center">
                        <div>
                            <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                                Research Network
                            </span>
                            <h2 className="font-headline-lg text-headline-lg text-on-surface">
                                Connecting communities through evidence, research, and action across India.
                            </h2>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-2 max-w-md mx-auto">
                            <div>
                                <span className="font-statistic-num text-4xl text-primary block">
                                    {stateCount}
                                </span>
                                <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mt-1">
                                    States
                                </span>
                            </div>
                            <div>
                                <span className="font-statistic-num text-4xl text-primary block">
                                    {projectCount}
                                </span>
                                <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mt-1">
                                    Projects
                                </span>
                            </div>
                            <div>
                                <span className="font-statistic-num text-4xl text-primary block">
                                    {yearsCount}+
                                </span>
                                <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mt-1">
                                    Years
                                </span>
                            </div>
                        </div>

                        <Link
                            href="/work"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-on-primary font-label-caps text-label-caps uppercase rounded-xl hover:bg-primary-container transition-colors"
                        >
                            Explore Our Work
                            <span className="material-symbols-outlined text-sm">
                                arrow_forward
                            </span>
                        </Link>
                    </div>

                    {/* Network graph */}
                    <div className="relative w-full">
                        {isLoading ? (
                            <div className="aspect-[5/4] rounded-2xl bg-surface-container-high animate-pulse" />
                        ) : error ? (
                            <div className="rounded-xl border border-error-container bg-error-container/30 px-4 py-3 font-body-md text-body-md text-on-error-container">
                                {error}
                            </div>
                        ) : isMobile ? (
                            renderMobileList()
                        ) : (
                            <div ref={containerRef} className="relative w-full" style={{ minHeight: "400px" }}>
                                <svg ref={svgRef} className="w-full h-auto" />
                                <div
                                    ref={tooltipRef}
                                    className="absolute hidden pointer-events-none z-20 bg-inverse-surface text-inverse-on-surface rounded-xl px-4 py-3 min-w-[140px] shadow-lg"
                                >
                                    <p id="tooltip-state" className="font-headline-md text-sm text-inverse-on-surface" />
                                    <p
                                        id="tooltip-projects"
                                        className="font-label-caps text-[10px] uppercase tracking-widest text-inverse-on-surface/60 mt-1"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
});

Presence.displayName = "Presence";
export default Presence;