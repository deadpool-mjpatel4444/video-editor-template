import React, { useState } from "react";
import type { VideoRenderResult } from "../render/render";

interface RenderButtonProps {
  onRender: () => Promise<VideoRenderResult | void>;
  isRendering?: boolean;
  renderResult?: VideoRenderResult | null;
}

export const RenderButton: React.FC<RenderButtonProps> = ({
  onRender,
  isRendering = false,
  renderResult: propResult,
}) => {
  const [internalResult, setInternalResult] = useState<VideoRenderResult | null>(null);

  const handleClick = async () => {
    setInternalResult(null);
    try {
      const result = await onRender();
      if (result) {
        setInternalResult(result);
      }
    } catch (err) {
      setInternalResult({
        success: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  };

  const result = propResult ?? internalResult;

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

      {result && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {result.success ? (
            <>
              <span style={{ color: "#4ECDC4", fontSize: "13px" }}>
                ✓ Rendered: {result.path}
              </span>
              {result.path && (
                <a
                  href={result.path}
                  download
                  style={{
                    color: "#4ECDC4",
                    fontSize: "13px",
                    textDecoration: "underline",
                    fontWeight: 600,
                  }}
                >
                  Download
                </a>
              )}
            </>
          ) : (
            <span style={{ color: "#FF6B6B", fontSize: "13px" }}>
              ✗ Error: {result.error || "Render failed"}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default RenderButton;
