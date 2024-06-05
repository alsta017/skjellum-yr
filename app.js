// server.js
const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/src', express.static(path.join(__dirname + '/src')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'IMKuben1337!',
    database: 'database_eksamen'
});

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/src/html/index.html');
})

app.get("/weather", function (req, res) {
    res.sendFile(__dirname + '/src/html/weather.html');
})

app.get("/tutorial", function (req, res) {
    res.sendFile(__dirname + '/src/html/tutorial.html');
})

app.get("/login", function (req, res) {
    res.sendFile(__dirname + '/src/html/login.html');
})

app.get("/loginauth", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    connection.query("SELECT * FROM bruker WHERE brukernavn = ? AND passord = ?"), [username, password], function (err, result) {
        if (result.length > 0) {
            req.session.loggedin = true;
        }
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});