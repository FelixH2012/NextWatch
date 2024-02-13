const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT ||  3100;

// Enable CORS for all routes
app.use(cors());

// JSON-Datei, die die Filminformationen enthält
const filmFilePath = path.join(__dirname, 'movies.json');

// Middleware zum Parsen von JSON-Daten
app.use(express.json());

// Route zum Abrufen der Filmliste
app.get('/api/movies', (req, res) => {
    fs.readFile(filmFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Fehler beim Lesen der Filmdaten.');
        } else {
            res.send(JSON.parse(data));
        }
    });
});

// Starten des Servers
app.listen(port, () => {
    console.log(`Movie-System läuft auf Port ${port}`);
});
