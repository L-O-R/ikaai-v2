"use client";

import { getStatistics } from "@/data/getStatistics";
import { getErrorMessage } from "@/data/apiErrors";
import { useEffect, useRef, useState } from "react";

const easeOut = (t) => 1 - (1 - t) ** 3;

const ImpactUs = () => {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [stats, setStats] = useState([]);
  const [counts, setCounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getStatistics()
      .then((data) => {
        if (!isMounted) return;
        setStats(
          data.map((stat) => ({
            label: stat.title,
            value: Number(stat.value) || 0,
            suffix: stat.suffix || "",
          })),
        );
        setCounts(data.map(() => 0));
      })
      .catch((err) => {
        if (isMounted)
          setError(getErrorMessage(err, "Unable to load impact statistics."));
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (stats.length === 0 || hasAnimated) return;

    setHasAnimated(true);

    const targets = stats.map((s) => s.value);
    const duration = 2500;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);

      setCounts(
        targets.map((target) =>
          Math.round(target * easedProgress)
        )
      );

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [stats]);

  if (isLoading) {
    return (
      <div ref={containerRef} className="w-full py-16 z-10">
        <div className="max-w-container-max mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center px-4 md:px-8">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col gap-3 items-center">
              <div className="h-14 w-24 rounded-xl bg-surface-container-high animate-pulse" />
              <div className="h-4 w-32 rounded bg-surface-container-high animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || stats.length === 0) {
    return (
      <div ref={containerRef} className="w-full py-16 z-10">
        <p className="font-body-md text-body-md text-text-muted text-center px-4">
          {error || "Impact statistics are not available right now."}
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full py-16 z-10">
      <div className="max-w-container-max mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center px-4 md:px-8">
        {stats.map((stat, idx) => (
          <div key={stat.label} className="flex flex-col gap-1">
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
