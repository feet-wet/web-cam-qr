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

    init = function(data, callback){
        if(!data.container) return 'Incorrect data or something is wrong';

        settings.width = data.width || settings.width;
        settings.height = data.height || settings.height;

        Create.appBox(data.container);
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

        state: false,

        init: function () {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;

            navigator.getUserMedia({video: true},
                function (stream) {

                    Get.videoBox().src = window.URL.createObjectURL(stream);
                    Canvas.captureImage(Get.videoBox());

                    WebCam.state = true;

                }, function () {
                    console.log('With the video stream that something is wrong or the user banned :P');
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

/*
 Ported to JavaScript by Lazar Laszlo 2011

 lazarsoft@gmail.com, www.lazarsoft.info

 */

/*
 *
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var QRWebScannerEngine = (function () {

    var GridSampler = {

        checkAndNudgePoints: function( image,  points) {
            var width = qrcode.width;
            var height = qrcode.height;
            // Check and nudge points from start until we see some that are OK:
            var nudged = true;
            for (var offset = 0; offset < points.length && nudged; offset += 2) {
                var x = Math.floor (points[offset]);
                var y = Math.floor( points[offset + 1]);
                if (x < - 1 || x > width || y < - 1 || y > height) {
                    throw "Error.checkAndNudgePoints ";
                }
                nudged = false;
                if (x == - 1) {
                    points[offset] = 0.0;
                    nudged = true;
                }
                else if (x == width) {
                    points[offset] = width - 1;
                    nudged = true;
                }
                if (y == - 1) {
                    points[offset + 1] = 0.0;
                    nudged = true;
                }
                else if (y == height) {
                    points[offset + 1] = height - 1;
                    nudged = true;
                }
            }

            // Check and nudge points from end:
            nudged = true;
            for (var offset = points.length - 2; offset >= 0 && nudged; offset -= 2) {
                var x = Math.floor( points[offset]);
                var y = Math.floor( points[offset + 1]);
                if (x < - 1 || x > width || y < - 1 || y > height) {
                    throw "Error.checkAndNudgePoints ";
                }
                nudged = false;
                if (x == - 1) {
                    points[offset] = 0.0;
                    nudged = true;
                }
                else if (x == width) {
                    points[offset] = width - 1;
                    nudged = true;
                }
                if (y == - 1) {
                    points[offset + 1] = 0.0;
                    nudged = true;
                }
                else if (y == height) {
                    points[offset + 1] = height - 1;
                    nudged = true;
                }
            }
        },

        sampleGrid3: function ( image,  dimension,  transform) {
            var bits = new BitMatrix(dimension);
            var points = new Array(dimension << 1);
            for (var y = 0; y < dimension; y++)
            {
                var max = points.length;
                var iValue =  y + 0.5;
                for (var x = 0; x < max; x += 2)
                {
                    points[x] =  (x >> 1) + 0.5;
                    points[x + 1] = iValue;
                }
                transform.transformPoints1(points);
                // Quick check to see if points transformed to something inside the image;
                // sufficient to check the endpoints
                GridSampler.checkAndNudgePoints(image, points);
                try {
                    for (var x = 0; x < max; x += 2) {
                        var xpoint = (Math.floor( points[x]) * 4) + (Math.floor( points[x + 1]) * qrcode.width * 4);
                        var bit = image[Math.floor( points[x])+ qrcode.width* Math.floor( points[x + 1])];
                        qrcode.imagedata.data[xpoint] = bit?255:0;
                        qrcode.imagedata.data[xpoint+1] = bit?255:0;
                        qrcode.imagedata.data[xpoint+2] = 0;
                        qrcode.imagedata.data[xpoint+3] = 255;
                        //bits[x >> 1][ y]=bit;
                        if(bit)
                            bits.set_Renamed(x >> 1, y);
                    }
                }
                catch ( aioobe) {
                    // This feels wrong, but, sometimes if the finder patterns are misidentified, the resulting
                    // transform gets "twisted" such that it maps a straight line of points to a set of points
                    // whose endpoints are in bounds, but others are not. There is probably some mathematical
                    // way to detect this about the transformation that I don't know yet.
                    // This results in an ugly runtime exception despite our clever checks above -- can't have
                    // that. We could check each point's coordinates but that feels duplicative. We settle for
                    // catching and wrapping ArrayIndexOutOfBoundsException.
                    throw "Error.checkAndNudgePoints";
                }
            }
            return bits;
        },

        sampleGridx: function( image,  dimension,  p1ToX,  p1ToY,  p2ToX,  p2ToY,  p3ToX,  p3ToY,  p4ToX,  p4ToY,  p1FromX,  p1FromY,  p2FromX,  p2FromY,  p3FromX,  p3FromY,  p4FromX,  p4FromY) {
            var transform = PerspectiveTransform.quadrilateralToQuadrilateral(p1ToX, p1ToY, p2ToX, p2ToY, p3ToX, p3ToY, p4ToX, p4ToY, p1FromX, p1FromY, p2FromX, p2FromY, p3FromX, p3FromY, p4FromX, p4FromY);

            return GridSampler.sampleGrid3(image, dimension, transform);
        }

    },


///

    ECB = function (count,  dataCodewords) {
        this.count = count;
        this.dataCodewords = dataCodewords;

        this.__defineGetter__("Count", function()
        {
            return this.count;
        });
        this.__defineGetter__("DataCodewords", function()
        {
            return this.dataCodewords;
        });
    },

    ECBlocks = function ( ecCodewordsPerBlock,  ecBlocks1,  ecBlocks2) {
        this.ecCodewordsPerBlock = ecCodewordsPerBlock;
        if(ecBlocks2)
            this.ecBlocks = [ecBlocks1, ecBlocks2];
        else
            this.ecBlocks = [ecBlocks1];

        this.__defineGetter__("ECCodewordsPerBlock", function()
        {
            return this.ecCodewordsPerBlock;
        });

        this.__defineGetter__("TotalECCodewords", function()
        {
            return  this.ecCodewordsPerBlock * this.NumBlocks;
        });

        this.__defineGetter__("NumBlocks", function()
        {
            var total = 0;
            for (var i = 0; i < this.ecBlocks.length; i++)
            {
                total += this.ecBlocks[i].length;
            }
            return total;
        });

        this.getECBlocks=function()
        {
            return this.ecBlocks;
        }
    },

    Version = function ( versionNumber,  alignmentPatternCenters,  ecBlocks1,  ecBlocks2,  ecBlocks3,  ecBlocks4) {
        this.versionNumber = versionNumber;
        this.alignmentPatternCenters = alignmentPatternCenters;
        this.ecBlocks = [ecBlocks1, ecBlocks2, ecBlocks3, ecBlocks4];

        var total = 0;
        var ecCodewords = ecBlocks1.ECCodewordsPerBlock;
        var ecbArray = ecBlocks1.getECBlocks();
        for (var i = 0; i < ecbArray.length; i++) {
            var ecBlock = ecbArray[i];
            total += ecBlock.Count * (ecBlock.DataCodewords + ecCodewords);
        }
        this.totalCodewords = total;

        this.__defineGetter__("VersionNumber", function() {
            return  this.versionNumber;
        });

        this.__defineGetter__("AlignmentPatternCenters", function() {
            return  this.alignmentPatternCenters;
        });
        this.__defineGetter__("TotalCodewords", function() {
            return  this.totalCodewords;
        });
        this.__defineGetter__("DimensionForVersion", function() {
            return  17 + 4 * this.versionNumber;
        });

        this.buildFunctionPattern=function() {
            var dimension = this.DimensionForVersion;
            var bitMatrix = new BitMatrix(dimension);

            // Top left finder pattern + separator + format
            bitMatrix.setRegion(0, 0, 9, 9);
            // Top right finder pattern + separator + format
            bitMatrix.setRegion(dimension - 8, 0, 8, 9);
            // Bottom left finder pattern + separator + format
            bitMatrix.setRegion(0, dimension - 8, 9, 8);

            // Alignment patterns
            var max = this.alignmentPatternCenters.length;
            for (var x = 0; x < max; x++) {
                var i = this.alignmentPatternCenters[x] - 2;
                for (var y = 0; y < max; y++)
                {
                    if ((x == 0 && (y == 0 || y == max - 1)) || (x == max - 1 && y == 0))
                    {
                        // No alignment patterns near the three finder paterns
                        continue;
                    }
                    bitMatrix.setRegion(this.alignmentPatternCenters[y] - 2, i, 5, 5);
                }
            }

            // Vertical timing pattern
            bitMatrix.setRegion(6, 9, 1, dimension - 17);
            // Horizontal timing pattern
            bitMatrix.setRegion(9, 6, dimension - 17, 1);

            if (this.versionNumber > 6)
            {
                // Version info, top right
                bitMatrix.setRegion(dimension - 11, 0, 3, 6);
                // Version info, bottom left
                bitMatrix.setRegion(0, dimension - 11, 6, 3);
            }

            return bitMatrix;
        };

        this.getECBlocksForLevel=function( ecLevel)
        {
            return this.ecBlocks[ecLevel.ordinal()];
        }
    };

    Version.VERSION_DECODE_INFO = [0x07C94, 0x085BC, 0x09A99, 0x0A4D3, 0x0BBF6, 0x0C762, 0x0D847, 0x0E60D, 0x0F928, 0x10B78, 0x1145D, 0x12A17, 0x13532, 0x149A6, 0x15683, 0x168C9, 0x177EC, 0x18EC4, 0x191E1, 0x1AFAB, 0x1B08E, 0x1CC1A, 0x1D33F, 0x1ED75, 0x1F250, 0x209D5, 0x216F0, 0x228BA, 0x2379F, 0x24B0B, 0x2542E, 0x26A64, 0x27541, 0x28C69];

    Version.VERSIONS = buildVersions();

    Version.getVersionForNumber = function( versionNumber) {
        if (versionNumber < 1 || versionNumber > 40) {
            throw "ArgumentException";
        }
        return Version.VERSIONS[versionNumber - 1];
    };

    Version.getProvisionalVersionForDimension = function(dimension) {
        if (dimension % 4 != 1) {
            throw "Error getProvisionalVersionForDimension";
        }
        try {
            return Version.getVersionForNumber((dimension - 17) >> 2);
        }
        catch ( iae) {
            throw "Error getVersionForNumber";
        }
    };

    Version.decodeVersionInformation=function( versionBits) {
        var bestDifference = 0xffffffff;
        var bestVersion = 0;
        for (var i = 0; i < Version.VERSION_DECODE_INFO.length; i++) {
            var targetVersion = Version.VERSION_DECODE_INFO[i];
            // Do the version info bits match exactly? done.
            if (targetVersion == versionBits) {
                return this.getVersionForNumber(i + 7);
            }
            // Otherwise see if this is the closest to a real version info bit string
            // we have seen so far
            var bitsDifference = FormatInformation.numBitsDiffering(versionBits, targetVersion);
            if (bitsDifference < bestDifference) {
                bestVersion = i + 7;
                bestDifference = bitsDifference;
            }
        }
        // We can tolerate up to 3 bits of error since no two version info codewords will
        // differ in less than 4 bits.
        if (bestDifference <= 3) {
            return this.getVersionForNumber(bestVersion);
        }
        // If we didn't find a close enough match, fail
        return null;
    };

    function buildVersions() {
        return [new Version(1, [], new ECBlocks(7, new ECB(1, 19)), new ECBlocks(10, new ECB(1, 16)), new ECBlocks(13, new ECB(1, 13)), new ECBlocks(17, new ECB(1, 9))),
            new Version(2, [6, 18], new ECBlocks(10, new ECB(1, 34)), new ECBlocks(16, new ECB(1, 28)), new ECBlocks(22, new ECB(1, 22)), new ECBlocks(28, new ECB(1, 16))),
            new Version(3, [6, 22], new ECBlocks(15, new ECB(1, 55)), new ECBlocks(26, new ECB(1, 44)), new ECBlocks(18, new ECB(2, 17)), new ECBlocks(22, new ECB(2, 13))),
            new Version(4, [6, 26], new ECBlocks(20, new ECB(1, 80)), new ECBlocks(18, new ECB(2, 32)), new ECBlocks(26, new ECB(2, 24)), new ECBlocks(16, new ECB(4, 9))),
            new Version(5, [6, 30], new ECBlocks(26, new ECB(1, 108)), new ECBlocks(24, new ECB(2, 43)), new ECBlocks(18, new ECB(2, 15), new ECB(2, 16)), new ECBlocks(22, new ECB(2, 11), new ECB(2, 12))),
            new Version(6, [6, 34], new ECBlocks(18, new ECB(2, 68)), new ECBlocks(16, new ECB(4, 27)), new ECBlocks(24, new ECB(4, 19)), new ECBlocks(28, new ECB(4, 15))),
            new Version(7, [6, 22, 38], new ECBlocks(20, new ECB(2, 78)), new ECBlocks(18, new ECB(4, 31)), new ECBlocks(18, new ECB(2, 14), new ECB(4, 15)), new ECBlocks(26, new ECB(4, 13), new ECB(1, 14))),
            new Version(8, [6, 24, 42], new ECBlocks(24, new ECB(2, 97)), new ECBlocks(22, new ECB(2, 38), new ECB(2, 39)), new ECBlocks(22, new ECB(4, 18), new ECB(2, 19)), new ECBlocks(26, new ECB(4, 14), new ECB(2, 15))),
            new Version(9, [6, 26, 46], new ECBlocks(30, new ECB(2, 116)), new ECBlocks(22, new ECB(3, 36), new ECB(2, 37)), new ECBlocks(20, new ECB(4, 16), new ECB(4, 17)), new ECBlocks(24, new ECB(4, 12), new ECB(4, 13))),
            new Version(10, [6, 28, 50], new ECBlocks(18, new ECB(2, 68), new ECB(2, 69)), new ECBlocks(26, new ECB(4, 43), new ECB(1, 44)), new ECBlocks(24, new ECB(6, 19), new ECB(2, 20)), new ECBlocks(28, new ECB(6, 15), new ECB(2, 16))),
            new Version(11, [6, 30, 54], new ECBlocks(20, new ECB(4, 81)), new ECBlocks(30, new ECB(1, 50), new ECB(4, 51)), new ECBlocks(28, new ECB(4, 22), new ECB(4, 23)), new ECBlocks(24, new ECB(3, 12), new ECB(8, 13))),
            new Version(12, [6, 32, 58], new ECBlocks(24, new ECB(2, 92), new ECB(2, 93)), new ECBlocks(22, new ECB(6, 36), new ECB(2, 37)), new ECBlocks(26, new ECB(4, 20), new ECB(6, 21)), new ECBlocks(28, new ECB(7, 14), new ECB(4, 15))),
            new Version(13, [6, 34, 62], new ECBlocks(26, new ECB(4, 107)), new ECBlocks(22, new ECB(8, 37), new ECB(1, 38)), new ECBlocks(24, new ECB(8, 20), new ECB(4, 21)), new ECBlocks(22, new ECB(12, 11), new ECB(4, 12))),
            new Version(14, [6, 26, 46, 66], new ECBlocks(30, new ECB(3, 115), new ECB(1, 116)), new ECBlocks(24, new ECB(4, 40), new ECB(5, 41)), new ECBlocks(20, new ECB(11, 16), new ECB(5, 17)), new ECBlocks(24, new ECB(11, 12), new ECB(5, 13))),
            new Version(15, [6, 26, 48, 70], new ECBlocks(22, new ECB(5, 87), new ECB(1, 88)), new ECBlocks(24, new ECB(5, 41), new ECB(5, 42)), new ECBlocks(30, new ECB(5, 24), new ECB(7, 25)), new ECBlocks(24, new ECB(11, 12), new ECB(7, 13))),
            new Version(16, [6, 26, 50, 74], new ECBlocks(24, new ECB(5, 98), new ECB(1, 99)), new ECBlocks(28, new ECB(7, 45), new ECB(3, 46)), new ECBlocks(24, new ECB(15, 19), new ECB(2, 20)), new ECBlocks(30, new ECB(3, 15), new ECB(13, 16))),
            new Version(17, [6, 30, 54, 78], new ECBlocks(28, new ECB(1, 107), new ECB(5, 108)), new ECBlocks(28, new ECB(10, 46), new ECB(1, 47)), new ECBlocks(28, new ECB(1, 22), new ECB(15, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(17, 15))),
            new Version(18, [6, 30, 56, 82], new ECBlocks(30, new ECB(5, 120), new ECB(1, 121)), new ECBlocks(26, new ECB(9, 43), new ECB(4, 44)), new ECBlocks(28, new ECB(17, 22), new ECB(1, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(19, 15))),
            new Version(19, [6, 30, 58, 86], new ECBlocks(28, new ECB(3, 113), new ECB(4, 114)), new ECBlocks(26, new ECB(3, 44), new ECB(11, 45)), new ECBlocks(26, new ECB(17, 21), new ECB(4, 22)), new ECBlocks(26, new ECB(9, 13), new ECB(16, 14))),
            new Version(20, [6, 34, 62, 90], new ECBlocks(28, new ECB(3, 107), new ECB(5, 108)), new ECBlocks(26, new ECB(3, 41), new ECB(13, 42)), new ECBlocks(30, new ECB(15, 24), new ECB(5, 25)), new ECBlocks(28, new ECB(15, 15), new ECB(10, 16))),
            new Version(21, [6, 28, 50, 72, 94], new ECBlocks(28, new ECB(4, 116), new ECB(4, 117)), new ECBlocks(26, new ECB(17, 42)), new ECBlocks(28, new ECB(17, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(19, 16), new ECB(6, 17))),
            new Version(22, [6, 26, 50, 74, 98], new ECBlocks(28, new ECB(2, 111), new ECB(7, 112)), new ECBlocks(28, new ECB(17, 46)), new ECBlocks(30, new ECB(7, 24), new ECB(16, 25)), new ECBlocks(24, new ECB(34, 13))),
            new Version(23, [6, 30, 54, 74, 102], new ECBlocks(30, new ECB(4, 121), new ECB(5, 122)), new ECBlocks(28, new ECB(4, 47), new ECB(14, 48)), new ECBlocks(30, new ECB(11, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(16, 15), new ECB(14, 16))),
            new Version(24, [6, 28, 54, 80, 106], new ECBlocks(30, new ECB(6, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(6, 45), new ECB(14, 46)), new ECBlocks(30, new ECB(11, 24), new ECB(16, 25)), new ECBlocks(30, new ECB(30, 16), new ECB(2, 17))),
            new Version(25, [6, 32, 58, 84, 110], new ECBlocks(26, new ECB(8, 106), new ECB(4, 107)), new ECBlocks(28, new ECB(8, 47), new ECB(13, 48)), new ECBlocks(30, new ECB(7, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(22, 15), new ECB(13, 16))),
            new Version(26, [6, 30, 58, 86, 114], new ECBlocks(28, new ECB(10, 114), new ECB(2, 115)), new ECBlocks(28, new ECB(19, 46), new ECB(4, 47)), new ECBlocks(28, new ECB(28, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(33, 16), new ECB(4, 17))),
            new Version(27, [6, 34, 62, 90, 118], new ECBlocks(30, new ECB(8, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(22, 45), new ECB(3, 46)), new ECBlocks(30, new ECB(8, 23), new ECB(26, 24)), new ECBlocks(30, new ECB(12, 15), 		new ECB(28, 16))),
            new Version(28, [6, 26, 50, 74, 98, 122], new ECBlocks(30, new ECB(3, 117), new ECB(10, 118)), new ECBlocks(28, new ECB(3, 45), new ECB(23, 46)), new ECBlocks(30, new ECB(4, 24), new ECB(31, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(31, 16))),
            new Version(29, [6, 30, 54, 78, 102, 126], new ECBlocks(30, new ECB(7, 116), new ECB(7, 117)), new ECBlocks(28, new ECB(21, 45), new ECB(7, 46)), new ECBlocks(30, new ECB(1, 23), new ECB(37, 24)), new ECBlocks(30, new ECB(19, 15), new ECB(26, 16))),
            new Version(30, [6, 26, 52, 78, 104, 130], new ECBlocks(30, new ECB(5, 115), new ECB(10, 116)), new ECBlocks(28, new ECB(19, 47), new ECB(10, 48)), new ECBlocks(30, new ECB(15, 24), new ECB(25, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(25, 16))),
            new Version(31, [6, 30, 56, 82, 108, 134], new ECBlocks(30, new ECB(13, 115), new ECB(3, 116)), new ECBlocks(28, new ECB(2, 46), new ECB(29, 47)), new ECBlocks(30, new ECB(42, 24), new ECB(1, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(28, 16))),
            new Version(32, [6, 34, 60, 86, 112, 138], new ECBlocks(30, new ECB(17, 115)), new ECBlocks(28, new ECB(10, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(10, 24), new ECB(35, 25)), new ECBlocks(30, new ECB(19, 15), new ECB(35, 16))),
            new Version(33, [6, 30, 58, 86, 114, 142], new ECBlocks(30, new ECB(17, 115), new ECB(1, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(21, 47)), new ECBlocks(30, new ECB(29, 24), new ECB(19, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(46, 16))),
            new Version(34, [6, 34, 62, 90, 118, 146], new ECBlocks(30, new ECB(13, 115), new ECB(6, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(44, 24), new ECB(7, 25)), new ECBlocks(30, new ECB(59, 16), new ECB(1, 17))),
            new Version(35, [6, 30, 54, 78, 102, 126, 150], new ECBlocks(30, new ECB(12, 121), new ECB(7, 122)), new ECBlocks(28, new ECB(12, 47), new ECB(26, 48)), new ECBlocks(30, new ECB(39, 24), new ECB(14, 25)),new ECBlocks(30, new ECB(22, 15), new ECB(41, 16))),
            new Version(36, [6, 24, 50, 76, 102, 128, 154], new ECBlocks(30, new ECB(6, 121), new ECB(14, 122)), new ECBlocks(28, new ECB(6, 47), new ECB(34, 48)), new ECBlocks(30, new ECB(46, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(2, 15), new ECB(64, 16))),
            new Version(37, [6, 28, 54, 80, 106, 132, 158], new ECBlocks(30, new ECB(17, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(29, 46), new ECB(14, 47)), new ECBlocks(30, new ECB(49, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(24, 15), new ECB(46, 16))),
            new Version(38, [6, 32, 58, 84, 110, 136, 162], new ECBlocks(30, new ECB(4, 122), new ECB(18, 123)), new ECBlocks(28, new ECB(13, 46), new ECB(32, 47)), new ECBlocks(30, new ECB(48, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(42, 15), new ECB(32, 16))),
            new Version(39, [6, 26, 54, 82, 110, 138, 166], new ECBlocks(30, new ECB(20, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(40, 47), new ECB(7, 48)), new ECBlocks(30, new ECB(43, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(10, 15), new ECB(67, 16))),
            new Version(40, [6, 30, 58, 86, 114, 142, 170], new ECBlocks(30, new ECB(19, 118), new ECB(6, 119)), new ECBlocks(28, new ECB(18, 47), new ECB(31, 48)), new ECBlocks(30, new ECB(34, 24), new ECB(34, 25)), new ECBlocks(30, new ECB(20, 15), new ECB(61, 16)))];
    }

///

    var PerspectiveTransform = function ( a11,  a21,  a31,  a12,  a22,  a32,  a13,  a23,  a33) {
        this.a11 = a11;
        this.a12 = a12;
        this.a13 = a13;
        this.a21 = a21;
        this.a22 = a22;
        this.a23 = a23;
        this.a31 = a31;
        this.a32 = a32;
        this.a33 = a33;
        this.transformPoints1=function( points) {
            var max = points.length;
            var a11 = this.a11;
            var a12 = this.a12;
            var a13 = this.a13;
            var a21 = this.a21;
            var a22 = this.a22;
            var a23 = this.a23;
            var a31 = this.a31;
            var a32 = this.a32;
            var a33 = this.a33;
            for (var i = 0; i < max; i += 2) {
                var x = points[i];
                var y = points[i + 1];
                var denominator = a13 * x + a23 * y + a33;
                points[i] = (a11 * x + a21 * y + a31) / denominator;
                points[i + 1] = (a12 * x + a22 * y + a32) / denominator;
            }
        };
        this. transformPoints2=function(xValues, yValues) {
            var n = xValues.length;
            for (var i = 0; i < n; i++)
            {
                var x = xValues[i];
                var y = yValues[i];
                var denominator = this.a13 * x + this.a23 * y + this.a33;
                xValues[i] = (this.a11 * x + this.a21 * y + this.a31) / denominator;
                yValues[i] = (this.a12 * x + this.a22 * y + this.a32) / denominator;
            }
        };

        this.buildAdjoint=function() {
            // Adjoint is the transpose of the cofactor matrix:
            return new PerspectiveTransform(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21);
        };
        this.times=function( other) {
            return new PerspectiveTransform(this.a11 * other.a11 + this.a21 * other.a12 + this.a31 * other.a13, this.a11 * other.a21 + this.a21 * other.a22 + this.a31 * other.a23, this.a11 * other.a31 + this.a21 * other.a32 + this.a31 * other.a33, this.a12 * other.a11 + this.a22 * other.a12 + this.a32 * other.a13, this.a12 * other.a21 + this.a22 * other.a22 + this.a32 * other.a23, this.a12 * other.a31 + this.a22 * other.a32 + this.a32 * other.a33, this.a13 * other.a11 + this.a23 * other.a12 +this.a33 * other.a13, this.a13 * other.a21 + this.a23 * other.a22 + this.a33 * other.a23, this.a13 * other.a31 + this.a23 * other.a32 + this.a33 * other.a33);
        }

    };

    PerspectiveTransform.quadrilateralToQuadrilateral = function( x0,  y0,  x1,  y1,  x2,  y2,  x3,  y3,  x0p,  y0p,  x1p,  y1p,  x2p,  y2p,  x3p,  y3p) {

        var qToS = this.quadrilateralToSquare(x0, y0, x1, y1, x2, y2, x3, y3);
        var sToQ = this.squareToQuadrilateral(x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p);
        return sToQ.times(qToS);
    };

    PerspectiveTransform.squareToQuadrilateral = function( x0,  y0,  x1,  y1,  x2,  y2,  x3,  y3) {
        var dy2 = y3 - y2,
            dy3 = y0 - y1 + y2 - y3;
        if (dy2 == 0.0 && dy3 == 0.0) {
            return new PerspectiveTransform(x1 - x0, x2 - x1, x0, y1 - y0, y2 - y1, y0, 0.0, 0.0, 1.0);
        }
        else {
            var dx1 = x1 - x2,
                dx2 = x3 - x2,
                dx3 = x0 - x1 + x2 - x3,
                dy1 = y1 - y2,
                denominator = dx1 * dy2 - dx2 * dy1,
                a13 = (dx3 * dy2 - dx2 * dy3) / denominator,
                a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
            return new PerspectiveTransform(x1 - x0 + a13 * x1, x3 - x0 + a23 * x3, x0, y1 - y0 + a13 * y1, y3 - y0 + a23 * y3, y0, a13, a23, 1.0);
        }
    };

    PerspectiveTransform.quadrilateralToSquare=function( x0,  y0,  x1,  y1,  x2,  y2,  x3,  y3) {
        // Here, the adjoint serves as the inverse:
        return this.squareToQuadrilateral(x0, y0, x1, y1, x2, y2, x3, y3).buildAdjoint();
    };

    function DetectorResult(bits,  points) {
        this.bits = bits;
        this.points = points;
    };


    var Detector = function (image) {
        this.image=image;
        this.resultPointCallback = null;

        this.sizeOfBlackWhiteBlackRun=function( fromX,  fromY,  toX,  toY)
        {
            // Mild variant of Bresenham's algorithm;
            // see http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
            var steep = Math.abs(toY - fromY) > Math.abs(toX - fromX);
            if (steep) {
                var temp = fromX;
                fromX = fromY;
                fromY = temp;
                temp = toX;
                toX = toY;
                toY = temp;
            };

            var dx = Math.abs(toX - fromX);
            var dy = Math.abs(toY - fromY);
            var error = - dx >> 1;
            var ystep = fromY < toY?1:- 1;
            var xstep = fromX < toX?1:- 1;
            var state = 0; // In black pixels, looking for white, first or second time
            for (var x = fromX, y = fromY; x != toX; x += xstep) {

                var realX = steep?y:x;
                var realY = steep?x:y;
                if (state == 1)
                {
                    // In white pixels, looking for black
                    if (this.image[realX + realY*qrcode.width])
                    {
                        state++;
                    }
                }
                else
                {
                    if (!this.image[realX + realY*qrcode.width])
                    {
                        state++;
                    }
                }

                if (state == 3)
                {
                    // Found black, white, black, and stumbled back onto white; done
                    var diffX = x - fromX;
                    var diffY = y - fromY;
                    return  Math.sqrt( (diffX * diffX + diffY * diffY));
                }
                error += dy;
                if (error > 0)
                {
                    if (y == toY)
                    {
                        break;
                    }
                    y += ystep;
                    error -= dx;
                }
            }
            var diffX2 = toX - fromX;
            var diffY2 = toY - fromY;
            return  Math.sqrt( (diffX2 * diffX2 + diffY2 * diffY2));
        };


        this.sizeOfBlackWhiteBlackRunBothWays=function( fromX,  fromY,  toX,  toY)
        {

            var result = this.sizeOfBlackWhiteBlackRun(fromX, fromY, toX, toY);

            // Now count other way -- don't run off image though of course
            var scale = 1.0;
            var otherToX = fromX - (toX - fromX);
            if (otherToX < 0)
            {
                scale =  fromX /  (fromX - otherToX);
                otherToX = 0;
            }
            else if (otherToX >= qrcode.width)
            {
                scale =  (qrcode.width - 1 - fromX) /  (otherToX - fromX);
                otherToX = qrcode.width - 1;
            }
            var otherToY = Math.floor (fromY - (toY - fromY) * scale);

            scale = 1.0;
            if (otherToY < 0)
            {
                scale =  fromY /  (fromY - otherToY);
                otherToY = 0;
            }
            else if (otherToY >= qrcode.height)
            {
                scale =  (qrcode.height - 1 - fromY) /  (otherToY - fromY);
                otherToY = qrcode.height - 1;
            }
            otherToX = Math.floor (fromX + (otherToX - fromX) * scale);

            result += this.sizeOfBlackWhiteBlackRun(fromX, fromY, otherToX, otherToY);
            return result - 1.0; // -1 because we counted the middle pixel twice
        };



        this.calculateModuleSizeOneWay=function( pattern,  otherPattern) {
            var moduleSizeEst1 = this.sizeOfBlackWhiteBlackRunBothWays(Math.floor( pattern.X), Math.floor( pattern.Y), Math.floor( otherPattern.X), Math.floor(otherPattern.Y));
            var moduleSizeEst2 = this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(otherPattern.X), Math.floor(otherPattern.Y), Math.floor( pattern.X), Math.floor(pattern.Y));
            if (isNaN(moduleSizeEst1))
            {
                return moduleSizeEst2 / 7.0;
            }
            if (isNaN(moduleSizeEst2))
            {
                return moduleSizeEst1 / 7.0;
            }
            // Average them, and divide by 7 since we've counted the width of 3 black modules,
            // and 1 white and 1 black module on either side. Ergo, divide sum by 14.
            return (moduleSizeEst1 + moduleSizeEst2) / 14.0;
        };


        this.calculateModuleSize=function( topLeft,  topRight,  bottomLeft) {
            // Take the average
            return (this.calculateModuleSizeOneWay(topLeft, topRight) + this.calculateModuleSizeOneWay(topLeft, bottomLeft)) / 2.0;
        };

        this.distance=function( pattern1,  pattern2) {
            var xDiff = pattern1.X - pattern2.X,
                yDiff = pattern1.Y - pattern2.Y;
            return  Math.sqrt( (xDiff * xDiff + yDiff * yDiff));
        };
        this.computeDimension=function( topLeft,  topRight,  bottomLeft,  moduleSize) {

            var tltrCentersDimension = Math.round(this.distance(topLeft, topRight) / moduleSize);
            var tlblCentersDimension = Math.round(this.distance(topLeft, bottomLeft) / moduleSize);
            var dimension = ((tltrCentersDimension + tlblCentersDimension) >> 1) + 7;
            switch (dimension & 0x03)
            {

                // mod 4
                case 0:
                    dimension++;
                    break;
                // 1? do nothing

                case 2:
                    dimension--;
                    break;

                case 3:
                    throw "Error";
            }
            return dimension;
        };

        this.findAlignmentInRegion=function( overallEstModuleSize,  estAlignmentX,  estAlignmentY,  allowanceFactor) {
            // Look for an alignment pattern (3 modules in size) around where it
            // should be
            var allowance = Math.floor (allowanceFactor * overallEstModuleSize);
            var alignmentAreaLeftX = Math.max(0, estAlignmentX - allowance);
            var alignmentAreaRightX = Math.min(qrcode.width - 1, estAlignmentX + allowance);
            if (alignmentAreaRightX - alignmentAreaLeftX < overallEstModuleSize * 3)
            {
                throw "Error";
            }

            var alignmentAreaTopY = Math.max(0, estAlignmentY - allowance);
            var alignmentAreaBottomY = Math.min(qrcode.height - 1, estAlignmentY + allowance);

            var alignmentFinder = new AlignmentPatternFinder(this.image, alignmentAreaLeftX, alignmentAreaTopY, alignmentAreaRightX - alignmentAreaLeftX, alignmentAreaBottomY - alignmentAreaTopY, overallEstModuleSize, this.resultPointCallback);
            return alignmentFinder.find();
        };

        this.createTransform=function( topLeft,  topRight,  bottomLeft, alignmentPattern, dimension) {
            var dimMinusThree =  dimension - 3.5;
            var bottomRightX;
            var bottomRightY;
            var sourceBottomRightX;
            var sourceBottomRightY;
            if (alignmentPattern != null)
            {
                bottomRightX = alignmentPattern.X;
                bottomRightY = alignmentPattern.Y;
                sourceBottomRightX = sourceBottomRightY = dimMinusThree - 3.0;
            }
            else
            {
                // Don't have an alignment pattern, just make up the bottom-right point
                bottomRightX = (topRight.X - topLeft.X) + bottomLeft.X;
                bottomRightY = (topRight.Y - topLeft.Y) + bottomLeft.Y;
                sourceBottomRightX = sourceBottomRightY = dimMinusThree;
            }

            var transform = PerspectiveTransform.quadrilateralToQuadrilateral(3.5, 3.5, dimMinusThree, 3.5, sourceBottomRightX, sourceBottomRightY, 3.5, dimMinusThree, topLeft.X, topLeft.Y, topRight.X, topRight.Y, bottomRightX, bottomRightY, bottomLeft.X, bottomLeft.Y);

            return transform;
        };

        this.sampleGrid=function( image,  transform,  dimension) {

            var sampler = GridSampler;
            return sampler.sampleGrid3(image, dimension, transform);
        };

        this.processFinderPatternInfo = function( info) {

            var topLeft = info.TopLeft;
            var topRight = info.TopRight;
            var bottomLeft = info.BottomLeft;

            var moduleSize = this.calculateModuleSize(topLeft, topRight, bottomLeft);
            if (moduleSize < 1.0) {
                throw "Error";
            }
            var dimension = this.computeDimension(topLeft, topRight, bottomLeft, moduleSize);
            var provisionalVersion = Version.getProvisionalVersionForDimension(dimension);
            var modulesBetweenFPCenters = provisionalVersion.DimensionForVersion - 7;

            var alignmentPattern = null;
            // Anything above version 1 has an alignment pattern
            if (provisionalVersion.AlignmentPatternCenters.length > 0) {

                // Guess where a "bottom right" finder pattern would have been
                var bottomRightX = topRight.X - topLeft.X + bottomLeft.X;
                var bottomRightY = topRight.Y - topLeft.Y + bottomLeft.Y;

                // Estimate that alignment pattern is closer by 3 modules
                // from "bottom right" to known top left location
                var correctionToTopLeft = 1.0 - 3.0 /  modulesBetweenFPCenters;
                var estAlignmentX = Math.floor (topLeft.X + correctionToTopLeft * (bottomRightX - topLeft.X));
                var estAlignmentY = Math.floor (topLeft.Y + correctionToTopLeft * (bottomRightY - topLeft.Y));

                // Kind of arbitrary -- expand search radius before giving up
                for (var i = 4; i <= 16; i <<= 1) {
                    //try
                    //{
                    alignmentPattern = this.findAlignmentInRegion(moduleSize, estAlignmentX, estAlignmentY,  i);
                    break;
                    //}
                    //catch (re)
                    //{
                    // try next round
                    //}
                }
                // If we didn't find alignment pattern... well try anyway without it
            }

            var transform = this.createTransform(topLeft, topRight, bottomLeft, alignmentPattern, dimension);

            var bits = this.sampleGrid(this.image, transform, dimension);

            var points;
            if (alignmentPattern == null) {
                points = [bottomLeft, topLeft, topRight];
            }
            else {
                points = [bottomLeft, topLeft, topRight, alignmentPattern];
            }
            return new DetectorResult(bits, points);
        };



        this.detect=function() {
            var info =  new FinderPatternFinder().findFinderPattern(this.image);

            return this.processFinderPatternInfo(info);
        }
    }

//

    var FORMAT_INFO_MASK_QR = 0x5412;
    var FORMAT_INFO_DECODE_LOOKUP = [[0x5412, 0x00], [0x5125, 0x01], [0x5E7C, 0x02], [0x5B4B, 0x03], [0x45F9, 0x04], [0x40CE, 0x05], [0x4F97, 0x06], [0x4AA0, 0x07], [0x77C4, 0x08], [0x72F3, 0x09], [0x7DAA, 0x0A], [0x789D, 0x0B], [0x662F, 0x0C], [0x6318, 0x0D], [0x6C41, 0x0E], [0x6976, 0x0F], [0x1689, 0x10], [0x13BE, 0x11], [0x1CE7, 0x12], [0x19D0, 0x13], [0x0762, 0x14], [0x0255, 0x15], [0x0D0C, 0x16], [0x083B, 0x17], [0x355F, 0x18], [0x3068, 0x19], [0x3F31, 0x1A], [0x3A06, 0x1B], [0x24B4, 0x1C], [0x2183, 0x1D], [0x2EDA, 0x1E], [0x2BED, 0x1F]];
    var BITS_SET_IN_HALF_BYTE = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];


    function FormatInformation(formatInfo) {
        this.errorCorrectionLevel = ErrorCorrectionLevel.forBits((formatInfo >> 3) & 0x03);
        this.dataMask =  (formatInfo & 0x07);

        this.__defineGetter__("ErrorCorrectionLevel", function() {
            return this.errorCorrectionLevel;
        });
        this.__defineGetter__("DataMask", function() {
            return this.dataMask;
        });
        this.GetHashCode=function() {
            return (this.errorCorrectionLevel.ordinal() << 3) |  dataMask;
        };
        this.Equals=function( o)
        {
            var other =  o;
            return this.errorCorrectionLevel == other.errorCorrectionLevel && this.dataMask == other.dataMask;
        }
    }

    FormatInformation.numBitsDiffering=function( a,  b) {
        a ^= b; // a now has a 1 bit exactly where its bit differs with b's
        // Count bits set quickly with a series of lookups:
        return BITS_SET_IN_HALF_BYTE[a & 0x0F] + BITS_SET_IN_HALF_BYTE[(URShift(a, 4) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(URShift(a, 8) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(URShift(a, 12) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(URShift(a, 16) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(URShift(a, 20) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(URShift(a, 24) & 0x0F)] + BITS_SET_IN_HALF_BYTE[(URShift(a, 28) & 0x0F)];
    };

    FormatInformation.decodeFormatInformation=function( maskedFormatInfo) {
        var formatInfo = FormatInformation.doDecodeFormatInformation(maskedFormatInfo);
        if (formatInfo != null) {
            return formatInfo;
        }
        // Should return null, but, some QR codes apparently
        // do not mask this info. Try again by actually masking the pattern
        // first
        return FormatInformation.doDecodeFormatInformation(maskedFormatInfo ^ FORMAT_INFO_MASK_QR);
    };
    FormatInformation.doDecodeFormatInformation=function( maskedFormatInfo) {
        // Find the int in FORMAT_INFO_DECODE_LOOKUP with fewest bits differing
        var bestDifference = 0xffffffff;
        var bestFormatInfo = 0;
        for (var i = 0; i < FORMAT_INFO_DECODE_LOOKUP.length; i++) {
            var decodeInfo = FORMAT_INFO_DECODE_LOOKUP[i];
            var targetInfo = decodeInfo[0];
            if (targetInfo == maskedFormatInfo) {
                // Found an exact match
                return new FormatInformation(decodeInfo[1]);
            }
            var bitsDifference = this.numBitsDiffering(maskedFormatInfo, targetInfo);
            if (bitsDifference < bestDifference) {
                bestFormatInfo = decodeInfo[1];
                bestDifference = bitsDifference;
            }
        }
        // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits
        // differing means we found a match
        if (bestDifference <= 3) {
            return new FormatInformation(bestFormatInfo);
        }
        return null;
    };


    //

    function ErrorCorrectionLevel(ordinal,  bits, name) {
        this.ordinal_Renamed_Field = ordinal;
        this.bits = bits;
        this.name = name;
        this.__defineGetter__("Bits", function() {
            return this.bits;
        });
        this.__defineGetter__("Name", function() {
            return this.name;
        });
        this.ordinal=function() {
            return this.ordinal_Renamed_Field;
        }
    }

    ErrorCorrectionLevel.forBits=function( bits) {
        if (bits < 0 || bits >= FOR_BITS.length) {
            throw "ArgumentException";
        }
        return FOR_BITS[bits];
    };

    var L = new ErrorCorrectionLevel(0, 0x01, "L");
    var M = new ErrorCorrectionLevel(1, 0x00, "M");
    var Q = new ErrorCorrectionLevel(2, 0x03, "Q");
    var H = new ErrorCorrectionLevel(3, 0x02, "H");
    var FOR_BITS = [M, L, H, Q];


    //


    function BitMatrix( width,  height) {
        if(!height) height=width;

        if (width < 1 || height < 1) {
            throw "Both dimensions must be greater than 0";
        }
        this.width = width;
        this.height = height;
        var rowSize = width >> 5;
        if ((width & 0x1f) != 0) {
            rowSize++;
        }
        this.rowSize = rowSize;
        this.bits = new Array(rowSize * height);
        for(var i=0;i<this.bits.length;i++)
            this.bits[i]=0;

        this.__defineGetter__("Width", function() {
            return this.width;
        });
        this.__defineGetter__("Height", function() {
            return this.height;
        });
        this.__defineGetter__("Dimension", function() {
            if (this.width != this.height) {
                throw "Can't call getDimension() on a non-square matrix";
            }
            return this.width;
        });

        this.get_Renamed=function( x,  y) {
            var offset = y * this.rowSize + (x >> 5);
            return ((URShift(this.bits[offset], (x & 0x1f))) & 1) != 0;
        };
        this.set_Renamed=function( x,  y) {
            var offset = y * this.rowSize + (x >> 5);
            this.bits[offset] |= 1 << (x & 0x1f);
        };
        this.flip=function( x,  y) {
            var offset = y * this.rowSize + (x >> 5);
            this.bits[offset] ^= 1 << (x & 0x1f);
        };
        this.clear=function() {
            var max = this.bits.length;
            for (var i = 0; i < max; i++)
            {
                this.bits[i] = 0;
            }
        };
        this.setRegion=function( left,  top,  width,  height) {
            if (top < 0 || left < 0)
            {
                throw "Left and top must be nonnegative";
            }
            if (height < 1 || width < 1)
            {
                throw "Height and width must be at least 1";
            }
            var right = left + width;
            var bottom = top + height;
            if (bottom > this.height || right > this.width)
            {
                throw "The region must fit inside the matrix";
            }
            for (var y = top; y < bottom; y++)
            {
                var offset = y * this.rowSize;
                for (var x = left; x < right; x++)
                {
                    this.bits[offset + (x >> 5)] |= 1 << (x & 0x1f);
                }
            }
        }
    }

    //

    function DataBlock(numDataCodewords,  codewords) {
        this.numDataCodewords = numDataCodewords;
        this.codewords = codewords;

        this.__defineGetter__("NumDataCodewords", function()
        {
            return this.numDataCodewords;
        });
        this.__defineGetter__("Codewords", function()
        {
            return this.codewords;
        });
    }

    DataBlock.getDataBlocks=function(rawCodewords,  version,  ecLevel) {

        if (rawCodewords.length != version.TotalCodewords)
        {
            throw "ArgumentException";
        }

        // Figure out the number and size of data blocks used by this version and
        // error correction level
        var ecBlocks = version.getECBlocksForLevel(ecLevel);

        // First count the total number of data blocks
        var totalBlocks = 0;
        var ecBlockArray = ecBlocks.getECBlocks();
        for (var i = 0; i < ecBlockArray.length; i++) {
            totalBlocks += ecBlockArray[i].Count;
        }

        // Now establish DataBlocks of the appropriate size and number of data codewords
        var result = new Array(totalBlocks);
        var numResultBlocks = 0;
        for (var j = 0; j < ecBlockArray.length; j++) {
            var ecBlock = ecBlockArray[j];
            for (var i = 0; i < ecBlock.Count; i++)
            {
                var numDataCodewords = ecBlock.DataCodewords;
                var numBlockCodewords = ecBlocks.ECCodewordsPerBlock + numDataCodewords;
                result[numResultBlocks++] = new DataBlock(numDataCodewords, new Array(numBlockCodewords));
            }
        }

        // All blocks have the same amount of data, except that the last n
        // (where n may be 0) have 1 more byte. Figure out where these start.
        var shorterBlocksTotalCodewords = result[0].codewords.length;
        var longerBlocksStartAt = result.length - 1;
        while (longerBlocksStartAt >= 0) {
            var numCodewords = result[longerBlocksStartAt].codewords.length;
            if (numCodewords == shorterBlocksTotalCodewords)
            {
                break;
            }
            longerBlocksStartAt--;
        }
        longerBlocksStartAt++;

        var shorterBlocksNumDataCodewords = shorterBlocksTotalCodewords - ecBlocks.ECCodewordsPerBlock;
        // The last elements of result may be 1 element longer;
        // first fill out as many elements as all of them have
        var rawCodewordsOffset = 0;
        for (var i = 0; i < shorterBlocksNumDataCodewords; i++) {
            for (var j = 0; j < numResultBlocks; j++)
            {
                result[j].codewords[i] = rawCodewords[rawCodewordsOffset++];
            }
        }
        // Fill out the last data block in the longer ones
        for (var j = longerBlocksStartAt; j < numResultBlocks; j++) {
            result[j].codewords[shorterBlocksNumDataCodewords] = rawCodewords[rawCodewordsOffset++];
        }
        // Now add in error correction blocks
        var max = result[0].codewords.length;
        for (var i = shorterBlocksNumDataCodewords; i < max; i++) {
            for (var j = 0; j < numResultBlocks; j++) {
                var iOffset = j < longerBlocksStartAt?i:i + 1;
                result[j].codewords[iOffset] = rawCodewords[rawCodewordsOffset++];
            }
        }
        return result;
    };

    //

    function BitMatrixParser(bitMatrix) {
        var dimension = bitMatrix.Dimension;
        if (dimension < 21 || (dimension & 0x03) != 1) {
            throw "Error BitMatrixParser";
        }
        this.bitMatrix = bitMatrix;
        this.parsedVersion = null;
        this.parsedFormatInfo = null;

        this.copyBit=function( i,  j,  versionBits) {
            return this.bitMatrix.get_Renamed(i, j)?(versionBits << 1) | 0x1:versionBits << 1;
        }

        this.readFormatInformation=function() {
            if (this.parsedFormatInfo != null)
            {
                return this.parsedFormatInfo;
            }

            // Read top-left format info bits
            var formatInfoBits = 0;
            for (var i = 0; i < 6; i++) {
                formatInfoBits = this.copyBit(i, 8, formatInfoBits);
            }
            // .. and skip a bit in the timing pattern ...
            formatInfoBits = this.copyBit(7, 8, formatInfoBits);
            formatInfoBits = this.copyBit(8, 8, formatInfoBits);
            formatInfoBits = this.copyBit(8, 7, formatInfoBits);
            // .. and skip a bit in the timing pattern ...
            for (var j = 5; j >= 0; j--) {
                formatInfoBits = this.copyBit(8, j, formatInfoBits);
            }

            this.parsedFormatInfo = FormatInformation.decodeFormatInformation(formatInfoBits);
            if (this.parsedFormatInfo != null) {
                return this.parsedFormatInfo;
            }

            // Hmm, failed. Try the top-right/bottom-left pattern
            var dimension = this.bitMatrix.Dimension;
            formatInfoBits = 0;
            var iMin = dimension - 8;
            for (var i = dimension - 1; i >= iMin; i--) {
                formatInfoBits = this.copyBit(i, 8, formatInfoBits);
            }
            for (var j = dimension - 7; j < dimension; j++) {
                formatInfoBits = this.copyBit(8, j, formatInfoBits);
            }

            this.parsedFormatInfo = FormatInformation.decodeFormatInformation(formatInfoBits);
            if (this.parsedFormatInfo != null) {
                return this.parsedFormatInfo;
            }
            throw "Error readFormatInformation";
        }
        this.readVersion=function() {

            if (this.parsedVersion != null) {
                return this.parsedVersion;
            }

            var dimension = this.bitMatrix.Dimension;

            var provisionalVersion = (dimension - 17) >> 2;
            if (provisionalVersion <= 6) {
                return Version.getVersionForNumber(provisionalVersion);
            }

            // Read top-right version info: 3 wide by 6 tall
            var versionBits = 0;
            var ijMin = dimension - 11;
            for (var j = 5; j >= 0; j--) {
                for (var i = dimension - 9; i >= ijMin; i--) {
                    versionBits = this.copyBit(i, j, versionBits);
                }
            }

            this.parsedVersion = Version.decodeVersionInformation(versionBits);
            if (this.parsedVersion != null && this.parsedVersion.DimensionForVersion == dimension) {
                return this.parsedVersion;
            }

            // Hmm, failed. Try bottom left: 6 wide by 3 tall
            versionBits = 0;
            for (var i = 5; i >= 0; i--) {
                for (var j = dimension - 9; j >= ijMin; j--) {
                    versionBits = this.copyBit(i, j, versionBits);
                }
            }

            this.parsedVersion = Version.decodeVersionInformation(versionBits);
            if (this.parsedVersion != null && this.parsedVersion.DimensionForVersion == dimension) {
                return this.parsedVersion;
            }
            throw "Error readVersion";
        }
        this.readCodewords=function() {

            var formatInfo = this.readFormatInformation();
            var version = this.readVersion();

            // Get the data mask for the format used in this QR Code. This will exclude
            // some bits from reading as we wind through the bit matrix.
            var dataMask = DataMask.forReference( formatInfo.DataMask);
            var dimension = this.bitMatrix.Dimension;
            dataMask.unmaskBitMatrix(this.bitMatrix, dimension);

            var functionPattern = version.buildFunctionPattern();

            var readingUp = true;
            var result = new Array(version.TotalCodewords);
            var resultOffset = 0;
            var currentByte = 0;
            var bitsRead = 0;
            // Read columns in pairs, from right to left
            for (var j = dimension - 1; j > 0; j -= 2) {
                if (j == 6) {
                    // Skip whole column with vertical alignment pattern;
                    // saves time and makes the other code proceed more cleanly
                    j--;
                }
                // Read alternatingly from bottom to top then top to bottom
                for (var count = 0; count < dimension; count++) {
                    var i = readingUp?dimension - 1 - count:count;
                    for (var col = 0; col < 2; col++) {
                        // Ignore bits covered by the function pattern
                        if (!functionPattern.get_Renamed(j - col, i)) {
                            // Read a bit
                            bitsRead++;
                            currentByte <<= 1;
                            if (this.bitMatrix.get_Renamed(j - col, i)) {
                                currentByte |= 1;
                            }
                            // If we've made a whole byte, save it off
                            if (bitsRead == 8) {
                                result[resultOffset++] =  currentByte;
                                bitsRead = 0;
                                currentByte = 0;
                            }
                        }
                    }
                }
                readingUp ^= true; // readingUp = !readingUp; // switch directions
            }
            if (resultOffset != version.TotalCodewords) {
                throw "Error readCodewords";
            }
            return result;
        }
    }

    //

    DataMask = {};

    DataMask.forReference = function(reference) {
        if (reference < 0 || reference > 7)
        {
            throw "System.ArgumentException";
        }
        return DataMask.DATA_MASKS[reference];
    }

    function DataMask000() {
        this.unmaskBitMatrix=function(bits,  dimension) {
            for (var i = 0; i < dimension; i++) {
                for (var j = 0; j < dimension; j++) {
                    if (this.isMasked(i, j)) {
                        bits.flip(j, i);
                    }
                }
            }
        }
        this.isMasked=function( i,  j) {
            return ((i + j) & 0x01) == 0;
        }
    }

    function DataMask001() {
        this.unmaskBitMatrix=function(bits,  dimension) {
            for (var i = 0; i < dimension; i++) {
                for (var j = 0; j < dimension; j++) {
                    if (this.isMasked(i, j)) {
                        bits.flip(j, i);
                    }
                }
            }
        }
        this.isMasked=function( i,  j) {
            return (i & 0x01) == 0;
        }
    }

    function DataMask010() {
        this.unmaskBitMatrix=function(bits,  dimension) {
            for (var i = 0; i < dimension; i++) {
                for (var j = 0; j < dimension; j++) {
                    if (this.isMasked(i, j)) {
                        bits.flip(j, i);
                    }
                }
            }
        }
        this.isMasked=function( i,  j) {
            return j % 3 == 0;
        }
    }

    function DataMask011() {
        this.unmaskBitMatrix=function(bits,  dimension) {
            for (var i = 0; i < dimension; i++) {
                for (var j = 0; j < dimension; j++) {
                    if (this.isMasked(i, j)) {
                        bits.flip(j, i);
                    }
                }
            }
        }
        this.isMasked=function( i,  j) {
            return (i + j) % 3 == 0;
        }
    }

    function DataMask100() {
        this.unmaskBitMatrix=function(bits,  dimension) {
            for (var i = 0; i < dimension; i++) {
                for (var j = 0; j < dimension; j++) {
                    if (this.isMasked(i, j)) {
                        bits.flip(j, i);
                    }
                }
            }
        }
        this.isMasked=function( i,  j) {
            return (((URShift(i, 1)) + (j / 3)) & 0x01) == 0;
        }
    }

    function DataMask101() {
        this.unmaskBitMatrix=function(bits,  dimension) {
            for (var i = 0; i < dimension; i++) {
                for (var j = 0; j < dimension; j++) {
                    if (this.isMasked(i, j)) {
                        bits.flip(j, i);
                    }
                }
            }
        }
        this.isMasked=function( i,  j) {
            var temp = i * j;
            return (temp & 0x01) + (temp % 3) == 0;
        }
    }

    function DataMask110() {
        this.unmaskBitMatrix=function(bits,  dimension) {
            for (var i = 0; i < dimension; i++) {
                for (var j = 0; j < dimension; j++) {
                    if (this.isMasked(i, j)) {
                        bits.flip(j, i);
                    }
                }
            }
        }
        this.isMasked=function( i,  j) {
            var temp = i * j;
            return (((temp & 0x01) + (temp % 3)) & 0x01) == 0;
        }
    }
    function DataMask111() {
        this.unmaskBitMatrix=function(bits,  dimension) {
            for (var i = 0; i < dimension; i++) {
                for (var j = 0; j < dimension; j++) {
                    if (this.isMasked(i, j)) {
                        bits.flip(j, i);
                    }
                }
            }
        }
        this.isMasked=function( i,  j) {
            return ((((i + j) & 0x01) + ((i * j) % 3)) & 0x01) == 0;
        }
    }

    DataMask.DATA_MASKS = [new DataMask000(), new DataMask001(), new DataMask010(), new DataMask011(), new DataMask100(), new DataMask101(), new DataMask110(), new DataMask111()];

    //

    function ReedSolomonDecoder(field) {
        this.field = field;
        this.decode=function(received,  twoS) {
            var poly = new GF256Poly(this.field, received);
            var syndromeCoefficients = new Array(twoS);
            for(var i=0;i<syndromeCoefficients.length;i++)syndromeCoefficients[i]=0;
            var dataMatrix = false;//this.field.Equals(GF256.DATA_MATRIX_FIELD);
            var noError = true;
            for (var i = 0; i < twoS; i++) {
                // Thanks to sanfordsquires for this fix:
                var eval_ = poly.evaluateAt(this.field.exp(dataMatrix?i + 1:i));
                syndromeCoefficients[syndromeCoefficients.length - 1 - i] = eval_;
                if (eval_ != 0) {
                    noError = false;
                }
            }
            if (noError) {
                return ;
            }
            var syndrome = new GF256Poly(this.field, syndromeCoefficients);
            var sigmaOmega = this.runEuclideanAlgorithm(this.field.buildMonomial(twoS, 1), syndrome, twoS);
            var sigma = sigmaOmega[0];
            var omega = sigmaOmega[1];
            var errorLocations = this.findErrorLocations(sigma);
            var errorMagnitudes = this.findErrorMagnitudes(omega, errorLocations, dataMatrix);
            for (var i = 0; i < errorLocations.length; i++) {
                var position = received.length - 1 - this.field.log(errorLocations[i]);
                if (position < 0)
                {
                    throw "ReedSolomonException Bad error location";
                }
                received[position] = GF256.addOrSubtract(received[position], errorMagnitudes[i]);
            }
        }

        this.runEuclideanAlgorithm=function( a,  b,  R) {
            // Assume a's degree is >= b's
            if (a.Degree < b.Degree)
            {
                var temp = a;
                a = b;
                b = temp;
            }

            var rLast = a;
            var r = b;
            var sLast = this.field.One;
            var s = this.field.Zero;
            var tLast = this.field.Zero;
            var t = this.field.One;

            // Run Euclidean algorithm until r's degree is less than R/2
            while (r.Degree >= Math.floor(R / 2)) {
                var rLastLast = rLast;
                var sLastLast = sLast;
                var tLastLast = tLast;
                rLast = r;
                sLast = s;
                tLast = t;

                // Divide rLastLast by rLast, with quotient in q and remainder in r
                if (rLast.Zero) {
                    // Oops, Euclidean algorithm already terminated?
                    throw "r_{i-1} was zero";
                }
                r = rLastLast;
                var q = this.field.Zero;
                var denominatorLeadingTerm = rLast.getCoefficient(rLast.Degree);
                var dltInverse = this.field.inverse(denominatorLeadingTerm);
                while (r.Degree >= rLast.Degree && !r.Zero) {
                    var degreeDiff = r.Degree - rLast.Degree;
                    var scale = this.field.multiply(r.getCoefficient(r.Degree), dltInverse);
                    q = q.addOrSubtract(this.field.buildMonomial(degreeDiff, scale));
                    r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
                    //r.EXE();
                }

                s = q.multiply1(sLast).addOrSubtract(sLastLast);
                t = q.multiply1(tLast).addOrSubtract(tLastLast);
            }

            var sigmaTildeAtZero = t.getCoefficient(0);
            if (sigmaTildeAtZero == 0) {
                throw "ReedSolomonException sigmaTilde(0) was zero";
            }

            var inverse = this.field.inverse(sigmaTildeAtZero);
            var sigma = t.multiply2(inverse);
            var omega = r.multiply2(inverse);
            return [sigma, omega];
        }
        this.findErrorLocations=function( errorLocator) {
            // This is a direct application of Chien's search
            var numErrors = errorLocator.Degree;
            if (numErrors == 1) {
                // shortcut
                return new Array(errorLocator.getCoefficient(1));
            }
            var result = new Array(numErrors);
            var e = 0;
            for (var i = 1; i < 256 && e < numErrors; i++) {
                if (errorLocator.evaluateAt(i) == 0)
                {
                    result[e] = this.field.inverse(i);
                    e++;
                }
            }
            if (e != numErrors) {
                throw "Error locator degree does not match number of roots";
            }
            return result;
        }
        this.findErrorMagnitudes=function( errorEvaluator,  errorLocations,  dataMatrix) {
            // This is directly applying Forney's Formula
            var s = errorLocations.length;
            var result = new Array(s);
            for (var i = 0; i < s; i++) {
                var xiInverse = this.field.inverse(errorLocations[i]);
                var denominator = 1;
                for (var j = 0; j < s; j++)
                {
                    if (i != j) {
                        denominator = this.field.multiply(denominator, GF256.addOrSubtract(1, this.field.multiply(errorLocations[j], xiInverse)));
                    }
                }
                result[i] = this.field.multiply(errorEvaluator.evaluateAt(xiInverse), this.field.inverse(denominator));
                // Thanks to sanfordsquires for this fix:
                if (dataMatrix) {
                    result[i] = this.field.multiply(result[i], xiInverse);
                }
            }
            return result;
        }
    }
}());
