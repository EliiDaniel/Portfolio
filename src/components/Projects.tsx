"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import type { Project } from "@/data/resume";

const ease = [0.16, 1, 0.3, 1] as const;

// One gradient per project so each placeholder looks distinct.
const gradients = [
  "from-accent/50 via-violet-500/30 to-transparent",
  "from-fuchsia-500/50 via-violet-500/30 to-transparent",
  "from-cyan-400/40 via-accent/30 to-transparent",
  "from-violet-500/50 via-fuchsia-500/30 to-transparent",
  "from-emerald-400/40 via-cyan-500/20 to-transparent",
  "from-amber-400/40 via-fuchsia-500/20 to-transparent",
];

const number = (index: number) => String(index + 1).padStart(2, "0");

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className={`relative aspect-[2/1] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${gradients[index % gradients.length]}`}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          fill
          sizes="(min-width: 768px) 55vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div aria-hidden className="absolute inset-0">
          <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border-[24px] border-white/10" />
          <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <span className="absolute bottom-4 left-6 font-display text-7xl font-semibold text-white/20">
            {number(index)}
          </span>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article>
      <ProjectVisual project={project} index={index} />
      <p className="mt-6 text-sm text-muted">{project.period}</p>
      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">{project.name}</h3>
      <div className="mt-3 space-y-2 text-base leading-relaxed text-foreground/80 sm:text-lg">
        {project.description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-foreground/80">
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}

// Laptop view: the section pins in place and the card swaps to the next project as you scroll.
function PinnedProjects({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActive(Math.min(projects.length - 1, Math.floor(latest * projects.length)));
  });

  return (
    <div ref={ref} className="relative" style={{ height: `${projects.length * 25 + 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="grid w-full grid-cols-[2fr_3fr] gap-16">
          <ol className="space-y-5 self-center">
            {projects.map((project, i) => (
              <li
                key={project.name}
                className={`flex items-baseline gap-4 transition-colors duration-500 ${i === active ? "text-foreground" : "text-muted/60"}`}
              >
                <span className={`font-display text-sm ${i === active ? "text-accent" : ""}`}>{number(i)}</span>
                <span className="font-display text-lg font-semibold leading-snug tracking-tight">{project.name}</span>
              </li>
            ))}
          </ol>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -32 }}
              transition={{ duration: 0.45, ease }}
            >
              <ProjectCard project={projects[active]} index={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Phone view (and reduce motion): cards simply stacked.
function StackedProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-20">
      {projects.map((project, i) => (
        <ProjectCard key={project.name} project={project} index={i} />
      ))}
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-4 py-32 sm:px-8">
      <SectionHeading label="Projects" title="Things I've made." />

      {reduceMotion ? (
        <div className="mt-16">
          <StackedProjects projects={projects} />
        </div>
      ) : (
        <>
          <div className="mt-16 md:hidden">
            <StackedProjects projects={projects} />
          </div>
          <div className="hidden md:block">
            <PinnedProjects projects={projects} />
          </div>
        </>
      )}
    </section>
  );
}
