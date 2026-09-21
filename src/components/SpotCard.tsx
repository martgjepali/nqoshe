import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import type { Spot } from '../lib/types';
import { categoryCopy, imageFor, known, toneFor } from '../lib/spots';
import { ReadingStrip, UnknownNote, readingsFor, unknownFields } from './Readings';
import { ease } from '../lib/motion';

type Ratio = 'tall' | 'portrait' | 'wide';

const ratioClass: Record<Ratio, string> = {
  tall: 'aspect-[3/4]',
  portrait: 'aspect-[4/5]',
  wide: 'aspect-[16/10]',
};

interface SpotCardProps {
  spot: Spot;
  ratio?: Ratio;
  /** Stagger index within its group. */
  index?: number;
  className?: string;
}

export function SpotCard({ spot, ratio = 'portrait', index = 0, className }: SpotCardProps) {
  const reduce = useReducedMotion();
  const img = imageFor(spot.id);
  const readings = readingsFor(spot);
  const unknowns = unknownFields(spot);
  const cat = categoryCopy[spot.category];

  return (
    <motion.article
      className={className}
      initial={reduce ? false : { opacity: 0, y: 34, filter: 'blur(12px)' }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, delay: index * 0.08, ease: ease.out }}
    >
      <Link
        to={`/qoshe/${spot.id}`}
        className="group block h-full no-underline outline-offset-4"
        aria-label={`${spot.name}, ${spot.neighborhood || 'Tiranë'}`}
      >
        <div
          className={`relative overflow-hidden ${ratioClass[ratio]} transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:-translate-y-1`}
          style={{ background: toneFor(spot.id) }}
        >
          {img ? (
            <img
              src={img}
              alt={`${spot.name} interior`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.045] motion-safe:group-hover:brightness-[1.06] motion-safe:group-hover:saturate-[1.08]"
            />
          ) : (
            <div className="h-full w-full" />
          )}

          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(26,18,12,0.86) 0%, rgba(26,18,12,0.22) 34%, rgba(26,18,12,0) 62%)',
            }}
          />

          {/* Vibe tags live on the plate and only surface on intent. */}
          <ul className="absolute inset-x-4 bottom-4 m-0 flex list-none flex-wrap gap-1.5 p-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:translate-y-2 motion-safe:transition-[opacity,transform] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            {spot.vibe_tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="reading rounded-full px-2.5 py-1"
                style={{
                  background: 'rgba(250,243,231,0.14)',
                  color: '#FAF3E7',
                  backdropFilter: 'blur(6px)',
                }}
              >
                {tag.replace(/-/g, ' ')}
              </li>
            ))}
          </ul>

          {known(spot.work_score) && (
            <div
              className="absolute top-4 right-4 flex items-baseline gap-1 rounded-full px-3 py-1.5"
              style={{ background: 'rgba(26,18,12,0.62)', backdropFilter: 'blur(8px)' }}
            >
              <span className="reading" style={{ color: 'rgba(250,243,231,0.72)' }}>
                Punë
              </span>
              <span
                className="display text-[0.95rem] leading-none"
                style={{ color: '#D89A4A' }}
              >
                {spot.work_score}
              </span>
            </div>
          )}
        </div>

        <div className="pt-4">
          <div className="flex items-baseline justify-between gap-4">
            <h4
              className="display text-[clamp(1.1rem,1.6vw,1.375rem)] leading-[1.18]"
              style={{ color: 'var(--ink)' }}
            >
              {spot.name}
            </h4>
            <span
              aria-hidden
              className="shrink-0 translate-x-0 text-[0.9rem] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:translate-x-1"
              style={{ color: 'var(--accent)' }}
            >
              &rarr;
            </span>
          </div>
          <p className="reading mt-1.5" style={{ color: 'var(--ink-3)' }}>
            {[spot.neighborhood || 'Tiranë', cat?.sq].filter(Boolean).join(' / ')}
          </p>

          <div className="mt-3.5 pt-3.5" style={{ borderTop: '1px solid var(--rule)' }}>
            <ReadingStrip items={readings} max={4} />
            <UnknownNote fields={unknowns} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
