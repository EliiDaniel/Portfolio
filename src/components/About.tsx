"use client";

import Image from "next/image";
import { motion } from "motion/react";
import SectionHeading from "@/components/SectionHeading";

type AboutProps = {
  name: string;
  photo: string;
  summary: string[];
};

const ease = [0.16, 1, 0.3, 1] as const;

// Photo pinned on the left while the summary sentences fade in one by one on the right.
export default function About({ name, photo, summary }: AboutProps) {
  const words = name.split(" ");
  const initials = `${words[0][0]}${words[words.length - 1][0]}`;

  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-4 py-32 sm:px-8 sm:py-48">
      <div className="grid gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease }}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border-2 border-accent/60 bg-gradient-to-br from-accent/40 via-violet-500/30 to-fuchsia-500/40 shadow-[0_0_40px_rgba(41,151,255,0.35)] md:sticky md:top-28"
          >
            {photo ? (
              <Image src={photo} alt={`Photo of ${name}`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            ) : (
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center font-display text-6xl font-semibold tracking-tight text-foreground/80"
              >
                {initials}
              </span>
            )}
          </motion.div>
        </div>

        <div>
          <SectionHeading label="About" title="Hi, I'm Eli." />

          <div className="mt-10 space-y-8">
            {summary.map((sentence) => (
              <motion.p
                key={sentence}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.9, ease }}
                className="text-balance text-[clamp(1.25rem,2.5vw,1.875rem)] font-medium leading-snug tracking-tight"
              >
                {sentence}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
