import React from "react";
import styled from "../App.module.css";
import { TemplateRegistry } from "../templates/TemplateRegistry";
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
  const [activeCategory, setActiveCategory] = React.useState<Category>("intro");
  const [viewMode, setViewMode] = React.useState<ViewMode>("template");
  const [scenes, setScenes] = React.useState<SceneItem[]>(defaultScenes);
  const [selectedTemplateId, setSelectedTemplateId] = React.useState(
    TemplateRegistry[0]?.id || ""
  );
  const [currentFrame, setCurrentFrame] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [props, setProps] = React.useState<BaseProps>(
    TemplateRegistry[0]?.defaultProps as BaseProps || {}
  );

  const selectedTemplate = TemplateRegistry.find(
    (t) => t.id === selectedTemplateId
  );

  const handleTemplateSelect = (id: string) => {
    const template = TemplateRegistry.find((t) => t.id === id);
    if (template) {
      setSelectedTemplateId(id);
      setProps(template.defaultProps as BaseProps);
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

        <div className={styled.tabs}>
          {(["intro", "lower-third", "end-screen"] as Category[]).map((cat) => (
            <button
              key={cat}
              className={`${styled.tab} ${activeCategory === cat ? styled.active : ""}`}
              onClick={() => {
                setActiveCategory(cat);
                const first = TemplateRegistry.find((t) => t.category === cat);
                if (first) handleTemplateSelect(first.id);
              }}
            >
              {cat.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </div>

        <div className={styled.templateList}>
          {TemplateRegistry.filter(t => t.category === activeCategory).map((template) => (
            <div
              key={template.id}
              className={`${styled.templateCard} ${selectedTemplateId === template.id ? styled.selected : ""}`}
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

      <main className={styled.main}>
        <div className={styled.previewArea}>
          {viewMode === "template" && selectedTemplate && (
            <ControlledPlayer
              compositionId={selectedTemplate.id}
              component={selectedTemplate.component}
              inputProps={props}
              durationInFrames={(selectedTemplate.defaultProps as any).durationInFrames || 150}
              fps={30}
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
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", String(idx));
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const dragIdx = Number(e.dataTransfer.getData("text/plain"));
                if (!Number.isNaN(dragIdx) && dragIdx !== idx) {
                  // Import reorderScenes dynamically to avoid circular dependency
                  import("../engine/timeline").then(({ reorderScenes }) => {
                    const reordered = reorderScenes(scenes, dragIdx, idx);
                    setScenes(reordered);
                  });
                }
              }}
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

        <PropsEditor
          props={props}
          templateType={selectedTemplate?.category || "intro"}
          onChange={handlePropChange}
        />

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
