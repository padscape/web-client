const express = require('express');
const router = express.Router();
const sql = require('./connection.js');

let con = sql.con;

router.get('/:id', (req, res) => {
    con.query(`SELECT * FROM code_ids WHERE CodeId=${req.params.id}`, (err, result, fields) => {
        if (err) throw err;
        res.writeHead((result == "") ? 404 : 200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify((result == "") ? {'Error': 'Not Found'} : result));
    });
});

router.get('/', (req, res) => {
    con.query("SELECT * FROM code_ids", (err, result, fields) => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify(result));
    });
});

router.post('/', (req, res) => {
    if (!req.body.Code || !req.body.Creator) {
        res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify({'Error': 'Bad Request'}));
    } else {
        con.query("SELECT COUNT(CodeId) FROM code_ids", (err, result, fields) => {
            if (err) throw err;
            let id = JSON.parse(JSON.stringify(result))[0]['COUNT(CodeId)'] + 1;
            
            con.query(`INSERT INTO code_ids VALUES (${id}, "${req.body.Code}", "${req.body.Creator}")`, (err_, result_, fields_) => {
                if (err_) throw err_;
                res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.end(JSON.stringify({'Success': 'Request Executed'}));
            });
        });
    }
});

router.put('/:id', (req, res) => {
    if (!req.body.Code || !req.body.Creator) {
        res.writeHead(400, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify({'Error': 'Bad Request'}));
    } else {
        con.query(`SELECT COUNT(CodeId) FROM code_ids WHERE CodeId=${req.params.id}`, (err, result, fields) => {
            if (err) throw err;
            if (JSON.parse(JSON.stringify(result))[0]['COUNT(CodeId)'] === 0) {
                res.writeHead(404, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.end(JSON.stringify({'Error': 'Not Found'}));
                return;
            }

            con.query(`UPDATE code_ids SET Code="${req.body.Code}", Creator="${req.body.Creator}" WHERE CodeId=${req.params.id}`, (err_, result_, fields_) => {
                if (err_) throw err_;
                res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.end(JSON.stringify({'Success': 'Request Executed'}));
            });
        });
    }
});

router.delete('/:id', (req, res) => {
    con.query(`SELECT COUNT(CodeId) FROM code_ids WHERE CodeId=${req.params.id}`, (err, result, fields) => {
        if (err) throw err;
        if (JSON.parse(JSON.stringify(result))[0]['COUNT(CodeId)'] === 0) {
            res.writeHead(404, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({'Error': 'Not Found'}));
            return;
        }

        con.query(`DELETE FROM code_ids WHERE CodeId=${req.params.id}`, (err_, result_, fields_) => {
            if (err_) throw err_;
            res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({'Success': 'Request Executed'}));
        });
    });
});

module.exports = router;
