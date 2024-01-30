/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="deno.ns" />
/// <reference lib="esnext" />

import plugins from "deco-sites/std/plugins/mod.ts";
import partytownPlugin from "partytown/mod.ts";

import decoManifest from "./manifest.gen.ts";
import tailwind from "./tailwind.config.ts";

import { defineConfig } from "$fresh/server.ts";
export default defineConfig({
  plugins: [
    ...plugins(
      {
        manifest: decoManifest,
        // deno-lint-ignore no-explicit-any
        tailwind: tailwind as any,
      },
    ),
    partytownPlugin(),
  ],
});
