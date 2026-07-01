"use client";

import Image from "next/image";
import React, { memo, useMemo } from "react";

// Helper to convert size to CSS value
const toCssLength = (value) =>
    typeof value === "number" ? `${value}px` : value ?? undefined;

export const LogoLoop = memo(
    ({
        logos,
        speed = 120,
        direction = "left",
        width = "100%",
        logoHeight = 28,
        gap = 32,
        pauseOnHover = true,
        fadeOut = false,
        fadeOutColor,
        scaleOnHover = false,
        renderItem,
        ariaLabel = "Partner logos",
        className,
        style,
    }) => {
        const duration = useMemo(() => {
            const averageLogoWidth = logoHeight * 1.6;
            const totalWidth = logos.length * (averageLogoWidth + gap);
            return `${totalWidth / Math.max(1, speed)}s`;
        }, [logos.length, logoHeight, gap, speed]);

        const animationClass = direction === "right" ? "animate-marquee-reverse" : "animate-marquee";

        // Build list elements
        const renderLogoList = (isDuplicate) => (
            <ul
                className={`flex items-center shrink-0 ${animationClass} ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
                    }`}
                style={{
                    gap: `${gap}px`,
                    paddingRight: `${gap}px`,
                    "--marquee-duration": duration,
                }}
                role="list"
                aria-hidden={isDuplicate}
            >
                {logos.map((item, index) => {
                    const key = `${isDuplicate ? "dup" : "orig"}-${index}`;
                    if (renderItem) {
                        return (
                            <li className="shrink-0" key={key} role="listitem">
                                {renderItem(item, index)}
                            </li>
                        );
                    }

                    const isNodeItem = "node" in item;
                    const content = isNodeItem ? (
                        <span className="inline-flex items-center">
                            {item.node}
                        </span>
                    ) : (
                        <Image
                            src={item.src}
                            srcSet={item.srcSet}
                            sizes={item.sizes}
                            width={120}
                            height={120}
                            alt={item.alt ?? ""}
                            title={item.title}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className={`block object-contain  pointer-events-none partner-logo transition-all duration-300 ${scaleOnHover ? "hover:scale-105" : ""
                                }`}
                            style={{ height: toCssLength(logoHeight), width: "auto" }}
                        />
                    );

                    const itemContent = item.href ? (
                        <a
                            className="inline-flex items-center no-underline rounded transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2"
                            href={item.href}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {content}
                        </a>
                    ) : (
                        content
                    );

                    return (
                        <li className="shrink-0" key={key} role="listitem">
                            {itemContent}
                        </li>
                    );
                })}
            </ul>
        );

        return (
            <div
                className={`relative overflow-hidden w-full group flex select-none ${className || ""}`}
                style={{
                    width: toCssLength(width),
                    ...style,
                }}
                role="region"
                aria-label={ariaLabel}
            >
                {/* Fade overlays if enabled */}
                {fadeOut && (
                    <>
                        <div
                            className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10"
                            style={{
                                background: `linear-gradient(to right, ${fadeOutColor || "var(--color-surface, white)"}, transparent)`,
                            }}
                        />
                        <div
                            className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
                            style={{
                                background: `linear-gradient(to left, ${fadeOutColor || "var(--color-surface, white)"}, transparent)`,
                            }}
                        />
                    </>
                )}

                {/* Inner track containing the duplicate lists */}
                <div className="flex w-max shrink-0 relative z-0">
                    {renderLogoList(false)}
                    {renderLogoList(true)}
                </div>
            </div>
        );
    }
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;