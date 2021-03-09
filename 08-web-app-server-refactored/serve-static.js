var path = require('path'),
    fs = require('fs');
    
var staticResExtns = [ '.html', '.css', '.js', '.png', '.jpg', '.xml', '.json', '.txt' ];

function isStatic(resourceName){
    var resExn = path.extname(resourceName);
    return staticResExtns.indexOf(resExn) !== -1;
}

module.exports = function(req, res){
    var resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;
    if (isStatic(resourceName)){
        var resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)){
            res.statusCode = 404;
            res.end();
            return;
        }
        fs.createReadStream(resourceFullName).pipe(res);
    }
}