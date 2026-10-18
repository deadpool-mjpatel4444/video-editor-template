import React from "react";
import type { TemplateDef } from "./types";

// Template definitions with lazy loading (no heavy component imports at top level)
export const TemplateRegistry: TemplateDef<any>[] = [
  {
    id: "intro-default",
    component: React.lazy(() =>
      import("./Intro").then((m) => ({ default: m.DefaultIntro }))
    ) as unknown as React.FC<any>,
    defaultProps: {
      title: "Welcome",
      subtitle: "My Video",
      accentColor: "#FF6B6B",
      bgColor: "#1a1a2e",
      animation: "fadeIn" as const,
    },
    description: "Standard intro with centered title and accent bar",
    category: "intro",
  },
  {
    id: "intro-minimal",
    component: React.lazy(() =>
      import("./Intro").then((m) => ({ default: m.MinimalIntro }))
    ) as unknown as React.FC<any>,
    defaultProps: {
      title: "Welcome",
      subtitle: "My Video",
      accentColor: "#4ECDC4",
      bgColor: "#0f0f0f",
      animation: "slideLeft" as const,
    },
    description: "Clean minimal intro with large typography",
    category: "intro",
  },
  {
    id: "intro-bold",
    component: React.lazy(() =>
      import("./Intro").then((m) => ({ default: m.BoldIntro }))
    ) as unknown as React.FC<any>,
    defaultProps: {
      title: "Welcome",
      subtitle: "My Video",
      accentColor: "#FF6B6B",
      bgColor: "#1a1a2e",
      animation: "scaleIn" as const,
    },
    description: "Bold impactful intro with heavy typography",
    category: "intro",
  },
  {
    id: "lower-third",
    component: React.lazy(() =>
      import("./LowerThird").then((m) => ({ default: m.LowerThirdTemplate }))
    ) as unknown as React.FC<any>,
    defaultProps: {
      name: "Monank Sojitra",
      role: "Full Stack Developer",
      accentColor: "#4ECDC4",
      position: "bottom-left" as const,
    },
    description: "Speaker identification lower third",
    category: "lower-third",
  },
  {
    id: "end-screen",
    component: React.lazy(() =>
      import("./EndScreen").then((m) => ({ default: m.EndScreenTemplate }))
    ) as unknown as React.FC<any>,
    defaultProps: {
      title: "Thanks for Watching",
      cta: "Subscribe",
      accentColor: "#FF6B6B",
    },
    description: "End screen with CTA and decorative elements",
    category: "end-screen",
  },
];

// Export for direct composition use
export const IntroTemplates = {
  default: React.lazy(() =>
    import("./Intro").then((m) => ({ default: m.DefaultIntro }))
  ),
  minimal: React.lazy(() =>
    import("./Intro").then((m) => ({ default: m.MinimalIntro }))
  ),
  bold: React.lazy(() =>
    import("./Intro").then((m) => ({ default: m.BoldIntro }))
  ),
};

export const LowerThirdTemplates = {
  default: React.lazy(() =>
    import("./LowerThird").then((m) => ({ default: m.LowerThirdTemplate }))
  ),
};

export const EndScreenTemplates = {
  default: React.lazy(() =>
    import("./EndScreen").then((m) => ({ default: m.EndScreenTemplate }))
  ),
};

// Get template by ID
export const getTemplate = (id: string) =>
  TemplateRegistry.find((t) => t.id === id);

export const getTemplateSync = getTemplate;

// Get templates by category
export const getTemplatesByCategory = (category: string) =>
  TemplateRegistry.filter((t) => t.category === category);

// Register a custom template
export const registerTemplate = (template: TemplateDef) => {
  TemplateRegistry.push(template);
};
