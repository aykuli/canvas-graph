// todo Настроить преттиер так, чтоб ставил точка запятой после стоки кода
// todo настроить вебпак для scss
// todo может есть способ их сгенерировать по распределнию Гаусса
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
const DELTA_PAGE_1 = 40
const DELTA_PAGE_2 = 80
let [x0, x1] = [80, 80]
let y0 = DOTS_PAGE_1[0]

const root = document.getElementById("#root")
const canvas = document.getElementById("canvas")
const paginator = document.querySelector(".btns__page")
const prevBtn = document.querySelector(".btn__prev")
const nextBtn = document.querySelector(".btn__next")
const btn__restart = document.querySelector(".btn__restart")
const ctx = canvas.getContext ? canvas.getContext("2d") : null

function draw() {
  paginator.innerText = 1
  x0 = 80
  y0 = DOTS_PAGE_2[0]

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
        ctx.moveTo(x0 + i * DELTA_PAGE_1, y)
        ctx.lineTo(x0 + (i + 1) * DELTA_PAGE_1, DOTS_PAGE_1[i + 1])
        ctx.stroke()
      }

      const circle = new Path2D()
      ctx.fillStyle = i % 2 ? "white" : "blue"
      circle.arc(x0 + i * DELTA_PAGE_1, y, 5, 0, 2 * Math.PI)
      ctx.fill(circle)
      ctx.stroke(circle)
      ctx.font = "bold 48px serif"
      ctx.fillText(i, x0 + i * DELTA_PAGE_1, y)
    })
  }
}

var [x, y] = [[], []]
var delta = []

for (let j = 0; j < DOTS_PAGE_1.length; j++) {
  x.push(80 + j * DELTA_PAGE_1);
  y.push(DOTS_PAGE_1[j])
}
console.log('x: ', x)

function animation() {
  console.log('if x[1]: ', x[1])
  console.log("animate")
  paginator.innerText = 2
  // ctx.globalCompositeOperation = "source-over"
  ctx.clearRect(40, 40, 700, 340)

  y.map((item, i) => {
    // ctx.clearRect(40, 40, 700, 340)

    // if (i !== DOTS_PAGE_1.length - 1) {
    //   ctx.beginPath()
    //   ctx.moveTo(x, y)
    //   ctx.lineTo(x + DELTA_PAGE_1, DOTS_PAGE_1[i + 1])
    //   ctx.stroke()
    // }

    const circle = new Path2D()
    ctx.fillStyle = i % 2 ? "white" : "blue"
    circle.arc(x[i], item, 5, 0, 2 * Math.PI)
    ctx.fill(circle)
    ctx.stroke(circle)
    ctx.font = "bold 48px serif"
    ctx.fillText(i, x[i], item)
  })

  if ((x[1] <= DELTA_PAGE_1) || (y[1] >= DOTS_PAGE_2[1])) {
    x[1]++
    y[1]--
    setTimeout("animation()", 10)
  }

  if ((x[2] >= DELTA_PAGE_1) || (y[2] >= DOTS_PAGE_2[1])) {
    x[2]--
    y[2]--
    setTimeout("animation()", 10)
  }
}

let y1 = 250
function animation0() {
  paginator.innerText = 2
  ctx.clearRect(40, 40, 700, 340)

  const circle = new Path2D()
  ctx.fillStyle = "white"
  circle.arc(x1, y1, 5, 0, 2 * Math.PI)
  ctx.fill(circle)
  ctx.stroke(circle)
  ctx.font = "bold 48px serif"
  ctx.fillText(0, x1, y1)

  if (x1 <= 160 && y1 >= 215) {
    x1 += 1
    y1++
    setTimeout("animation0()", 10)
  }
}
