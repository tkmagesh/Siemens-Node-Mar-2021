module.exports = function(req, res, next){
    if (!req.finished){
        res.statusCode = 404;
        res.end();
    }
    next();
}