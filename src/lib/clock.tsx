import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { useMotionValue, useMotionValueEvent, useScroll, type MotionValue } from 'motion/react';
import { DAY_END, DAY_START, clamp01 } from './motion';

interface ClockValue {
  /** 0 at the top of the document, 1 at the bottom. */
  progress: MotionValue<number>;
  /** The hour of the Tirana day. The page's single time authority. */
  hour: MotionValue<number>;
}

const ClockContext = createContext<ClockValue | null>(null);

/**
 * The day, hung on the layout rather than spread evenly over raw scroll.
 *
 * Each anchor pins one hour to one place on the page, and the hour moves
 * linearly between them. Pinning matters because the sections are wildly
 * different heights: spread evenly, the scene would race through the
 * afternoon, and hung entirely on the scene, the whole evening would collapse
 * into the last inch of the rail. Every stretch below gets travel you can see.
 */
const ANCHORS: Array<{ id: string | null; edge: 'top' | 'release' | 'start' | 'end'; hour: number }> = [
  { id: null, edge: 'start', hour: DAY_START }, // first light, at the wordmark
  { id: 'ora', edge: 'top', hour: 7 }, // the table scene pins
  { id: 'ora', edge: 'release', hour: 20 }, // it releases; the working day is over
  { id: 'zakoni', edge: 'top', hour: 22.6 }, // the long sit
  { id: null, edge: 'end', hour: DAY_END }, // last call
];

type Stop = { p: number; hour: number };

const ClockProviderInner = ({ children }: { children: ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const hour = useMotionValue(DAY_START);
  const stops = useRef<Stop[]>([
    { p: 0, hour: DAY_START },
    { p: 1, hour: DAY_END },
  ]);

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;

      const next: Stop[] = [];
      for (const a of ANCHORS) {
        if (a.edge === 'start') {
          next.push({ p: 0, hour: a.hour });
          continue;
        }
        if (a.edge === 'end') {
          next.push({ p: 1, hour: a.hour });
          continue;
        }
        const el = a.id ? document.getElementById(a.id) : null;
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        // `release` is where a sticky child stops being pinned: the section's
        // bottom edge reaching the bottom of the viewport.
        const y = a.edge === 'release' ? top + el.offsetHeight - window.innerHeight : top;
        next.push({ p: clamp01(y / max), hour: a.hour });
      }

      // Keep it monotonic: a short viewport can put two anchors in one place.
      const clean: Stop[] = [];
      for (const s of next) {
        const prev = clean[clean.length - 1];
        if (!prev || s.p > prev.p) clean.push(s);
      }
      if (clean.length >= 2) stops.current = clean;
      hour.set(hourFor(scrollYProgress.get(), stops.current));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
    // hour and scrollYProgress are stable motion values
  }, [hour, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    hour.set(hourFor(p, stops.current));
  });

  return (
    <ClockContext.Provider value={{ progress: scrollYProgress, hour }}>
      {children}
    </ClockContext.Provider>
  );
};

function hourFor(progress: number, stops: Stop[]): number {
  const t = clamp01(progress);
  if (t <= stops[0].p) return stops[0].hour;
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (t <= b.p) {
      const span = b.p - a.p;
      return span <= 0 ? b.hour : a.hour + ((t - a.p) / span) * (b.hour - a.hour);
    }
  }
  return stops[stops.length - 1].hour;
}

export const ClockProvider = ClockProviderInner;

export function useClock(): ClockValue {
  const ctx = useContext(ClockContext);
  if (!ctx) throw new Error('useClock must be used inside <ClockProvider>');
  return ctx;
}
