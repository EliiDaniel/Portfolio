"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Section ids match the id on each section component.
const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

// Floating glass pill with a shortcut to each section; the current section lights up.
// It appears once you scroll past the Hero.
export default function NavBar({ name }: { name: string }) {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const words = name.split(" ");
  const shortName = `${words[0]} ${words[words.length - 1]}`;

  // The section crossing the middle of the screen counts as the current one.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    for (const id of ["top", ...sections.map((section) => section.id)]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    // Smooth scrolling (Lenis) glides to the section, so skip the browser's instant jump.
    // With reduce motion there is no Lenis, so let the browser jump normally.
    if (!reduceMotion) event.preventDefault();
  };

  // Stay hidden over the Hero so it doesn't compete with the name; fade in once past it.
  const visible = active !== "top";

  return (
    <motion.header
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -16 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 top-3 z-50 px-3 sm:px-4 ${visible ? "" : "pointer-events-none"}`}
    >
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150">
        <nav className="flex h-14 items-center justify-between px-5 sm:px-7">
          <a href="#top" onClick={handleNavigate} className="font-display text-sm font-semibold tracking-tight sm:text-base">
            {shortName}
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={handleNavigate}
                  aria-current={active === section.id ? "true" : undefined}
                  className={`relative py-1 text-sm transition-colors duration-300 ${
                    active === section.id ? "text-accent" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {section.label}
                  {active === section.id && (
                    <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((isOpen) => !isOpen)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-full border border-white/15 px-4 py-1.5 text-sm md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.ul
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="border-t border-white/10 px-5 pt-2 pb-4 md:hidden"
            >
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={handleNavigate}
                    className={`block py-3 text-lg ${active === section.id ? "text-accent" : "text-foreground/80"}`}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
