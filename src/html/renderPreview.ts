import { categoryMap, categoryOrder, repositoryTitle } from "../constants.ts";
import type { GeneratedExampleMetadata } from "../types.ts";
import { escapeXml, groupByKey } from "../svg/helpers.ts";

/** Render a local HTML preview page for the generated SVG gallery. */
export function renderPreviewHtml(examples: GeneratedExampleMetadata[]): string {
  const groupedExamples = groupByKey(examples, (example) => example.category);
  const sections = categoryOrder
    .map((categoryId) => {
      const category = categoryMap[categoryId];
      const categoryExamples = groupedExamples.get(categoryId);

      if (!categoryExamples?.length) {
        return "";
      }

      const cards = categoryExamples
        .map((example) => {
          return `
            <article class="card">
              <img src="./svg/${escapeXml(example.filename)}" alt="${escapeXml(example.title)}" loading="lazy" />
              <div class="card-body">
                <h3>${escapeXml(example.title)}</h3>
                <p>${escapeXml(example.description)}</p>
                <ul>
                  <li><strong>Expectation:</strong> ${escapeXml(example.expectation)}</li>
                  <li><strong>Notes:</strong> ${escapeXml(example.compatibilityNotes)}</li>
                  <li><strong>Path:</strong> <code>${escapeXml(example.path)}</code></li>
                </ul>
              </div>
            </article>
          `;
        })
        .join("\n");

      return `
        <section>
          <h2>${escapeXml(category.title)}</h2>
          <p class="category-description">${escapeXml(category.description)}</p>
          <div class="card-grid">
            ${cards}
          </div>
        </section>
      `;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeXml(repositoryTitle)} Preview</title>
    <style>
      :root {
        color-scheme: dark;
        font-family: Inter, system-ui, sans-serif;
        background: #020617;
        color: #e2e8f0;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 32px;
        background: linear-gradient(180deg, #020617 0%, #0f172a 100%);
      }

      main {
        max-width: 1200px;
        margin: 0 auto;
      }

      h1 {
        margin-top: 0;
        font-size: 2.2rem;
      }

      p {
        color: #cbd5e1;
      }

      section + section {
        margin-top: 40px;
      }

      .category-description {
        margin-top: -8px;
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 20px;
      }

      .card {
        border: 1px solid #1e293b;
        border-radius: 20px;
        overflow: hidden;
        background: rgba(15, 23, 42, 0.92);
        box-shadow: 0 24px 48px rgba(2, 6, 23, 0.3);
      }

      .card img {
        display: block;
        width: 100%;
        border-bottom: 1px solid #1e293b;
        background: #020617;
      }

      .card-body {
        padding: 18px;
      }

      .card-body h3 {
        margin: 0 0 8px;
      }

      .card-body ul {
        padding-left: 20px;
        color: #cbd5e1;
      }

      code {
        background: rgba(15, 23, 42, 0.75);
        border: 1px solid #334155;
        border-radius: 6px;
        padding: 2px 6px;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeXml(repositoryTitle)}</h1>
      <p>
        This local preview mirrors the generated README gallery while making it easier to inspect every SVG
        side-by-side in a normal browser.
      </p>
      ${sections}
    </main>
  </body>
</html>
`;
}
