import Decimal from "decimal.js-light";
import { BuildingName } from "./buildings";
import { Cake, getKeys } from "./craftables";
import { Inventory } from "./game";
import { FishName } from "./fishing";

type JuiceName =
  | "Apple Juice"
  | "Orange Juice"
  | "Purple Smoothie"
  | "Power Smoothie"
  | "Bumpkin Detox"
  | "Banana Blast";

type FishCookableName = "Chowder" | "Gumbo" | "Fermented Fish";

export type CookableName =
  | "Mashed Potato"
  | "Pumpkin Soup"
  | "Bumpkin Broth"
  | "Boiled Eggs"
  | "Mushroom Soup"
  | "Roast Veggies"
  | "Bumpkin Salad"
  | "Cauliflower Burger"
  | "Mushroom Jacket Potatoes"
  | "Goblin's Treat"
  | "Club Sandwich"
  | "Kale Stew"
  | "Pancakes"
  | "Kale & Mushroom Pie"
  | "Fermented Carrots"
  | "Sauerkraut"
  | "Blueberry Jam"
  | "Apple Pie"
  | "Orange Cake"
  | "Honey Cake"
  | "Sunflower Crunch"
  | "Reindeer Carrot"
  | Cake
  | JuiceName
  | "Bumpkin Roast"
  | "Goblin Brunch"
  | "Fruit Salad"
  | "Kale Omelette"
  | "Cabbers n Mash"
  | "Fancy Fries"
  | "Bumpkin ganoush"
  | "Eggplant Cake"
  | "Cornbread"
  | "Popcorn"
  | FishCookableName;

export type ConsumableName = CookableName | "Pirate Cake" | FishName;

export type Cookable = {
  experience: number;
  name: CookableName;
  description: string;
  ingredients: Inventory;
  cookingSeconds: number;
  building: BuildingName;
  // SFL sell rate
  marketRate: number;
  disabled?: boolean;
};

export type Consumable = Omit<
  Cookable,
  "name" | "ingredients" | "cookingSeconds" | "building" | "marketRate"
> & { name: ConsumableName };

type CakeName = Cake | "Orange Cake" | "Eggplant Cake" | "Honey Cake";

