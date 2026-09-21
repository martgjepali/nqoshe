/**
 * Review captures. Drives the locally installed Chrome so nothing is downloaded.
 *   node scripts/shoot.mjs [baseUrl]
 * Writes .impeccable/review/*.png
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = process.argv[2] ?? 'http://localhost:5180';
const OUT = resolve('.impeccable/review');
mkdirSync(OUT, { recursive: true });

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const shots = [
  { name: 'desktop-hero', path: '/', w: 1440, h: 900, scroll: 0 },
  { name: 'desktop-idea', path: '/', w: 1440, h: 900, scroll: 1.0 },
  { name: 'desktop-ora-a', path: '/', w: 1440, h: 900, scroll: 2.6 },
  { name: 'desktop-ora-b', path: '/', w: 1440, h: 900, scroll: 4.2 },
  { name: 'desktop-explore', path: '/', w: 1440, h: 900, scroll: 6.2 },
  { name: 'desktop-explore-b', path: '/', w: 1440, h: 900, scroll: 8.0 },
  { name: 'desktop-map', path: '/', w: 1440, h: 900, scroll: 11.4 },
  { name: 'desktop-culture', path: '/', w: 1440, h: 900, scroll: 12.6 },
  { name: 'desktop-close', path: '/', w: 1440, h: 900, scroll: 99 },
  { name: 'detail-top', path: '/qoshe/streha', w: 1440, h: 900, scroll: 0 },
  { name: 'detail-body', path: '/qoshe/streha', w: 1440, h: 900, scroll: 0.85 },
  { name: 'mobile-hero', path: '/', w: 390, h: 844, scroll: 0, mobile: true },
  { name: 'mobile-explore', path: '/', w: 390, h: 844, scroll: 7.5, mobile: true },
  { name: 'mobile-detail', path: '/qoshe/streha', w: 390, h: 844, scroll: 0.7, mobile: true },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--force-device-scale-factor=1', '--hide-scrollbars', '--enable-gpu', '--use-gl=angle'],
});

const errors = [];
for (const s of shots) {
  const page = await browser.newPage();
  page.on('pageerror', (e) => errors.push(`${s.name}: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`${s.name} console: ${m.text()}`);
  });
  await page.setViewport({
    width: s.w,
    height: s.h,
    deviceScaleFactor: 2,
    isMobile: Boolean(s.mobile),
    hasTouch: Boolean(s.mobile),
  });
  await page.goto(BASE + s.path, { waitUntil: 'networkidle0', timeout: 45000 });
  // Let the preloader clear and entrance motion settle before judging anything.
  await new Promise((r) => setTimeout(r, 2600));
  await page.evaluate((mult) => {
    const y = mult >= 99 ? document.body.scrollHeight : window.innerHeight * mult;
    window.scrollTo(0, y);
  }, s.scroll);
  await new Promise((r) => setTimeout(r, 2200));
  await page.screenshot({ path: `${OUT}/${s.name}.png` });
  await page.close();
  console.log('shot', s.name);
}

await browser.close();
if (errors.length) {
  console.log('\n--- page errors ---');
  for (const e of [...new Set(errors)]) console.log(e);
}
