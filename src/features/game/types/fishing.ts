import Decimal from "decimal.js-light";
import { Worm } from "./composters";
import { Bumpkin, GameState, InventoryItemName } from "./game";
import { Tool } from "./tools";

export type PurchaseableBait = "Fishing Lure";
export type FishingBait = Worm | PurchaseableBait;
export type FishType = "basic" | "advanced" | "expert" | "marine marvel";

export type FishName =
  // Basic
  | "Anchovy"
  | "Butterflyfish"
  | "Blowfish"
  | "Clownfish"
  | "Sea Bass"
  | "Sea Horse"
  | "Horse Mackerel"
  | "Halibut"
  | "Squid"
  // Advanced
  | "Red Snapper"
  | "Moray Eel"
  | "Olive Flounder"
  | "Napoleanfish"
  | "Surgeonfish"
  | "Zebra Turkeyfish"
  | "Angelfish"
  | "Ray"
  | "Hammerhead shark"
  | "Barred Knifejaw" // Coming Soon
  // Expert
  | "Tuna"
  | "Mahi Mahi"
  | "Blue Marlin"
  | "Oarfish"
  | "Football fish"
  | "Sunfish"
  | "Coelacanth"
  | "Parrotfish"
  | "Whale Shark"
  | "Saw Shark"
  | "White Shark";

export type MarineMarvelName =
  | "Twilight Anglerfish"
  | "Starlight Tuna"
  | "Radiant Ray"
  | "Phantom Barracuda"
  | "Gilded Swordfish"
  | "Kraken Tentacle";

export const PURCHASEABLE_BAIT: Record<PurchaseableBait, Tool> = {
  "Fishing Lure": {
    ingredients: {
      "Block Buck": new Decimal(1),
    },
    sfl: new Decimal(0),
    description: "Great for catching rare fish!",
    name: "Fishing Lure",
  },
};

export const CHUM_AMOUNTS: Partial<Record<InventoryItemName, number>> = {
  Gold: 1,
  Iron: 5,
  Stone: 5,
  Egg: 5,
  Sunflower: 50,
  Potato: 20,
  Pumpkin: 20,
  Carrot: 10,
  Cabbage: 10,
  Beetroot: 10,
  Cauliflower: 5,
  Parsnip: 5,
  Eggplant: 5,
  Corn: 5,
  Radish: 5,
  Wheat: 5,
  Kale: 5,
  Blueberry: 3,
  Orange: 3,
  Apple: 3,
  Banana: 3,
  Seaweed: 1,
  Crab: 2,
  Anchovy: 1,
  "Red Snapper": 1,
  Tuna: 1,
  Squid: 1,
};

export const CHUM_DETAILS: Partial<Record<InventoryItemName, string>> = {
  Gold: "The shimmering gold can be seen 100 miles away",
  Iron: "A shimmering sparkle, can be seen at all angles during Dusk",
  Egg: "Hmmm, not sure what fish would like eggs...",
  Sunflower: "A sunny, vibrant lure for curious fish.",
  Potato: "Potatoes make for an unusual fishy feast.",
  Pumpkin: "Fish might be intrigued by the orange glow of pumpkins.",
  Carrot: "Best used with Earthworms to catch Anchovies!",
  Cabbage: "A leafy temptation for underwater herbivores.",
  Beetroot: "Beets, the undersea delight for the bold fish.",
  Cauliflower: "Fish may find the florets oddly enticing.",
  Parsnip: "An earthy, rooty lure for curious fish.",
  Eggplant: "Eggplants: the aquatic adventure for the daring fish.",
  Corn: "Corn on the cob – an odd but intriguing treat.",
  Radish: "Radishes, the buried treasure for aquatics.",
  Wheat: "Wheat, a grainy delight for underwater foragers.",
  Kale: "A leafy green surprise for the inquisitive fish.",
  Blueberry: "Often confused by blue fish as potential mates.",
  Orange: "Oranges, the citrusy curiosity for sea creatures.",
  Apple: "Apples – a crunchy enigma beneath the waves.",
  Banana: "Lighter than water!",
  Seaweed: "A taste of the ocean in a leafy underwater snack.",
  Crab: "A tantalizing morsel for a curious undersea fish.",
  Anchovy: "Anchovies, mysteriously alluring to the outlaws of the sea.",
  "Red Snapper": "A mystery hidden within the depths of the ocean.",
  Tuna: "What is big enough to eat a tuna?",
  Squid: "Awaken a ray with its favorite treat!",
};

