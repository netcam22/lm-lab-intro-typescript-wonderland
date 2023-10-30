import { haveAdventures } from "../..";
import { askQuestion, clear, print } from "../ui/console";
import { parseProduceInput } from "../ui/parse_produce_input";
import {
  MarketFruit,
  FRUIT,
  MarketVegetables,
  VEGETABLES,
  PRODUCE
} from "./chapter_7.types";

class ShoppingTrip {
  container: string = "Basket";
  stall: string = "Fruit and Veg";
  products: Array<MarketFruit | MarketVegetables> = [];
}

const shoppingCart = (function () {
  const myShopping = new ShoppingTrip();
  return {
    set: (item: MarketFruit | MarketVegetables) =>
      myShopping.products.push(item),
    get: (): Array<MarketFruit | MarketVegetables> => myShopping.products,
    getBag: (): string => myShopping.container,
    getStall: (): string => myShopping.stall,
    empty: () => (myShopping.products = [])
  };
})();

export function enterTheMarket() {
  clear(false);
  print("Look at all of the fabulous fresh produce at the market:");
  return chooseProduce();
}

function chooseProduce(): void {
  print(PRODUCE.reduce((list, str, i) => `${list}  ${i}:${str}`, ""));
  askQuestion(
    `What${
      shoppingCart.get().length > 0 ? " else " : " "
    }are you going to buy for lunch? - select a number`,
    processChoice
  );
}

function processChoice(input: string | undefined) {
  const productChoice =
    input !== undefined ? parseProduceInput(input) : undefined;
  if (productChoice === undefined) {
    clear(true);
    print(`${input} not valid input 😮`);
    return chooseProduce();
  }
  return pickUpProduce(productChoice);
}

function pickUpProduce(productChoice: MarketFruit | MarketVegetables) {
  clear(true);
  const basketItems = shoppingCart.get();

  const needType = FRUIT.find(
    item => item === basketItems[0] && item === productChoice
  )
    ? "vegetables"
    : VEGETABLES.find(item => item === basketItems[0] && item === productChoice)
    ? "fruit"
    : undefined;
  /*
  if (needType !== undefined) {
    print(
      `To make sure you eat a balanced diet, you also need some ${needType}!`
    );
    return chooseProduce();
  }
  */
  if (basketItems.includes(productChoice)) {
    print(
      `You have already bought some ${productChoice}, try buying something different for variety.${needType}`
    );
    return chooseProduce();
  } else {
    shoppingCart.set(productChoice);
    print(
      `You have some ${productChoice} in your ${shoppingCart.getBag()} from the ${shoppingCart.getStall()} market stall.`
    );
    return checkBasket(basketItems);
  }
}

function checkBasket(basketItems: Array<MarketFruit | MarketVegetables>) {
  clear(true);
  const produceString: string =
    basketItems.length === 1
      ? basketItems[0]
      : `${basketItems[0]} and ${basketItems[1]}`;

  if (basketItems.length === 2) {
    //shoppingCart.empty();
    print(
      `CONGRATULATIONS! You have bought ${produceString} for lunch in Wonderland!`
    );
    return askQuestion("Press ENTER to continue! ", haveAdventures);
  } else {
    print(
      `You have bought some ${produceString} but need something else for lunch! 😱`
    );
    return chooseProduce();
  }
}
