"use client";

import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useReducedMotion } from "motion/react";

// tsParticles requires this setup function to stay the same for the whole app, so it lives outside the component.
async function loadEngine(engine: Engine) {
  await loadSlim(engine);
}

// Constellation: drifting dots joined by thin lines, which also link to the mouse cursor.
const options: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: "transparent" },
  detectRetina: true,
  fpsLimit: 60,
  particles: {
    number: { value: 70, density: { enable: true } },
    paint: { fill: { enable: true, color: { value: "#f5f5f7" } } },
    opacity: { value: { min: 0.2, max: 0.6 } },
    size: { value: { min: 1, max: 2 } },
    links: { enable: true, distance: 140, color: { value: "#2997ff" }, opacity: 0.25, width: 1 },
    move: { enable: true, speed: 0.4, outModes: "out" },
  },
  interactivity: {
    detectsOn: "window",
    events: { onHover: { enable: true, mode: "grab" } },
    modes: { grab: { distance: 180, links: { opacity: 0.5 } } },
  },
};

export default function ParticlesBackground({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <ParticlesProvider init={loadEngine}>
      <Particles id="particles-background" options={options} className={className} />
    </ParticlesProvider>
  );
}
