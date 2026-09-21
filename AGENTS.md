# Nëqoshe

A frontend-only demo for Nëqoshe ("in the corner"), a way of finding cozy,
work-friendly places in Tirana. No backend, no auth, no database: everything on
screen comes from `src/data/tirana-spots.json`, imported statically.

> This repo was scaffolded by create-next-app and then replaced. It is **React +
> Vite**, not Next.js. There is no `app/` directory, no server components, no
> route handlers. If you find guidance here describing Next.js conventions, it is
> stale.

## Stack

React 19 · Vite · TypeScript · Tailwind v4 (`@tailwindcss/vite`) · Motion
(`motion/react`) · React Three Fiber + drei · Lenis · React Router · Phosphor
icons. Fonts are self-hosted through `@fontsource-variable`.

```
npm run dev       # vite, default port 5173
npm run build     # tsc -b && vite build  ->  dist/
npm run preview
npm run shoot     # review screenshots into .impeccable/review (needs dev server + Chrome)
```

## Rules that are not negotiable

**`null` means unknown, never "no".** This comes from the dataset's own meta
notes and it is the product's central honesty claim. Ask `known(value)` from
`src/lib/spots.ts` rather than testing truthiness, and render an unknown as
"nuk dihet" / "s'e dimë ende", never as a zero, a dash, or a crossed-out icon.

**Nothing here is verified.** Every entry is `verified: false` and several carry
2018-2019 sourcing. Any copy that implies field verification is wrong.

**All photography is synthetic.** See `public/img/PROVENANCE.md`. The footer says
so on the page; that disclosure stays until real photographs replace the plates.

**Albanian leads, English supports.** Albanian carries headlines, section
openers and CTAs; English carries labels and glosses. The gloss is set with the
`.gloss` class (italic display in the accent colour), never as a tracked
uppercase label.

**Antigua Specialty Coffee is excluded on purpose.** It closed in September 2025.

## How the page is put together

One clock owns the landing page. `src/lib/clock.tsx` publishes document scroll
progress, and that single value drives the visible light meter, the ground
colour through the scene act, and the sun position inside the 3D table.

The page runs in three acts, each committing to its own ground rather than
tinting a shared one: `.act-dawn`, `.act-night`, `.act-dusk` in `src/index.css`.
An act declares both its tokens **and** `color: var(--ink)`, because a custom
property substitutes where it is declared: `body { color: var(--ink) }` resolves
against `:root` once and children inherit that literal value. Any new act-like
wrapper has to do the same or its text will inherit the wrong ink.

`src/sections/Ora.tsx` is the transition. It animates the act tokens as motion
values on a `motion.section`, which is why it sets `--ground` explicitly: the
scene's edge fade and anything else reading the ground needs it too.

Fixed chrome (the top bar) sits outside every act, so it asks
`useActAtTop()` which act is under the viewport top and applies that class.

The 3D scene (`src/three/`) is lazy-loaded, unmounts nothing but is skipped
entirely when `useCanRender3D()` says no (reduced motion, no WebGL, low-power
device). The fallback is a designed still, not an empty box.

Accent colour is one warm fire read two ways: terracotta as pigment on a light
ground, brass as emitted light on a dark one. Text on an accent fill always uses
`var(--on-accent)`, which flips with the act; hardcoding a colour there will
fail contrast in one act or the other.

## Conventions

- Animate `transform`, `opacity`, `filter`, `clip-path`. Custom cubic-beziers
  only (`src/lib/motion.ts`); the built-in easings are too weak here.
- `min-h-[100dvh]`, never `h-screen`.
- Grain is a single fixed, `pointer-events-none` overlay. Never put it on a
  scrolling container.
- No `window.addEventListener('scroll')`. Use `useScroll`, `useTransform`, or
  IntersectionObserver.
- Everything above `MOTION_INTENSITY` trivial is wrapped in `useReducedMotion()`
  and degrades to a full static composition, not a disabled one.
