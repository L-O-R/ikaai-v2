"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

/**
 * ScrollReveal component for subtle, premium scroll animations.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be revealed
 * @param {'up' | 'down' | 'left' | 'right' | 'none'} [props.direction='up'] - Direction of entry movement
 * @param {number} [props.delay=0] - Delay in seconds before animation starts
 * @param {number} [props.duration=0.5] - Duration of animation in seconds
 * @param {number} [props.distance=20] - Distance of movement in pixels
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.once=true] - Whether animation triggers only once
 * @param {number | "some" | "all"} [props.amount=0.15] - Viewport visibility threshold
 * @param {React.CSSProperties} [props.style={}] - Inline styles
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 20,
  className = "",
  once = true,
  amount = 0.15,
  style = {},
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialOffset = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, amount }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
