# Video Editor Template System - Build Plan

## Architecture

```
~/templates/video-editor/
├── src/
│   ├── index.ts              # Entry point
│   ├── Root.tsx              # Composition registry
│   ├── templates/            # Reusable template components
│   │   ├── types.ts          # Shared type definitions
│   │   ├── Intro.tsx         # Intro template (3 variants)
│   │   ├── LowerThird.tsx    # Lower third template
│   │   └── EndScreen.tsx     # End screen template
│   ├── engine/               # Template engine
│   │   └── TemplateEngine.ts # Validation, merging, defaults
│   ├── ui/                   # Editor UI
│   │   ├── App.tsx           # Main layout
│   │   ├── TemplateCard.tsx  # Template selector
│   │   ├── PropsEditor.tsx   # Dynamic form
│   │   ├── Preview.tsx       # Remotion Player
│   │   └── RenderButton.tsx  # Lambda trigger
│   └── render/               # Rendering pipeline
│       ├── render.ts         # Local render API
│       ├── lambda-render.ts  # Lambda wrapper
│       └── s3-upload.ts      # S3 upload helper
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Agent Assignments

| Agent | Scope | Output |
|-------|-------|--------|
| Core | types.ts, Intro.tsx, LowerThird.tsx, EndScreen.tsx, TemplateRegistry.ts | 5 files |
| UI | App.tsx, TemplateCard.tsx, PropsEditor.tsx, Preview.tsx, RenderButton.tsx | 5 files |
| Pipeline | render.ts, lambda-render.ts, s3-upload.ts, package.json updates | 4 files + config |

## Merge Plan

After all agents complete:
1. Verify TypeScript compiles (`tsc --noEmit`)
2. Test studio preview (`npx remotion studio`)
3. Create `dist/` output structure
4. Update root `index.ts` and `Root.tsx`
5. Write usage examples

## Success Criteria

- [ ] 3 template types defined in types.ts
- [ ] 9 templates total (Intro x3, LowerThird x1, EndScreen x1 + 4 more)
- [ ] UI renders with live preview
- [ ] Lambda render works (dry-run verified)
- [ ] TypeScript errors = 0
