import type { HookAstroBuildDoneProps } from "../types/astro-build-done.js";
import {
  extractScriptTags,
  readFileFromUrl,
  transformAstroRoutes,
  stripScriptTags,
  transpileScriptBody,
  injectTranspiledScripts,
  writeFileToUrl,
} from "../utils/index.js";

const hook: HookAstroBuildDoneProps =
  (options, routeCallback) =>
  ({ routes }) => {
    const HTMLURLs = transformAstroRoutes(routes);
    HTMLURLs.forEach(([route, HTMLURL]) => {
      const transformOptions = options;
      const shouldProcessRoute = routeCallback?.(route);
      if (!shouldProcessRoute) {
        return;
      }

      const fileContent = readFileFromUrl(HTMLURL);
      const scriptsBodies: Array<string> = [];
      const transpiledScriptsBodies: Array<string> = [];

      let modifiedFileContent = fileContent;
      const scripts = extractScriptTags(fileContent);
      if (!scripts) {
        return;
      }

      scripts.forEach((script) => {
        const scriptBody = stripScriptTags(script);

        const transpiledScript = transpileScriptBody(
          scriptBody,
          transformOptions
        );
        if (!transpiledScript) {
          return;
        }

        scriptsBodies.push(scriptBody);
        transpiledScriptsBodies.push(transpiledScript);
      });

      modifiedFileContent = injectTranspiledScripts(
        fileContent,
        scriptsBodies,
        transpiledScriptsBodies
      );

      writeFileToUrl(modifiedFileContent, HTMLURL);
    });
  };

export default hook;
