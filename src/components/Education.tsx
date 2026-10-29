"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import type { Language } from "@/data/resume";

const ease = [0.16, 1, 0.3, 1] as const;

type EducationProps = {
  education: { degree: string; school: string; location: string; period: string };
  certifications: { name: string; year: string }[];
  languages: Language[];
};

const card = "rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:p-10";

// Degree, certifications and languages as glass cards that fade in one after another.
export default function Education({ education, certifications, languages }: EducationProps) {
  const reveal = (order: number) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.9, ease, delay: order * 0.12 },
  });

  return (
    <section id="education" className="mx-auto w-full max-w-6xl px-4 py-32 sm:px-8">
      <SectionHeading label="Education" title="Always learning." />

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <motion.div {...reveal(0)} className={`${card} md:col-span-2`}>
          <p className="text-sm text-muted">{education.period}</p>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-3xl">{education.degree}</h3>
          <p className="mt-2 text-lg text-accent">
            {education.school}
            <span className="text-muted"> · {education.location}</span>
          </p>
        </motion.div>

        <motion.div {...reveal(1)} className={card}>
          <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">Certifications</h3>
          <ul className="mt-5 space-y-3">
            {certifications.map((cert) => (
              <li key={cert.name} className="flex items-baseline justify-between gap-4 text-base sm:text-lg">
                <span>{cert.name}</span>
                <span className="shrink-0 text-sm text-muted">{cert.year}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...reveal(2)} className={card}>
          <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">Languages</h3>
          <ul className="mt-5 space-y-3">
            {languages.map((language) => (
              <li key={language.name} className="flex items-baseline justify-between gap-4 text-base sm:text-lg">
                <span>{language.name}</span>
                <span className="text-right text-sm text-muted">{language.proficiency}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
