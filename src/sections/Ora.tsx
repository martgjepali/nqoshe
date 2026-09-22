import { Suspense, lazy, useRef } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useCanRender3D } from '../lib/capability';
import { useClock } from '../lib/clock';
import { ease, formatHour } from '../lib/motion';

const TableScene = lazy(() => import('../three/TableScene'));

/**
 * Where in this section the room stops being daylit and becomes lamplit.
 * The ground, the ink, the vignette and the fixed chrome's act sentinels are
 * all derived from this one number.
 */
const ROOM_SWITCH = 0.74;

interface Beat {
  time: string;
  sq: string;
  en: string;
  /** Window in HOURS of the Tirana day, so a note cannot disagree with the clock. */
  at: [number, number, number, number];
}

/** Every line below is read off the dataset's own hours and caveats. */
const beats: Beat[] = [
  {
    time: '07:00',
    sq: 'Streha hap. Drita bie mbi tryezën e gjatë.',
    en: 'Streha opens. The light lands along the long table.',
    at: [6.9, 7.1, 10.4, 11.6],
  },
  {
    time: '16:30',
    sq: 'Te Izzy nis muzika. Mbyll laptopin, ose ndërro qoshe.',
    en: 'At Izzy the music starts. Close the laptop, or change corners.',
    at: [14.2, 15.8, 17.2, 18.2],
  },
  {
    time: '19:00',
    sq: 'Innospace mbyll. Streha rri hapur edhe katër orë.',
    en: 'Innospace closes. Streha stays open four hours longer.',
    at: [17.8, 18.8, 19.7, 20.0],
  },
];

