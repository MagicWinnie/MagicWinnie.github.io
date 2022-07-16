import QrScanner from "../qr-scanner.min.js";

const QrResult = document.getElementById('qr-result');

function setResult(label, result) {
    console.log(result.data);
    label.textContent = result.data;
    label.style.color = 'teal';
    clearTimeout(label.highlightTimeout);
    label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('paste', function (evt) {
        const clipboardItems = evt.clipboardData.items;
        const items = [].slice.call(clipboardItems).filter(function (item) {
            // Filter the image items only
            return item.type.indexOf('image') !== -1;
        });
        if (items.length === 0) {
            return;
        }

        const item = items[0];
        const blob = item.getAsFile();

        const imageEle = document.getElementById('preview');
        imageEle.src = URL.createObjectURL(blob);

        QrScanner.scanImage(blob, { returnDetailedScanResult: true })
            .then(result => setResult(QrResult, result))
            .catch(e => setResult(QrResult, { data: e || 'No QR code found.' }));
    });
});
function onReady() {
}
