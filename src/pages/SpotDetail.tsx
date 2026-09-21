import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Warning } from '@phosphor-icons/react';
import {
  bestForCopy,
  byId,
  categoryCopy,
  imageFor,
  known,
  nearby,
  noiseCopy,
  toneFor,
} from '../lib/spots';
import { SpotCard } from '../components/SpotCard';
import type { Spot } from '../lib/types';
import { Reveal } from '../components/Reveal';
import { Wordmark } from '../components/Wordmark';
import { ease } from '../lib/motion';

interface Row {
  label: string;
  en: string;
  value: string | null;
}

const comfort = (s: Spot): Row[] => [
  {
    label: 'Zhurma',
    en: 'Noise',
    value: known(s.noise_level) ? noiseCopy[s.noise_level].sq : null,
  },
  {
    label: 'Laptop',
    en: 'Laptops',
    value:
      s.laptop_friendly === true
        ? 'I mirëpritur'
        : s.laptop_friendly === false
          ? 'Jo vend pune'
          : null,
  },
  { label: 'Priza', en: 'Outlets', value: s.power_outlets === true ? 'Ka' : null },
  { label: 'Wifi', en: 'Wifi', value: known(s.wifi_mbps) ? `${s.wifi_mbps} Mbps` : null },
];

const practical = (s: Spot): Row[] => [
  { label: 'Orari', en: 'Hours', value: s.hours },
  {
    label: 'Kafe',
    en: 'Coffee',
    value: known(s.coffee_price_eur) ? `€${s.coffee_price_eur}` : null,
  },
  { label: 'Pagesa', en: 'Payment', value: s.cash_only === true ? 'Vetëm cash' : null },
  { label: 'Jashtë', en: 'Outside', value: s.outdoor_seating === true ? 'Ka tavolina' : null },
];

