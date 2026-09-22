---
name: Nëqoshe
description: Where to work from in Tirana — a warm, hour-lit finder for corner tables.
colors:
  cream: "#faf3e7"
  cream-deep: "#f2e5cf"
  espresso: "#241812"
  espresso-soft: "#634c3b"
  espresso-faint: "#755e45"
  terracotta: "#b34724"
  brass: "#dda257"
  ember: "#e9a24f"
  moss: "#4a5834"
  moss-light: "#9aad73"
  moss-dusk: "#a8b981"
  midnight: "#1a120c"
  midnight-lift: "#241812"
  bark: "#45210f"
  bark-lift: "#55290f"
  parchment: "#f6ead7"
  parchment-soft: "#b7a189"
  parchment-faint: "#9c8264"
  dusk-ink: "#fdf4e6"
  dusk-ink-soft: "#e2bc93"
  dusk-ink-faint: "#c09a6c"
  rule-light: "rgb(36 24 18 / 0.15)"
  rule-night: "rgb(244 231 211 / 0.16)"
  rule-dusk: "rgb(233 162 79 / 0.3)"
  readout-plate-light: "rgb(237 225 200 / 0.92)"
  readout-plate-night: "rgb(18 12 7 / 0.74)"
  sun-0600: "#d9742f"
  sun-0800: "#ffc373"
  sun-1300: "#ffefd6"
  sun-1830: "#ff8033"
  sun-2000: "#8e3410"
  sun-2400: "#4a1a08"
  lamp: "#ffb562"
  plate: "rgb(26 18 12 / 0.72)"
  on-plate: "rgb(250 243 231 / 0.72)"
  on-plate-open: "#9ad37f"
  on-plate-score: "#e9ae63"
  on-plate-note: "#bfd39b"
  photo-kicker: "#edb874"
  photo-tone: "#6a4a2c"
  wash-dawn: "rgba(255,214,150,0.45)"
  wash-dusk: "rgba(226,140,58,0.38)"
  brand-terracotta: "#c1512f"
  brand-brass: "#d89a4a"
  brand-olive: "#5c6b42"
typography:
  display-xl:
    fontFamily: "'Source Serif 4 Variable', ui-serif, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.018em"
  display-lg:
    fontFamily: "'Source Serif 4 Variable', ui-serif, Georgia, serif"
    fontSize: "clamp(1.6rem, 3.2vw, 2.3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.014em"
  display-md:
    fontFamily: "'Source Serif 4 Variable', ui-serif, Georgia, serif"
    fontSize: "clamp(1.3rem, 2.4vw, 1.6rem)"
    fontWeight: 600
    lineHeight: 1.16
    letterSpacing: "-0.01em"
  display-sm:
    fontFamily: "'Source Serif 4 Variable', ui-serif, Georgia, serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.008em"
  display-dial:
    fontFamily: "'Source Serif 4 Variable', ui-serif, Georgia, serif"
    fontSize: "clamp(2.4rem, 5vw, 3.4rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
  mark-lg:
    fontFamily: "'Source Serif 4 Variable', ui-serif, Georgia, serif"
    fontSize: "clamp(2.4rem, 9vw, 5rem)"
    fontWeight: 520
    lineHeight: 0.95
  mark-sm:
    fontFamily: "'Source Serif 4 Variable', ui-serif, Georgia, serif"
    fontSize: "1.6rem"
    fontWeight: 520
    lineHeight: 1
  lead:
    fontFamily: "'Source Sans 3 Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.6
  ui:
    fontFamily: "'Source Sans 3 Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "'Source Sans 3 Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
  micro:
    fontFamily: "'Source Sans 3 Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.4
  display:
    fontFamily: "'Source Serif 4 Variable', ui-serif, Georgia, serif"
    fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.012em"
  wordmark:
    fontFamily: "'Source Serif 4 Variable', ui-serif, Georgia, serif"
    fontSize: "clamp(3rem, 9vw, 6rem)"
    fontWeight: 520
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  gloss:
    fontFamily: "'Source Serif 4 Variable', ui-serif, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0"
    fontStyle: "italic"
  body:
    fontFamily: "'Source Sans 3 Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  body-lg:
    fontFamily: "'Source Sans 3 Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.98rem + 0.4vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.7
  reading:
    fontFamily: "'Source Sans 3 Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  none: "0"
  focus: "3px"
  pill: "999px"
