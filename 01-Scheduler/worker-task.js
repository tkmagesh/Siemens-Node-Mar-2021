function doWork(){
    var percentCompleted = 0;
    for(var i=0; i<15000; i++){
        for(var j=0; j<10000; j++)
            for(var k=0; k<100; k++){

            }
        if (i % 150 === 0){
            var percentCompleted = ( i / 15000) * 100;
            self.postMessage({
                status : 'Progress',
                percentCompleted : percentCompleted
            });
        }
    }
    self.postMessage({
        status : 'Completed'
    })
}

self.addEventListener('message', function(evt){
    if (evt.data === 'start'){
        doWork();
    } else {
        console.log('unknown message - ', evt.data);
    }
})