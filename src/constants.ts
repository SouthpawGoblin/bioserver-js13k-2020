export const LIKES_NEEDED = 1000;
export const ID_NONE = -1;
export const ID_404 = 0;

export interface Product {
  id: number;
  name: string;
  value: number;
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
  type: 'CARD' | 'MULTIPLIER' | 'STORAGE';
  items: Product[];
}

export const Products: ProductBundle[] = [
  {
    id: BUNDLE_INDEX.WILD_ANIMALS,
    name: 'Wild Animals',
    price: 10,
    type: 'CARD',
    items: [
      {
        id: 1,
        name: 'Chicken',
        value: 1,
      },
      {
        id: 2,
        name: 'Rabbit',
        value: 2,
      },
      {
        id: 3,
        name: 'Lizard',
        value: 3,
      },
      {
        id: 4,
        name: 'Wolf',
        value: 4,
      },
      {
        id: 5,
        name: 'Bear',
        value: 5
      },
    ]
  },
  {
    id: BUNDLE_INDEX.LEGENDARY_CREATURES,
    name: 'Legendary Creatures',
    price: 50,
    type: 'CARD',
    items: [
      {
        id: 6,
        name: 'Goblin',
        value: 3,
      },
      {
        id: 7,
        name: 'Orc',
        value: 4,
      },
      {
        id: 8,
        name: 'Fairy',
        value: 5,
      },
      {
        id: 9,
        name: 'Wyvern',
        value: 6,
      },
      {
        id: 10,
        name: 'Griffin',
        value: 7,
      },
    ],
  },
  {
    id: BUNDLE_INDEX.UNICORM,
    name: 'Unicorn',
    price: 100,
    type: 'CARD',
    items: [
      {
        id: 11,
        name: 'Unicorn',
        value: 10,
      },
    ]
  },
  {
    id: BUNDLE_INDEX.DRAGON,
    name: 'Dragon',
    price: 200,
    type: 'CARD',
    items: [
      {
        id: 12,
        name: 'Dragon',
        value: 50,
      },
    ]
  },
  {
    id: BUNDLE_INDEX.COLORS,
    name: 'Colors',
    price: 30,
    type: 'MULTIPLIER',
    items: [
      {
        id: 1,
        name: 'Gray',
        value: 1,
      },
      {
        id: 2,
        name: 'White',
        value: 2,
      },
      {
        id: 3,
        name: 'Bronze',
        value: 3,
      },
      {
        id: 4,
        name: 'Silver',
        value: 4,
      },
      {
        id: 5,
        name: 'Golden',
        value: 5,
      },
    ],
  },
  {
    id: BUNDLE_INDEX.CLASSES,
    name: 'Classes',
    price: 80,
    type: 'MULTIPLIER',
    items: [
      {
        id: 1,
        name: 'Common',
        value: 1,
      },
      {
        id: 2,
        name: 'Uncommon',
        value: 2,
      },
      {
        id: 3,
        name: 'Rare',
        value: 3,
      },
      {
        id: 4,
        name: 'Epic',
        value: 4,
      },
      {
        id: 5,
        name: 'Legendary',
        value: 5,
      },
    ],
  },
  {
    id: BUNDLE_INDEX.CREATURE_STORAGE,
    name: 'Creature Storage',
    price: 50,
    type: 'STORAGE',
    items: [
      {
        id: 1,
        name: 'Creature Storage',
        value: 1,
      }
    ]
  },
  {
    id: BUNDLE_INDEX.COLOR_STORAGE,
    name: 'Color Storage',
    price: 50,
    type: 'STORAGE',
    items: [
      {
        id: 1,
        name: 'Color Storage',
        value: 1,
      }
    ]
  },
  {
    id: BUNDLE_INDEX.CLASS_STORAGE,
    name: 'Class Storage',
    price: 50,
    type: 'STORAGE',
    items: [
      {
        id: 1,
        name: 'Class Storage',
        value: 1,
      }
    ]
  },
];
