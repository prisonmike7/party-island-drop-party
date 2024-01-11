import React, { useContext, useState } from "react";
import { useActor } from "@xstate/react";

import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";

import { Context } from "features/game/GameProvider";
import { getKeys } from "features/game/types/craftables";
import { ITEM_DETAILS } from "features/game/types/images";
import { Decimal } from "decimal.js-light";
import {
  BeachBountyTreasure,
  SELLABLE_TREASURE,
} from "features/game/types/treasure";
import { getSellPrice } from "features/game/events/landExpansion/treasureSold";
import { SplitScreenView } from "components/ui/SplitScreenView";
import { ShopSellDetails } from "components/ui/layouts/ShopSellDetails";

export const TreasureShopSell: React.FC = () => {
  const beachBountyTreasure = getKeys(SELLABLE_TREASURE).sort((a, b) =>
    SELLABLE_TREASURE[a].sellPrice
      .sub(SELLABLE_TREASURE[b].sellPrice)
      .toNumber()
  );

  const [selectedName, setSelectedName] = useState<BeachBountyTreasure>(
    beachBountyTreasure[0]
  );

  const selected = SELLABLE_TREASURE[selectedName];
  const { gameService } = useContext(Context);
  const [
    {
      context: { state },
    },
  ] = useActor(gameService);

  const inventory = state.inventory;

  const price = getSellPrice(selected, state);
  const amount = inventory[selectedName] || new Decimal(0);

  const sell = (amount = 1) => {
    gameService.send("treasure.sold", {
      item: selectedName,
      amount,
    });
  };

  return (
    <SplitScreenView
      panel={
        <ShopSellDetails
          details={{
            item: selectedName,
          }}
          properties={{
            sfl: price,
          }}
          actionView={
            <Button disabled={amount.lt(1)} onClick={() => sell(1)}>
              Sell
            </Button>
          }
        />
      }
      content={
        <>
          {beachBountyTreasure.map((name: BeachBountyTreasure) => (
            <Box
              isSelected={selectedName === name}
              key={name}
              onClick={() => setSelectedName(name)}
              image={ITEM_DETAILS[name].image}
              count={inventory[name] || new Decimal(0)}
            />
          ))}
        </>
      }
    />
  );
};
