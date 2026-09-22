---
name: Nëqoshe
description: A day of Tirana light, read off the bottom of a cup — one clock, three grounds, two pigments.
colors:
  cream: "#faf3e7"
  cream-deep: "#f2e5cf"
  espresso: "#241812"
  espresso-soft: "#6b5341"
  espresso-faint: "#7b6349"
  terracotta: "#c1512f"
  terracotta-deep: "#8f3a1f"
  midnight: "#1a120c"
  candlelight: "#f4e7d3"
  candlelight-soft: "#a8927a"
  candlelight-faint: "#93795b"
  brass: "#d89a4a"
  ember-ground: "#45210f"
  ember-ground-2: "#55290f"
  ember-ink: "#fdf4e6"
  ember-ink-soft: "#e2bc93"
  ember-ink-faint: "#c09a6c"
  ember-accent: "#e9a24f"
  ember-on-accent: "#2a1206"
  moss: "#4e5c38"
  moss-night: "#9aad73"
  moss-dusk: "#a8b981"
typography:
  display-lg:
    fontFamily: "'Piazzolla Variable', ui-serif, Georgia, serif"
    fontSize: "clamp(2.75rem, 8.5vw, 6.5rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  display:
    fontFamily: "'Piazzolla Variable', ui-serif, Georgia, serif"
    fontSize: "clamp(2.1rem, 5.6vw, 3.9rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'Piazzolla Variable', ui-serif, Georgia, serif"
    fontSize: "clamp(1.1rem, 1.6vw, 1.375rem)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-0.03em"
  gloss:
    fontFamily: "'Piazzolla Variable', ui-serif, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.005em"
    fontStyle: "italic"
  body-lg:
    fontFamily: "'Archivo Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.95rem + 0.5vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "'Archivo Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  reading:
    fontFamily: "'Archivo Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  none: "0"
  focus: "2px"
  pill: "999px"
spacing:
  gutter-sm: "1.25rem"
  gutter-md: "2.5rem"
  gutter-lg: "4rem"
  rail: "3.25rem"
  card-gap: "1.5rem"
  stack-gap: "2rem"
  section-y: "5rem"
  measure: "62ch"
  shell-max: "90rem"
components:
  button-primary:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.75rem"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.terracotta-deep}"
    textColor: "{colors.cream}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.espresso}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.5rem"
    typography: "{typography.body}"
  chip-vibe:
    backgroundColor: "rgba(250,243,231,0.14)"
    textColor: "#e6efd2"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.625rem"
    typography: "{typography.reading}"
  chip-quality:
    backgroundColor: "transparent"
    textColor: "{colors.moss}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.875rem"
    typography: "{typography.reading}"
  card-spot:
    backgroundColor: "transparent"
    textColor: "{colors.espresso}"
    rounded: "{rounded.none}"
    padding: "1rem 0 0"
  input-email:
    backgroundColor: "{colors.cream-deep}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.25rem"
    typography: "{typography.body}"
  nav-bar:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.none}"
    height: "4.5rem"
  readout-plate:
    backgroundColor: "rgb(237 225 200 / 0.92)"
    textColor: "{colors.espresso-soft}"
    rounded: "{rounded.none}"
    padding: "0.375rem 0.375rem 0.25rem"
    typography: "{typography.reading}"
---

# Design System: Nëqoshe

## Overview

**Creative North Star: "The Cup Read at the Window"**

Nëqoshe is a room with the light moving through it. Scroll position is an hour of the Tirana day, and every surface on the page reads from that one clock: the light meter on the right edge, the ground colour under the copy, the sun inside the 3D table. Nothing here is a mood layer applied over a template. The ground is the weather, the type is the voice, and the numbers are measurements taken in a room somebody actually sat in.

The system is built on three committed grounds rather than one tinted surface. Dawn is cream, the middle of the page is midnight roast, and the close is an ember dusk that warms rather than repeats the night. Each act carries its full token set — ground, three inks, rule, accent, on-accent, moss, lift — so a component written once behaves correctly in all three without a single conditional. Density is editorial and generous: poster-scale serif headlines, a 62ch reading measure, long vertical rooms between sections, and photography that bleeds to the true page edge.

Two pigments do all the semantic work, and they never trade jobs. The warm fire — terracotta as pigment on light ground, brass as emitted light on dark — marks a reading: a measurement, a link, a time, a call to act. Olive marks a quality: a vibe, a use, a thing this corner is good for. The world rejects the category default it was built against — a filterable grid of same-size café cards above a map — and equally rejects the moody photo essay with no data in it. Both facts and feeling ride in the same object.

