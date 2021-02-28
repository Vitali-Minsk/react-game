import React, { useRef, useEffect } from 'react'
import { render } from 'react-dom'
import { BallMovement } from './BallMovement'
import data from '../data'
import WallCollision from './util/WallCollision'
import Paddle from './Paddle'
import Bricks from './Brick'
import BrickCollision from './util/BrickColision'
import PaddleHit from './util/PaddleHit'

let bricks = []

let {ballObj, paddleProps, brickObj} = data

export default function Board() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      paddleProps.y = canvas.height - 30

      let newBricketSet = Bricks(2, bricks, canvas, brickObj)

      if (newBricketSet && newBricketSet.length > 0) {
        bricks = newBricketSet
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bricks.map((brick) => {
        return brick.draw(ctx)
      })

      BallMovement(ctx, ballObj)

      WallCollision(canvas, ballObj)

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
        }
      }

      Paddle(ctx, canvas, paddleProps)

      PaddleHit(ballObj, paddleProps)
      
      requestAnimationFrame(render)
    }
    
    render()
  }, [])

  return (
    <canvas ref={canvasRef} id='canvas' width='800px' height='500px' onMouseMove={(event) => paddleProps.x = event.clientX - paddleProps.width / 2}>

    </canvas>
  )
}
