import type { AstroIntegration } from "astro";
import type { Plugin } from "./plugin.js";

type HookAstroBuildDoneProps = (
  options: Parameters<Plugin>["0"],
  routeCallback: Parameters<Plugin>["1"]
) => AstroIntegration["hooks"]["astro:build:done"];

export type { HookAstroBuildDoneProps };
