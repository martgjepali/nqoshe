import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowsOutSimple, CaretDown, Clock, MapPin, X } from '@phosphor-icons/react';
import { SpotCard } from '../components/SpotCard';
import { FacetChips } from '../components/FacetChips';
import { HourDial } from '../components/HourDial';
import { NeighbourhoodCup } from '../components/NeighbourhoodCup';
import { clusters, facets, search, type FacetId } from '../lib/spots';
import { isDark, useHour } from '../lib/hour';
import { useCanRender3D } from '../lib/capability';
import { ease } from '../lib/motion';

const TableScene = lazy(() => import('../three/TableScene'));

export function Finder() {
  const reduce = useReducedMotion();
  const can3D = useCanRender3D();
  const { hour, setHour } = useHour();

  const [active, setActive] = useState<FacetId[]>([]);
  const [hood, setHood] = useState<string | null>(null);
  const [useClock, setUseClock] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const q = useMemo(
    () => ({ facets: active, neighbourhood: hood, hour: useClock ? hour : null }),
    [active, hood, useClock, hour],
  );
  const results = useMemo(() => search(q), [q]);

  // A fresh query starts from the top of the list again.
  useEffect(() => setShowAll(false), [active, hood, useClock]);

  const PAGE = 12;
  const visible = showAll ? results : results.slice(0, PAGE);
  const hidden = results.length - visible.length;

  /** What each facet would leave you with, given everything else already set. */
  const counts = useMemo(() => {
    const out = {} as Record<FacetId, number>;
    for (const f of facets) {
      const next = active.includes(f.id)
        ? active
        : ([...active, f.id] as FacetId[]);
      out[f.id] = search({ ...q, facets: next }).length;
    }
    return out;
  }, [active, q]);

  const toggle = (id: FacetId) =>
    setActive((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  // Drag anywhere on the scene to move the hour: the picture IS the control.
  const dragScene = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const r = e.currentTarget.getBoundingClientRect();
    const f = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    setUseClock(true);
    setHour(Math.round((6 + f * 18) * 4) / 4);
  };

  const dark = isDark(hour);

  return (
    <section
      id="gjej"
      data-act={dark ? 'night' : 'dawn'}
      className={`act-fade ${dark ? 'act-night' : 'act-dawn'} relative`}
      style={{ background: 'var(--ground)' }}
    >
      <div className="shell py-16 md:py-20">
        {/* ── the controls ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="display-lg" style={{ color: 'var(--ink)' }}>
              Sa është ora?
            </h2>
            <p className="gloss mt-1.5 text-body">
              Set the hour. The light moves, and so does the list.
            </p>

            <div className="mt-7">
              <HourDial />
            </div>

            <div
              className="mt-8 pt-7"
              style={{ borderTop: '1px solid var(--rule)' }}
            >
              <FacetChips
                active={active}
                onToggle={toggle}
                onClear={() => setActive([])}
                counts={counts}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setUseClock((v) => !v)}
                aria-pressed={useClock}
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-ui font-medium transition-[transform,background-color,color] duration-200 ease-light active:scale-[0.96]"
                style={{
                  background: useClock ? 'var(--accent)' : 'transparent',
                  color: useClock ? 'var(--on-accent)' : 'var(--ink-2)',
                  border: `1px solid ${useClock ? 'var(--accent)' : 'var(--rule)'}`,
                }}
              >
                <Clock size={17} weight={useClock ? 'fill' : 'regular'} />
                Hapur tani
              </button>
              {hood && (
                <button
                  type="button"
                  onClick={() => setHood(null)}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-ui font-medium"
                  style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                >
                  <MapPin size={16} weight="fill" /> {hood} <X size={13} weight="bold" />
                </button>
              )}
            </div>
          </div>

          {/* ── the table, which is also the dial ─────────────────────── */}
          <div className="lg:col-span-5">
            <div
              className="relative aspect-square w-full cursor-ew-resize touch-pan-y overflow-hidden select-none"
              style={{ border: '1px solid var(--rule)' }}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                dragScene(e);
              }}
              onPointerMove={dragScene}
            >
              {can3D ? (
                <Suspense fallback={<SceneStill />}>
                  <TableScene hour={hour} />
                </Suspense>
              ) : (
                <SceneStill />
              )}
              <span
                className="reading pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-micro"
                style={{ color: 'var(--ink-3)' }}
              >
                <ArrowsOutSimple size={12} /> Tërhiqe
              </span>
            </div>
          </div>
        </div>

        {/* ── the neighbourhoods, as grounds in the cup ───────────────── */}
        <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <NeighbourhoodCup selected={hood} onSelect={setHood} />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <h3
              className="display-md"
              style={{ color: 'var(--ink)' }}
            >
              Nuk është hartë. Është fundi i filxhanit.
            </h3>
            <p className="gloss mt-1.5 text-body">
              Not a map. The grounds in the bottom of the cup.
            </p>
            <p className="mt-4 text-ui leading-[1.6]" style={{ color: 'var(--ink-2)' }}>
              No coordinates in the dataset, so the positions are drawn rather than surveyed. One
              grain per corner. Press a part of town to narrow the list.
            </p>

            <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
              {clusters.map((c) => {
                const on = hood === c.name;
                return (
                  <li key={c.name}>
                    <button
                      type="button"
                      onClick={() => setHood(on ? null : c.name)}
                      aria-pressed={on}
                      className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-ui font-medium transition-[transform,background-color,color] duration-200 ease-light active:scale-[0.96]"
                      style={{
                        background: on ? 'var(--accent)' : 'transparent',
                        color: on ? 'var(--on-accent)' : 'var(--ink-2)',
                        border: `1px solid ${on ? 'var(--accent)' : 'var(--rule)'}`,
                      }}
                    >
                      <MapPin size={15} weight={on ? 'fill' : 'regular'} />
                      {c.name}
                      <span
                        className="reading text-micro tabular-nums"
                        style={{ color: on ? 'var(--on-accent)' : 'var(--ink-3)' }}
                      >
                        {c.spots.length}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ── the list ────────────────────────────────────────────────── */}
        <div
          className="mt-12 flex flex-wrap items-baseline justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          <h3 className="display-lg" style={{ color: 'var(--ink)' }}>
            {results.length} {results.length === 1 ? 'qoshe' : 'qoshe'}
          </h3>
          <p className="text-ui" style={{ color: 'var(--ink-3)' }}>
            {useClock ? 'hapur tani, ose pa orar të njohur' : 'nga të gjitha'}
          </p>
        </div>

        {results.length === 0 ? (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 py-16 text-center"
          >
            <p className="display-md" style={{ color: 'var(--ink)' }}>
              Asgjë s&rsquo;përputhet.
            </p>
            <p className="mt-2 text-ui" style={{ color: 'var(--ink-3)' }}>
              Nothing matches all of that at once. Try dropping a filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setActive([]);
                setHood(null);
              }}
              className="mt-6 inline-flex items-center rounded-full px-5 py-2.5 text-ui font-medium transition-transform duration-150 active:scale-[0.97]"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              Pastro filtrat
            </button>
          </motion.div>
        ) : (
          <motion.ul
            layout={!reduce}
            className="mt-8 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3"
            transition={{ duration: 0.4, ease: ease.out }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((m, i) => (
                <motion.li key={m.spot.id} layout={!reduce} className="m-0">
                  <SpotCard spot={m.spot} open={m.open} index={i} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}

        {hidden > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-ui font-medium transition-transform duration-150 ease-light active:scale-[0.97]"
              style={{ border: '1px solid var(--rule)', color: 'var(--ink)' }}
            >
              Shih edhe {hidden} <CaretDown size={15} weight="bold" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** For reduced motion, no WebGL, or a low-power device. */
function SceneStill() {
  return (
    <div className="absolute inset-0" style={{ background: '#1A120C' }}>
      <img
        src="/img/scene-still.webp"
        alt="A cup, a book and a small plant on a round table under one warm lamp."
        className="h-full w-full object-cover"
        style={{ objectPosition: '52% 42%' }}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
