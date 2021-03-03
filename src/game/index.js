import React from 'react'
import Board from './Board'

export default function Breakout({audioVolume}) {
  return (
    <div>
      <Board audioVolume={audioVolume}/>
    </div>
  )
}
