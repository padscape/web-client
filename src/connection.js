const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "k@roto",
    database: "padscape"
});

exports.con = con;
