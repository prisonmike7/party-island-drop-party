import { CollectibleLocation } from "features/game/types/collectibles";
import { GameState } from "features/game/types/game";
import cloneDeep from "lodash.clonedeep";

export type PlaceBudAction = {
  type: "bud.placed";
  id: string;
  coordinates: {
    x: number;
    y: number;
  };
  location: CollectibleLocation;
};

type Options = {
  state: Readonly<GameState>;
  action: PlaceBudAction;
  createdAt?: number;
};

export function placeBud({
  state,
  action,
  createdAt = Date.now(),
}: Options): GameState {
  const copy = cloneDeep(state);

  const bud = copy.buds?.[Number(action.id)];

  if (!bud) throw new Error("This bud does not exist");

  if (bud.coordinates) throw new Error("This bud is already placed");

  bud.coordinates = action.coordinates;
  bud.location = action.location;

  return copy;
}
