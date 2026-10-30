"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Soft dark halo that follows each letter's outline, keeping text readable where the astronaut passes behind it.
const halo = "[text-shadow:0_0_12px_rgba(5,5,5,0.9),0_0_28px_rgba(5,5,5,0.7)]";

type HeroProps = {
  name: string;
  title: string;
  location: string;
};

// Big name that shrinks and rises as you scroll, then the title fades in underneath.
export default function Hero({ name, title, location }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const nameScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.6]);
  const nameY = useTransform(scrollYProgress, [0, 0.6], ["0vh", "-12vh"]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.3, 0.6], [24, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section id="top" ref={ref} className={reduceMotion ? "relative h-screen" : "relative h-[200vh]"}>
      {/* Bottom padding leaves room for the astronaut at its laptop (AstronautJourney) under the name */}
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4 pb-[min(46vh,400px)] md:pb-0">
        {/* Placeholder graphic: soft glowing shapes behind the name */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-[70%] -translate-y-1/2 rounded-full bg-accent/25 blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 h-[45vmin] w-[45vmin] -translate-x-[10%] -translate-y-[30%] rounded-full bg-fuchsia-500/15 blur-[120px]" />
        </div>

        {/* Name and title move up together; the name shrinks toward its bottom edge so the gap below it stays small */}
        <motion.div style={reduceMotion ? undefined : { y: nameY }} className="relative flex flex-col items-center text-center">
          <motion.div style={reduceMotion ? undefined : { scale: nameScale, originY: 1 }}>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display text-balance text-[clamp(2.25rem,7.5vw,6.75rem)] font-semibold leading-[1.05] tracking-tight ${halo}`}
            >
              {name}
            </motion.h1>
          </motion.div>

          <motion.div style={reduceMotion ? undefined : { opacity: subtitleOpacity, y: subtitleY }} className="mt-3">
            <p className={`font-display text-[clamp(1.25rem,3.5vw,2.5rem)] font-medium tracking-tight text-accent ${halo}`}>
              {title}
            </p>
            <p className={`mt-1 text-base text-muted sm:text-lg ${halo}`}>{location}</p>
          </motion.div>
        </motion.div>

        {!reduceMotion && (
          <motion.p
            style={{ opacity: hintOpacity }}
            className="absolute bottom-3 text-xs tracking-widest text-muted uppercase"
          >
            Scroll
          </motion.p>
        )}
      </div>
    </section>
  );
}
