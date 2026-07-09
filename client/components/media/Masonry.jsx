"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import "./Masonry.css";

const COLUMN_QUERIES = ["(min-width:1024px)", "(min-width:640px)"];
const COLUMN_VALUES = [3, 2];

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

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new window.Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        }),
    ),
  );
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
  const columns = useMedia(COLUMN_QUERIES, COLUMN_VALUES, 1);

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
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
    let isCancelled = false;
    setImagesReady(false);

    preloadImages(items.map((i) => i.img)).then(() => {
      if (!isCancelled) setImagesReady(true);
    });

    return () => {
      isCancelled = true;
    };
  }, [items]);

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
      const height = child.height;
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
      className="list"
      style={{ height: maxContainerHeight || "auto" }}
    >
      {grid.map((item, index) => {
        const isHovered = hoveredId === item.id;
        const scale = scaleOnHover && isHovered ? hoverScale : 1;
        const initialPos = getInitialPosition(item);
        const currentPos = imagesReady ? { x: item.x, y: item.y } : initialPos;

        const itemStyle = {
          position: "absolute",
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
            className="item-wrapper"
            style={itemStyle}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className="item-img"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              {colorShiftOnHover && (
                <div
                  className="color-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: isHovered ? 0.3 : 0,
                    pointerEvents: "none",
                    borderRadius: "8px",
                    transition: "opacity 0.3s ease",
                  }}
                />
              )}
              {renderOverlay && (
                <div className="item-overlay">{renderOverlay(item)}</div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Masonry;
