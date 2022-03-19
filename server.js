const express = require('express');
const res = require('express/lib/response');
const { readFile, read } = require('fs');
const path = require('path');
const api = require('./routes/index.js');
const database = './db/db.json';

const PORT = process.env.PORT || 3001;

const app = express();



app.use(express.json());

// setting up the public folder as static
app.use(express.static({extended: true}));

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
