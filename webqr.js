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

    setAppBox = function(appB) {
        appBox = appB;
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
        createProgressBar();

        //Add callback functionality
    },

    createElement = function(element, callback) {
        var wrapper = document.createElement(element);
        wrapper.width = settings.width;
        wrapper.height = settings.height;

        if(callback !== undefined) callback(wrapper);
    },

    createAppBox = function (container){
        createElement('div', function(appB){
            setAppBox(appB);
            getAppBox().id = 'qrApp';

            document.querySelector(container).appendChild(getAppBox());
        });
    },

    createVideoBox = function () {
        createElement('video', function(video){
            setVideoBox(video);
            getVideoBox().id = 'qrVideo';
            getVideoBox().autoplay = 'autoplay';

            appBox.appendChild(video);
            initVideoStream();
        });
    },

    createCanvasBox = function () {
        createElement('canvas', function(canvas){
            setCanvasBox(canvas);
            getCanvasBox().id = 'qrCanvas';
            canvas.width = '640';
            canvas.height = '480';

            appBox.appendChild(canvas);
        });
    },

    createResultBox = function () {
        createElement('div', function(result){
            setResultBox(result);
            getResultBox().id = 'qrResult';

            appBox.appendChild(result);
        });
    },

    createProgressBar = function () {
        createElement('img', function(imgProgressBar){
            setImgProgressBar(imgProgressBar);
            getImgProgressBar().removeAttribute = 'width';
            getImgProgressBar().removeAttribute = 'height';
            getImgProgressBar().style.width = 'auto';
            getImgProgressBar().style.height = 'auto';
            getImgProgressBar().src = imgProgressBarSRC;
            getImgProgressBar().alt = '- scanning -';
        });
    };

    initVideoStream = function(){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;

        navigator.getUserMedia({video: true},
            function (stream) {
                 getVideoBox().src = window.URL.createObjectURL(stream);
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
            getResultBox().innerHTML = checkForLink(data);
        } else {
            getResultBox().appendChild(data);
        }
    },

    checkForLink = function (data) {
        if(data.indexOf("http://") === 0 || data.indexOf("https://") === 0) {
            return '<a target="_blank" href="' + data + '">' + data + '</a>';
        }

        return data;
    },

    addProgressBar = function () {
        var img = document.createElement('img');
        img.src = progressBarSRC;
        img.alt = '- scanning -';

        insertToResultBox(img);
    };

    return {
        init: init
    }

}());
