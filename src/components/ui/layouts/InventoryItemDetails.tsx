import classNames from "classnames";
import Decimal from "decimal.js-light";
import { KNOWN_IDS } from "features/game/types";
import { CollectibleName } from "features/game/types/craftables";
import { GameState, InventoryItemName } from "features/game/types/game";
import { ITEM_DETAILS } from "features/game/types/images";
import React from "react";
import { RequirementLabel } from "../RequirementsLabel";
import { SquareIcon } from "../SquareIcon";
import { isCollectibleBuilt } from "features/game/lib/collectibleBuilt";

/**
 * The props for the details for items.
 * @param item The item.
 */
interface ItemDetailsProps {
  item: InventoryItemName;
}

/**
 * The props for harvests requirement label.
 * @param minHarvest The minimum number of harvests.
 * @param maxHarvest The maximum number of harvests.
 */
interface HarvestsRequirementProps {
  minHarvest: number;
  maxHarvest: number;
}

/**
 * The props for the inventory properties.
 * @param timeSeconds The wait time in seconds for using the item.
 * @param harvests The min/max harvests for the item.
 * @param xp The XP gained for consuming the item.
 * @param showOpenSeaLink Whether to show the open sea link or not.
 */
interface PropertiesProps {
  timeSeconds?: number;
  harvests?: HarvestsRequirementProps;
  xp?: Decimal;
  showOpenSeaLink?: boolean;
}

/**
 * The props for the component.
 * @param wideLayout Whether to always use the wide layout for large screen or not.
 * @param details The item details.
 * @param requirements The item properties.
 * @param actionView The view for displaying the item action.
 */
interface Props {
  wideLayout?: boolean;
  game: GameState;
  details: ItemDetailsProps;
  properties?: PropertiesProps;
  actionView?: JSX.Element;
}

/**
 * The view for displaying item name, details, properties and action.
 * @props The component props.
 */
export const InventoryItemDetails: React.FC<Props> = ({
  wideLayout = false,
  game,
  details,
  properties,
  actionView,
}: Props) => {
  const getItemDetail = () => {
    const item = ITEM_DETAILS[details.item];
    const icon = item.image;
    const title = details.item;

    let description = item.description;
    if (item.boostedDescriptions) {
      for (const boostedDescription of item.boostedDescriptions) {
        if (
          isCollectibleBuilt({
            name: boostedDescription.name as CollectibleName,
            game,
          })
        ) {
          description = boostedDescription.description;
        }
      }
    }

    return (
      <>
        <div
          className={classNames("flex space-x-2 justify-start items-center", {
            "sm:flex-col-reverse md:space-x-0": !wideLayout,
          })}
        >
          {icon && (
            <div className={classNames("", { "sm:mt-2": !wideLayout })}>
              <SquareIcon icon={icon} width={14} />
            </div>
          )}
          <span className={classNames("", { "sm:text-center": !wideLayout })}>
            {title}
          </span>
        </div>
        <span
          className={classNames("text-xs sm:mt-1 whitespace-pre-line", {
            "sm:text-center": !wideLayout,
          })}
        >
          {description}
        </span>
      </>
    );
  };

  const getProperties = () => {
    if (!properties) return <></>;

    return (
      <div
        className={classNames(
          "border-t border-white w-full my-2 pt-2 flex justify-between gap-x-3 gap-y-2 flex-wrap",
          { "sm:flex-col sm:items-center sm:flex-nowrap": !wideLayout }
        )}
      >
        {/* Time requirement display */}
        {!!properties.timeSeconds && (
          <RequirementLabel type="time" waitSeconds={properties.timeSeconds} />
        )}

        {/* Harvests display */}
        {!!properties.harvests && (
          <RequirementLabel
            type="harvests"
            minHarvest={properties.harvests.minHarvest}
            maxHarvest={properties.harvests.maxHarvest}
          />
        )}

        {/* XP display */}
        {!!properties.xp && <RequirementLabel type="xp" xp={properties.xp} />}

        {/* OpenSea link */}
        {properties.showOpenSeaLink && (
          <a
            href={`https://opensea.io/assets/matic/0x22d5f9b75c524fec1d6619787e582644cd4d7422/${
              KNOWN_IDS[details.item]
            }`}
            className="underline text-xxs pb-1 pt-0.5 hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenSea
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col justify-center px-1 py-0">
        {getItemDetail()}
        {getProperties()}
      </div>
      {actionView}
    </div>
  );
};
