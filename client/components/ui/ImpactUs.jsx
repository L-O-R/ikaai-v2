"use client";

import React, { useEffect, useRef, useState } from "react";

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const ImpactUs = () => {
    const containerRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    const stats = [
        { label: "Years of impactful research.", value: 3, suffix: "+" },
        { label: "Organizations empowered.", value: 15, suffix: "+" },
        { label: "States covered across Bharat.", value: 33, suffix: "" },
        { label: "Districts covered across Bharat.", value: 300, suffix: "+" },
        { label: "People interviewed Across Bharat", value: 1, suffix: "L" },
    ];

    const [counts, setCounts] = useState(stats.map(() => 0));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);

                    const targets = stats.map((s) => s.value);
                    const duration = 2500;
                    const startTime = performance.now();

                    const animate = (time) => {
                        const elapsed = time - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easedProgress = easeOut(progress);

                        const newCounts = targets.map((target) =>
                            Math.round(target * easedProgress)
                        );
                        setCounts(newCounts);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <div ref={containerRef} className="w-full py-16 z-10">
            <div className="max-w-container-max mx-auto grid grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12  text-center px-4 md:px-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                        <span className="font-statistic-num text-5xl font-semibold md:text-statistic-num text-primary">
                            {counts[idx]}
                            {stat.suffix}
                        </span>
                        <span className="font-label-caps text-sm font-semibold md:text-label-caps uppercase tracking-widest text-text-muted">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImpactUs;