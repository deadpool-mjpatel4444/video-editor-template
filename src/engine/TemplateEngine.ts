import React from "react";
import { TemplateRegistry as Registry } from "../templates/TemplateRegistry";
import type { TemplateDef, BaseProps, ValidationResult } from "../templates/types";

export const validateProps = <P extends BaseProps>(
  template: TemplateDef<P>,
  props: Partial<P>
): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  if (template.id.startsWith("intro") && !props.title) {
    errors.push("Title is required for intro templates");
  }
  if (template.id === "lower-third" && !props.name) {
    errors.push("Name is required for lower third");
  }
  if (template.id === "end-screen" && (!props.title || !props.cta)) {
    errors.push("Title and CTA are required for end screen");
  }

  // Validate colors
  if ((props as any).accentColor && !/^#[0-9A-Fa-f]{6}$/.test((props as any).accentColor)) {
    warnings.push("Accent color should be a valid hex color");
  }
  if ((props as any).bgColor && !/^#[0-9A-Fa-f]{6}$/.test((props as any).bgColor)) {
    warnings.push("Background color should be a valid hex color");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
};

export const mergeProps = <P extends BaseProps>(
  defaults: P,
  overrides: Partial<P>
): P => {
  return { ...defaults, ...overrides } as P;
};

export const getDefaultProps = <P extends BaseProps>(
  templateId: string,
  userProps?: Partial<P>
): P => {
  const template = Registry.find((t) => t.id === templateId);
  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }
  return mergeProps(template.defaultProps, userProps || {});
};

export const getTemplate = (id: string): TemplateDef<BaseProps> | undefined => {
  return Registry.find((t) => t.id === id);
};

export const getTemplatesByCategory = (category: string) => {
  return Registry.filter((t) => t.category === category);
};