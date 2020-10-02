const express = require('express');
const app = express();
const { notes } = require('./data/notes');


app.get('/api/notes', (req, res) => {
    res.send('Hello!');
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});
