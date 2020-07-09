const express = require('express');
const router = express.Router();
const mongo = require('./connection.js');

router.get('/:id', (req, res) => {
    mongo.userSchema.findById(req.params.id, '-Password', (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({'Error': 'Bad Request'}));
        }

        res.writeHead((result === null) ? 404 : 200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify((result === null) ? {'Error': 'Not Found'} : result));
    });
});

router.get('/', (req, res) => {
    mongo.userSchema.find({}, '-Password', (err, result) => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify(result));
    });
});

router.post('/', (req, res) => {
    if (!req.body.Username || !req.body.Password || typeof req.body.Username !== "string" || typeof req.body.Password !== "string") {
        res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify({'Error': 'Bad Request'}));
    } else {
        let db = new mongo.userSchema();
        db.Username = req.body.Username;
        db.Password = req.body.Password;

        db.save((err, entry) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({'id': entry.id}));
        });
    }
});

router.post('/login', (req, res) => {
    if (!req.body.Username || typeof req.body.Username !== "string") {
        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify({'Error': 'Bad Request', 'Details': 'Username is required.'}));
    } else if (!req.body.Password || typeof req.body.Password !== "string") {
        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify({'Error': 'Bad Request', 'Details': 'Password is required.'}));
    } else {
        let auth = false;
    
        mongo.userSchema.findOne({Username: req.body.Username}, (err, user) => {
            if (err) throw err;

            if (user === null) {
                res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.end(JSON.stringify({'page': ''}));
                return;
            }

            if (req.body.Password === user.Password) {
                req.session.loggedin = true;
                req.session.username = req.body.Username;
                auth = true;
            }

            res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({'page': (auth) ? 'valid' : 'invalid'}));
        });
    }
});

router.put('/:id', (req, res) => {
    if (!req.body.Username || !req.body.Password || typeof req.body.Username !== "string" || typeof req.body.Password !== "string") {
        res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify({'Error': 'Bad Request'}));
    } else {
        mongo.userSchema.findById(req.params.id, (err, result) => {
            if (err) {
                res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.end(JSON.stringify({'Error': 'Bad Request'}));
            }

            if (result === null) {
                res.writeHead(404, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.end(JSON.stringify({'Error': 'Not Found'}));
            } else {
                result.Username = req.body.Username;
                result.Password = req.body.Password;

                result.save((err, entry) => {
                    if (err) throw err;
                    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                    res.end(JSON.stringify({'id': entry.id}));
                });
            }
        });
    }
});

router.delete('/:id', (req, res) => {
    mongo.userSchema.findById(req.params.id, (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({'Error': 'Bad Request'}));
        }

        if (result === null) {
            res.writeHead(404, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({'Error': 'Not Found'}));
        } else {
            mongo.userSchema.deleteMany({_id: req.params.id}, (err, entry) => {
                if (err) throw err;
                res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.end(JSON.stringify({'id': entry.id}));
            });
        }
    });
});

module.exports = router;
