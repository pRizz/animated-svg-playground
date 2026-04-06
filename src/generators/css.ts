import type { ExampleDefinition } from "../types.ts";
import { renderSvgDocument, renderStandardScene } from "../svg/base.ts";

function createCssExample(
  id: string,
  title: string,
  description: string,
  filename: string,
  compatibilityNotes: string,
  body: string,
  styles: string,
  expectation: ExampleDefinition["expectation"] = "Likely works in browsers",
): ExampleDefinition {
  return {
    id,
    title,
    description,
    filename,
    category: "css",
    expectation,
    compatibilityNotes,
    renderSvg: () =>
      renderSvgDocument({
        title,
        subtitle: description,
        body: renderStandardScene(body, "embedded <style> and class selectors"),
        styles,
      }),
  };
}

export function getCssExamples(): ExampleDefinition[] {
  return [
    createCssExample(
      "css-keyframes-move",
      "CSS keyframes movement",
      "Inline style block animating horizontal movement with keyframes.",
      "css-keyframes-move.svg",
      "CSS animation inside SVG tends to work in browsers, but GitHub may render a static first frame.",
      `
        <line x1="40" y1="116" x2="280" y2="116" stroke="#334155" stroke-width="6" stroke-linecap="round" />
        <circle class="runner" cx="76" cy="116" r="18" fill="#38bdf8" />
        <text x="142" y="100" fill="#e2e8f0" font-size="15">CSS keyframes</text>
        <text x="142" y="120" fill="#94a3b8" font-size="11">translateX via embedded style block</text>
      `,
      `
        .runner {
          animation: slide-runner 2.4s ease-in-out infinite alternate;
          transform-box: fill-box;
          transform-origin: center;
        }

        @keyframes slide-runner {
          from {
            transform: translateX(0px);
          }

          to {
            transform: translateX(164px);
          }
        }
      `,
      "May work on GitHub",
    ),
    createCssExample(
      "css-color-transition",
      "CSS color transition",
      "Class-based color cycling for a central badge.",
      "css-color-transition.svg",
      "Embedded style tags may be preserved in some contexts but are not guaranteed on GitHub.",
      `
        <rect class="badge" x="74" y="74" width="172" height="54" rx="16" />
        <text x="118" y="106" fill="#f8fafc" font-size="17" font-weight="700">CSS color</text>
      `,
      `
        .badge {
          fill: #22c55e;
          animation: badge-color 2.8s linear infinite alternate;
        }

        @keyframes badge-color {
          0% { fill: #22c55e; }
          50% { fill: #14b8a6; }
          100% { fill: #6366f1; }
        }
      `,
      "May work on GitHub",
    ),
    createCssExample(
      "css-opacity-blink",
      "CSS opacity blink",
      "Simple blinking dots using a shared class and staggered timing.",
      "css-opacity-blink.svg",
      "A useful experiment for whether CSS animation survives sanitization or becomes a static snapshot.",
      `
        <circle class="blink delay-0" cx="116" cy="106" r="16" fill="#f97316" />
        <circle class="blink delay-1" cx="160" cy="106" r="16" fill="#f59e0b" />
        <circle class="blink delay-2" cx="204" cy="106" r="16" fill="#eab308" />
        <text x="88" y="142" fill="#94a3b8" font-size="11">Shared classes with staggered animation-delay</text>
      `,
      `
        .blink {
          animation: blink-cycle 1.8s ease-in-out infinite;
        }

        .delay-1 {
          animation-delay: 0.3s;
        }

        .delay-2 {
          animation-delay: 0.6s;
        }

        @keyframes blink-cycle {
          0%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
      `,
      "May work on GitHub",
    ),
    createCssExample(
      "css-stroke-reveal",
      "CSS stroke reveal",
      "Path reveal using stroke-dashoffset animated through CSS.",
      "css-stroke-reveal.svg",
      "This combines class-based styling and dash animation, which is informative for browser-vs-GitHub comparisons.",
      `
        <path class="trace" d="M42 124 C78 54, 128 56, 160 110 S238 150, 278 80" />
        <circle cx="42" cy="124" r="5" fill="#38bdf8" />
        <circle cx="278" cy="80" r="5" fill="#38bdf8" />
        <text x="46" y="146" fill="#94a3b8" font-size="11">stroke-dashoffset animated from CSS</text>
      `,
      `
        .trace {
          fill: none;
          stroke: #38bdf8;
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: 320;
          stroke-dashoffset: 320;
          animation: trace-line 2.2s linear infinite;
        }

        @keyframes trace-line {
          from {
            stroke-dashoffset: 320;
          }

          to {
            stroke-dashoffset: 0;
          }
        }
      `,
      "May work on GitHub",
    ),
    createCssExample(
      "css-class-styles",
      "CSS class-based styling",
      "Uses shared classes and an embedded style tag without motion to test style application alone.",
      "css-class-styles.svg",
      "This isolates embedded style tags and class selectors from animation timing behavior.",
      `
        <circle class="dot cool" cx="94" cy="106" r="22" />
        <circle class="dot warm" cx="160" cy="106" r="22" />
        <circle class="dot neutral" cx="226" cy="106" r="22" />
        <text x="70" y="144" fill="#94a3b8" font-size="11">Embedded class selectors only</text>
      `,
      `
        .dot {
          stroke: #e2e8f0;
          stroke-width: 3;
        }

        .cool {
          fill: #38bdf8;
        }

        .warm {
          fill: #f97316;
        }

        .neutral {
          fill: #94a3b8;
        }
      `,
      "May work on GitHub",
    ),
  ];
}
