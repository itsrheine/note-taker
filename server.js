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

// Route GET to connect to HTML
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.get('/api/notes/:id', (req, res) => {
    const results = findById(req.params.id, notes);
    res.json(results);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Routes Post
app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    let newId = uniqid();
    let newNote = req.body;
    newNote.id = newId;
    
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;

        const db = JSON.parse(data);
        db.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(db), "utf8", err => {
            if (err) throw err;
            console.log("The data has been saved to the file!");
        });
    })
    res.redirect('/notes');
});

// Delete Notes
app.delete('/api/notes/:id', (req, res) => {
    notes.splice(req.params.id, 1);
    fs.writeFileSync(
        path.join(__dirname, '/db/db.json'),
        JSON.stringify( notes, null, 2)
    );
    return notes;
});

// terminal 
app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
});
