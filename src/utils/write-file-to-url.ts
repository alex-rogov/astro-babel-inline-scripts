import { writeFileSync } from "fs";
import { fileURLToPath } from "url";

export default (fileContent: string, fileURL: string) => {
  const HTMLPath = fileURLToPath(fileURL);
  const byteContent = Buffer.from(fileContent);
  writeFileSync(HTMLPath, byteContent);
};
