import React, { useState } from "react";
import type { VideoRenderResult } from "../render/render";

interface RenderButtonProps {
  onRender: () => Promise<void>;
  isRendering?: boolean;
  renderResult?: VideoRenderResult;
}

export const RenderButton: React.FC<RenderButtonProps> = ({
  onRender,
  isRendering = false,
  renderResult,
}) => {
  const handleClick = async () => {
    await onRender();
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <button
        onClick={handleClick}
        disabled={isRendering}
        style={{
          padding: "12px 32px",
          background: isRendering ? "#666" : "#FF6B6B",
          border: "none",
          borderRadius: "6px",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 600,
          cursor: isRendering ? "not-allowed" : "pointer",
          transition: "all 0.2s",
        }}
      >
        {isRendering ? "Rendering..." : "Render Video"}
      </button>

      {renderResult && (
        <span
          style={{
            color: renderResult.success ? "#4ECDC4" : "#FF6B6B",
            fontSize: "13px",
          }}
        >
          {renderResult.success
            ? `✓ Rendered: ${renderResult.path}`
            : `✗ Error: ${renderResult.error}`}
        </span>
      )}
    </div>
  );
};
