// Template Registry
// Maps template IDs to their props types and default values

import { VideoProps } from "./MyVideo";
import { LowerThirdProps } from "./TemporalTemplates";
import { EndScreenProps } from "./EndScreen";

export type TemplateRegistry = {
  "intro-default": VideoProps;
  "intro-minimal": VideoProps;
  "intro-bold": VideoProps;
  "lower-third": LowerThirdProps;
  "end-screen": EndScreenProps;
};

export const TEMPLATE_PROPS: Record<keyof TemplateRegistry, any> = {
  "intro-default": {
    title: "Welcome",
    subtitle: "My Video",
    variant: "default",
    accentColor: "#FF6B6B",
  },
  "intro-minimal": {
    title: "Welcome",
    subtitle: "My Video",
    variant: "minimal",
    accentColor: "#4ECDC4",
  },
  "intro-bold": {
    title: "Welcome",
    subtitle: "My Video",
    variant: "bold",
    accentColor: "#FF6B6B",
  },
  "lower-third": {
    name: "John Doe",
    role: "CEO",
    accentColor: "#4ECDC4",
  },
  "end-screen": {
    title: "Thanks for Watching",
    cta: "Subscribe",
    accentColor: "#FF6B6B",
  },
};

export type TemplateId = keyof TemplateRegistry;
