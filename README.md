# Nëqoshe

**Ku të punosh nga Tirana.** Where to work from in Tirana: the cafés, book
cafés, specialty bars and quiet rooms worth opening a laptop in, with the things
you only find out by sitting there.

A frontend demo. No backend, no auth, no database. Everything reads from
`src/data/tirana-spots.json` and `src/data/notes.ts`.

## Run it

```bash
npm install
npm run dev
```

```bash
npm run build     # static output in dist/, deploys as-is to Vercel or Netlify
npm run preview
```

Routes: `/` for the finder, `/qoshe/:id` for one corner (`/qoshe/streha`,
`/qoshe/505`, any id in the dataset).

For a SPA host, rewrite all paths to `/index.html` so the detail routes survive
a hard refresh. `public/_redirects` and `vercel.json` already do this.

## How to use it

Set the hour, either on the dial or by dragging the table itself. The light in
the scene moves with it, and the list narrows to what is actually open. Press
the icon filters to combine conditions — quiet, laptop, outlets, measured wifi,
outdoor, under €2, open late, has local notes — and each one shows how many
places it would leave you with before you press it. Press a clump of grounds in
the cup, or a name beside it, to narrow to one part of town.

## Adding what you know

**`src/data/notes.ts` is yours.** The scraped JSON stays untouched; this is the
other half. Add a wifi password, the corner with the view, the table to aim for,
anything:

```ts
'streha': [
  { kind: 'wifi', sq: 'Fjalëkalimi: <...>', en: 'Wifi password: <...>' },
  { kind: 'view', sq: 'Pamja nga tarraca.', en: 'The view from the terrace.' },
],
```

Five kinds — `wifi`, `view`, `corner`, `tip`, `heads_up` — each with its own
icon. The file's header lists every spot id. Nothing else needs to change: the
cards pick up the icons and the detail page renders the notes.

Where a note is missing the app says so rather than hiding it. A laptop-friendly
place with no recorded wifi password shows a dashed row saying exactly that.

## The music

One 24/7 YouTube live stream, loaded only when you press play, so nothing is
requested from YouTube before then. The stream id lives in
`src/sections/Radio.tsx`; adding a second station is one entry in the same
array, and the comment above it says where to get an id.

## What is real and what is not

**Real:** the 29 places, their names, streets, neighbourhoods, hours, prices,
noise levels, wifi readings, work scores, caveats and source URLs. Compiled from
public web sources, none visited in person, every entry marked unverified.
Several records date from 2018-2019 and say so.

**Not real:** the photographs. All generated for this demo; none show the actual
rooms. `public/img/PROVENANCE.md` has every prompt. 14 of the 29 places have no
plate at all and render as a designed panel instead.

**Not real:** nothing else pretends to be. There are no testimonials, no user
counts, no "trusted by".

## Before this goes anywhere public

1. Shoot the real rooms and replace everything in `public/img`.
2. Fill in `src/data/notes.ts` — that is the part nobody else has.
3. Visit the places, complete the empty fields, flip `verified`.
4. Add coordinates. The cup is deliberately abstract because the dataset has
   none, and it says so on the page.
5. Re-check the 2018-2019 entries. Some may not exist any more.

## Notes for anyone editing

`AGENTS.md` has the rules that matter, chiefly: **`null` means unknown, never
"no"**, and Albanian leads the copy while English supports it.
