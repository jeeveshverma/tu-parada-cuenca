/**
 * What the owner changes most often, kept apart from the code: the nightly rate of each room (for
 * one guest and, where the room sleeps two, for two), the long-stay discount, the luggage-storage
 * prices, the phone, WhatsApp and email, and the address of the availability feed. The checks
 * here stop the build when the file is edited by hand and got wrong, so a typo never reaches the site.
 */
import raw from './content.json';

export const ROOM_IDS = ['mini-suite-ab', 'mini-suite-vt', 'eco', 'master-suite'] as const;
export const LUGGAGE_IDS = ['xs', 's', 'm', 'l'] as const;

export interface Content {
  rooms: { id: (typeof ROOM_IDS)[number]; one: number | null; two: number | null; count: number }[];
  /** A stay of `nights` nights or more gets `percent` off; null for no discount. */
  longStay: { nights: number; percent: number } | null;
  luggage: { id: (typeof LUGGAGE_IDS)[number]; price: number }[];
  contact: { phone: string; whatsapp: string; email: string };
  /** A URL that answers with the booked nights of each room as JSON (see README); empty until the owner has one. */
  availabilityUrl: string;
}

const PHONE = /^\+\d[\d ]{7,18}\d$/;

function check(c: Content): Content {
  const bad = (msg: string): never => { throw new Error(`src/data/content.json: ${msg}`); };
  const price = (v: number | null) => v === null || (typeof v === 'number' && v >= 1 && v <= 9999);
  if (c.rooms.map((r) => r.id).join() !== ROOM_IDS.join()) bad(`rooms must be ${ROOM_IDS.join(', ')} in that order`);
  for (const r of c.rooms) {
    if (!price(r.one) || !price(r.two)) bad(`${r.id}: "one" and "two" must be dollars a night, or null`);
    if (!(Number.isInteger(r.count) && r.count >= 1 && r.count <= 9)) bad(`${r.id}: count must be 1 to 9`);
  }
  if (c.longStay && !(c.longStay.nights >= 2 && c.longStay.percent > 0 && c.longStay.percent < 100)) bad('longStay needs nights (2 or more) and percent (1 to 99), or null');
  if (c.luggage.map((l) => l.id).join() !== LUGGAGE_IDS.join()) bad(`luggage must be ${LUGGAGE_IDS.join(', ')} in that order`);
  for (const k of ['phone', 'whatsapp'] as const) if (!PHONE.test(c.contact[k])) bad(`contact.${k} must look like +593 99 955 1028`);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c.contact.email)) bad('contact.email is not an email address');
  if (c.availabilityUrl && !/^https:\/\//.test(c.availabilityUrl)) bad('availabilityUrl must start with https://, or be empty');
  return c;
}

export const CONTENT = check(raw as Content);
export const digitsOnly = (s: string) => s.replace(/\D/g, '');
