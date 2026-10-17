import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";
import { EndScreenProps } from "./types";

export const EndScreenTemplate: React.FC<EndScreenProps> = ({
  title,
  cta,
  accentColor = "#FF6B6B",
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
      {/* Title */}
      <div
        style={{
          fontSize: "100px",
          fontWeight: 900,
          color: "#fff",
          fontFamily: "Inter, sans-serif",
          transform: `scale(${scale})`,
          opacity,
          textAlign: "center",
          textShadow: "0 4px 30px rgba(0,0,0,0.5)",
        }}
      >
        {title}
      </div>

      {/* CTA Button */}
      <div
        style={{
          marginTop: "50px",
          padding: "24px 64px",
          backgroundColor: accentColor,
          borderRadius: "12px",
          fontSize: "52px",
          fontWeight: 700,
          color: "#fff",
          fontFamily: "Inter, sans-serif",
          opacity: interpolate(frame, [20, 40], [0, 1], {
            extrapolateRight: "clamp",
          }),
          transform: `scale(${interpolate(frame, [20, 40], [0.8, 1], { extrapolateRight: "clamp" })})`,
          boxShadow: `0 0 40px ${accentColor}60`,
        }}
      >
        {cta}
      </div>

      {/* Decorative lines */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          width: "80%",
          height: "3px",
          backgroundColor: accentColor,
          transform: `scaleX(${interpolate(frame, [10, 50], [0, 1], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center",
          opacity: 0.6,
        }}
      />

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "80px",
          height: "80px",
          borderTop: `4px solid ${accentColor}`,
          borderLeft: `4px solid ${accentColor}`,
          opacity: interpolate(frame, [30, 60], [0, 0.8], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "80px",
          height: "80px",
          borderTop: `4px solid ${accentColor}`,
          borderRight: `4px solid ${accentColor}`,
          opacity: interpolate(frame, [30, 60], [0, 0.8], {
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
