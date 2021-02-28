export default function WallCollision (canvas, ballObj) {
  if(ballObj.y - ballObj.rad <= 0 || ballObj.y + ballObj.rad >= canvas.height) {
    ballObj.dy = -ballObj.dy 
  }

  if(ballObj.x - ballObj.rad <= 0 || ballObj.x + ballObj.rad >= canvas.width) {
    ballObj.dx = -ballObj.dx
  }
}