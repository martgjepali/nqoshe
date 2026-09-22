import { X } from '@phosphor-icons/react';
import { facets, type FacetId } from '../lib/spots';
import { facetIcon } from '../lib/icons';

interface FacetChipsProps {
  active: FacetId[];
  onToggle: (id: FacetId) => void;
  onClear: () => void;
  /** How many places each facet would still leave, given everything else. */
  counts: Record<FacetId, number>;
}

/**
 * The filters, as things you press. Each carries its own icon so the row can
 * be read at a glance, and each shows how many places it would leave you with,
 * so a dead end is visible before you hit it.
 */
export function FacetChips({ active, onToggle, onClear, counts }: FacetChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {facets.map((f) => {
        const on = active.includes(f.id);
        const left = counts[f.id];
        const dead = !on && left === 0;
        const Glyph = facetIcon[f.id];

        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onToggle(f.id)}
            disabled={dead}
            aria-pressed={on}
            title={f.en}
            className="group inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-ui font-medium whitespace-nowrap transition-[transform,background-color,border-color,color] duration-200 ease-light active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-35"
            style={{
              background: on ? 'var(--accent)' : 'transparent',
              color: on ? 'var(--on-accent)' : 'var(--ink-2)',
              border: `1px solid ${on ? 'var(--accent)' : 'var(--rule)'}`,
            }}
          >
            <Glyph
              size={17}
              weight={on ? 'fill' : 'regular'}
              className="transition-transform duration-300 ease-light motion-safe:group-hover:-translate-y-px"
            />
            {f.sq}
            <span
              className="reading text-micro tabular-nums"
              style={{ color: on ? 'var(--on-accent)' : 'var(--ink-3)', opacity: on ? 0.75 : 1 }}
            >
              {left}
            </span>
          </button>
        );
      })}

      {active.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-small font-medium transition-transform duration-150 active:scale-[0.96]"
          style={{ color: 'var(--ink-3)' }}
        >
          <X size={14} weight="bold" /> Pastro
        </button>
      )}
    </div>
  );
}
