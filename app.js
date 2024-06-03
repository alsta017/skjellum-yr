const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');

const app = express();

let port = 80;

app.use('/src', express.static(path.join(__dirname + '/src')));

// ---

const yrApiUrl = (lat, lon) => `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/html/index.html'));
})