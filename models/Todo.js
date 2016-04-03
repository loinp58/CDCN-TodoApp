var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// todo model
var todoSchema = new Schema({
    content: String,
    completed: { type: Boolean, default: false },
    start: Date,
    finish: Date,
    created_at: Date,
    updated_at: Date
});

var Todo = module.exports = mongoose.model('Todo', todoSchema);