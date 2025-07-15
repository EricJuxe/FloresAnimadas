const colores = [
  ['#ff69b4', '#ff1493'], // rosa
  ['#ffb347', '#ff6347'], // naranja
  ['#87ceeb', '#4682b4'], // azul
  ['#98fb98', '#2e8b57'], // verde
  ['#dda0dd', '#800080'], // morado
  ['#ffff99', '#ffcc00']  // amarillo
];

function crearFlor(x, y, size, gradiente) {
  const flor = document.createElement('div');
  flor.classList.add('gerbera');
  flor.style.width = `${size}px`;
  flor.style.height = `${size}px`;
  flor.style.left = `${x}px`;
  flor.style.top = `${y}px`;

  const numPetalos = 16;
  for (let i = 0; i < numPetalos; i++) {
    const angle = (360 / numPetalos) * i;

    const petalWrapper = document.createElement('div');
    petalWrapper.style.position = 'absolute';
    petalWrapper.style.top = '50%';
    petalWrapper.style.left = '50%';
    petalWrapper.style.transform = `rotate(${angle}deg)`;
    petalWrapper.style.transformOrigin = 'center';

    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.background = `radial-gradient(circle at center, ${gradiente[0]}, ${gradiente[1]})`;
    petal.style.transform = 'translate(-50%, -100%)';

    petalWrapper.appendChild(petal);
    flor.appendChild(petalWrapper);
  }

  const centro = document.createElement('div');
  centro.classList.add('center');
  flor.appendChild(centro);

  document.querySelector('.flor-container').appendChild(flor);
}

document.getElementById('crearFlores').addEventListener('click', () => {
  const contenedor = document.querySelector('.flor-container');
  const ancho = contenedor.offsetWidth;
  const alto = contenedor.offsetHeight;

  let total = 50;
  let count = 0;
  const posiciones = [];

  // Vibración en móviles
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }

  // Cambiar texto temporalmente
  const boton = document.getElementById('crearFlores');
  boton.textContent = '!Te quiero mucho❤️!';
  setTimeout(() => {
    boton.textContent = 'Presióname';
  }, 2000);

  const interval = setInterval(() => {
    if (count >= total) {
      clearInterval(interval);
      return;
    }

    let intentos = 0;
    let x, y, size, valido = false;

    while (!valido && intentos < 100) {
      size = 60 + Math.random() * 60;
      x = Math.random() * (ancho - size);
      y = Math.random() * (alto - size);

      valido = !posiciones.some(pos => {
        const dx = pos.x - x;
        const dy = pos.y - y;
        const distancia = Math.sqrt(dx * dx + dy * dy);
        return distancia < size;
      });

      intentos++;
    }

    if (valido) {
      const color = colores[Math.floor(Math.random() * colores.length)];
      crearFlor(x, y, size, color);
      posiciones.push({ x, y });
      count++;
    }

  }, 250);
});
