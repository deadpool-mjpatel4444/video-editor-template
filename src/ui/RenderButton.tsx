import React, { useState } from "react";

interface RenderButtonProps {
  onRender: () => Promise<void>;
  isRendering?: boolean;
}

export const RenderButton: React.FC<RenderButtonProps> = ({
  onRender,
  isRendering = false,
}) => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    setStatus("idle");
    setMessage("");
    try {
      await onRender();
      setStatus("success");
      setMessage("Render started (check Lambda console)");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Render failed");
    }
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

      {status === "success" && (
        <span style={{ color: "#4ECDC4", fontSize: "13px" }}>{message}</span>
      )}
      {status === "error" && (
        <span style={{ color: "#FF6B6B", fontSize: "13px" }}>{message}</span>
      )}
    </div>
  );
};
