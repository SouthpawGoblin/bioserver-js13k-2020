export const LIKES_NEEDED = 1000;

export interface Card {
  id: number;
  name: string;
  value: number;
}

export interface CardPack {
  id: number;
  name: string;
  price: number;
  items: Card[];
}

export const CREATURE_PACKS: CardPack[] = [
  {
    id: 1,
    name: 'Wild Animals',
    price: 10,
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
    id: 2,
    name: 'Legendary Creatures',
    price: 50,
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
    id: 3,
    name: 'Unicorn',
    price: 100,
    items: [
      {
        id: 11,
        name: 'Unicorn',
        value: 10,
      },
    ]
  },
  {
    id: 4,
    name: 'Dragon',
    price: 200,
    items: [
      {
        id: 12,
        name: 'Dragon',
        value: 50,
      },
    ]
  }
];

export const CLASS_MULTIPLIER_PACK: CardPack = {
  id: 1,
  name: 'Classes',
  price: 30,
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
  ]
};

export const ACTION_MULTIPLIER_PACK: CardPack = {
  id: 2,
  name: 'Actions',
  price: 80,
  items: [
    {
      id: 1,
      name: 'Sleeping',
      value: 1,
    },
    {
      id: 2,
      name: 'Standing',
      value: 2,
    },
    {
      id: 3,
      name: 'Dashing',
      value: 3,
    },
    {
      id: 4,
      name: 'Talking',
      value: 4,
    },
    {
      id: 5,
      name: 'Flying',
      value: 5,
    },
  ],
};