import { endAdventure, haveAdventures } from "../..";
import { askQuestion, clear, print } from "../ui/console";

const PRODUCE = [
  "apples",
  "bananas",
  "oranges",
  "cucumbers",
  "tomatoes"
] as const;
type MarketProduce = (typeof PRODUCE)[number];

class ShoppingTrip {
  container: string = "basket";
  bought: MarketProduce = "apples";
}

export function goShopping(): void {
  clear(true);

  const marketTrip = new ShoppingTrip();

  marketTrip.container = "Basket";

  print(
    `You obviously have some ${marketTrip.bought} in your ${marketTrip.container}.`
  );

  if (marketTrip.bought === "apples") {
    print(
      `CONGRATULATIONS! You successfully made it through the shopping stage of Wonderland and can have some ${marketTrip.bought} for lunch!`
    );

    return askQuestion("Press ENTER to re-enter Wonderland! ", haveAdventures);
  } else {
    print(
      "You have not completed your shopping trip and will not have any ingredients for lunch! 😱"
    );
    return endAdventure();
  }
}
