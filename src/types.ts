export type CompatibilityExpectation =
  | "Likely works in browsers"
  | "May work on GitHub"
  | "Likely sanitized or ignored on GitHub"
  | "Browser only";

export type ExampleCategoryId =
  | "static"
  | "smil"
  | "stroke"
  | "css"
  | "edge";

export interface ExampleCategory {
  id: ExampleCategoryId;
  title: string;
  description: string;
}

export interface ExampleDefinition {
  id: string;
  title: string;
  description: string;
  filename: string;
  category: ExampleCategoryId;
  expectation: CompatibilityExpectation;
  compatibilityNotes: string;
  renderSvg: () => string;
}

export interface GeneratedExampleMetadata {
  id: string;
  title: string;
  description: string;
  category: ExampleCategoryId;
  filename: string;
  path: string;
  expectation: CompatibilityExpectation;
  compatibilityNotes: string;
}

export interface GeneratedMetadataDocument {
  generatedAt: string;
  exampleCount: number;
  canvas: {
    width: number;
    height: number;
    viewBox: string;
  };
  categories: ExampleCategory[];
  examples: GeneratedExampleMetadata[];
}
