import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GRID_WIDTH_PX } from "features/game/lib/constants";
import ScrollContainer from "react-indiana-drag-scroll";
import background from "assets/land/retreat.webp";
import frozenBackground from "assets/land/frozen_retreat.png";
import { RetreatBank } from "./components/bank/RetreatBank";
import { RetreatStorageHouse } from "./components/storageHouse/RetreatStorageHouse";
import { RetreatHotAirBalloon } from "./components/hotAirBalloon/RetreatHotAirBalloon";
import { RetreatTailor } from "./components/tailor/RetreatTailor";
import { RetreatBlacksmith } from "./components/blacksmith/RetreatBlacksmith";
import { Resale } from "./components/resale/Resale";
import { RetreatWishingWell } from "./components/wishingWell/RetreatWishingWell";
import { IslandTravelWrapper } from "./components/islandTravel/IslandTravelWrapper";
import { Section, useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";
import { Context } from "features/game/GoblinProvider";
import { useActor } from "@xstate/react";
import { Modal } from "react-bootstrap";
import { Panel } from "components/ui/Panel";
import { Loading, Splash } from "features/auth/components";
import { Forbidden } from "features/auth/components/Forbidden";
import { ErrorMessage } from "features/auth/ErrorMessage";
import { ErrorCode } from "lib/errors";
import {
  RETREAT_LEVEL_REQUIREMENT,
  StateValues,
} from "features/game/lib/goblinMachine";
import { Withdrawing } from "features/game/components/Withdrawing";
import { Withdrawn } from "features/game/components/Withdrawn";
import { getBumpkinLevel } from "features/game/lib/level";
// random seal spawn spots
import { randomInt } from "lib/utils/random";

import { Hud } from "./Hud";
import { Minting } from "features/game/components/Minting";
import { Minted } from "features/game/components/Minted";
import { Refreshing } from "features/auth/components/Refreshing";
import { RetreatPirate } from "./components/pirate/RetreatPirate";
import { GameBoard } from "components/GameBoard";
import { Auctioneer } from "./components/auctioneer/Auctioneer";
import { PersonhoodContent } from "./components/personhood/PersonhoodContent";
import { GoldPassModal } from "features/game/expansion/components/GoldPass";
import { Notifications } from "features/game/components/Notifications";

const spawn = [
  [35, 15],
  [10, 15],
  [10, 25],
  [35, 28],
  [21, 19],
];

const getRandomSpawn = () => {
  const randomSpawn = randomInt(0, 5);
  return spawn[randomSpawn];
};

const SHOW_MODAL: Partial<Record<StateValues, boolean>> = {
  loading: true,
  minting: true,
  minted: true,
  withdrawing: true,
  withdrawn: true,
  playing: false,
  error: true,
  depositing: true,
  refreshing: true,
  tradeNotification: true,
};

export const Game = () => {
  const container = useRef(null);
  const navigate = useNavigate();
  const { goblinService } = useContext(Context);
  const [goblinState] = useActor(goblinService);
  const [scrollIntoView] = useScrollIntoView();
  const [retreatLoaded, setRetreatLoaded] = useState(false);
  const [sealSpawn] = useState(getRandomSpawn());
  const [showGoldPassModal, setShowGoldPassModal] = useState<boolean>(false);

  const { bumpkin, inventory } = goblinState.context.state;

  useLayoutEffect(() => {
    if (retreatLoaded) {
      scrollIntoView(Section.RetreatBackground, "auto");

      if (!inventory["Gold Pass"]) {
        setShowGoldPassModal(true);
      }
    }
  }, [retreatLoaded]);

  const handleGoldPassModalClose = () => {
    setShowGoldPassModal(false);
    navigate("/");
  };

  const hasRequiredLevel =
    bumpkin && getBumpkinLevel(bumpkin.experience) >= RETREAT_LEVEL_REQUIREMENT;

  return (
    <>
      <Modal
        show={SHOW_MODAL[goblinState.value as StateValues]}
        centered
        backdrop={retreatLoaded}
      >
        <Panel className="text-shadow">
          {goblinState.matches("error") && (
            <ErrorMessage
              errorCode={goblinState.context.errorCode as ErrorCode}
            />
          )}
          {goblinState.matches("withdrawing") && <Withdrawing />}
          {goblinState.matches("loading") && <Loading />}
          {goblinState.matches("withdrawn") && <Withdrawn />}
          {goblinState.matches("minting") && <Minting />}
          {goblinState.matches("minted") && <Minted />}
          {goblinState.matches("depositing") && <Loading text="Depositing" />}
          {goblinState.matches("tradeNotification") && <Notifications />}

          {goblinState.matches("refreshing") && <Refreshing />}
        </Panel>
      </Modal>

      {/*Anima iframe has zIndex 1000, set this componenet to 999*/}
      {goblinState.matches("provingPersonhood") && (
        <Modal
          className="z-[999]"
          backdropClassName="z-[999]"
          show={true}
          centered
          onHide={() => goblinService.send("PERSONHOOD_CANCELLED")}
        >
          <Panel className="text-shadow">
            <PersonhoodContent />
          </Panel>
        </Modal>
      )}

      <ScrollContainer
        className="bg-blue-300 overflow-scroll relative w-full h-full overscroll-none"
        innerRef={container}
      >
        <GameBoard>
          {hasRequiredLevel && !goblinState.matches("loading") && (
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${40 * GRID_WIDTH_PX}px`,
                height: `${40 * GRID_WIDTH_PX}px`,
              }}
            >
              {Date.now() > new Date("2023-12-10").getTime() &&
              Date.now() < new Date("2023-12-27").getTime() ? (
                <img
                  src={frozenBackground}
                  className="absolute inset-0 w-full h-full"
                  id={Section.RetreatBackground}
                  onLoad={() => setRetreatLoaded(true)}
                />
              ) : (
                <img
                  src={background}
                  className="absolute inset-0 w-full h-full"
                  id={Section.RetreatBackground}
                  onLoad={() => setRetreatLoaded(true)}
                />
              )}

              {/* No Gold Pass Modal */}
              <Modal
                show={showGoldPassModal}
                centered
                backdrop="static"
                keyboard={false}
              >
                <GoldPassModal onClose={handleGoldPassModalClose} />
              </Modal>

              <RetreatBank />
              <RetreatStorageHouse />
              <RetreatHotAirBalloon />
              <RetreatTailor />
              <RetreatBlacksmith />
              <Auctioneer />
              <RetreatPirate />
              <Resale />
              <RetreatWishingWell />
              <IslandTravelWrapper />
            </div>
          )}
          {!hasRequiredLevel && !goblinState.matches("loading") && (
            <Splash>
              <Forbidden />
            </Splash>
          )}
        </GameBoard>
      </ScrollContainer>
      <div className="absolute z-20">
        <Hud />
      </div>
    </>
  );
};
