"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

// Responsive column tiers. Evaluated top-down, first match wins.
// xl (>=1280px): 4 cols · lg (>=1024px): 3 cols · sm (>=640px): 2 cols
// below 640px (mobile): falls through to defaultValue below.
const COLUMN_QUERIES = [
  "(min-width:1280px)",
  "(min-width:1024px)",
  "(min-width:640px)",
];
const COLUMN_VALUES = [4, 3, 2];
const MOBILE_COLUMNS = 2; // used as defaultValue so phones still get real masonry, not a single stack

// The height values in the data set were authored for roughly a 400px-wide
// column. Scale them proportionally to the actual column width so aspect
// ratios stay correct at every breakpoint instead of producing tall, skinny
// slivers on narrow (mobile) columns.
const REFERENCE_COLUMN_WIDTH = 400;

const useMedia = (queries, values, defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const mediaQueries = queries.map((q) => window.matchMedia(q));
    const get = () =>
      values[mediaQueries.findIndex((mql) => mql.matches)] ??
      defaultValue;

    setValue(get());

    const handler = () => setValue(get());
    mediaQueries.forEach((mql) => {
      mql.addEventListener("change", handler);
    });
    return () => {
      mediaQueries.forEach((mql) => {
        mql.removeEventListener("change", handler);
      });
    };
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const Masonry = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,

  onItemClick,
  renderOverlay,
}) => {
  const columns = useMedia(COLUMN_QUERIES, COLUMN_VALUES, MOBILE_COLUMNS);

  const [containerRef, { width }] = useMeasure();
  const imagesReady = true;
  const [hoveredId, setHoveredId] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    const windowHeight =
      typeof window !== "undefined" ? window.innerHeight : 800;
    const windowWidth =
      typeof window !== "undefined" ? window.innerWidth : 1200;

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: windowHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: windowWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    if (!imagesReady) {
      setIsRevealed(false);
    } else {
      const timer = setTimeout(
        () => {
          setIsRevealed(true);
        },
        (items.length * stagger + duration) * 1000,
      );
      return () => clearTimeout(timer);
    }
  }, [imagesReady, items.length, stagger, duration]);

  const grid = useMemo(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      // Scale the authored height to the real column width so the aspect
      // ratio holds at every breakpoint instead of staying a fixed pixel
      // value regardless of how narrow the column actually is.
      const height = child.height * (columnWidth / REFERENCE_COLUMN_WIDTH);
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const maxContainerHeight = useMemo(() => {
    if (!grid.length) return 0;
    return Math.max(...grid.map((item) => item.y + item.h), 0);
  }, [grid]);

  const transitionEasing = useMemo(() => {
    if (!ease) return "cubic-bezier(0.16, 1, 0.3, 1)";
    if (ease.includes("power")) {
      return "cubic-bezier(0.16, 1, 0.3, 1)";
    }
    return ease;
  }, [ease]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{ height: maxContainerHeight || "auto" }}
    >
      {grid.map((item, index) => {
        const isHovered = hoveredId === item.id;
        const scale = scaleOnHover && isHovered ? hoverScale : 1;
        const initialPos = getInitialPosition(item);
        const currentPos = imagesReady ? { x: item.x, y: item.y } : initialPos;

        const itemStyle = {
          transform: `translate3d(${currentPos.x}px, ${currentPos.y}px, 0) scale(${scale})`,
          width: `${item.w}px`,
          height: `${item.h}px`,
          opacity: imagesReady ? 1 : 0,
          ...(blurToFocus && {
            filter: imagesReady ? "blur(0px)" : "blur(10px)",
          }),
          transitionProperty: "transform, width, height, opacity, filter",
          transitionDuration: `${duration}s`,
          transitionTimingFunction: transitionEasing,
          transitionDelay:
            !isRevealed && imagesReady ? `${index * stagger}s` : "0s",
          zIndex: isHovered ? 10 : 1,
        };

        const handleClick = () => {
          if (onItemClick) {
            onItemClick(item);
            return;
          }

          if (item.url) window.open(item.url, "_blank", "noopener");
        };

        const handleKeyDown = (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
          }
        };

        return (
          <button
            key={item.id}
            type="button"
            data-key={item.id}
            className="group absolute top-0 left-0 will-change-[transform,width,height,opacity] p-1.5 cursor-pointer border-0 bg-transparent text-inherit text-left [font:inherit]"
            style={itemStyle}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className="relative w-full h-full uppercase text-[10px] leading-2.5 rounded-[10px] overflow-hidden shadow-[0px_10px_50px_-10px_rgb(from_var(--color-inverse-surface)_r_g_b/0.2)]"
            >
              <Image
                src={item.img}
                alt={item.alt || ""}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
              />
              {colorShiftOnHover && (
                <div
                  className={`absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300 ease-in-out bg-linear-to-t from-inverse-surface/90 via-inverse-surface/60 to-inverse-surface/10 ${isHovered ? "opacity-100" : "opacity-0"
                    }`}
                />
              )}
              {renderOverlay && (
                <div className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-400 ease-in-out group-hover:opacity-100">
                  {renderOverlay(item)}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Masonry;
