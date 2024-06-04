// server.js
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/src', express.static(path.join(__dirname + '/src')));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/src/html/index.html');
})

app.get("/weather", function (req, res) {
    res.sendFile(__dirname + '/src/html/weather.html');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});