const fs = require('fs');
const util = require('util');

// promise version of fs.readFile
const readFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => 
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => 
err ? console.error(err) : console.info (`\nData wriitten to ${destination}`)
);

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err,data) => {
        if(err) {
            console.error(err);
        }else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};
// delete function that will remove note after creating it.
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

module.exports = { readFile, writeToFile, readAndAppend, deleteNote }