const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const upload = multer();
const app = express();
const codes = require('./codes.js');

let privateKey = fs.readFileSync('private.key', 'utf-8');
let certificate = fs.readFileSync('server.cert', 'utf-8');
let credentials = {key: privateKey, cert: certificate};

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

let httpsServer = https.createServer(credentials, app);
httpsServer.listen(443);
