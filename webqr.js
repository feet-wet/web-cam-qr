"use strict";

var QRWebScanner = (function (QRE) {

    var appBox = false,
        canvasBox = false,
        videoBox = false,
        resultBox = false,
        resultData = false,
        btnsBox = false,
        btnCam = false,
        btnImg = false,
        inputFile = false,
        labelFile = false,
        imgProgressBar = false,
        imgProgressBarSRC ='data:image/gif;base64,R0lGODlhXgAPAKEDAJqamsXFxebm5v///yH/C05FVFNDQVBFMi4wAwEAAAAh/hVDcmVhdGVkIHdpdGggVGhlIEdJTVAAIfkEBQoAAwAsAAAAAF4ADwAAAoGcj6nL7Q+jnLTai7PeTfgPHuAoiORnnqWheul5APJMK+063C+5j33IasVoRJswqPqhkDAmz+kzAKbUqjEJBeaOW2y3+X0OqmTAFazLLsNRtjY9LlPPYride/fK54k8Gg/oBbc3RdfmVxf4p0do+KaYKAjZRmjGcYmZqbnJ2enpWQAAIfkEBQoAAwAsRAADABcACQAAAh+Ej6PB7QiBGq6GmJZt+MzNdZIGiiMFXuKXmmy5klsBACH5BAUKAAMALDcAAwAkAAkAAAI0hI+jwe06hJwUWQCdDpB6cSXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwqAAMAJAAJAAACNISPo8HtOoScFFkAnQ6QenEly9Z03xQeGcmYJ5hiI+uesTywrfJK90rj9X4zUu1DzOmOngIAIfkEBQoAAwAsHQADACQACQAAAjSEj6PB7TqEnBRZAJ0OkHpxJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAUKAAMALBAAAwAkAAkAAAI0hI+jwe06hJwUWQCdDpB6cSXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwDAAMAJAAJAAACLYSPo8LtOpwUqAI438rMps1hHOUZYghmpZlOp7q+biutF61Foy1LvcPDNX6NAgAh+QQFCgADACwDAAMAFwAJAAACH4yPo8DtCIMaroKYlm34zM11kgaKIwVe4peabLmSWwEAIfkEBQoAAwAsAwADACQACQAAAjSUj6PB7TqAnBRZAZ0OkHpwJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAUKAAMALBAAAwAkAAkAAAI0lI+jwe06gJwUWQGdDpB6cCXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwdAAMAJAAJAAACNJSPo8HtOoCcFFkBnQ6QenAly9Z03xQeGcmYJ5hiI+uesTywrfJK90rj9X4zUu1DzOmOngIAIfkEBQoAAwAsKgADACQACQAAAjSUj6PB7TqAnBRZAZ0OkHpwJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAEKAAMALDcAAwAkAAkAAAI0lI+jwe06gJwUWQGdDpB6cCXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgA7',

    settings = {
            width: false,
            height: false
        },

    init = function(container, data){
        if(!container) return;
        if(!data) data = false;

        settings.width = data.width || 320;
        settings.height = data.height || 240;

        Create.appBox(container);
        Create.btnsBox();
        Create.videoBox();
        Create.canvasBox();
        Create.resultBox();
        Create.progressBar();

        //Add callback functionality
        Loader.start();
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

        btnsBox: function(btns) {
            btnsBox = btns;
        },

        btnCam: function(btn) {
            btnCam = btn;
        },

        btnImg: function(btn) {
            btnImg = btn;
        },

        inputFile: function(inputF) {
            inputFile = inputF;
        },

        labelFile: function(labelF) {
            labelFile = labelF;
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

        btnsBox: function() {
            return btnsBox;
        },

        btnCam: function() {
            return btnCam;
        },

        btnImg: function() {
            return btnImg;
        },

        inputFile: function() {
            return inputFile;
        },

        labelFile: function() {
            return labelFile;
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
                Get.videoBox().className = 'qrVideo';
                Get.videoBox().autoplay = 'autoplay';

                appBox.appendChild(video);
                VideoStream.init();
            });
        },

        canvasBox: function () {
            Create.element('canvas', function(canvas){
                Set.canvasBox(canvas);
                Get.canvasBox().className = 'qrCanvas';
                setCanvasBoxSize();

                appBox.appendChild(canvas);
            });
        },

        btnsBox: function () {
            Create.element('div', function(btns){
                Set.btnsBox(btns);
                Get.btnsBox().className = 'qrBtns';

                appBox.appendChild(btns);

                Create.btnCam();
                Create.btnImg();
                Create.inputFile();
                Create.labelFile();
            });
        },

        btnCam: function () {
            Create.element('div', function(btnCam){
                Set.btnCam(btnCam);
                Get.btnCam().className = 'qrBtnCam';
                Get.btnCam().title = 'Scan from WebCam';
                Get.btnCam().active = true;
                Get.btnCam().onclick = function() {
                    Get.videoBox().style.display = 'block';

                    Get.btnImg().style.opacity = .5;
                    Get.btnCam().style.opacity = .8;

                    Get.labelFile().style.display = 'none';

                    Get.canvasBox().style.display = 'none';
                    setCanvasBoxSize();

                    if(Get.btnCam().active) {
                        QRE.qrcode.currentStatus = undefined;
                        VideoStream.captureImage();
                    }
                    Get.btnCam().active = true;
                };

                btnsBox.appendChild(btnCam);
            });
        },

        btnImg: function () {
            Create.element('div', function(btnImg){
                Set.btnImg(btnImg);
                Get.btnImg().className = 'qrBtnImg';
                Get.btnCam().title = 'Scan from uploading image';
                Get.btnImg().onclick = function() {
                    Get.videoBox().style.display = 'none';

                    Get.btnImg().style.opacity = .8;
                    Get.btnCam().style.opacity = .5;

                    Get.canvasBox().style.display = 'block';
                    Get.canvasBox().width = settings.width;
                    Get.canvasBox().height = settings.height;

                    Get.labelFile().style.display = 'block';
                    ResultBox.clear();

                    Get.btnCam().active = false;
                };

                btnsBox.appendChild(btnImg);
            });
        },

        inputFile: function () {
            Create.element('input', function(inputF){
                Set.inputFile(inputF);
                Get.inputFile().id = 'qrInputFile';
                Get.inputFile().type = 'file';
                Get.inputFile().width = '';
                Get.inputFile().height = '';
                Get.inputFile().onchange = function() {
                  File.accept(this.files[0])
                };

                btnsBox.appendChild(inputF);
            });
        },

        labelFile: function () {
            Create.element('label', function(labelF){
                Set.labelFile(labelF);
                Get.labelFile().htmlFor = Get.inputFile().id;
                Get.labelFile().innerHTML = 'Upload';

                btnsBox.appendChild(labelF);
            });
        },

        resultBox: function () {
            Create.element('div', function(result){
                Set.resultBox(result);
                Get.resultBox().className = 'qrResult';
                Get.resultBox().style.width = settings.width;

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

    VideoStream = {

        init: function () {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;

            navigator.getUserMedia({video: true},
                function (stream) {
                    Get.videoBox().src = window.URL.createObjectURL(stream);
                    setTimeout(VideoStream.captureImage, 500);
                }, function () {
                    console.log('with the video stream that something is wrong or the user banned :P');
                });
        },

        captureImage: function () {
            if(!Get.btnCam().active) return;

            try {
                Get.canvasBox().getContext("2d").drawImage(Get.videoBox(), 0, 0);
                Decode.image(Get.canvasBox().toDataURL('image/jpg'));
            }
            catch(e) {
                console.log(e);
                setTimeout(VideoStream.captureImage, 500);
            }
        }

    },

    Decode = {

        image: function(capture) {
            (Get.imgProgressBar()) ? ResultBox.insert(Get.imgProgressBar()) : '';

            try {
                QRE.qrcode.decode(capture);
                (QRE.qrcode.currentStatus) ?
                    ResultBox.insert(QRE.qrcode.result) : setTimeout(VideoStream.captureImage, 500);
            }
            catch(e) {
                console.log(e);
                if(Get.btnCam().active) setTimeout(VideoStream.captureImage, 500);
                resultData = QRE.qrcode.result;
            }
        }

    },

    File = {

        accept: function(file) {
            var img = new Image,
                reader = new FileReader();

            reader.onload = function() {
                img.src = reader.result;

                setTimeout(function(){
                    Canvas.captureImage(img)
                }, 500);
            };

            reader.readAsDataURL(file);
        }

    },

    Loader = {

        start: function() {
            Result.insert(Get.imgProgressBar());
        }

    },
    ResultBox = {
        insert: function (data) {
            ResultBox.clear();

            (typeof data == 'string') ?
                Get.resultBox().innerHTML = ResultBox.checkForLink(data) : Get.resultBox().appendChild(data);
        },

        clear: function() {
            Get.resultBox().innerHTML = '';
        },

        checkForLink: function (data) {
            if (data.indexOf("http://") === 0 || data.indexOf("https://") === 0) {
                return '<a target="_blank" href="' + data + '">' + data + '</a>';
            }

            return data;
        }
    },

    setCanvasBoxSize = function() {
        Get.canvasBox().width = '640';
        Get.canvasBox().height = '480';
    };

    return {
        init: init
    }

}(QRWebScannerEngine));
