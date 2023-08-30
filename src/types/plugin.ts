import type { TransformOptions } from "@babel/core";
import { AstroIntegration } from "astro";

type RouteCallbackReturn = Boolean;

type RouteCallback = (route: string) => RouteCallbackReturn;

type Plugin = (
  options?: TransformOptions,
  routeCallback?: RouteCallback
) => AstroIntegration;

export type { RouteCallbackReturn, RouteCallback, Plugin };