**Key Characteristics:**
- One global clock; scroll is an hour, and every timed surface reads the same motion value.
- One saturated field per act, never a tint over a shared ground.
- Piazzolla at poster scale against Archivo for anything measured.
- Two pigments with fixed jobs: warm fire for readings, olive for qualities.
- Square-cornered plates and pill-shaped actions; no middle radius exists.
- Unknowns are named in Albanian, never drawn as a zero or a crossed-out icon.

## Colors

A single warm fire read two ways against three committed grounds, with one olive counter-pigment and no other hue in the system.

### Primary
- **Terracotta** (`#c1512f`): the accent on light ground. Pigment, not light: primary buttons, the gloss line, the live hour readout, work scores, link underlines, markers, `::selection`, `::marker`, the focus ring. It is `--accent` inside `.act-dawn`.
- **Brass** (`#d89a4a`): the same fire on dark ground, read as emitted light. It is `--accent` inside `.act-night`, and it is also the fixed colour of the light meter's rail, ticks and travelling dot, which must survive every ground including the hero photograph.
- **Ember Accent** (`#e9a24f`): `--accent` inside `.act-dusk`, one step brighter than brass because the dusk ground itself carries fire.
- **Terracotta Deep** (`#8f3a1f`): the only hover fill in the system — a wipe that grows from the left edge under the primary button's label.

### Secondary
- **Moss** (`#4e5c38` dawn / `#9aad73` night / `#a8b981` dusk): the second pigment. It marks a quality — a "good for" line, a use, a vibe tag border — and nothing else.

### Neutral
- **Cream** (`#faf3e7`) and **Cream Deep** (`#f2e5cf`): the dawn ground and its inset panel ground. Cream is also `--on-accent` on the light act and the preloader field.
- **Espresso** (`#241812`), **Espresso Soft** (`#6b5341`), **Espresso Faint** (`#7b6349`): the three dawn inks — headline ink, body and readings ink, label and caveat ink.
- **Midnight** (`#1a120c`) and **Espresso** as its second ground: the night act's fields. Midnight is `--on-accent` on night.
- **Candlelight** (`#f4e7d3`), **Candlelight Soft** (`#a8927a`), **Candlelight Faint** (`#93795b`): the three night inks.
- **Ember Ground** (`#45210f`) / **Ember Ground 2** (`#55290f`) with **Ember Ink** (`#fdf4e6`), **Ember Ink Soft** (`#e2bc93`), **Ember Ink Faint** (`#c09a6c`), on **Ember On-Accent** (`#2a1206`): the dusk act, a warming rather than a second night.
- **Rules** are always the act's ink at low alpha (13–14% on dawn and night, 30% brass-tinted on dusk), never a grey.

### Named Rules

**The One Field Per Act Rule.** An act commits to its own full-bleed ground and its own complete token set. Never tint a shared surface to suggest a different time of day; declare a new act.

**The Declared Ink Rule.** Every act-like wrapper declares `color: var(--ink)` alongside its tokens. A custom property substitutes where it is *declared*, so `body { color: var(--ink) }` resolves against `:root` once and children inherit that literal value. An act that only redefines `--ink` inherits the wrong ink everywhere. This shipped as a real bug before it was fixed.

**The Two Pigments Rule.** The warm fire marks a READING; olive marks a QUALITY. Olive is never a second accent, never a fill, never a button.

**The On-Accent Rule.** Text on an accent fill uses `var(--on-accent)`, which flips per act. Any hardcoded colour there fails contrast in one act or the other.

## Typography

**Display Font:** Piazzolla Variable (with ui-serif, Georgia, serif)
**Body Font:** Archivo Variable (with ui-sans-serif, system-ui, sans-serif)

**Character:** Piazzolla is a high-contrast text serif with a real weight axis, set tight and large so headlines read as printed rather than typed; the build animates the axis itself (200 → 520 across the wordmark, 300 → 500 per word in the editorial reveals) so a line looks like it is being set. Archivo carries everything measured: labels, values, controls, and any number that is genuinely an instrument reading. Both faces are self-hosted variable files; `font-synthesis-weight` is off and `font-variant-numeric: tabular-nums` is global, so numbers never jitter as the clock ticks.

