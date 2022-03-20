const fs = require('fs');
const util = require('util');

// promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => 
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => 
err ? console.error(err) : Console.info (`\nData wriitten to ${destination}`)
);

const readAndAppend = (content, file) => {
    fs.readFromFile(file, 'utf8', (err,data) => {
        if(err) {
            console.error(err);
        }else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

const deleteNote = (file, passedId) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        }else {
            const doneNotes = JSON.parse(data);
            let newNotes = doneNotes.filter(({ id }) => id !== passedId);
            fs.writeFile(file, JSON.stringify(newNotes), (err) => {
                if(err) {
                    console.error(err);
                }else {
                    console.log('Note deleted');
                }
            })
        }
    })
}

module.exports = { readFromFile, writeToFile, readAndAppend, deleteNote }