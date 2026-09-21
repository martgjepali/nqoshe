import type { Transition } from 'motion/react';

/**
 * Organic curves only. The built-in CSS easings are too weak to read as
 * intentional at the durations this page uses.
 */
export const ease = {
  /** Exponential out. Everything that enters. */
  out: [0.16, 1, 0.3, 1] as const,
  /** iOS drawer curve. Things that settle into place under their own weight. */
  settle: [0.32, 0.72, 0, 1] as const,
  /** Symmetric. Things that move across the screen. */
  move: [0.65, 0, 0.35, 1] as const,
};

/** A little slow and luxurious on purpose. Not corporate-snappy. */
export const reveal: Transition = { duration: 0.9, ease: ease.out };
export const revealSlow: Transition = { duration: 1.25, ease: ease.out };

export const spring = {
  /** Cursor-tracking. Loose enough to have momentum, tight enough to track. */
  cursor: { stiffness: 90, damping: 18, mass: 0.7 },
  /** UI settle. */
  ui: { stiffness: 260, damping: 28, mass: 0.6 },
};

/** Clamp a value into 0..1. */
export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * The single clock. Scroll progress across the whole document maps to an
 * hour of the Tirana day: the page opens at first light and closes late.
 */
export const DAY_START = 6.4;
export const DAY_END = 23.2;

export const hourAt = (progress: number) =>
  DAY_START + clamp01(progress) * (DAY_END - DAY_START);

export const formatHour = (h: number) => {
  const hours = Math.floor(h) % 24;
  const minutes = Math.floor((h % 1) * 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
