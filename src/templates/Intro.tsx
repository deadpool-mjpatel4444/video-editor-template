import React from "react";
import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  Sequence,
} from "remotion";
import { IntroProps, Variant, AnimationStyle } from "./types";

export const DefaultIntro: React.FC<IntroProps> = ({
  title,
  subtitle,
  accentColor = "#FF6B6B",
  bgColor = "#1a1a2e",
  animation = "fadeIn",
}) => {
  const frame = useCurrentFrame();

  // Entrance animations based on style
  let titleStyle: any = {};
  let subtitleStyle: any = {};

  if (animation === "slideLeft") {
    const slideX = interpolate(frame, [0, 30], [-200, 0], {
      extrapolateRight: "clamp",
    });
    titleStyle = { transform: `translateX(${slideX}px)` };
  } else if (animation === "scaleIn") {
    const scale = interpolate(frame, [0, 30], [0.5, 1], {
      extrapolateRight: "clamp",
    });
    titleStyle = { transform: `scale(${scale})` };
  } else {
    // fadeIn (default)
    const opacity = interpolate(frame, [0, 30], [0, 1], {
      extrapolateRight: "clamp",
    });
    titleStyle = { opacity };
  }

  // Subtitle animation (delayed)
  const subtitleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateRight: "clamp",
  });
  subtitleStyle = { opacity: subtitleOpacity };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, -apple-system, sans-serif",
        flexDirection: "column",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: "120px",
          fontWeight: 800,
          color: "#fff",
          textAlign: "center",
          ...titleStyle,
          textShadow: `0 0 60px ${accentColor}40`,
        }}
      >
        {title}
      </div>

      {/* Accent line */}
      <div
        style={{
          width: "200px",
          height: "4px",
          backgroundColor: accentColor,
          marginTop: "32px",
          transform: `scaleX(${interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center",
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            fontSize: "48px",
            color: "#aaa",
            marginTop: "24px",
            ...subtitleStyle,
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};

export const MinimalIntro: React.FC<IntroProps> = ({
  title,
  subtitle,
  accentColor = "#4ECDC4",
  bgColor = "#0f0f0f",
  animation = "slideLeft",
}) => {
  const frame = useCurrentFrame();

  const slideX = interpolate(frame, [0, 30], [-100, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "15% 10%",
        fontFamily: "Inter, -apple-system, sans-serif",
      }}
    >
      {/* Left-aligned title */}
      <div
        style={{
          fontSize: "96px",
          fontWeight: 300,
          color: "#fff",
          transform: `translateX(${slideX}px)`,
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateRight: "clamp",
          }),
          letterSpacing: "-2px",
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>

      {/* Minimal accent */}
      <div
        style={{
          width: "60px",
          height: "2px",
          backgroundColor: accentColor,
          marginTop: "24px",
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            fontSize: "28px",
            color: "#666",
            marginTop: "16px",
            opacity: interpolate(frame, [15, 35], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};

export const BoldIntro: React.FC<IntroProps> = ({
  title,
  subtitle,
  accentColor = "#FF6B6B",
  bgColor = "#1a1a2e",
  animation = "scaleIn",
}) => {
  const frame = useCurrentFrame();

  // Dramatic scale in
  const scale = interpolate(frame, [0, 20], [0.3, 1], {
    extrapolateRight: "clamp",
  });

  // Rotation effect
  const rotation = interpolate(frame, [0, 20], [-10, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, -apple-system, sans-serif",
      }}
    >
      {/* Title with dramatic animation */}
      <div
        style={{
          fontSize: "140px",
          fontWeight: 900,
          color: "#fff",
          textAlign: "center",
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          textShadow: `0 0 80px ${accentColor}`,
          letterSpacing: "-4px",
        }}
      >
        {title}
      </div>

      {/* Pulsing accent ring */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          border: `4px solid ${accentColor}`,
          borderRadius: "50%",
          opacity: interpolate(frame, [0, 40], [0, 0.3], {
            extrapolateRight: "clamp",
          }),
          transform: `scale(${interpolate(frame, [0, 40], [0.5, 1.2], { extrapolateRight: "clamp" })})`,
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            fontSize: "40px",
            color: accentColor,
            marginTop: "32px",
            fontWeight: 600,
            opacity: interpolate(frame, [30, 50], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};
