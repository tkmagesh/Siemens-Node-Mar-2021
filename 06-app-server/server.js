var http = require('http'),
    querystring = require('querystring'),
    calculator = require('./calculator');

//http://localhost:9090/calculator?op=add&x=100&y=200

var server = http.createServer(function(req, res){
    var urlObj = new URL(req.url, `http://${req.headers.host}`);
    if (urlObj.pathname !== '/calculator'){
        res.statusCode = 404;
        res.end();
        return;
    }
    if (req.method === 'GET'){
        var op = urlObj.searchParams.get('op'),
            x = parseInt(urlObj.searchParams.get('x'), 10),
            y = parseInt(urlObj.searchParams.get('y'),10 ),
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
});

server.listen(9090);
server.on('listening', function(){
    console.log('[app] server listening on 9090');
});