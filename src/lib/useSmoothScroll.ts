import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'motion/react';

/**
 * Lenis drives the native scrollbar (no transform hijack), so Motion's
 * useScroll and IntersectionObserver keep working untouched.
 * Off entirely under reduced motion: smoothing a scroll is still motion.
 */
export function useSmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // touch has its own physics

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduce]);
}
