var QRWebScanner = (function () {

    var appBox = false,
        canvasBox = false,
        videoBox = false,
        settings = {
            width: false,
            height: false
        },

    init = function(elementID, data){
        if(!elementID) return;
        if(!data) data = false;

        appBox = document.getElementById(elementID);

        settings.width = data.width || 320;
        settings.height = data.height || 240;

        createVideoBox();
        createCanvasBox();
    },

    createVideoBox = function () {
        //createElement('video', function(){
        //    videoBox.autoplay = 'autoplay';
        //});

        videoBox = document.createElement('video');
        videoBox.width = settings.width;
        videoBox.height = settings.height;
        videoBox.autoplay = 'autoplay';

        appBox.appendChild(videoBox);

        initVideoStream();
    },

    createCanvasBox = function () {
        canvasBox = document.createElement('canvas');
        canvasBox.width = settings.width;
        canvasBox.height = settings.height;

        appBox.appendChild(canvasBox);

        canvasBox.style.display = 'none';
        canvasBox.id = 'qrCanvas';

        //createElement('canvas', function(){
        //    canvasBox.style.display = 'none';
        //    canvasBox.id = 'qrCanvas';
        //});
    },

    createElement = function(element, callback) {
        QRWebScanner[element+'Box'] = document.createElement(element);
        QRWebScanner[element+'Box'].width = settings.width;
        QRWebScanner[element+'Box'].height = settings.height;

        appBox.appendChild(QRWebScanner[element+'Box']);

        if(callback) callback();
    },

    initVideoStream = function(){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;

        navigator.getUserMedia({video: true},
            function (stream) {
                 videoBox.src = window.URL.createObjectURL(stream);
                 setTimeout(captureToCanvasBox, 500);
        }, function () {
                console.log('что-то не так с видеостримом или пользователь запретил его использовать :P');
        });

    },

    captureToCanvasBox = function(){
        try {
            canvasBox.getContext("2d").drawImage(videoBox,0,0);

            decodeCapture(canvasBox.toDataURL('image/jpg'));
        }
        catch(e) {
            console.log(e);
            setTimeout(captureToCanvasBox, 500);
        }
    },

    decodeCapture = function(capture){
        try {
            QRWebScannerEngine.qrcode.decode(capture);
            console.log(QRWebScannerEngine.qrcode.currentStatus);
            QRWebScannerEngine.qrcode.result;
            setTimeout(captureToCanvasBox, 500);
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
