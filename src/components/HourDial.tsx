import { useCallback, useRef } from 'react';
import { ArrowCounterClockwise } from '@phosphor-icons/react';
import { HOUR_MAX, HOUR_MIN, formatHour, useHour } from '../lib/hour';

const TICKS = [6, 9, 12, 15, 18, 21, 24];
const span = HOUR_MAX - HOUR_MIN;
const pct = (h: number) => ((h - HOUR_MIN) / span) * 100;

/**
 * The hour is the page's main control. Drag it, arrow-key it, or leave it
 * where it landed, which is your own clock. Everything downstream reads it:
 * the light on the table, the ground of this section, and which places count
 * as open.
 */
export function HourDial() {
  const { hour, setHour, touched, initial } = useHour();
  const track = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const f = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      // quarter-hour steps: fine enough to feel continuous, coarse enough to land
      setHour(Math.round((HOUR_MIN + f * span) * 4) / 4);
    },
    [setHour],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromClientX(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 1 : 0.25;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setHour(hour - step);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setHour(hour + step);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setHour(HOUR_MIN);
    } else if (e.key === 'End') {
      e.preventDefault();
      setHour(HOUR_MAX);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span
            className="display-dial"
            style={{ color: 'var(--accent)' }}
          >
            {formatHour(hour)}
          </span>
          <span className="reading" style={{ color: 'var(--ink-3)' }}>
            {touched ? 'Ora që zgjodhe' : 'Tani'}
          </span>
        </div>

        {touched && (
          <button
            type="button"
            onClick={() => setHour(initial)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-small font-medium transition-transform duration-150 active:scale-[0.97]"
            style={{ border: '1px solid var(--rule)', color: 'var(--ink-2)' }}
          >
            <ArrowCounterClockwise size={14} /> Tani
          </button>
        )}
      </div>

      <div
        ref={track}
        role="slider"
        tabIndex={0}
        aria-label="Ora e ditës"
        aria-valuemin={HOUR_MIN}
        aria-valuemax={HOUR_MAX}
        aria-valuenow={Math.round(hour * 100) / 100}
        aria-valuetext={formatHour(hour)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={onKeyDown}
        className="relative mt-6 h-11 cursor-ew-resize touch-none select-none"
      >
        <div
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
          style={{ background: 'var(--rule)' }}
        />
        <div
          className="absolute top-1/2 left-0 h-px -translate-y-1/2"
          style={{ width: `${pct(hour)}%`, background: 'var(--accent)' }}
        />

        {TICKS.map((t) => (
          <span key={t} className="pointer-events-none absolute top-1/2" style={{ left: `${pct(t)}%` }}>
            <span
              className="absolute -top-1 block h-2 w-px"
              style={{ background: 'var(--rule)' }}
            />
            <span
              className="reading absolute top-3 -translate-x-1/2 text-micro"
              style={{ color: 'var(--ink-3)' }}
            >
              {t === 24 ? '24' : String(t).padStart(2, '0')}
            </span>
          </span>
        ))}

        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: `${pct(hour)}%`,
            background: 'var(--accent)',
            boxShadow: '0 0 0 5px color-mix(in oklab, var(--accent) 18%, transparent)',
          }}
        />
      </div>
    </div>
  );
}
