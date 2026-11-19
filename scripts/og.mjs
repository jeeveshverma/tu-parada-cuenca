// Renders public/og-image.jpg (1200×630): the Master Suite photo on the right, the name and the
// stop marker on paper on the left — what WhatsApp, X and Facebook show when the link is shared.
// Also writes the apple-touch-icon and icon-512 from the mark.   node scripts/og.mjs
import sharp from 'sharp';

const W = 1200, H = 630, PW = 620;
const photo = await sharp('src/assets/photos/ms-wide.jpg').resize(PW, H, { fit: 'cover', position: 'centre' }).toBuffer();
const mark = `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 52L50 20l36 32M70 26v12" stroke="#1b1611" stroke-width="9"/><circle cx="50" cy="66" r="17" stroke="#e8891c" stroke-width="8"/></g><circle cx="50" cy="66" r="6" fill="#e8891c"/>`;
const overlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W - PW}" height="${H}" fill="#f6efe4"/>
  <rect x="${W - PW - 8}" width="8" height="${H}" fill="#e8891c"/>
  <g transform="translate(60 70) scale(1.5)">${mark}</g>
  <text x="60" y="330" font-family="Helvetica, Arial, sans-serif" font-weight="800" font-size="76" fill="#1b1611">TU PARADA</text>
  <text x="60" y="394" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="44" letter-spacing="8" fill="#9a4a06">EN CUENCA</text>
  <text x="60" y="476" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#41392f">Casa de huéspedes · Guest house</text>
  <text x="60" y="514" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#41392f">Estévez de Toral 13-90, Cuenca, Ecuador</text>
</svg>`;
await sharp({ create: { width: W, height: H, channels: 3, background: '#f6efe4' } }).composite([{ input: photo, left: W - PW, top: 0 }, { input: Buffer.from(overlay) }]).jpeg({ quality: 86, mozjpeg: true }).toFile('public/og-image.jpg');

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#f6efe4"/><g transform="translate(10 8) scale(.8)">${mark}</g></svg>`;
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(icon)).resize(512, 512).png().toFile('public/icon-512.png');
console.log('og-image.jpg, apple-touch-icon.png, icon-512.png written');
