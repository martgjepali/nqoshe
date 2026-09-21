export type Category =
  | 'work_cafe'
  | 'book_cafe'
  | 'specialty'
  | 'chill'
  | 'creative_hub'
  | 'coworking'
  | 'public_space'
  | 'evening';

export type NoiseLevel = 'quiet' | 'moderate' | 'variable' | 'loud' | null;

/**
 * Mirrors tirana-spots.json exactly. Every optional field is `| null`, and
 * null means UNKNOWN, never "no". Nothing in the UI may render a null as a
 * negative: see `known()` in ./spots.
 */
export interface Spot {
  id: string;
  name: string;
  category: Category;
  neighborhood: string;
  address: string;
  lat: number | null;
  lng: number | null;
  google_maps_url: string;
  instagram: string | null;
  website: string | null;
  vibe_tags: string[];
  best_for: string[];
  laptop_friendly: boolean | null;
  noise_level: NoiseLevel;
  wifi_mbps: number | null;
  power_outlets: boolean | null;
  outdoor_seating: boolean | null;
  hours: string | null;
  coffee_price_eur: number | null;
  cash_only: boolean | null;
  work_score: number | null;
  branches: string[];
  highlights: string;
  caveats: string | null;
  sources: string[];
  oldest_source_year: number | null;
  verified: boolean;
  last_checked: string | null;
}

export interface Dataset {
  meta: {
    name: string;
    version: string;
    created: string;
    city: string;
    notes: string[];
    count: number;
  };
  spots: Spot[];
}
