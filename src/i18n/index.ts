import es from './es.json';
import en from './en.json';

export type Lang = 'es' | 'en';

export const LANGS: { code: Lang; name: string; hreflang: string; dir: 'ltr'; ogLocale: string }[] = [
  { code: 'es', name: 'Español', hreflang: 'es', dir: 'ltr', ogLocale: 'es_EC' },
  { code: 'en', name: 'English', hreflang: 'en', dir: 'ltr', ogLocale: 'en_US' },
];

export const dirOf = (_lang: Lang) => 'ltr' as const;

export type PageKey = 'home' | 'rooms' | 'gallery' | 'casa' | 'enquire' | 'notfound';
export const PAGES: PageKey[] = ['home', 'rooms', 'gallery', 'casa', 'enquire'];

/** Spanish is the site's first language and lives at the root; English lives under /en/ with its own slugs. */
export const SLUG: Record<Lang, Record<PageKey, string>> = {
  es: { home: '', rooms: 'habitaciones/', gallery: 'fotos/', casa: 'la-casa/', enquire: 'reservar/', notfound: '404/' },
  en: { home: '', rooms: 'rooms/', gallery: 'photos/', casa: 'the-house/', enquire: 'book/', notfound: '404/' },
};

const BASE = (import.meta.env.BASE_URL.replace(/\/$/, '') + '/') as string;

/** Site-relative path (includes the GitHub Pages base). `sub` is an extra slug, e.g. a room id. */
export function path(lang: Lang, page: PageKey, sub = ''): string {
  return `${BASE}${lang === 'en' ? 'en/' : ''}${SLUG[lang][page]}${sub ? sub.replace(/\/?$/, '/') : ''}`;
}

/** The same page in the other language. */
export function switchLang(lang: Lang, page: PageKey, sub = ''): string {
  return path(lang === 'en' ? 'es' : 'en', page, sub);
}

type Dict = Record<string, unknown>;
const DICTS: Record<Lang, Dict> = { es: es as Dict, en: en as Dict };

function lookup(dict: Dict, key: string): string | undefined {
  const v = key.split('.').reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Dict)[k] : undefined), dict);
  return typeof v === 'string' ? v : undefined;
}

/** `t('key.path', { name: 'x' })` with {placeholders}; falls back to Spanish, then the key. */
export function useT(lang: Lang) {
  const t = (key: string, vars: Record<string, string | number> = {}): string => {
    const raw = lookup(DICTS[lang], key) ?? lookup(DICTS.es, key) ?? key;
    return raw.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
  };
  /** A list entry of the dictionary (arrays of strings or of pairs). */
  const list = <T = string>(key: string): T[] => {
    const v = key.split('.').reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Dict)[k] : undefined), DICTS[lang]);
    return Array.isArray(v) ? (v as T[]) : [];
  };
  return { t, list, lang, dir: 'ltr' as const };
}

/** Kept so templates read the same in both languages; both use Western digits. */
export function digits(n: number | string, _lang: Lang): string {
  return String(n);
}
