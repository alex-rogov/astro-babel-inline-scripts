import type { AstroIntegration } from "astro";
import { readFileSync, writeFileSync } from "fs";
import babel, { type TransformOptions } from "@babel/core";
import { fileURLToPath } from "node:url";

export default (options: TransformOptions = {}): AstroIntegration => {
  return {
    name: "babel-inline-scripts",
    hooks: {
      "astro:build:done": ({ routes }) => {
        const scriptTagRegex = /<script.*?>([\s\S]*?)<\/script>/gim;

        const stripScriptTags = (htmlString: string) =>
          htmlString.replace(scriptTagRegex, "$1");

        const HTMLURLs = routes
          .map(({ distURL }) => distURL?.href)
          .filter(Boolean) as Array<string>;

        HTMLURLs.forEach((HTMLURL) => {
          const HTMLPath = fileURLToPath(HTMLURL);

          const byteContent = readFileSync(HTMLPath);
          const stringContent = String(byteContent);

          const scriptBodies: Array<string> = [];
          const transpiledScriptBodies: Array<string> = [];
          let replacedStringContent = stringContent;

          replacedStringContent.match(scriptTagRegex)?.forEach((script) => {
            const scriptBody = stripScriptTags(script);
            scriptBodies.push(scriptBody);

            const transpiledResult = babel.transform(scriptBody, options);
            const transpiledScript = transpiledResult?.code;

            if (transpiledScript) {
              transpiledScriptBodies.push(transpiledScript);
            }
          });

          transpiledScriptBodies.forEach((transpiledScriptBody, index) => {
            replacedStringContent = replacedStringContent.replace(
              scriptBodies[index],
              transpiledScriptBody
            );
          });

          const replacedByteContent = Buffer.from(replacedStringContent);

          writeFileSync(HTMLPath, replacedByteContent);
        });
      },
    },
  };
};