function RowList({ rows }: { rows: Row[] }) {
  return (
    <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-7 p-0">
      {rows.map((r) => (
        <div key={r.label}>
          <dt className="reading" style={{ color: 'var(--ink-3)' }}>
            {r.label}
          </dt>
          <dd
            className="display m-0 mt-1.5 text-[1.15rem] leading-[1.2]"
            style={{ color: r.value ? 'var(--ink)' : 'var(--ink-3)' }}
          >
            {/* An unknown is stated, never implied and never shown as a no. */}
            {r.value ?? <span className="text-[0.95rem] italic">nuk dihet</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function SpotDetail() {
  const { id = '' } = useParams();
  const spot = byId(id);
  const reduce = useReducedMotion();

  if (!spot) {
    return (
      <main className="act-dawn ground flex min-h-[100dvh] items-center">
        <div className="shell">
          <h1 className="display text-[clamp(2rem,6vw,3.5rem)]">Ky qoshe nuk ekziston.</h1>
          <p className="body-lg mt-5">
            No corner is filed under &ldquo;{id}&rdquo;. It may have closed, or the link may be
            older than the list.
          </p>
          <Link
            to="/"
            className="mt-9 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.9375rem] font-medium no-underline"
            style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
          >
            <ArrowLeft size={16} weight="bold" /> Kthehu
          </Link>
        </div>
      </main>
    );
  }

  const img = imageFor(spot.id) ?? '/img/detail-streha.webp';
  const cat = categoryCopy[spot.category];
  const near = nearby(spot);

  return (
    <main className="act-dawn ground min-h-[100dvh]">
      {/* --- the room ------------------------------------------------- */}
      <div className="relative h-[58vh] min-h-[22rem] overflow-hidden md:h-[68vh]">
        <motion.img
          src={img}
          alt={`${spot.name} interior`}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ background: toneFor(spot.id) }}
          initial={reduce ? false : { scale: 1.07 }}
          animate={reduce ? undefined : { scale: 1 }}
          transition={{ duration: 2, ease: ease.out }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(20,13,8,0.94) 0%, rgba(20,13,8,0.62) 28%, rgba(20,13,8,0.12) 58%, rgba(20,13,8,0.52) 100%)',
          }}
        />

        <div className="shell relative flex h-full flex-col justify-between py-7 md:py-9">
          <div className="flex items-center justify-between gap-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.8125rem] font-medium no-underline transition-colors duration-200"
              style={{
                background: 'rgba(26,18,12,0.5)',
                color: '#FAF3E7',
                border: '1px solid rgba(250,243,231,0.2)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <ArrowLeft size={14} weight="bold" /> Të gjitha qoshet
            </Link>
            <span className="text-[1.05rem]" style={{ color: 'rgba(250,243,231,0.85)' }}>
              <Wordmark animate={false} />
            </span>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26, filter: 'blur(10px)' }}
            animate={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.15, ease: ease.out }}
          >
            <p
              className="reading"
              style={{ color: '#EDB874', textShadow: '0 1px 14px rgba(20,13,8,0.85)' }}
            >
              {[spot.neighborhood || 'Tiranë', cat?.en].filter(Boolean).join(' / ')}
            </p>
            <h1
              className="display mt-3 max-w-[16ch] text-[clamp(2.2rem,7vw,4.6rem)] leading-[0.98]"
              style={{ color: '#FAF3E7', textShadow: '0 2px 30px rgba(20,13,8,0.6)' }}
            >
              {spot.name}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* --- the reading ---------------------------------------------- */}
      <div className="shell grid grid-cols-1 gap-x-12 gap-y-16 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="body-lg !max-w-none text-[clamp(1.15rem,1.6vw,1.45rem)] !leading-[1.5]" style={{ color: 'var(--ink)' }}>
              {spot.highlights}
            </p>
          </Reveal>

          {spot.caveats && (
            <Reveal delay={0.08}>
              <aside
                className="mt-8 flex gap-4 px-6 py-5"
                style={{
                  background: 'color-mix(in oklab, var(--accent) 9%, transparent)',
                  borderLeft: '1px solid var(--accent)',
                }}
              >
                <Warning
                  size={20}
                  weight="light"
                  style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}
                />
                <p className="text-[0.9375rem] leading-[1.6]" style={{ color: 'var(--ink-2)' }}>
                  {spot.caveats}
                </p>
              </aside>
            </Reveal>
          )}

          {spot.best_for.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-11">
                <h2 className="display text-[1.35rem]" style={{ color: 'var(--ink)' }}>
                  Mirë për
                </h2>
                <p className="gloss mt-1.5 text-[0.95rem]">Good for</p>
                <ul className="mt-5 m-0 grid list-none grid-cols-1 gap-x-8 p-0 sm:grid-cols-2">
                  {spot.best_for.map((b) => (
                    <li
                      key={b}
                      className="display py-2.5 text-[1.05rem]"
                      style={{ color: 'var(--ink-2)', borderBottom: '1px solid var(--rule)' }}
                    >
                      {bestForCopy[b] ?? b.replace(/_/g, ' ')}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {spot.vibe_tags.length > 0 && (
            <Reveal delay={0.12}>
              <ul className="mt-10 m-0 flex list-none flex-wrap gap-2 p-0">
                {spot.vibe_tags.map((t) => (
                  <li
                    key={t}
                    className="reading rounded-full px-3.5 py-2"
                    style={{ border: '1px solid var(--rule)', color: 'var(--ink-2)' }}
                  >
                    {t.replace(/-/g, ' ')}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {spot.branches.length > 0 && (
            <Reveal delay={0.14}>
              <div className="mt-12">
                <h2 className="display text-[1.35rem]" style={{ color: 'var(--ink)' }}>
                  Degët
                </h2>
                <ul className="mt-4 m-0 list-none p-0">
                  {spot.branches.map((b) => (
                    <li
                      key={b}
                      className="py-2.5 text-[0.95rem]"
                      style={{ color: 'var(--ink-2)', borderBottom: '1px solid var(--rule)' }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>

        {/* --- the panel ------------------------------------------------ */}
        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div
              className="p-7 md:p-9"
              style={{ background: 'var(--ground-2)', border: '1px solid var(--rule)' }}
            >
              <h2 className="display text-[1.35rem] leading-tight" style={{ color: 'var(--ink)' }}>
                Sa mirë punohet këtu
              </h2>
              <p className="gloss mt-1.5 text-[1rem]">How workable it is</p>

              {known(spot.work_score) && (
                <div
                  className="mt-7 flex items-baseline gap-3 pb-7"
                  style={{ borderBottom: '1px solid var(--rule)' }}
                >
                  <span
                    className="display text-[3.4rem] leading-none"
                    style={{ color: 'var(--accent)' }}
                  >
                    {spot.work_score}
                  </span>
                  <span className="text-[0.875rem] leading-[1.4]" style={{ color: 'var(--ink-2)' }}>
                    nga 10, sipas burimeve
                    <br />
                    <span style={{ color: 'var(--ink-3)' }}>work score, from the sources</span>
                  </span>
                </div>
              )}

              <div className="mt-7">
                <RowList rows={comfort(spot)} />
              </div>
              <div className="mt-8 pt-8" style={{ borderTop: '1px solid var(--rule)' }}>
                <RowList rows={practical(spot)} />
              </div>

              <a
                href={spot.google_maps_url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.9375rem] font-medium no-underline transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"
                style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
              >
                Hape në hartë <ArrowUpRight size={16} weight="bold" />
              </a>
              {spot.address && (
                <p className="mt-3.5 text-center text-[0.8125rem]" style={{ color: 'var(--ink-3)' }}>
                  {spot.address}
                </p>
              )}
            </div>

            {/* --- provenance ------------------------------------------- */}
            <div className="mt-8">
              <h2 className="reading" style={{ color: 'var(--ink-3)' }}>
                Nga vijnë këto
              </h2>
              <p className="mt-3 text-[0.875rem] leading-[1.6]" style={{ color: 'var(--ink-2)' }}>
                Compiled from public sources
                {known(spot.oldest_source_year) ? `, the oldest from ${spot.oldest_source_year}` : ''}
                . Not visited or confirmed in person.
              </p>
              <ul className="mt-4 m-0 list-none p-0">
                {spot.sources.map((src) => {
                  let host = src;
                  try {
                    host = new URL(src).hostname.replace(/^www\./, '');
                  } catch {
                    /* leave as written */
                  }
                  return (
                    <li key={src} className="py-1.5">
                      <a
                        href={src}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[0.875rem]"
                        style={{ color: 'var(--ink-2)' }}
                      >
                        {host}
                      </a>
                    </li>
                  );
                })}
              </ul>
              {(spot.instagram || spot.website) && (
                <ul className="mt-4 m-0 flex list-none flex-wrap gap-4 p-0">
                  {spot.website && (
                    <li>
                      <a
                        href={spot.website}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[0.875rem] font-medium"
                        style={{ color: 'var(--accent)' }}
                      >
                        Faqja zyrtare
                      </a>
                    </li>
                  )}
                  {spot.instagram && (
                    <li>
                      <a
                        href={spot.instagram}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[0.875rem] font-medium"
                        style={{ color: 'var(--accent)' }}
                      >
                        Instagram
                      </a>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {near.length > 0 && (
        <section
          className="act-night ground"
          aria-labelledby="nearby"
          style={{ borderTop: '1px solid rgba(36,24,18,0.12)' }}
        >
          <div className="shell py-20 md:py-24">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2
                  id="nearby"
                  className="display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.08]"
                  style={{ color: 'var(--ink)' }}
                >
                  Të tjera në {spot.neighborhood || 'Tiranë'}
                </h2>
                <p className="gloss mt-2 text-[1.05rem]">Other corners in the same part of town</p>
              </div>
              <Link
                to="/#qoshet"
                className="inline-flex items-center gap-2 text-[0.9375rem] font-medium no-underline"
                style={{ color: 'var(--ink-2)' }}
              >
                <ArrowLeft size={15} weight="bold" /> Të gjitha qoshet
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
              {near.map((s, i) => (
                <SpotCard key={s.id} spot={s} ratio="wide" index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