spacing:
  gutter-sm: "1.25rem"
  gutter-md: "2.5rem"
  gutter-lg: "4rem"
  card-pad: "1.25rem"
  section-y: "3.5rem"
  section-y-lg: "5rem"
  shell-max: "82rem"
  measure: "66ch"
components:
  button-primary:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
    typography: "{typography.body}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.espresso}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.25rem"
  chip-facet:
    backgroundColor: "transparent"
    textColor: "{colors.espresso-soft}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.875rem"
  chip-facet-active:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.875rem"
  chip-quality:
    backgroundColor: "transparent"
    textColor: "{colors.moss}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.875rem"
    typography: "{typography.reading}"
  card-spot:
    backgroundColor: "{colors.cream-deep}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.none}"
    padding: "1.25rem"
  readout-plate:
    backgroundColor: "{colors.readout-plate-light}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.none}"
    padding: "2rem"
  note-panel:
    backgroundColor: "transparent"
    textColor: "{colors.espresso}"
    rounded: "{rounded.none}"
    padding: "1rem"
---

# Design System: Nëqoshe

## Overview

**Creative North Star: "The Corner Table at the Hour You Set"**

Nëqoshe is a tool dressed as a room. The whole surface is one warm interior — cream paper, espresso ink, a single fire of an accent — and the visitor holds the light switch. An hour control at the top of the finder moves the sun across a 3D table, swaps the section's ground from day to night, and re-cuts the list of places that are actually open. Nothing about that is decoration: the same number drives the picture, the palette and the query.

The density is editorial, not dashboard. Serif headlines in Albanian carry the feeling, an italic English gloss translates directly underneath in the accent colour, and a small uppercase sans voice carries the measurements. Legibility is a hard commitment of this build and was paid for explicitly: the previous display pairing was replaced with Source Serif 4 over Source Sans 3 for their low stroke contrast and large x-height, `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility` were deliberately removed so the OS keeps the strokes at full weight, entrance blurs were taken off body text, and the paper grain sits at 0.1 opacity. Warmth here is never bought with softness.

Depth is light and pigment rather than boxes. Panels are square-cornered, hairline-ruled, and lifted only by three warm low-contrast shadows; the only round things are the controls, which are fully pill-shaped so a press target reads as a press target. Two pigments split the work: the warm fire (terracotta on light, brass on dark) marks readings and actions, and olive marks a quality. The build's imagery is entirely synthetic and disclosed as such, and 14 of 29 places have no plate at all — those get a designed panel, not a hole.

**Key Characteristics:**
- One warm fire read two ways: terracotta as pigment on light ground, brass as emitted light on dark
- Three grounds (dawn cream, night midnight-roast, dusk bark) that an act, not a tint, commits to
- Square panels, hairline rules, pill controls
- Albanian display serif over an italic English gloss in the accent
- Phosphor icons as a first-class layer: one family, one weight, one size rhythm
- Nulls named out loud, never rendered as zeros or crossed-out icons

## Colors

A single warm interior lit three ways, with one counter-pigment kept in reserve for qualities.

### Primary
- **Terracotta Fire** (`{colors.terracotta}`): the accent on any light ground — primary buttons, active filter chips, the hour readout, the gloss line, link underlines, focus rings, the ::marker and the scrollbar thumb. Darkened from the brand base for contrast against cream.
- **Brass Light** (`{colors.brass}`): the same fire on the night ground. Not a second accent — the same role, re-read as emitted light rather than pigment.
- **Ember** (`{colors.ember}`): the accent in the dusk act (the closing footer), where the ground is already warm and the fire has to sit above it.

### Secondary
- **Moss** (`{colors.moss}`) with its night and dusk lifts (`{colors.moss-light}`, `{colors.moss-dusk}`): the counter-pigment. Category marks, vibe tags, the "good for" list, the local-notes panel, the three hero stat icons.

