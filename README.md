# Astro Babel Inline Scripts <img width="28" height="28" src="https://github.com/alex-rogov/astro-babel-inline-scripts/assets/45819885/20954488-2a02-4a91-827f-78bf5a3ca7df"></img><img width="32" height="32" src="https://github.com/alex-rogov/astro-babel-inline-scripts/assets/45819885/f09fb4ed-a236-4459-a662-96245bee44c0"></img>

Astro plugin to transpile inline scripts using Babel

> **Note**
>
> - `AstroBabelInlineScripts` will only transpile inline scripts in HTML files generated in a build directory
>
> - Use `AstroBabelInlineScripts` last in your integration list.

## Installation

### Install dependencies manually

First, install the `AstroBabelInlineScripts` plugin like so:

```
npm install -D astro-babel-inline-scripts
```

Then, apply this integration to your `astro.config.*` file using the
`integrations` property:

**`astro.config.ts`**

```ts
import babelInlineScripts from "astro-babel-inline-scripts";

export default { integrations: [babelInlineScripts()] };
```

## Getting started

The plugin will now automatically transpile all inline scripts found in HTML files under the Astro `outDir` folder.

#### You can provide a custom set of settings for Babel.

**`astro.config.ts`**

```ts
import babelInlineScripts from "astro-babel-inline-scripts";

export default {
  integrations: [
    babelInlineScripts({
      presets: [
        "minify",
        [
          "@babel/env",
          {
            targets: {
              browsers: ["> .5% or last 2 versions"],
            },
          },
        ],
      ],
    }),
  ],
};
```

#### You can disable processing per a route.

> Callback takes a route name as a parameter. Route names come from `src/pages` folder.
>
> E.g. `src/pages/contact-us/index.astro` turns to `/contact-us` route
>
> and `src/pages/contact-us/form.astro` turns to `/contact-us/form` route

**`astro.config.ts`**

```ts
import babelInlineScripts from "astro-babel-inline-scripts";

export default {
  integrations: [
    babelInlineScripts(
      {
        presets: [
          [
            "@babel/env",
            {
              targets: {
                browsers: ["> .5% or last 2 versions"],
              },
            },
          ],
        ],
      },
      (route) => {
        // Disable processing for index page.
        if (route === "/") {
          return false;
        }

        return true;
      }
    ),
  ],
};
```

[Babel]: https://babeljs.io/docs/usage

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this integration.
