import React from "react";
import { Composition } from "remotion";
import { MyVideo } from "./MyVideo";
import { LowerThird } from "./TemporalTemplates";
import { EndScreen } from "./EndScreen";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main intro composition */}
      <Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Hello World",
          subtitle: "Template editor",
          variant: "default" as const,
          accentColor: "#FF6B6B",
        }}
      />

      {/* Lower third composition */}
      <Composition
        id="LowerThird"
        component={LowerThird}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          name: "Monank Sojitra",
          role: "Full Stack Developer",
          accentColor: "#4ECDC4",
        }}
      />

      {/* End screen composition */}
      <Composition
        id="EndScreen"
        component={EndScreen}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Thanks for Watching",
          cta: "Subscribe Now",
          accentColor: "#FF6B6B",
        }}
      />
    </>
  );
};