import assert from "node:assert";
import { validateProps, getDefaultProps } from "./engine/validation";
import { calculateTotalDuration, defaultScenes } from "./templates/FullVideo";
import { getTemplate } from "./templates/TemplateRegistry";

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

console.log("✓ All assertions passed cleanly!");
