import plugins from "deco-sites/std/plugins/mod.ts";
import partytownPlugin from "partytown/mod.ts";

import manifest from "./manifest.gen.ts";
import tailwind from "./tailwind.config.ts";

import { defineConfig } from "$fresh/server.ts";
export default defineConfig({
  build: { target: ["chrome99", "firefox99", "safari11"] },
  plugins: [
    ...plugins(
      {
        manifest,
        // deno-lint-ignore no-explicit-any
        tailwind: tailwind as any,
      },
    ),
    partytownPlugin(),
  ],
});
