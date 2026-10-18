import React from "react";
import type { TemplateDef } from "./types";
import { TemplateRegistry } from "./TemplateRegistry";

// ponytail: simple object cache, add eviction/TTL when memory demands it
const cache: Record<string, TemplateDef> = {};

// Component loaders using dynamic import()
const componentLoaders: Record<string, () => Promise<React.FC<any>>> = {
  "intro-default": () => import("./Intro").then((m) => m.DefaultIntro),
  "intro-minimal": () => import("./Intro").then((m) => m.MinimalIntro),
  "intro-bold": () => import("./Intro").then((m) => m.BoldIntro),
  "lower-third": () => import("./LowerThird").then((m) => m.LowerThirdTemplate),
  "end-screen": () => import("./EndScreen").then((m) => m.EndScreenTemplate),
};

export async function getTemplate(id: string): Promise<TemplateDef> {
  if (cache[id]) {
    return cache[id];
  }

  const def = TemplateRegistry.find((t) => t.id === id);
  if (!def) {
    throw new Error(`Template not found: ${id}`);
  }

  const loader = componentLoaders[id];
  const component = loader ? await loader() : def.component;

  const template: TemplateDef = {
    ...def,
    component,
  };

  cache[id] = template;
  return template;
}

export async function getAllTemplates(): Promise<TemplateDef[]> {
  return Promise.all(TemplateRegistry.map((t) => getTemplate(t.id)));
}
