(function(){
    function onBtnGreetClick(){
        var userName = document.getElementById('txtUserName').value;
        var greetMsg = 'Hi '+ userName + ', Have a nice day!';
        document.getElementById('divMessage').innerText = greetMsg;
    }
    function onDocumentLoad(){
        var btnGreet= document.getElementById('btnGreet');
        btnGreet.addEventListener('click', onBtnGreetClick);
    }
    window.addEventListener('DOMContentLoaded', onDocumentLoad);
})();