var fs = require('fs');
var readline = require('readline');

var stream = fs.createReadStream('./calculator.dat', { encoding : 'utf8', highWaterMark : 32 * 1024 });

var rl = readline.createInterface({
    input : stream
});

//events - open, data, end, close, error
var lineCount = 0;
rl.on('line', function(line){
    console.log(line);
    ++lineCount;
});

rl.on('close', function(){
    console.log('lineCount = ', lineCount);
});