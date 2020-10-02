const router = require('express').Router();
const { Notes } = require('../../lib/Notes.js');

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = getData(req.query, results);
    }
    res.json(results);
});

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = Notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validate)
})