### Hierarchy
- **Wordmark** (Piazzolla 520, `clamp(3.6rem, 15.5vw, 11rem)`, line-height 0.9, tracking −0.035em): the hero mark and the top bar's home link. The ë keeps its diaeresis at every weight.
- **Display Large** (Piazzolla 500, `clamp(2.75rem, 8.5vw, 6.5rem)`, line-height 0.94): the closing statement and any page-owning line.
- **Display** (Piazzolla 500, `clamp(2.1rem, 5.6vw, 3.9rem)`, line-height ~1.06, tracking −0.03em): section headlines. `text-wrap: balance` is on for h1–h3.
- **Title** (Piazzolla 500, `clamp(1.1rem, 1.6vw, 1.375rem)`, line-height 1.18): spot names on cards, sidebar and subsection heads (1.35rem fixed on the detail page).
- **Gloss** (Piazzolla italic 400, 1rem–1.0625rem, line-height 1.35, in `var(--accent)`): the English translation under an Albanian line. It is a translation set as prose, not a label.
- **Body Large** (Archivo 400, `clamp(1.0625rem, 0.95rem + 0.5vw, 1.3125rem)`, line-height 1.6, max-width 62ch, in `--ink-2`): section openers and long reading passages.
- **Body** (Archivo 400, 0.875–0.9375rem, line-height 1.55–1.65, in `--ink-2`): notes, sourcing, asides.
- **Reading** (Archivo 500, 0.6875rem, tracking 0.1em, uppercase, tabular): measurement labels, vibe chips, neighbourhood/category lines, the light meter's readout.

### Named Rules

**The Gloss Rule.** Albanian leads; English supports beneath it in italic display in the accent colour. English never appears as a tracked uppercase line above a headline — that is an eyebrow, and this world does not have them.

**The Instrument Voice Rule.** Tracked uppercase (`.reading`) is reserved for things that are actually measured or named data: a label over a value, a tag, a clock readout. It never carries a sentence and never introduces a heading.

## Layout

The page is one column of full-height rooms. `.shell` is the only container: `max-width: 90rem`, centred, with `padding-left: var(--gutter)` and `padding-right: calc(var(--gutter) + var(--rail))`. The gutter steps 1.25rem → 2.5rem (768px) → 4rem (1280px); `--rail` is 0 below 1024px and 3.25rem above it.

Inside the shell, composition is a 12-column grid used asymmetrically: hero 7/5, the clock section 5/7, the map 6 + 6-starting-at-7, the detail page 7/5. Explore deliberately varies its own grid per group — a 7/5 pair, three stepped columns with `mt` offsets, a snapping horizontal track, two wide rooms with one dropped — so no two groups read as the same card shelf. Card ratios rotate across `3/4`, `4/5`, `16/10` and `2/1` for the same reason. Gaps are 2rem stacked and 1.5rem at md and up; section rhythm is `py-14` → `py-20` inside Explore and `py-16` → `py-32` between the major rooms. Anchored sections carry `scroll-margin-top: 5.5rem` so they clear the fixed bar.

Full-bleed elements escape the shell with `-mx-[var(--gutter)]`, and the hero plate additionally cancels the rail (`lg:mr-[calc(-1*(var(--gutter)+var(--rail)))]`) so it reaches the true page edge. Below lg the page collapses to a single stack and the light meter becomes a 1px brass progress hairline across the top.

### Named Rules

**The Rail Rule.** `--rail` is the light meter's reserved lane in the shell's right padding. Fixed chrome takes part in no layout, so any right-aligned block at that vertical band collides with the readout unless the rail reserves it. A full-bleed element that cancels the gutter must also cancel the rail.

**The Live Height Rule.** Viewport-height rooms use `min-h-[100dvh]`, never `h-screen`.

## Elevation & Depth

Depth here is light, not lift. The dominant depth cues are tonal: one field per act, an inset `--ground-2` panel, gradient scrims over photography, a radial vignette that closes the 3D scene, a left-edge fade that dissolves the scene into the ground, and a fixed paper-grain overlay at 40% `soft-light` over the whole page. Shadows exist but are scarce — three tokens, all offset-and-blurred and tinted to the act's own `--lift` colour (espresso at 10% on light, black at 45–50% on dark), so a raised object casts warm shade instead of a grey halo.

### Shadow Vocabulary
- **lift-sm** (`0 2px 8px -2px var(--lift)`): small resting plates.
- **lift-md** (`0 8px 20px -10px var(--lift)`, `0 2px 6px -4px var(--lift)`): panels that need to sit above their ground.
- **lift-lg** (`0 30px 60px -30px var(--lift)`, `0 10px 24px -18px var(--lift)`): the hero plate and full-height photographic objects.

### Named Rules

**The Warm Shade Rule.** Every shadow is negative-spread, blurred, and tinted through `--lift`. No flat halos, no grey.

**The Light-First Rule.** Reach for a gradient, a scrim or a ground change before reaching for a shadow. Cards in Explore have no shadow at all; they rise 4px on hover instead.

## Shapes

