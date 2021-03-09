var querystring = require('querystring');

module.exports = function(req, res, next){
    var urlObj = new URL(req.url, `http://${req.headers.host}`);
    req['urlObj'] = urlObj;

    //parsing the querystring
    var query = {};
    for( let [key,value] of urlObj.searchParams){
        query[key] = value;
    }
    req['query'] = query;

    //parsing the req body
    var rawData = '';
    req.on('data', function(chunk){
        rawData += chunk;
    });
    req.on('end', function(){
        req['body'] = querystring.parse(rawData);
        next();
    });
}