/**
 * The photo catalogue: every master in src/assets/photos/, what it shows, which group it belongs
 * to and alt text in both languages. Placement on the site follows `group` and the room lists in
 * site.ts — nothing is placed by filename.
 *
 * Source: all of them are the house's own photos, taken from its website on 2026-11-20. Most are
 * 720 px wide and three (sala, cocina, patio) are under 400 px, so those three are only ever shown
 * small. Better originals from the owner would replace them one for one.
 */
export type Group = 'room' | 'bathroom' | 'house';

export interface Photo { id: string; group: Group; alt: { es: string; en: string }; caption?: { es: string; en: string } }

export const PHOTOS: Photo[] = [
  // Master Suite
  { id: 'ms-wide', group: 'room', alt: { es: 'Master Suite: cama doble con cabecera de madera, escritorio junto a la ventana con cortina roja y piso de madera', en: 'Master Suite: a double bed with a wooden headboard, a desk by the red-curtained window and a wooden floor' }, caption: { es: 'Master Suite', en: 'Master Suite' } },
  { id: 'ms-bed', group: 'room', alt: { es: 'Master Suite: la cama frente al clóset de madera de pared a pared y el escritorio', en: 'Master Suite: the bed facing the wall-to-wall wooden closet and the desk' }, caption: { es: 'Cama y clóset', en: 'Bed and closet' } },
  { id: 'ms-dining', group: 'room', alt: { es: 'Master Suite: mesa de comedor con dos sillas, el clóset y la cafetería al fondo', en: 'Master Suite: a dining table with two chairs, the closet and the coffee corner behind' }, caption: { es: 'Mesa para comer en la habitación', en: 'A table to eat in the room' } },
  { id: 'ms-closet', group: 'room', alt: { es: 'Master Suite desde la cama: clóset con cajones y la puerta al baño', en: 'Master Suite from the bed: the closet with drawers and the door to the bathroom' }, caption: { es: 'Desde la cama', en: 'From the bed' } },
  { id: 'ms-window', group: 'room', alt: { es: 'Master Suite: la cama doble y la ventana con cortinas rojas, el sol en el piso', en: 'Master Suite: the double bed and the window with red curtains, sun on the floor' }, caption: { es: 'Sol de la mañana', en: 'Morning sun' } },
  { id: 'ms-desk', group: 'room', alt: { es: 'Master Suite: clóset de madera y escritorio de lectura con lámpara', en: 'Master Suite: the wooden closet and a reading desk with a lamp' }, caption: { es: 'Escritorio de lectura', en: 'Reading desk' } },
  { id: 'ms-kitchen', group: 'room', alt: { es: 'Master Suite: rincón de cafetería con lavabo, cafetera, hervidor, vajilla y nevera', en: 'Master Suite: the coffee corner with a sink, coffee maker, kettle, crockery and a fridge' }, caption: { es: 'Cafetería y nevera', en: 'Coffee corner and fridge' } },

  // Mini Suite VT
  { id: 'vt-bed', group: 'room', alt: { es: 'Mini Suite VT: cama doble con cubrecama floreado, mesita con lámpara, nevera y mini cocina al fondo', en: 'Mini Suite VT: a double bed with a flowered cover, a bedside lamp, a fridge and the mini kitchen behind' }, caption: { es: 'Mini Suite VT', en: 'Mini Suite VT' } },
  { id: 'vt-lamp', group: 'room', alt: { es: 'Mini Suite VT: la cama doble con dos almohadas y la lámpara encendida', en: 'Mini Suite VT: the double bed with two pillows and the lamp on' }, caption: { es: 'Cama doble', en: 'Double bed' } },
  { id: 'vt-kitchen', group: 'room', alt: { es: 'Mini Suite VT: mini cocina con lavabo, hervidor, tostadora y repisa con vajilla', en: 'Mini Suite VT: the mini kitchen with a sink, kettle, toaster and a shelf of crockery' }, caption: { es: 'Mini cocina', en: 'Mini kitchen' } },
  { id: 'vt-desk', group: 'room', alt: { es: 'Mini Suite VT: escritorio con silla y nevera', en: 'Mini Suite VT: a desk with a chair and the fridge' }, caption: { es: 'Escritorio y nevera', en: 'Desk and fridge' } },
  { id: 'vt-bath', group: 'bathroom', alt: { es: 'Baño de la Mini Suite VT: ducha con cortina, lavabo verde y espejo con marco de madera', en: 'Mini Suite VT bathroom: a shower with a curtain, a green basin and a wood-framed mirror' }, caption: { es: 'Baño dentro de la suite', en: 'Bathroom inside the suite' } },
  { id: 'vt-basin', group: 'bathroom', alt: { es: 'Baño de la Mini Suite VT: lavabo e inodoro verdes y espejo', en: 'Mini Suite VT bathroom: the green basin and toilet and the mirror' }, caption: { es: 'Lavabo', en: 'Basin' } },

  // Mini Suite AB
  { id: 'ab-bed', group: 'room', alt: { es: 'Mini Suite AB: cama individual con almohadas amarillas, lámpara encendida y mesón con hervidor, tostadora y nevera', en: 'Mini Suite AB: a single bed with yellow pillows, a lamp on, and a counter with a kettle, toaster and fridge' }, caption: { es: 'Mini Suite AB', en: 'Mini Suite AB' } },
  { id: 'ab-kitchen', group: 'room', alt: { es: 'Mini Suite AB: mesón con lavabo, el baño con la puerta abierta y la cama', en: 'Mini Suite AB: the counter with a sink, the bathroom with its door open, and the bed' }, caption: { es: 'Mesón, baño y cama', en: 'Counter, bathroom and bed' } },
  { id: 'ab-wide', group: 'room', alt: { es: 'Mini Suite AB vista desde la entrada: mesón, ducha con cortina y cama individual', en: 'Mini Suite AB from the door: the counter, the shower with its curtain and the single bed' }, caption: { es: 'Desde la entrada', en: 'From the door' } },
  { id: 'ab-door', group: 'room', alt: { es: 'Mini Suite AB: la cama individual y el mesón con la puerta del baño cerrada', en: 'Mini Suite AB: the single bed and the counter with the bathroom door closed' }, caption: { es: 'Cama individual', en: 'Single bed' } },
  { id: 'ab-bath', group: 'bathroom', alt: { es: 'Baño de la Mini Suite AB: ducha, lavabo blanco e inodoro, paredes de mármol claro', en: 'Mini Suite AB bathroom: a shower, a white basin and toilet, pale marble walls' }, caption: { es: 'Baño dentro de la suite', en: 'Bathroom inside the suite' } },

  // Habitación Eco
  { id: 'eco-bed', group: 'room', alt: { es: 'Habitación Eco: cama doble con cubrecama naranja, cortinas rojas y mesita con hervidor y tazas', en: 'Eco Room: a double bed with an orange cover, red curtains and a small table with a kettle and cups' }, caption: { es: 'Habitación Eco', en: 'Eco Room' } },
  { id: 'eco-window', group: 'room', alt: { es: 'Habitación Eco: la ventana con visillo, el escritorio y la cama', en: 'Eco Room: the net-curtained window, the desk and the bed' }, caption: { es: 'Ventana y escritorio', en: 'Window and desk' } },
  { id: 'eco-desk', group: 'room', alt: { es: 'Habitación Eco: escritorio de madera con repisas, nevera, hervidor y tazas', en: 'Eco Room: a wooden desk with shelves, a fridge, a kettle and cups' }, caption: { es: 'Escritorio, nevera y hervidor', en: 'Desk, fridge and kettle' } },
  { id: 'bath-curtain', group: 'bathroom', alt: { es: 'Baño privado: ducha con cortina blanca, lavabo y repisas', en: 'Private bathroom: a shower with a white curtain, a basin and shelves' }, caption: { es: 'Baño privado', en: 'Private bathroom' } },
  { id: 'bath-shower', group: 'bathroom', alt: { es: 'Baño privado: ducha, inodoro y estantería blanca', en: 'Private bathroom: the shower, the toilet and a white shelf unit' }, caption: { es: 'Ducha', en: 'Shower' } },
  { id: 'bath-basin', group: 'bathroom', alt: { es: 'Baño privado: lavabo de pedestal y espejo, baldosa gris', en: 'Private bathroom: a pedestal basin and mirror, grey tiles' }, caption: { es: 'Lavabo y espejo', en: 'Basin and mirror' } },

  // the house
  { id: 'mesa', group: 'house', alt: { es: 'Cinco huéspedes sonríen alrededor de la mesa del comedor, con platos y bebidas', en: 'Five guests smiling around the dining table, with plates and drinks' }, caption: { es: 'La mesa del comedor', en: 'The dining table' } },
  { id: 'sala', group: 'house', alt: { es: 'La sala de estar: sofás, chimenea de ladrillo, televisor y piso de madera', en: 'The living room: sofas, a brick fireplace, a television and a wooden floor' }, caption: { es: 'Sala de estar', en: 'Living room' } },
  { id: 'cocina', group: 'house', alt: { es: 'La cocina compartida: muebles de madera, cocina a gas, microondas y pared de ladrillo', en: 'The shared kitchen: wooden cabinets, a gas hob, a microwave and a brick wall' }, caption: { es: 'Cocina compartida', en: 'Shared kitchen' } },
  { id: 'patio', group: 'house', alt: { es: 'El patio con jardín y la zona de BBQ bajo techo', en: 'The garden patio and the covered barbecue corner' }, caption: { es: 'Patio y BBQ', en: 'Patio and barbecue' } },
  { id: 'miau', group: 'house', alt: { es: 'Miau, el gato naranja de la casa, mirando a la cámara', en: 'Miau, the house\'s orange cat, looking at the camera' }, caption: { es: 'Miau', en: 'Miau' } },
];

export const photo = (id: string): Photo => {
  const p = PHOTOS.find((p) => p.id === id);
  if (!p) throw new Error(`Unknown photo id: ${id}`);
  return p;
};
