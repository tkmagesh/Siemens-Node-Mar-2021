var calculator = require('./calculator');

module.exports = function(req, res, next){
    if (req.urlObj.pathname === '/calculator') {
        if (!(req.method === 'GET' || req.method === 'POST')){
            res.statusCode = 405 ; //Method Not Allowed
            res.end();
            return next();
        }
        var reqData = req.method === 'GET' ? req.query : req.body;
        
        var op = reqData.op,
            x = parseInt(reqData.x, 10),
            y = parseInt(reqData.y,10 ),
            result = calculator[op](x,y);
        res.write(result.toString());
        res.end();
        return next();
    } else {
        next();
    }
};