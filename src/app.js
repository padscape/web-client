const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const https = require('https');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const upload = multer();
const app = express();
const config = require('./config.json');
const codes = require('./codes.js');
const users = require('./users.js');

app.get('/', (req, res) => {
    res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    res.end(JSON.stringify({'Error': 'Bad Request'}));
});

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

if (config.https) {
    let credentials = {key: fs.readFileSync(config.privateKey, 'utf-8'), cert: fs.readFileSync(config.certificate, 'utf-8')};
    let httpsServer = https.createServer(credentials, app);
    httpsServer.listen(443);

    http.createServer((req, res) => {
        res.writeHead(301, {'Location': `https://${req.headers.host}${req.url}`});
        res.end();
    }).listen(80);
} else {
    console.log('no https');
    app.listen(80);
}