Two radii and nothing between them. Plates are square: images, cards, the inset panels, the culture aside, the light meter's readout, the sidebar block — all `border-radius: 0`, edge to edge, so the photography and the grounds read as printed sheets. Anything you can act on is a full pill (999px): primary and ghost buttons, the email field, the vibe chips, the back link, the social buttons. The focus ring is the one exception at 2px, offset 3px, in `var(--accent)`.

Borders are hairlines in `var(--rule)` — the act's ink at low alpha — used as horizontal separators between list rows, group headers and footer bands far more often than as boxes. The recurring silhouette of the world is circular and organic where it is illustrative: the sediment plot is a glazed porcelain disc with dashed tide lines and ~one ellipse per corner; the light meter is a 1px vertical line with a glowing 8px dot.

## Components

### Buttons
- **Shape:** full pill (999px).
- **Primary:** accent fill with `var(--on-accent)` text, `0.9rem 1.75rem` padding, Archivo 500 at 0.9375rem. In the top bar it shrinks to `0.5rem 1.25rem` at 0.8125rem.
- **Hover / Focus:** a `#8f3a1f` panel scales in from the left origin over 500ms on `--ease-light`; `active:scale-[0.975]`. Focus is the global 2px accent ring.
- **Ghost:** transparent with a 1px `var(--rule)` border and `var(--ink)` text, `0.9rem 1.5rem`. Used for the secondary hero action and icon buttons (40px circles).

### Chips
- **Vibe tags (on photography):** `.reading` type in a pill on `rgba(250,243,231,0.14)` with a 6px backdrop blur, text `#e6efd2`. They are hidden at rest and translate up into view on `group-hover` / `group-focus-visible`.
- **Quality tags (on ground):** `.reading` type in a pill with a moss-at-40% border and moss text, no fill. This is the olive pigment's only chip form.

### Cards / Containers
- **Corner Style:** square (0) on the image plate and no container box around the text — the card is an image plate plus a text block, not a boxed object.
- **Background:** a per-spot tone colour sits under the lazy image so the plate is never empty; a bottom-up midnight gradient (86% → 0) carries the overlay content.
- **Shadow Strategy:** none at rest. Hover raises the plate 1 unit and scales the image to 1.045 with a small brightness/saturation lift, both over 520–900ms on `--ease-light`.
- **Border:** one hairline rule above the readings strip. Nothing else.
- **Internal Padding:** `pt-4` between plate and title; overlay content inset 1rem from the plate edges.

### Inputs / Fields
- **Style:** pill, filled with `--ground-2` at 90%, 1px `var(--rule)` border, `var(--ink)` text, `0.75rem 1.25rem`. Placeholders use `--ink-3` at full opacity; caret is the accent.
- **Focus:** the global 2px accent ring at 3px offset.
- **Error:** the border becomes `#e4703f`; the message is said in words beneath the field.

### Navigation
- **Style:** a fixed 4rem/4.5rem bar that does not exist during the hero — it slides down only once a `#hero-end` sentinel leaves the viewport, so the first viewport belongs to the wordmark alone. Its background is the current act's ground at 82% with a 14px backdrop blur and a hairline bottom rule.
- **Act awareness:** the bar sits outside every act, so it asks `useActAtTop()` which act is under the viewport top and applies that class, cross-fading colour and background over 450ms.
- **Contents:** the wordmark at 1.25rem on the left, the primary pill CTA on the right.

### The Light Meter (signature)
A fixed instrument in the right rail: a 1px brass line 44vh tall, six hour ticks, and a glowing dot whose vertical position and opacity are driven by the same clock motion value as the 3D scene's sun. Its readout is `.reading` type on `--readout-plate`, a fill one shade *darker* than the act's own field, with a brass top rule. It carries its own blurred radial ground so it stays legible over cream, over midnight, and over the hero photograph. Below lg it becomes a 1px brass progress hairline pinned to the top of the viewport.

### The Reading Strip (signature)
A `<dl>` of label/value pairs — `.reading` label in `--ink-3`, 0.8125rem medium value in `--ink-2` — with no divider elements; the pairing and a 1.25rem gap carry the separation, because a separator drawn before each item leaves a stray rule at the start of a wrapped line. Directly beneath it, unknown fields are named out loud in italic `--ink-3`: "S'e dimë ende: zhurma, wifi." On the detail page the same idea runs as a two-column grid where a missing value prints "nuk dihet" in italic.

### The Sediment Plot (signature)
The map is a glazed porcelain disc — a four-stop radial glaze lit from the upper left, a shade gradient at lower right, two dashed tide-line rings under a 2.4px blur — with one ellipse per corner, positioned by cluster. Hover lifts a cluster to `#b03e1c`, drops the rest to 22% opacity, and prints its name in tracked Archivo with a cream stroke behind it. The caption states plainly that positions are drawn, not surveyed.