export type FishingLocation = "beach" | "wharf";

type Fish = {
  baits: FishingBait[];
  type: FishType;
  locations: FishingLocation[];
};

// TODO
export const FISH: Record<FishName | MarineMarvelName, Fish> = {
  Anchovy: {
    baits: ["Earthworm"],
    type: "basic",
    locations: ["wharf"],
  },
  Butterflyfish: {
    baits: ["Earthworm"],
    type: "basic",
    locations: ["wharf"],
  },

  Blowfish: {
    baits: ["Earthworm"],
    type: "basic",
    locations: ["wharf"],
  },
  Clownfish: {
    baits: ["Earthworm"],
    type: "basic",
    locations: ["wharf"],
  },
  "Sea Bass": {
    baits: ["Earthworm"],
    type: "basic",
    locations: ["wharf"],
  },
  "Sea Horse": {
    baits: ["Earthworm"],
    type: "basic",
    locations: ["wharf"],
  },
  "Horse Mackerel": {
    baits: ["Earthworm"],
    type: "basic",
    locations: ["wharf"],
  },
  Halibut: {
    baits: ["Earthworm"],
    type: "basic",
    locations: ["beach"],
  },
  Squid: {
    baits: ["Earthworm"],
    type: "basic",
    locations: ["wharf"],
  },
  "Red Snapper": {
    baits: ["Grub", "Red Wiggler", "Fishing Lure"],
    type: "advanced",
    locations: ["wharf"],
  },
  "Moray Eel": {
    baits: ["Earthworm", "Grub", "Fishing Lure"],
    type: "advanced",
    locations: ["wharf"],
  },
  "Olive Flounder": {
    baits: ["Earthworm", "Grub", "Fishing Lure"],
    type: "advanced",
    locations: ["wharf"],
  },
  Napoleanfish: {
    baits: ["Grub", "Fishing Lure"],
    type: "advanced",
    locations: ["wharf"],
  },
  Surgeonfish: {
    baits: ["Grub", "Fishing Lure"],
    type: "advanced",
    locations: ["wharf"],
  },
  Angelfish: {
    baits: ["Grub", "Fishing Lure"],
    type: "advanced",
    locations: ["beach"],
  },
  "Zebra Turkeyfish": {
    baits: ["Grub", "Fishing Lure"],
    type: "advanced",
    locations: ["wharf"],
  },
  Ray: {
    baits: ["Grub", "Fishing Lure"],
    type: "advanced",
    locations: ["wharf"],
  },
  "Hammerhead shark": {
    baits: ["Grub", "Fishing Lure"],
    type: "advanced",
    locations: ["wharf"],
  },
  "Barred Knifejaw": {
    baits: ["Grub", "Fishing Lure"],
    type: "advanced",
    locations: ["wharf"],
  },
  Tuna: {
    baits: ["Grub", "Red Wiggler", "Fishing Lure"],
    type: "expert",
    locations: ["wharf"],
  },
  "Mahi Mahi": {
    baits: ["Grub", "Red Wiggler", "Fishing Lure"],
    type: "expert",
    locations: ["wharf"],
  },
  "Blue Marlin": {
    baits: ["Grub", "Red Wiggler", "Fishing Lure"],
    type: "expert",
    locations: ["wharf"],
  },
  Oarfish: {
    baits: ["Red Wiggler", "Fishing Lure"],
    type: "expert",
    locations: ["wharf"],
  },
  "Football fish": {
    baits: ["Red Wiggler", "Fishing Lure"],
    type: "expert",
    locations: ["wharf"],
  },
  Sunfish: {
    baits: ["Red Wiggler", "Fishing Lure"],
    type: "expert",
    locations: ["wharf"],
  },
  Coelacanth: {
    baits: ["Red Wiggler", "Fishing Lure"],
    type: "expert",
    locations: ["wharf"],
  },
  Parrotfish: {
    baits: ["Red Wiggler", "Fishing Lure"],
    type: "expert",
    locations: ["beach"],
  },
  "Whale Shark": {
    baits: ["Red Wiggler", "Fishing Lure"],
    type: "expert",
    locations: ["wharf"],
  },
  "Saw Shark": {
    baits: ["Red Wiggler", "Fishing Lure"],
    type: "expert",
    locations: ["wharf"],
  },
  "White Shark": {
    baits: ["Red Wiggler", "Fishing Lure"],
    type: "expert",
    locations: ["wharf"],
  },
  "Twilight Anglerfish": {
    baits: ["Red Wiggler", "Grub", "Fishing Lure"],
    type: "marine marvel",
    locations: ["wharf"],
  },
  "Starlight Tuna": {
    baits: ["Red Wiggler", "Fishing Lure"],
    type: "marine marvel",
    locations: ["wharf"],
  },
  "Radiant Ray": {
    baits: ["Red Wiggler", "Fishing Lure"],
    type: "marine marvel",
    locations: ["wharf"],
  },
  "Phantom Barracuda": {
    baits: ["Grub", "Fishing Lure"],
    type: "marine marvel",
    locations: ["wharf"],
  },
  "Gilded Swordfish": {
    baits: ["Earthworm", "Red Wiggler", "Fishing Lure"],
    type: "marine marvel",
    locations: ["wharf"],
  },
  "Kraken Tentacle": {
    baits: ["Earthworm", "Grub", "Red Wiggler", "Fishing Lure"],
    type: "expert",
    locations: ["wharf"],
  },
};

