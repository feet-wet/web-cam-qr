"use strict";

var QRWebScanner = (function () {

    var appBox = false,
        canvasBox = false,
        videoBox = false,
        resultBox = false,
        imgProgressBar = false,
        imgProgressBarSRC ='data:image/gif;base64,R0lGODlhXgAPAKEDAJqamsXFxebm5v///yH/C05FVFNDQVBFMi4wAwEAAAAh/hVDcmVhdGVkIHdpdGggVGhlIEdJTVAAIfkEBQoAAwAsAAAAAF4ADwAAAoGcj6nL7Q+jnLTai7PeTfgPHuAoiORnnqWheul5APJMK+063C+5j33IasVoRJswqPqhkDAmz+kzAKbUqjEJBeaOW2y3+X0OqmTAFazLLsNRtjY9LlPPYride/fK54k8Gg/oBbc3RdfmVxf4p0do+KaYKAjZRmjGcYmZqbnJ2enpWQAAIfkEBQoAAwAsRAADABcACQAAAh+Ej6PB7QiBGq6GmJZt+MzNdZIGiiMFXuKXmmy5klsBACH5BAUKAAMALDcAAwAkAAkAAAI0hI+jwe06hJwUWQCdDpB6cSXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwqAAMAJAAJAAACNISPo8HtOoScFFkAnQ6QenEly9Z03xQeGcmYJ5hiI+uesTywrfJK90rj9X4zUu1DzOmOngIAIfkEBQoAAwAsHQADACQACQAAAjSEj6PB7TqEnBRZAJ0OkHpxJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAUKAAMALBAAAwAkAAkAAAI0hI+jwe06hJwUWQCdDpB6cSXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwDAAMAJAAJAAACLYSPo8LtOpwUqAI438rMps1hHOUZYghmpZlOp7q+biutF61Foy1LvcPDNX6NAgAh+QQFCgADACwDAAMAFwAJAAACH4yPo8DtCIMaroKYlm34zM11kgaKIwVe4peabLmSWwEAIfkEBQoAAwAsAwADACQACQAAAjSUj6PB7TqAnBRZAZ0OkHpwJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAUKAAMALBAAAwAkAAkAAAI0lI+jwe06gJwUWQGdDpB6cCXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwdAAMAJAAJAAACNJSPo8HtOoCcFFkBnQ6QenAly9Z03xQeGcmYJ5hiI+uesTywrfJK90rj9X4zUu1DzOmOngIAIfkEBQoAAwAsKgADACQACQAAAjSUj6PB7TqAnBRZAZ0OkHpwJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAEKAAMALDcAAwAkAAkAAAI0lI+jwe06gJwUWQGdDpB6cCXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgA7',

    settings = {
            width: false,
            height: false
        },

    Set = {

        appBox: function(appB) {
            appBox = appB;
        },

        videoBox: function(video) {
            videoBox = video;
        },

        canvasBox: function(canvas) {
            canvasBox = canvas;
        },

        resultBox: function(result) {
            resultBox = result;
        },

        imgProgressBar: function(img) {
            imgProgressBar = img;
        }
    },

    Get = {

        appBox: function() {
            return appBox;
        },

        videoBox: function() {
            return videoBox;
        },

        canvasBox: function() {
            return canvasBox;
        },

        resultBox: function() {
            return resultBox;
        },

        imgProgressBar: function() {
            return imgProgressBar;
        }

    },

    Create = {

        element: function(element, callback) {
            var wrapper = document.createElement(element);
            wrapper.width = settings.width;
            wrapper.height = settings.height;

            if(callback !== undefined) callback(wrapper);
        },

        appBox: function (container){
            Create.element('div', function(appB){
                Set.appBox(appB);
                Get.appBox().id = 'qrApp';

                document.querySelector(container).appendChild(Get.appBox());
            });
        },

        videoBox: function () {
            Create.element('video', function(video){
                Set.videoBox(video);
                Get.videoBox().id = 'qrVideo';
                Get.videoBox().autoplay = 'autoplay';

                appBox.appendChild(video);
                initVideoStream();
            });
        },

        canvasBox: function () {
            Create.element('canvas', function(canvas){
                Set.canvasBox(canvas);
                Get.canvasBox().id = 'qrCanvas';
                canvas.width = '640';
                canvas.height = '480';

                appBox.appendChild(canvas);
            });
        },

        resultBox: function () {
            Create.element('div', function(result){
                Set.resultBox(result);
                Get.resultBox().id = 'qrResult';

                appBox.appendChild(result);
            });
        },

        progressBar: function () {
            Create.element('img', function(imgProgressBar){
                Set.imgProgressBar(imgProgressBar);
                Get.imgProgressBar().removeAttribute = 'width';
                Get.imgProgressBar().removeAttribute = 'height';
                Get.imgProgressBar().style.width = 'auto';
                Get.imgProgressBar().style.height = 'auto';
                Get.imgProgressBar().src = imgProgressBarSRC;
                Get.imgProgressBar().alt = '- scanning -';
            });
        }

    },

    init = function(container, data){
        if(!container) return;
        if(!data) data = false;

        settings.width = data.width || 320;
        settings.height = data.height || 240;

        Create.appBox(container);
        Create.videoBox();
        Create.canvasBox();
        Create.resultBox();
        Create.progressBar();

        //Add callback functionality
    },

    initVideoStream = function(){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;

        navigator.getUserMedia({video: true},
            function (stream) {
                 Get.videoBox().src = window.URL.createObjectURL(stream);
                 setTimeout(captureToCanvasBox, 500);
        }, function () {
                console.log('with the video stream that something is wrong or the user banned :P');
        });

    },

    captureToCanvasBox = function(){
        try {
            Get.canvasBox().getContext("2d").drawImage(Get.videoBox(),0,0);
            decodeCapture(Get.canvasBox().toDataURL('image/jpg'));
        }
        catch(e) {
            console.log(e);
            setTimeout(captureToCanvasBox, 500);
        }
    },

    decodeCapture = function(capture){
        (Get.imgProgressBar()) ? insertToResultBox(Get.imgProgressBar()) : '';

        try {
            QRWebScannerEngine.qrcode.decode(capture);
            (QRWebScannerEngine.qrcode.currentStatus) ?
                insertToResultBox(QRWebScannerEngine.qrcode.result) : setTimeout(captureToCanvasBox, 500);
        }
        catch(e) {
            console.log(e);
            setTimeout(captureToCanvasBox, 500);
        }
    },

    insertToResultBox = function (data) {
        Get.resultBox().innerHTML = '';

        (typeof data == 'string') ?
            Get.resultBox().innerHTML = checkForLink(data) : Get.resultBox().appendChild(data);
    },

    checkForLink = function (data) {
        if (data.indexOf("http://") === 0 || data.indexOf("https://") === 0) {
            return '<a target="_blank" href="' + data + '">' + data + '</a>';
        }

        return data;
    };

    return {
        init: init
    }

}());