### Motion
Three custom curves and nothing built in: `--ease-light` `cubic-bezier(0.16, 1, 0.3, 1)` for everything that enters, `--ease-settle` `cubic-bezier(0.32, 0.72, 0, 1)` for things landing under their own weight, `--ease-move` `cubic-bezier(0.65, 0, 0.35, 1)` for things crossing the screen. Entrances run 0.9–1.25s with 60–100ms sibling stagger, a 22px rise and a 10px blur clearing. Springs: `{90, 18, 0.7}` for cursor tracking, `{260, 28, 0.6}` for UI settle. Only `transform`, `opacity`, `filter` and `clip-path` are animated. Under `prefers-reduced-motion` every entrance resolves to its final state — a full static composition, not a disabled one — and the 3D scene is replaced by a designed still plate.

## Do's and Don'ts

### Do:
- **Do** give any new act-like wrapper the complete token set *and* `color: var(--ink)`, or its children inherit the wrong ink.
- **Do** read the hour from the one clock (`useClock()`); it is the same motion value that drives the meter, the ground and the scene's sun.
- **Do** keep the crossover in `src/sections/Ora.tsx` derived from the single `ROOM_SWITCH` constant — ground stops, ink stops, vignette and both `data-act` sentinels. Retiming it anywhere else desynchronises the fixed chrome from the ground.
- **Do** set `--ground` and `color` explicitly when animating act tokens on a `motion.section`; the scene's edge fade and every child reading the ground need them, not just the section's own paint.
- **Do** use `var(--on-accent)` for text on any accent fill.
- **Do** reserve `--rail` in the right padding of anything that must not meet the light meter, and cancel it as well as the gutter when bleeding to the page edge.
- **Do** observe the *heading* in a word-by-word reveal, never the word. Each word starts translated out of an `overflow-hidden` wrapper, and IntersectionObserver clips a target's rect by its ancestors' overflow: observing the word caps its ratio below any useful threshold and the line never appears. This shipped invisible at all three call sites before it was caught.
- **Do** gate every value through `known()` and name what is unknown in Albanian ("nuk dihet", "s'e dimë ende").
- **Do** vary the grid and the aspect ratio between adjacent groups; sameness is the category default this world was built against.
- **Do** ship a designed still for any capability fallback (no WebGL, low power, reduced motion) that carries the same idea as the live version.

### Don't:
- **Don't** tint a shared ground to suggest a different hour. Declare an act.
- **Don't** use olive as a second accent or as a fill; it marks qualities only.
- **Don't** set the English gloss as a tracked uppercase line above a headline. Tracked uppercase belongs to measurements and tags.
- **Don't** introduce a third radius. Plates are square; actions are pills.
- **Don't** use a flat or grey shadow. Warm, blurred, negative-spread, tinted through `--lift`, or no shadow at all.
- **Don't** hardcode a colour where an act token exists — `--ink`, `--ground`, `--rule`, `--accent`, `--on-accent`, `--moss`, `--lift` all flip per act.
- **Don't** render a null as a zero, a dash, a crossed-out icon, or by omission.
- **Don't** animate anything but `transform`, `opacity`, `filter` and `clip-path`, and don't reach for a built-in easing.
- **Don't** put the grain on a scrolling container; it is one fixed, `pointer-events-none` overlay.
- **Don't** add a `window.addEventListener('scroll')`; use the clock, `useScroll`/`useTransform`, or IntersectionObserver.

## Known constraints

Three accepted deviations the finish review recorded as non-blocking. They are constraints of the current build, not rules to reproduce.

- **The hero steam is baked into the plate.** The first viewport's drifting steam is photographic, not live; the cursor-reactive brass wordmark and the dust canvas beside it are genuine.
- **Mobile Explore collapses to a stack.** The desktop asymmetry does not survive below md; varied aspect ratios and the specialty group's horizontal snap track carry the difference instead.
- **The light meter's readout plate reads as applied on the light acts.** The hero is a light act whose right edge is a dark photograph, so the instrument must survive two grounds at once and cannot run on ink alone. Resolving it properly means stopping the hero plate short of the rail, which is a composition change.

**Photography is placeholder.** Every raster in `public/img` is synthetic, generated for this demo, with its generation prompt embedded in the file; `public/img/PROVENANCE.md` carries the table and the page discloses it in its own footer. Replacing the plates with real photographs would change the per-spot plate tones (currently chosen to match the synthetic images), the hero's baked steam, and the disclosure line in the footer — nothing else in this system depends on them.
