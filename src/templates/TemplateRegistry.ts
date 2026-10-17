import React from "react";
import { Composition } from "remotion";
import {
  DefaultIntro,
  MinimalIntro,
  BoldIntro,
} from "./Intro";
import { LowerThirdTemplate } from "./LowerThird";
import { EndScreenTemplate } from "./EndScreen";
import type { TemplateDef } from "./types";

// Template definitions with type safety
export const TemplateRegistry: TemplateDef<any>[] = [
  {
    id: "intro-default",
    component: DefaultIntro,
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
    component: MinimalIntro,
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
    component: BoldIntro,
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
    component: LowerThirdTemplate,
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
    component: EndScreenTemplate,
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
  default: DefaultIntro,
  minimal: MinimalIntro,
  bold: BoldIntro,
};

export const LowerThirdTemplates = {
  default: LowerThirdTemplate,
};

export const EndScreenTemplates = {
  default: EndScreenTemplate,
};

// Get template by ID
export const getTemplate = (id: string) =>
  TemplateRegistry.find((t) => t.id === id);

// Get templates by category
export const getTemplatesByCategory = (category: string) =>
  TemplateRegistry.filter((t) => t.category === category);

// Register a custom template
export const registerTemplate = (template: TemplateDef) => {
  TemplateRegistry.push(template);
};
