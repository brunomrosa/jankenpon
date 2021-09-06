import React, {useState} from 'react'
import {useGameState} from '../../context/game/context'

export default function GameDisplay() {
  const [reveal, setReveal] = useState(false)
  const {wins, losses, cpu} = useGameState()

  return (
    <div>
      <div>
        {reveal
          ? `The CPU has chosen ${cpu}`
          : 'Do you wanna see the cpu hand?'}

        {reveal ? (
          <p
            onClick={() => {
              setReveal(false)
            }}
          >
            Click here to hide
          </p>
        ) : (
          <p
            onClick={() => {
              setReveal(true)
            }}
          >
            Click here to reveal
          </p>
        )}
      </div>
      <div>{`Score: wins: ${wins} losses: ${losses}`}</div>
    </div>
  )
}
