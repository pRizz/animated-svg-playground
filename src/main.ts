import { mkdir, readFile, writeFile } from "node:fs/promises";
import {
  canvasHeight,
  canvasWidth,
  categoryMap,
  categoryOrder,
  generatedSvgDirectory,
  htmlPreviewOutputPath,
  metadataOutputPath,
  readmeOutputPath,
  viewBox,
} from "./constants.ts";
import { getExampleDefinitions } from "./generators/index.ts";
import { renderPreviewHtml } from "./html/renderPreview.ts";
import { renderReadme } from "./readme/renderReadme.ts";
import { renderGeneratedSvgPath } from "./svg/helpers.ts";
import type { GeneratedExampleMetadata, GeneratedMetadataDocument } from "./types.ts";

const runtimeArgv = typeof Bun === "undefined" ? process.argv : Bun.argv;

async function ensureOutputDirectories(): Promise<void> {
  await mkdir(generatedSvgDirectory, { recursive: true });
}

async function writeSvgExamples(): Promise<GeneratedMetadataDocument["examples"]> {
  const examples = getExampleDefinitions();
  const metadataEntries: GeneratedMetadataDocument["examples"] = [];

  for (const example of examples) {
    const outputPath = renderGeneratedSvgPath(example.filename);
    const svgMarkup = example.renderSvg();

    await writeFile(outputPath, svgMarkup, "utf8");
    metadataEntries.push({
      id: example.id,
      title: example.title,
      description: example.description,
      category: example.category,
      filename: example.filename,
      path: outputPath,
      expectation: example.expectation,
      compatibilityNotes: example.compatibilityNotes,
    });
  }

  return metadataEntries;
}

async function writeMetadata(
  examples: GeneratedMetadataDocument["examples"],
): Promise<GeneratedMetadataDocument> {
  const metadata: GeneratedMetadataDocument = {
    generatedAt: new Date().toISOString(),
    exampleCount: examples.length,
    canvas: {
      width: canvasWidth,
      height: canvasHeight,
      viewBox,
    },
    categories: categoryOrder.map((categoryId) => categoryMap[categoryId]),
    examples,
  };

  await writeFile(metadataOutputPath, `${JSON.stringify(metadata, null, 2)}\n`, "utf8");
  return metadata;
}

async function writePreviewAndReadme(
  metadata: GeneratedMetadataDocument,
): Promise<void> {
  const examples = getExampleDefinitions();
  const maybeCurrentReadme = await readFile(readmeOutputPath, "utf8").catch(() => null);
  const readmeContent = renderReadme(maybeCurrentReadme, examples);
  const previewHtml = renderPreviewHtml(metadata.examples as GeneratedExampleMetadata[]);

  await writeFile(htmlPreviewOutputPath, previewHtml, "utf8");
  await writeFile(readmeOutputPath, readmeContent, "utf8");

  if (runtimeArgv.includes("--count")) {
    console.log(metadata.exampleCount);
    return;
  }

  console.log(`Generated ${metadata.exampleCount} SVG examples.`);
}

async function main(): Promise<void> {
  await ensureOutputDirectories();
  const examples = await writeSvgExamples();
  const metadata = await writeMetadata(examples);
  await writePreviewAndReadme(metadata);
}

await main();
