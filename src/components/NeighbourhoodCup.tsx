import { useMemo } from 'react';
import { clusters } from '../lib/spots';

/** Deterministic scatter so the grounds are the same every load. */
function mulberry(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Grain {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rot: number;
  o: number;
}

const R = 205;
const CX = 240;
const CY = 240;

interface Props {
  selected: string | null;
  onSelect: (name: string | null) => void;
}

/**
 * The neighbourhoods, as grounds settled in the bottom of a cup. It is not a
 * map and does not pretend to be: the dataset has no coordinates, and the
 * positions are drawn. It is a picker. Click a clump to filter the list.
 */
export function NeighbourhoodCup({ selected, onSelect }: Props) {
  const plots = useMemo(
    () =>
      clusters.map((c, ci) => {
        const rand = mulberry(ci * 7919 + 13);
        const cx = CX + (c.x - 0.5) * R * 1.4;
        const cy = CY + (c.y - 0.5) * R * 1.4;
        const grains: Grain[] = [];
        for (let g = 0; g < c.spots.length; g++) {
          const ga = rand() * Math.PI * 2;
          const gd = 13 * Math.sqrt(rand());
          const gx = cx + Math.cos(ga) * gd;
          const gy = cy + Math.sin(ga) * gd * 0.84;
          const len = 3.1 + rand() * 2.2;
          grains.push({
            x: gx,
            y: gy,
            rx: len,
            ry: len * (0.52 + rand() * 0.34),
            rot: rand() * 180,
            o: 0.86 + rand() * 0.14,
          });
          for (let d = 0; d < 7; d++) {
            const da = rand() * Math.PI * 2;
            const dd = 4 + 16 * Math.pow(rand(), 0.7);
            const dl = 0.5 + rand() * 1.5;
            grains.push({
              x: gx + Math.cos(da) * dd,
              y: gy + Math.sin(da) * dd * 0.84,
              rx: dl,
              ry: dl * (0.45 + rand() * 0.45),
              rot: rand() * 180,
              o: 0.16 + rand() * 0.36,
            });
          }
        }
        return { ...c, cx, cy, grains };
      }),
    [],
  );

  return (
    <svg
      viewBox="0 0 480 480"
      className="mx-auto w-full max-w-[24rem]"
      role="group"
      aria-label="Zgjidh lagjen"
    >
      <defs>
        <radialGradient id="cupGlaze" cx="33%" cy="24%" r="86%">
          <stop offset="0%" stopColor="#FFF8EC" />
          <stop offset="46%" stopColor="#F2E4C9" />
          <stop offset="82%" stopColor="#D8C09A" />
          <stop offset="100%" stopColor="#B8996E" />
        </radialGradient>
        <radialGradient id="cupShade" cx="74%" cy="82%" r="60%">
          <stop offset="0%" stopColor="rgba(90,56,28,0.42)" />
          <stop offset="100%" stopColor="rgba(90,56,28,0)" />
        </radialGradient>
        <filter id="cupSoften" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      <circle cx={CX} cy={CY} r={R + 11} fill="#C8AC84" opacity="0.45" />
      <circle cx={CX} cy={CY} r={R} fill="url(#cupGlaze)" />
      <circle cx={CX} cy={CY} r={R} fill="url(#cupShade)" />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(120,80,40,0.28)" />
      <g filter="url(#cupSoften)">
        <circle
          cx={CX}
          cy={CY - 6}
          r={R - 24}
          fill="none"
          stroke="rgba(94,58,28,0.16)"
          strokeWidth="5"
          strokeDasharray="150 26 84 40 210 34"
        />
      </g>

      {plots.map((c) => {
        const on = selected === c.name;
        const dim = selected !== null && !on;
        return (
          <g
            key={c.name}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`${c.name}, ${c.spots.length} qoshe`}
            onClick={() => onSelect(on ? null : c.name)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(on ? null : c.name);
              }
            }}
            className="cursor-pointer outline-none"
            style={{
              transition: 'opacity 300ms cubic-bezier(0.16,1,0.3,1)',
              opacity: dim ? 0.2 : 1,
            }}
          >
            {/* a generous invisible target: the grains themselves are tiny */}
            <circle cx={c.cx} cy={c.cy} r={34} fill="transparent" />
            {c.grains.map((s, i) => (
              <ellipse
                key={i}
                cx={s.x}
                cy={s.y}
                rx={s.rx}
                ry={s.ry}
                transform={`rotate(${s.rot} ${s.x} ${s.y})`}
                fill={on ? '#B03E1C' : '#33200F'}
                opacity={s.o}
                style={{ transition: 'fill 260ms ease' }}
              />
            ))}
            <text
              x={c.cx}
              y={c.cy - 40}
              textAnchor="middle"
              fontSize="13"
              letterSpacing="0.8"
              fill={on ? '#8F2F12' : '#5A3B21'}
              stroke="#FBF2E1"
              strokeWidth="3.5"
              paintOrder="stroke"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                opacity: on ? 1 : 0,
                transition: 'opacity 260ms ease, fill 260ms ease',
              }}
            >
              {c.name} · {c.spots.length}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
