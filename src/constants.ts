export const LIKES_NEEDED = 1000;
export const ID_NONE = -1;
export const ID_404 = 0;
export const TURN_DELAY = 500;
export const DEFAULT_TIMEOUT = 8000;

export interface Product {
  id: number;
  name: string;
  value: number;
  type: 'CREATURE' | 'COLOR' | 'CLASS' | 'STORAGE';
  bundle: BUNDLE_INDEX;
  color?: string;
}

export enum BUNDLE_INDEX {
  WILD_ANIMALS = 1,
  LEGENDARY_CREATURES,
  UNICORM,
  DRAGON,
  COLORS,
  CLASSES,
  CREATURE_STORAGE,
  COLOR_STORAGE,
  CLASS_STORAGE,
}

export interface ProductBundle {
  id: BUNDLE_INDEX;
  name: string;
  price: number;
  desc: string;
  type: 'CARD_PACK' | 'MULTIPLIER';
}

export const PRODUCT_BUNDLES: ProductBundle[] = [
  {
    id: BUNDLE_INDEX.WILD_ANIMALS,
    name: 'Wild Animals',
    price: 10,
    desc: 'Basic deck with ordinary animals',
    type: 'CARD_PACK',
  },
  {
    id: BUNDLE_INDEX.LEGENDARY_CREATURES,
    name: 'Legendary Creatures',
    price: 50,
    desc: 'Advanced deck with legendary creatures !',
    type: 'CARD_PACK',
  },
  {
    id: BUNDLE_INDEX.UNICORM,
    name: 'Unicorn',
    price: 100,
    desc: 'Premium Unicorn card !',
    type: 'CARD_PACK',
  },
  {
    id: BUNDLE_INDEX.DRAGON,
    name: 'Dragon',
    price: 200,
    desc: 'Supreme Dragon card !!',
    type: 'CARD_PACK',
  },
  {
    id: BUNDLE_INDEX.COLORS,
    name: 'Colors',
    price: 30,
    desc: 'Color cards to decorate a creature and multiply the Likes of the creature',
    type: 'MULTIPLIER',
  },
  {
    id: BUNDLE_INDEX.CLASSES,
    name: 'Classes',
    price: 80,
    desc: 'Class cards to decorate a creature and multiply the Likes of the creature',
    type: 'MULTIPLIER',
  },
];

export const CREATURES: Product[] = [
  {
    id: 1,
    name: 'Chicken',
    value: 1,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.WILD_ANIMALS,
  },
  {
    id: 2,
    name: 'Rabbit',
    value: 2,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.WILD_ANIMALS,
  },
  {
    id: 3,
    name: 'Lizard',
    value: 3,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.WILD_ANIMALS,
  },
  {
    id: 4,
    name: 'Wolf',
    value: 4,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.WILD_ANIMALS,
  },
  {
    id: 5,
    name: 'Bear',
    value: 5,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.WILD_ANIMALS,
  },
  {
    id: 6,
    name: 'Goblin',
    value: 3,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.LEGENDARY_CREATURES,
    color: '#ffe34f',
  },
  {
    id: 7,
    name: 'Orc',
    value: 4,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.LEGENDARY_CREATURES,
    color: '#ffe34f',
  },
  {
    id: 8,
    name: 'Fairy',
    value: 5,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.LEGENDARY_CREATURES,
    color: '#ffe34f',
  },
  {
    id: 9,
    name: 'Wyvern',
    value: 6,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.LEGENDARY_CREATURES,
    color: '#ffe34f',
  },
  {
    id: 10,
    name: 'Griffin',
    value: 7,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.LEGENDARY_CREATURES,
    color: '#ffe34f',
  },
  {
    id: 11,
    name: 'Unicorn',
    value: 10,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.UNICORM,
    color: 'linear-gradient(135deg, rgba(255,61,61,1) 0%, rgba(248,138,51,1) 16%, rgba(240,236,41,1) 32%, rgba(57,255,48,1) 48%, rgba(54,255,214,1) 64%, rgba(46,80,255,1) 83%, rgba(210,51,255,1) 100%)',
  },
  {
    id: 12,
    name: 'Dragon',
    value: 50,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.DRAGON,
    color: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(228,210,24,1) 54%, rgba(255,61,61,1) 100%)',
  },
];

export const COLORS: Product[] = [
  {
    id: 13,
    name: 'Gray',
    value: 2,
    type: 'COLOR',
    bundle: BUNDLE_INDEX.COLORS,
    color: '#c7c7c7',
  },
  {
    id: 14,
    name: 'White',
    value: 3,
    type: 'COLOR',
    bundle: BUNDLE_INDEX.COLORS,
    color: '#ffffff',
  },
  {
    id: 15,
    name: 'Bronze',
    value: 4,
    type: 'COLOR',
    bundle: BUNDLE_INDEX.COLORS,
    color: 'linear-gradient(135deg, rgba(189,122,0,1) 0%, rgba(251,251,251,1) 70%, rgba(189,122,0,1) 100%)',
  },
  {
    id: 16,
    name: 'Silver',
    value: 5,
    type: 'COLOR',
    bundle: BUNDLE_INDEX.COLORS,
    color: 'linear-gradient(135deg, rgba(213,213,213,1) 0%, rgba(251,251,251,1) 70%, rgba(213,213,213,1) 100%)',
  },
  {
    id: 17,
    name: 'Golden',
    value: 6,
    type: 'COLOR',
    bundle: BUNDLE_INDEX.COLORS,
    color: 'linear-gradient(135deg, rgba(255,215,0,1) 0%, rgba(251,251,251,1) 70%, rgba(255,215,0,1) 100%)',
  },
];

export const CLASSES: Product[] = [
  {
    id: 18,
    name: 'Common',
    value: 2,
    type: 'CLASS',
    bundle: BUNDLE_INDEX.CLASSES,
    color: '#000000'
  },
  {
    id: 19,
    name: 'Uncommon',
    value: 3,
    type: 'CLASS',
    bundle: BUNDLE_INDEX.CLASSES,
    color: '#00d358',
  },
  {
    id: 20,
    name: 'Rare',
    value: 4,
    type: 'CLASS',
    bundle: BUNDLE_INDEX.CLASSES,
    color: '#0084ff',
  },
  {
    id: 21,
    name: 'Epic',
    value: 5,
    type: 'CLASS',
    bundle: BUNDLE_INDEX.CLASSES,
    color: '#aa00e9',
  },
  {
    id: 22,
    name: 'Legendary',
    value: 6,
    type: 'CLASS',
    bundle: BUNDLE_INDEX.CLASSES,
    color: '#ffa000',
  },
];

export const ALL_PRODUCTS: Product[] = [
  ...CREATURES,
  ...COLORS,
  ...CLASSES,
];
