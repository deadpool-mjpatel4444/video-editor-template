# Template Video Editor

A Remotion-based video editor with reusable, type-safe templates.

## Structure

```
src/
├── index.ts              # Entry point
├── Root.tsx              # Composition registry (3 comps)
├── MyVideo.tsx           # Original intro template
├── TemporalTemplates.tsx # Lower third (legacy)
├── EndScreen.tsx         # End screen (legacy)
├── TemplateRegistry.ts   # Type-safe template map
│
├── templates/
│   ├── types.ts          # BaseProps, IntroProps, etc.
│   ├── TemplateRegistry.ts # 5 templates with types
│   ├── Intro.tsx         # Default, Minimal, Bold variants
│   ├── LowerThird.tsx    # Position-aware lower third
│   └── EndScreen.tsx     # CTA end screen
│
├── engine/
│   └── TemplateEngine.ts # Validation + prop merging
│
├── ui/
│   ├── App.tsx           # Main layout (sidebar + preview)
│   ├── Preview.tsx       # Remotion Player wrapper
│   ├── PropsEditor.tsx   # Dynamic props form
│   ├── RenderButton.tsx  # Render trigger
│   └── TemplateCard.tsx  # Sidebar template cards
│
└── render/
    └── render.ts         # Lambda render API
```

## Templates

| ID | Props | Duration |
|----|-------|----------|
| `intro-default` | title, subtitle, accentColor, bgColor, animation | 10s |
| `intro-minimal` | title, subtitle, accentColor, bgColor, animation | 10s |
| `intro-bold` | title, subtitle, accentColor, bgColor, animation | 10s |
| `lower-third` | name, role, accentColor, position | 6s |
| `end-screen` | title, cta, accentColor | 5s |

## Usage

```bash
# Install dependencies
npm install

# Start Remotion studio (preview)
npm run dev

# Bundle for production
npm run build

# Render locally (needs Chromium)
npx remotion render src/index.ts MyVideo dist/output.mp4

# Render via Lambda (cloud)
npx remotion render src/index.ts MyVideo s3://bucket/output.mp4
```

## Architecture

- **Template-first**: Each template is a React component with typed props
- **No drag-and-drop canvas**: Uses Remotion's `AbsoluteFill` + CSS positioning
- **Composable**: Chain compositions via `<Sequence>` in parent template
- **Props-driven**: All customization via props, not state mutation
- **Validation**: Zod schemas + TypeScript for type safety

## Rendering

Local rendering requires Chromium. On ARM64 without it:

```bash
# Use Lambda renderer (recommended for production)
npx remotion render src/index.ts MyVideo s3://your-bucket/output.mp4
```

Set up Lambda:
```bash
npx remotion lambda deploy --name my-function
```

## Custom Templates

Add to `src/templates/TemplateRegistry.ts`:

```typescript
{
  id: "my-template",
  component: MyCustomComponent,
  defaultProps: { title: "Default", accentColor: "#FF6B6B" },
  description: "My custom template",
  category: "intro",
}
```

## Ponytail Notes

Skipped:
- Timeline UI (add when needed)
- Media upload (add S3 integration later)
- WebCodecs fallback (use for mobile)
- Interactive timeline editing (add @remotion/timeline)