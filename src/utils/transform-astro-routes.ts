import type { RouteData } from "astro";

export default (routes: Array<RouteData>): Array<Array<string>> =>
  routes
    .map(({ route, distURL }) => [route, distURL?.href])
    .filter(([_, url]) => Boolean(url)) as Array<Array<string>>;
