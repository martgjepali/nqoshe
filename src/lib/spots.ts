import raw from '../data/tirana-spots.json';
import type { Dataset, NoiseLevel, Spot } from './types';
import { notesFor } from '../data/notes';

const data = raw as unknown as Dataset;

export const dataset = data;
export const spots: Spot[] = data.spots;

export const byId = (id: string): Spot | undefined => spots.find((s) => s.id === id);

/**
 * The dataset's own rule, in one place: null is unknown, not false.
 * Every component asks this question instead of testing truthiness, so a
 * missing outlet reading can never render as "no outlets".
 */
export function known<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/** Photography is synthetic and generated for this demo. See public/img/PROVENANCE.md. */
const imagery: Record<string, string> = {
  streha: '/img/spot-streha.webp',
  '505': '/img/spot-505.webp',
  momus: '/img/spot-momus.webp',
  'tirana-times': '/img/spot-tirana-times.webp',
  'friends-book-house': '/img/spot-friends.webp',
  clique22: '/img/spot-clique22.webp',
  rubi: '/img/spot-rubi.webp',
  hana: '/img/spot-hana.webp',
  mimoza: '/img/spot-mimoza.webp',
  noje: '/img/spot-noje.webp',
  destil: '/img/spot-destil.webp',
  izzy: '/img/spot-izzy.webp',
  'city-art': '/img/spot-city-art.webp',
  'libraria-bar': '/img/spot-libraria-bar.webp',
};

/** Warm base tone behind each plate while it decodes, so nothing flashes white. */
const plateTone: Record<string, string> = {
  streha: '#c8b190',
  '505': '#b98a63',
  momus: '#4a4433',
  'tirana-times': '#6b5638',
  'friends-book-house': '#8a6a45',
  clique22: '#c09a67',
  rubi: '#4b3323',
  hana: '#a78d63',
  mimoza: '#3d2c20',
  noje: '#cbb896',
  destil: '#9a9478',
  izzy: '#2f2a2c',
  'city-art': '#2a2018',
  'libraria-bar': '#2b1d13',
};

export const imageFor = (id: string): string | undefined => imagery[id];
export const toneFor = (id: string): string => plateTone[id] ?? '#7b6349';

export interface MoodGroup {
  id: string;
  /** Albanian leads. */
  sq: string;
  /** English supports. */
  en: string;
  /** One line on what this group is actually for. */
  note: string;
  spotIds: string[];
}

/**
 * Hand-picked from the well-populated entries. Thin records (D'Angelo,
 * Social Hub, Trinity) stay out of the showcase on purpose.
 */
export const moodGroups: MoodGroup[] = [
  {
    id: 'thellë',
    sq: 'Punë e thellë',
    en: 'Deep work',
    note: 'Quiet rooms, outlets, and nobody counting how long you have been sitting.',
    spotIds: ['streha', '505', 'momus'],
  },
  {
    id: 'libra',
    sq: 'Libra e kafe',
    en: 'Books and coffee',
    note: 'Shelves you can read from while the coffee goes cold.',
    spotIds: ['tirana-times', 'friends-book-house', 'clique22'],
  },
  {
    id: 'specialty',
    sq: 'Kafe që e kuptojnë',
    en: 'Specialty',
    note: 'Pour-overs, single origins, and people who will tell you about the bean.',
    spotIds: ['rubi', 'hana', 'mimoza', 'noje'],
  },
  {
    id: 'ngadalë',
    sq: 'Ngadalë',
    en: 'Slow and creative',
    note: 'Plants, long tables, and afternoons that go somewhere unplanned.',
    spotIds: ['destil', 'izzy'],
  },
  {
    id: 'mbrëmje',
    sq: 'Kur bie nata',
    en: 'When night falls',
    note: 'The corners that are better after the laptops have closed.',
    spotIds: ['city-art', 'libraria-bar'],
  },
];

export const groupSpots = (g: MoodGroup): Spot[] =>
  g.spotIds.map(byId).filter((s): s is Spot => Boolean(s));

/** Neighborhood clusters for the stylized map. Counts are real. */
export interface Cluster {
  name: string;
  /** Position on the abstract plan, 0-1. Not geographic and never claimed to be. */
  x: number;
  y: number;
  spots: Spot[];
}

