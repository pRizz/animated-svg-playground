import type { ExampleDefinition } from "../types.ts";
import { renderSvgDocument, renderStandardScene } from "../svg/base.ts";
import { joinFragments, renderSceneLabel, stripCommonIndentation } from "../svg/helpers.ts";

function createStrokeExample(
  id: string,
  title: string,
  description: string,
  filename: string,
  compatibilityNotes: string,
  body: string,
  animationCode: string,
): ExampleDefinition {
  return {
    id,
    title,
    description,
    filename,
    category: "stroke",
    expectation: "Likely works in browsers",
    compatibilityNotes,
    maybeAnimationSnippet: {
      language: "svg",
      code: animationCode,
    },
    renderSvg: () =>
      renderSvgDocument({
        title,
        subtitle: description,
        body: renderStandardScene(body),
      }),
  };
}

export function getStrokeExamples(): ExampleDefinition[] {
  return [
    createStrokeExample(
      "stroke-dash-reveal",
      "Stroke dash reveal",
      "Uses dash offset animation to reveal a polyline drawing.",
      "stroke-dash-reveal.svg",
      "Dash styling usually renders on GitHub, but animation may not play there.",
      joinFragments([
        `<path
          d="M48 126 L96 84 L144 112 L184 66 L232 88 L272 60"
          fill="none"
          stroke="#38bdf8"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="320"
          stroke-dashoffset="320"
        >
          <animate attributeName="stroke-dashoffset" from="320" to="0" dur="3s" repeatCount="indefinite" />
        </path>`,
        `<text x="120" y="144" text-anchor="middle" fill="#e2e8f0" font-size="12">dash reveal</text>`,
      ]),
      stripCommonIndentation(`
        <path
          d="M48 126 L96 84 L144 112 L184 66 L232 88 L272 60"
          fill="none"
          stroke="#38bdf8"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="320"
          stroke-dashoffset="320"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="320"
            to="0"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      `),
    ),
    createStrokeExample(
      "stroke-loop-draw",
      "Looping line draw",
      "A looping rectangular route continuously redraws itself.",
      "stroke-loop-draw.svg",
      "This is still SMIL-based, so browser support is stronger than GitHub playback.",
      joinFragments([
        `<path
          d="M70 70 H250 Q266 70 266 86 V114 Q266 130 250 130 H70 Q54 130 54 114 V86 Q54 70 70 70 Z"
          fill="none"
          stroke="#f59e0b"
          stroke-width="6"
          stroke-linecap="round"
          stroke-dasharray="420"
          stroke-dashoffset="420"
        >
          <animate attributeName="stroke-dashoffset" from="420" to="0" dur="2.4s" repeatCount="indefinite" />
        </path>`,
        `<text x="160" y="106" text-anchor="middle" fill="#f8fafc" font-size="13">looping draw</text>`,
      ]),
      stripCommonIndentation(`
        <path
          d="M70 70 H250 Q266 70 266 86 V114 Q266 130 250 130 H70 Q54 130 54 114 V86 Q54 70 70 70 Z"
          fill="none"
          stroke="#f59e0b"
          stroke-width="6"
          stroke-linecap="round"
          stroke-dasharray="420"
          stroke-dashoffset="420"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="420"
            to="0"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </path>
      `),
    ),
    createStrokeExample(
      "stroke-circle-progress",
      "Circular progress animation",
      "A circular arc animates with stroke dashes like a progress ring.",
      "stroke-circle-progress.svg",
      "The static ring should render everywhere; the animated progress effect may be browser-only in practice.",
      joinFragments([
        `<circle cx="160" cy="104" r="42" fill="none" stroke="#1e293b" stroke-width="12" />`,
        `<g transform="rotate(-90 160 104)">`,
        `  <circle
            cx="160"
            cy="104"
            r="42"
            fill="none"
            stroke="#22c55e"
            stroke-width="12"
            stroke-linecap="round"
            stroke-dasharray="0 264"
          >`,
        `    <animate attributeName="stroke-dasharray" values="0 264;180 84;264 0;0 264" dur="4s" repeatCount="indefinite" />`,
        `  </circle>`,
        `</g>`,
        `<text x="160" y="109" text-anchor="middle" fill="#f8fafc" font-size="13">progress ring</text>`,
      ]),
      stripCommonIndentation(`
        <g transform="rotate(-90 160 104)">
          <circle
            cx="160"
            cy="104"
            r="42"
            fill="none"
            stroke="#22c55e"
            stroke-width="12"
            stroke-linecap="round"
            stroke-dasharray="0 264"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0 264;180 84;264 0;0 264"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      `),
    ),
  ];
}
