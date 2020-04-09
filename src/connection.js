const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:SECRET@padscape-gp2qw.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

let codeSchema = {
    "Code": String,
    "Creator": String
};

module.exports = mongoose.model('', codeSchema);
