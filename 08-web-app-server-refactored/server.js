var http = require('http'),
    dataParser = require('./data-parser'),
    serveStatic = require('./serve-static'),
    serveCalculator = require('./serve-calculator'),
    notFoundHandler = require('./not-found-handler');
   
var server = http.createServer(function(req , res ){
    dataParser(req);
    console.log(req.method + ' - ' + req.urlObj.pathname);
    serveStatic(req, res);
    serveCalculator(req, res);
    notFoundHandler(res);
});

server.listen(8080);

server.on('listening', function() {
    console.log('[web-app] server listening on port 8080');
});