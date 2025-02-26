# JSON Comparison Tool

## Overview
This project is a JavaScript application designed to compare JSON files across multiple folders. It recursively scans directories, identifies JSON files with the same relative paths, and compares their content line by line. Differences between files are logged to the console.

### Key Features:
- **Recursive JSON File Search**: Scans nested directories to locate JSON files.
- **Line-by-Line Comparison**: Compares JSON files line by line for differences.
- **Cross-Folder Comparison**: Compares JSON files with the same relative paths across multiple folders.
- **Detailed Logging**: Logs differences and file paths for easy debugging.

---

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mohamedsaidibrahim/JSON-Comparison-Tool.git
   cd json-comparison-tool
   ```

2. **Install Dependencies**:
   No external dependencies are required.

3. **Set Up Folders**:
   - Update the `ancestorFolders` array in `index.js` with the paths to your folders.

---

## Usage

### Running the Project
1. Update the `ancestorFolders` array in `index.js`:
   ```javascript
   const ancestorFolders = [
     "C:\\path\\to\\folder1",
     "C:\\path\\to\\folder2",
   ];
   ```

2. Run the application:
   ```bash
   npm start
   ```

### Output
- The tool will log the following:
  - ❌ Differences found in: `[relative path]` (for files with differences).
  - ✅ Comparison completed (when the process finishes).

---

## Project Structure

```
json-comparison-tool/
├── src/
│   ├── findJsonFiles.js       # Recursively finds JSON files in a directory
│   ├── compareJsonFiles.js    # Compares two JSON files line by line
│   └── compareAncestorFolders.js # Main script to compare JSON files across folders
├── index.js                   # Entry point for the application
├── package.json               # Project dependencies and configuration
└── README.md                  # Project documentation
```

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

---

## License
This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for details.

---

## Support
For any questions or issues, please open an issue on the [GitHub repository](https://github.com/your-repo/json-comparison-tool).

---

##  GitHub Repository Topics
```
json-comparison-tool, json-file-comparison, javascript-application, nodejs-tool, file-comparison, json-processing, recursive-file-search, line-by-line-comparison, cross-folder-comparison, data-comparison, json-diff, file-diff, automation-tool, open-source-tool, javascript, nodejs, es6-modules, file-system-module, async-await, data-analysis, data-validation, developers, data-engineers, open-source-project
```