const clusterOf = (s: Spot): string => {
  const n = s.neighborhood.toLowerCase();
  if (n.includes('blloku')) return 'Blloku';
  if (n.includes('qendra')) return 'Qendra';
  if (n.includes('liqen') || n.includes('kosovar')) return 'Liqeni';
  if (n.includes('sami')) return 'Sami Frashëri';
  if (n.includes('panorama') || n.includes('elbasanit') || n.includes('kavajës'))
    return 'Rrugët e mëdha';
  if (n.includes('lana')) return 'Lana';
  if (n.includes('pyramid') || n.includes('foreign')) return 'Qendra';
  return 'Gjetkë';
};

const clusterPlan: Record<string, { x: number; y: number }> = {
  Qendra: { x: 0.48, y: 0.26 },
  'Sami Frashëri': { x: 0.16, y: 0.46 },
  Blloku: { x: 0.33, y: 0.68 },
  Liqeni: { x: 0.57, y: 0.86 },
  Lana: { x: 0.82, y: 0.66 },
  'Rrugët e mëdha': { x: 0.84, y: 0.3 },
  Gjetkë: { x: 0.62, y: 0.5 },
};

export const clusters: Cluster[] = Object.entries(
  spots.reduce<Record<string, Spot[]>>((acc, s) => {
    const key = clusterOf(s);
    (acc[key] ??= []).push(s);
    return acc;
  }, {}),
)
  .map(([name, list]) => ({
    name,
    x: clusterPlan[name]?.x ?? 0.5,
    y: clusterPlan[name]?.y ?? 0.5,
    spots: list,
  }))
  .sort((a, b) => b.spots.length - a.spots.length);

export const noiseCopy: Record<Exclude<NoiseLevel, null>, { sq: string; en: string }> = {
  quiet: { sq: 'Qetë', en: 'Quiet' },
  moderate: { sq: 'Mesatare', en: 'Moderate' },
  variable: { sq: 'Ndryshon', en: 'Varies by hour' },
  loud: { sq: 'Zhurmë', en: 'Loud' },
};

export const categoryCopy: Record<string, { sq: string; en: string }> = {
  work_cafe: { sq: 'Kafe punë', en: 'Work café' },
  book_cafe: { sq: 'Libraria me kafe', en: 'Book café' },
  specialty: { sq: 'Specialty', en: 'Specialty coffee' },
  chill: { sq: 'Ngadalë', en: 'Chill' },
  creative_hub: { sq: 'Hapësirë krijuese', en: 'Creative hub' },
  coworking: { sq: 'Coworking', en: 'Coworking' },
  public_space: { sq: 'Hapësirë publike', en: 'Public space' },
  evening: { sq: 'Mbrëmje', en: 'Evening' },
};

export const bestForCopy: Record<string, string> = {
  deep_work: 'Punë e thellë',
  solo: 'Vetëm',
  studying: 'Për të studiuar',
  reading: 'Për të lexuar',
  calls: 'Telefonata',
  late_night: 'Vonë natën',
  long_sessions: 'Seanca të gjata',
  lunch: 'Drekë',
  friends: 'Me shokë',
  events: 'Evente',
  evening: 'Mbrëmje',
  coffee_nerds: 'Për kafexhinjtë',
  quick_break: 'Pushim i shkurtër',
  brunch: 'Brunch',
  weekend_chill: 'Fundjavë e qetë',
  breakfast: 'Mëngjes',
  hidden_gem: 'Vend i fshehtë',
  people_watching: 'Për të parë botën',
  board_games: 'Lojëra tavoline',
  sweet_break: 'Diçka e ëmbël',
  culture: 'Kulturë',
  creative_work: 'Punë krijuese',
  meeting_people: 'Për të njohur njerëz',
  afternoon_work: 'Punë pasdite',
  after_work: 'Pas pune',
  budget_deep_work: 'Punë me buxhet',
  networking: 'Networking',
  break: 'Pushim',
  sunset: 'Perëndim',
  inspiration: 'Frymëzim',
  date: 'Takim',
};

/** Other corners filed under the same part of town. Real, not suggested. */
export const nearby = (spot: Spot, limit = 3): Spot[] => {
  const here = clusterOf(spot);
  return spots
    .filter((s) => s.id !== spot.id && clusterOf(s) === here && imageFor(s.id))
    .slice(0, limit);
};

