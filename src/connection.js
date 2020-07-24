const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose.connect(process.env.ATLAS_PASS, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

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
