import type { Plugin } from "./types/plugin.js";
import { astroBuildDone } from "./hooks/index.js";

/**
 * Transpiles inline scripts using Babel.
 *
 * [Read more](https://www.npmjs.com/package/astro-babel-inline-scripts)
 * @param options Object with a configuration for Babel.
 * @param routeCallback Optional callback which gets called per a route. Return `false` to exclude a route from processing.
 */
export default ((options, routeCallback) => ({
  name: "babel-inline-scripts",
  hooks: { "astro:build:done": astroBuildDone(options, routeCallback) },
})) as Plugin;
