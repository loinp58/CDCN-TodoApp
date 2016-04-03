var express = require('express');
var router = express.Router();

Todo = require('../models/Todo');

router.get('/', function(req, res, next) {
	Todo.find({ completed: false }, function(err, todos){
        if(err) res.render('error', { error: 'Could not fetch items from database'});
        // console.log(todos);
        res.render('todos', { todos: todos });
    });
});

router.get('/completed', function(req, res, next) {
	Todo.find({ completed: true }, function(err, compTodos){
        if(err) res.render('error', { error: 'Could not fetch items from database'});
        // console.log(todos);
        res.render('completedTodos', { compTodos: compTodos });
    });
});

router.get('/:id', function(req, res, next) {
	Todo.find({ _id: req.params.id }, function(err, todo){
        res.render('todo', { todo: todo[0] })
    });
});

router.post('/create', function(req, res, next) {
	var todoContent = req.body.content;
    // create todo
    Todo.create({ content: todoContent }, function(err, todo){
        if(err) res.render('error', { error: 'Error creating your todo'})
        // reseload collection
        todo.start = new Date();
        todo.save();
        res.redirect('/todos');
    });
})

router.post('/destroy/:id', function(req, res, next) {
	var id = req.params.id;

    Todo.findByIdAndRemove(id, function(err, todo){
        if(err) res.render('error', { error: 'Error deleting todo'});
        if (todo.completed == false) res.redirect('/todos');
        else res.redirect('/todos/completed');
    });
});

router.post('/edit/:id', function(req, res, next) {
	Todo.findOneAndUpdate({ _id: req.params.id }, {content: req.body.content}, function(err, todo){
        res.redirect('/todos');
    });
});

router.post('/mark/:id', function(req, res, next) {
	var id = req.params.id;

    Todo.findById(id, function(err, todo) {
        if(err) res.render('error', { error: 'Error mark completed todo'});
        todo.completed = true;
        todo.finish = new Date();
        todo.save();
        res.redirect('/todos');
    })
});

module.exports = router;