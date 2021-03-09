function f1Sync(){
    console.log('f1Sync triggered');
    console.log('f1Sync completed');
}

function f2Sync(){
    console.log('f2Sync triggered');
    console.log('f2Sync completed');
}

function f3Sync(){
    console.log('f3Sync triggered');
    console.log('f3Sync completed');
}

function f4Sync(){
    console.log('f4Sync triggered');
    console.log('f4Sync completed');
}

function runSync(){
    f1Sync();
    f2Sync();
    f3Sync();
    f4Sync();
}

module.exports['runSync'] = runSync;

function f1Async(){
    console.log('f1Async triggered');
    setTimeout(function(){
        console.log('f1Async completed');
    }, 6000);
}

function f2Async(){
    console.log('f2Async triggered');
    setTimeout(function(){
        console.log('f2Async completed');
    }, 2000);
}

function f3Async(){
    console.log('f3Async triggered');
    setTimeout(function(){
        console.log('f3Async completed');
    }, 4000);
}

function f4Async(){
    console.log('f4Async triggered');
    setTimeout(function(){
        console.log('f4Async completed');
    }, 5000);
}

function runAsync(){
    f1Async();
    f2Async();
    f3Async();
    f4Async();
}

module.exports['runAsync'] = runAsync;