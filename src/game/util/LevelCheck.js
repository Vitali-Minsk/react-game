import data from '../../data'

export default function LevelCheck(bricks, player, canvas, ballObj) {
  let { brickObj, paddleProps } = data;
  let total = 0;
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i].broke === true) {
      total++;
    }
  }
  if (total === bricks.length) {
    player.level++;
    brickObj.y = 50;
  }
}