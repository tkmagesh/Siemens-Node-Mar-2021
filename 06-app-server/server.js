var http = require('http'),
    calculator = require('./calculator');

//http://localhost:9090/calculator?op=add&x=100&y=200

var server = http.createServer(function(req, res){
    var urlObj = new URL(req.url, `http://${req.headers.host}`);
    if (urlObj.pathname !== '/calculator'){
        res.statusCode = 404;
        res.end();
        return;
    }
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
});

server.listen(9090);
server.on('listening', function(){
    console.log('App server listening on 9090');
});