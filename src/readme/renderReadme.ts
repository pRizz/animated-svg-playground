import {
  categoryMap,
  categoryOrder,
  readmeGalleryEnd,
  readmeGalleryStart,
  repositoryTitle,
} from "../constants.ts";
import type { ExampleDefinition } from "../types.ts";
import { escapeXml, groupByKey, renderGeneratedSvgPath } from "../svg/helpers.ts";

function renderExampleBlock(example: ExampleDefinition): string {
  const imagePath = renderGeneratedSvgPath(example.filename);

  return [
    `### ${example.title}`,
    "",
    `${example.description}`,
    "",
    `- **Expectation:** ${example.expectation}`,
    `- **Notes:** ${example.compatibilityNotes}`,
    `- **File:** \`${imagePath}\``,
    "",
    `![${escapeXml(example.title)}](${imagePath})`,
    "",
  ].join("\n");
}

function renderGeneratedGallery(examples: ExampleDefinition[]): string {
  const examplesByCategory = groupByKey(examples, (example) => example.category);
  const sections: string[] = [readmeGalleryStart, ""];

  sections.push("## Generated gallery");
  sections.push("");
  sections.push(
    "Each example below is generated from TypeScript source. Re-run `bun run generate` to refresh the SVGs, metadata, preview page, and this gallery section.",
  );
  sections.push("");

  for (const categoryId of categoryOrder) {
    const category = categoryMap[categoryId];
    const categoryExamples = examplesByCategory.get(categoryId);

    if (!categoryExamples?.length) {
      continue;
    }

    sections.push(`## ${category.title}`);
    sections.push("");
    sections.push(category.description);
    sections.push("");

    for (const example of categoryExamples) {
      sections.push(renderExampleBlock(example));
    }
  }

  sections.push(readmeGalleryEnd);
  sections.push("");

  return sections.join("\n");
}

function renderReadmeTemplate(examples: ExampleDefinition[]): string {
  const gallery = renderGeneratedGallery(examples);

  return [
    `# ${repositoryTitle}`,
    "",
    "This repository exists to experimentally test which SVG animation primitives and rendering techniques display well in normal browsers versus GitHub README rendering.",
    "",
    "The project is intentionally small and inspectable:",
    "",
    "- Bun is the runtime, package manager, and script runner",
    "- TypeScript generates all SVG artifacts",
    "- each SVG focuses on one feature or compatibility edge case",
    "- generated files live in `generated/` so the outputs are easy to inspect",
    "",
    "## Why this exists",
    "",
    "GitHub often sanitizes or snapshots SVGs differently from a normal browser. This repo helps answer compatibility questions by direct experiment instead of assumption.",
    "",
    "## Setup",
    "",
    "```bash",
    "bun install",
    "```",
    "",
    "## Generate artifacts",
    "",
    "```bash",
    "bun run generate",
    "```",
    "",
    "Useful commands:",
    "",
    "- `bun run generate` — regenerate SVGs, metadata, preview HTML, and README gallery",
    "- `bun run regen` — alias for generate",
    "- `bun run dev` — alias for generate",
    "- `bun run clean` — remove generated artifacts",
    "- `bun run check` — run TypeScript type checking",
    "- `bun run count` — print the current example count",
    "",
    "## Generated outputs",
    "",
    "- `generated/svg/` — standalone SVG examples",
    "- `generated/metadata.json` — machine-readable example metadata",
    "- `generated/index.html` — local preview page for browser testing",
    "",
    "## Expected GitHub rendering caveats",
    "",
    "- Static shapes, paths, gradients, and text usually render reliably",
    "- SMIL and CSS animation may appear only as a static frame on GitHub",
    "- Embedded style tags may work inconsistently depending on sanitization and image handling",
    "- `foreignObject` and `script` are expected to be sanitized, blocked, or ignored",
    "",
    "## Conclusion",
    "",
    "As a starting hypothesis: static SVG features are the most likely to survive GitHub rendering, while active animation and HTML/script integration are much more likely to be browser-only.",
    "",
    gallery,
  ].join("\n");
}

/** Replace the generated README gallery section while preserving handwritten content. */
export function renderReadme(currentReadme: string | null, examples: ExampleDefinition[]): string {
  const generatedSection = renderGeneratedGallery(examples);

  if (!currentReadme) {
    return renderReadmeTemplate(examples);
  }

  const startIndex = currentReadme.indexOf(readmeGalleryStart);
  const endIndex = currentReadme.indexOf(readmeGalleryEnd);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    return renderReadmeTemplate(examples);
  }

  const before = currentReadme.slice(0, startIndex).trimEnd();
  const after = currentReadme.slice(endIndex + readmeGalleryEnd.length).trimStart();

  return `${before}\n\n${generatedSection}${after ? `\n${after}` : ""}\n`;
}
