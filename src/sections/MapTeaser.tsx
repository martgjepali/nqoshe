import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { clusters } from '../lib/spots';
import { Reveal, WordReveal } from '../components/Reveal';
import { ease } from '../lib/motion';

/** Deterministic scatter so the sediment is the same every load. */
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

interface Speck {
  x: number;
  y: number;
  r: number;
  o: number;
}

const R = 210; // cup radius in viewBox units
const CX = 240;
const CY = 240;

export function MapTeaser() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  const plots = useMemo(
    () =>
      clusters.map((c, ci) => {
        const rand = mulberry(ci * 7919 + 13);
        const cx = CX + (c.x - 0.5) * R * 1.42;
        const cy = CY + (c.y - 0.5) * R * 1.42;
        const specks: Speck[] = [];
        // one grain per spot, plus a little dust so a cluster reads as sediment
        const grains = c.spots.length;
        for (let i = 0; i < grains * 6; i++) {
          const primary = i < grains;
          const angle = rand() * Math.PI * 2;
          const spread = (primary ? 16 : 34) * Math.sqrt(rand());
          specks.push({
            x: cx + Math.cos(angle) * spread,
            y: cy + Math.sin(angle) * spread * 0.86,
            r: primary ? 2.6 + rand() * 1.9 : 0.6 + rand() * 1.1,
            o: primary ? 0.82 + rand() * 0.18 : 0.2 + rand() * 0.28,
          });
        }
        return { ...c, cx, cy, specks };
      }),
    [],
  );

  return (
    <section id="harta" data-act="night" className="act-night ground relative overflow-hidden">
      <div className="shell grid grid-cols-1 items-center gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <WordReveal
            as="h2"
            text="Nuk është hartë."
            className="display text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1.05]"
          />
          <Reveal delay={0.1}>
            <p
              className="display mt-1 text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1.05]"
              style={{ color: 'var(--accent)' }}
            >
              Është fundi i filxhanit.
            </p>
            <p className="body-lg mt-7">
              The dataset has no coordinates yet, so this is not pretending to be geography. It is
              the grounds in the bottom of the cup: which parts of Tirana the corners settle into,
              and how heavily.
            </p>
          </Reveal>

          <ul className="mt-9 m-0 list-none p-0">
            {plots.map((c, i) => (
              <Reveal key={c.name} delay={0.05 + i * 0.05} y={12} blur={false}>
                <li
                  className="flex cursor-default items-baseline justify-between gap-6 py-2.5 transition-colors duration-200"
                  style={{
                    borderBottom: '1px solid var(--rule)',
                    color: active === c.name ? 'var(--accent)' : 'var(--ink-2)',
                  }}
                  onMouseEnter={() => setActive(c.name)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(c.name)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                >
                  <span className="text-[0.95rem] font-medium">{c.name}</span>
                  <span className="reading" style={{ color: 'inherit' }}>
                    {c.spots.length}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <motion.svg
            viewBox="0 0 480 480"
            role="img"
            aria-label={`Abstract plot of ${clusters.length} Tirana neighborhood clusters drawn as coffee sediment in the bottom of a cup.`}
            className="mx-auto w-full max-w-[34rem]"
            initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: -3 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: ease.out }}
          >
            <defs>
              {/* glazed porcelain, lit from the upper left like everything else */}
              <radialGradient id="glaze" cx="33%" cy="24%" r="86%">
                <stop offset="0%" stopColor="#FFF8EC" />
                <stop offset="46%" stopColor="#F2E4C9" />
                <stop offset="82%" stopColor="#D8C09A" />
                <stop offset="100%" stopColor="#B8996E" />
              </radialGradient>
              <radialGradient id="shade" cx="74%" cy="82%" r="60%">
                <stop offset="0%" stopColor="rgba(90,56,28,0.42)" />
                <stop offset="100%" stopColor="rgba(90,56,28,0)" />
              </radialGradient>
            </defs>

            <circle cx={CX} cy={CY} r={R + 20} fill="none" stroke="rgba(216,154,74,0.18)" strokeWidth="1" />
            <circle cx={CX} cy={CY} r={R + 11} fill="#C8AC84" opacity="0.5" />
            <circle cx={CX} cy={CY} r={R} fill="url(#glaze)" />
            <circle cx={CX} cy={CY} r={R} fill="url(#shade)" />
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(120,80,40,0.28)" strokeWidth="1" />

            {plots.map((c, ci) => {
              const on = active === null || active === c.name;
              return (
                <g
                  key={c.name}
                  onMouseEnter={() => setActive(c.name)}
                  onMouseLeave={() => setActive(null)}
                  style={{ transition: 'opacity 320ms cubic-bezier(0.16,1,0.3,1)', opacity: on ? 1 : 0.22 }}
                >
                  {c.specks.map((s, i) => (
                    <motion.circle
                      key={i}
                      cx={s.x}
                      cy={s.y}
                      r={s.r}
                      fill={active === c.name ? '#B03E1C' : '#33200F'}
                      opacity={s.o}
                      initial={reduce ? false : { scale: 0, opacity: 0 }}
                      whileInView={reduce ? undefined : { scale: 1, opacity: s.o }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + ci * 0.07 + (i % 9) * 0.035,
                        ease: ease.out,
                      }}
                      style={{ transformOrigin: `${s.x}px ${s.y}px`, transition: 'fill 280ms ease' }}
                    />
                  ))}
                  {active === c.name && (
                    <text
                      x={c.cx}
                      y={c.cy - 42}
                      textAnchor="middle"
                      fontSize="14"
                      letterSpacing="1.6"
                      fill="#2A1508"
                      stroke="#FBF2E1"
                      strokeWidth="4"
                      paintOrder="stroke"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}
                    >
                      {c.name}
                    </text>
                  )}
                </g>
              );
            })}
          </motion.svg>

          <p className="mt-6 text-center text-[0.8125rem]" style={{ color: 'var(--ink-3)' }}>
            One grain per corner. Hover a neighbourhood to find it. Positions are drawn, not
            surveyed.
          </p>
        </div>
      </div>
    </section>
  );
}
