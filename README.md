# app.web-cam-qr
QR WebCamScanner aplication - modified and optimized version

## Usage

- Add to page
```html
<link href="./qrWebScanner/qr-web-scanner.css" rel="stylesheet" />
<script src="./qrWebScanner/qr-web-scanner.js"></script>
```
or attach minified file
```html
<script src="./qrWebScanner/qr-web-scanner.min.js"></script>
```

- initialization
```javascript
    QRWebScanner.init({
        container: 'your-container'
    
    }, function(data){
        data = 'your result'
    });
```

- See and try [example] (http://maplemap.github.io/app.web-cam-qr/)


-- [origin](https://github.com/LazarSoft/jsqrcode) by Lazar Laszlo
