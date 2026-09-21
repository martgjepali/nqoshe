# Nëqoshe

**Lexojmë qoshet e Tiranës.** A frontend demo for a way of finding cozy,
work-friendly corners in Tirana: cafés, book cafés, specialty bars, creative
hubs, coworkings and the places that are better after the laptops close.

This is a demo, not a product. There is no backend, no auth and no database.
Everything on screen reads from `src/data/tirana-spots.json`.

## Run it

```bash
npm install
npm run dev
```

```bash
npm run build     # static output in dist/, deploys as-is to Vercel or Netlify
npm run preview
```

Routes: `/` for the landing page, `/qoshe/:id` for a single corner
(`/qoshe/streha`, `/qoshe/505`, and so on for any id in the dataset).

For a SPA host, rewrite all paths to `/index.html` so the detail routes work on
a hard refresh. On Netlify that is one line in `_redirects`
(`/*  /index.html  200`); on Vercel a `rewrites` entry in `vercel.json`.

## What it is built on

React 19 · Vite · TypeScript · Tailwind v4 · Motion · React Three Fiber and drei
· Lenis · React Router. Fonts are self-hosted: Piazzolla Variable for display
and Archivo Variable for everything else.

## What is real and what is not

**Real:** the 29 places, their names, streets, neighbourhoods, opening hours,
prices, noise levels, wifi readings, work scores, caveats and source URLs. All
of it compiled from public web sources, none of it visited and confirmed in
person, every entry marked unverified. Several records date from 2018-2019 and
say so.

**Not real:** every photograph. All of it was generated for this demo and none
of it shows the actual interior of any of these places. See
`public/img/PROVENANCE.md` for every prompt and what to replace. The page says
this out loud in the footer, and that disclosure should stay until real
photographs exist.

**Not real:** the email capture. It validates and gives feedback, and then tells
you it is a demo and nothing was sent.

## Before it goes anywhere public

1. Shoot the real rooms and replace everything in `public/img`.
2. Visit the places, fill in the empty fields, and flip `verified`.
3. Add coordinates. The map moment is deliberately abstract because the dataset
   has none, and it says so on the page.
4. Re-check the 2018-2019 entries. Some of those places may not exist any more.

## Notes for anyone editing this

`AGENTS.md` has the rules that matter, chiefly: **`null` means unknown, never
"no"**, and Albanian leads the copy while English supports it.
