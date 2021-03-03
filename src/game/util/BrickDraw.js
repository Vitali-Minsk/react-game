export default function brickDraw(ctx, brick) {
  ctx.beginPath()
  ctx.rect(brick.x, brick.y, brick.width, brick.height)
  ctx.fillStyle = brick.broke ? '#134959' : brick.colors[1]
  ctx.strokeStyle = brick.broke ? '#134959' : '#134959'
  ctx.lineWidth = 5
  ctx.fillStyle = brick.broke ? '#134959' : brick.colors[1]
  ctx.shadowBlur = 0
  ctx.shadowColor = 'blue'
  ctx.strokeRect(brick.x, brick.y, brick.width, brick.height)
  ctx.fill()
}