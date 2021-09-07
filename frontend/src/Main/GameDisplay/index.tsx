import React, {useState} from 'react'
import {useGameContext} from '../../context/GameContext'

const GameDisplay: React.FC = () => {
  const [reveal, setReveal] = useState(false)
  const {wins, losses, cpuSelected} = useGameContext()

  return (
    <div>
      <div>
        {reveal
          ? `The CPU has chosen ${cpuSelected}`
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

export default GameDisplay;