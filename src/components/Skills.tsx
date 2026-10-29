"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import type { SkillGroup } from "@/data/resume";

const ease = [0.16, 1, 0.3, 1] as const;

// Skill groups whose tags float up one after another when the group scrolls into view.
export default function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-8 md:py-26">
      <SectionHeading label="Skills" title="The toolkit." />

      <div className="mt-16 grid gap-x-16 gap-y-14 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.category}>
            <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">{group.category}</h3>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              className="mt-5 flex flex-wrap gap-2.5"
            >
              {group.items.map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                  }}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground/90 backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-accent/60 hover:bg-accent/10 hover:shadow-[0_0_16px_rgba(41,151,255,0.35)] sm:text-base"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </section>
  );
}
