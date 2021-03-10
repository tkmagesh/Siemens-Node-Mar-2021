var chalk = require('chalk');

module.exports = function(req, res, next){
    var urlObj = new URL(req.url, `http://${req.headers.host}`);
    var method = req.method,
        resource = urlObj.pathname,
        startTime = new Date();
    res.on('finish', function(){
        var statusCode = res.statusCode,
            endTime = new Date(),
            elapsed = endTime - startTime;
        console.log(`${chalk.red(method)}\t${chalk.blue(resource)}\t${chalk.cyan(statusCode)}\t${chalk.yellow(elapsed)}ms`);
    });
    next();
}