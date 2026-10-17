import React from "react";
import { Player } from "@remotion/player";
import type { BaseProps } from "../templates/types";

interface PreviewProps {
  component: React.FC<BaseProps>;
  inputProps: BaseProps;
  durationInFrames: number;
  fps: number;
}

export const Preview: React.FC<PreviewProps> = ({
  component,
  inputProps,
  durationInFrames,
  fps,
}) => {
  return (
    <Player
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
      controls
    />
  );
};