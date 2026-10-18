import React from "react";

interface AudioWaveformProps {
  src?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  src,
  width = 300,
  height = 50,
  color = "#4ECDC4",
}) => {
  // Deterministic pseudo-waveform bars based on src or fallback
  const bars = Array.from({ length: 32 }, (_, i) => {
    const seed = src ? src.charCodeAt(i % src.length) + i : i * 17;
    return Math.max(0.15, (Math.sin(seed) + 1) / 2);
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px", width, height, background: "#111", padding: "4px", borderRadius: "4px" }}>
      {bars.map((val, idx) => (
        <div
          key={idx}
          style={{
            flex: 1,
            height: `${val * 100}%`,
            background: color,
            borderRadius: "1px",
          }}
        />
      ))}
    </div>
  );
};
