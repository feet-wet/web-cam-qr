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

    init = function(container, data){
        if(!container) return;
        if(!data) data = false;

        settings.width = data.width || 320;
        settings.height = data.height || 240;

        createAppBox(container);
        createVideoBox();
        createCanvasBox();
        createResultBox();
    },

    createAppBox = function (container){
        appBox = document.createElement('div');
        appBox.id = 'qrApp';
        appBox.style.width = settings.width;
        appBox.style.height = settings.height;

        document.querySelector(container).appendChild(appBox);
    },

    createVideoBox = function () {
        createElement('video', function(video){
            setVideoBox(video);
            getVideoBox().id = 'qrVideo';
            getVideoBox().autoplay = 'autoplay';

            initVideoStream();
        });
    },

    createCanvasBox = function () {
        createElement('canvas', function(canvas){
            setCanvasBox(canvas);
            getCanvasBox().id = 'qrCanvas';
            canvas.width = '640';
            canvas.height = '480';
        });
    },

    createResultBox = function () {
        createElement('div', function(result){
            setResultBox(result);
            getResultBox().id = 'qrResult';
        });
    },

    createElement = function(element, callback) {
        var wrapper = document.createElement(element);
        wrapper.width = settings.width;
        wrapper.height = settings.height;

        appBox.appendChild(wrapper);

        if(callback !== undefined) callback(wrapper);
    },

    initVideoStream = function(){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;

        navigator.getUserMedia({video: true},
            function (stream) {
                 getVideoBox().src = window.URL.createObjectURL(stream);
                 addProgressBar();
                 setTimeout(captureToCanvasBox, 500);
        }, function () {
                console.log('with the video stream that something is wrong or the user banned :P');
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
                insertToResultBox(QRWebScannerEngine.qrcode.result);
            } else {
                setTimeout(captureToCanvasBox, 500);
            }
        }
        catch(e) {
            console.log(e);
            setTimeout(captureToCanvasBox, 500);
        }
    },

    insertToResultBox = function (data) {
        if(typeof data == 'string') {
            getResultBox().innerHTML = readResult(data);
        } else {
            getResultBox().appendChild(data);
        }
    },

    readResult = function (data) {
        if(data.indexOf("http://") === 0 || data.indexOf("https://") === 0) {
            return '<a target="_blank" href="' + data + '">' + data + '</a>';
        }

        return data;
    },

    addProgressBar = function () {
        var img = document.createElement('img');
        img.src = 'progressbar.gif';
        img.alt = '- scanning -';

        insertToResultBox(img);
    };

    return {
        init: init
    }

}());
