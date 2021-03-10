var path = require('path'),
    fs = require('fs');

var staticResExtns = [ '.html', '.css', '.png', '.js', '.jpg', '.xml', '.json', '.txt' ];

function isStatic(resourceName){
    var resExn = path.extname(resourceName);
    return staticResExtns.indexOf(resExn) !== -1;
}

module.exports = function(resourcePath){
    return function(req, res, next){
        var resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;
        var resourceFullName = path.join(resourcePath, resourceName);
        if (isStatic(resourceName) && fs.existsSync(resourceFullName)){
            var stream = fs.createReadStream(resourceFullName).pipe(res);
            stream.on('end', next);
        } else {
            next();
        }
    };
}