import React, { useRef, useEffect, useState } from 'react'
import { render } from 'react-dom'
import { BallMovement } from './BallMovement'
import data from '../data'
import WallCollision from './util/WallCollision'
import Paddle from './Paddle'
import Bricks from './Bricks'
import BrickCollision from './util/BrickColision'
import PaddleHit from './util/PaddleHit'
import PlayerStats from './playerStats'
import LevelCheck from './util/LevelCheck'
import FinishGame from './util/FinishGame'
import musicSound from '../assets/audio/music.mp3'
import { playSound, stopSound } from './util/Sounds'
import BrickDraw from './util/BrickDraw'

let bricks = []

let localData
localStorage.getItem('localData') ? localData = JSON.parse(localStorage.getItem('localData')) : localData = data
localStorage.getItem('bricks') ? bricks = JSON.parse(localStorage.getItem('bricks')) : bricks = []

let {ballObj, paddleProps, brickObj, player} = localData

export default function Board() {
  const canvasRef = useRef(null)

  const music = new Audio(musicSound)

  useEffect(() => {
    window.addEventListener('beforeunload', handleWindowClose)

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
        return BrickDraw(ctx, brick)
      })

      BallMovement(ctx, ballObj)

      LevelCheck(bricks, player, brickObj)

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

const handleWindowClose = (e) => {
  e.preventDefault();
  localStorage.setItem('localData', JSON.stringify(localData))
  localStorage.setItem('bricks', JSON.stringify(bricks))
}

