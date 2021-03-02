import breakSound from '../../assets/audio/break.wav'

function playBreakSound() {
  const crash = new Audio(breakSound)
  crash.currentTime = 0
      // ping.volume = clamp(velocity / 20, 0, 1)
      crash.play()
}

export default function BrickCollision(circle, rect) {
  let distX = Math.abs(circle.x - rect.x - rect.width / 2)
  let distY = Math.abs(circle.y - rect.y - rect.height / 2)

  if (distX > rect.width / 2 + circle.rad) {
    return {
      hit: false
    }
  }
  if (distY > rect.height / 2 + circle.rad) {
    return {
      hit: false
    }
  }

  if (distX <= rect.width / 2) {
  playBreakSound()

    return {
      hit: true,
      axis: 'Y'
    }
  }
  if (distY <= rect.height / 2) {
  playBreakSound()

    return {
      hit: true,
      axis: 'X'
    }
  }

  let dx = distX - rect.width / 2
  let dy = distY - rect.height / 2


  return {
    hit: dx * dx + dy * dy <= circle.rad * circle.rad,
    axis: 'X'
  }
}