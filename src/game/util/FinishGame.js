import ResetBall from './ResetBall'

export default function finishGame(player, bricks, ballObj, paddleProps) {
  if (!player.lives) {
    alert('game over, restart')
    player.lives = 3
    player.level = 1
    player.score = 0
    bricks.length = 0
    ResetBall(ballObj, paddleProps)
  }
}