const express = require('express');
const notes = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

// Heroku
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// html static route
app.use(express.static('public'));


function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(notes => notes.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(notes => notes.text === query.text);
    }
    return filteredResults;
}

function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
}

function findIndexById(id, notes) {
    for (let i = 0; i < notes.length; i++) {
        if (id === notes[i].id) {
            return i;
        }
    }
}

function createNewNotes(body, notesArray) {
    const notes = body;
    notesArray.push(notes);
    
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return notes;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return false;
}

// Routes GET
app.get('/api/notes', (req, res) => {
    let results = notes; 
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// Routes Post
app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = uniqid();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is missing a title and contents.');
    } else {
        const note = createNewNotes(req.body, notes);
        res.json(note);
    }
});

// to delete notes
app.delete('/api/notes/:id', (req, res) => {
    const deleteNoteId = req.params.id;
    const result = findIndexById(id, notes);

    notes.splice(index, 1);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return notes;
})

// Route GET to connect to HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// terminal 
app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
});
