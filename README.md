# SVG Animation Compatibility Gallery

This repository exists to experimentally test which SVG rendering and animation features show up well in normal browsers and in GitHub repository views, especially on the README homepage.

It is intentionally a static artifact generator rather than a frontend app:

- Bun is the runtime, package manager, and script runner
- TypeScript is used for all source files
- SVG files are generated programmatically into `generated/svg/`
- `README.md` includes a generated gallery so the committed SVGs are visible directly on GitHub

## Why this repo exists

GitHub does not always render SVGs the same way that a local browser does. Some features render as a static first frame, some survive sanitization, and some are stripped or ignored entirely. This repo makes those differences easy to inspect by direct experiment.

## Setup

```bash
bun install
```

## Generate artifacts

```bash
bun run generate
```

Useful scripts:

- `bun run generate` — generate SVGs, metadata, preview HTML, and refresh the README gallery
- `bun run regen` — alias for `generate`
- `bun run dev` — alias for `generate`
- `bun run clean` — remove generated artifacts
- `bun run check` — run the TypeScript typecheck
- `bun run count` — print the example count

## Expected GitHub rendering caveats

- Static SVG shapes, gradients, text, and many defs-based features often render well.
- SMIL and CSS animation may render as a static snapshot in GitHub even when they animate in a browser.
- Features like `foreignObject` and `script` are included as deliberate edge cases and are expected to be sanitized or ignored by GitHub.
- This repository records expectations, not guarantees; the point is to keep the experiment easy to rerun and inspect.

<!-- GENERATED_GALLERY_START -->
<!-- GENERATED_GALLERY_END -->