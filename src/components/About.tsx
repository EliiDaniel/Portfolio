"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import SectionHeading from "@/components/SectionHeading";

type AboutProps = {
  name: string;
  photo: string;
  summary: string[];
};

const number = (index: number) => String(index + 1).padStart(2, "0");

// Each panel takes this share of the strip's width, so the next one peeks in from the right.
const PANEL_WIDTH = 85;

function Photo({ name, photo, size }: { name: string; photo: string; size: "large" | "thumb" }) {
  const words = name.split(" ");
  const initials = `${words[0][0]}${words[words.length - 1][0]}`;
  const frame =
    size === "large"
      ? "mx-auto w-full max-w-sm rounded-3xl shadow-[0_0_40px_rgba(41,151,255,0.35)]"
      : "w-16 shrink-0 rounded-2xl shadow-[0_0_20px_rgba(41,151,255,0.35)] sm:w-20";

  return (
    <div
      className={`relative aspect-[4/5] overflow-hidden border-2 border-accent/60 bg-gradient-to-br from-accent/40 via-violet-500/30 to-fuchsia-500/40 ${frame}`}
    >
      {photo ? (
        <Image
          src={photo}
          alt={`Photo of ${name}`}
          fill
          sizes={size === "large" ? "(min-width: 768px) 40vw, 100vw" : "80px"}
          className="object-cover"
        />
      ) : (
        <span
          aria-hidden
          className={`absolute inset-0 flex items-center justify-center font-display font-semibold tracking-tight text-foreground/80 ${
            size === "large" ? "text-6xl" : "text-lg"
          }`}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

// Section pins in place while the summary sentences slide in sideways as glass panels.
function SlidingAbout({ name, photo, summary }: AboutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Short pause on the first and last panel before and after sliding.
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", `-${(summary.length - 1) * PANEL_WIDTH}%`]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const progress = Math.min(1, Math.max(0, (latest - 0.05) / 0.9));
    setActive(Math.round(progress * (summary.length - 1)));
  });

  return (
    <div ref={ref} className="relative" style={{ height: `${100 + (summary.length - 1) * 50}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="grid w-full items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-16">
          <div className="hidden md:block">
            <Photo name={name} photo={photo} size="large" />
          </div>

          <div className="min-w-0">
            <div className="flex items-end gap-4">
              <div className="md:hidden">
                <Photo name={name} photo={photo} size="thumb" />
              </div>
              <SectionHeading label="About" title="Hi, I'm Eli." />
            </div>

            <div className="mt-10 overflow-hidden">
              <motion.div style={{ x }} className="flex">
                {summary.map((sentence, i) => (
                  <div key={sentence} className="shrink-0 pr-5" style={{ width: `${PANEL_WIDTH}%` }}>
                    <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:p-10">
                      <span className="font-display text-sm text-accent">{number(i)}</span>
                      <p className="mt-4 text-balance text-[clamp(1.25rem,2.5vw,1.875rem)] font-medium leading-snug tracking-tight">
                        {sentence}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="font-display text-sm text-muted">
                <span className="text-foreground">{number(active)}</span> / {number(summary.length - 1)}
              </span>
              <div aria-hidden className="flex items-center gap-2">
                {summary.map((sentence, i) => (
                  <span
                    key={sentence}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-accent" : "w-1.5 bg-white/25"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reduce motion: no pinning or sliding, sentences simply stacked beside the photo.
function StackedAbout({ name, photo, summary }: AboutProps) {
  return (
    <div className="grid gap-12 py-24 md:grid-cols-[2fr_3fr] md:gap-16 md:py-26">
      <Photo name={name} photo={photo} size="large" />
      <div>
        <SectionHeading label="About" title="Hi, I'm Eli." />
        <div className="mt-10 space-y-8">
          {summary.map((sentence) => (
            <p key={sentence} className="text-balance text-[clamp(1.25rem,2.5vw,1.875rem)] font-medium leading-snug tracking-tight">
              {sentence}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About(props: AboutProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-4 sm:px-8">
      {reduceMotion ? <StackedAbout {...props} /> : <SlidingAbout {...props} />}
    </section>
  );
}
