const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const upload = multer();
const app = express();
const codes = require('./codes.js');

app.get('/', (req, res) => {
    res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
	res.end(JSON.stringify({'Error': 'Bad Request'}));
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(upload.array());
app.use(cors());
app.use('/code', codes);

app.listen(8080);