function Caption({ beat, hour }: { beat: Beat; hour: MotionValue<number> }) {
  const opacity = useTransform(hour, beat.at, [0, 1, 1, 0]);
  const y = useTransform(hour, beat.at, [20, 0, 0, -14]);
  const blurPx = useTransform(hour, beat.at, [7, 0, 0, 7]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

  return (
    <motion.figure className="absolute inset-x-0 top-0 m-0" style={{ opacity, y, filter }}>
      <figcaption>
        <p
          className="display text-[clamp(1.15rem,1.9vw,1.5rem)] leading-[1.24]"
          style={{ color: 'var(--ink)' }}
        >
          {beat.sq}
        </p>
        <p className="gloss mt-2.5 text-[1rem]">{beat.en}</p>
      </figcaption>
    </motion.figure>
  );
}

/** The hour, ticking. One number on the page, and this is it. */
function Readout({ hour }: { hour: MotionValue<number> }) {
  const el = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(hour, 'change', (h) => {
    if (el.current) el.current.textContent = formatHour(h);
  });
  return (
    <span
      ref={el}
      className="display text-[clamp(2.4rem,4.4vw,3.6rem)] leading-none tabular-nums"
      style={{ color: 'var(--accent)' }}
    >
      07:00
    </span>
  );
}

export function Ora() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const can3D = useCanRender3D();
  const { hour } = useClock();

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end end'],
  });

  // The hour sets the ground. The sun's arc is long and lives in the scene's
  // light; the ROOM's light is what this changes, and a room goes from daylight
  // to lamplight quickly. Keeping that crossover narrow is also what keeps the
  // copy legible: text never sits on a mid-tone ground for more than a frame.
  const stops = [0, ROOM_SWITCH - 0.06, ROOM_SWITCH, ROOM_SWITCH + 0.06, 1];
  const inkStops = [0, ROOM_SWITCH - 0.01, ROOM_SWITCH + 0.02, 1];
  const ground = useTransform(scrollYProgress, stops, [
    '#FAF3E7',
    '#E9D5B3',
    '#9A5C31',
    '#241812',
    '#1A120C',
  ]);
  const ink = useTransform(scrollYProgress, inkStops, [
    '#241812',
    '#241812',
    '#F4E7D3',
    '#F4E7D3',
  ]);
  const ink2 = useTransform(scrollYProgress, inkStops, [
    '#6B5341',
    '#6B5341',
    '#A8927A',
    '#A8927A',
  ]);
  const ink3 = useTransform(scrollYProgress, inkStops, [
    '#7B6349',
    '#7B6349',
    '#93795B',
    '#93795B',
  ]);
  const accent = useTransform(scrollYProgress, inkStops, [
    '#C1512F',
    '#C1512F',
    '#D89A4A',
    '#D89A4A',
  ]);
  const rule = useTransform(scrollYProgress, inkStops, [
    'rgba(36,24,18,0.13)',
    'rgba(36,24,18,0.15)',
    'rgba(244,231,211,0.16)',
    'rgba(244,231,211,0.14)',
  ]);
  const vignette = useTransform(scrollYProgress, [ROOM_SWITCH, 1], [0, 0.7]);

  // Motion values in `style` only bind on a motion component; the custom
  // properties are what carry the hour down to every child in the act.
  const style = reduce
    ? undefined
    : {
        background: ground,
        // Declared here so inherited text re-resolves against this act's ink.
        color: ink,
        // The edge fade and any child reading the ground need it too, not just
        // the section's own paint.
        '--ground': ground,
        '--ink': ink,
        '--ink-2': ink2,
        '--ink-3': ink3,
        '--accent': accent,
        '--rule': rule,
        height: '300vh',
      };

  return (
    <motion.section
      ref={section}
      id="ora"
      className={reduce ? 'act-night ground relative' : 'relative'}
      style={style as never}
    >
      {/* Sentinels for the fixed chrome: the act flips where the light does. */}
      <div
        aria-hidden
        data-act="dawn"
        className="absolute inset-x-0 top-0"
        style={{ height: `${ROOM_SWITCH * 100}%` }}
      />
      <div
        aria-hidden
        data-act="night"
        className="absolute inset-x-0 bottom-0"
        style={{ height: `${(1 - ROOM_SWITCH) * 100}%` }}
      />

      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="grid h-full grid-cols-1 lg:grid-cols-12">
          {/* --- the reading, set on the act's own ground --------------- */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="shell flex h-full flex-col justify-center pb-14 lg:py-0 lg:pr-0">
              <motion.h2
                className="display max-w-[13ch] text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.06]"
                style={{ color: 'var(--ink)' }}
                initial={reduce ? false : { opacity: 0, y: 20, filter: 'blur(8px)' }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.1, ease: ease.out }}
              >
                E njëjta tryezë, gjithë ditën.
              </motion.h2>
              <p className="gloss mt-3 max-w-[30rem] text-[1.0625rem]">
                One table, all day. Keep scrolling and the light moves across it.
              </p>

              <div className="mt-12 lg:mt-14">
                <div className="flex items-baseline gap-4">
                  {reduce ? (
                    <span
                      className="display text-[clamp(2.4rem,4.4vw,3.6rem)] leading-none"
                      style={{ color: 'var(--accent)' }}
                    >
                      07:00 &ndash; 20:00
                    </span>
                  ) : (
                    <Readout hour={hour} />
                  )}
                  <span className="h-px flex-1" style={{ background: 'var(--rule)' }} />
                </div>
              </div>

              <div className="relative mt-6 h-[11rem] lg:h-[10rem]">
                {reduce ? (
                  <ul className="m-0 list-none space-y-6 p-0">
                    {beats.map((b) => (
                      <li key={b.time} className="flex gap-5">
                        <span
                          className="display shrink-0 text-[1.5rem] leading-none"
                          style={{ color: 'var(--accent)' }}
                        >
                          {b.time}
                        </span>
                        <span>
                          <span
                            className="display block text-[1.05rem] leading-[1.3]"
                            style={{ color: 'var(--ink)' }}
                          >
                            {b.sq}
                          </span>
                          <span className="gloss mt-1 block text-[0.95rem]">{b.en}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  beats.map((b) => <Caption key={b.time} beat={b} hour={hour} />)
                )}
              </div>
            </div>
          </div>

          {/* --- the table --------------------------------------------- */}
          <div className="relative order-1 h-[50dvh] lg:order-2 lg:col-span-7 lg:h-full">
            <div className="absolute inset-0">
              {can3D ? (
                <Suspense fallback={<SceneStill />}>
                  <TableScene progress={scrollYProgress} />
                </Suspense>
              ) : (
                <SceneStill />
              )}
            </div>
            {!reduce && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  opacity: vignette,
                  background:
                    'radial-gradient(64% 58% at 52% 52%, rgba(26,18,12,0) 0%, rgba(26,18,12,0.92) 100%)',
                }}
              />
            )}
            {/* the scene dissolves into the ground rather than ending on an edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-[24%] lg:block"
              style={{
                background:
                  'linear-gradient(to right, var(--ground) 0%, color-mix(in oklab, var(--ground) 45%, transparent) 52%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/**
 * Not a placeholder. This is the section for anyone on reduced motion, a
 * low-power device, or a browser without WebGL, and it carries the same idea:
 * one table, held by one light.
 */
function SceneStill() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#1A120C' }}>
      <img
        src="/img/scene-still.webp"
        alt="A ceramic cup, a closed book and a small plant on a round wooden table under one low warm lamp."
        className="h-full w-full object-cover opacity-95"
        style={{ objectPosition: '52% 38%' }}
        loading="lazy"
        decoding="async"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(64% 56% at 52% 50%, rgba(26,18,12,0) 0%, rgba(26,18,12,0.82) 100%)',
        }}
      />
    </div>
  );
}
