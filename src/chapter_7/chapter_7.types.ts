export const PRODUCE = [
  "apples",
  "bananas",
  "oranges",
  "cucumbers",
  "tomatoes"
] as const;

export type MarketProduce = (typeof PRODUCE)[number];
