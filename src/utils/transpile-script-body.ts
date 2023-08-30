import { transform, type TransformOptions } from "@babel/core";

export default (body: string, transformOptions?: TransformOptions) => {
  const transpiledResult = transform(body, transformOptions);
  return transpiledResult?.code;
};
