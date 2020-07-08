const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const https = require('https');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const upload = multer();
const app = express();
const codes = require('./codes.js');
const users = require('./users.js');

app.get('/', (req, res) => {
    res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    res.end(JSON.stringify({'Error': 'Bad Request'}));
});

app.get('/favicon.ico', (req, res) => res.status(204));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname, {dotfiles: 'allow'}));
app.use(bodyParser.json());
app.use(upload.array());
app.use(cors());
app.use('/code', codes);
app.use('/user', users);

app.use((err, req, res, next) => {
    console.log(err);
});

app.listen(80);
