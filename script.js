const CONFIG = {
  dotsRadius: 5,
  deltaX: 40,
  initXOffset: 80,
  fps: 40,
  dotColor: 'white',
};
const TWO_PI = 2 * Math.PI;

const DOTS_PAGE_1 = [270, 240, 270, 300, 270, 260, 290, 190, 240, 210, 310, 230, 200, 280, 250, 270];
const DOTS_PAGE_2 = [270, 215, 235, 225, 270, 250, 265, 210, 235];

const root = document.getElementById('#root');
const canvas = document.getElementById('canvas');
const paginator = document.querySelector('.btns__page');
const prevBtn = document.querySelector('.btn__prev');
const nextBtn = document.querySelector('.btn__next');
const btn__restart = document.querySelector('.btn__restart');
const ctx = canvas.getContext ? canvas.getContext('2d') : null;

let dots = [];
function setDotsInitState() {
  dots = [];
  for (let i = 0; i < DOTS_PAGE_1.length; i++) {
    const x0 = CONFIG.initXOffset + CONFIG.deltaX * i;
    const x1 = i % 2 ? CONFIG.initXOffset + (i + 1) * CONFIG.deltaX : CONFIG.initXOffset + i * CONFIG.deltaX;
    const y0 = DOTS_PAGE_1[i];
    const y1 = i % 2 ? DOTS_PAGE_2[(i + 1) / 2] : DOTS_PAGE_2[i / 2];
    const dx = (x1 - x0) / CONFIG.fps;
    const dy = (y1 - y0) / CONFIG.fps;

    dots.push({ x0, x1, y0, y1, dx, dy });
  }
}

function drawDot(x, y) {
  const circle = new Path2D();
  ctx.fillStyle = CONFIG.dotColor;
  circle.arc(x, y, CONFIG.dotsRadius, 0, TWO_PI);
  ctx.fill(circle);
  ctx.stroke(circle);
}

function drawLine(x0, y0, x1, y1) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function draw() {
  ctx.clearRect(40, 40, 700, 340);
  setDotsInitState();
  paginator.innerText = 1;

  if (ctx) {
    ctx.clearRect(40, 40, 700, 340);

    // Y coordinates line
    drawLine(35, 45, 35, 395);
    // X coordinates line
    drawLine(35, 395, 720, 395);

    DOTS_PAGE_1.map((y, i) => {
      if (i !== DOTS_PAGE_1.length - 1) {
        drawLine(
          CONFIG.initXOffset + i * CONFIG.deltaX,
          y,
          CONFIG.initXOffset + (i + 1) * CONFIG.deltaX,
          DOTS_PAGE_1[i + 1]
        );
      }
      drawDot(80 + i * CONFIG.deltaX, y);
    });
  }
}

let timer;
function animation() {
  clearTimeout(timer);
  paginator.innerText = 2;

  timer = setTimeout(() => {
    ctx.clearRect(40, 40, 700, 340);

    dots.map(({ x0, x1, y0, y1, dx, dy }, index) => {
      if (index < dots.length - 1) {
        drawLine(x0, y0, dots[index + 1].x0, dots[index + 1].y0);
      }
      drawDot(x0, y0);

      if ((dx > 0 && x0 < x1) || (dx < 0 && x0 > x1) || (dy > 0 && y0 < y1) || (dy < 0 && y0 > y1)) {
        dots[index].y0 += dy;
        dots[index].x0 += dx;
        animation(index);
      } else {
        dots[index].x0 = x1;
        dots[index].y0 = y1;
      }
    });
  }, 10);
}
