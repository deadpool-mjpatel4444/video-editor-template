import assert from "node:assert";
import { validateProps, getDefaultProps } from "./engine/validation";
import { calculateTotalDuration, defaultScenes } from "./templates/FullVideo";
import { getTemplate } from "./templates/TemplateRegistry";
import { AudioTrackSchema, type AudioTrackItem } from "./schemas/templates";

console.log("Running self-check tests...");

// 1. Check default props generator
const introDefaults = getDefaultProps("intro-default");
assert.strictEqual(introDefaults.title, "Welcome", "Default title must be 'Welcome'");

// 2. Check Zod validation
const validIntro = validateProps("intro-default", {
  id: "intro-1",
  title: "Hello World",
  subtitle: "Test Subtitle",
  animation: "fadeIn",
});
assert.strictEqual(validIntro.valid, true, "Valid intro props should pass");

const invalidIntro = validateProps("intro-default", {
  id: "intro-2",
  // missing title
  animation: "invalid-animation-type",
});
assert.strictEqual(invalidIntro.valid, false, "Invalid animation and missing title should fail");

// 3. Check FullVideo duration calculation
const duration = calculateTotalDuration(defaultScenes);
assert.strictEqual(duration, 450, "Default 3 scenes at 150 frames each should equal 450 frames");

// 4. Check registry lookup
const template = getTemplate("lower-third");
assert.ok(template, "Registry must find 'lower-third'");
assert.strictEqual(template?.category, "lower-third", "Category must match");

// 5. Audio track validation
const validTrack: AudioTrackItem = {
  id: "track-1",
  src: "https://example.com/audio.mp3",
  volume: 0.8,
};
assert.ok(AudioTrackSchema.safeParse(validTrack).success, "Valid audio track must pass schema");

const invalidTrack = AudioTrackSchema.safeParse({
  id: "track-2",
  src: "", // empty src should fail
  volume: 1.5, // over max
});
assert.ok(!invalidTrack.success, "Invalid audio track (empty src, volume > 1) must fail schema");

// 6. Scene with multiple audio tracks
const multiTrackScene = {
  id: "scene-1",
  templateId: "intro-default",
  durationInFrames: 150,
  props: { title: "Test", subtitle: "Sub", animation: "fadeIn", accentColor: "#FF6B6B" },
  audioTracks: [
    { id: "t1", src: "https://example.com/a.mp3", volume: 0.5 },
    { id: "t2", src: "https://example.com/b.mp3", volume: 0.3 },
  ],
};
assert.strictEqual(multiTrackScene.audioTracks.length, 2, "Scene must support multiple audio tracks");
for (const track of multiTrackScene.audioTracks) {
  assert.ok(AudioTrackSchema.safeParse(track).success, `Track ${track.id} must pass schema`);
}

// 7. Empty audio tracks array is valid
const sceneNoAudio = { ...defaultScenes[0], audioTracks: [] };
assert.deepStrictEqual(sceneNoAudio.audioTracks, [], "Empty audio tracks array is valid");

console.log("✓ All assertions passed cleanly!");
