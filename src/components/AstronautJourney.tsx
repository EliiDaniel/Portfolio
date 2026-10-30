"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  Aura,
  Coder,
  Drifter,
  Laptop,
  Meditator,
  Peeker,
  Planet,
  planetAspect,
  planetCrestAbove,
  planetHiddenBelow,
  RocketRider,
  Sparkles,
} from "@/components/AstronautArt";

// The planet hangs partly below the screen; the astronaut sits on its top, so both positions follow its width.
const planetWidth = "min(92vw, 600px)";
const planetBottom = `calc(-1 * ${planetWidth} * ${planetAspect * planetHiddenBelow})`;
const astronautBottom = `calc(${planetWidth} * ${planetAspect * planetCrestAbove} - 3.5vh)`;

// Scroll positions (in pixels) where each scene starts and ends, measured from the page.
type Marks = {
  viewport: number;
  maxScroll: number;
  heroEnd: number;
  aboutTop: number;
  aboutEnd: number;
  experienceTop: number;
  projectsTop: number;
  projectsEnd: number;
  contactTop: number;
};

// Until the page is measured, later scenes stay far away so nothing flashes on screen.
const initialMarks: Marks = {
  viewport: 800,
  maxScroll: 1e9,
  heroEnd: 800,
  aboutTop: 1600,
  aboutEnd: 3200,
  experienceTop: 1e9,
  projectsTop: 1e9,
  projectsEnd: 1e9 + 1,
  contactTop: 1e9,
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const between = (y: number, start: number, end: number) => clamp01((y - start) / Math.max(1, end - start));
const mix = (from: number, to: number, t: number) => from + (to - from) * t;

// The astronaut acts out a story as you scroll:
// 1. Hero: sits on a ringed planet typing on a laptop.
// 2. Hero to About: gets pulled off the planet and zooms out; planet and laptop fall away.
// 3. About: drifts off into space, arms swaying, and fades.
// 4. Experience and Skills: rides a rocket in from the left, then flies away into the distance, shrinking.
// 5. Projects: floats at the side, meditating with a coffee, with drifting light streaks.
// 6. Contact: the helmet peeks up from the bottom edge and a hand waves goodbye.
export default function AstronautJourney() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const marks = useRef<Marks>(initialMarks);

  useEffect(() => {
    const top = (id: string) => {
      const element = document.getElementById(id);
      return element ? element.getBoundingClientRect().top + window.scrollY : null;
    };
    const measure = () => {
      const hero = document.getElementById("top");
      const about = document.getElementById("about");
      const experienceTop = top("experience");
      const projects = document.getElementById("projects");
      const contactTop = top("contact");
      if (!hero || !about || !projects || experienceTop === null || contactTop === null) return;
      const projectsTop = projects.getBoundingClientRect().top + window.scrollY;
      const viewport = window.innerHeight;
      const aboutTop = about.getBoundingClientRect().top + window.scrollY;
      marks.current = {
        viewport,
        maxScroll: document.documentElement.scrollHeight - viewport,
        heroEnd: hero.offsetHeight - viewport,
        aboutTop,
        aboutEnd: aboutTop + about.offsetHeight - viewport,
        experienceTop,
        projectsTop,
        projectsEnd: projectsTop + projects.offsetHeight - viewport,
        contactTop,
      };
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  // Progress of each scene, from 0 to 1.
  const pullAway = useTransform(scrollY, (y) => between(y, marks.current.heroEnd, marks.current.aboutTop));
  const drift = useTransform(scrollY, (y) => between(y, marks.current.aboutTop, marks.current.aboutEnd));
  const ride = useTransform(scrollY, (y) => {
    const m = marks.current;
    // Flies through Experience and Skills, finishing just before the Projects scene appears.
    return between(y, m.experienceTop - m.viewport * 0.6, m.projectsTop - m.viewport * 0.6);
  });
  const wave = useTransform(scrollY, (y) => {
    const m = marks.current;
    return between(y, m.contactTop - m.viewport, Math.min(m.contactTop - m.viewport * 0.5, m.maxScroll));
  });

  // Scenes 1 to 3: the astronaut lifts off the planet, zooms out and drifts away.
  const astronautX = useTransform([pullAway, drift], ([p, d]: number[]) => `${mix(0, 20, p) + mix(0, 8, d)}vw`);
  const astronautY = useTransform([pullAway, drift], ([p, d]: number[]) => `${mix(0, -38, p) + mix(0, -30, d)}vh`);
  const astronautScale = useTransform([pullAway, drift], ([p, d]: number[]) => mix(1, 0.6, p) * mix(1, 0.6, d));
  const astronautRotate = useTransform([pullAway, drift], ([p, d]: number[]) => mix(0, 30, p) + mix(0, 140, d));
  const astronautOpacity = useTransform(drift, (d) => 1 - clamp01((d - 0.7) / 0.3));
  const coderOpacity = useTransform(pullAway, (p) => 1 - clamp01((p - 0.2) / 0.25));
  const drifterOpacity = useTransform(pullAway, (p) => clamp01((p - 0.2) / 0.25));

  // The planet sinks away, the laptop slips and tumbles off, and the stars fade.
  const planetY = useTransform(pullAway, (p) => `${mix(0, 60, p)}vh`);
  const planetOpacity = useTransform(pullAway, (p) => 1 - clamp01((p - 0.3) / 0.7));
  const laptopY = useTransform(pullAway, (p) => `${mix(0, 35, p)}vh`);
  const laptopRotate = useTransform(pullAway, (p) => mix(0, 50, p));
  const laptopOpacity = useTransform(pullAway, (p) => 1 - clamp01(p / 0.5));
  const sparklesOpacity = useTransform(pullAway, (p) => 1 - clamp01(p / 0.4));

  // Scene 4: rocket enters from off-screen left at full size, then flies away into the distance:
  // it climbs, shrinks to a speck and fades out, with a gentle wobble along the way.
  const rocketX = useTransform(ride, (r) => `${mix(-40, 72, r)}vw`);
  const rocketY = useTransform(ride, (r) => `${mix(6, -22, r) + Math.sin(r * Math.PI * 3) * 3}vh`);
  // Eased so it stays close for a while and only shrinks quickly near the end.
  const rocketScale = useTransform(ride, (r) => mix(1.15, 0.18, r ** 1.8));
  const rocketRotate = useTransform(ride, (r) => mix(0, -10, r) + Math.sin(r * Math.PI * 3) * -5);
  const rocketOpacity = useTransform(ride, (r) => (r > 0 ? 1 - clamp01((r - 0.75) / 0.25) : 0));

  // Scene 5: fades and floats in as Projects arrives, then fades out as Projects ends.
  const meditate = useTransform(scrollY, (y) => {
    const m = marks.current;
    const enter = between(y, m.projectsTop - m.viewport * 0.5, m.projectsTop);
    const leave = between(y, m.projectsEnd - m.viewport * 0.3, m.projectsEnd + m.viewport * 0.2);
    return enter * (1 - leave);
  });
  const meditatorY = useTransform(meditate, (v) => `${mix(12, 0, v)}vh`);

  // Scene 6: rises from below the screen, stopping with only the top of the helmet and the waving hand showing.
  const peekY = 18;
  const peekerY = useTransform(wave, (w) => `${mix(105, peekY, w)}%`);

  // Reduce motion: no movement, just the planet scene in the Hero and the peek at Contact.
  const staticHeroOpacity = useTransform(scrollY, (y) => (y < marks.current.heroEnd ? 1 : 0));
  const staticPeekerOpacity = useTransform(wave, (w) => (w > 0.5 ? 1 : 0));

  const layer = "absolute inset-0 h-full w-full";
  const glow = "drop-shadow-[0_0_28px_rgba(41,151,255,0.35)]";
  const bob = { animate: { y: [0, -8, 0] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const } };

  // The astronaut sits just inside the planet's crest.
  const heroScene = `pointer-events-none fixed left-1/2 -z-[5] aspect-[240/200] w-[min(46vw,250px)] -translate-x-1/2 ${glow}`;
  const planetScene = `pointer-events-none fixed left-1/2 -z-[5] aspect-[400/260] w-[min(92vw,600px)] -translate-x-1/2 ${glow}`;
  // Left side, below the project list; laptops only, since phones stack the cards across the full width.
  const meditatorScene = `pointer-events-none fixed bottom-[6vh] left-[3vw] -z-[5] hidden aspect-square w-[min(28vw,240px)] md:block ${glow}`;
  // Deliberately huge: the final peek should feel big and playful.
  const peekerScene = `pointer-events-none fixed right-[3vw] bottom-0 -z-[5] aspect-[240/200] w-[min(78vw,500px)] ${glow}`;

  if (reduceMotion) {
    return (
      <>
        <motion.div style={{ opacity: staticHeroOpacity, bottom: planetBottom }} className={planetScene}>
          <Planet className={layer} />
        </motion.div>
        <motion.div style={{ opacity: staticHeroOpacity, bottom: astronautBottom }} className={heroScene}>
          <Sparkles className={layer} />
          <Coder className={layer} />
          <Laptop className={layer} />
        </motion.div>
        <motion.div style={{ opacity: meditate }} className={meditatorScene}>
          <Meditator className={layer} />
        </motion.div>
        <motion.div style={{ opacity: staticPeekerOpacity, y: `${peekY}%` }} className={peekerScene}>
          <Peeker className={layer} />
        </motion.div>
      </>
    );
  }

  return (
    <>
      <motion.div style={{ bottom: planetBottom, y: planetY, opacity: planetOpacity }} className={planetScene}>
        <Planet className={layer} />
      </motion.div>

      <div style={{ bottom: astronautBottom }} className={heroScene}>
        <motion.div style={{ opacity: sparklesOpacity }} className={layer}>
          <Sparkles className={layer} />
        </motion.div>

        <motion.div
          style={{ x: astronautX, y: astronautY, scale: astronautScale, rotate: astronautRotate, opacity: astronautOpacity }}
          className={layer}
        >
          <motion.div style={{ opacity: coderOpacity }} className={layer}>
            <Coder className={layer} />
          </motion.div>
          <motion.div style={{ opacity: drifterOpacity }} className={layer}>
            <motion.div
              animate={{ rotate: [-6, 6, -6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className={layer}
            >
              <Drifter className={layer} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: laptopY, rotate: laptopRotate, opacity: laptopOpacity }} className={layer}>
          <Laptop className={layer} />
        </motion.div>
      </div>

      <motion.div
        style={{ x: rocketX, y: rocketY, scale: rocketScale, rotate: rocketRotate, opacity: rocketOpacity }}
        className={`pointer-events-none fixed top-[38vh] left-0 -z-[5] aspect-[280/220] w-[min(45vw,300px)] ${glow}`}
      >
        <motion.div {...bob} className={layer}>
          <RocketRider className={layer} />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: meditatorY, opacity: meditate }} className={meditatorScene}>
        <Aura className={layer} />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className={layer}
        >
          <Meditator className={layer} />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: peekerY }} className={peekerScene}>
        <Peeker className={layer} />
      </motion.div>
    </>
  );
}
