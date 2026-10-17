import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";
import { LowerThirdProps } from "./types";

export const LowerThirdTemplate: React.FC<LowerThirdProps> = ({
  name,
  role,
  accentColor = "#4ECDC4",
  position = "bottom-left",
}) => {
  const frame = useCurrentFrame();

  // Slide in from side based on position
  const slideX =
    position === "bottom-left"
      ? interpolate(frame, [0, 20, 160, 180], [-400, 0, 0, -400])
      : position === "bottom-right"
      ? interpolate(frame, [0, 20, 160, 180], [400, 0, 0, 400])
      : interpolate(frame, [0, 20, 160, 180], [0, 0, 0, -200]);

  const opacity = interpolate(frame, [0, 10, 150, 170], [0, 1, 1, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems:
          position === "bottom-left"
            ? "flex-start"
            : position === "bottom-right"
            ? "flex-end"
            : "center",
        padding: position === "bottom-center" ? "0 10%" : "10%",
        paddingBottom: "8%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          transform: `translateX(${slideX}px)`,
          opacity,
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: "120px",
            height: "6px",
            backgroundColor: accentColor,
            borderRadius: "3px",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          {name}
        </div>

        {/* Role */}
        {role && (
          <div
            style={{
              fontSize: "32px",
              color: "#aaa",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
            }}
          >
            {role}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
