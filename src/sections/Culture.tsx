import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Reveal } from '../components/Reveal';

export function Culture() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start end', 'end start'],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      ref={section}
      id="zakoni"
      data-act="night"
      className="act-night relative overflow-hidden"
      style={{ background: 'var(--ground-2)' }}
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-12">
        {/* the long sit, from above */}
        <div className="relative h-[52vh] overflow-hidden lg:col-span-7 lg:h-auto lg:min-h-[44rem]">
          <motion.img
            src="/img/culture-table.webp"
            alt="Seen from above: a drained cup with grounds in the bottom, a glass of water, a phone face down and a folded bill on a sunlit wooden table."
            className="absolute inset-0 h-[116%] w-full object-cover"
            style={reduce ? { height: '100%' } : { y: plateY }}
            loading="lazy"
            decoding="async"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(26,18,12,0.28) 0%, rgba(26,18,12,0) 42%, rgba(36,24,18,0.92) 100%)',
            }}
          />
        </div>

        {/* the aside */}
        <div className="relative lg:col-span-6 lg:col-start-6 lg:self-center">
          <div
            className="relative px-[var(--gutter)] py-16 md:py-20 lg:px-14 lg:py-16"
            style={{
              background: 'color-mix(in oklab, var(--ground) 94%, transparent)',
              backdropFilter: 'blur(3px)',
              borderTop: '1px solid var(--rule)',
              borderBottom: '1px solid var(--rule)',
            }}
          >
            <Reveal>
              <h2
                className="display text-[clamp(1.8rem,4.4vw,3rem)] leading-[1.06]"
                style={{ color: 'var(--ink)' }}
              >
                Rregulli i vetëm: porosit diçka çdo dy orë.
              </h2>
              <p className="gloss mt-3 text-[1.0625rem]">
                The only rule: order something every couple of hours.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="body-lg mt-8">
                Nobody here will move you along. A coffee is one or two euro and it buys the table
                for as long as you want it. The understanding is simply that you order again once
                the cup has been empty a while.
              </p>
              <p className="body-lg mt-5">
                Three hours alone with a book is not eccentric in Tirana. It is what an afternoon is
                for. Round up when you pay, take the outside table in October, and do not be
                surprised when the espresso arrives with a glass of water nobody mentioned.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
