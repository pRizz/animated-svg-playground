import type { ExampleCategory } from "./types.ts";

export const repositoryTitle = "SVG Animation Compatibility Gallery";

export const canvasWidth = 320;
export const canvasHeight = 180;
export const sceneX = 16;
export const sceneY = 48;
export const sceneWidth = 288;
export const sceneHeight = 116;
export const sceneRadius = 14;
export const viewBox = `0 0 ${canvasWidth} ${canvasHeight}`;

export const generatedDirectory = "generated";
export const generatedSvgDirectory = `${generatedDirectory}/svg`;
export const metadataOutputPath = `${generatedDirectory}/metadata.json`;
export const htmlPreviewOutputPath = `${generatedDirectory}/index.html`;
export const readmeOutputPath = "README.md";

export const readmeGalleryStart = "<!-- GENERATED_GALLERY_START -->";
export const readmeGalleryEnd = "<!-- GENERATED_GALLERY_END -->";

export const categoryOrder = ["static", "smil", "stroke", "css", "edge"] as const;

export const categoryMap: Record<(typeof categoryOrder)[number], ExampleCategory> = {
  static: {
    id: "static",
    title: "Basic static SVG controls",
    description: "Baseline primitives and non-animated SVG features.",
  },
  smil: {
    id: "smil",
    title: "SMIL animation primitives",
    description: "SVG-native animation elements such as animate and animateTransform.",
  },
  stroke: {
    id: "stroke",
    title: "Stroke drawing effects",
    description: "Dash-based reveal and looping stroke animations.",
  },
  css: {
    id: "css",
    title: "CSS-based SVG animation experiments",
    description: "Inline style blocks, classes, and CSS keyframe animation inside SVG.",
  },
  edge: {
    id: "edge",
    title: "Feature edge cases",
    description: "Reuse, filters, and features that are often sanitized or inconsistent.",
  },
};
