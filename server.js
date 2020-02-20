const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ------------------------------------------------------------------------
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  req.body.id = notes.length;
  const newNote = req.body;
  notes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, '/db/db.json'),
    JSON.stringify({notes}, null, 2)
  );
  res.json(newNote);
});

// HTML ROUTES ------------------------------------------------------------------------
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// ------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});