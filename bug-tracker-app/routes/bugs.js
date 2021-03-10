var createError = require('http-errors');
var express = require('express');
var router = express.Router();

var bugs = [
    {id : 1, name : 'Server communication failure', isClosed : false, createdAt : new Date()},
    {id : 2, name : 'User access denied', isClosed : true, createdAt : new Date()},
    {id : 3, name : 'Application not responding', isClosed : false, createdAt : new Date()},
]

router.get('/', function(req, res, next){
    res.json(bugs);
});

router.get('/:id', function(req, res, next){
    var bug = bugs.find(bug => bug.id === parseInt(req.params.id));
    if (bug) return res.json(bug);
    res.status(404).json({});
});

router.post('/', function(req, res, next){
    var bugToAdd = req.body;
    if (bugToAdd.id === 0){
        bugToAdd.id = bugs.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1
    }
    bugs.push(bugToAdd);
    res.status(201).json(bugToAdd);
})

module.exports = router;