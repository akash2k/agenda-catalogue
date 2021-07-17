let mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    username: String,
    task: String,
    details: String
})

const Task = mongoose.model('tasklist', taskSchema);

module.exports = Task;