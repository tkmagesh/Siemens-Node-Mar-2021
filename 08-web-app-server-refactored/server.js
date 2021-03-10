var http = require('http'),
    dataParser = require('./data-parser'),
    serveStatic = require('./serve-static'),
    serveCalculator = require('./serve-calculator'),
    notFoundHandler = require('./not-found-handler'),
    logger = require('./logger'),
    app = require('./app'),
    path = require('path');

app.use(logger); 
app.use(dataParser);
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveCalculator);
app.use(notFoundHandler);

var server = http.createServer(app);

server.listen(8080);

server.on('listening', function() {
    console.log('[web-app] server listening on port 8080');
});