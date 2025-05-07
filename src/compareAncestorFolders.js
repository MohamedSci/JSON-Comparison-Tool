import { promises as fs } from "fs";
import { relative } from "path";
import { findJsonFiles } from "./findJsonFiles.js";
import { compareJsonFiles } from "./compareJsonFiles.js";

// Compare JSON files across ancestor folders
export async function compareAncestorFolders(ancestorFolders) {
  try {
    // Get JSON files from each ancestor folder
    const jsonFilesByFolder = await Promise.all(
      ancestorFolders.map(async (folder) => {
        const jsonFiles = await findJsonFiles(folder);
        return { folder, jsonFiles };
      })
    );

    // Create a map of relative paths to JSON files
    const fileMap = new Map();
    for (const { folder, jsonFiles } of jsonFilesByFolder) {
      for (const filePath of jsonFiles) {
        const relativePath = relative(folder, filePath);
        if (!fileMap.has(relativePath)) {
          fileMap.set(relativePath, []);
        }
        fileMap.get(relativePath).push(filePath);
      }
    }

    // Compare JSON files with the same relative path
    for (const [relativePath, filePaths] of fileMap) {
      if (filePaths.length < 2) continue; // Skip if there's only one file

      // Read and compare the content of the files
      const fileContents = await Promise.all(
        filePaths.map(async (filePath) => {
          return await fs.readFile(filePath, "utf-8");
        })
      );

      // Compare the first file with the rest
      const referenceContent = fileContents[0];
      for (let i = 1; i < fileContents.length; i++) {
        const differences = compareJsonFiles(referenceContent, fileContents[i]);
        if (differences.length > 0) {
          console.log(`❌ Differences found in: ${relativePath}`);
          console.log(`Comparing:\n- ${filePaths[0]}\n- ${filePaths[i]}`);
          differences.forEach((diff) => console.log(diff));
          console.log("-----------------------------");
        } else{
          console.log("------ No Diffffffffffffffffff -----------------------");

        }
      }
    }

    console.log("✅ Comparison completed.");
  } catch (err) {
    console.error(`❌ Error during comparison: ${err.message}`);
  }
}