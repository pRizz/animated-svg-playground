import { categoryOrder } from "../constants.ts";
import type { ExampleDefinition } from "../types.ts";
import { getCssExamples } from "./css.ts";
import { getEdgeCaseExamples } from "./edgeCases.ts";
import { getSmilExamples } from "./smil.ts";
import { getStaticExamples } from "./static.ts";
import { getStrokeExamples } from "./stroke.ts";

/** Return all SVG examples in a stable category-first order. */
export function getExampleDefinitions(): ExampleDefinition[] {
  const categoryRank = new Map(categoryOrder.map((category, index) => [category, index]));
  const examples = [
    ...getStaticExamples(),
    ...getSmilExamples(),
    ...getStrokeExamples(),
    ...getCssExamples(),
    ...getEdgeCaseExamples(),
  ];

  return examples.sort((left, right) => {
    const leftRank = categoryRank.get(left.category) ?? Number.POSITIVE_INFINITY;
    const rightRank = categoryRank.get(right.category) ?? Number.POSITIVE_INFINITY;

    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }

    return left.filename.localeCompare(right.filename);
  });
}
