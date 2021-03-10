var fs = require('fs'),
    path = require('path');

var dbFile = path.join(__dirname, '../db/data.json');

function readData(cb){
    fs.readFile(dbFile, 'utf8', function(err, data){
        if (err){
            return cb(err, null);
        }
        cb(null, JSON.parse(data));
    });
}

function saveData(data, cb){
    fs.writeFile(dbFile, JSON.stringify(data), cb);
}

module.exports = {
    readData: readData,
    saveData: saveData
}