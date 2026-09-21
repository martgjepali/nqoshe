# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + Vite + TypeScript, Tailwind CSS v4, Motion (`motion/react`), React Three Fiber + drei (Three.js), Lenis for smooth scroll. User-specified. Deploys as a static build (Vercel / Netlify friendly). Explicitly NOT Next.js: the existing create-next-app scaffold in this repo is being replaced, not extended. No backend, no auth, no database in this phase.

## Users

Two audiences held at equal weight, confirmed by the user: people who live in Tirana and know the city, and visitors / remote workers who have just arrived. Both are looking for the same thing at the moment of use: where to sit for the next two to four hours. The situation is almost always mobile, often standing on a street, deciding now.

A third reader exists for this artifact specifically: the user is showing this demo to a client, an investor, and themselves, to see what the product could feel like.

## Product Purpose

Nëqoshe ("in the corner") helps someone find a cozy, work-friendly place in Tirana: cafés, book cafés, specialty coffee bars, creative hubs, coworkings, chill spots, and evening places. Success for this phase is a frontend demo that produces an actual reaction on a phone, not a feature-complete app.

## Positioning

The dataset carries work-usability facts that general review sites do not publish: noise level, measured wifi, whether power outlets exist, whether laptops are welcome, a work score, and per-branch tips (which Mon Chéri is the quiet one). It also carries honesty about its own sourcing: every entry records its sources, the oldest source year, and `verified: false`.

## Operating Context

The demo is a single scroll-driven landing page plus one example spot detail route. Data comes from `tirana-spots.json` imported statically. Nothing submits anywhere; the email capture is visual only.

Tirana café norms are product context, not decoration: sitting for hours is normal and expected, with the convention that you buy something every couple of hours.

## Capabilities and Constraints

- 29 spots across 8 categories: `work_cafe`, `book_cafe`, `specialty`, `chill`, `creative_hub`, `coworking`, `public_space`, `evening`.
- `null` means unknown, never "no". The UI must never render a null as a false negative. This is a hard data rule from the dataset's own meta notes.
- `lat` / `lng` are null for every spot. No real map is possible; the map moment must be stylized and must not imply geographic precision it does not have.
- Nothing is field-verified. `verified: false` on every entry, and several entries carry 2018-2019 sourcing with explicit "verify" caveats.
- Antigua Specialty Coffee is deliberately excluded: it closed in September 2025. Do not re-add it.
- Well-populated entries suitable for the showcase: Streha, Café Momus, 505 Café, Tony's, Destil Creative Hub, Tirana Times, Friend's Book House, Clique 22, Rubi, Hana Corner Café, Mimoza n'Qoshe, Nöje, Izzy Living, Innospace.
- Thin entries to keep out of hero positions: D'Angelo, Social Hub, Dutch Hub, Trinity, City Art, Libraria Bar, n'Dritero, Mulliri i Vjetër.

## Brand Commitments

- Name: **Nëqoshe**. Albanian, "in the corner". The diaeresis on the ë is part of the mark and is never dropped.
- Copy: Albanian leads and carries the emotional lines; English supports and carries functional labels. Confirmed by the user.
- CTA line, user-specified: "Gjej këndin tënd" / "Find your corner".
- Mood, user-specified and binding: golden-hour light through a café window, steam off a cup, worn wood and warm brass, the stillness of a good corner table. Explicitly not flat warm-beige SaaS, explicitly not a boho template.
- Palette, user-specified as a base to refine: espresso `#241812`, warm cream `#FAF3E7`, terracotta `#C1512F`, burnt honey / brass `#D89A4A`, olive `#5C6B42`, midnight roast `#1A120C`.
- The scroll travels dawn to dusk: cream-led opening, midnight-roast middle, warm close. Confirmed by the user.
- Reference bar named by the user: Linear, Stripe's storytelling scroll pages, Arc, Awwwards site-of-the-day. Polish and craft over feature count.

## Evidence on Hand

- `tirana-spots.json`: 29 real, publicly-sourced Tirana spots with per-entry source URLs. Real place names, real streets, real neighborhoods. This is the only real content and it must be used as-is.
- No photography exists. The user approved generating imagery with the paid Higgsfield image tool for this build; every generated asset is synthetic and must be labeled as such in the handoff, with a list of what to replace with real photography.
- No real users, testimonials, metrics, press, partners, or pricing exist. None may be invented. No "trusted by", no user counts, no review quotes.

## Product Principles

1. Never turn unknown into no. A missing wifi figure is silence, not a zero.
2. Say where a claim came from. The dataset's sourcing and its age are a feature of the product's honesty, not an embarrassment to hide.
3. The unit of the product is a corner, not a listing. One table, one time of day, one reason to sit there.
4. Albanian first for feeling, English for function. A visitor must never be locked out, and a local must never feel translated at.
5. Both audiences at the same level. No section may be written as if only tourists or only locals are reading it.

## Accessibility & Inclusion

`prefers-reduced-motion` must receive a genuinely good static experience, not a disabled one: this is a user requirement, not a checkbox. The 3D scene must degrade gracefully on low-power devices. Albanian diacritics (ë, ç) must render correctly in every face used.
