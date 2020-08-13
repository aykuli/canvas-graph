// todo Настроить преттиер так, чтоб ставил точка запятой после стоки кода
// todo настроить вебпак для scss
// todo может есть способ их сгенерировать по распределнию Гаусса
const DOTS = [
  { x: 80, y: 270 },
  { x: 140, y: 240 },
  { x: 200, y: 270 },
  { x: 260, y: 300 },
  { x: 320, y: 270 },
  { x: 380, y: 260 },
  { x: 440, y: 300 },
  { x: 500, y: 190 },
  { x: 560, y: 240 },
  { x: 600, y: 210 },
  { x: 660, y: 280 },
]

function draw() {
  const root = document.getElementById("#root")
  const canvas = document.getElementById("canvas")
  const paginator = document.querySelector(".btns__page")

  let page = 1
  paginator.innerText = `${page}/2`

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d")

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

    // кружочек
    DOTS.map(({ x, y }, i) => {
      var circle = new Path2D()
      // circle.moveTo(DOTS[i+1].x, DOTS[i+1].y);

      if (i !== DOTS.length - 1) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(DOTS[i + 1].x, DOTS[i + 1].y)
        ctx.stroke()
      }

      ctx.fillStyle = "white"
      circle.arc(x, y, 5, 0, 2 * Math.PI)
      ctx.fill(circle)
      ctx.stroke(circle)
    })
  } else {
    root.innerText =
      "Ваш браузер не поддерживает канвас. Вы не увидите этих прекрасных избражений."
  }
}
