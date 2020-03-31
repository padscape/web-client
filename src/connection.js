const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SECRET",
    database: "padscape"
});

exports.con = con;
