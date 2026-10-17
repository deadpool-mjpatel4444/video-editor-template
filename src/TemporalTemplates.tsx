import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

export type LowerThirdProps = {
  name: string;
  role: string;
  accentColor: string;
};

export const LowerThird: React.FC<LowerThirdProps> = ({
  name,
  role,
  accentColor,
}) => {
  const frame = useCurrentFrame();

  // Slide in from left, hold, slide out
  const slideX = interpolate(frame, [0, 15, 150, 165], [-200, 0, 0, -200]);
  const opacity = interpolate(frame, [0, 10, 140, 150], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", padding: "10%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          transform: `translateX(${slideX}px)`,
          opacity,
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: "100px",
            height: "6px",
            backgroundColor: accentColor,
            marginBottom: "8px",
          }}
        />
        {/* Name */}
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {name}
        </div>
        {/* Role */}
        <div
          style={{
            fontSize: "28px",
            color: "#aaa",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {role}
        </div>
      </div>
    </AbsoluteFill>
  );
};
