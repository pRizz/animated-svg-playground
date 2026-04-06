import { sceneHeight, sceneWidth, sceneX, sceneY } from "../constants.ts";
import type { ExampleDefinition } from "../types.ts";
import { renderSvgDocument } from "../svg/base.ts";

function createStaticExample(
  id: string,
  title: string,
  description: string,
  filename: string,
  compatibilityNotes: string,
  body: string,
  defs?: string,
): ExampleDefinition {
  const maybeDefs = defs;

  return {
    id,
    title,
    description,
    filename,
    category: "static",
    expectation: "May work on GitHub",
    compatibilityNotes,
    renderSvg: () =>
      renderSvgDocument({
        title,
        description,
        body,
        ...(maybeDefs ? { defs: maybeDefs } : {}),
      }),
  };
}

export function getStaticExamples(): ExampleDefinition[] {
  return [
    createStaticExample(
      "static-simple-circle",
      "Simple circle",
      "Single filled circle with a baseline label and no animation.",
      "static-simple-circle.svg",
      "Plain shape rendering is typically stable in browsers and GitHub image rendering.",
      `
        <circle cx="88" cy="106" r="28" fill="#38bdf8" />
        <circle cx="88" cy="106" r="12" fill="#0f172a" opacity="0.7" />
        <text x="128" y="100" fill="#e2e8f0" font-size="16">Circle</text>
        <text x="128" y="120" fill="#94a3b8" font-size="11">Filled with inline attributes only</text>
      `,
    ),
    createStaticExample(
      "static-simple-rect",
      "Simple rect",
      "Rounded rectangle with stroke and layered highlight.",
      "static-simple-rect.svg",
      "Inline rectangle geometry and stroke attributes should be broadly compatible.",
      `
        <rect x="56" y="74" width="84" height="52" rx="12" fill="#22c55e" stroke="#bbf7d0" stroke-width="4" />
        <rect x="64" y="82" width="68" height="14" rx="7" fill="#dcfce7" opacity="0.45" />
        <text x="170" y="98" fill="#e2e8f0" font-size="16">Rectangle</text>
        <text x="170" y="118" fill="#94a3b8" font-size="11">Rounded corners and stroke</text>
      `,
    ),
    createStaticExample(
      "static-path-stroke",
      "Path and stroke",
      "Curved path with visible control-point markers and thick stroke styling.",
      "static-path-stroke.svg",
      "Complex paths still render as plain SVG and are usually safe on GitHub.",
      `
        <path d="M36 120 C88 48, 146 48, 198 120 S288 154, 284 82" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round" />
        <circle cx="36" cy="120" r="4" fill="#fde68a" />
        <circle cx="88" cy="48" r="4" fill="#fde68a" />
        <circle cx="146" cy="48" r="4" fill="#fde68a" />
        <circle cx="198" cy="120" r="4" fill="#fde68a" />
        <text x="24" y="${sceneY + sceneHeight - 10}" fill="#94a3b8" font-size="11">Bezier path with round caps</text>
      `,
    ),
    createStaticExample(
      "static-gradient-fill",
      "Gradient fill",
      "Linear gradient with a simple glossy badge shape.",
      "static-gradient-fill.svg",
      "Gradient defs are commonly supported, but they verify that defs survive the renderer.",
      `
        <rect x="54" y="70" width="212" height="62" rx="18" fill="url(#warmGradient)" />
        <ellipse cx="122" cy="88" rx="74" ry="18" fill="#ffffff" opacity="0.18" />
        <text x="90" y="110" fill="#fff7ed" font-size="19" font-weight="700">Gradient</text>
        <text x="90" y="126" fill="#ffedd5" font-size="11">linearGradient in defs</text>
      `,
      `
        <linearGradient id="warmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ec4899" />
          <stop offset="50%" stop-color="#f97316" />
          <stop offset="100%" stop-color="#facc15" />
        </linearGradient>
      `,
    ),
    createStaticExample(
      "static-text-label",
      "Text example",
      "Mixed text sizes and weights to probe plain SVG text rendering.",
      "static-text-label.svg",
      "SVG text generally works, though font metrics may vary between environments.",
      `
        <text x="44" y="90" fill="#e2e8f0" font-size="24" font-weight="700">SVG text sample</text>
        <text x="44" y="116" fill="#38bdf8" font-size="14">Readable labels matter in a gallery</text>
        <text x="44" y="138" fill="#94a3b8" font-size="11">Font rendering may differ slightly across viewers</text>
      `,
    ),
    createStaticExample(
      "static-clip-path",
      "clipPath example",
      "A clipped pattern inside a circle to verify clipPath defs usage.",
      "static-clip-path.svg",
      "clipPath often works, but it is useful to verify defs-heavy features directly in GitHub.",
      `
        <g clip-path="url(#circleClip)">
          <rect x="${sceneX + 18}" y="${sceneY + 18}" width="${sceneWidth - 36}" height="${sceneHeight - 36}" fill="#1d4ed8" />
          <path d="M24 130 L126 42 L176 92 L246 48 L296 112" stroke="#bfdbfe" stroke-width="18" stroke-linecap="round" fill="none" opacity="0.85" />
          <path d="M24 92 L98 140 L174 66 L244 122 L296 84" stroke="#93c5fd" stroke-width="14" stroke-linecap="round" fill="none" opacity="0.9" />
        </g>
        <circle cx="160" cy="106" r="44" fill="none" stroke="#e0f2fe" stroke-width="3" />
        <text x="218" y="92" fill="#e2e8f0" font-size="14">clipPath</text>
        <text x="218" y="110" fill="#94a3b8" font-size="11">Pattern clipped to a circle</text>
      `,
      `
        <clipPath id="circleClip">
          <circle cx="160" cy="106" r="44" />
        </clipPath>
      `,
    ),
  ];
}

export const createStaticExamples = getStaticExamples;
