import React, { useContext } from "react";
import { Button } from "components/ui/Button";

import humanDeath from "assets/npcs/human_death.gif";

import * as AuthProvider from "features/auth/lib/Provider";
import { removeJWT } from "../actions/social";
import { WalletContext } from "features/wallet/WalletProvider";

export const Blocked: React.FC = () => {
  const { authService } = useContext(AuthProvider.Context);
  const { walletService } = useContext(WalletContext);

  const tryAgain = () => {
    removeJWT();

    authService.send("REFRESH");
    walletService.send("RESET");
  };

  return (
    <div className="flex flex-col text-center text-shadow items-center p-1">
      <div className="flex mb-3 items-center ml-8">
        <img src={humanDeath} alt="Warning" className="w-full" />
      </div>
      <p className="text-center mb-3">Beta testers only!</p>

      <p className="text-center mb-2 text-xs">
        {`You don't have access to the game yet.`}
      </p>
      <p className="text-center mb-4 text-xs">
        Make sure you have joined the{" "}
        <a
          className="underline hover:text-white"
          href="https://discord.gg/sunflowerland"
          target="_blank"
          rel="noreferrer"
        >
          Sunflower Land Discord server
        </a>
        {`, go to the #verify channel and have the "farmer" role.`}
      </p>
      <Button onClick={tryAgain} className="overflow-hidden mb-2">
        <span>Try again</span>
      </Button>
    </div>
  );
};
