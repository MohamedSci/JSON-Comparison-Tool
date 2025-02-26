import { promises as fs } from "fs";
import { join } from "path";

// Recursively find JSON files in a directory
export async function findJsonFiles(dir) {
  let jsonFiles = [];
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = join(dir, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        jsonFiles = jsonFiles.concat(await findJsonFiles(filePath));
      } else if (file.endsWith(".json")) {
        jsonFiles.push(filePath);
      }
    }
  } catch (err) {
    console.error(`❌ Error reading directory: ${dir} - ${err.message}`);
  }
  return jsonFiles;
}