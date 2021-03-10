var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var dbService = require('../services/db.service');

var bugs = [
   /*  {id : 1, name : 'Server communication failure', isClosed : false, createdAt : new Date()},
    {id : 2, name : 'User access denied', isClosed : true, createdAt : new Date()},
    {id : 3, name : 'Application not responding', isClosed : false, createdAt : new Date()}, */
]

router.get('/', async function(req, res, next){
    //using callbacks
    /*  dbService.readData(function(err, db){
        if (err){
            return next(err)
        }
        res.json(db.bugs);
    }); */
    
    //using promise
    /* 
    var p = dbService.readData();
    p.then(function(db){
        res.json(db.bugs);
    });
    p.catch(function(err){
        return next(err);
    }) 
    */

   /*  
   dbService.readData()
        .then(function(db){
            res.json(db.bugs)
        })
        .catch(function(err){
            return next(err);
        }); 
    */

    //using async await
    try {
        var db = await dbService.readData();
        res.json(db.bugs);
    } catch(err){
        return next(err);
    }
    
});

router.get('/:id', function(req, res, next){
    var bug = bugs.find(bug => bug.id === parseInt(req.params.id));
    if (bug) return res.json(bug);
    res.status(404).json({});
});

router.post('/', async function(req, res, next){
    var bugToAdd = req.body;
    //callbacks
    /* dbService.readData(function(err, db){
        if (err){
            return next(err)
        }
        var bugs = db.bugs;
        if (bugToAdd.id === 0){
            bugToAdd.id = bugs.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1
        }
        bugs.push(bugToAdd);
        dbService.saveData(db, function(err){
            if (err){
                return next(err);
            }
            res.status(201).json(bugToAdd);
        });
    }); */

    //using promises
    /* 
    dbService.readData()
        .then(function(db){
            var bugs = db.bugs;
            if (bugToAdd.id === 0){
                bugToAdd.id = bugs.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1
            }
            bugs.push(bugToAdd);
            return dbService
                .saveData(db)
                .then(function(){
                    res.json(bugToAdd);
                });
        })
        .catch(function(err){
            return next(err);
        }) 
    */
    
    //using async await
    try {
        var db = await dbService.readData();
        var bugs = db.bugs;
        if (bugToAdd.id === 0){
            bugToAdd.id = bugs.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1
        }
        bugs.push(bugToAdd);
        await dbService.saveData(db);
        res.json(bugToAdd);
    } catch (err){
        next(err);
    }
    
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