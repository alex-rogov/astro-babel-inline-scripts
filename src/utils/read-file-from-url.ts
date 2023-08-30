import { readFileSync } from "fs";
import { fileURLToPath } from "url";

export default (fileURL: string) => {
  const HTMLPath = fileURLToPath(fileURL);
  const byteContent = readFileSync(HTMLPath);
  const fileContent = String(byteContent);
  return fileContent;
};
