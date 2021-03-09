var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    querystring = require('querystring'),
    calculator = require('./calculator'),
    dataParser = require('./data-parser')
   
var staticResExtns = [ '.html', '.css', '.js', '.png', '.jpg', '.xml', '.json', '.txt' ];

function isStatic(resourceName){
    var resExn = path.extname(resourceName);
    return staticResExtns.indexOf(resExn) !== -1;
}

var server = http.createServer(function(req /* IncomingMessage */, res /* ServerResponse */){
    dataParser(req);
    console.log(req.method + ' - ' + req.urlObj.pathname);
    var resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;

    if (isStatic(resourceName)){
        var resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)){
            res.statusCode = 404;
            res.end();
            return;
        }
        fs.createReadStream(resourceFullName).pipe(res);
    } else if (resourceName === '/calculator') {
        if (req.method === 'GET'){
            var op = req.query.op,
                x = parseInt(req.query.x, 10),
                y = parseInt(req.query.y,10 ),
                result = 0;
            switch (op){
                case 'add':
                    result = calculator.add(x,y);
                    break;
                case 'subtract':
                    result = calculator.subtract(x,y);
                    break;
                case 'multiply':
                    result = calculator.multiply(x,y);
                    break;
                case 'divide':
                    result = calculator.divide(x,y);
                    break;
            }
            res.write(result.toString());
            res.end();
        } else if (req.method === 'POST'){
            var rawData = '';
            req.on('data', function(chunk){
                rawData += chunk;
            });
            req.on('end', function(){
                var reqData = querystring.parse(rawData),
                    op = reqData.op,
                    x = parseInt(reqData.x, 10),
                    y = parseInt(reqData.y, 10),
                    result = 0;
                
                switch (op){
                    case 'add':
                        result = calculator.add(x,y);
                        break;
                    case 'subtract':
                        result = calculator.subtract(x,y);
                        break;
                    case 'multiply':
                        result = calculator.multiply(x,y);
                        break;
                    case 'divide':
                        result = calculator.divide(x,y);
                        break;
                }
                res.write(result.toString());
                res.end();
            })
        } else {
            res.statusCode = 405 ; //Method Not Allowed
            res.end();
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(8080);
server.on('listening', function() {
    console.log('[web-app] server listening on port 8080');
});