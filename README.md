# Tu Parada en Cuenca

Website for the guest house Tu Parada en Cuenca (Estévez de Toral 13-90 y Pío Bravo, Cuenca, Ecuador).
Astro, static, Spanish at the root and English under `/en/`. Built from the Giza Pyramids View Guest
House site: the same search box → availability list → room pages → three-step checkout → WhatsApp request.

Everything on the site comes from the house's own website (sites.google.com/view/guesthousecuencaecuador,
read 2026-11-20). Nothing has been confirmed with the owner yet; see "To confirm".

## Run

    npm install
    npm run build
    npx astro preview --port 4329 --host 127.0.0.1    # http://127.0.0.1:4329/tu-parada-cuenca/

    node scripts/flow.mjs [en]          # the booking path end to end (needs the preview running)
    node scripts/shots.mjs work/shots 390 "" la-casa/    # full-page screenshots
    node scripts/og.mjs                 # share image and touch icons

## What the owner edits: `src/data/content.json`

- `rooms[].one` / `two`: dollars a night for one guest and for two; `null` shows "A consultar".
- `longStay`: `{ "nights": 30, "percent": 15 }`, or `null` for no discount.
- `luggage[].price`: dollars a day for each of the four sizes.
- `contact`: phone, WhatsApp, email.
- `availabilityUrl`: see below.

`src/data/content.ts` checks the file at build time; a wrong value stops the build.

## Pricing

`quote()` in `src/lib/stay.ts`: every picked room takes one guest, guests left over go to the rooms
that sleep two, nights × rate, minus the long-stay discount. A room with no published rate makes
the whole estimate "the house sends you the total". The estimate goes into the WhatsApp message.

## Availability

With `availabilityUrl` empty the site blocks nothing and the house confirms on WhatsApp. To block
booked dates, the URL must answer with JSON, one list of `[check-in, check-out]` per room id:

    { "mini-suite-ab": [], "mini-suite-vt": [["2026-12-01", "2026-12-31"]], "eco": [], "master-suite": [] }

The house's Google Sheet can serve this from Apps Script. Assuming a sheet "Reservas" with columns
Habitación, Ingreso, Salida, Estado, add to the script and deploy as a web app ("Anyone"):

    const IDS = { 'MiniSuite AB': 'mini-suite-ab', 'MiniSuite VT': 'mini-suite-vt', 'Habitación Eco': 'eco', 'Master Suite': 'master-suite' };
    function doGet() {
      const rows = SpreadsheetApp.getActive().getSheetByName('Reservas').getDataRange().getValues().slice(1);
      const out = { 'mini-suite-ab': [], 'mini-suite-vt': [], 'eco': [], 'master-suite': [] };
      const d = (v) => Utilities.formatDate(new Date(v), 'America/Guayaquil', 'yyyy-MM-dd');
      rows.forEach(([room, cin, cout, state]) => { if (IDS[room] && state !== 'Cancelada') out[IDS[room]].push([d(cin), d(cout)]); });
      return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
    }

The room names in `IDS` must match the sheet's. This has not been tried against his sheet.

## To confirm with the owner

- Nightly rates of Mini Suite AB, Habitación Eco and Master Suite (only Mini Suite VT, US$18 / US$35, is known).
- The long-stay discount: 15% from 30 nights is read off one screenshot of his form.
- "1 huésped por habitación" on his house-rules card contradicts the two-person rooms; the rule is left out.
- Which room the three grey-tiled bathroom photos belong to (his page shows them under both Eco and Master Suite; here they are under Eco).
- Check-in and check-out times (none published; the site only says the house is open 08:00–22:00).
- Sharper photos: most are 720 px wide; sala, cocina and patio are under 400 px.
- Guests' faces in the dining-table photo: it is on his own site, but ask before publishing it on a new one.

## Not built

- The owner's dashboard (`/admin/`) from the Giza site.
- Online payment.
- Publishing: there is no GitHub repository yet; `astro.config.mjs` assumes `/tu-parada-cuenca` on GitHub Pages.
