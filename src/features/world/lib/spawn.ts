import { Coordinates } from "features/game/expansion/components/MapPlacement";
import { SceneId } from "../mmoMachine";

export type SpawnLocation = Record<
  SceneId,
  { default: Coordinates } & Partial<Record<SceneId, Coordinates>>
>;

export const SPAWNS: SpawnLocation = {
  crop_boom: {
    default: {
      x: 220,
      y: 422,
    },
  },
  mushroom_forest: {
    default: {
      x: 220,
      y: 422,
    },
  },
  beach: {
    default: {
      x: 438,
      y: 652,
    },
  },
  plaza: {
    default: {
      x: 440,
      y: 400,
    },
    windmill_floor: {
      x: 420,
      y: 167,
    },
    auction_house: {
      x: 600,
      y: 300,
    },
    decorations_shop: {
      x: 793,
      y: 287,
    },
    clothes_shop: {
      x: 264,
      y: 300,
    },
    woodlands: {
      x: 867,
      y: 142,
    },
    beach: {
      x: 26,
      y: 318,
    },
  },
  auction_house: {
    default: {
      x: 170,
      y: 242,
    },
  },
  clothes_shop: {
    default: {
      x: 144,
      y: 245,
    },
  },
  decorations_shop: {
    default: {
      x: 81,
      y: 215,
    },
  },
  windmill_floor: {
    default: {
      x: 80,
      y: 140,
    },
  },
  woodlands: {
    default: {
      x: 10,
      y: 290,
    },
  },
};
