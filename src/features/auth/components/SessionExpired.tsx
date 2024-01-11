import React, { useContext } from "react";
import * as Auth from "features/auth/lib/Provider";

import humanDeath from "assets/npcs/human_death.gif";
import { Button } from "components/ui/Button";
import { removeJWT } from "../actions/social";
import { WalletContext } from "features/wallet/WalletProvider";

export const SessionExpired: React.FC = () => {
  const { authService } = useContext(Auth.Context);
  const { walletService } = useContext(WalletContext);

  return (
    <>
      <div className="flex flex-col text-center text-shadow items-center p-1">
        <div className="flex mb-3 items-center ml-8">
          <img src={humanDeath} alt="Warning" className="w-full" />
        </div>
        <p className="text-center mb-3">Session expired!</p>

        <p className="text-center mb-4 text-xs">
          {`It looks like your session has expired. Please refresh the page to continue playing.`}
        </p>
      </div>
      <Button
        onClick={() => {
          removeJWT();
          authService.send("REFRESH");
          walletService.send("RESET");
        }}
      >
        Refresh
      </Button>
    </>
  );
};
