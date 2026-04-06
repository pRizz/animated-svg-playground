import { rm } from "node:fs/promises";

import { generatedDirectory } from "./constants.ts";

async function main(): Promise<void> {
  await rm(generatedDirectory, { recursive: true, force: true });
  console.log(`Removed ${generatedDirectory}`);
}

await main();
