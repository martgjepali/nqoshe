import { useRef } from 'react';
import { motion, useMotionValueEvent, useTransform, useReducedMotion } from 'motion/react';
import { useClock } from '../lib/clock';
import { DAY_END, DAY_START, formatHour } from '../lib/motion';

const TICKS = [8, 11, 14, 17, 20, 23];
const span = DAY_END - DAY_START;
const at = (h: number) => `${((h - DAY_START) / span) * 100}%`;

/**
 * The clock, made visible. Not a decorative locale strip: the hour it shows is
 * the same motion value that drives the table scene's sun and its timestamps,
 * so it reads as the instrument running the page.
 *
 * It is painted in brass with its own dark gradient behind it, because it hangs
 * over whatever the page has at that edge, including the hero's photograph.
 */
export function LightMeter() {
  const { progress, hour } = useClock();
  const reduce = useReducedMotion();
  const readout = useRef<HTMLSpanElement>(null);

  const top = useTransform(hour, [DAY_START, DAY_END], ['0%', '100%']);
  const glow = useTransform(hour, [DAY_START, 12, 19, DAY_END], [0.5, 1, 0.95, 0.6]);

  useMotionValueEvent(hour, 'change', (h) => {
    if (readout.current) readout.current.textContent = formatHour(h);
  });

  return (
    <>
      {/* Desktop: a light meter hung down the right edge of the page. */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-1/2 right-4 z-40 hidden h-[44vh] -translate-y-1/2 lg:block xl:right-6"
      >
        {/* its own ground, so it reads over cream, over midnight and over a photograph */}
        <div
          className="absolute -top-10 -bottom-14 right-[-1.15rem] -left-14 blur-[14px]"
          style={{
            background:
              'radial-gradient(60% 50% at 78% 50%, rgba(26,18,12,0.42) 0%, rgba(26,18,12,0) 100%)',
          }}
        />
        <div className="relative h-full w-px" style={{ background: 'rgba(216,154,74,0.34)' }}>
          {TICKS.map((h) => (
            <span
              key={h}
              className="absolute right-0 h-px w-2.5"
              style={{ top: at(h), background: 'rgba(216,154,74,0.5)' }}
            />
          ))}
          <motion.span
            className="absolute left-[-3.5px] h-2 w-2 rounded-full"
            style={{
              top: reduce ? at(DAY_START) : top,
              background: '#E9AE63',
              opacity: reduce ? 1 : glow,
              boxShadow: '0 0 14px 3px rgba(216,154,74,0.6)',
            }}
          />
        </div>
        <span
          ref={readout}
          className="reading absolute top-full right-0 mt-3 block whitespace-nowrap"
          style={{ color: '#E9AE63', textShadow: '0 1px 10px rgba(26,18,12,0.75)' }}
        >
          {formatHour(DAY_START)}
        </span>
      </div>

      {/* Below lg: the same reading, as a hairline across the top. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-px lg:hidden"
        style={{ background: 'rgba(216,154,74,0.22)' }}
      >
        <motion.div
          className="h-px origin-left"
          style={{ background: '#D89A4A', scaleX: reduce ? 0 : progress }}
        />
      </div>
    </>
  );
}
