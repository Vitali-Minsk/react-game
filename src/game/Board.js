import React, { useRef, useEffect, useState } from 'react'
import { render } from 'react-dom'
import { BallMovement } from './BallMovement'
import data from '../data'
import WallCollision from './util/WallCollision'
import Paddle from './Paddle'
import Bricks from './Brick'
import BrickCollision from './util/BrickColision'
import PaddleHit from './util/PaddleHit'
import PlayerStats from './playerStats'
import LevelCheck from './util/LevelCheck'
import FinishGame from './util/FinishGame'
import musicSound from '../assets/audio/music.mp3'
import { playSound, stopSound } from './util/Sounds'

let bricks = []

let {ballObj, paddleProps, brickObj, player} = data

export default function Board() {
  const canvasRef = useRef(null)

  const music = new Audio(musicSound)
  

  useEffect(() => {
    console.log('didmount')
    let requestId
    const render = () => {
      
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      paddleProps.y = canvas.height - 30

      let newBricketSet = Bricks(player.level, bricks, canvas, brickObj)

      if (newBricketSet && newBricketSet.length > 0) {
        bricks = newBricketSet
      }

      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      FinishGame(player, bricks, ballObj, paddleProps)

      PlayerStats(ctx, player, canvas)
      
      bricks.map((brick) => {
        return brick.draw(ctx)
      })

      BallMovement(ctx, ballObj)

      LevelCheck(bricks, player, canvas, ballObj)

      WallCollision(canvas, ballObj, player, paddleProps)

      let brickCollision;

      for (let i = 0; i < bricks.length; i++) {
        brickCollision = BrickCollision(ballObj, bricks[i])

        if (brickCollision.hit && !bricks[i].broke) {
          if (brickCollision.axis === 'X') {
            ballObj.dx = -ballObj.dx
            bricks[i].broke = true
          } else if (brickCollision.axis === 'Y') {
            ballObj.dy = -ballObj.dy
            bricks[i].broke = true
          }
          player.score += 10
        }
      }

      Paddle(ctx, canvas, paddleProps)

      PaddleHit(ballObj, paddleProps)
      
      requestId  = requestAnimationFrame(render)
    }
    
    render()

    playSound(music, true)

    return () => {
      cancelAnimationFrame(requestId)
      stopSound(music)
    }
  }, [])

  return (
    <canvas ref={canvasRef} id='canvas' width='800px' height='500px' onMouseMove={(event) => paddleProps.x = event.clientX - paddleProps.width / 2}>

    </canvas>
  )
}

// function playMusic() {
//   const audio = new Audio(musicSound)
//   audio.currentTime = 0
//   audio.play()
//   audio.loop = true
//   setMusic(audio)
// }

// function stopMusic(sound) {

// }
