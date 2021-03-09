var http = require('http'),
    path = require('path'),
    fs = require('fs');
   

var server = http.createServer(function(req /* IncomingMessage */, res /* ServerResponse */){
    var urlObj = new URL(req.url, `http://${req.headers.host}`)
    console.log(req.method + ' - ' + urlObj.pathname);
    var resourceName = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname;
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
    console.log('[web] server listening on port 8080');
});