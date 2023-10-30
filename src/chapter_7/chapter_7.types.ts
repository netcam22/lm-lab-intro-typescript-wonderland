export const FRUIT = [
  { name: "apples", price: 1.5 },
  { name: "bananas", price: 1.0 },
  { name: "oranges", price: 1.7 },
  { name: "grapes", price: 2.5 },
  { name: "pears", price: 1.8 }
] as const;

export type MarketFruit = (typeof FRUIT)[number];

export const VEGETABLES = [
  { name: "brocolli", price: 1.1 },
  { name: "carrots", price: 0.7 },
  { name: "potatoes", price: 1.6 },
  { name: "beans", price: 2.1 },
  { name: "cauliflower", price: 1.9 }
] as const;

export type MarketVegetables = (typeof VEGETABLES)[number];

export type MarketProduce = MarketFruit | MarketVegetables;

export const PRODUCE = [...FRUIT, ...VEGETABLES];
