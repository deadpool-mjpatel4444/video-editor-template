# Reusable Video Editor Template System
# Built with Remotion + React

## Canva Video Editor Analysis

### What It Does
- Web-based timeline editor (media-first, not track-based)
- Drag-and-drop canvas with layers
- Components: reusable linked elements (Document or Brand Kit scoped)
- AI features: Magic Media (8s clips max), auto-captions, beat sync
- Export: MP4/H.264 only, no ProRes, no multi-track audio

### Limitations
- No chroma key / node compositor
- Max ~15 min clips (free tier shorter)
- No per-element keyframe animation
- WebAssembly bottlenecks on large files
- 300 element cap per design
- No scripting API for bulk ops

## Our Approach: Template-First

Canva is **canvas-first** (drag things around). We're **template-first**:

```
Template Schema → React Component → Remotion Composition → Render
```

This gives:
- Full layout logic (conditional rendering)
- Composition chaining
- Type-safe props
- No frozen template structure

## Architecture

```
src/
├── index.ts              # Entry point
├── Root.tsx              # Composition registry (all templates)
├── MyVideo.tsx           # Intro template (3 variants)
├── TemporalTemplates.tsx # Lower third template
├── EndScreen.tsx         # End screen template
└── TemplateRegistry.ts   # Type-safe template map
```

### Template Types

| Template | Props | Duration | Use Case |
|----------|-------|----------|----------|
| `MyVideo` | title, subtitle, variant, accentColor | 10s | Intro/outro |
| `LowerThird` | name, role, accentColor | 6s | Speaker ID |
| `EndScreen` | title, cta, accentColor | 5s | Call-to-action |

### Variant System

```tsx
variant: "default" | "minimal" | "bold"
```

Each variant has different:
- Layout (center/left/full)
- Typography size
- Color treatment
- Animation timing

## How to Extend

### Add New Template

1. Create `src/Templates/YourTemplate.tsx`
2. Define props type
3. Register in `Root.tsx`
4. Add to `TemplateRegistry.ts`

```tsx
// Example: Quote template
export const QuoteTemplate: React.FC<{
  quote: string;
  author: string;
  bgColor: string;
}> = ({ quote, author, bgColor }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1]);
  
  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      <div style={{ opacity, color: "#fff", fontSize: "64px" }}>
        "{quote}"
      </div>
      <div style={{ opacity, color: "#aaa", fontSize: "32px" }}>
        — {author}
      </div>
    </AbsoluteFill>
  );
};
```

### Chain Templates

Use `<Sequence>` to compose multiple templates:

```tsx
export const FullVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Intro */}
      <Sequence from={0} durationInFrames={300}>
        <MyVideo title="Welcome" subtitle="Episode 1" variant="bold" />
      </Sequence>
      
      {/* Content */}
      <Sequence from={300} durationInFrames={600}>
        <YourContentTemplate />
      </Sequence>
      
      {/* Outro */}
      <Sequence from={900} durationInFrames={150}>
        <EndScreen title="Thanks" cta="Subscribe" />
      </Sequence>
    </AbsoluteFill>
  );
};
```

## Rendering

### Local Preview (Studio)
```bash
npx remotion studio
```
→ Opens at `http://localhost:3001`

### Render Video
```bash
# Single composition
npx remotion render src/index.ts MyVideo dist/output.mp4

# With Lambda (cloud rendering, recommended for production)
npx remotion render src/index.ts MyVideo s3://bucket/output.mp4
```

### Bundle for Server
```bash
npx remotion bundle src/index.ts
```

## Runtime Requirements

Remotion needs Chromium for rendering. On this ARM64 system:

```bash
# Install chromium
sudo apt install chromium-browser

# Or use Lambda renderer (no local browser needed)
npx remotion render ... s3://bucket/output.mp4
```

## Production Considerations

| Feature | Current | Next Step |
|---------|---------|-----------|
| Timeline UI | ❌ | Add `@remotion/timeline` or custom |
| Media upload | ❌ | Add S3 integration |
| WebCodecs preview | ❌ | Use `MediaRecorder` API |
| Multi-track audio | ❌ | Add `<Audio>` components |
| Real-time preview | ⚠️ | Studio mode only |

→ Add when needed. For now: template rendering works.

## Ponytail Notes

- **Skipped**: Full timeline UI, drag-and-drop editor, WebCodecs integration
- **Why**: Overkill for template-first approach. Can add later.
- **When to add**: When you need interactive editing (not just programmatic generation)

---

**Verdict**: Canva is good for 80% of social content. This template system gives you more control, type safety, and composability for the other 20%.
