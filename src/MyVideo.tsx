import React from "react";
import { useCurrentFrame, interpolate, spring, AbsoluteFill } from "remotion";

export type VideoProps = {
  title: string;
  subtitle: string;
  variant: "default" | "minimal" | "bold";
  accentColor: string;
};

export const MyVideo: React.FC<VideoProps> = ({
  title,
  subtitle,
  variant,
  accentColor,
}) => {
  const frame = useCurrentFrame();

  // Entrance animation: title scales in over 30 frames
  const titleScale = interpolate(frame, [0, 30], [0.5, 1], {
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Variant-specific layouts
  const layoutStyle =
    variant === "minimal"
      ? { textAlign: "left" as const, padding: "10%" }
      : variant === "bold"
      ? { textAlign: "center" as const, fontSize: "120px", fontWeight: 900 }
      : { textAlign: "center" as const, fontSize: "80px" };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: variant === "bold" ? "#1a1a2e" : "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          ...layoutStyle,
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          color: variant === "minimal" ? "#333" : accentColor,
        }}
      >
        <h1>{title}</h1>
        {subtitle && (
          <p
            style={{
              fontSize: variant === "bold" ? "48px" : "32px",
              marginTop: "20px",
              color: variant === "minimal" ? "#666" : "#fff",
              opacity: interpolate(frame, [15, 30], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Decorative accent bar - variant specific */}
      {variant !== "minimal" && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: accentColor,
            transform: `scaleX(${interpolate(frame, [0, 40], [0, 1])})`,
            transformOrigin: "left",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
