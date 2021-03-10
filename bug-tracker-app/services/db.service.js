var fs = require('fs'),
    path = require('path');

var dbFile = path.join(__dirname, '../db/data.json');

function readData(cb){
    return new Promise(function(resolveFn, rejectFn){
        fs.readFile(dbFile, 'utf8', function(err, data){
            if (err){
                return rejectFn(err);
            }
            return resolveFn(JSON.parse(data));
        });
    });
}

function saveData(data){
    return new Promise(function(resolveFn, rejectFn){
        fs.writeFile(dbFile, JSON.stringify(data), function(err){
            if (err){
                return rejectFn(err);
            }
            return resolveFn()
        });
    });
}

module.exports = {
    readData: readData,
    saveData: saveData
}