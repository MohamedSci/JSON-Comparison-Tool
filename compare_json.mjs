// const fs = require('fs').promises;
import { readFile } from 'fs/promises';


async function compareJsonFiles(filePath1, filePath2) {
    try {
        // const file1Content = await fs.readFile(filePath1, 'utf8');
        // const file2Content = await fs.readFile(filePath2, 'utf8');
        const file1Content = await readFile(filePath1, 'utf8');
        const file2Content = await readFile(filePath2, 'utf8');
        const data1 = JSON.parse(file1Content);
        const data2 = JSON.parse(file2Content);

        function sortObject(obj) {
            if (typeof obj !== 'object' || obj === null) {
                return obj;
            }

            if (Array.isArray(obj)) {
                return obj.map(sortObject);
            }

            const sortedKeys = Object.keys(obj).sort();
            const sortedObj = {};
            for (const key of sortedKeys) {
                sortedObj[key] = sortObject(obj[key]);
            }
            return sortedObj;
        }

        const sortedData1 = sortObject(data1);
        const sortedData2 = sortObject(data2);

        const stringifiedData1 = JSON.stringify(sortedData1);
        const stringifiedData2 = JSON.stringify(sortedData2);

        if (stringifiedData1 === stringifiedData2) {
            console.log(`The files '${filePath1}' and '${filePath2}' contain the same set of key-value pairs.`);
            return true;
        } else {
            console.log(`The files '${filePath1}' and '${filePath2}' do NOT contain the same set of key-value pairs.`);
            findDifferentPairs(data1, data2, filePath1, filePath2);
            return false;
        }

    } catch (error) {
        console.error('Error reading or parsing files:', error.message);
        return false;
    }
}

function findDifferentPairs(obj1, obj2, filePath1, filePath2, path = '') {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    const allKeys = [...new Set([...keys1, ...keys2])];

    for (const key of allKeys) {
        const value1 = obj1[key];
        const value2 = obj2[key];
        const currentPath = path ? `${path}.${key}` : key;

        if (!(key in obj1)) {
            console.log(`${filePath1} is missing pair: { ${currentPath}: ${JSON.stringify(value2)} }`);
        } else if (!(key in obj2)) {
            console.log(`${filePath2} is missing pair: { ${currentPath}: ${JSON.stringify(value1)} }`);
        } else if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null) {
            findDifferentPairs(value1, value2, filePath1, filePath2, currentPath);
        } else if (value1 !== value2) {
            console.log(`Different pair found at ${currentPath}:`);
            console.log(`  ${filePath1}: { ${currentPath}: ${JSON.stringify(value1)} }`);
            console.log(`  ${filePath2}: { ${currentPath}: ${JSON.stringify(value2)} }`);
        }
    }
}

// Example usage:
const file1 = 'compare\\nnnn\\Nada\\Sales\\en.json';
const file2 = 'compare\\ooo\\Origin\\Sales\\en.json';

compareJsonFiles(file1, file2);