export const COOKABLE_CAKES: Record<CakeName, Cookable> = {
  "Sunflower Cake": {
    name: "Sunflower Cake",
    description: "Sunflower Cake",
    building: "Bakery",
    experience: 525,
    cookingSeconds: 60 * 60 * 6.5,
    ingredients: {
      Sunflower: new Decimal(1000),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 440,
  },
  "Potato Cake": {
    name: "Potato Cake",
    description: "Potato Cake",
    building: "Bakery",
    experience: 650,
    cookingSeconds: 60 * 60 * 10.5,
    ingredients: {
      Potato: new Decimal(500),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 560,
  },
  "Pumpkin Cake": {
    name: "Pumpkin Cake",
    description: "Pumpkin Cake",
    building: "Bakery",
    experience: 625,
    cookingSeconds: 60 * 60 * 10.5,
    ingredients: {
      Pumpkin: new Decimal(130),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 520,
  },
  "Carrot Cake": {
    name: "Carrot Cake",
    description: "Carrot Cake",
    building: "Bakery",
    experience: 750,
    cookingSeconds: 60 * 60 * 13,
    ingredients: {
      Carrot: new Decimal(120),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 600,
  },
  "Cabbage Cake": {
    name: "Cabbage Cake",
    description: "Cabbage Cake",
    building: "Bakery",
    experience: 860,
    cookingSeconds: 60 * 60 * 15,
    ingredients: {
      Cabbage: new Decimal(90),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 720,
  },
  "Beetroot Cake": {
    name: "Beetroot Cake",
    description: "Beetroot Cake",
    building: "Bakery",
    experience: 1250,
    cookingSeconds: 60 * 60 * 22,
    ingredients: {
      Beetroot: new Decimal(100),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 960,
  },
  "Cauliflower Cake": {
    name: "Cauliflower Cake",
    description: "Cauliflower Cake",
    building: "Bakery",
    experience: 1190,
    cookingSeconds: 60 * 60 * 22,
    ingredients: {
      Cauliflower: new Decimal(60),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 960,
  },
  "Parsnip Cake": {
    name: "Parsnip Cake",
    description: "Parsnip Cake",
    building: "Bakery",
    experience: 1300,
    cookingSeconds: 60 * 60 * 24,
    ingredients: {
      Parsnip: new Decimal(45),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 960,
  },
  "Radish Cake": {
    name: "Radish Cake",
    description: "Radish Cake",
    building: "Bakery",
    experience: 1200,
    cookingSeconds: 60 * 60 * 24,
    ingredients: {
      Radish: new Decimal(25),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 880,
  },
  "Wheat Cake": {
    name: "Wheat Cake",
    description: "Wheat Cake",
    building: "Bakery",
    experience: 1100,
    cookingSeconds: 60 * 60 * 24,
    ingredients: {
      Wheat: new Decimal(35),
      Egg: new Decimal(15),
    },
    marketRate: 800,
  },
  "Eggplant Cake": {
    name: "Eggplant Cake",
    description: "Sweet farm-fresh dessert surprise.",
    building: "Bakery",
    experience: 1400,
    cookingSeconds: 60 * 60 * 24,
    ingredients: {
      Eggplant: new Decimal(30),
      Wheat: new Decimal(10),
      Egg: new Decimal(15),
    },
    marketRate: 1200,
  },
  "Orange Cake": {
    name: "Orange Cake",
    description: "Orange you glad we aren't cooking apples",
    building: "Bakery",
    experience: 730,
    cookingSeconds: 240 * 60,
    ingredients: {
      Orange: new Decimal(5),
      Egg: new Decimal(15),
      Wheat: new Decimal(10),
    },
    marketRate: 600,
  },
  "Honey Cake": {
    name: "Honey Cake",
    description: "A scrumptious cake!",
    building: "Bakery",
    experience: 760,
    cookingSeconds: 60 * 240,
    ingredients: {
      Honey: new Decimal(10),
      Wheat: new Decimal(10),
      Egg: new Decimal(10),
    },
    marketRate: 550,
    disabled: true,
  },
};

export const FISH_COOKABLES: Record<FishCookableName, Cookable> = {
  Chowder: {
    name: "Chowder",
    description:
      "Sailor's delight in a bowl! Dive in, there's treasure inside!",
    building: "Kitchen",
    experience: 1000,
    cookingSeconds: 60 * 60 * 8,
    ingredients: {
      Beetroot: new Decimal(10),
      Wheat: new Decimal(10),
      Parsnip: new Decimal(5),
      Anchovy: new Decimal(3),
    },
    marketRate: 0,
  },
  Gumbo: {
    name: "Gumbo",
    description: "A pot full of magic! Every spoonful's a Mardi Gras parade!",
    building: "Fire Pit",
    experience: 600,
    cookingSeconds: 60 * 60 * 4,
    ingredients: {
      Potato: new Decimal(50),
      Pumpkin: new Decimal(30),
      Carrot: new Decimal(20),
      "Red Snapper": new Decimal(3),
    },
    marketRate: 0,
  },
  "Fermented Fish": {
    name: "Fermented Fish",
    description: "Daring delicacy! Unleash the Viking within with every bite!",
    building: "Deli",
    experience: 3000,
    cookingSeconds: 60 * 60 * 24,
    ingredients: {
      Tuna: new Decimal(6),
    },
    marketRate: 0,
  },
};

export const COOKABLES: Record<CookableName, Cookable> = {
  "Mashed Potato": {
    name: "Mashed Potato",
    description: "My life is potato.",
    building: "Fire Pit",
    experience: 3,
    cookingSeconds: 30,
    ingredients: {
      Potato: new Decimal(8),
    },
    marketRate: 10,
  },
  "Pumpkin Soup": {
    name: "Pumpkin Soup",
    description: "Creamy, orange and healthy!",
    building: "Fire Pit",
    experience: 24,
    cookingSeconds: 60 * 3,
    ingredients: {
      Pumpkin: new Decimal(10),
    },
    marketRate: 16,
  },

  "Bumpkin Broth": {
    name: "Bumpkin Broth",
    description: "A perfect broth for a cold day.",
    building: "Fire Pit",
    experience: 96,
    cookingSeconds: 60 * 20,
    ingredients: {
      Carrot: new Decimal(10),
      Cabbage: new Decimal(5),
    },
    marketRate: 64,
  },

  "Boiled Eggs": {
    name: "Boiled Eggs",
    description: "Boiled Eggs are great for breakfast",
    building: "Fire Pit",
    experience: 90,
    cookingSeconds: 60 * 60,
    ingredients: {
      Egg: new Decimal(5),
    },
    marketRate: 160,
  },

  "Kale Stew": {
    name: "Kale Stew",
    description: "A perfect Bumpkin Booster!",
    building: "Fire Pit",
    experience: 400,
    cookingSeconds: 60 * 60 * 2,
    ingredients: {
      Kale: new Decimal(10),
    },
    marketRate: 400,
  },

  "Roast Veggies": {
    name: "Roast Veggies",
    description: "Even Goblins need to eat their veggies!",
    building: "Kitchen",
    experience: 170,
    cookingSeconds: 60 * 60 * 2,
    ingredients: {
      Cauliflower: new Decimal(15),
      Carrot: new Decimal(10),
    },
    marketRate: 240,
  },

  "Bumpkin Salad": {
    name: "Bumpkin Salad",
    description: "Gotta keep your Bumpkin healthy!",
    building: "Kitchen",
    experience: 290,
    cookingSeconds: 60 * 60 * 3.5,
    ingredients: {
      Beetroot: new Decimal(20),
      Parsnip: new Decimal(10),
    },
    marketRate: 400,
  },

  "Goblin's Treat": {
    name: "Goblin's Treat",
    description: "Goblins go crazy for this stuff!",
    building: "Kitchen",
    experience: 500,
    cookingSeconds: 60 * 60 * 6,
    ingredients: {
      Pumpkin: new Decimal(10),
      Radish: new Decimal(20),
      Cabbage: new Decimal(10),
    },
    marketRate: 800,
  },

  "Cauliflower Burger": {
    name: "Cauliflower Burger",
    description: "Calling all cauliflower lovers!",
    building: "Kitchen",
    experience: 255,
    cookingSeconds: 60 * 60 * 3,
    ingredients: {
      Cauliflower: new Decimal(15),
      Wheat: new Decimal(5),
    },
    marketRate: 304,
  },

  Pancakes: {
    name: "Pancakes",
    description: "A great start to a Bumpkins day.",
    building: "Kitchen",
    experience: 480,
    cookingSeconds: 60 * 20,
    ingredients: {
      Wheat: new Decimal(5),
      Honey: new Decimal(10),
    },
    marketRate: 10,
    disabled: true,
  },

  "Club Sandwich": {
    name: "Club Sandwich",
    description: "Filled with Carrots and Roasted Sunflower Seeds",
    building: "Kitchen",
    experience: 170,
    cookingSeconds: 60 * 60 * 3,
    ingredients: {
      Sunflower: new Decimal(100),
      Carrot: new Decimal(25),
      Wheat: new Decimal(5),
    },
    marketRate: 184,
  },

  "Apple Pie": {
    name: "Apple Pie",
    description: "Bumpkin Betty's famous recipe",
    building: "Bakery",
    experience: 720,
    cookingSeconds: 60 * 240,
    ingredients: {
      Apple: new Decimal(5),
      Wheat: new Decimal(10),
      Egg: new Decimal(10),
    },
    marketRate: 550,
  },
  "Blueberry Jam": {
    name: "Blueberry Jam",
    description: "Goblins will do anything for this jam",
    building: "Deli",
    experience: 500,
    cookingSeconds: 60 * 60 * 12,
    ingredients: {
      Blueberry: new Decimal(5),
    },
    marketRate: 350,
  },
  "Fermented Carrots": {
    name: "Fermented Carrots",
    description: "Got a surplus of carrots?",
    building: "Deli",
    experience: 250,
    cookingSeconds: 60 * 24 * 60,
    ingredients: {
      Carrot: new Decimal(20),
    },
    marketRate: 112,
  },
  "Kale & Mushroom Pie": {
    name: "Kale & Mushroom Pie",
    description: "A traditional Sapphiron recipe",
    building: "Bakery",
    experience: 720,
    cookingSeconds: 60 * 240,
    ingredients: {
      "Wild Mushroom": new Decimal(10),
      Kale: new Decimal(5),
      Wheat: new Decimal(5),
    },
    marketRate: 550,
  },

  "Mushroom Jacket Potatoes": {
    name: "Mushroom Jacket Potatoes",
    description: "Cram them taters with what ya got!",
    building: "Kitchen",
    experience: 240,
    cookingSeconds: 10 * 60,
    ingredients: {
      "Wild Mushroom": new Decimal(10),
      Potato: new Decimal(5),
    },
    marketRate: 240,
  },
  "Mushroom Soup": {
    name: "Mushroom Soup",
    description: "Warm your Bumpkin's soul.",
    building: "Fire Pit",
    experience: 56,
    cookingSeconds: 10 * 60,
    ingredients: {
      "Wild Mushroom": new Decimal(5),
    },
    marketRate: 240,
  },
  "Sunflower Crunch": {
    name: "Sunflower Crunch",
    description: "Crunchy goodness. Try not to burn it.",
    building: "Kitchen",
    experience: 50,
    cookingSeconds: 10 * 60,
    ingredients: {
      Sunflower: new Decimal(300),
    },
    marketRate: 40,
  },
  Sauerkraut: {
    name: "Sauerkraut",
    description: "No more boring Cabbage!",
    building: "Deli",
    experience: 500,
    cookingSeconds: 24 * 60 * 60,
    ingredients: {
      Cabbage: new Decimal(20),
    },
    marketRate: 224,
  },
  "Reindeer Carrot": {
    name: "Reindeer Carrot",
    description: "Rudolph can't stop eating them!",
    building: "Fire Pit",
    experience: 10,
    cookingSeconds: 60 * 5,
    ingredients: {
      Carrot: new Decimal(5),
    },
    marketRate: 0,
  },

  "Apple Juice": {
    name: "Apple Juice",
    description: "A crisp refreshing beverage",
    building: "Smoothie Shack",
    experience: 500,
    cookingSeconds: 60 * 60,
    ingredients: {
      Apple: new Decimal(5),
    },
    marketRate: 336,
  },

  "Orange Juice": {
    name: "Orange Juice",
    description: "OJ matches perfectly with a Club Sandwich",
    building: "Smoothie Shack",
    experience: 375,
    cookingSeconds: 60 * 45,
    ingredients: {
      Orange: new Decimal(5),
    },
    marketRate: 256,
  },

  "Purple Smoothie": {
    name: "Purple Smoothie",
    description: "You can hardly taste the Cabbage",
    building: "Smoothie Shack",
    experience: 310,
    cookingSeconds: 60 * 30,
    ingredients: {
      Blueberry: new Decimal(5),
      Cabbage: new Decimal(10),
    },
    marketRate: 200,
  },

  "Power Smoothie": {
    name: "Power Smoothie",
    description: "Official drink of the Bumpkin Powerlifting Society",
    building: "Smoothie Shack",
    experience: 775,
    cookingSeconds: 60 * 60 * 1.5,
    ingredients: {
      Blueberry: new Decimal(10),
      Kale: new Decimal(5),
    },
    marketRate: 496,
  },

  "Bumpkin Detox": {
    name: "Bumpkin Detox",
    description: "Wash away the sins of last night",
    building: "Smoothie Shack",
    experience: 975,
    cookingSeconds: 60 * 60 * 2,
    ingredients: {
      Apple: new Decimal(5),
      Orange: new Decimal(5),
      Carrot: new Decimal(10),
    },
    marketRate: 640,
  },

  "Bumpkin Roast": {
    name: "Bumpkin Roast",
    description: "A traditional Bumpkin dish",
    building: "Kitchen",
    experience: 2500,
    cookingSeconds: 60 * 60 * 12,
    ingredients: {
      "Mashed Potato": new Decimal(20),
      "Roast Veggies": new Decimal(5),
    },
    marketRate: 1100,
  },
  "Goblin Brunch": {
    name: "Goblin Brunch",
    description: "A traditional Goblin dish",
    building: "Kitchen",
    experience: 2500,
    cookingSeconds: 60 * 60 * 12,
    ingredients: {
      "Boiled Eggs": new Decimal(5),
      "Goblin's Treat": new Decimal(1),
    },
    marketRate: 1100,
  },
  "Fruit Salad": {
    name: "Fruit Salad",
    description: "Fruit Salad, Yummy Yummy",
    building: "Kitchen",
    experience: 225,
    cookingSeconds: 60 * 30,
    ingredients: {
      Apple: new Decimal(1),
      Orange: new Decimal(1),
      Blueberry: new Decimal(1),
    },
    marketRate: 200,
  },
  "Kale Omelette": {
    name: "Kale Omelette",
    description: "A healthy breakfast",
    building: "Fire Pit",
    experience: 1250,
    cookingSeconds: 60 * 60 * 3.5,
    ingredients: {
      Egg: new Decimal(20),
      Kale: new Decimal(5),
    },
    marketRate: 640,
  },
  "Cabbers n Mash": {
    name: "Cabbers n Mash",
    description: "Cabbages and Mashed Potatoes",
    building: "Fire Pit",
    experience: 250,
    cookingSeconds: 60 * 40,
    ingredients: {
      "Mashed Potato": new Decimal(10),
      Cabbage: new Decimal(20),
    },
    marketRate: 160,
  },
  "Fancy Fries": {
    name: "Fancy Fries",
    description: "Fantastic Fries",
    building: "Deli",
    experience: 1000,
    cookingSeconds: 60 * 60 * 24,
    ingredients: {
      Sunflower: new Decimal(500),
      Potato: new Decimal(500),
    },
    marketRate: 400,
  },
  "Bumpkin ganoush": {
    name: "Bumpkin ganoush",
    description: "Zesty roasted eggplant spread.",
    building: "Kitchen",
    experience: 1000,
    cookingSeconds: 60 * 60 * 5,
    ingredients: {
      Eggplant: new Decimal(30),
      Potato: new Decimal(50),
      Parsnip: new Decimal(10),
    },
    marketRate: 800,
  },
  Cornbread: {
    name: "Cornbread",
    description: "Hearty golden farm-fresh bread.",
    building: "Bakery",
    experience: 600,
    cookingSeconds: 60 * 60 * 12,
    ingredients: {
      Corn: new Decimal(15),
      Wheat: new Decimal(5),
      Egg: new Decimal(5),
    },
    marketRate: 1200,
  },
  Popcorn: {
    name: "Popcorn",
    description: "Classic homegrown crunchy snack",
    building: "Fire Pit",
    experience: 200,
    cookingSeconds: 12 * 60,
    ingredients: {
      Sunflower: new Decimal(100),
      Corn: new Decimal(5),
    },
    marketRate: 120,
  },
  "Banana Blast": {
    name: "Banana Blast",
    description: "The ultimate fruity fuel for those with a peel for power!",
    building: "Smoothie Shack",
    experience: 1200,
    cookingSeconds: 60 * 60 * 3,
    ingredients: {
      Banana: new Decimal(10),
      Egg: new Decimal(5),
    },
    marketRate: 560,
  },
  ...COOKABLE_CAKES,
  ...FISH_COOKABLES,
};

export const PIRATE_CAKE: Record<"Pirate Cake", Consumable> = {
  "Pirate Cake": {
    name: "Pirate Cake",
    description: "Great for Pirate themed birthday parties.",
    experience: 3000,
  },
};

const FISH: Record<FishName, Consumable> = {
  Anchovy: {
    name: "Anchovy",
    description: "Tiny fish, big flavor!",
    experience: 60,
  },
  Butterflyfish: {
    name: "Butterflyfish",
    description: "Swimming in colors and taste!",
    experience: 70,
  },
  Blowfish: {
    name: "Blowfish",
    description: "Dine with danger, a spiky surprise!",
    experience: 80,
  },
  Clownfish: {
    name: "Clownfish",
    description: "No jokes, just pure deliciousness!",
    experience: 90,
  },
  "Sea Bass": {
    name: "Sea Bass",
    description: "The bass-ics of seaside cuisine!",
    experience: 100,
  },
  "Sea Horse": {
    name: "Sea Horse",
    description: "Dainty, rare, and surprisingly tasty!",
    experience: 110,
  },
  "Horse Mackerel": {
    name: "Horse Mackerel",
    description: "Gallop through flavors with every bite!",
    experience: 120,
  },
  Squid: {
    name: "Squid",
    description: "Ink your way to exquisite tastes!",
    experience: 130,
  },
  "Red Snapper": {
    name: "Red Snapper",
    description: "Snap into rich, zesty oceans of flavor!",
    experience: 140,
  },
  "Moray Eel": {
    name: "Moray Eel",
    description: "Slippery, savory, and sensational!",
    experience: 150,
  },
  "Olive Flounder": {
    name: "Olive Flounder",
    description: "Floundering in richness and taste!",
    experience: 160,
  },
  Napoleanfish: {
    name: "Napoleanfish",
    description: "Conquer your hunger with this catch!",
    experience: 170,
  },
  Surgeonfish: {
    name: "Surgeonfish",
    description: "Operate on your taste buds with precision!",
    experience: 180,
  },
  "Zebra Turkeyfish": {
    name: "Zebra Turkeyfish",
    description: "Striped, spiky, and spectacularly scrumptious!",
    experience: 190,
  },
  Ray: {
    name: "Ray",
    description: "Glide into a realm of rich flavors!",
    experience: 200,
  },
  "Hammerhead shark": {
    name: "Hammerhead shark",
    description: "A head-on collision with taste!",
    experience: 210,
  },
  "Barred Knifejaw": {
    name: "Barred Knifejaw",
    description: "Cut through the hunger with sharp flavors!",
    experience: 220,
  },
  Tuna: {
    name: "Tuna",
    description: "A titan of taste in every slice!",
    experience: 230,
  },
  "Mahi Mahi": {
    name: "Mahi Mahi",
    description: "Double the name, double the deliciousness!",
    experience: 240,
  },
  "Blue Marlin": {
    name: "Blue Marlin",
    description: "Spearhead your appetite with this royal catch!",
    experience: 250,
  },
  Oarfish: {
    name: "Oarfish",
    description: "Row your way into legendary flavor!",
    experience: 300,
  },
  "Football fish": {
    name: "Football fish",
    description: "Score a touchdown in taste!",
    experience: 350,
  },
  Sunfish: {
    name: "Sunfish",
    description: "Bask in the glow of its delectable flavor!",
    experience: 400,
  },
  Coelacanth: {
    name: "Coelacanth",
    description: "Prehistoric flavor that's stood the test of time!",
    experience: 700,
  },
  "Whale Shark": {
    name: "Whale Shark",
    description: "A mammoth meal for monumental cravings!",
    experience: 750,
  },
  "Saw Shark": {
    name: "Saw Shark",
    description: "Cutting-edge flavor from the deep!",
    experience: 800,
  },
  "White Shark": {
    name: "White Shark",
    description: "Dive into an ocean of thrilling taste!",
    experience: 1000,
  },
  Angelfish: {
    description: "?",
    experience: 100,
    name: "Angelfish",
  },
  Halibut: {
    description: "?",
    experience: 100,
    name: "Halibut",
  },
  Parrotfish: {
    description: "?",
    experience: 100,
    name: "Parrotfish",
  },
};

export const CONSUMABLES: Record<ConsumableName, Consumable> = {
  ...COOKABLES,
  ...FISH,
  ...PIRATE_CAKE,
};

export const FISH_CONSUMABLES: Record<FishName | FishCookableName, Consumable> =
  {
    ...FISH_COOKABLES,
    ...FISH,
  };

const Juices = getKeys(COOKABLES).filter(
  (name) => COOKABLES[name].building === "Smoothie Shack"
);

export function isJuice(item: any) {
  return Juices.includes(item);
}

export function isCookable(consumeable: Consumable): consumeable is Cookable {
  return consumeable.name in COOKABLES;
}
