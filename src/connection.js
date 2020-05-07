const mongoose = require('mongoose');
const config = require('./config.json');
const Schema = mongoose.Schema;

mongoose.connect(config.connection, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

let codeSchema = new Schema({
    "Code": String,
    "Creator": String,
    "Libraries": String
});
        
let userSchema = new Schema({
    "Username": String,
    "Password": String
});

exports.codeSchema = mongoose.model('Code', codeSchema);
exports.userSchema = mongoose.model('User', userSchema);
