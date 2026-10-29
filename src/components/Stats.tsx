"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import type { Stat } from "@/data/resume";

// Number that counts up from 0 the first time it scrolls into view.
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, reduceMotion, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

// Row of big headline numbers.
export default function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-8">
      <dl className="grid grid-cols-2 gap-y-14 gap-x-8 border-y border-white/10 py-16 md:grid-cols-4">
        {stats.map((stat) => (
          // Label comes first for screen readers; flex-col-reverse shows the number on top.
          <div key={stat.label} className="flex flex-col-reverse text-center">
            <dt className="mt-4 text-base text-muted sm:text-lg">{stat.label}</dt>
            <dd className="mx-auto w-fit bg-gradient-to-r from-accent via-violet-400 to-fuchsia-400 bg-clip-text font-display text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-none tracking-tight text-transparent">
              <Counter value={stat.value} />
              {stat.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