### Neutral
- **Warm Cream** (`{colors.cream}`) and **Cream Deep** (`{colors.cream-deep}`): the dawn ground and its raised surface (spot cards sit on the deeper one). Cream is also painted into `index.html` so the first frame is already the right world before any JS runs.
- **Espresso** (`{colors.espresso}`) / **Espresso Soft** (`{colors.espresso-soft}`) / **Espresso Faint** (`{colors.espresso-faint}`): the three-step ink ramp on light — headings, body, and captions/labels respectively.
- **Midnight Roast** (`{colors.midnight}`) / **Midnight Lift** (`{colors.midnight-lift}`): the night ground and its raised surface, used by the finder after dark and the radio block.
- **Bark** (`{colors.bark}`) / **Bark Lift** (`{colors.bark-lift}`): the dusk ground of the closing footer.
- **Parchment** trio (`{colors.parchment}`, `{colors.parchment-soft}`, `{colors.parchment-faint}`) and **Dusk Ink** trio: the inverted ink ramps for night and dusk.
- **Rules** (`{colors.rule-light}`, `{colors.rule-night}`, `{colors.rule-dusk}`): every divider and every resting control border, always a single hairline at low alpha.
- **Brand base** (`{colors.brand-terracotta}`, `{colors.brand-brass}`, `{colors.brand-olive}`): the user-specified source pigments, kept as Tailwind theme colours and used where the surface is outside an act (the preloader rule, the 3D table's materials). The runtime accents are the darkened contrast-corrected pair above.

### Named Rules

**The One Fire Rule.** There is one accent, and it changes value with the act rather than multiplying. Terracotta on light, brass on dark, ember at dusk — never two accents on one screen.

**The Moss Rule.** `--moss` marks a QUALITY: a vibe, a use, a category, a human note. It never marks a reading. The warm fire marks readings. A wifi figure in olive is a bug.

**The On-Accent Rule.** Text sitting on an accent fill always uses `var(--on-accent)`, which flips per act (cream on terracotta, midnight on brass, deep bark on ember). Hardcoding a colour there fails contrast in one act or the other.

**The Act Ink Rule.** An act wrapper (`.act-dawn`, `.act-night`, `.act-dusk`) declares `color: var(--ink)` alongside its tokens. A custom property substitutes where it is declared, so `body { color: var(--ink) }` resolves against `:root` once and children inherit that literal value. Any new act-like wrapper that skips the `color` declaration will render its text in the wrong ink.

**The Act-Fade Rule.** `.act-fade` transitions `background-color`, `border-color`, `color` and `fill` over 700ms because custom properties themselves do not transition — the properties consuming them do. Any act that can change while the visitor watches (the finder, as the hour crosses dusk) must carry it, or the swap reads as a cut.

## Typography

**Display Font:** Source Serif 4 Variable (with ui-serif, Georgia, serif)
**Body Font:** Source Sans 3 Variable (with ui-sans-serif, system-ui, sans-serif)

**Character:** A reading pair, not a display pair. Both faces have low stroke contrast and a large x-height, so the serif holds weight at 600 without hairlines that shimmer and the sans stays steady at 0.75rem uppercase. Warmth comes from colour and light; the type's job is to stay out of the way. Both render Albanian diacritics (ë, ç) correctly at every weight and the ë keeps its diaeresis through the wordmark's weight animation.

### Hierarchy
- **Display XL** (600, `clamp(2.5rem, 6vw, 4.5rem)`, 1.04, −0.018em): section-opening statements and the largest headings.
- **Wordmark** (520, up to 6rem, 0.92, −0.035em): "Nëqoshe" only. Letters come up in weight from 200 to 520 as if light crossed them left to right; the diaeresis is part of the mark.
- **Display** (600, `clamp(1.75rem, 3.4vw, 2.5rem)`, 1.12, −0.012em): section headings, spot names, the hour readout, big numerals like the work score.
- **Gloss** (italic 400, ~1.0625rem, 1.4, accent colour): the English translation line directly under an Albanian one. It is a translation set as one — never a tracked uppercase label, never a kicker.
- **Body** (400, 1.0625rem, 1.65): default page text, tabular numerals on by default, `font-synthesis-weight: none`.
- **Body Large** (400, `clamp(1.0625rem, 0.98rem + 0.4vw, 1.25rem)`, 1.7, capped at 66ch): opening paragraphs, set in the soft ink.
- **Reading** (600, 0.75rem, +0.06em, uppercase, tabular): the label voice for measurements and controls — dial ticks, facet counts, detail-panel field names, the "no photo yet" line. Larger and less tracked than a typical micro-label because it carries real values.

### Named Rules

**The Two-Language Rule.** Albanian carries headlines, section openers and CTAs; English carries labels and glosses. The English line is set with the gloss style, never as a tracked uppercase eyebrow.

**The Unsmoothed Rule.** No `-webkit-font-smoothing: antialiased`, no `text-rendering: optimizeLegibility`, no entrance blur on body text, grain at 0.1. Thinning the strokes is exactly what makes warm type feel soft-focus; these four omissions are load-bearing decisions, not oversights.

**The Reading Voice Rule.** Uppercase is reserved for the `.reading` style on measurements and control labels. Headlines and prose are never uppercased.

## Layout

One shell governs everything: 82rem max width, centred, with a gutter that steps 1.25rem → 2.5rem (≥768px) → 4rem (≥1280px) through the `--gutter` custom property. Prose is additionally capped at `--measure` (66ch).

The page is four sections, in order: Hero, Finder, Radio, Close. Each owns its own ground rather than tinting a shared one. Within a section the grammar is a 12-column grid at `lg` (`lg:grid-cols-12`) collapsing to a single column below: hero copy at 7 columns beside a 4:5 image plate at 5, the finder's controls at 7 beside a square scene at 5, the radio's copy at 5 beside a 16:9 frame at 6 offset to column 7. Section rhythm is `py-14` to `py-20` (3.5–5rem) with an internal 12-unit (3rem) step between blocks and hairline rules separating them.

The results grid is 1 / 2 / 3 columns (`sm` / `lg`) with a 1.25rem gap, animated by layout rather than by re-entry. Fixed chrome (the top bar, 4rem / 4.5rem tall) sits outside every act and asks `useActAtTop()` which act is under the viewport top, then applies that class to itself. Anchored sections carry `scroll-margin-top: 5.5rem` to clear it. Full-height regions use `min-h-[100dvh]`, never `h-screen`.

## Elevation & Depth

Mostly flat, tonally layered, with three warm shadow steps used sparingly. Depth comes first from ground-vs-surface (`--ground` behind, `--ground-2` on the raised card), then from a single hairline `--rule` border, then from light itself: radial warm washes bleed into the hero and the footer corners, and the 3D table casts the only real shadow on the page. The shadow colour is a token (`--lift`) that darkens with the act — a 10%-alpha espresso on cream, half-opacity black at night — so nothing ever looks like a grey box pasted on warm paper.

### Shadow Vocabulary
- **Lift Small** (`box-shadow: 0 2px 8px -2px var(--lift)`): barely-off-the-page surfaces.
- **Lift Medium** (`box-shadow: 0 8px 20px -10px var(--lift), 0 2px 6px -4px var(--lift)`): raised panels.
- **Lift Large** (`box-shadow: 0 30px 60px -30px var(--lift), 0 10px 24px -18px var(--lift)`): the hero image plate, the one object allowed to float.

### Named Rules

**The Warm Shadow Rule.** Shadows are `var(--lift)`, never a neutral black or grey, and always heavily negative-spread so they read as light falling off rather than as a border.

**The Frosted Chrome Rule.** Only two surfaces blur their backdrop: the top bar (`blur(14px)` over 82% ground) and the small badges floating on a photograph (`blur(6px)` over a 72%-opacity midnight). Nothing else uses backdrop-filter.

## Shapes

Two shapes, and the split is semantic. **Content is square**: spot cards, image plates, the scene frame, the radio frame, the detail readout plate and the note panels all have a 0 radius and a 1px `--rule` border. **Controls are pills**: every button, filter chip, neighbourhood chip, vibe tag, station toggle and social link is fully rounded (999px), which is how a pressable thing announces itself in a page full of square panels. The only exceptions are the 3px radius on the focus ring and the small circular affordances — the hour-dial handle (16px, with a 5px accent halo at 18% alpha) and the 44px circular social buttons.

Dividers are always a single 1px `--rule` line, never a filled bar. An absent value is drawn with a dashed `--rule` border (the "no wifi password recorded yet" panel), which is the only dashed stroke in the system and means exactly one thing: this is a known gap.

## Components

### Buttons
- **Shape:** fully rounded pill (999px).
- **Primary:** accent fill with `var(--on-accent)` text, 0.75rem × 1.5rem padding, 0.9375rem medium weight, icon on the right at 16px.
- **Hover / Focus:** presses rather than glows — `active:scale-[0.97]` over 150ms, and a 2px accent focus ring at 3px offset from the global `:focus-visible`. Icons inside a group shift by a single pixel on hover under `motion-safe`.
- **Ghost:** transparent with a 1px `--rule` border and `--ink` text, same pill and padding. Used for the secondary hero CTA and the "back to now" reset.

### Chips
- **Style:** pill, 0.5rem × 0.875rem, 0.875rem medium, a Phosphor icon at 15–17px on the left and a `.reading` count at 0.625rem on the right.
- **State:** unselected is transparent with a `--rule` border and soft ink, with the icon at `regular` weight; selected fills with the accent, flips text to `var(--on-accent)` and switches the icon to `fill`. A chip that would leave zero results is disabled at 35% opacity rather than hidden — a dead end is visible before you hit it.
- **Quality variant:** vibe tags use a moss border at 40% mix and moss text in the `.reading` voice, never an accent fill.

### Cards / Containers
- **Corner Style:** square (0 radius).
- **Background:** `--ground-2`, on `--ground`.
- **Shadow Strategy:** no resting shadow; the card lifts 4px on hover (`motion-safe:hover:-translate-y-1`, 300ms ease-light) and its photograph scales to 1.05 behind a fixed frame.
- **Border:** 1px `--rule`, all four sides.
- **Internal Padding:** 1.25rem, with a 1rem-above/1rem-below hairline rule separating the readings strip from the title block.

### Inputs / Fields
- **Style:** the page's one real input is the hour dial: a full-width 1px `--rule` track with an accent-filled progress line, `.reading` tick labels at 06/09/12/15/18/21/24, and a 16px accent handle with a soft accent halo.
- **Focus:** the global 2px accent outline at 3px offset. Caret colour is the accent; placeholders use the faint ink at full opacity.
- **Keyboard:** quarter-hour steps on arrows, whole hours with shift, Home/End to the ends of the range.

### Navigation
- **Style:** a fixed 4rem / 4.5rem bar that does not exist until the hero has scrolled away, so the first viewport belongs to the wordmark alone. It slides down over 550ms on the settle curve, over an 82%-ground frosted plate with a 1px bottom rule. Wordmark left at 1.25rem, one accent pill CTA right. The bar applies whichever act is beneath the viewport top and cross-fades its colours over 450ms.

### The Hour Control
The signature component. The hour is a user-set value defaulting to the visitor's own clock, and it is the only input the page has: it moves the sun in the 3D table, decides the finder's act (`night` from 18:30 to 06:36), and filters what counts as open. It is exposed twice — as the dial, and as the scene itself, which is drag-anywhere on the horizontal axis. The 3D takes a plain `hour` number and eases toward it inside `useFrame`, so dragging costs no React renders.

### The Neighbourhood Cup
An SVG cup of coffee grounds standing in for a map, because the dataset has no coordinates. One grain per corner plus a deterministic scatter of dust, clumped by neighbourhood; selected clumps turn terracotta and reveal a cream-outlined label. It is a picker and says so in the copy next to it: "Not a map. The grounds in the bottom of the cup."

### The Notes Panel
Five kinds of hand-written local note (wifi, view, corner, tip, heads-up), each with its own Phosphor icon and all of them in moss: a square panel with an 8%-moss wash and a 22%-moss border, the kind name in the `.reading` voice, Albanian body, italic English gloss beneath. A note that does not exist yet is drawn as a dashed-border row that names the gap.

### The No-Photograph Panel
14 of 29 places have no plate. Those get a designed panel on the page ground: the category icon in moss at 60% opacity, up to three vibe tags centred, and a `.reading` line reading "Pa foto ende". Never an empty rectangle, never a stretched placeholder.

## Do's and Don'ts

### Do:
- **Do** declare `color: var(--ink)` on any new act-like wrapper alongside its tokens; a custom property substitutes where it is declared, so inherited text resolves against `:root` otherwise.
- **Do** add `.act-fade` to any act that can change while the visitor is watching, because custom properties do not transition but the properties consuming them do.
- **Do** use `var(--on-accent)` for text on any accent fill. It flips per act.
- **Do** reserve `--moss` for qualities (vibe, use, category, human note) and the warm fire for readings.
- **Do** gate every rendered value through `known()` and write every facet as a positive test, because null means unknown, never "no". Name the gap in words ("nuk dihet" / "s'e dimë ende"), never as a zero, a dash or a crossed-out icon.
- **Do** observe the heading, never the word, in any word-by-word reveal: IntersectionObserver clips a target's rect by its ancestors' overflow, and observing a word inside an `overflow-hidden` wrapper caps its ratio below any threshold. It shipped invisible once.
- **Do** give a spot with no photograph a designed panel — category icon plus vibe tags plus an honest label.
- **Do** pass the 3D scene a plain `hour` number and ease toward it inside `useFrame`, so dragging the dial costs no React renders.
- **Do** pull every icon from `src/lib/icons.tsx`: one family (Phosphor), `regular` weight at rest, `fill` when a control is on, 14–20px.
- **Do** keep the grain a single fixed, `pointer-events-none` overlay at 0.1 opacity, never on a scrolling container.
- **Do** animate only `transform`, `opacity`, `filter` and `clip-path`, with the project's own cubic-béziers (`--ease-light`, `--ease-settle`, `--ease-move`).
- **Do** give reduced motion a full static composition: elements already in place, no transform, no blur, no delay chain.

### Don't:
- **Don't** hardcode a colour on an accent fill, or introduce a second accent. There is one fire, read three ways.
- **Don't** put a reading in moss or a quality in the accent.
- **Don't** set the English line as a tracked uppercase eyebrow or kicker; it is a translation and uses the italic gloss.
- **Don't** reintroduce `-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`, a blur-in on body text, or a heavier grain. All four were removed because the previous pairing was reported as hurting to read.
- **Don't** round content panels. Cards, plates and frames are square; only controls are pills.
- **Don't** use a neutral grey or black shadow; elevation is `var(--lift)` and warm.
- **Don't** imply geographic precision anywhere. The cup is drawn, not surveyed, and the copy must keep saying so.
- **Don't** imply field verification or freshness. Every record is unverified and the oldest sourcing is years old.
- **Don't** use `h-screen` (use `min-h-[100dvh]`) or `window.addEventListener('scroll')` (use `useScroll`, `useTransform`, or IntersectionObserver).
- **Don't** render an unknown as a zero, an em dash, a "0 Mbps" or a struck-through icon.

## Known Constraints

Recorded as constraints of this build, not as design rules:

- **All photography is synthetic.** Every plate was generated for this demo; `public/img/PROVENANCE.md` carries each prompt and each file embeds its own. The footer discloses it on the page and that disclosure stays until real photographs replace the plates. Replacing them would change only the image sources and the `plateTone` base colours in `src/lib/spots.ts`; no layout, aspect ratio or gradient scrim would move, and the disclosure line and the synthetic-imagery note in the footer would then need to come out.
- **The YouTube live-stream id in `src/sections/Radio.tsx`** (`rFZHOHl-L8A`) was supplied by the owner. The section is built as a list, so a second station is one array entry; anything added later needs its own name in both languages.
- **The `cream-palette` detector suppression** scoped to `index.html` in `.impeccable/config.json` remains, because the brief pins `#FAF3E7` as the painted first frame.