export type Tide = "Dusktide" | "Dawnlight";

export type FishingConditions = "Sunny" | "Windy" | "Full Moon" | "Fish Frenzy";

export function getTide(utcTime: Date = new Date()): Tide {
  const hours = new Date(utcTime).getUTCHours();
  if (hours >= 0 && hours < 12) {
    return "Dawnlight";
  } else {
    return "Dusktide";
  }
}

/**
 * Difficulty 1-5 how hard the challenge will be
 */
export const FISH_DIFFICULTY: Partial<
  Record<FishName | MarineMarvelName, number>
> = {
  "Horse Mackerel": 1,
  Squid: 1,
  "Zebra Turkeyfish": 1,
  Ray: 1,
  "Hammerhead shark": 2,
  Sunfish: 2,
  Coelacanth: 2,
  "Barred Knifejaw": 3,
  "Whale Shark": 3,
  "Gilded Swordfish": 3,
  "Kraken Tentacle": 3,
  "Saw Shark": 4,
  "White Shark": 4,
  "Radiant Ray": 4,
  "Phantom Barracuda": 4,
  "Starlight Tuna": 5,
  "Twilight Anglerfish": 5,
};

export function getDailyFishingCount(state: GameState): number {
  const today = new Date().toISOString().split("T")[0];
  return state.fishing.dailyAttempts?.[today] ?? 0;
}

const DAILY_FISHING_ATTEMPT_LIMIT = 20;
export function getDailyFishingLimit(bumpkin: Bumpkin): number {
  const { pants } = bumpkin.equipped;

  if (pants === "Angler Waders") {
    return DAILY_FISHING_ATTEMPT_LIMIT + 10;
  }

  return DAILY_FISHING_ATTEMPT_LIMIT;
}
