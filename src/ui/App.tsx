import React from "react";
import styled from "./App.module.css";
import { useState } from "react";
import { TemplateRegistry } from "../templates/TemplateRegistry";
import { getTemplatesByCategory } from "../engine/TemplateEngine";
import { PropsEditor } from "./PropsEditor";
import { Preview } from "./Preview";
import { RenderButton } from "./RenderButton";
import type { BaseProps } from "../templates/types";

type Category = "intro" | "lower-third" | "end-screen";

export const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("intro");
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    TemplateRegistry[0].id
  );
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

  const handleRender = async () => {
    console.log("Rendering with props:", props);
    // Lambda render would go here
  };

  return (
    <div className={styled.container}>
      {/* Sidebar */}
      <aside className={styled.sidebar}>
        <div className={styled.logo}>
          <h2>Video Editor</h2>
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
              className={`${styled.templateCard} ${selectedTemplateId === template.id ? styled.selected : ""}`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div
                className={styled.preview}
                style={{ backgroundColor: (template.defaultProps as any).bgColor || "#1a1a2e" }}
              />
              <div className={styled.info}>
                <div className={styled.name}>{template.id}</div>
                <div className={styled.desc}>{template.description}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className={styled.main}>
        {/* Preview area */}
        <div className={styled.previewArea}>
          {selectedTemplate && (
            <Preview
              component={selectedTemplate.component}
              inputProps={props}
              durationInFrames={selectedTemplate.defaultProps.durationInFrames || 300}
              fps={selectedTemplate.defaultProps.fps || 30}
            />
          )}
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
            Use Remotion Lambda for cloud rendering
          </span>
        </div>
      </main>
    </div>
  );
};

export default App;