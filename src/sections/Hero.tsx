import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, Laptop, MapPin, NotePencil } from '@phosphor-icons/react';
import { Wordmark } from '../components/Wordmark';
import { ease } from '../lib/motion';
import { stats } from '../lib/spots';
import { spotNotes } from '../data/notes';

const noted = Object.keys(spotNotes).length;

/**
 * Short on purpose. Say what this is, show the three numbers that make it
 * worth using, and put the finder one press away.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const enter = (d: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: d, ease: ease.out },
        };

  return (
    <section data-act="dawn" className="act-dawn ground relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 10% -20%, rgba(255,214,150,0.45) 0%, rgba(250,243,231,0) 58%)',
        }}
      />

      <div className="shell relative grid grid-cols-1 items-center gap-10 pt-28 pb-16 md:pt-32 md:pb-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h1 className="m-0">
            <span
              className="mark-xl block"
              style={{ color: 'var(--ink)' }}
            >
              <Wordmark delay={0.1} />
            </span>
          </h1>

          <motion.p
            className="display-lg mt-5 max-w-[22ch]"
            style={{ color: 'var(--ink)' }}
            {...enter(0.5)}
          >
            Ku të punosh nga Tirana.
          </motion.p>
          <motion.p className="gloss mt-2 text-body" {...enter(0.58)}>
            Where to work from in Tirana.
          </motion.p>

          <motion.p className="body-lg mt-6 text-body" {...enter(0.66)}>
            A list of the cafés, book cafés and quiet rooms worth opening a laptop in, with the
            things you only find out by sitting there.
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap items-center gap-3" {...enter(0.74)}>
            <a
              href="#gjej"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-ui font-medium whitespace-nowrap no-underline transition-transform duration-150 ease-light active:scale-[0.97]"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              Gjej këndin tënd <ArrowDown size={16} weight="bold" />
            </a>
            <a
              href="#radio"
              className="inline-flex items-center rounded-full px-5 py-3 text-ui font-medium whitespace-nowrap no-underline transition-transform duration-150 active:scale-[0.97]"
              style={{ border: '1px solid var(--rule)', color: 'var(--ink)' }}
            >
              Vër muzikë
            </a>
          </motion.div>

          <motion.ul
            className="m-0 mt-10 flex list-none flex-wrap gap-x-8 gap-y-4 p-0 pt-8"
            style={{ borderTop: '1px solid var(--rule)' }}
            {...enter(0.82)}
          >
            {[
              { Icon: Laptop, n: stats.total, sq: 'qoshe', en: 'corners' },
              { Icon: MapPin, n: stats.neighborhoods, sq: 'lagje', en: 'parts of town' },
              { Icon: NotePencil, n: noted, sq: 'me shënime', en: 'with local notes' },
            ].map(({ Icon, n, sq, en }) => (
              <li key={sq} className="flex items-center gap-2.5">
                <Icon size={20} aria-hidden style={{ color: 'var(--moss)' }} />
                <span
                  className="display-md leading-none"
                  style={{ color: 'var(--ink)' }}
                >
                  {n}
                </span>
                <span className="text-ui leading-tight" style={{ color: 'var(--ink-3)' }}>
                  {sq}
                  <br />
                  <span className="text-micro">{en}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="lg:col-span-5"
          initial={reduce ? false : { opacity: 0, scale: 1.03 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: ease.out }}
        >
          <div
            className="lift-lg relative aspect-4/5 overflow-hidden"
            style={{ background: '#6a4a2c' }}
          >
            <img
              src="/img/hero-corner.webp"
              width={1400}
              height={1875}
              alt="A cup of coffee steaming on a worn table beside a café window in low morning sun."
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
