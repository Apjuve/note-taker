const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const { readAndAppend } = require('./helpers/util.js');
const api = require('./routes/index.js');
const database = './db/db.json';

const PORT = process.env.PORT || 3001;

const app = express();

// setting up the public folder as static
app.use(express.static({public}));

// middleware for parsing JSON and urlencoded data.
app.use(express.json());
app.use(express.urlencoded({extended : true}));


// get route for the homepage 
app.get ('/', (req, res) => {
    res.sendFile(path.join(_dirname, '/public/index.html'))
});
// get routes for the notes page
app.get ('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    readFile('/db/db.json').then((data) => res.json(JSON.parse(data)))
});


// POST   route for submitting a new note
app.post ('/api/notes', (req, res) => {
    console.log(req.body);
    // Destructuring assigment for the items in req.body
    const { title, text } = req.body;
    // if all required properties are present
    if (req.body) {
        // Variable for the object we wil saved
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
       
        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);
    }else {
        res.json('error creating note')
    }
});
