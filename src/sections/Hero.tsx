import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Link } from 'react-router-dom';
import { Wordmark } from '../components/Wordmark';
import { DustLight } from '../components/DustLight';
import { ease, spring } from '../lib/motion';
import { useHasFinePointer } from '../lib/capability';

export function Hero() {
  const reduce = useReducedMotion();
  const fine = useHasFinePointer();
  const section = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end start'],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const typeY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const typeFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Cursor light over the wordmark. Motion values only: no state, no re-render.
  const rawX = useMotionValue(-400);
  const rawY = useMotionValue(-400);
  const mx = useSpring(rawX, spring.cursor);
  const my = useSpring(rawY, spring.cursor);
  const lightMask = useMotionTemplate`radial-gradient(circle 240px at ${mx}px ${my}px, #000 0%, rgba(0,0,0,0.55) 42%, transparent 72%)`;

  // Plate leans very slightly away from the cursor. Depth, not a tilt toy.
  const plateX = useSpring(useTransform(mx, [0, 1400], [8, -8]), spring.cursor);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!fine || reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={section}
      data-act="dawn"
      className="act-dawn ground relative isolate min-h-[100dvh] overflow-hidden"
    >
      {/* Morning light falling in from the upper left. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(120% 90% at 8% -10%, rgba(255,214,150,0.55) 0%, rgba(250,243,231,0) 55%), radial-gradient(90% 70% at 88% 6%, rgba(193,81,47,0.10) 0%, rgba(250,243,231,0) 60%)',
        }}
      />

      <div className="shell grid min-h-[100dvh] grid-cols-1 items-end gap-y-10 pt-24 pb-0 lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:pb-0">
        {/* --- the word ----------------------------------------------- */}
        <motion.div
          className="relative z-10 lg:col-span-7 lg:pr-6"
          style={reduce ? undefined : { y: typeY, opacity: typeFade }}
          onPointerMove={onMove}
        >
          <h1 className="relative m-0">
            <span
              className="block leading-[0.9]"
              style={{
                fontSize: 'clamp(3.6rem, 15.5vw, 11rem)',
                color: 'var(--ink)',
              }}
            >
              <Wordmark delay={0.15} />
            </span>

            {/* The same letters in brass, revealed only where the cursor is. */}
            {fine && !reduce && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 block leading-[0.9]"
                style={{
                  fontSize: 'clamp(3.6rem, 15.5vw, 11rem)',
                  color: 'var(--accent)',
                  WebkitMaskImage: lightMask,
                  maskImage: lightMask,
                }}
              >
                <Wordmark animate={false} />
              </motion.span>
            )}
          </h1>

          <motion.div
            className="mt-7 max-w-[34rem] lg:mt-10"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.85, ease: ease.out }}
          >
            <p
              className="display text-[clamp(1.4rem,3vw,2.15rem)] leading-[1.16] text-balance"
              style={{ color: 'var(--ink)' }}
            >
              Lexojmë qoshet e Tiranës.
            </p>
            <p className="gloss mt-3 text-[1.0625rem]">
              We read Tirana&rsquo;s corners the way an old hand reads a cup.
            </p>
          </motion.div>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-3 lg:mt-11"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: ease.out }}
          >
            <a
              href="#qoshet"
              className="group relative inline-flex items-center overflow-hidden rounded-full px-7 py-[0.9rem] text-[0.9375rem] font-medium whitespace-nowrap transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.975]"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                style={{ background: '#8F3A1F' }}
              />
              <span className="relative">Gjej këndin tënd</span>
            </a>
            <Link
              to="/qoshe/streha"
              className="inline-flex items-center rounded-full px-6 py-[0.9rem] text-[0.9375rem] font-medium whitespace-nowrap no-underline transition-colors duration-200 active:scale-[0.975]"
              style={{ border: '1px solid var(--rule)', color: 'var(--ink)' }}
            >
              Shih një qoshe
            </Link>
          </motion.div>
        </motion.div>

        {/* --- the corner --------------------------------------------- */}
        <motion.div
          className="relative -mx-[var(--gutter)] -mb-px h-[48vh] min-h-[280px] self-end lg:col-span-5 lg:mr-[calc(-1*var(--gutter))] lg:-ml-0 lg:h-[88vh] lg:self-center"
          style={reduce ? undefined : { y: plateY, x: fine ? plateX : 0 }}
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.1, ease: ease.out }}
        >
          <div
            className="lift-lg relative h-full w-full overflow-hidden"
            style={{ background: '#6a4a2c' }}
          >
            <img
              src="/img/hero-corner.webp"
              width={1400}
              height={1875}
              alt="A cup of coffee steaming on a worn oak table beside a café window, in low morning sun."
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            <DustLight className="absolute inset-0 h-full w-full" />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(200deg, rgba(255,205,135,0.22) 0%, rgba(26,18,12,0) 42%, rgba(26,18,12,0.28) 100%)',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
