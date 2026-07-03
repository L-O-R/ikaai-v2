"use client";

import Image from "next/image";
import React, { memo } from "react";

/**
 * LogoLoop — seamless vertical marquee column.
 *
 * The trick for a smooth infinite loop:
 *   - Render two identical lists inside ONE animated wrapper div.
 *   - Animate the WRAPPER by -50% (= exactly one list height).
 *   - The second list fills the gap as the first scrolls out → zero visible jump.
 *
 * Props:
 *   logos        — array of { src, alt, href? }
 *   direction    — "up" (default) | "down"
 *   logoHeight   — px height of each logo image (default 80)
 *   gap          — px gap between logos (default 36)
 *   speed        — seconds for one full cycle (default 10)
 *   pauseOnHover — boolean (default true)
 *   className    — extra classes on the outer clipping div
 */
export const LogoLoop = memo(({
    logos,
    direction = "up",
    logoHeight = 80,
    gap = 36,
    speed = 10,
    pauseOnHover = true,
    className = "",
}) => {
    const animClass = direction === "down"
        ? "animate-marquee-vertical-down"
        : "animate-marquee-vertical-up";

    const pauseClass = pauseOnHover ? "group-hover:[animation-play-state:paused]" : "";

    const logoList = (isDuplicate) => (
        <ul
            aria-hidden={isDuplicate || undefined}
            className="flex flex-col shrink-0"
            style={{
                gap: `${gap}px`,
                // paddingBottom on the first copy so the seam gap matches item gap
                paddingBottom: isDuplicate ? 0 : `${gap}px`,
            }}
        >
            {logos.map((item, i) => (
                <li
                    key={`${isDuplicate ? "d" : "o"}-${i}`}
                    className="border border-primary/15 p-2 rounded-xl shrink-0 flex items-center justify-center"
                >
                    {item.href ? (
                        <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded hover:opacity-80 transition-opacity"
                        >
                            <Image
                                src={item.src}
                                alt={item.alt ?? ""}
                                width={160}
                                height={160}
                                loading="lazy"
                                draggable={false}
                                className=" p-1  object-contain pointer-events-none select-none"
                                style={{ height: `${logoHeight}px`, width: "auto" }}
                            />
                        </a>
                    ) : (
                        <Image
                            src={item.src}
                            alt={item.alt ?? ""}
                            width={160}
                            height={160}
                            loading="lazy"
                            draggable={false}
                            className="object-contain pointer-events-none select-none"
                            style={{ height: `${logoHeight}px`, width: "auto" }}
                        />
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        /* Outer div: clips overflow, applies the CSS mask fade */
        <div
            className={`relative overflow-hidden group select-none ${className}`}
            style={{
                maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            }}
        >
            {/*
              Inner wrapper: THIS is what animates.
              Both lists move together so there is never a jump —
              when list-1 scrolls off the top, list-2 takes its place exactly.
            */}
            <div
                className={`flex flex-col ${animClass} ${pauseClass}`}
                style={{ "--marquee-duration": `${speed}s` }}
            >
                {logoList(false)}
                {logoList(true)}
            </div>
        </div>
    );
});

LogoLoop.displayName = "LogoLoop";
export default LogoLoop;
