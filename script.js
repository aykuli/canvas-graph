// todo Настроить преттиер так, чтоб ставил точка запятой после стоки кода
// todo настроить вебпак для scss
// todo может есть способ их сгенерировать по распределнию Гаусса
const CONFIG = {
  dotsRadius: 5,
  deltaX: 40,
  initXOffset: 80,
  fps: 50,
}
const TWO_PI = 2 * Math.PI

const DOTS_PAGE_1 = [
  270,
  240,
  270,
  300,
  270,
  260,
  290,
  190,
  240,
  210,
  310,
  230,
  200,
  280,
  250,
  270,
]
const DOTS_PAGE_2 = [270, 215, 235, 225, 270, 250, 265, 210, 235]

let dots = []
function setDotsInitState() {
  dots = []
  for (let i = 0; i < DOTS_PAGE_1.length; i++) {
    const x0 = CONFIG.initXOffset + CONFIG.deltaX * i
    const x1 =
      i % 2
        ? CONFIG.initXOffset + (i + 1) * CONFIG.deltaX
        : CONFIG.initXOffset + i * CONFIG.deltaX
    const y0 = DOTS_PAGE_1[i]
    const y1 = i % 2 ? DOTS_PAGE_2[(i + 1) / 2] : DOTS_PAGE_2[i / 2]
    const dx = (x1 - x0) / CONFIG.fps
    const dy = (y1 - y0) / CONFIG.fps

    dots.push({ x0, x1, y0, y1, dx, dy })
  }
  console.log("dots: ", dots)
}

const root = document.getElementById("#root")
const canvas = document.getElementById("canvas")
const paginator = document.querySelector(".btns__page")
const prevBtn = document.querySelector(".btn__prev")
const nextBtn = document.querySelector(".btn__next")
const btn__restart = document.querySelector(".btn__restart")
const ctx = canvas.getContext ? canvas.getContext("2d") : null

const drawDot = (index, x, y) => {
  const circle = new Path2D()
  ctx.fillStyle = index % 2 ? "white" : "blue"
  circle.arc(x, y, CONFIG.dotsRadius, 0, TWO_PI)
  ctx.fill(circle)
  ctx.stroke(circle)
}

function draw() {
  ctx.clearRect(40, 40, 700, 340)
  setDotsInitState()
  paginator.innerText = 1

  if (ctx) {
    ctx.clearRect(40, 40, 700, 340)

    // Y coordinates line
    ctx.beginPath()
    ctx.moveTo(35, 45)
    ctx.lineTo(35, 395)
    ctx.stroke()

    // X coordinates line
    ctx.beginPath()
    ctx.moveTo(35, 395)
    ctx.lineTo(720, 395)
    ctx.stroke()

    DOTS_PAGE_1.map((y, i) => {
      if (i !== DOTS_PAGE_1.length - 1) {
        ctx.beginPath()
        ctx.moveTo(CONFIG.initXOffset + i * CONFIG.deltaX, y)
        ctx.lineTo(
          CONFIG.initXOffset + (i + 1) * CONFIG.deltaX,
          DOTS_PAGE_1[i + 1]
        )
        ctx.stroke()
      }

      drawDot(i, 80 + i * CONFIG.deltaX, y)
    })
  }
}

let timer
function animation() {
  clearTimeout(timer)
  paginator.innerText = 2

  timer = setTimeout(() => {
    ctx.clearRect(40, 40, 700, 340)

    dots.map(({ x0, x1, y0, y1, dx, dy }, index) => {
      drawDot(index, x0, y0)

      if (
        (dx > 0 && x0 < x1) ||
        (dx < 0 && x0 > x1) ||
        (dy > 0 && y0 < y1) ||
        (dy < 0 && y0 > y1)
      ) {
        dots[index].y0 += dy
        dots[index].x0 += dx
        animation(index)
      } else {
        dots[index].x0 = x1
        dots[index].y0 = y1
      }
    })
  }, 10)
}
