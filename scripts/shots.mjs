// Full-page screenshots of the built site.  node scripts/shots.mjs <outdir> [width] [path ...]
import { chromium } from 'playwright';
import fs from 'fs';
const [out = 'work/shots', width = '1280', ...paths] = process.argv.slice(2);
const BASE = process.env.BASE || 'http://127.0.0.1:4329/tu-parada-cuenca/';
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: Number(width), height: Number(width) < 600 ? 800 : 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', (e) => errs.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
for (const p of paths.length ? paths : ['']) {
  await page.goto(BASE + p, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
  await page.waitForTimeout(400);
  const name = (p.split('?')[0].replace(/\/$/, '').replace(/\//g, '_') || 'home') + `-${width}.png`;
  await page.screenshot({ path: `${out}/${name}`, fullPage: true });
  const ov = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(name, 'overflow-x:', ov);
}
if (errs.length) console.log('ERRORS', errs);
await b.close();
