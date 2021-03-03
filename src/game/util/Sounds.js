export function playSound(sound, isLoop, value = 0.5) {
  console.log(value)
  sound.currentTime = 0
  sound.play()
  sound.volume = value 
  isLoop ? sound.loop = true : sound.loop = false
}

export function stopSound(sound) {
  sound.pause()
  sound.currentTime = 0
}