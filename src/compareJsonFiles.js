// Compare two JSON files line by line
export function compareJsonFiles(content1, content2) {
    const lines1 = content1.split("\n");
    const lines2 = content2.split("\n");
  
    const differences = [];
    const maxLength = Math.max(lines1.length, lines2.length);
  
    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i] || "";
      const line2 = lines2[i] || "";
  
      if (line1.trim() !== line2.trim()) {
        differences.push(`Line ${i + 1}:\nFolder1: ${line1}\nFolder2: ${line2}`);
      }
    }
  
    return differences;
  }