import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

export type EndScreenProps = {
  title: string;
  cta: string;
  accentColor: string;
};

export const EndScreen: React.FC<EndScreenProps> = ({
  title,
  cta,
  accentColor,
}) => {
  const frame = useCurrentFrame();

  // Scale in + fade
  const scale = interpolate(frame, [0, 20], [0.8, 1], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a2e",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: "96px",
          fontWeight: 900,
          color: "#fff",
          fontFamily: "Inter, sans-serif",
          transform: `scale(${scale})`,
          opacity,
          textAlign: "center",
        }}
      >
        {title}
      </div>
      
      <div
        style={{
          marginTop: "40px",
          padding: "20px 48px",
          backgroundColor: accentColor,
          borderRadius: "8px",
          fontSize: "48px",
          fontWeight: 600,
          color: "#fff",
          fontFamily: "Inter, sans-serif",
          opacity: interpolate(frame, [15, 30], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {cta}
      </div>

      {/* Decorative lines */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          width: "80%",
          height: "2px",
          backgroundColor: accentColor,
          transform: `scaleX(${interpolate(frame, [10, 40], [0, 1])})`,
          transformOrigin: "center",
        }}
      />
    </AbsoluteFill>
  );
};
