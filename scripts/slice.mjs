// Cut a full-page screenshot into viewport-height slices.  node scripts/slice.mjs <png> [sliceHeight]
import sharp from 'sharp';
const [f, h = '1400'] = process.argv.slice(2);
const m = await sharp(f).metadata();
for (let y = 0, i = 0; y < m.height; y += Number(h), i++) await sharp(f).extract({ left: 0, top: y, width: m.width, height: Math.min(Number(h), m.height - y) }).toFile(f.replace('.png', `-s${i}.png`));
console.log(Math.ceil(m.height / Number(h)), 'slices');
