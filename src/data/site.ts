/**
 * Every public fact about Tu Parada en Cuenca, in one place. Only what the house already
 * publishes on its own website (sites.google.com/view/guesthousecuencaecuador, read 2026-11-20)
 * goes here. Prices and contact details come in from content.json.
 */
import { CONTENT, digitsOnly } from './content';

const cfg = Object.fromEntries(CONTENT.rooms.map((r) => [r.id, r]));

export const SITE = {
  url: 'https://jeeveshverma.github.io/tu-parada-cuenca',
  name: { es: 'Tu Parada en Cuenca', en: 'Tu Parada en Cuenca' },
  kind: { es: 'Casa de huéspedes', en: 'Guest house' },
  city: { es: 'Cuenca', en: 'Cuenca' },
  region: { es: 'Azuay', en: 'Azuay' },
  country: { es: 'Ecuador', en: 'Ecuador' },
  /** As the house writes it: Estévez de Toral 13-90 y Pío Bravo. */
  street: { es: 'Estévez de Toral 13-90 y Pío Bravo', en: 'Estévez de Toral 13-90 and Pío Bravo' },
  /** The house's own pin on OpenStreetMap ("Tu parada en Cuenca"), which matches the Google Maps link on its website. */
  geo: { lat: -2.890776, lng: -79.008802 },
  mapsUrl: 'https://maps.app.goo.gl/hS1tm2KrJ4RqwiBf8',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-2.890776,-79.008802',
  whatsapp: digitsOnly(CONTENT.contact.whatsapp),
  whatsappDisplay: CONTENT.contact.whatsapp,
  phone: '+' + digitsOnly(CONTENT.contact.phone),
  phoneDisplay: CONTENT.contact.phone,
  email: CONTENT.contact.email,
  facebook: 'https://www.facebook.com/tuparadaencuenca',
  instagram: 'https://www.instagram.com/tu_parada_ec/',
  /** "Horario de lunes a domingo, 8:00 – 22:00", as published. */
  hours: { open: '08:00', close: '22:00' },
  /** The speed test the house shows on its website: 385 Mbps down, 386 up. */
  wifi: { down: 385, up: 386 },
  /** House rules, from the "Convivencia en casa" card. */
  quietFrom: '23:00',
  quietUntil: '06:00',
  longStay: CONTENT.longStay,
  availabilityUrl: CONTENT.availabilityUrl,
} as const;

export const LUGGAGE = CONTENT.luggage;

export type RoomId = 'mini-suite-ab' | 'mini-suite-vt' | 'eco' | 'master-suite';

/** What a room has, as its listing on the house's website states and its photos show. */
export type Feature = 'kitchenette' | 'coffee' | 'kettle' | 'fridge' | 'desk' | 'reading' | 'dining' | 'closet' | 'wifi';
export type Bath = 'ensuite' | 'across';

export interface Room {
  id: RoomId;
  hero: string;
  photos: string[];
  beds: { double?: number; single?: number };
  /** how many guests the room takes */
  sleeps: number;
  /** a private bathroom inside the room, or a private one across the corridor */
  bath: Bath;
  features: Feature[];
  /** how many rooms of this kind there are */
  max: number;
  /** US dollars a night for one guest and for two; null shows "on request" */
  one: number | null;
  two: number | null;
}

export const ROOMS: Room[] = ([
  { id: 'mini-suite-ab', hero: 'ab-bed', photos: ['ab-bed', 'ab-kitchen', 'ab-wide', 'ab-door', 'ab-bath'], beds: { single: 1 }, sleeps: 1, bath: 'ensuite', features: ['kitchenette', 'kettle', 'fridge', 'desk', 'wifi'] },
  { id: 'mini-suite-vt', hero: 'vt-bed', photos: ['vt-bed', 'vt-lamp', 'vt-kitchen', 'vt-desk', 'vt-bath', 'vt-basin'], beds: { double: 1 }, sleeps: 2, bath: 'ensuite', features: ['kitchenette', 'kettle', 'fridge', 'desk', 'wifi'] },
  { id: 'eco', hero: 'eco-bed', photos: ['eco-bed', 'eco-window', 'eco-desk', 'bath-curtain', 'bath-shower', 'bath-basin'], beds: { double: 1 }, sleeps: 1, bath: 'across', features: ['kettle', 'fridge', 'desk', 'wifi'] },
  { id: 'master-suite', hero: 'ms-wide', photos: ['ms-wide', 'ms-bed', 'ms-dining', 'ms-closet', 'ms-window', 'ms-desk', 'ms-kitchen'], beds: { double: 1 }, sleeps: 2, bath: 'ensuite', features: ['closet', 'coffee', 'fridge', 'dining', 'desk', 'reading', 'wifi'] },
] as Omit<Room, 'max' | 'one' | 'two'>[]).map((r) => ({ ...r, max: cfg[r.id].count, one: cfg[r.id].one, two: r.sleeps >= 2 ? cfg[r.id].two : null }));

/** What the booking scripts need to price a stay in the browser. */
export const RATES = Object.fromEntries(ROOMS.map((r) => [r.id, { one: r.one, two: r.two, sleeps: r.sleeps }]));
