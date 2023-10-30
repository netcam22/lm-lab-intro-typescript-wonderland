import {
  MarketProduce,
  FRUIT,
  VEGETABLES,
  PRODUCE
} from "../chapter_7/chapter_7.types";

export function parseProduceInput(input: string): MarketProduce | undefined {
  const chosenProduce = parseInt(input);

  if (isNaN(chosenProduce)) {
    return undefined;
  }

  if (chosenProduce < 0 || chosenProduce > PRODUCE.length - 1) {
    return undefined;
  }

  if (chosenProduce >= FRUIT.length) {
    return VEGETABLES[chosenProduce - FRUIT.length];
  }

  return FRUIT[chosenProduce];
}
