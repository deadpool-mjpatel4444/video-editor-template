// Props Editor for video templates

import React from "react";
import type { BaseProps } from "../templates/types";

interface PropsEditorProps {
  props: BaseProps;
  templateType: string;
  onChange: (key: string, value: unknown) => void;
}

export const PropsEditor: React.FC<PropsEditorProps> = ({
  props,
  templateType,
  onChange,
}) => {
  const handleChange = (key: string, value: unknown) => {
    onChange(key, value);
  };

  return (
    <div className="props-editor">
      <h3>Template Props</h3>

      {templateType === "intro" && (
        <>
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              value={props.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Subtitle</label>
            <input
              type="text"
              value={props.subtitle || ""}
              onChange={(e) => handleChange("subtitle", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Animation</label>
            <select
              value={props.animation || "fadeIn"}
              onChange={(e) => handleChange("animation", e.target.value)}
            >
              <option value="fadeIn">Fade In</option>
              <option value="slideLeft">Slide Left</option>
              <option value="scaleIn">Scale In</option>
            </select>
          </div>
        </>
      )}

      {templateType === "lower-third" && (
        <>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              value={props.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Role</label>
            <input
              type="text"
              value={props.role || ""}
              onChange={(e) => handleChange("role", e.target.value)}
            />
          </div>
          <div className="field">
            <label>Position</label>
            <select
              value={props.position || "bottom-left"}
              onChange={(e) => handleChange("position", e.target.value)}
            >
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
          </div>
        </>
      )}

      {templateType === "end-screen" && (
        <>
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              value={props.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div className="field">
            <label>CTA</label>
            <input
              type="text"
              value={props.cta || ""}
              onChange={(e) => handleChange("cta", e.target.value)}
            />
          </div>
        </>
      )}

      <div className="field">
        <label>Accent Color</label>
        <input
          type="color"
          value={props.accentColor || "#FF6B6B"}
          onChange={(e) => handleChange("accentColor", e.target.value)}
        />
      </div>

      <div className="field">
        <label>Background Color</label>
        <input
          type="color"
          value={props.bgColor || "#1a1a2e"}
          onChange={(e) => handleChange("bgColor", e.target.value)}
        />
      </div>

      <div className="field">
        <label>Media Asset (URL or Upload)</label>
        <input
          type="text"
          placeholder="https://... or choose file"
          value={props.mediaUrl || ""}
          onChange={(e) => handleChange("mediaUrl", e.target.value)}
        />
        <input
          type="file"
          accept="image/*,video/*"
          style={{ marginTop: "6px", fontSize: "12px", color: "#888" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              handleChange("mediaUrl", url);
            }
          }}
        />
      </div>
    </div>
  );
};