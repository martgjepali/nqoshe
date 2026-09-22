import {
  Clock,
  CurrencyEur,
  Laptop,
  Money,
  Plug,
  SpeakerSimpleLow,
  Tree,
  WifiHigh,
  type Icon,
} from '@phosphor-icons/react';
import type { Spot } from '../lib/types';
import { known, noiseCopy } from '../lib/spots';

export interface Reading {
  icon: Icon;
  /** For the tooltip and for screen readers. */
  label: string;
  value: string;
}

/**
 * Only known values become readings. A null never becomes a zero, a dash or a
 * crossed-out icon: it goes to `unknownFields` and is named out loud instead.
 */
export function readingsFor(spot: Spot): Reading[] {
  const out: Reading[] = [];
  if (known(spot.noise_level))
    out.push({ icon: SpeakerSimpleLow, label: 'Zhurma', value: noiseCopy[spot.noise_level].sq });
  if (known(spot.wifi_mbps))
    out.push({ icon: WifiHigh, label: 'Wifi', value: `${spot.wifi_mbps} Mbps` });
  if (spot.power_outlets === true) out.push({ icon: Plug, label: 'Priza', value: 'Priza' });
  if (spot.laptop_friendly === true)
    out.push({ icon: Laptop, label: 'Laptop', value: 'Laptop OK' });
  if (spot.laptop_friendly === false)
    out.push({ icon: Laptop, label: 'Laptop', value: 'Jo vend pune' });
  if (known(spot.hours)) out.push({ icon: Clock, label: 'Orari', value: spot.hours });
  if (known(spot.coffee_price_eur))
    out.push({ icon: CurrencyEur, label: 'Kafe', value: `€${spot.coffee_price_eur}` });
  if (spot.cash_only === true) out.push({ icon: Money, label: 'Pagesa', value: 'Vetëm cash' });
  if (spot.outdoor_seating === true) out.push({ icon: Tree, label: 'Jashtë', value: 'Jashtë' });
  return out;
}

const FIELD_NAMES: Array<[keyof Spot, string]> = [
  ['noise_level', 'zhurma'],
  ['wifi_mbps', 'wifi'],
  ['power_outlets', 'prizat'],
  ['hours', 'orari'],
  ['coffee_price_eur', 'çmimi'],
];

/** The fields this spot has no reading for yet, named in Albanian. */
export function unknownFields(spot: Spot): string[] {
  return FIELD_NAMES.filter(([key]) => !known(spot[key])).map(([, name]) => name);
}

/** Readings set as small icon-and-value pairs. No separators: they wrap. */
export function ReadingStrip({ items, max }: { items: Reading[]; max?: number }) {
  const shown = max ? items.slice(0, max) : items;
  if (!shown.length) return null;

  return (
    <ul className="m-0 flex list-none flex-wrap items-center gap-x-4 gap-y-2 p-0">
      {shown.map((r) => (
        <li key={r.label} className="flex items-center gap-1.5" title={`${r.label}: ${r.value}`}>
          <r.icon size={16} aria-hidden style={{ color: 'var(--ink-3)', flexShrink: 0 }} />
          <span className="sr-only">{r.label}: </span>
          <span className="text-small font-medium" style={{ color: 'var(--ink-2)' }}>
            {r.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Said plainly, because saying nothing is how a null turns into a no. */
export function UnknownNote({ fields }: { fields: string[] }) {
  if (!fields.length) return null;
  const list = fields.length > 3 ? `${fields.slice(0, 3).join(', ')} e të tjera` : fields.join(', ');
  return (
    <p className="mt-2.5 text-small leading-[1.45] italic" style={{ color: 'var(--ink-3)' }}>
      S&rsquo;e dimë ende: {list}.
    </p>
  );
}
