import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

let cachedWebgl: boolean | null = null;

function hasWebgl(): boolean {
  if (cachedWebgl !== null) return cachedWebgl;
  try {
    const canvas = document.createElement('canvas');
    cachedWebgl = Boolean(
      canvas.getContext('webgl2') ??
        canvas.getContext('webgl') ??
        canvas.getContext('experimental-webgl'),
    );
  } catch {
    cachedWebgl = false;
  }
  return cachedWebgl;
}

function isLowPower(): boolean {
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const saveData = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection?.saveData;
  return cores <= 3 || (memory !== undefined && memory <= 2) || saveData === true;
}

/**
 * Whether the real scene is allowed to mount. When this is false the section
 * still ships its full composition; it just uses the still plate instead of
 * the canvas, which is a designed state and not a disabled one.
 */
export function useCanRender3D(): boolean {
  const reduce = useReducedMotion();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (reduce) {
      setOk(false);
      return;
    }
    setOk(hasWebgl() && !isLowPower());
  }, [reduce]);

  return ok;
}

/** Fine-pointer devices only: hover and cursor-tracking are wasted on touch. */
export function useHasFinePointer(): boolean {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return fine;
}
