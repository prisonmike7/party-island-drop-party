import React, { useCallback, useEffect, useState } from "react";

import { Panel } from "../../../components/ui/Panel";
import { Equipped } from "features/game/types/bumpkin";
import classNames from "classnames";
import { TypingMessage } from "features/world/ui/TypingMessage";
import { Button } from "components/ui/Button";

export type Message = {
  text: string;
  jsx?: JSX.Element;
  actions?: { text: string; cb: () => void }[];
};

interface Props {
  onClose: () => void;
  bumpkinParts?: Partial<Equipped>;
  className?: string;
  message: Message[];
}

/**
 * A custom panel built for talking NPCs.
 */
export const SpeakingModal: React.FC<Props> = ({
  onClose,
  bumpkinParts,
  className,
  message,
}) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentTextEnded, setCurrentTextEnded] = useState(false);
  const [forceShowFullMessage, setForceShowFullMessage] = useState(false);

  const handleClick = useCallback(() => {
    if (!currentTextEnded) {
      setCurrentTextEnded(true);
      setForceShowFullMessage(true);
      return;
    }

    const isLast = currentMessage === message.length - 1;
    const hasActions = message[currentMessage].actions?.length;

    if (isLast && hasActions) {
      return;
    }

    setCurrentTextEnded(false);
    setForceShowFullMessage(false);

    if (!isLast) {
      setCurrentMessage(currentMessage + 1);
      return;
    }

    setCurrentMessage(0);
    onClose();
  }, [currentTextEnded, currentMessage, message.length]);

  useEffect(() => {
    const handleKeyPressed = (e: KeyboardEvent) => {
      if (["Enter", "Space", "Escape"].includes(e.code)) {
        handleClick();
      }
    };
    window.addEventListener("keydown", handleKeyPressed);

    return () => window.removeEventListener("keydown", handleKeyPressed);
  }, [handleClick]);

  const maxLength = Math.max(...message.map((m) => m.text.length));
  let lines = maxLength / 30;
  const hasButton = message.find((m) => !!m.actions);
  if (hasButton) {
    lines += 1;
  }

  const showActions =
    (currentTextEnded || forceShowFullMessage) &&
    message[currentMessage]?.actions;
  return (
    <Panel
      className={classNames("relative w-full", className)}
      bumpkinParts={bumpkinParts}
    >
      <div style={{ minHeight: `${lines * 25}px` }} className="flex flex-col">
        <div
          className={classNames("flex-1 p-1 flex flex-col mb-1", {
            "cursor-pointer": !currentTextEnded || !showActions,
          })}
          onClick={handleClick}
        >
          <TypingMessage
            message={message[currentMessage]?.text ?? ""}
            key={currentMessage}
            onMessageEnd={() => setCurrentTextEnded(true)}
            forceShowFullMessage={forceShowFullMessage}
          />
          {currentTextEnded && message[currentMessage]?.jsx}
        </div>
        {!showActions && (
          <p className="text-xxs italic float-right p-1">(Tap to continue)</p>
        )}
        {showActions && (
          <div className="flex flex-col-reverse space-y-1 mt-1 space-y-reverse md:flex-row md:space-y-0 md:space-x-1">
            {message[currentMessage]?.actions?.map((action) => (
              <Button
                key={action.text}
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  action.cb();
                }}
              >
                {action.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
};

export const SpeakingText: React.FC<Pick<Props, "message" | "onClose">> = ({
  message,
  onClose,
}) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentTextEnded, setCurrentTextEnded] = useState(false);
  const [forceShowFullMessage, setForceShowFullMessage] = useState(false);

  const maxLength = Math.max(...message.map((m) => m.text.length));
  const lines = maxLength / 30;

  const handleClick = useCallback(() => {
    if (!currentTextEnded) {
      setCurrentTextEnded(true);
      setForceShowFullMessage(true);
      return;
    }

    const isLast = currentMessage === message.length - 1;
    const hasActions = message[currentMessage]?.actions?.length;

    if (isLast && hasActions) {
      return;
    }

    setCurrentTextEnded(false);
    setForceShowFullMessage(false);

    if (!isLast) {
      setCurrentMessage(currentMessage + 1);
      return;
    }

    setCurrentMessage(0);
    onClose();
    return;
  }, [currentTextEnded, currentMessage, message.length]);

  useEffect(() => {
    const handleKeyPressed = (e: KeyboardEvent) => {
      if (["Enter", "Space", "Escape"].includes(e.code)) {
        handleClick();
      }
    };
    window.addEventListener("keydown", handleKeyPressed);

    return () => window.removeEventListener("keydown", handleKeyPressed);
  }, [handleClick]);

  const showActions =
    (currentTextEnded || forceShowFullMessage) &&
    message[currentMessage]?.actions;

  return (
    <>
      <div
        className={classNames("flex-1 p-1 flex flex-col mb-1", {
          "cursor-pointer": !currentTextEnded || !showActions,
        })}
        onClick={handleClick}
        style={{ minHeight: `${lines * 25}px` }}
      >
        <div className="flex-1 pb-2">
          <TypingMessage
            message={message[currentMessage]?.text}
            key={currentMessage}
            onMessageEnd={() => setCurrentTextEnded(true)}
            forceShowFullMessage={forceShowFullMessage}
          />
          {currentTextEnded && message[currentMessage]?.jsx}
        </div>
        {!showActions && (
          <p className="text-xxs italic float-right">(Tap to continue)</p>
        )}
      </div>
      {showActions && (
        <div className="flex space-x-1">
          {message[currentMessage]?.actions?.map((action) => (
            <Button
              key={action.text}
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                action.cb();
              }}
            >
              {action.text}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};
