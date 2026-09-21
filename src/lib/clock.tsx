import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { useMotionValue, useMotionValueEvent, useScroll, type MotionValue } from 'motion/react';
import { DAY_END, DAY_START, clamp01 } from './motion';

interface ClockValue {
  /** 0 at the top of the document, 1 at the bottom. */
  progress: MotionValue<number>;
  /** The hour of the Tirana day, 6.4 to 23.2. The page's single time authority. */
  hour: MotionValue<number>;
}

const ClockContext = createContext<ClockValue | null>(null);

/** The hour the day's long middle begins and ends, pinned to the scene act. */
const SCENE_OPENS = 7;
const SCENE_CLOSES = 23;

/**
 * One clock owns the page, and it is anchored to the layout rather than to raw
 * scroll: the hour reaches 07:00 exactly as the table scene pins and 23:00
 * exactly as it releases. Without that anchoring the light meter and the
 * scene's own timestamps drift apart and the page shows two different times in
 * one viewport.
 */
export function ClockProvider({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const hour = useMotionValue(DAY_START);
  /** [progress at scene open, progress at scene close] */
  const anchors = useRef<[number, number]>([0.25, 0.75]);

  useEffect(() => {
    const measure = () => {
      const scene = document.getElementById('ora');
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (!scene || max <= 0) return;
      const top = scene.getBoundingClientRect().top + window.scrollY;
      const release = top + scene.offsetHeight - window.innerHeight;
      anchors.current = [clamp01(top / max), clamp01(release / max)];
      hour.set(hourFor(scrollYProgress.get(), anchors.current));
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
    hour.set(hourFor(p, anchors.current));
  });

  return <ClockContext.Provider value={{ progress: scrollYProgress, hour }}>{children}</ClockContext.Provider>;
}

/** Piecewise: first light before the scene, the working day inside it, late after. */
function hourFor(p: number, [open, close]: [number, number]): number {
  const t = clamp01(p);
  if (t <= open) {
    return open <= 0 ? SCENE_OPENS : DAY_START + (t / open) * (SCENE_OPENS - DAY_START);
  }
  if (t >= close) {
    return close >= 1
      ? SCENE_CLOSES
      : SCENE_CLOSES + ((t - close) / (1 - close)) * (DAY_END - SCENE_CLOSES);
  }
  return SCENE_OPENS + ((t - open) / (close - open)) * (SCENE_CLOSES - SCENE_OPENS);
}

export function useClock(): ClockValue {
  const ctx = useContext(ClockContext);
  if (!ctx) throw new Error('useClock must be used inside <ClockProvider>');
  return ctx;
}
