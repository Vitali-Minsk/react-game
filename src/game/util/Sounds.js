export function playSound(sound, isLoop) {
  sound.currentTime = 0
  sound.play()
  isLoop ? sound.loop = true : sound.loop = false
}

export function stopSound(sound) {
  sound.pause()
  sound.currentTime = 0
}