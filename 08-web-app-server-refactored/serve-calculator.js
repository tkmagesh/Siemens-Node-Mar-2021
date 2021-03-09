var querystring = require('querystring'),
    calculator = require('./calculator');

module.exports = function(req, res, next){
    if (req.urlObj.pathname === '/calculator') {
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
            console.log('calculator-get request processed');
            return next();
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
                return next();
            })
        } else {
            res.statusCode = 405 ; //Method Not Allowed
            res.end();
        }
    } else {
        next();
    }
};