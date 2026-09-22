import type { Spot } from '../lib/types';
import { known, noiseCopy } from '../lib/spots';

export interface Reading {
  label: string;
  value: string;
}

/**
 * Only known values become readings. A null never becomes a zero, a dash, or
 * a crossed-out icon: it goes to `unknown()` instead and is named out loud.
 */
export function readingsFor(spot: Spot): Reading[] {
  const out: Reading[] = [];
  if (known(spot.noise_level)) out.push({ label: 'Zhurma', value: noiseCopy[spot.noise_level].sq });
  if (known(spot.wifi_mbps)) out.push({ label: 'Wifi', value: `${spot.wifi_mbps} Mbps` });
  if (spot.power_outlets === true) out.push({ label: 'Priza', value: 'Po' });
  if (spot.laptop_friendly === true) out.push({ label: 'Laptop', value: 'I mirëpritur' });
  if (spot.laptop_friendly === false) out.push({ label: 'Laptop', value: 'Jo vend pune' });
  if (known(spot.hours)) out.push({ label: 'Orari', value: spot.hours });
  if (known(spot.coffee_price_eur)) out.push({ label: 'Kafe', value: `€${spot.coffee_price_eur}` });
  if (spot.cash_only === true) out.push({ label: 'Pagesa', value: 'Vetëm cash' });
  if (spot.outdoor_seating === true) out.push({ label: 'Jashtë', value: 'Po' });
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

/** Readings set as measurements: a label in the small caps voice, a value. */
export function ReadingStrip({ items, max }: { items: Reading[]; max?: number }) {
  const shown = max ? items.slice(0, max) : items;
  if (!shown.length) return null;

  // No divider elements: a separator drawn before each item leaves a stray
  // rule at the start of a wrapped line. The label/value pairing and the gap
  // carry the separation instead.
  return (
    <dl className="m-0 flex flex-wrap items-baseline gap-x-5 gap-y-2 p-0">
      {shown.map((r) => (
        <div key={r.label} className="flex items-baseline gap-1.5">
          <dt className="reading" style={{ color: 'var(--ink-3)' }}>
            {r.label}
          </dt>
          <dd
            className="m-0 text-[0.8125rem] leading-none font-medium"
            style={{ color: 'var(--ink-2)' }}
          >
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Said plainly, because saying nothing is how a null turns into a no. */
export function UnknownNote({ fields }: { fields: string[] }) {
  if (!fields.length) return null;
  const list = fields.length > 3 ? `${fields.slice(0, 3).join(', ')} e të tjera` : fields.join(', ');
  return (
    <p className="mt-2.5 text-[0.75rem] leading-[1.45] italic" style={{ color: 'var(--ink-3)' }}>
      S&rsquo;e dimë ende: {list}.
    </p>
  );
}
