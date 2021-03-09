var fs = require('fs');

var stream = fs.createReadStream('./sample.txt', { encoding : 'utf8', highWaterMark : 32 * 1024 });

//events - open, data, end, close, error
var readCount = 0;
stream.on('data', function(chunk){
    ++readCount;
});

stream.on('data', function(chunk){
    console.log(chunk.length);
});

stream.on('end', function(){
    console.log('Thats all folks!!');
    console.log('readCount : ', readCount);
});

stream.on('error', function(err){
    console.log('Something went wrong');
    console.log(err);
})