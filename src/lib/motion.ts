import type { Transition } from 'motion/react';

/**
 * Organic curves only. The built-in CSS easings are too weak to read as
 * intentional at the durations this page uses. Mirrored as `--ease-*` tokens
 * in index.css, which is where the Tailwind `ease-light` utility comes from.
 */
export const ease = {
  /** Exponential out. Everything that enters. */
  out: [0.16, 1, 0.3, 1] as const,
  /** iOS drawer curve. Things that settle into place under their own weight. */
  settle: [0.32, 0.72, 0, 1] as const,
  /** Symmetric. Things that move across the screen. */
  move: [0.65, 0, 0.35, 1] as const,
};

export const reveal: Transition = { duration: 0.9, ease: ease.out };

/** Clamp a value into 0..1. */
export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
