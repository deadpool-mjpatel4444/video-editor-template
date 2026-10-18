import React, { useRef, useEffect, useCallback, useState } from "react";
import { Player, PlayerRef } from "@remotion/player";
import type { BaseProps } from "../templates/types";

interface ControlledPlayerProps {
  component: React.FC<BaseProps>;
  inputProps: BaseProps;
  durationInFrames: number;
  fps: number;
  compositionId?: string;
  onTimelineUpdate?: (frame: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export const ControlledPlayer: React.FC<ControlledPlayerProps> = ({
  component,
  inputProps,
  durationInFrames,
  fps,
  onTimelineUpdate,
  onPlayStateChange,
}) => {
  const playerRef = useRef<PlayerRef>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const handleFrameUpdate = () => {
      const frame = player.getCurrentFrame();
      setCurrentFrame(frame);
      onTimelineUpdate?.(frame);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlayStateChange?.(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    player.addEventListener("frameupdate", handleFrameUpdate);
    player.addEventListener("play", handlePlay);
    player.addEventListener("pause", handlePause);

    return () => {
      player.removeEventListener("frameupdate", handleFrameUpdate);
      player.removeEventListener("play", handlePlay);
      player.removeEventListener("pause", handlePause);
    };
  }, [onTimelineUpdate, onPlayStateChange]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const frame = Number(e.target.value);
    playerRef.current?.seekTo(frame);
    setCurrentFrame(frame);
    onTimelineUpdate?.(frame);
  }, [onTimelineUpdate]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  }, [isPlaying]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <Player
          ref={playerRef}
          component={component}
          inputProps={inputProps}
          durationInFrames={durationInFrames}
          fps={fps}
          compositionWidth={1920}
          compositionHeight={1080}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 0" }}>
        <button
          onClick={togglePlay}
          style={{
            background: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "6px 12px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <span style={{ fontSize: "14px", color: "#ccc", minWidth: "60px" }}>
          {currentFrame} / {durationInFrames}f
        </span>
        <input
          type="range"
          min={0}
          max={durationInFrames - 1}
          value={currentFrame}
          onChange={handleSeek}
          style={{ flex: 1, cursor: "pointer" }}
        />
      </div>
    </div>
  );
};
