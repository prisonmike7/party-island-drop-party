import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { useSelector } from "@xstate/react";
import {
  Routes,
  Route,
  HashRouter,
  Navigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

import * as AuthProvider from "features/auth/lib/Provider";

import { Splash } from "features/auth/components/Splash";
import { Auth } from "features/auth/Auth";
import { Forbidden } from "features/auth/components/Forbidden";
import { LandExpansion } from "features/game/expansion/LandExpansion";
import { CONFIG } from "lib/config";
import { Builder } from "features/builder/Builder";
import { AuthMachineState } from "features/auth/lib/authMachine";
import { ZoomProvider } from "components/ZoomProvider";
import { LoadingFallback } from "./LoadingFallback";

// Lazy load routes
const World = lazy(() =>
  import("features/world/World").then((m) => ({ default: m.World }))
);
const CommunityTools = lazy(() =>
  import("features/world/ui/CommunityTools").then((m) => ({
    default: m.CommunityTools,
  }))
);
const Retreat = lazy(() =>
  import("features/retreat/Retreat").then((m) => ({ default: m.Retreat }))
);

/**
 * FarmID must always be passed to the /retreat/:id route.
 * The problem is that when deep-linking to goblin trader, the FarmID will not be present.
 * This reacter-router helper component will compute correct route and navigate to retreat.
 */
const TraderDeeplinkHandler: React.FC<{ farmId?: number }> = ({ farmId }) => {
  const [params] = useSearchParams();

  return <Navigate to={`/retreat/0?${createSearchParams(params)}`} replace />;
};

const selectState = (state: AuthMachineState) => ({
  isAuthorised: state.matches("connected"),
  isVisiting: state.matches("visiting"),
});

/**
 * Entry point for game which reflects the user session state
 * Controls flow of authorised and unauthorised games
 */
export const Navigation: React.FC = () => {
  const { authService } = useContext(AuthProvider.Context);
  const state = useSelector(authService, selectState);

  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const _showGame = state.isAuthorised || state.isVisiting;

    // TODO: look into this further
    // This is to prevent a modal clash when the authmachine switches
    // to the game machine.
    setTimeout(() => setShowGame(_showGame), 20);
  }, [state]);

  return (
    <>
      <Auth />
      {showGame ? (
        <ZoomProvider>
          <HashRouter>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Forbid entry to Goblin Village when in Visiting State show Forbidden screen */}
                {!state.isVisiting && (
                  <Route
                    path="/goblins"
                    element={
                      <Splash>
                        <Forbidden />
                      </Splash>
                    }
                  />
                )}
                <Route path="/world/:name" element={<World key="world" />} />
                <Route
                  path="/community/:name"
                  element={<World key="community" isCommunity />}
                />
                {CONFIG.NETWORK === "mumbai" && (
                  <Route
                    path="/community-tools"
                    element={<CommunityTools key="community-tools" />}
                  />
                )}

                <Route
                  path="/visit/*"
                  element={<LandExpansion key="visit" />}
                />

                <Route path="/retreat">
                  <Route index element={<TraderDeeplinkHandler />} />
                  <Route path=":id" element={<Retreat key="retreat" />} />
                </Route>
                {CONFIG.NETWORK === "mumbai" && (
                  <Route path="/builder" element={<Builder key="builder" />} />
                )}

                <Route path="*" element={<LandExpansion key="land" />} />
              </Routes>
            </Suspense>
          </HashRouter>
        </ZoomProvider>
      ) : (
        <Splash />
      )}
    </>
  );
};
