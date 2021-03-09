var http = require('http'),
    path = require('path'),
    fs = require('fs');

var server = http.createServer(function(req /* IncomingMessage */, res /* ServerResponse */){
    console.log(req.method + ' - ' + req.url);
    var resourceName = req.url === '/' ? '/index.html' : req.url;
    var resourceFullName = path.join(__dirname, resourceName);
    if (!fs.existsSync(resourceFullName)){
        res.statusCode = 404;
        res.end();
        return;
    }
    fs.createReadStream(resourceFullName).pipe(res);
});

server.listen(8080);
server.on('listening', function() {
    console.log('server listening on port 8080');
});