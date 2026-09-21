import { useEffect, useState } from 'react';

export type Act = 'dawn' | 'night' | 'dusk';

/**
 * Which act currently sits under the top edge of the viewport.
 * The fixed chrome is outside every act, so it cannot inherit the ground
 * colour from a section: it asks which act it is standing on instead.
 */
export function useActAtTop(fallback: Act = 'dawn'): Act {
  const [act, setAct] = useState<Act>(fallback);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-act]'));
    if (!nodes.length) return;

    // A 1px band pinned just below the chrome. Whatever intersects it wins.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const next = e.target.getAttribute('data-act') as Act | null;
            if (next) setAct(next);
          }
        }
      },
      { rootMargin: '-72px 0px -100% 0px', threshold: 0 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return act;
}
