import type { ExampleDefinition } from "../types.ts";
import { renderSvgDocument, renderStandardScene } from "../svg/base.ts";

function createEdgeCaseExample(
  id: string,
  title: string,
  description: string,
  filename: string,
  expectation: ExampleDefinition["expectation"],
  compatibilityNotes: string,
  body: string,
  defs?: string,
): ExampleDefinition {
  return {
    id,
    title,
    description,
    filename,
    category: "edge",
    expectation,
    compatibilityNotes,
    renderSvg: () =>
      renderSvgDocument(
        defs
          ? {
              title,
              subtitle: description,
              body: renderStandardScene(body),
              defs,
            }
          : {
              title,
              subtitle: description,
              body: renderStandardScene(body),
            },
      ),
  };
}

export function getEdgeCaseExamples(): ExampleDefinition[] {
  return [
    createEdgeCaseExample(
      "edge-symbol-reuse",
      "Symbol and use reuse",
      "Reuses one symbol instance at multiple sizes to test defs-based reuse.",
      "edge-symbol-reuse.svg",
      "May work on GitHub",
      "Symbol and use are usually preserved, but symbol references are still worth checking in repository rendering.",
      `
        <use href="#tile-star" x="50" y="70" width="48" height="48" />
        <use href="#tile-star" x="136" y="58" width="68" height="68" opacity="0.92" />
        <use href="#tile-star" x="232" y="74" width="40" height="40" opacity="0.8" />
        <text x="50" y="144" fill="#cbd5e1" font-size="12">Single symbol definition, three instances</text>
      `,
      `
        <symbol id="tile-star" viewBox="0 0 48 48">
          <path
            d="M24 6 L29 19 L43 19 L32 28 L36 42 L24 33 L12 42 L16 28 L5 19 L19 19 Z"
            fill="#f59e0b"
            stroke="#fef3c7"
            stroke-width="2"
          />
        </symbol>
      `,
    ),
    createEdgeCaseExample(
      "edge-filter-shadow",
      "Filter with drop shadow",
      "Uses a blur and offset filter chain to simulate a shadowed card.",
      "edge-filter-shadow.svg",
      "May work on GitHub",
      "Basic filters often work in browsers, but GitHub may sanitize or flatten them differently.",
      `
        <rect x="70" y="68" width="180" height="66" rx="18" fill="#0f172a" filter="url(#soft-shadow)" />
        <circle cx="104" cy="101" r="14" fill="#22d3ee" />
        <text x="128" y="95" fill="#e2e8f0" font-size="14" font-weight="700">Filter chain</text>
        <text x="128" y="114" fill="#94a3b8" font-size="12">feOffset + feGaussianBlur + feColorMatrix</text>
      `,
      `
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feOffset dx="0" dy="8" in="SourceAlpha" result="offset" />
          <feGaussianBlur in="offset" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.02 0 0 0 0 0.08 0 0 0 0 0.18 0 0 0 0.55 0"
            result="shadow"
          />
          <feBlend in="SourceGraphic" in2="shadow" mode="normal" />
        </filter>
      `,
    ),
    createEdgeCaseExample(
      "edge-foreign-object",
      "foreignObject HTML block",
      "Embeds HTML inside the SVG as a browser-oriented compatibility edge case.",
      "edge-foreign-object.svg",
      "Likely sanitized or ignored on GitHub",
      "foreignObject content is a known sanitization risk and is often stripped or rendered inconsistently on GitHub.",
      `
        <rect x="48" y="60" width="224" height="86" rx="16" fill="#0f172a" stroke="#475569" stroke-dasharray="6 5" />
        <!-- foreignObject is intentionally included because it is commonly sanitized in GitHub-rendered SVGs. -->
        <foreignObject x="58" y="70" width="204" height="66">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Inter, Arial, sans-serif; color: #e2e8f0;">
            <div style="font-size: 13px; font-weight: 700; margin-bottom: 6px;">HTML inside SVG</div>
            <div style="font-size: 12px; line-height: 1.35;">
              This block should render in a normal browser. GitHub may sanitize or ignore it.
            </div>
          </div>
        </foreignObject>
        <text x="60" y="154" fill="#94a3b8" font-size="11">Use this as a negative or inconsistent compatibility probe.</text>
      `,
    ),
    createEdgeCaseExample(
      "edge-script-negative",
      "Script tag negative test",
      "Includes a tiny script to confirm that active content is blocked or ignored.",
      "edge-script-negative.svg",
      "Likely sanitized or ignored on GitHub",
      "Script execution in SVG is typically blocked in repository rendering for security reasons.",
      `
        <rect x="58" y="70" width="204" height="56" rx="16" fill="#1e293b" stroke="#ef4444" stroke-width="2" />
        <text x="72" y="96" fill="#fecaca" font-size="15" font-weight="700">Script should be blocked</text>
        <text x="72" y="116" fill="#cbd5e1" font-size="12">The circle below would move only if scripting were allowed.</text>
        <circle id="script-target" cx="86" cy="145" r="10" fill="#ef4444" />
        <!-- script elements are intentionally included as a negative test because GitHub should sanitize them. -->
        <script><![CDATA[
          const target = document.getElementById("script-target");
          if (target) {
            target.setAttribute("cx", "246");
          }
        ]]></script>
      `,
    ),
  ];
}

export const createEdgeCaseExamples = getEdgeCaseExamples;
