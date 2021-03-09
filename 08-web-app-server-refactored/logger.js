module.exports = function(req, res, next){
    var urlObj = new URL(req.url, `http://${req.headers.host}`);
    var method = req.method,
        resource = urlObj.pathname,
        startTime = new Date();
    res.on('finish', function(){
        var statusCode = res.statusCode,
            endTime = new Date(),
            elapsed = endTime - startTime;
        console.log(`${method}\t${resource}\t${statusCode}\t${elapsed}ms`);
    });
    next();
}