/* ------------------------------------------------------------- open hours */

/** Pulls "07:00–23:00" out of whatever shape the hours string is in. */
export function openWindow(spot: Spot): { from: number; to: number } | null {
  if (!known(spot.hours)) return null;
  const found = spot.hours.match(/(\d{1,2}):(\d{2})/g);
  if (!found || found.length < 2) return null;
  const toHour = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h + m / 60;
  };
  const from = toHour(found[0]);
  let to = toHour(found[1]);
  if (to <= from) to += 24; // past midnight
  return { from, to };
}

/**
 * true open, false shut, null unknown. The third case is the important one:
 * most of these records have no hours, and an unknown is never a "shut".
 */
export function isOpenAt(spot: Spot, hour: number): boolean | null {
  const w = openWindow(spot);
  if (!w) return null;
  return hour >= w.from && hour < w.to;
}

/* ----------------------------------------------------------------- facets */

export type FacetId =
  | 'quiet'
  | 'laptop'
  | 'outlets'
  | 'wifi'
  | 'outdoor'
  | 'cheap'
  | 'late'
  | 'notes';

export interface Facet {
  id: FacetId;
  sq: string;
  en: string;
  match: (s: Spot) => boolean;
}

/**
 * Every facet is a positive test. Nothing filters on the ABSENCE of a value,
 * because absence here means unknown: asking for "has outlets" must never be
 * read as "the rest have none".
 */
export const facets: Facet[] = [
  { id: 'quiet', sq: 'Qetë', en: 'Quiet', match: (s) => s.noise_level === 'quiet' },
  { id: 'laptop', sq: 'Laptop', en: 'Laptop welcome', match: (s) => s.laptop_friendly === true },
  { id: 'outlets', sq: 'Priza', en: 'Power outlets', match: (s) => s.power_outlets === true },
  { id: 'wifi', sq: 'Wifi i matur', en: 'Measured wifi', match: (s) => known(s.wifi_mbps) },
  { id: 'outdoor', sq: 'Jashtë', en: 'Outdoor seats', match: (s) => s.outdoor_seating === true },
  {
    id: 'cheap',
    sq: 'Nën €2',
    en: 'Coffee under €2',
    match: (s) => known(s.coffee_price_eur) && s.coffee_price_eur <= 2,
  },
  {
    id: 'late',
    sq: 'Vonë',
    en: 'Open past 22:00',
    match: (s) => {
      const w = openWindow(s);
      return Boolean(w && w.to >= 22.5);
    },
  },
  { id: 'notes', sq: 'Me shënime', en: 'Has local notes', match: (s) => notesFor(s.id).length > 0 },
];

export interface Query {
  facets: FacetId[];
  neighbourhood: string | null;
  hour: number | null;
}

export interface Match {
  spot: Spot;
  /** null when the record has no hours to judge by. */
  open: boolean | null;
}

/** Runs the whole query. Unknown-open records are kept and labelled. */
export function search(q: Query): Match[] {
  const active = facets.filter((f) => q.facets.includes(f.id));
  return spots
    .filter((s) => active.every((f) => f.match(s)))
    .filter((s) => (q.neighbourhood ? clusterOf(s) === q.neighbourhood : true))
    .map((s) => ({ spot: s, open: q.hour === null ? null : isOpenAt(s, q.hour) }))
    .filter((m) => m.open !== false)
    .sort((a, b) => {
      // knowns first, then work score, then the ones you have notes for
      const score = (m: Match) =>
        (m.open === true ? 4 : 0) +
        (known(m.spot.work_score) ? m.spot.work_score / 4 : 0) +
        (notesFor(m.spot.id).length ? 1 : 0) +
        (imageFor(m.spot.id) ? 2 : 0);
      return score(b) - score(a);
    });
}

export const neighbourhoodOf = clusterOf;

/** Stats the page states about itself. All derived, none invented. */
export const stats = {
  total: spots.length,
  neighborhoods: new Set(spots.map(clusterOf)).size,
  withWorkScore: spots.filter((s) => known(s.work_score)).length,
  oldestSource: Math.min(
    ...spots.map((s) => s.oldest_source_year).filter((y): y is number => known(y)),
  ),
};
