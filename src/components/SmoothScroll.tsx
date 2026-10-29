"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";

// Section links glide to their target and stop just below the fixed nav bar.
const lenisOptions = { anchors: { offset: -88 } };

// Smooth scrolling for the whole page, skipped when the visitor prefers reduced motion.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {!reduceMotion && <ReactLenis root options={lenisOptions} />}
      {children}
    </MotionConfig>
  );
}
