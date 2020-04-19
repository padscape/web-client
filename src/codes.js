const express = require('express');
const router = express.Router();
const mongo = require('./connection.js');

router.get('/:id', (req, res) => {
    mongo.findById(req.params.id, (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({'Error': 'Bad Request'}));
        }

        res.writeHead((result === null) ? 404 : 200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify((result === null) ? {'Error': 'Not Found'} : result));
    });
});

router.get('/', (req, res) => {
    mongo.find({}, (err, result) => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify(result));
    });
});

router.post('/', (req, res) => {
    if (!req.body.Code || !req.body.Creator || typeof req.body.Code !== "string" || typeof req.body.Creator !== "string") {
        res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify({'Error': 'Bad Request'}));
    } else {
        let db = new mongo();
        db.Code = req.body.Code;
        db.Creator = req.body.Creator;
        db.Libraries = req.body.Libraries;

        db.save((err, entry) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({'id': entry.id}));
        });
    }
});

router.put('/:id', (req, res) => {
    if (!req.body.Code || !req.body.Creator || typeof req.body.Code !== "string" || typeof req.body.Creator !== "string") {
        res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify({'Error': 'Bad Request'}));
    } else {
        mongo.findById(req.params.id, (err, result) => {
            if (err) {
                res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.end(JSON.stringify({'Error': 'Bad Request'}));
            }

            if (result === null) {
                res.writeHead(404, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.end(JSON.stringify({'Error': 'Not Found'}));
            } else {
                result.Code = req.body.Code;
                result.Creator = req.body.Creator;
                result.Libraries = req.body.Libraries;

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
    mongo.findById(req.params.id, (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({'Error': 'Bad Request'}));
        }

        if (result === null) {
            res.writeHead(404, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({'Error': 'Not Found'}));
        } else {
            mongo.deleteMany({_id: req.params.id}, (err, entry) => {
                if (err) throw err;
                res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.end(JSON.stringify({'id': entry.id}));
            });
        }
    });
});

module.exports = router;
