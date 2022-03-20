const { Console } = require('console');
const fs = require('fs');
const util = require('util');

// promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => 
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => 
err ? console.error(err) : Console.info (`\nData wriitten to ${destination}`)
);