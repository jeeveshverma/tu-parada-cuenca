/**
 * The stops around the house, in the order of "the line" drawn on the site. Coordinates are each
 * place's OpenStreetMap pin (looked up 2026-11-20). Distance and walking minutes are computed at
 * build time in src/lib/geo.ts — nothing here is typed by hand.
 */
import type { LatLng } from '../lib/geo';

export interface Place { id: string; name: { es: string; en: string }; blurb: { es: string; en: string }; at: LatLng; kind: 'walk' | 'ride'; transport?: boolean }

export const PLACES: Place[] = [
  { id: 'bus', kind: 'walk', transport: true, at: { lat: -2.8906325, lng: -79.0084395 }, name: { es: 'Parada de bus Pío Bravo', en: 'Pío Bravo bus stop' }, blurb: { es: 'Líneas 8 y 27.', en: 'Lines 8 and 27.' } },
  { id: 'santa-ana', kind: 'walk', at: { lat: -2.889912, lng: -79.007455 }, name: { es: 'Plaza Santa Ana', en: 'Plaza Santa Ana' }, blurb: { es: 'Galería comercial del barrio.', en: 'The neighbourhood shopping arcade.' } },
  { id: 'tram', kind: 'walk', transport: true, at: { lat: -2.8934105, lng: -79.0099852 }, name: { es: 'Tranvía, parada Mercado 3 de Noviembre', en: 'Tram, Mercado 3 de Noviembre stop' }, blurb: { es: 'El tranvía cruza el centro histórico.', en: 'The tram runs through the historic centre.' } },
  { id: 'calderon', kind: 'walk', at: { lat: -2.897394, lng: -79.004468 }, name: { es: 'Parque Calderón', en: 'Parque Calderón' }, blurb: { es: 'La plaza central, entre la Catedral Vieja y la Nueva.', en: 'The main square, between the Old Cathedral and the New.' } },
  { id: 'catedral', kind: 'walk', at: { lat: -2.897326, lng: -79.005397 }, name: { es: 'Catedral de la Inmaculada', en: 'Cathedral of the Immaculate Conception' }, blurb: { es: 'La Catedral Nueva, la de las cúpulas azules.', en: 'The New Cathedral, the one with the blue domes.' } },
  { id: 'flores', kind: 'walk', at: { lat: -2.897692, lng: -79.005816 }, name: { es: 'Plaza de las Flores', en: 'Plaza de las Flores' }, blurb: { es: 'El mercado de flores, junto al Carmen de la Asunción.', en: 'The flower market, beside the Carmen de la Asunción church.' } },
  { id: 'mercado', kind: 'walk', at: { lat: -2.899243, lng: -79.007561 }, name: { es: 'Mercado 10 de Agosto', en: 'Mercado 10 de Agosto' }, blurb: { es: 'Mercado de comida, frutas y jugos.', en: 'A market for food, fruit and juices.' } },
  { id: 'puente-roto', kind: 'walk', at: { lat: -2.904104, lng: -79.001247 }, name: { es: 'Puente Roto y río Tomebamba', en: 'Puente Roto and the Tomebamba river' }, blurb: { es: 'El Barranco y el paseo junto al río.', en: 'El Barranco and the riverside walk.' } },
  { id: 'terminal', kind: 'ride', transport: true, at: { lat: -2.892162, lng: -78.993194 }, name: { es: 'Terminal Terrestre', en: 'Bus terminal (Terminal Terrestre)' }, blurb: { es: 'Buses a Quito, Guayaquil y Loja.', en: 'Buses to Quito, Guayaquil and Loja.' } },
  { id: 'pumapungo', kind: 'ride', at: { lat: -2.906138, lng: -78.996844 }, name: { es: 'Museo Pumapungo', en: 'Pumapungo Museum' }, blurb: { es: 'El museo y su parque arqueológico inca.', en: 'The museum and its Inca archaeological park.' } },
  { id: 'aeropuerto', kind: 'ride', transport: true, at: { lat: -2.889385, lng: -78.984949 }, name: { es: 'Aeropuerto Mariscal Lamar', en: 'Mariscal Lamar Airport' }, blurb: { es: 'El aeropuerto de Cuenca, dentro de la ciudad.', en: 'Cuenca\'s airport, inside the city.' } },
  { id: 'turi', kind: 'ride', at: { lat: -2.922318, lng: -79.01007 }, name: { es: 'Mirador de Turi', en: 'Turi viewpoint' }, blurb: { es: 'Toda Cuenca desde arriba.', en: 'All of Cuenca from above.' } },
];

export const place = (id: string) => PLACES.find((p) => p.id === id)!;
