import { endAdventure, haveAdventures } from "../..";
import { askQuestion, clear, print } from "../ui/console";
import { parseProduceInput } from "../ui/parse_produce_input";
import { MarketProduce, PRODUCE } from "./chapter_7.types";

class ShoppingTrip {
  container: string = "Basket";
  stall: string = "Fruit and Veg";
  products: Array<MarketProduce> = [];
}

const shoppingCart = (function () {
  const myShopping = new ShoppingTrip();
  return {
    set: (item: MarketProduce) => myShopping.products.push(item),
    get: (): Array<MarketProduce> => myShopping.products,
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

function processChoice(input: string) {
  const productChoice =
    input !== undefined ? parseProduceInput(input) : undefined;
  if (productChoice === undefined) {
    clear(true);
    print(`${input} is not valid 😮`);
    return chooseProduce();
  }
  return pickUpProduce(productChoice);
}

function pickUpProduce(productChoice: MarketProduce) {
  clear(true);

  const basketItems = shoppingCart.get();

  if (basketItems.includes(productChoice)) {
    print(
      `You have already bought some ${productChoice}, try buying something different for variety.`
    );
    return chooseProduce();
  } else {
    const product = shoppingCart.set(productChoice);
    print(
      `You have bought some ${product} from the ${shoppingCart.getStall()} market stall.`
    );
    const produceString: string =
      basketItems.length === 1
        ? basketItems[0]
        : `${basketItems[0]} and ${basketItems[1]}`;
    print(
      `You have some ${produceString} in your ${shoppingCart.getBag()} from the ${shoppingCart.getStall()} market stall.`
    );
    return checkBasket(produceString);
  }
}

function checkBasket(produceString: string) {
  clear(true);
  if (shoppingCart.get().length === 2) {
    shoppingCart.empty();
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
