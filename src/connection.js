const mongoose = require('mongoose');
const config = require('./config.json');

mongoose.connect(config.connection, {useNewUrlParser: true, useUnifiedTopology: true});

let codeSchema = {
    "Code": String,
    "Creator": String,
    "Libraries": String
};

module.exports = mongoose.model('', codeSchema);
