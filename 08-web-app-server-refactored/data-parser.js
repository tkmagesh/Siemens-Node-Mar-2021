
module.exports = function(req){
    var urlObj = new URL(req.url, `http://${req.headers.host}`);
    var query = {};
    for( let [key,value] of urlObj.searchParams){
        query[key] = value;
    }
    req['urlObj'] = urlObj;
    req['query'] = query;
}