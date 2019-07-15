const mongoose = require('mongoose');
const express = require('express');

const port = 8080;
let app = express();

mongoose.connect('mongodb://localhost:8081/padscape', {useNewUrlParser: true});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database (MongoDB) connection error: '));
app.listen(port, () => console.log(`App opened on 'http://localhost:${port}/'`));
