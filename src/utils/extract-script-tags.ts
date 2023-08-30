import { scriptTagRegexp } from "../constants/index.js";

export default (content: string) => content.match(scriptTagRegexp);
