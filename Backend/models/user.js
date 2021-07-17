let mongoose = require('mongoose');

let schema = new mongoose.Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('user', schema);