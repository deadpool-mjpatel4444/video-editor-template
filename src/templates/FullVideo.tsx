import React, { Suspense } from "react";
import { Sequence, AbsoluteFill, Audio } from "remotion";
import { TemplateRegistry } from "./TemplateRegistry";
import type { AudioTrackItem } from "../schemas/templates";

export interface SceneItem {
  id: string;
  templateId: string;
  props: Record<string, any>;
  durationInFrames: number;
  audioTracks?: AudioTrackItem[];
}

export interface FullVideoProps {
  scenes?: SceneItem[];
  audioTracks?: AudioTrackItem[];
}

export const defaultScenes: SceneItem[] = [
  {
    id: "scene-1",
    templateId: "intro-default",
    durationInFrames: 150,
    props: {
      title: "Welcome to Our Show",
      subtitle: "Created with Remotion & React",
      accentColor: "#FF6B6B",
      bgColor: "#1a1a2e",
      animation: "fadeIn",
    },
  },
  {
    id: "scene-2",
    templateId: "lower-third",
    durationInFrames: 150,
    props: {
      name: "Monank Sojitra",
      role: "Lead Architect",
      accentColor: "#4ECDC4",
      position: "bottom-left",
    },
  },
  {
    id: "scene-3",
    templateId: "end-screen",
    durationInFrames: 150,
    props: {
      title: "Thanks for Watching",
      cta: "Subscribe & Follow",
      accentColor: "#FF6B6B",
    },
  },
];

export const calculateTotalDuration = (scenes: SceneItem[]): number =>
  scenes.reduce((sum, s) => sum + (s.durationInFrames || 150), 0) || 150;

export const FullVideo: React.FC<FullVideoProps> = ({ 
  scenes = defaultScenes, 
  audioTracks = [] 
}) => {
  let accumulatedFrom = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {scenes.map((scene) => {
        const from = accumulatedFrom;
        accumulatedFrom += scene.durationInFrames;
        const template = TemplateRegistry.find((t) => t.id === scene.templateId);
        if (!template) return null;
        const Component = template.component;

        return (
          <Sequence key={scene.id} from={from} durationInFrames={scene.durationInFrames}>
            <Suspense fallback={<AbsoluteFill style={{ backgroundColor: "#000" }} />}>
              <Component {...scene.props} />
              {scene.audioTracks?.map((track) => (
                <Audio
                  key={track.id}
                  src={track.src}
                  volume={track.volume ?? 1}
                  placeholder={<div />}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                />
              ))}
            </Suspense>
          </Sequence>
        );
      })}
      {audioTracks.map((track) => (
        <Audio key={track.id} src={track.src} volume={track.volume ?? 1} placeholder={<div />} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} />
      ))}
    </AbsoluteFill>
  );
};
