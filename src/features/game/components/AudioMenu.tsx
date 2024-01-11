import React, { useEffect, useState } from "react";
import { Howler } from "howler";
import play from "assets/icons/play.png";
import pause from "assets/icons/pause.png";
import arrow_next from "assets/icons/arrow_next.png";
import arrow_previous from "assets/icons/arrow_previous.png";
import sound_on from "assets/icons/sound_on.png";
import sound_off from "assets/icons/sound_off.png";
import { Modal } from "react-bootstrap";
import { CloseButtonPanel } from "./CloseablePanel";
import { Song } from "assets/songs/playlist";
import { PIXEL_SCALE } from "../lib/constants";
import {
  AudioLocalStorageKeys,
  cacheAudioSetting,
  getCachedAudioSetting,
} from "../lib/audio";

interface Props {
  musicPlayer: React.MutableRefObject<HTMLAudioElement>;
  song: Song;
  handlePreviousSong: () => void;
  handleNextSong: () => void;
  show: boolean;
  onClose: () => void;
}

export const AudioMenu: React.FC<Props> = ({
  musicPlayer,
  song,
  handlePreviousSong,
  handleNextSong,
  show,
  onClose,
}) => {
  const [audioMuted, setAudioMuted] = useState<boolean>(
    getCachedAudioSetting<boolean>(AudioLocalStorageKeys.audioMuted, false)
  );
  const [musicPaused, setMusicPaused] = useState<boolean>(
    // by the default Chrome policy doesn't allow autoplay
    !!navigator.userAgent.match(/chrome|chromium|crios/i) ||
      getCachedAudioSetting<boolean>(AudioLocalStorageKeys.musicPaused, false)
  );

  useEffect(() => {
    Howler.mute(audioMuted);
    cacheAudioSetting(AudioLocalStorageKeys.audioMuted, audioMuted);
  }, [audioMuted]);

  useEffect(() => {
    if (musicPlayer.current) {
      if (musicPaused) {
        musicPlayer.current.pause();
      } else {
        musicPlayer.current.play();
        musicPlayer.current.muted = false;
      }
    }
    cacheAudioSetting(AudioLocalStorageKeys.musicPaused, musicPaused);
  }, [musicPaused]);

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        if (!musicPaused) {
          musicPlayer.current.play();
          musicPlayer.current.muted = false;
        }
        Howler.mute(audioMuted);
      } else {
        musicPlayer.current.pause();
        Howler.mute(true);
      }
    });
  }, []);

  return (
    <Modal show={show} centered onHide={onClose}>
      <CloseButtonPanel title="Audio Settings" onClose={onClose}>
        <div className="p-1 relative">
          <p className="mb-2">Music</p>
          {/* Music display */}
          <div className="mb-1.5 overflow-hidden bg-brown-200 ">
            <p
              className="whitespace-no-wrap w-fit text-white text-sm pt-1 pb-2"
              style={{
                animation: "marquee-like-effect 10s infinite linear",
                whiteSpace: "nowrap",
                animationPlayState: musicPaused ? "paused" : "running",
              }}
            >
              {song.name} - {song.artist}
            </p>
          </div>

          {/* Music controls */}
          <div className="flex space-x-2 justify-content-between mb-4">
            <img
              src={arrow_previous}
              className="cursor-pointer hover:img-highlight"
              onClick={handlePreviousSong}
              alt="previous song button"
              style={{
                width: `${PIXEL_SCALE * 11}px`,
              }}
            />
            <img
              src={musicPaused ? play : pause}
              className="cursor-pointer hover:img-highlight"
              onClick={() => setMusicPaused(!musicPaused)}
              alt="play / pause song button"
              style={{
                width: `${PIXEL_SCALE * 10}px`,
              }}
            />
            <img
              src={arrow_next}
              className="cursor-pointer hover:img-highlight"
              onClick={handleNextSong}
              alt="next song button"
              style={{
                width: `${PIXEL_SCALE * 11}px`,
              }}
            />
          </div>

          {/* Sound effects controls */}
          <p className="mb-2">Sound Effects: {audioMuted ? "Off" : "On"}</p>
          <img
            src={audioMuted ? sound_off : sound_on}
            className="cursor-pointer hover:img-highlight"
            onClick={() => setAudioMuted(!audioMuted)}
            alt="mute / unmute sound effects button"
            style={{
              width: `${PIXEL_SCALE * 13}px`,
            }}
          />
        </div>
      </CloseButtonPanel>
    </Modal>
  );
};
