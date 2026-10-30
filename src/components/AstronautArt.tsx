"use client";

import { motion } from "motion/react";

// Original astronaut in a sticker style: white die-cut border, big helmet with a dark starry visor and
// gold headphones, a detailed suit (harness, chest control box, patches, cuffs) with soft shading,
// and dark gloves and boots. Thin navy outlines keep it readable on the dark page.
const navy = "#1b2a4a";
const suit = "#f4f5f8";
const suitShadow = "#c9cfdb";
const metal = "#9aa3b2";
const metalDark = "#6b7383";
const glove = "#4a5263";
const gold = "#f5b829";
const orange = "#f97316";
const blue = "#4fa3ff";
const red = "#ef4444";

const lines = { stroke: navy, strokeWidth: 3.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const thinLines = { ...lines, strokeWidth: 2.5 };

// Looping limb movements: tapping keys, waving hello, and a slow weightless sway.
const limbMotion = {
  type: { animate: { y: [0, -4, 0] }, duration: 0.32 },
  wave: { animate: { rotate: [0, -28, 0] }, duration: 0.9 },
  sway: { animate: { rotate: [-12, 12, -12] }, duration: 4 },
};

// Shared gradient and the white sticker border. Every SVG includes these so each layer works on its own.
function Defs() {
  return (
    <defs>
      <radialGradient id="astro-visor-space" cx="0.4" cy="0.35" r="0.8">
        <stop offset="0%" stopColor="#2a3a7a" />
        <stop offset="55%" stopColor="#111a3d" />
        <stop offset="100%" stopColor="#05070f" />
      </radialGradient>
      {[
        { id: "astro-sticker", radius: 5 },
        { id: "astro-sticker-thin", radius: 1.4 },
      ].map(({ id, radius }) => (
        <filter key={id} id={id} x="-20%" y="-20%" width="140%" height="140%">
          <feMorphology in="SourceAlpha" operator="dilate" radius={radius} result="thick" />
          <feFlood floodColor="white" />
          <feComposite in2="thick" operator="in" result="border" />
          <feMerge>
            <feMergeNode in="border" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      ))}
    </defs>
  );
}

// `overlay` is drawn on top without the sticker border, for soft effects like steam.
// `thin` uses a narrower border, for art that is shown very large (like the big planet).
function Sticker({
  viewBox,
  className,
  children,
  overlay,
  thin = false,
}: {
  viewBox: string;
  className?: string;
  children: React.ReactNode;
  overlay?: React.ReactNode;
  thin?: boolean;
}) {
  return (
    <svg viewBox={viewBox} className={className} overflow="visible" aria-hidden>
      <Defs />
      <g filter={thin ? "url(#astro-sticker-thin)" : "url(#astro-sticker)"}>{children}</g>
      {overlay}
    </svg>
  );
}

// Visor size and position relative to the helmet, shared by the helmet and the screen-glow overlay.
const visorBox = (cx: number, cy: number, r: number) => ({
  x: cx - r * 0.72,
  y: cy - r * 0.56,
  width: r * 1.44,
  height: r * 1.12,
  rx: r * 0.5,
});

// Tiny stars inside the visor, as offsets from the helmet centre (in helmet radii) plus size.
const visorStars: [number, number, number][] = [
  [-0.35, 0.12, 0.035], [0.12, -0.3, 0.03], [0.42, 0.05, 0.025], [-0.08, 0.36, 0.03], [0.26, 0.36, 0.02], [-0.5, -0.12, 0.02],
];

function Helmet({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const band = r * 1.16;
  const bandPath = `M${cx - band} ${cy} A${band} ${band} 0 0 1 ${cx + band} ${cy}`;
  const visor = visorBox(cx, cy, r);
  const rimPad = r * 0.08;
  return (
    <g>
      {/* Headset band with a soft padded section on top */}
      <path d={bandPath} fill="none" stroke={navy} strokeWidth={r * 0.2} strokeLinecap="round" />
      <path d={bandPath} fill="none" stroke={gold} strokeWidth={r * 0.1} strokeLinecap="round" />
      <path
        d={`M${cx - band * 0.62} ${cy - band * 0.79} A${band} ${band} 0 0 1 ${cx + band * 0.62} ${cy - band * 0.79}`}
        fill="none"
        stroke={navy}
        strokeWidth={r * 0.34}
        strokeLinecap="round"
      />
      <path
        d={`M${cx - band * 0.62} ${cy - band * 0.79} A${band} ${band} 0 0 1 ${cx + band * 0.62} ${cy - band * 0.79}`}
        fill="none"
        stroke="#3b4a66"
        strokeWidth={r * 0.24}
        strokeLinecap="round"
      />

      {/* Shell with a soft shadow on the lower right */}
      <circle cx={cx} cy={cy} r={r} fill={suitShadow} {...lines} />
      <circle cx={cx - r * 0.07} cy={cy - r * 0.06} r={r * 0.9} fill={suit} />
      <circle cx={cx} cy={cy} r={r} fill="none" {...lines} />

      {/* Metal rim and dark starry visor */}
      <rect
        x={visor.x - rimPad}
        y={visor.y - rimPad}
        width={visor.width + rimPad * 2}
        height={visor.height + rimPad * 2}
        rx={visor.rx + rimPad}
        fill={metal}
        {...lines}
      />
      <rect {...visor} fill="url(#astro-visor-space)" {...lines} />
      {visorStars.map(([dx, dy, s]) => (
        <circle key={`${dx}-${dy}`} cx={cx + dx * r} cy={cy + dy * r} r={s * r} fill="white" fillOpacity={0.9} />
      ))}

      {/* Faint reflection of a ringed planet */}
      <circle cx={cx - r * 0.3} cy={cy - r * 0.18} r={r * 0.11} fill="#6b5bd6" fillOpacity={0.85} />
      <ellipse
        cx={cx - r * 0.3}
        cy={cy - r * 0.18}
        rx={r * 0.19}
        ry={r * 0.05}
        transform={`rotate(-20 ${cx - r * 0.3} ${cy - r * 0.18})`}
        fill="none"
        stroke="#c4b5fd"
        strokeWidth={r * 0.025}
      />

      {/* Glass shine */}
      <path
        d={`M${cx + r * 0.18} ${cy - r * 0.44} Q${cx + r * 0.5} ${cy - r * 0.38} ${cx + r * 0.56} ${cy - r * 0.08}`}
        fill="none"
        stroke="white"
        strokeOpacity={0.85}
        strokeWidth={r * 0.07}
        strokeLinecap="round"
      />

      {/* Microphone boom from the right ear cup toward the chin */}
      <path
        d={`M${cx + r * 1.0} ${cy + r * 0.4} Q${cx + r * 0.95} ${cy + r * 0.95} ${cx + r * 0.45} ${cy + r * 0.98}`}
        fill="none"
        stroke={navy}
        strokeWidth={r * 0.1}
        strokeLinecap="round"
      />
      <path
        d={`M${cx + r * 1.0} ${cy + r * 0.4} Q${cx + r * 0.95} ${cy + r * 0.95} ${cx + r * 0.45} ${cy + r * 0.98}`}
        fill="none"
        stroke={metal}
        strokeWidth={r * 0.05}
        strokeLinecap="round"
      />
      <rect x={cx + r * 0.3} y={cy + r * 0.9} width={r * 0.22} height={r * 0.16} rx={r * 0.08} fill={metalDark} {...thinLines} />

      {/* Big padded ear cups */}
      {[cx - r * 1.32, cx + r * 0.8].map((x) => (
        <g key={x}>
          <rect x={x} y={cy - r * 0.46} width={r * 0.52} height={r * 0.92} rx={r * 0.22} fill={gold} {...lines} />
          <rect x={x + r * 0.12} y={cy - r * 0.3} width={r * 0.28} height={r * 0.6} rx={r * 0.12} fill="#ffd76a" />
        </g>
      ))}
    </g>
  );
}

// Where the limbs join the torso, relative to its centre and top.
const shoulder = { dx: 23, dy: 10 };
const hip = { dx: 12, dy: 47 };

// Suit body: backpack, shaded torso, harness straps, waist strap, chest control box and collar.
function Torso({ cx, top, backpack = true }: { cx: number; top: number; backpack?: boolean }) {
  return (
    <g>
      {backpack && <rect x={cx - 29} y={top - 5} width={58} height={48} rx={12} fill={metal} {...lines} />}
      <rect x={cx - 25} y={top} width={50} height={53} rx={20} fill={suitShadow} {...lines} />
      <rect x={cx - 23} y={top + 2} width={40} height={49} rx={18} fill={suit} />
      <rect x={cx - 25} y={top} width={50} height={53} rx={20} fill="none" {...lines} />

      <g fill="none" stroke={metalDark} strokeWidth={4.5} strokeLinecap="round">
        <path d={`M${cx - 16} ${top + 4} L${cx - 11} ${top + 38}`} />
        <path d={`M${cx + 16} ${top + 4} L${cx + 11} ${top + 38}`} />
      </g>
      <rect x={cx - 25} y={top + 37} width={50} height={7} fill={metalDark} {...thinLines} />

      <rect x={cx - 12} y={top + 13} width={24} height={16} rx={3} fill={metal} {...thinLines} />
      <rect x={cx - 9} y={top + 16} width={9} height={10} rx={2} fill={navy} />
      <circle cx={cx + 5} cy={top + 18} r={2.2} fill={blue} />
      <circle cx={cx + 5} cy={top + 25} r={2.2} fill={orange} />

      <rect x={cx - 20} y={top - 4} width={40} height={9} rx={4.5} fill={metal} {...lines} />
    </g>
  );
}

type LimbProps = {
  // Shoulder or hip position; angle 0 points straight down, positive turns clockwise.
  x: number;
  y: number;
  angle: number;
  length?: number;
  action?: keyof typeof limbMotion;
  delay?: number;
};

// Sleeve with shading, a shoulder patch, an elbow crease, a metal cuff and a dark mitten glove with a thumb.
function Arm({ x, y, angle, length = 32, action, delay = 0 }: LimbProps) {
  const parts = (
    <g>
      <rect x={x - 12} y={y - 6} width={24} height={length} rx={12} fill={suit} {...lines} />
      <rect x={x + 2} y={y - 2} width={7} height={length - 12} rx={3.5} fill={suitShadow} />
      <rect x={x - 8} y={y + 4} width={10} height={7} rx={2} fill={blue} {...thinLines} />
      <path d={`M${x - 8} ${y + length * 0.58} Q${x} ${y + length * 0.52} ${x + 8} ${y + length * 0.58}`} fill="none" {...thinLines} />
      <rect x={x - 14} y={y + length - 10} width={28} height={9} rx={4} fill={metal} {...thinLines} />
      <ellipse cx={x + 13} cy={y + length + 4} rx={6} ry={8} fill={glove} {...thinLines} />
      <circle cx={x} cy={y + length + 8} r={14} fill={glove} {...lines} />
    </g>
  );
  return (
    <g transform={`rotate(${angle} ${x} ${y})`}>
      {action ? (
        <motion.g
          style={{ originX: "50%", originY: "0%" }}
          animate={limbMotion[action].animate}
          transition={{ duration: limbMotion[action].duration, repeat: Infinity, ease: "easeInOut", delay }}
        >
          {parts}
        </motion.g>
      ) : (
        parts
      )}
    </g>
  );
}

// Short leg with shading, an orange knee patch and a big chunky boot with tread lines.
function Leg({ x, y, angle, length = 30 }: LimbProps) {
  return (
    <g transform={`rotate(${angle} ${x} ${y})`}>
      <rect x={x - 15} y={y - 6} width={30} height={length} rx={14} fill={suit} {...lines} />
      <rect x={x + 3} y={y - 2} width={8} height={length - 10} rx={4} fill={suitShadow} />
      <rect x={x - 9} y={y + length * 0.3} width={14} height={8} rx={3} fill={orange} {...thinLines} />
      <rect x={x - 20} y={y + length - 10} width={42} height={26} rx={12} fill={glove} {...lines} />
      <g stroke={metal} strokeWidth={2.5} strokeLinecap="round">
        <path d={`M${x - 14} ${y + length + 8} L${x + 16} ${y + length + 8}`} />
        <path d={`M${x - 12} ${y + length + 2} L${x + 14} ${y + length + 2}`} />
      </g>
    </g>
  );
}

// --- Hero scene: sitting on a ringed planet, typing on a laptop. Split into layers so each can move on its own. ---

export const sceneViewBox = "0 0 240 200";

// Big chibi helmet: its lower edge overlaps the top of the torso (top 97).
const coderHelmet = { cx: 120, cy: 52, r: 58 };

// Saturn-style planet: a whole golden sphere with a wide, flat, banded ring tilted around its middle.
// Only the top 65% of the sphere shows; the rest sits below the bottom of the screen.
export const planetViewBox = "0 0 400 260";
const planet = { cx: 200, cy: 150, r: 88 };
const visibleShare = 0.65;
const visibleBottomY = planet.cy - planet.r + planet.r * 2 * visibleShare;
export const planetAspect = 260 / 400;
// As fractions of the artwork's height: how much hangs below the screen, and where the top of the sphere is.
export const planetHiddenBelow = (260 - visibleBottomY) / 260;
export const planetCrestAbove = (visibleBottomY - (planet.cy - planet.r)) / 260;

const planetLines = { stroke: navy, strokeWidth: 2.4, strokeLinejoin: "round" as const };

// Ring bands from outermost to innermost: radii, thickness and colour.
const ringBands: { rx: number; ry: number; width: number; color: string }[] = [
  { rx: 186, ry: 40, width: 14, color: "#fbe7ff" },
  { rx: 164, ry: 35, width: 9, color: "#f0abfc" },
  { rx: 146, ry: 31, width: 7, color: "#e9d5ff" },
];

function RingHalf({ front }: { front: boolean }) {
  // Upper arcs pass behind the planet, lower arcs in front of it.
  const sweep = front ? 0 : 1;
  return (
    <g transform={`rotate(-14 ${planet.cx} ${planet.cy})`} fill="none">
      {ringBands.map(({ rx, ry, width, color }) => {
        const arc = `M${planet.cx - rx} ${planet.cy} A${rx} ${ry} 0 0 ${sweep} ${planet.cx + rx} ${planet.cy}`;
        return (
          <g key={rx}>
            <path d={arc} stroke={navy} strokeWidth={width + 3} />
            <path d={arc} stroke={color} strokeWidth={width} />
          </g>
        );
      })}
    </g>
  );
}

export function Planet({ className }: { className?: string }) {
  return (
    <Sticker viewBox={planetViewBox} className={className} thin>
      <defs>
        <clipPath id="astro-planet-clip">
          <circle {...planet} />
        </clipPath>
        {/* Dusk gradient: the same blue, violet and pink as the site's headlines */}
        <linearGradient id="astro-planet-dusk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2997ff" />
          <stop offset="55%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
      </defs>

      <RingHalf front={false} />

      <circle {...planet} fill="url(#astro-planet-dusk)" {...planetLines} />
      <g clipPath="url(#astro-planet-clip)">
        {/* Soft horizontal bands */}
        <g fill="none" strokeLinecap="round">
          <path d="M100 100 Q200 88 300 100" stroke="white" strokeOpacity={0.25} strokeWidth={10} />
          <path d="M100 132 Q200 120 300 132" stroke="#3b2a8a" strokeOpacity={0.3} strokeWidth={8} />
          <path d="M100 170 Q200 158 300 170" stroke="white" strokeOpacity={0.2} strokeWidth={9} />
          <path d="M100 204 Q200 194 300 204" stroke="#3b2a8a" strokeOpacity={0.3} strokeWidth={8} />
        </g>
        {/* Shadow on the lower right and a highlight on the upper left, so it looks round */}
        <circle cx={planet.cx + 40} cy={planet.cy + 34} r={planet.r} fill="none" stroke="#2a1a5e" strokeOpacity={0.4} strokeWidth={36} />
        <path d="M140 92 Q160 72 196 68" fill="none" stroke="white" strokeOpacity={0.7} strokeWidth={6} strokeLinecap="round" />
      </g>
      <circle {...planet} fill="none" {...planetLines} />

      <RingHalf front />
    </Sticker>
  );
}

export function Coder({ className }: { className?: string }) {
  return (
    <Sticker viewBox={sceneViewBox} className={className}>
      <Leg x={120 - hip.dx} y={97 + hip.dy} angle={40} length={24} />
      <Leg x={120 + hip.dx} y={97 + hip.dy} angle={-40} length={24} />
      <Torso cx={120} top={97} />
      <Arm x={120 - shoulder.dx} y={97 + shoulder.dy} angle={-25} action="type" />
      <Arm x={120 + shoulder.dx} y={97 + shoulder.dy} angle={25} action="type" delay={0.16} />
      <Helmet {...coderHelmet} />
      {/* Screen glow reflected on the visor */}
      <motion.rect
        {...visorBox(coderHelmet.cx, coderHelmet.cy, coderHelmet.r)}
        fill={blue}
        animate={{ opacity: [0.03, 0.16, 0.03] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </Sticker>
  );
}

export function Laptop({ className }: { className?: string }) {
  return (
    <Sticker viewBox={sceneViewBox} className={className}>
      <rect x="88" y="140" width="64" height="38" rx="6" fill="#e8edf5" {...lines} />
      <rect x="80" y="176" width="80" height="7" rx="3.5" fill={navy} {...lines} />
      {/* Moon sticker */}
      <circle cx="120" cy="159" r="7" fill={navy} />
      <circle cx="123.5" cy="156" r="6" fill="#e8edf5" />
    </Sticker>
  );
}

const stars: [number, number, number][] = [
  [24, 40, 7], [40, 118, 4], [16, 170, 5], [218, 30, 7], [230, 110, 4], [210, 160, 6], [70, 8, 4], [176, 6, 5],
];

const starPath = (cx: number, cy: number, s: number) =>
  `M${cx} ${cy - s} L${cx + s * 0.3} ${cy - s * 0.3} L${cx + s} ${cy} L${cx + s * 0.3} ${cy + s * 0.3} ` +
  `L${cx} ${cy + s} L${cx - s * 0.3} ${cy + s * 0.3} L${cx - s} ${cy} L${cx - s * 0.3} ${cy - s * 0.3}Z`;

export function Sparkles({ className }: { className?: string }) {
  return (
    <svg viewBox={sceneViewBox} className={className} overflow="visible" aria-hidden>
      {stars.map(([cx, cy, s], i) => (
        <motion.path
          key={`${cx}-${cy}`}
          d={starPath(cx, cy, s)}
          fill="white"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}
    </svg>
  );
}

// --- About scene: drifting weightless, arms out and swaying, one knee bent. ---

export function Drifter({ className }: { className?: string }) {
  return (
    <Sticker viewBox="0 0 240 250" className={className}>
      <Leg x={120 - hip.dx} y={99 + hip.dy} angle={18} />
      <Leg x={120 + hip.dx} y={99 + hip.dy} angle={-34} length={27} />
      <Arm x={120 - shoulder.dx} y={99 + shoulder.dy} angle={70} action="sway" />
      <Arm x={120 + shoulder.dx} y={99 + shoulder.dy} angle={-70} action="sway" delay={0.5} />
      <Torso cx={120} top={99} />
      <Helmet cx={120} cy={54} r={58} />
    </Sticker>
  );
}

// --- Experience to Skills scene: riding a rocket across the screen, waving. ---

export function RocketRider({ className }: { className?: string }) {
  return (
    <Sticker viewBox="0 0 280 220" className={className}>
      {/* Flickering exhaust flame */}
      <motion.g
        style={{ originX: "100%", originY: "50%" }}
        animate={{ scaleX: [1, 1.35, 1] }}
        transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M38 136 C20 134 8 144 0 150 C8 156 20 166 38 164Z" fill={orange} />
        <path d="M38 142 C28 141 18 146 12 150 C18 154 28 159 38 158Z" fill="#fde047" />
      </motion.g>

      {/* Chunky rocket body */}
      <g {...lines}>
        <rect x="36" y="134" width="14" height="32" rx="4" fill={metal} />
        <path d="M72 122 L48 90 L102 114Z" fill={red} />
        <path d="M72 178 L48 210 L102 186Z" fill={red} />
        <path d="M48 150 C48 118 92 108 160 112 C204 115 230 132 240 150 C230 168 204 185 160 188 C92 192 48 182 48 150Z" fill={suit} />
        <path d="M208 117 C224 125 234 138 240 150 C234 162 224 175 208 183 C216 166 216 134 208 117Z" fill={red} />
        <circle cx="172" cy="150" r="15" fill="#9fd0ff" />
      </g>

      <Torso cx={120} top={71} backpack={false} />
      <Leg x={120 + hip.dx} y={71 + hip.dy} angle={15} length={28} />
      <Arm x={120 - shoulder.dx} y={71 + shoulder.dy} angle={-15} length={30} />
      <Arm x={120 + shoulder.dx} y={71 + shoulder.dy} angle={-150} action="wave" />
      <Helmet cx={120} cy={32} r={50} />
    </Sticker>
  );
}

// --- Projects scene: floating cross-legged in meditation, coffee in one hand, palm open in the other. ---

export const meditatorViewBox = "0 0 240 240";

const mug = { x: 162, y: 118 };

function CoffeeMug({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {/* Handle on the left, where the hand holds it */}
      <path d={`M${x + 2} ${y + 6} q-10 0 -10 9 t10 9`} fill="none" {...lines} strokeWidth={4} />
      <rect x={x} y={y} width={28} height={30} rx={5} fill={blue} {...lines} />
      <ellipse cx={x + 14} cy={y + 3} rx={11} ry={3} fill="#6b3f1d" />
      <path d={starPath(x + 14, y + 17, 6)} fill="white" />
    </g>
  );
}

// Three soft wisps that rise at a steady pace, sway a little, and fade toward their tips.
function Steam({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <defs>
        <linearGradient id="astro-steam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M${x + 6 + i * 8} ${y - 4} c-5 -6 5 -10 0 -16 s5 -10 0 -16`}
          fill="none"
          stroke="url(#astro-steam)"
          strokeWidth={3}
          strokeLinecap="round"
          animate={{ y: [2, -16], x: [0, i % 2 ? 2 : -2], opacity: [0, 0.85, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: i,
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 1], delay: i },
          }}
        />
      ))}
    </g>
  );
}

export function Meditator({ className }: { className?: string }) {
  const cx = 120;
  const top = 103;
  return (
    <Sticker viewBox={meditatorViewBox} className={className} overlay={<Steam {...mug} />}>
      <Torso cx={cx} top={top} />
      {/* Legs crossed in front of the body */}
      <Leg x={cx - hip.dx} y={top + hip.dy} angle={-78} length={30} />
      <Leg x={cx + hip.dx} y={top + hip.dy} angle={78} length={30} />
      {/* Left hand resting palm-up, right hand holding the coffee */}
      <Arm x={cx - shoulder.dx} y={top + shoulder.dy} angle={50} length={28} />
      <Arm x={cx + shoulder.dx} y={top + shoulder.dy} angle={-50} length={28} />
      <CoffeeMug {...mug} />
      <Helmet cx={cx} cy={58} r={58} />
    </Sticker>
  );
}

// Site accent colours (the same blue, violet and pink as the gradient headlines), used in turn by the streaks.
const streakColors = ["#2997ff", "#a78bfa", "#e879f9"];

// Thin streaks around the meditating astronaut that drift down and fade, so it seems to float gently upward.
// Each streak: x, top y, length, and how long one loop takes.
const streaks: [number, number, number, number][] = [
  [18, 70, 18, 4.2],
  [62, 178, 46, 5],
  [206, 84, 38, 4.6],
  [152, 192, 96, 5.6],
  [228, 150, 24, 4],
  [96, 14, 20, 4.8],
];

export function Aura({ className }: { className?: string }) {
  return (
    <svg viewBox={meditatorViewBox} className={className} overflow="visible" aria-hidden>
      {/* Each colour fades out at both ends so the streaks have soft tips */}
      <defs>
        {streakColors.map((color, i) => (
          <linearGradient key={color} id={`astro-streak-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {streaks.map(([x, y, length, duration], i) => (
        <motion.rect
          key={`${x}-${y}`}
          x={x - 1.25}
          y={y}
          width={2.5}
          height={length}
          rx={1.25}
          fill={`url(#astro-streak-${i % streakColors.length})`}
          // Constant drift speed; fading is timed separately so the loop restart is never visible.
          animate={{ y: [-14, 30], opacity: [0, 1, 1, 0] }}
          transition={{
            y: { duration, repeat: Infinity, ease: "linear", delay: i * 0.6 },
            opacity: { duration, repeat: Infinity, ease: "linear", times: [0, 0.25, 0.75, 1], delay: i * 0.6 },
          }}
        />
      ))}
    </svg>
  );
}

// --- Contact scene (the end): just the helmet peeking up from the bottom edge, one hand waving. ---

export const peekerViewBox = "0 0 240 200";

// Big mitten on a padded sleeve, swaying from the bottom like a friendly wave.
function WavingMitten() {
  return (
    <motion.g
      style={{ originX: "50%", originY: "100%" }}
      animate={{ rotate: [-12, 14, -12] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="203" y="138" width="30" height="74" rx="15" fill={suit} {...lines} />
      <rect x="221" y="142" width="8" height="66" rx="4" fill={suitShadow} />
      <rect x="208" y="160" width="12" height="8" rx="2" fill={blue} {...thinLines} />
      <rect x="198" y="126" width="40" height="16" rx="8" fill={metal} {...lines} />
      <ellipse cx="198" cy="112" rx="8" ry="11" transform="rotate(-30 198 112)" fill={glove} {...lines} />
      <ellipse cx="218" cy="104" rx="20" ry="24" fill={glove} {...lines} />
      <path d="M211 86 Q214 94 212 101" fill="none" stroke={metal} strokeWidth={2.5} strokeLinecap="round" />
    </motion.g>
  );
}

export function Peeker({ className }: { className?: string }) {
  return (
    <Sticker viewBox={peekerViewBox} className={className}>
      <Helmet cx={115} cy={112} r={70} />
      <WavingMitten />
    </Sticker>
  );
}
