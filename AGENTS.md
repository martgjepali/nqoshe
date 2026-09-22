# Nëqoshe

A frontend-only demo for Nëqoshe ("in the corner"): where to work from in
Tirana. No backend, no auth, no database. Everything on screen comes from
`src/data/tirana-spots.json` plus `src/data/notes.ts`.

> Scaffolded by create-next-app and then replaced. This is **React + Vite**, not
> Next.js. No `app/` directory, no server components, no route handlers.

## Stack

React 19 · Vite · TypeScript · Tailwind v4 (`@tailwindcss/vite`) · Motion
(`motion/react`) · React Three Fiber + drei · Lenis · React Router · Phosphor
icons. Fonts self-hosted through `@fontsource-variable`.

```
npm run dev       # vite
npm run build     # tsc -b && vite build  ->  dist/
npm run preview
npm run shoot     # review screenshots into .impeccable/review (needs dev server + Chrome)
```

## What this is

A tool, not a scroll-through story. Hero says what it is in one viewport, then
the finder, then the radio, then the close. Four sections, nothing longer than
it needs to be.

- `src/sections/Hero.tsx` — the purpose, three counts, two buttons.
- `src/sections/Finder.tsx` — the whole product. Hour dial, icon facets,
  neighbourhood picker, live-filtered list.
- `src/sections/Radio.tsx` — a 24/7 YouTube stream, loaded only on press.
- `src/sections/Close.tsx` — the café-culture note, the provenance, the footer.
- `src/pages/SpotDetail.tsx` — one corner, fully read out.

## Rules that are not negotiable

**`null` means unknown, never "no".** From the dataset's own meta notes, and the
product's central honesty claim. Ask `known(value)` from `src/lib/spots.ts`
rather than testing truthiness, and render an unknown as "nuk dihet" or
"s'e dimë ende", never as a zero, a dash, a crossed-out icon, or by silent
omission. Every facet in `facets` is a POSITIVE test for the same reason: a
filter must never imply the rest are a no.

**Nothing is verified.** Every entry is `verified: false`, several carry
2018-2019 sourcing. No copy may imply field verification.

**All photography is synthetic.** See `public/img/PROVENANCE.md`. The footer
says so; that disclosure stays until real photographs replace the plates. Spots
with no plate get a designed panel (category icon plus vibe tags), never an
empty rectangle.

**Albanian leads, English supports.** Albanian carries headlines, controls and
CTAs; English carries glosses. The gloss is the `.gloss` class (italic display
in the accent colour), never a tracked uppercase label.

**Antigua Specialty Coffee is excluded on purpose.** Closed September 2025.

## Adding what you know

`src/data/notes.ts` is the file to edit. The scraped JSON stays untouched; your
notes (wifi password, the view, which corner, a tip, a heads-up) live there, one
entry per spot id. The file's own header explains the shape. Five kinds, each
with its own icon in `src/lib/icons.tsx`.

Where a note is missing the app says so out loud rather than hiding the gap:
`SpotDetail` shows a dashed "no wifi password recorded yet" row for any
laptop-friendly spot without one. That gap is the feature.

## How it is put together

**The hour is a control, not a scroll position.** `src/lib/hour.tsx` holds it,
defaulting to the visitor's own clock. It drives three things at once: the sun
in the 3D table, whether the finder is in its light or dark act, and which
places count as open. Set it by dragging the dial or by dragging the scene.

**Acts.** `.act-dawn`, `.act-night`, `.act-dusk` in `src/index.css`. An act
declares both its tokens **and** `color: var(--ink)`, because a custom property
substitutes where it is declared: `body { color: var(--ink) }` resolves against
`:root` once and children inherit that literal value. Any new act-like wrapper
that omits this gets the wrong inherited ink. Add `.act-fade` when the act can
change while the visitor is watching: custom properties do not transition, but
the properties consuming them do.

**Fixed chrome** sits outside every act, so the top bar asks `useActAtTop()`
which act is under the viewport top. Sections carry `data-act` for it to read.

**Accent.** One warm fire, two readings: terracotta as pigment on a light
ground, brass as emitted light on a dark one. Text on an accent fill always uses
`var(--on-accent)`, which flips per act; hardcoding a colour there fails
contrast in one act or the other. `--moss` is the counter-pigment and marks a
QUALITY (a vibe, a use, a note), never a reading.

**The 3D scene** (`src/three/`) is lazy-loaded and skipped entirely when
`useCanRender3D()` says no (reduced motion, no WebGL, low-power device). The
fallback is a designed still. It takes a plain `hour` number and eases toward it
inside `useFrame`, so dragging costs no React renders.

**`WordReveal`** observes the heading, never the word. Each word starts
translated out of an `overflow-hidden` wrapper, and IntersectionObserver clips a
target's rect by its ancestors' overflow, so observing the word caps its ratio
below any useful threshold and the line never appears at all. This shipped
invisible once already.

## Type

Source Serif 4 over Source Sans 3: low stroke contrast, large x-height, both
drawn for reading. Deliberately **not** a high-contrast display serif, and
deliberately no `-webkit-font-smoothing: antialiased` — thinning the strokes is
what made the previous pairing read as soft-focus. Text never enters on a blur
for the same reason. The grain overlay stays at 0.1.

## Conventions

- Animate `transform`, `opacity`, `clip-path`. Custom cubic-beziers only
  (`src/lib/motion.ts`, mirrored as `ease-light` in Tailwind).
- Icons come from Phosphor, one family, never a unicode glyph standing in.
- `min-h-[100dvh]`, never `h-screen`.
- Grain is a single fixed, `pointer-events-none` overlay.
- No `window.addEventListener('scroll')`. Use `useScroll`, `useTransform`, or
  IntersectionObserver.
- Everything above trivial motion is wrapped in `useReducedMotion()` and
  degrades to a full static composition, not a disabled one.
