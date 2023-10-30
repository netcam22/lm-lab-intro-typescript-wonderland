import { haveAdventures } from "../..";
import { askQuestion, clear, print } from "../ui/console";
import { parseProduceInput } from "../ui/parse_produce_input";
import { FRUIT, VEGETABLES, PRODUCE, MarketProduce } from "./chapter_7.types";

class ShoppingTrip {
  container: string = "basket";
  stall: string = "fruit and veg";
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
  print(
    PRODUCE.reduce(
      (list, item, i) =>
        `${list}  ${i}:${item.name}, £${item.price.toFixed(2)}`,
      ""
    )
  );
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
  return checkProduce(productChoice);
}

function hasProductType(basketItemName: string, productName: string) {
  if (
    (FRUIT.find(item => item.name === productName) &&
      FRUIT.find(item => item.name === basketItemName)) ||
    (VEGETABLES.find(item => item.name === productName) &&
      VEGETABLES.find(item => item.name === basketItemName))
  ) {
    return true;
  }
  return false;
}

function calculatePrice(basketItems: Array<MarketProduce>) {
  const [a, b] = [...basketItems];
  return `£${(a.price + b.price).toFixed(2)}`;
}

function checkProduce(productChoice: MarketProduce) {
  clear(true);
  const basketItems = shoppingCart.get();

  if (basketItems.length === 1) {
    const boughtItem = basketItems[0].name;

    if (basketItems.includes(productChoice)) {
      print(
        `You have already bought some ${boughtItem}, try buying something different for variety.`
      );
      return chooseProduce();
    } else if (hasProductType(boughtItem, productChoice.name)) {
      print(
        `You have already bought some ${boughtItem}, to eat a balanced diet, you need both fruit and vegetables!`
      );
      return chooseProduce();
    }
  }
  shoppingCart.set(productChoice);
  print(
    `You have some ${
      productChoice.name
    } in your ${shoppingCart.getBag()} from the ${shoppingCart.getStall()} market stall.`
  );
  return processBasket(basketItems);
}

function processBasket(basketItems: Array<MarketProduce>) {
  clear(true);

  if (basketItems.length === 2) {
    const produceString: string = `${basketItems[0].name} and ${basketItems[1].name}`;
    const totalPrice = calculatePrice(basketItems);
    shoppingCart.empty();
    print(
      `ENJOY YOUR LUNCH! You have bought ${produceString} from Wonderland market for ${totalPrice}.`
    );
    return askQuestion("Press ENTER to continue! ", haveAdventures);
  } else {
    print(
      `You have bought some ${basketItems[0].name} but need something else for lunch! 😱`
    );
    return chooseProduce();
  }
}
