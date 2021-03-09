var path = require('path'),
    fs = require('fs');

var staticResExtns = [ '.html', '.css', '.js', '.png', '.jpg', '.xml', '.json', '.txt' ];

function isStatic(resourceName){
    var resExn = path.extname(resourceName);
    return staticResExtns.indexOf(resExn) !== -1;
}

module.exports = function(req, res, next){
    var resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;
    var resourceFullName = path.join(__dirname, resourceName);
    if (isStatic(resourceName) && fs.existsSync(resourceFullName)){
        var stream = fs.createReadStream(resourceFullName).pipe(res);
        stream.on('end', next);
        
        /* 
        var stream = fs.createReadStream(resourceFullName);
        stream.on('data', function(chunk){
            console.log('stream-data event triggered')
            res.write(chunk);
        });
        stream.on('end', function(){
            console.log('stream-end event triggered')
            res.end();
            next();
        });  
        */
        

        /* 
        var fileContents = fs.readFileSync(resourceFullName);
        res.write(fileContents);
        res.end(); 
        */
    } else {
        next();
    }
}