// Import Node.js modules
const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');

// Use express for app
const app = express();

// Set port
const port = 80;

// Use the static folder
app.use('/src', express.static(path.join(__dirname + '/src')));

// ---

// Yr api url
const yrApiUrl = (lat, lon) => `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

// Start the server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

// When you first go to the site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/html/index.html'));
})

// When you input something in the form in index.html
app.post('/geocode', (req, res) => {
    const { location } = req.body;
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                res.json({ lat, lon });
            } else {
                res.status(404).json({ error: 'Location not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});