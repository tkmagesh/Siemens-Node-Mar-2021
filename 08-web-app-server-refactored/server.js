var http = require('http'),
    dataParser = require('./data-parser'),
    serveStatic = require('./serve-static'),
    serveCalculator = require('./serve-calculator'),
    notFoundHandler = require('./not-found-handler');

var _middlewares = [ dataParser, serveStatic, serveCalculator, notFoundHandler ];

function exec(req, res, middlewares) {
    var first = middlewares[0],
        remaining = middlewares.slice(1),
        next = function(){
            exec(req, res, remaining);
        };
    if (typeof first === 'function')
        first(req, res, next);
}
   
var server = http.createServer(function(req , res ){
    //console.log(req.method + ' - ' + req.urlObj.pathname);
    exec(req, res, _middlewares);
});

server.listen(8080);

server.on('listening', function() {
    console.log('[web-app] server listening on port 8080');
});