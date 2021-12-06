document.addEventListener('DOMContentLoaded', () => {

  refreshQr();
  const input = document.getElementById('text');
  input.focus();
  input.select()

  input.addEventListener('input', refreshQr);

});

function refreshQr() {

  const container = document.getElementById('container');
  const text = document.getElementById('text').value;

  const qr = QRCode.generateSVG(text, {
    ecclevel: "M",
    fillcolor: "white",
    textcolor: "black",
    margin: 4,
    modulesize: 8
  });

  container.innerHTML = '';
  container.appendChild(qr);
}
