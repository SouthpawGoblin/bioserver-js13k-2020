export const LIKES_NEEDED = 1000;
export const ID_NONE = -1;
export const ID_404 = 0;

export interface Product {
  id: number;
  name: string;
  value: number;
  type: 'CREATURE' | 'COLOR' | 'CLASS' | 'STORAGE';
  bundle: BUNDLE_INDEX;
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

export const DEAL_DELAY = 500;

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
  },
  {
    id: 7,
    name: 'Orc',
    value: 4,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.LEGENDARY_CREATURES,
  },
  {
    id: 8,
    name: 'Fairy',
    value: 5,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.LEGENDARY_CREATURES,
  },
  {
    id: 9,
    name: 'Wyvern',
    value: 6,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.LEGENDARY_CREATURES,
  },
  {
    id: 10,
    name: 'Griffin',
    value: 7,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.LEGENDARY_CREATURES,
  },
  {
    id: 11,
    name: 'Unicorn',
    value: 10,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.UNICORM,
  },
  {
    id: 12,
    name: 'Dragon',
    value: 50,
    type: 'CREATURE',
    bundle: BUNDLE_INDEX.DRAGON,
  },
];

export const COLORS: Product[] = [
  {
    id: 13,
    name: 'Gray',
    value: 1,
    type: 'COLOR',
    bundle: BUNDLE_INDEX.COLORS,
  },
  {
    id: 14,
    name: 'White',
    value: 2,
    type: 'COLOR',
    bundle: BUNDLE_INDEX.COLORS,
  },
  {
    id: 15,
    name: 'Bronze',
    value: 3,
    type: 'COLOR',
    bundle: BUNDLE_INDEX.COLORS,
  },
  {
    id: 16,
    name: 'Silver',
    value: 4,
    type: 'COLOR',
    bundle: BUNDLE_INDEX.COLORS,
  },
  {
    id: 17,
    name: 'Golden',
    value: 5,
    type: 'COLOR',
    bundle: BUNDLE_INDEX.COLORS,
  },
];

export const CLASSES: Product[] = [
  {
    id: 18,
    name: 'Common',
    value: 1,
    type: 'CLASS',
    bundle: BUNDLE_INDEX.CLASSES,
  },
  {
    id: 19,
    name: 'Uncommon',
    value: 2,
    type: 'CLASS',
    bundle: BUNDLE_INDEX.CLASSES,
  },
  {
    id: 20,
    name: 'Rare',
    value: 3,
    type: 'CLASS',
    bundle: BUNDLE_INDEX.CLASSES,
  },
  {
    id: 21,
    name: 'Epic',
    value: 4,
    type: 'CLASS',
    bundle: BUNDLE_INDEX.CLASSES,
  },
  {
    id: 22,
    name: 'Legendary',
    value: 5,
    type: 'CLASS',
    bundle: BUNDLE_INDEX.CLASSES,
  },
];

export const STORAGES: Product[] = [
  {
    id: 23,
    name: 'Creature Storage',
    value: 1,
    type: 'STORAGE',
    bundle: BUNDLE_INDEX.CREATURE_STORAGE,
  },
  {
    id: 24,
    name: 'Color Storage',
    value: 1,
    type: 'STORAGE',
    bundle: BUNDLE_INDEX.COLOR_STORAGE,
  },
  {
    id: 25,
    name: 'Class Storage',
    value: 1,
    type: 'STORAGE',
    bundle: BUNDLE_INDEX.CLASS_STORAGE,
  }
];

export const ALL_PRODUCTS: Product[] = [
  ...CREATURES,
  ...COLORS,
  ...CLASSES,
  ...STORAGES,
];
