const fs = require("fs");

const writeJson = (filePath, obj) => {
  fs.writeFileSync(filePath, JSON.stringify(obj));
};

const readJson = (filePath) => {
  console.log(`Attempting to read file from: ${filePath}`);
  
  try {
    const content = fs.readFileSync(filePath);
    console.log(`Successfully read file content from: ${filePath}`);
    const jsonData = JSON.parse(content.toString());
    console.log(`Successfully parsed JSON data from: ${filePath}`);
    return jsonData;
  } catch (error) {
    console.error(`Error reading or parsing JSON from ${filePath}:`, error);
    throw error;
  }
};

module.exports = {
  writeJson,
  readJson,
};
