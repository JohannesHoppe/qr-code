let input, detectButton, container;

document.addEventListener('DOMContentLoaded', () => {

  input = document.getElementById('text');
  container = document.getElementById('container');
  detectButton = document.getElementById('detect');

  refreshQr();
  input.focus();

  input.addEventListener('input', refreshQr);
  detectButton.addEventListener('click', detect);
});

function refreshQr() {

  container.innerHTML = '';

  const text = input.value;
  if (text) {
    const qr = QRCode.generateSVG(text, {
      ecclevel: 'M',
      fillcolor: 'white',
      textcolor: 'black',
      margin: 4,
      modulesize: 8
    });

    container.appendChild(qr);
  }
}

// see: https://daily-dev-tips.com/posts/detecting-barcodes-from-the-webcam/
async function detect() {

  container.innerHTML = '';

  const barcodeDetector = new BarcodeDetector();
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' }
  });

  const video = document.createElement('video');
  video.srcObject = mediaStream;
  video.autoplay = true;

  container.appendChild(video);
  let stop = false;

  function render() {

    barcodeDetector
      .detect(video)
      .then((barcodes) => {
        barcodes.forEach((barcode) => {
          input.value = barcode.rawValue;
          stop = true;
        });
      })
      // .catch(console.error);
  }

  (function renderLoop() {
    if (stop) {
      container.innerHTML = '';
      return;
    }
    requestAnimationFrame(renderLoop);
    render();
  })();
}
