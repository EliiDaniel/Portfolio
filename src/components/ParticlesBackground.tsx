"use client";

import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useReducedMotion } from "motion/react";
import { useLiteMode } from "@/lib/performance";

// tsParticles requires this setup function to stay the same for the whole app, so it lives outside the component.
async function loadEngine(engine: Engine) {
  await loadSlim(engine);
}

// Constellation: drifting dots joined by thin lines, which also link to the mouse cursor.
// The dots move slowly, so a lower frame rate looks the same while costing far less.
function constellation({ dots, fps, mouse }: { dots: number; fps: number; mouse: boolean }): ISourceOptions {
  return {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    detectRetina: true,
    fpsLimit: fps,
    particles: {
      number: { value: dots, density: { enable: true } },
      paint: { fill: { enable: true, color: { value: "#f5f5f7" } } },
      opacity: { value: { min: 0.2, max: 0.6 } },
      size: { value: { min: 1, max: 2 } },
      links: { enable: true, distance: 140, color: { value: "#2997ff" }, opacity: 0.25, width: 1 },
      move: { enable: true, speed: 0.4, outModes: "out" },
    },
    interactivity: {
      detectsOn: "window",
      events: { onHover: { enable: mouse, mode: "grab" } },
      modes: { grab: { distance: 180, links: { opacity: 0.5 } } },
    },
  };
}

const fullOptions = constellation({ dots: 45, fps: 40, mouse: true });
// Lite mode (lower-powered devices): fewer dots, lower frame rate, no mouse effect.
const liteOptions = constellation({ dots: 22, fps: 30, mouse: false });

export default function ParticlesBackground({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const lite = useLiteMode();

  if (reduceMotion) return null;

  return (
    <ParticlesProvider init={loadEngine}>
      <Particles id="particles-background" options={lite ? liteOptions : fullOptions} className={className} />
    </ParticlesProvider>
  );
}
