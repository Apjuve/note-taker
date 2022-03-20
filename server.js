const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFile, deleteNote} = require('./public/assets/helpers/util.js');
// const { readAndAppend, deleteNote } = require('./helpers/util.js');
// const api = require('./routes/index.js');
const database = './db/db.json';

const PORT = process.env.PORT || 3001;

const app = express();

// setting up the public folder as static
app.use(express.static('public'));

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
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
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

        // adds new note to the database in db.json
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

// delete function that will remove note from the left side
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    deleteNote(database, id);
    res.json({ id:id});
});

app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
