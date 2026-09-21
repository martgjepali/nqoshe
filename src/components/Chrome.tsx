import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Wordmark } from './Wordmark';
import { ease } from '../lib/motion';
import { useActAtTop } from '../lib/act';

/** Paper grain over everything, fixed so it never repaints on scroll. */
export function Grain() {
  return <div className="grain" aria-hidden />;
}

/**
 * The bar stays out of the hero and only materialises once the wordmark has
 * scrolled away, so the first viewport belongs to the word alone.
 */
export function TopBar() {
  const [shown, setShown] = useState(false);
  const act = useActAtTop();

  useEffect(() => {
    const sentinel = document.getElementById('hero-end');
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting), {
      rootMargin: '0px',
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.header
          className={`act-${act} fixed inset-x-0 top-0 z-50 h-16 md:h-[4.5rem]`}
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.55, ease: ease.settle }}
          style={{ transition: 'color 450ms ease, background-color 450ms ease' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'color-mix(in oklab, var(--ground) 82%, transparent)',
              backdropFilter: 'blur(14px)',
              borderBottom: '1px solid var(--rule)',
            }}
          />
          <nav className="shell relative flex h-full items-center justify-between gap-6">
            <Link
              to="/"
              className="text-[1.25rem] no-underline"
              style={{ color: 'var(--ink)' }}
              aria-label="Nëqoshe, home"
            >
              <Wordmark animate={false} />
            </Link>
            <a
              href="#qoshet"
              className="rounded-full px-5 py-2 text-[0.8125rem] font-medium whitespace-nowrap no-underline transition-transform duration-150 active:scale-[0.97]"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              Gjej këndin tënd
            </a>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

/**
 * First paint is a designed state, not a blank screen: the ground is already
 * the right cream, and the mark sets itself while the display face and the
 * hero plate load. Gated on real readiness plus a short floor so it never
 * flashes past.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const floor = new Promise((r) => setTimeout(r, reduce ? 200 : 900));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const hero = new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = '/img/hero-corner.webp';
    });
    let cancelled = false;
    Promise.all([floor, fonts, hero]).then(() => {
      if (!cancelled) setDone(true);
    });
    const failsafe = setTimeout(() => setDone(true), 4000);
    return () => {
      cancelled = true;
      clearTimeout(failsafe);
    };
  }, [reduce]);

  useEffect(() => {
    document.documentElement.style.overflow = done ? '' : 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-start"
          style={{ background: '#FAF3E7' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1, ease: ease.settle }}
        >
          <div className="shell pb-[12vh]">
            <span
              className="block text-[clamp(2.4rem,9vw,5rem)]"
              style={{ color: '#241812' }}
            >
              <Wordmark delay={0.05} />
            </span>
            <motion.div
              className="mt-6 h-px origin-left"
              style={{ background: '#C1512F', width: 'min(18rem, 50vw)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: ease.out }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
