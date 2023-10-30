export const FRUIT = [
  "apples",
  "bananas",
  "oranges",
  "grapes",
  "pears"
] as const;

export type MarketFruit = (typeof FRUIT)[number];

export const VEGETABLES = [
  "brocolli",
  "carrots",
  "potatoes",
  "beans",
  "cauliflower"
] as const;

export type MarketVegetables = (typeof VEGETABLES)[number];

export type MarketProduce = (MarketFruit | MarketVegetables)[number];

export const PRODUCE = [...FRUIT, ...VEGETABLES];
