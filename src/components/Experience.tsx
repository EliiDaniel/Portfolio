"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import type { Job } from "@/data/resume";

// Timeline whose line draws itself downward as you scroll, with each job fading in beside it.
export default function Experience({ jobs }: { jobs: Job[] }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 60%"] });

  return (
    <section id="experience" className="mx-auto w-full max-w-5xl px-4 py-32 sm:px-8">
      <SectionHeading label="Experience" title="Where I've built." />

      <div ref={timelineRef} className="relative mt-16">
        <div aria-hidden className="absolute bottom-2 left-[9px] top-2 w-0.5 bg-white/15" />
        <motion.div
          aria-hidden
          style={reduceMotion ? undefined : { scaleY: scrollYProgress }}
          className="absolute bottom-2 left-[9px] top-2 w-0.5 origin-top bg-accent shadow-[0_0_8px_rgba(41,151,255,0.6)]"
        />

        <ol className="space-y-16 pl-11 sm:pl-14">
          {jobs.map((job) => (
            <motion.li
              key={`${job.company}-${job.title}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute -left-11 top-0 h-5 w-5 rounded-full border-[3px] border-accent bg-background shadow-[0_0_18px_rgba(41,151,255,0.7)] sm:-left-14"
              />

              <p className="text-sm text-muted">{job.period}</p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">{job.title}</h3>
              <p className="mt-1 text-lg text-accent">
                {job.company}
                {job.location && <span className="text-muted"> · {job.location}</span>}
              </p>

              <ul className="mt-5 space-y-3 text-base leading-relaxed text-foreground/80 sm:text-lg">
                {job.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-muted" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
