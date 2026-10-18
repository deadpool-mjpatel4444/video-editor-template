import React, { useState } from "react";
import styled from "./App.module.css";
import { TemplateRegistry } from "../templates/TemplateRegistry";
import { getTemplatesByCategory } from "../engine/TemplateEngine";
import { PropsEditor } from "./PropsEditor";
import { ControlledPlayer } from "./ControlledPlayer";
import { RenderButton } from "./RenderButton";
import {
  FullVideo,
  defaultScenes,
  calculateTotalDuration,
  type SceneItem,
} from "../templates/FullVideo";
import type { BaseProps } from "../templates/types";

type Category = "intro" | "lower-third" | "end-screen";
type ViewMode = "template" | "sequence";

export const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("intro");
  const [viewMode, setViewMode] = useState<ViewMode>("template");
  const [scenes, setScenes] = useState<SceneItem[]>(defaultScenes);
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    TemplateRegistry[0].id
  );
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [props, setProps] = useState<BaseProps>(
    TemplateRegistry[0].defaultProps
  );
  const templates = getTemplatesByCategory(activeCategory);
  const selectedTemplate = TemplateRegistry.find(
    (t) => t.id === selectedTemplateId
  );

  const handleTemplateSelect = (id: string) => {
    const template = TemplateRegistry.find((t) => t.id === id);
    if (template) {
      setSelectedTemplateId(id);
      setProps({ ...template.defaultProps });
    }
  };

  const handlePropChange = (key: string, value: unknown) => {
    setProps((prev) => ({ ...prev, [key]: value }));
  };

  const addCurrentToSequence = () => {
    const newScene: SceneItem = {
      id: `scene-${Date.now()}`,
      templateId: selectedTemplateId,
      durationInFrames: 150,
      props: { ...props },
    };
    setScenes((prev) => [...prev, newScene]);
    setViewMode("sequence");
  };

  const removeScene = (index: number) => {
    setScenes((prev) => prev.filter((_, i) => i !== index));
  };

  const loadSceneForEdit = (scene: SceneItem) => {
    setSelectedTemplateId(scene.templateId);
    setProps({ ...scene.props } as BaseProps);
    setViewMode("template");
  };

  const handleRender = async () => {
    if (viewMode === "sequence") {
      console.log("Rendering full sequence with scenes:", scenes);
    } else {
      console.log("Rendering template:", selectedTemplateId, "with props:", props);
    }
  };

  return (
    <div className={styled.container}>
      {/* Sidebar */}
      <aside className={styled.sidebar}>
        <div className={styled.logo}>
          <h2>Video Editor</h2>
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <button
              style={{
                flex: 1,
                padding: "6px 8px",
                fontSize: "11px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                background: viewMode === "template" ? "#FF6B6B" : "#222",
                color: "#fff",
              }}
              onClick={() => setViewMode("template")}
            >
              Single Scene
            </button>
            <button
              style={{
                flex: 1,
                padding: "6px 8px",
                fontSize: "11px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                background: viewMode === "sequence" ? "#FF6B6B" : "#222",
                color: "#fff",
              }}
              onClick={() => setViewMode("sequence")}
            >
              Full Video ({scenes.length})
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className={styled.tabs}>
          {(["intro", "lower-third", "end-screen"] as Category[]).map((cat) => (
            <button
              key={cat}
              className={`${styled.tab} ${activeCategory === cat ? styled.active : ""}`}
              onClick={() => {
                setActiveCategory(cat);
                const first = getTemplatesByCategory(cat)[0];
                if (first) handleTemplateSelect(first.id);
              }}
            >
              {cat.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </div>

        {/* Template list */}
        <div className={styled.templateList}>
          {templates.map((template) => (
            <div
              key={template.id}
              className={`${styled.templateCard} ${
                selectedTemplateId === template.id ? styled.selected : ""
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div
                className={styled.preview}
                style={{
                  backgroundColor:
                    (template.defaultProps as any).bgColor || "#1a1a2e",
                }}
              />
              <div className={styled.info}>
                <div className={styled.name}>{template.id}</div>
                <div className={styled.desc}>{template.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Add to Sequence Button */}
        <div style={{ padding: "12px", borderTop: "1px solid #222" }}>
          <button
            onClick={addCurrentToSequence}
            style={{
              width: "100%",
              padding: "10px",
              background: "#2a2a2a",
              color: "#fff",
              border: "1px solid #444",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            + Add to Video Sequence
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={styled.main}>
        {/* Preview area */}
        <div className={styled.previewArea}>
          {viewMode === "template" && selectedTemplate && (
            <ControlledPlayer
              compositionId={selectedTemplate.id}
              component={selectedTemplate.component}
              inputProps={props}
              durationInFrames={selectedTemplate.defaultProps.durationInFrames || 150}
              fps={selectedTemplate.defaultProps.fps || 30}
              onTimelineUpdate={setCurrentFrame}
              onPlayStateChange={setIsPlaying}
            />
          )}

          {viewMode === "sequence" && (
            <ControlledPlayer
              compositionId="FullVideo"
              component={FullVideo}
              inputProps={{ scenes }}
              durationInFrames={calculateTotalDuration(scenes)}
              fps={30}
              onTimelineUpdate={setCurrentFrame}
              onPlayStateChange={setIsPlaying}
            />
          )}
        </div>

        {/* Timeline Sequencer Tray */}
        <div
          style={{
            background: "#151515",
            padding: "10px 16px",
            borderTop: "1px solid #222",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            overflowX: "auto",
          }}
        >
          <span style={{ fontSize: "12px", color: "#888", whiteSpace: "nowrap" }}>
            Timeline ({Math.round(calculateTotalDuration(scenes) / 30)}s):
          </span>
          {scenes.map((scene, idx) => (
            <div
              key={scene.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#222",
                border: "1px solid #333",
                borderRadius: "6px",
                padding: "6px 10px",
                fontSize: "12px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onClick={() => loadSceneForEdit(scene)}
            >
              <span>
                {idx + 1}. {scene.templateId} ({scene.durationInFrames / 30}s)
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeScene(idx);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ff6b6b",
                  cursor: "pointer",
                  fontSize: "14px",
                  padding: "0 2px",
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Props editor */}
        <PropsEditor
          props={props}
          templateType={selectedTemplate?.category || "intro"}
          onChange={handlePropChange}
        />

        {/* Render bar */}
        <div className={styled.renderBar}>
          <RenderButton onRender={handleRender} />
          <span className={styled.hint}>
            Rendering {viewMode === "sequence" ? "Full Sequenced Video" : "Current Template"} via Remotion Lambda
          </span>
        </div>
      </main>
    </div>
  );
};

export default App;
