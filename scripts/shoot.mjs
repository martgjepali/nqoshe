/**
 * Review captures. Drives the locally installed Chrome so nothing is downloaded.
 *   node scripts/shoot.mjs [baseUrl]
 * Writes .impeccable/review/*.png
 *
 * Shots target named elements rather than viewport multiples, so a spacing
 * change never silently moves every capture to the wrong part of the page.
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = process.argv[2] ?? 'http://localhost:5180';
const OUT = resolve('.impeccable/review');
mkdirSync(OUT, { recursive: true });

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

/** `at` is a selector, a fraction of that element's own height, or 'end'. */
const shots = [
  { name: 'desktop', path: '/', at: 'top' },
  { name: 'desktop-idea', path: '/', at: '#ideja', into: 0.15 },
  { name: 'desktop-scene-day', path: '/', at: '#ora', into: 0.2 },
  { name: 'desktop-scene-dusk', path: '/', at: '#ora', into: 0.74 },
  { name: 'desktop-scene-night', path: '/', at: '#ora', into: 0.95 },
  { name: 'desktop-explore', path: '/', at: '#qoshet', into: 0.06 },
  { name: 'desktop-explore-2', path: '/', at: '#qoshet', into: 0.4 },
  { name: 'desktop-explore-3', path: '/', at: '#qoshet', into: 0.82 },
  { name: 'desktop-map-head', path: '/', at: '#harta', into: 0 },
  { name: 'desktop-map', path: '/', at: '#harta', into: 0.12 },
  { name: 'desktop-culture', path: '/', at: '#zakoni', into: 0.15 },
  { name: 'desktop-close', path: '/', at: 'end' },
  { name: 'detail-top', path: '/qoshe/streha', at: 'top' },
  { name: 'detail-mid', path: '/qoshe/streha', at: 'top', offset: 900 },
  { name: 'detail-nearby', path: '/qoshe/streha', at: 'end' },
  { name: 'mobile', path: '/', at: 'top', mobile: true },
  { name: 'mobile-scene', path: '/', at: '#ora', into: 0.5, mobile: true },
  { name: 'mobile-explore', path: '/', at: '#qoshet', into: 0.12, mobile: true },
  { name: 'mobile-map', path: '/', at: '#harta', into: 0.02, mobile: true },
  { name: 'mobile-close', path: '/', at: 'end', mobile: true },
  { name: 'mobile-detail', path: '/qoshe/505', at: 'top', mobile: true },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--enable-gpu', '--use-gl=angle'],
});

const errors = [];
for (const s of shots) {
  const page = await browser.newPage();
  page.on('pageerror', (e) => errors.push(`${s.name}: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`${s.name}: ${m.text()}`);
  });
  await page.setViewport({
    width: s.mobile ? 390 : 1440,
    height: s.mobile ? 844 : 900,
    deviceScaleFactor: 2,
    isMobile: Boolean(s.mobile),
    hasTouch: Boolean(s.mobile),
  });
  await page.goto(BASE + s.path, { waitUntil: 'networkidle0', timeout: 45000 });
  // Let the preloader clear and entrance motion settle before judging anything.
  await new Promise((r) => setTimeout(r, 2800));

  await page.evaluate(
    ({ at, into, offset }) => {
      if (at === 'top') return window.scrollTo(0, offset ?? 0);
      if (at === 'end') return window.scrollTo(0, document.body.scrollHeight);
      const el = document.querySelector(at);
      if (!el) throw new Error(`no element for ${at}`);
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + el.offsetHeight * (into ?? 0) + (offset ?? 0));
    },
    { at: s.at, into: s.into, offset: s.offset },
  );
  await new Promise((r) => setTimeout(r, 2200));
  await page.screenshot({ path: `${OUT}/${s.name}.png` });
  await page.close();
  console.log('shot', s.name);
}

await browser.close();
if (errors.length) {
  console.log('\n--- page errors ---');
  for (const e of [...new Set(errors)]) console.log(e);
} else {
  console.log('\nno page errors');
}
