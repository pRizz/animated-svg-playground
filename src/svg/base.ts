import {
  canvasHeight,
  canvasWidth,
  sceneHeight,
  sceneRadius,
  sceneWidth,
  sceneX,
  sceneY,
  viewBox,
} from "../constants.ts";
import { escapeXml, joinFragments, renderLabelRow, renderSceneLabel } from "./helpers.ts";

interface SvgDocumentOptions {
  title: string;
  body: string;
  subtitle?: string;
  description?: string;
  defs?: string;
  styles?: string;
  footerNote?: string;
}

/** Wrap content in a standalone, labeled SVG document. */
export function renderSvgDocument(options: SvgDocumentOptions): string {
  const subtitle = options.subtitle ?? options.description ?? "";
  const defsBlock = options.defs ? `<defs>\n${options.defs}\n</defs>` : undefined;
  const styleBlock = options.styles ? `<style>\n${options.styles}\n</style>` : undefined;
  const footerNote = options.footerNote
    ? `<text x="16" y="170" fill="#94a3b8" font-size="9" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">${escapeXml(options.footerNote)}</text>`
    : undefined;

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}" viewBox="${viewBox}" role="img" aria-labelledby="title desc">`,
    `<title id="title">${escapeXml(options.title)}</title>`,
    `<desc id="desc">${escapeXml(subtitle)}</desc>`,
    joinFragments([defsBlock, styleBlock]),
    `<rect width="${canvasWidth}" height="${canvasHeight}" rx="18" fill="#020617"/>`,
    `<rect x="8" y="8" width="${canvasWidth - 16}" height="${canvasHeight - 16}" rx="16" fill="#0f172a" stroke="#1e293b"/>`,
    `<text x="16" y="24" fill="#f8fafc" font-size="16" font-weight="700" font-family="Inter, Arial, sans-serif">${escapeXml(options.title)}</text>`,
    `<text x="16" y="38" fill="#94a3b8" font-size="11" font-family="Inter, Arial, sans-serif">${escapeXml(subtitle)}</text>`,
    renderLabelRow("canvas", `${canvasWidth}×${canvasHeight}`, 60),
    `<rect x="${sceneX}" y="${sceneY}" width="${sceneWidth}" height="${sceneHeight}" rx="${sceneRadius}" fill="#111827" stroke="#334155"/>`,
    renderSceneGrid(),
    options.body,
    footerNote,
    `</svg>`,
  ].join("\n");
}

/** Backward-compatible alias for the main SVG document renderer. */
export const createSvgDocument = renderSvgDocument;

/** Render a subtle baseline grid behind an example scene. */
export function renderSceneGrid(): string {
  return [
    `<g opacity="0.24">`,
    `<path d="M16 106 H304" stroke="#1e293b" stroke-width="1"/>`,
    `<path d="M16 76 H304" stroke="#1e293b" stroke-width="1"/>`,
    `<path d="M96 48 V164" stroke="#1e293b" stroke-width="1"/>`,
    `<path d="M176 48 V164" stroke="#1e293b" stroke-width="1"/>`,
    `<path d="M256 48 V164" stroke="#1e293b" stroke-width="1"/>`,
    `</g>`,
  ].join("\n");
}

/** Render a scene-aligned circle helper. */
export function sceneCircle(cx: number, cy: number, r: number, attributes = ""): string {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" ${attributes} />`;
}

/** Render a scene-aligned rounded rectangle helper. */
export function sceneRect(
  x: number,
  y: number,
  width: number,
  height: number,
  attributes = "",
): string {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" ${attributes} />`;
}

/** Render scene text with basic XML escaping. */
export function sceneText(
  value: string,
  x: number,
  y: number,
  anchor: "start" | "middle" | "end" = "start",
  fill = "#e2e8f0",
  size = 12,
): string {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" font-size="${size}">${escapeXml(value)}</text>`;
}

/** Render the standard scene chrome used by most examples. */
export function renderStandardScene(body: string, label?: string): string {
  return joinFragments([label ? renderSceneLabel(label) : undefined, body]);
}
