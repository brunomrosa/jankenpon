import {useGameContext} from '../../context/GameContext'
import React, {useEffect} from 'react'
import {toast} from 'react-toastify'

import {io} from 'socket.io-client'

const Game: React.FC = () => {
 /*  const socket = io('http://localhost:3333') */
  const {newGame, SelectOption} = useGameContext()

  useEffect(() => {
    newGame()
  })

  function handleClick(dispatchType: string) {
    SelectOption(dispatchType)
  }

  return (
    <>
      <button onClick={() => handleClick('rock')}>Rock</button>
      <button onClick={() => handleClick('scissor')}>Scissor</button>
      <button onClick={() => handleClick('paper')}>Paper</button>
    </>
  )
}

export default Game
