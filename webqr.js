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

    settings = {
            width: false,
            height: false,
            imgProgressBarSRC:'data:image/gif;base64,R0lGODlhXgAPAKEDAJqamsXFxebm5v///yH/C05FVFNDQVBFMi4wAwEAAAAh/hVDcmVhdGVkIHdpdGggVGhlIEdJTVAAIfkEBQoAAwAsAAAAAF4ADwAAAoGcj6nL7Q+jnLTai7PeTfgPHuAoiORnnqWheul5APJMK+063C+5j33IasVoRJswqPqhkDAmz+kzAKbUqjEJBeaOW2y3+X0OqmTAFazLLsNRtjY9LlPPYride/fK54k8Gg/oBbc3RdfmVxf4p0do+KaYKAjZRmjGcYmZqbnJ2enpWQAAIfkEBQoAAwAsRAADABcACQAAAh+Ej6PB7QiBGq6GmJZt+MzNdZIGiiMFXuKXmmy5klsBACH5BAUKAAMALDcAAwAkAAkAAAI0hI+jwe06hJwUWQCdDpB6cSXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwqAAMAJAAJAAACNISPo8HtOoScFFkAnQ6QenEly9Z03xQeGcmYJ5hiI+uesTywrfJK90rj9X4zUu1DzOmOngIAIfkEBQoAAwAsHQADACQACQAAAjSEj6PB7TqEnBRZAJ0OkHpxJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAUKAAMALBAAAwAkAAkAAAI0hI+jwe06hJwUWQCdDpB6cSXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwDAAMAJAAJAAACLYSPo8LtOpwUqAI438rMps1hHOUZYghmpZlOp7q+biutF61Foy1LvcPDNX6NAgAh+QQFCgADACwDAAMAFwAJAAACH4yPo8DtCIMaroKYlm34zM11kgaKIwVe4peabLmSWwEAIfkEBQoAAwAsAwADACQACQAAAjSUj6PB7TqAnBRZAZ0OkHpwJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAUKAAMALBAAAwAkAAkAAAI0lI+jwe06gJwUWQGdDpB6cCXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwdAAMAJAAJAAACNJSPo8HtOoCcFFkBnQ6QenAly9Z03xQeGcmYJ5hiI+uesTywrfJK90rj9X4zUu1DzOmOngIAIfkEBQoAAwAsKgADACQACQAAAjSUj6PB7TqAnBRZAZ0OkHpwJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAEKAAMALDcAAwAkAAkAAAI0lI+jwe06gJwUWQGdDpB6cCXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgA7',
            fileType: ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp']
        //ToDo: Add to settings element's classes
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

        WebCam.init();
        Loader.start();

        //Add callback functionality and return result
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

            wrapper.show = function() {
                this.style.display = 'block';
            };
            wrapper.hide = function() {
                this.style.display = 'none';
            };
            wrapper.setOpacity = function(opacity) {
                this.style.opacity = opacity;
            };

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
            });
        },

        canvasBox: function () {
            Create.element('canvas', function(canvas){
                Set.canvasBox(canvas);
                Get.canvasBox().className = 'qrCanvas';
                Canvas.setSize();

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
                Get.btnCam().active = true; //ToDo: to rework
                Get.btnCam().onclick = function() {

                    Get.videoBox().show();
                    Get.labelFile().hide();
                    Get.canvasBox().hide();

                    Get.btnImg().setOpacity(.5);
                    Get.btnCam().setOpacity(.8);

                    Canvas.setSize();

                    if(Get.btnCam().active) { //ToDo: to rework
                        Result.clearBox();
                        Loader.start();
                        Decode.start(Get.videoBox());
                    }


                    Get.btnCam().active = true; //ToDo: to rework
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
                    Decode.stop();
                    Get.videoBox().hide();

                    Get.btnImg().setOpacity(.8);
                    Get.btnCam().setOpacity(.5);

                    Get.canvasBox().show();
                    Get.labelFile().show();

                    Get.canvasBox().width = settings.width;
                    Get.canvasBox().height = settings.height;

                    Result.clearBox();

                    Get.btnCam().active = false; //ToDo: to rework
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
                Get.imgProgressBar().src = settings.imgProgressBarSRC;
                Get.imgProgressBar().alt = '- scanning -';
            });
        }

    },

    WebCam = {

        init: function () {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;

            navigator.getUserMedia({video: true},
                function (stream) {

                    Get.videoBox().src = window.URL.createObjectURL(stream);
                    Canvas.captureImage(Get.videoBox());

                }, function () {
                    console.log('with the video stream that something is wrong or the user banned :P');
                });
        }

    },

    Canvas = {

        captureImage: function (objectSource) {
            setTimeout(function() {
                Canvas.drawImage(objectSource);
                Canvas.decode(objectSource);
            }, 500);
        },

        drawImage: function(objectSource) {
            Get.canvasBox().getContext("2d").drawImage(objectSource, 0, 0, settings.width, settings.height);
        },

        decode: function(objectSource) {
            Decode.image(Get.canvasBox().toDataURL('image/jpg'), objectSource);
        },

        clear: function() {
            Get.canvasBox().getContext("2d").clearRect(0, 0, settings.width, settings.width);
        },

        setSize: function() {
            Get.canvasBox().width = '640';
            Get.canvasBox().height = '480';
        }

    },

    Decode = {

        start: function(object) {
            QRE.qrcode.currentStatus = undefined;
            Canvas.captureImage(object);
        },

        stop: function() {
            QRE.qrcode.currentStatus =  QRE.qrcode.result = true;

            setTimeout(Canvas.clear, 500);
            Result.clear();
        },

        image: function(data64Image, objectSource) {
            QRE.qrcode.decode(data64Image);
            Decode.check(objectSource)
        },

        check: function(objectSource) {
            if (QRE.qrcode.currentStatus && QRE.qrcode.result) {
                resultData = QRE.qrcode.result;
                Result.insert(QRE.qrcode.result);
            } else {
                Canvas.captureImage(objectSource);
            }
        }

    },

    File = {

        accept: function(file) {
            Canvas.clear();
            Result.clearBox();

            var allowedFileTypes = settings.fileType.join(', ');

            if (allowedFileTypes.indexOf(file.type) + 1) {

                Loader.start();
                var img = new Image,
                    reader = new FileReader();

                reader.onload = function() {
                    img.src = reader.result;
                    Canvas.captureImage(img);
                };

                reader.readAsDataURL(file);

            } else {
                Result.insert('File must be png, jpg or bmp type');
            }
        }

    },

    Loader = {

        start: function() {
            Get.resultBox().appendChild(Get.imgProgressBar());
        }

    },

    Result = {

        insert: function (data) {
            Result.clearBox();

            if (typeof data == 'string') Get.resultBox().innerHTML = Result.checkForLink(data);

            Result.clear();
        },

        checkForLink: function (data) {
            if (data.indexOf("http://") === 0 || data.indexOf("https://") === 0) {
                return '<a target="_blank" href="' + data + '">' + data + '</a>';
            }

            return data;
        },

        clearBox: function() {
            Get.resultBox().innerHTML = '';
        },

        clear: function() {
            setTimeout(function(){
                QRE.qrcode.result = '';
            }, 500);
        }
    };

    return {
        init: init
    }

}(QRWebScannerEngine));
