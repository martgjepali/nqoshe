import {
  Armchair,
  BookOpen,
  Buildings,
  Coffee,
  Confetti,
  CurrencyEur,
  Key,
  Laptop,
  Lightbulb,
  MapPinSimpleArea,
  MoonStars,
  Mountains,
  PaintBrush,
  Plug,
  SpeakerSimpleLow,
  Sun,
  Tree,
  WarningCircle,
  WifiHigh,
  type Icon,
} from '@phosphor-icons/react';
import type { FacetId } from './spots';
import type { Category, NoteKind } from './types';

/**
 * One icon family, one stroke weight, one size rhythm. Every glyph below is a
 * drawn icon from Phosphor, never a unicode character standing in for one.
 */
export const ICON_WEIGHT = 'regular' as const;

export const facetIcon: Record<FacetId, Icon> = {
  quiet: SpeakerSimpleLow,
  laptop: Laptop,
  outlets: Plug,
  wifi: WifiHigh,
  outdoor: Tree,
  cheap: CurrencyEur,
  late: MoonStars,
  notes: Lightbulb,
};

export const categoryIcon: Record<Category, Icon> = {
  work_cafe: Laptop,
  book_cafe: BookOpen,
  specialty: Coffee,
  chill: Armchair,
  creative_hub: PaintBrush,
  coworking: Buildings,
  public_space: MapPinSimpleArea,
  evening: Confetti,
};

export const noteIcon: Record<NoteKind, Icon> = {
  wifi: Key,
  view: Mountains,
  corner: Armchair,
  tip: Lightbulb,
  heads_up: WarningCircle,
};

export const noteLabel: Record<NoteKind, { sq: string; en: string }> = {
  wifi: { sq: 'Wifi', en: 'Wifi' },
  view: { sq: 'Pamja', en: 'The view' },
  corner: { sq: 'Qoshja', en: 'The corner' },
  tip: { sq: 'Këshillë', en: 'Tip' },
  heads_up: { sq: 'Kujdes', en: 'Heads up' },
};

export { Sun, MoonStars };
