/**
 * The availability feed. When content.json has an `availabilityUrl`, the site asks it once per
 * page for the nights already booked and blocks those rooms for dates that overlap. The feed is
 * JSON, one list of [check-in, check-out] pairs per room id, dates as YYYY-MM-DD:
 *
 *   { "mini-suite-vt": [["2026-12-01", "2026-12-31"]], "eco": [] }
 *
 * The house's Google Sheet can serve exactly this from Apps Script (README, "Availability").
 * With no URL, or when the feed fails, nothing is blocked and the house confirms on WhatsApp.
 */
export type Booked = Record<string, [string, string][]>;

let cache: Promise<Booked> | null = null;

export function loadBooked(url: string): Promise<Booked> {
  if (!url) return Promise.resolve({});
  cache ??= fetch(url, { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : {}))
    .then((j) => (j && typeof j === 'object' ? (j as Booked) : {}))
    .catch(() => ({}));
  return cache;
}

/** A stay overlaps a booking when it starts before the booking ends and ends after it starts (the check-out day is free). */
export function isTaken(b: Booked, room: string, cin: string, cout: string): boolean {
  return (b[room] || []).some(([a, z]) => cin < z && cout > a);
}
