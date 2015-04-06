var QRWebScanner = (function () {

    var appBox = false,
        canvasBox = false,
        videoBox = false,
        resultBox = false,
        settings = {
            width: false,
            height: false
        },

    setVideoBox = function(video) {
        videoBox = video;
    },

    setCanvasBox = function(canvas) {
        canvasBox = canvas;
    },

    setResultBox = function(result) {
        resultBox = result;
    },

    getVideoBox = function() {
        return videoBox;
    },

    getCanvasBox = function() {
        return canvasBox;
    },

    getResultBox = function() {
        return resultBox;
    },

    init = function(elementID, data){
        if(!elementID) return;
        if(!data) data = false;

        settings.width = data.width || 320;
        settings.height = data.height || 240;

        initAppBox();

        createVideoBox();
        createCanvasBox();
        createResultBox();
    },

    initAppBox = function (){
        appBox = document.getElementById(elementID);
        appBox.style.width = settings.width;
        appBox.style.margin = '0, auto';
    },

    createVideoBox = function () {
        createElement('video', function(video){
            setVideoBox(video);
            var content = getVideoBox();
            content.autoplay = 'autoplay';

            initVideoStream();
        });
    },

    createCanvasBox = function () {
        createElement('canvas', function(canvas){
            setCanvasBox(canvas);
            var content = getCanvasBox();
            content.style.display = 'none';
            content.id = 'qrCanvas';
        });
    },

    createResultBox = function () {
        createElement('div', function(result){
            setResultBox(result);
            var content = getResultBox();
            content.id = 'qrResult';
            content.style.width = settings.width;
            content.style.height = settings.height;
        });
    },

    createElement = function(element, callback) {
        var container = document.createElement(element);
        container.width = settings.width;
        container.height = settings.height;

        appBox.appendChild(container);

        if(callback !== undefined) callback(container);
    },

    initVideoStream = function(){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;

        navigator.getUserMedia({video: true},
            function (stream) {
                 getVideoBox().src = window.URL.createObjectURL(stream);
                 setTimeout(captureToCanvasBox, 500);
        }, function () {
                console.log('что-то не так с видеостримом или пользователь запретил его использовать :P');
        });

    },

    captureToCanvasBox = function(){
        try {
            getCanvasBox().getContext("2d").drawImage(videoBox,0,0);

            decodeCapture(getCanvasBox().toDataURL('image/jpg'));
        }
        catch(e) {
            console.log(e);
            setTimeout(captureToCanvasBox, 500);
        }
    },

    decodeCapture = function(capture){
        try {
            QRWebScannerEngine.qrcode.decode(capture);
            if(QRWebScannerEngine.qrcode.currentStatus){
                console.log(QRWebScannerEngine.qrcode.currentStatus);
            } else {
                setTimeout(captureToCanvasBox, 500);
            }
            //QRWebScannerEngine.qrcode.result;
        }
        catch(e) {
            console.log(e);
            setTimeout(captureToCanvasBox, 500);
        }
    };

    return {
        init: init
    }

}());
