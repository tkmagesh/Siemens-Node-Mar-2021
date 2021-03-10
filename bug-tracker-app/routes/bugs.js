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

router.put('/:id', function(req, res, next){
    var bugToReplace = req.body;
    bugs = bugs.map(bug => bug.id === parseInt(req.params.id) ? bugToReplace : bug);
    res.status(200).json(bugToReplace);
})

router.delete('/:id', function(req, res, next){
    var bugToDelete = bugs.find(bug => bug.id === parseInt(req.params.id));
    if (!bugToDelete) return res.status(404).json({});
    bugs = bugs.filter( bug => bug.id !== parseInt(req.params.id));
    res.status(200).json({});
})

module.exports = router;