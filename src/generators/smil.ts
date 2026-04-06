import { renderSvgDocument } from "../svg/base.ts";
import { joinFragments, renderSceneLabel } from "../svg/helpers.ts";
import type { ExampleDefinition } from "../types.ts";

function createSmilExample(
  id: string,
  title: string,
  description: string,
  filename: string,
  compatibilityNotes: string,
  body: string,
): ExampleDefinition {
  return {
    id,
    title,
    description,
    filename,
    category: "smil",
    expectation: "Likely works in browsers",
    compatibilityNotes,
    renderSvg: () =>
      renderSvgDocument({
        title,
        subtitle: description,
        body,
      }),
  };
}

export function getSmilExamples(): ExampleDefinition[] {
  return [
    createSmilExample(
      "smil-animate-cx",
      "SMIL animate for cx",
      "Moves a circle horizontally by animating the cx attribute.",
      "smil-animate-cx.svg",
      "A direct animate-on-attribute test. Browsers usually support it, while GitHub may show only the initial frame.",
      joinFragments([
        renderSceneLabel("attributeName='cx'"),
        `<line x1="40" y1="108" x2="280" y2="108" stroke="#1e293b" stroke-width="8" stroke-linecap="round" />`,
        `<circle cx="60" cy="108" r="18" fill="#22d3ee">`,
        `  <animate attributeName="cx" values="60;260;60" dur="2.8s" repeatCount="indefinite" />`,
        `</circle>`,
      ]),
    ),
    createSmilExample(
      "smil-animate-fill",
      "SMIL animate for fill",
      "Cycles a rectangle through multiple fill colors.",
      "smil-animate-fill.svg",
      "Good for checking whether animated presentation attributes survive rendering.",
      joinFragments([
        renderSceneLabel("fill color cycle"),
        `<rect x="96" y="70" width="128" height="72" rx="18" fill="#38bdf8">`,
        `  <animate attributeName="fill" values="#38bdf8;#f472b6;#facc15;#38bdf8" dur="3s" repeatCount="indefinite" />`,
        `</rect>`,
      ]),
    ),
    createSmilExample(
      "smil-opacity-pulse",
      "SMIL opacity pulse",
      "Pulses element opacity with a simple animate element.",
      "smil-opacity-pulse.svg",
      "Useful for determining whether opacity changes animate or only the static state is shown.",
      joinFragments([
        renderSceneLabel("opacity pulse"),
        `<circle cx="160" cy="104" r="34" fill="#a855f7">`,
        `  <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" />`,
        `</circle>`,
        `<circle cx="160" cy="104" r="14" fill="#faf5ff" />`,
      ]),
    ),
    createSmilExample(
      "smil-transform-suite",
      "SMIL transform rotate, scale, translate",
      "Runs three animateTransform variants side-by-side.",
      "smil-transform-suite.svg",
      "Combines rotate, scale, and translate to compare transform-specific behavior in one SVG.",
      joinFragments([
        renderSceneLabel("rotate / scale / translate"),
        `<g transform="translate(72 102)">`,
        `  <rect x="-14" y="-14" width="28" height="28" rx="6" fill="#38bdf8">`,
        `    <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3.5s" repeatCount="indefinite" />`,
        `  </rect>`,
        `</g>`,
        `<g transform="translate(160 102)">`,
        `  <circle cx="0" cy="0" r="18" fill="#22c55e">`,
        `    <animateTransform attributeName="transform" type="scale" values="1;1.45;1" dur="2s" repeatCount="indefinite" additive="sum" />`,
        `  </circle>`,
        `</g>`,
        `<g transform="translate(240 102)">`,
        `  <rect x="-18" y="-12" width="36" height="24" rx="6" fill="#f97316">`,
        `    <animateTransform attributeName="transform" type="translate" values="0 0;-18 0;0 0;18 0;0 0" dur="2.4s" repeatCount="indefinite" additive="sum" />`,
        `  </rect>`,
        `</g>`,
      ]),
    ),
    createSmilExample(
      "smil-motion-path",
      "SMIL animateMotion path follow",
      "Moves a dot along a visible guide path.",
      "smil-motion-path.svg",
      "animateMotion is historically less universal than basic animate, making it a good compatibility probe.",
      joinFragments([
        renderSceneLabel("animateMotion along path"),
        `<path id="motion-track" d="M 40 124 C 96 50, 224 50, 280 124" fill="none" stroke="#334155" stroke-width="5" stroke-linecap="round" />`,
        `<circle cx="0" cy="0" r="14" fill="#f43f5e">`,
        `  <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">`,
        `    <mpath href="#motion-track" />`,
        `  </animateMotion>`,
        `</circle>`,
      ]),
    ),
    createSmilExample(
      "smil-set-toggle-timing",
      "SMIL set with timing offsets",
      "Uses set elements to toggle visibility with begin offsets and durations.",
      "smil-set-toggle-timing.svg",
      "Tests set timing behavior, which can be easier to reason about than full interpolation.",
      joinFragments([
        renderSceneLabel("set + begin/dur"),
        `<circle cx="110" cy="104" r="24" fill="#22c55e" visibility="hidden">`,
        `  <set attributeName="visibility" to="visible" begin="0s;dot2.end+0.2s" dur="0.9s" />`,
        `</circle>`,
        `<circle id="dot2" cx="210" cy="104" r="24" fill="#f97316" visibility="hidden">`,
        `  <set attributeName="visibility" to="visible" begin="0.7s" dur="0.9s" />`,
        `</circle>`,
      ]),
    ),
    createSmilExample(
      "smil-multiple-animations",
      "SMIL multiple animate elements",
      "Animates position, radius, and fill on one element at the same time.",
      "smil-multiple-animations.svg",
      "Good for testing whether multiple child animation nodes on the same target are all honored.",
      joinFragments([
        renderSceneLabel("position + size + color"),
        `<circle cx="74" cy="106" r="16" fill="#38bdf8">`,
        `  <animate attributeName="cx" values="74;246;74" dur="3s" repeatCount="indefinite" />`,
        `  <animate attributeName="r" values="16;28;16" dur="1.5s" repeatCount="indefinite" />`,
        `  <animate attributeName="fill" values="#38bdf8;#f43f5e;#a855f7;#38bdf8" dur="3s" repeatCount="indefinite" />`,
        `</circle>`,
      ]),
    ),
    createSmilExample(
      "smil-additive-accumulate",
      "SMIL additive accumulate",
      "Stacks repeated translation and rotation using additive and accumulate behavior.",
      "smil-additive-accumulate.svg",
      "More advanced SMIL timing model coverage; if unsupported, the shape may appear static or partially animated.",
      joinFragments([
        renderSceneLabel("additive='sum' accumulate='sum'"),
        `<g transform="translate(160 104)">`,
        `  <polygon points="0,-26 22,16 -22,16" fill="#facc15">`,
        `    <animateTransform attributeName="transform" type="rotate" from="0" to="120" dur="1s" repeatCount="3" additive="sum" accumulate="sum" />`,
        `    <animateTransform attributeName="transform" type="translate" values="0 0;10 0;0 0" begin="0s" dur="1s" repeatCount="3" additive="sum" />`,
        `  </polygon>`,
        `</g>`,
      ]),
    ),
  ];
}
