// Template Schema Types
import type { AudioTrackItem } from "../schemas/templates";

export type Variant = "default" | "minimal" | "bold" | "dark" | "neon";

export type AnimationStyle =
  | "fadeIn"
  | "slideLeft"
  | "slideRight"
  | "slideUp"
  | "slideDown"
  | "scaleIn"
  | "none";

export interface BaseProps {
  id: string;
  title?: string;
  subtitle?: string;
  name?: string;
  role?: string;
  cta?: string;
  accentColor?: string;
  bgColor?: string;
  mediaUrl?: string;
  animation?: AnimationStyle;
  position?: "bottom-left" | "bottom-center" | "bottom-right";
  audioTracks?: AudioTrackItem[];
  [key: string]: unknown;
}

// Specific props interfaces for each template type
export interface IntroProps extends BaseProps {
  id: string;
  title: string;
  subtitle?: string;
  accentColor?: string;
  bgColor?: string;
  animation?: AnimationStyle;
}

export interface LowerThirdProps extends BaseProps {
  id: string;
  name: string;
  role?: string;
  accentColor?: string;
  position?: "bottom-left" | "bottom-center" | "bottom-right";
}

export interface EndScreenProps extends BaseProps {
  id: string;
  title: string;
  cta: string;
  accentColor?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface TemplateDef<P extends BaseProps = BaseProps> {
  id: string;
  component: React.FC<P>;
  defaultProps: P;
  description: string;
  category: "intro" | "lower-third" | "end-screen";
  durationInFrames?: number;
  fps?: number;
  width?: number;
  height?: number;
}
