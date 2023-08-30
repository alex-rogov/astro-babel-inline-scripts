import { scriptTagRegexp } from "../constants/index.js";

export default (htmlString: string) =>
  htmlString.replace(scriptTagRegexp, "$1");
