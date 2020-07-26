const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const upload = multer();
const app = express();
const codes = require('./codes.js');
const users = require('./users.js');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.get('/', (req, res) => {
    if (req.session.pendingActivation) {
        res.sendFile(path.join(__dirname + '/website/activate.html'));
        return;
    } else {
        req.session.pendingActivation = false;
    }
    
    if (req.session.loggedin) {
        res.send(`Welcome back, ${req.session.username}!`);
        res.end();
        return;
    }
    
    req.session.loggedin = false;
    req.session.username = '';
    res.sendFile(path.join(__dirname + '/website/home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/website/login.html'));
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname, {dotfiles: 'allow'}));
app.use(bodyParser.json());
app.use(upload.array());
app.use(cors());
app.use('/code', codes);
app.use('/user', users);

app.listen(process.env.PORT || 3000);
