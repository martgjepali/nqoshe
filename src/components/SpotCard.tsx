import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Clock } from '@phosphor-icons/react';
import type { Spot } from '../lib/types';
import { categoryCopy, imageFor, known, toneFor } from '../lib/spots';
import { categoryIcon, noteIcon, noteLabel } from '../lib/icons';
import { notesFor } from '../data/notes';
import { ReadingStrip, UnknownNote, readingsFor, unknownFields } from './Readings';
import { ease } from '../lib/motion';

interface SpotCardProps {
  spot: Spot;
  /** null when the record has no hours to judge by. */
  open?: boolean | null;
  index?: number;
}

export function SpotCard({ spot, open = null, index = 0 }: SpotCardProps) {
  const reduce = useReducedMotion();
  const img = imageFor(spot.id);
  const readings = readingsFor(spot);
  const unknowns = unknownFields(spot);
  const notes = notesFor(spot.id);
  const cat = categoryCopy[spot.category];
  const CatIcon = categoryIcon[spot.category];

  return (
    <motion.article
      layout={reduce ? false : 'position'}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.035, ease: ease.out }}
      className="h-full"
    >
      <Link
        to={`/qoshe/${spot.id}`}
        className="group flex h-full flex-col overflow-hidden no-underline transition-transform duration-300 ease-light motion-safe:hover:-translate-y-1"
        style={{ border: '1px solid var(--rule)', background: 'var(--ground-2)' }}
        aria-label={`${spot.name}, ${spot.neighborhood || 'Tiranë'}`}
      >
        <div
          className="relative aspect-16/10 overflow-hidden"
          style={{ background: toneFor(spot.id) }}
        >
          {img ? (
            <>
              <img
                src={img}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-900 ease-light motion-safe:group-hover:scale-[1.05]"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(26,18,12,0.7) 0%, rgba(26,18,12,0) 52%)',
                }}
              />
            </>
          ) : (
            /* No photograph for this one yet. Say so, rather than leaving a
               hole: the icon carries the category and the label is honest. */
            <div
              className="flex h-full w-full flex-col items-center justify-center gap-2"
              style={{ background: 'var(--ground)' }}
            >
              <CatIcon
                size={28}
                aria-hidden
                style={{ color: 'var(--moss)', opacity: 0.6 }}
                className="transition-transform duration-500 ease-light motion-safe:group-hover:-translate-y-0.5"
              />
              {spot.vibe_tags.length > 0 && (
                <p
                  className="max-w-[80%] text-center text-small leading-snug"
                  style={{ color: 'var(--ink-2)' }}
                >
                  {spot.vibe_tags.slice(0, 3).map((t) => t.replace(/-/g, ' ')).join(' · ')}
                </p>
              )}
              <span className="reading text-micro" style={{ color: 'var(--ink-3)' }}>
                Pa foto ende
              </span>
            </div>
          )}

          {open === true && (
            <span
              className="reading absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-micro"
              style={{
                background: 'var(--plate)',
                color: 'var(--on-plate-open)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <Clock size={12} weight="fill" /> Hapur
            </span>
          )}

          {known(spot.work_score) && (
            <span
              className="absolute top-3 right-3 inline-flex items-baseline gap-1 rounded-full px-2.5 py-1"
              style={{ background: 'var(--plate)', backdropFilter: 'blur(6px)' }}
            >
              <span className="reading text-micro" style={{ color: 'var(--on-plate)' }}>
                Punë
              </span>
              <span className="display text-ui leading-none" style={{ color: 'var(--on-plate-score)' }}>
                {spot.work_score}
              </span>
            </span>
          )}

          {notes.length > 0 && (
            <ul className="absolute right-3 bottom-3 m-0 flex list-none gap-1.5 p-0">
              {notes.map((n) => {
                const Glyph = noteIcon[n.kind];
                return (
                  <li
                    key={n.kind + n.sq}
                    title={`${noteLabel[n.kind].sq}: ${n.sq}`}
                    className="flex h-7 w-7 items-center justify-center rounded-full"
                    style={{
                      background: 'var(--plate)',
                      color: 'var(--on-plate-note)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <Glyph size={14} />
                    <span className="sr-only">{noteLabel[n.kind].en}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="display text-lead leading-[1.2]" style={{ color: 'var(--ink)' }}>
              {spot.name}
            </h3>
            <ArrowUpRight
              size={17}
              aria-hidden
              className="mt-1 shrink-0 transition-transform duration-300 ease-light motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
              style={{ color: 'var(--accent)' }}
            />
          </div>

          <p
            className="mt-1.5 flex items-center gap-1.5 text-small"
            style={{ color: 'var(--ink-3)' }}
          >
            <CatIcon size={15} aria-hidden style={{ color: 'var(--moss)' }} />
            {[spot.neighborhood || 'Tiranë', cat?.sq].filter(Boolean).join(' · ')}
          </p>

          <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
            <ReadingStrip items={readings} max={4} />
            <UnknownNote fields={unknowns} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
