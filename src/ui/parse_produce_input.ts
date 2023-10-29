import { MarketProduce, PRODUCE } from "../chapter_7/chapter_7.types";

export function parseProduceInput(input: string): MarketProduce | undefined {
  const chosenProduce = parseInt(input);

  if (isNaN(chosenProduce)) {
    return undefined;
  }

  if (chosenProduce < 0 || chosenProduce > PRODUCE.length - 1) {
    return undefined;
  }

  // we know the input is valid so we can return a Hole
  return PRODUCE[chosenProduce];
}
