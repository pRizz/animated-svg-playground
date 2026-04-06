import type { ExampleDefinition } from "../types.ts";
import { sceneHeight, sceneWidth, sceneX, sceneY } from "../constants.ts";

/** Escape text content for safe XML embedding. */
export function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** Join SVG fragments while discarding empty parts. */
export function joinFragments(parts: Array<string | undefined>): string {
  return parts.filter((part): part is string => Boolean(part && part.trim())).join("\n");
}

/** Remove shared indentation from multi-line code snippets. */
export function stripCommonIndentation(value: string): string {
  const lines = value.split("\n");

  while (lines.length && !lines[0]?.trim()) {
    lines.shift();
  }

  while (lines.length && !lines.at(-1)?.trim()) {
    lines.pop();
  }

  if (!lines.length) {
    return "";
  }

  const maybeIndentations = lines
    .filter((line) => line.trim())
    .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
  const smallestIndentation = Math.min(...maybeIndentations);

  return lines
    .map((line) => (line.trim() ? line.slice(smallestIndentation) : ""))
    .join("\n");
}

/** Render a consistent label pair used inside generated SVG cards. */
export function renderLabelRow(label: string, value: string, y: number): string {
  return [
    `<text x="16" y="${y}" fill="#94a3b8" font-size="10" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">${escapeXml(label.toUpperCase())}</text>`,
    `<text x="82" y="${y}" fill="#e2e8f0" font-size="10" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">${escapeXml(value)}</text>`,
  ].join("\n");
}

/** Render short metadata content used in HTML and README output. */
export function renderExampleSummary(example: ExampleDefinition): string {
  return `${example.title} — ${example.description}`;
}

/** Render a short scene label within the example viewport. */
export function renderSceneLabel(label: string): string {
  return `<text x="${sceneX + 14}" y="${sceneY + sceneHeight - 10}" fill="#94a3b8" font-size="11" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">${escapeXml(label)}</text>`;
}

/** Build a relative repository path for a generated SVG. */
export function renderGeneratedSvgPath(filename: string): string {
  return `generated/svg/${filename}`;
}

/** Group array items by a stable string key. */
export function groupByKey<T>(items: T[], getKey: (item: T) => string): Map<string, T[]> {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const key = getKey(item);
    const existingItems = groups.get(key);

    if (existingItems) {
      existingItems.push(item);
      continue;
    }

    groups.set(key, [item]);
  }

  return groups;
}
