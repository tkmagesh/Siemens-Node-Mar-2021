var fs = require('fs');

try {
    var fileContents = fs.readFileSync('./sample1.txt', { encoding : 'utf8' });
    console.log(fileContents);
} catch (e){
    console.log('Something went wrong ',  e);
}

//console.log('Thats all folks!!');