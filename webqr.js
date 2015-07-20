"use strict";

var QRWebScanner = (function (QRE) {

    var appBox = false,
        canvasBox = false,
        videoBox = false,
        resultBox = false,
        resultData = false,
        callbackData = false,
        btnsBox = false,
        btnCam = false,
        btnImg = false,
        inputFile = false,
        labelFile = false,
        imgProgressBar = false,

    settings = {
            width: 320,
            height: 240,
            id: {
                appBox: 'qrApp',
                inputFile: 'qrInputFile'
            },
            elClass: {
                btnsBox: 'qrBtns',
                btnCam: 'qrBtnCam',
                btnImg: 'qrBtnImg',
                videoBox: 'qrVideo',
                canvasBox: 'qrCanvas',
                resultBox: 'qrResult'
            },
            btnCamBG: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAARuAAAEbgHQo7JoAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAALFQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgAGBgAGBQAFBAAEBAAEAwADAwADAwADAwADAwADAwADAwAFAwAFAgAFAgAFAgAEAgAEBAIEAwIDAwIDAwIDAwIDAwIDAwIFAwEEAwEEAwEEAwEEAwEEAwEEAwEEAwEEAwEEAgEEAgEEBAEEAwEDAwEFAwEEAwEEAwEEAwEEAwEEAwEEAwEEAwEEAwEEAwEEneEDTwAAADp0Uk5TAAEFDQ4RFhgaHCotLjhBRUpMTk9UXWFkbG96foGUl5iZnKGrrK6vsbK0vMLP0NXb4uTl5ufv+fr7/i/djPQAAAD+SURBVBgZvcHVcsIAFEXRTXGX4NKixYJL4fz/hzXDXEKAgUfWgg9KTha+SZJnSwUseZLSnRSPWrrT4kH5oDuHMibUWOmlVSNEQ0Gb8XijoAYr+Y7NOJ548yjfCvncNCbtyrNxfiWhq10UTyyGJ7qTNMSRhK6KQG0trWtAUdLfcCMJmRHQ0UUHGMkgU4e8TB7qMshk4UfmG7IyyIRhLjOHsAwyGejL9CEjg0wVKjIVqMog04XQTBezEHRlkDlmINKTpxeBzFEGXblfQKJUSgBfrq6QbxDFRAfyoZttgYvCVjecFLCfttvTvQJOLPTWAuesN84O5Abu4gV3kOMD/gGpEoZr1YvY2wAAAABJRU5ErkJggg==',
            btnImgBG: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABZwAAAWcBcp21pQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF1SURBVFiF7ZexSsRAEIa/iSkiVxwWonIq14hgoY0+gIhvYOcraGNndwdWtpYWgq8g2giCduILeCCneCAoaKuFMhZJIKy3Zo25rIULfzG7s/t/yewuiagqPlvg1f0vAAjQApqe/O8E8LoJvJcgNOJN4L0Cz700MEswrKpvg3QXkQh4TePSSyAigYg0XPNLBRCRNeAW6InIqYiMuszTjCJVpYiSh+ka6233yYuyOWW+gRFgyuibz5tUGoCqPgNHRveB01wcSgCEDmWoAxvAIbBiyYkMz3wAoAHcALNF90hhAGAIuEjGO0C9aoAdI+cECCoBAFaBDyNHgd0cky1g6VcAwATw2Mc81bqlXPvJ+AuwUAiA+HiefWOuxPf5YmbhGnBs5DwBc0UAWjnmqXrAODAGXFlyHoAZZwBg2VJ3my75egWbugeaLgDTCbGr+U/UBSbzAM4HZJ6qQ/z9aQWoQtfZ+P+j1DtACLTx+WOSnE1vzXsJvAN8AkFqiiajd3okAAAAAElFTkSuQmCC',
            imgProgressBarSRC:'data:image/gif;base64,R0lGODlhXgAPAKEDAJqamsXFxebm5v///yH/C05FVFNDQVBFMi4wAwEAAAAh/hVDcmVhdGVkIHdpdGggVGhlIEdJTVAAIfkEBQoAAwAsAAAAAF4ADwAAAoGcj6nL7Q+jnLTai7PeTfgPHuAoiORnnqWheul5APJMK+063C+5j33IasVoRJswqPqhkDAmz+kzAKbUqjEJBeaOW2y3+X0OqmTAFazLLsNRtjY9LlPPYride/fK54k8Gg/oBbc3RdfmVxf4p0do+KaYKAjZRmjGcYmZqbnJ2enpWQAAIfkEBQoAAwAsRAADABcACQAAAh+Ej6PB7QiBGq6GmJZt+MzNdZIGiiMFXuKXmmy5klsBACH5BAUKAAMALDcAAwAkAAkAAAI0hI+jwe06hJwUWQCdDpB6cSXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwqAAMAJAAJAAACNISPo8HtOoScFFkAnQ6QenEly9Z03xQeGcmYJ5hiI+uesTywrfJK90rj9X4zUu1DzOmOngIAIfkEBQoAAwAsHQADACQACQAAAjSEj6PB7TqEnBRZAJ0OkHpxJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAUKAAMALBAAAwAkAAkAAAI0hI+jwe06hJwUWQCdDpB6cSXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwDAAMAJAAJAAACLYSPo8LtOpwUqAI438rMps1hHOUZYghmpZlOp7q+biutF61Foy1LvcPDNX6NAgAh+QQFCgADACwDAAMAFwAJAAACH4yPo8DtCIMaroKYlm34zM11kgaKIwVe4peabLmSWwEAIfkEBQoAAwAsAwADACQACQAAAjSUj6PB7TqAnBRZAZ0OkHpwJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAUKAAMALBAAAwAkAAkAAAI0lI+jwe06gJwUWQGdDpB6cCXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgAh+QQFCgADACwdAAMAJAAJAAACNJSPo8HtOoCcFFkBnQ6QenAly9Z03xQeGcmYJ5hiI+uesTywrfJK90rj9X4zUu1DzOmOngIAIfkEBQoAAwAsKgADACQACQAAAjSUj6PB7TqAnBRZAZ0OkHpwJcvWdN8UHhnJmCeYYiPrnrE8sK3ySvdK4/V+M1LtQ8zpjp4CACH5BAEKAAMALDcAAwAkAAkAAAI0lI+jwe06gJwUWQGdDpB6cCXL1nTfFB4ZyZgnmGIj656xPLCt8kr3SuP1fjNS7UPM6Y6eAgA7',
            imageFileType: ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp']
        },

    init = function(container, callback){
        if(!container) return;
        //if(!data && typeof(data) !== "object") data = false; ToDo: realize receiving of size data

        //settings.width = data.width || settings.width;
        //settings.height = data.height || settings.height;

        Create.appBox(container);
        Create.btnsBox();
        Create.videoBox();
        Create.canvasBox();
        Create.resultBox();
        Create.progressBar();

        WebCam.init();
        Loader.start();

        if(callback && typeof(callback) === "function") {
            callbackData = function() {
                callback(resultData);
            }
        }
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
                Get.appBox().id = settings.id.appBox;

                document.querySelector(container).appendChild(Get.appBox());
            });
        },

        videoBox: function () {
            Create.element('video', function(video){
                Set.videoBox(video);
                Get.videoBox().className = settings.elClass.videoBox;
                Get.videoBox().autoplay = 'autoplay';

                appBox.appendChild(video);
            });
        },

        canvasBox: function () {
            Create.element('canvas', function(canvas){
                Set.canvasBox(canvas);
                Get.canvasBox().className = settings.elClass.canvasBox;
                Canvas.setSize();

                appBox.appendChild(canvas);
            });
        },

        btnsBox: function () {
            Create.element('div', function(btns){
                Set.btnsBox(btns);
                Get.btnsBox().className = settings.elClass.btnsBox;

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
                Get.btnCam().className = settings.elClass.btnCam;
                Get.btnCam().title = 'Scan from WebCam';
                Get.btnCam().style.backgroundImage = "url(" + settings.btnCamBG + ")";
                Get.btnCam().onclick = function() {

                    Get.videoBox().show();
                    Get.labelFile().hide();
                    Get.canvasBox().hide();

                    Get.btnImg().setOpacity(.5);
                    Get.btnCam().setOpacity(.8);

                    Canvas.setSize();

                    if(WebCam.state) {
                        Result.clearBox();
                        Loader.start();
                        Decode.state = true;
                        Decode.start(Get.videoBox());
                    }

                    WebCam.state = true;
                };

                btnsBox.appendChild(btnCam);
            });
        },

        btnImg: function () {
            Create.element('div', function(btnImg){
                Set.btnImg(btnImg);
                Get.btnImg().className = settings.elClass.btnImg;
                Get.btnImg().title = 'Scan from uploading image';
                Get.btnImg().style.backgroundImage = "url(" + settings.btnImgBG + ")";
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

                    WebCam.state = false;
                };

                btnsBox.appendChild(btnImg);
            });
        },

        inputFile: function () {
            Create.element('input', function(inputF){
                Set.inputFile(inputF);
                Get.inputFile().id = settings.id.inputFile;
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
                Get.resultBox().className = settings.elClass.resultBox;
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

                    WebCam.state = true;

                }, function () {
                    console.log('with the video stream that something is wrong or the user banned :P');
                });
        },

        state: false


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

        state: true,

        start: function(object) {
            QRE.qrcode.currentStatus = undefined;
            Canvas.captureImage(object);
        },

        stop: function() {
            Decode.state = false;

            setTimeout(Canvas.clear, 500);
            Result.clear();
        },

        image: function(data64Image, objectSource) {
            QRE.qrcode.decode(data64Image);
            Decode.check(objectSource)
        },

        check: function(objectSource) {
            if(!Decode.state) return;

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
            Decode.state = true;
            Canvas.clear();
            Result.clearBox();

            var allowedFileTypes = settings.imageFileType.join(', ');

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

            callbackData();
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
