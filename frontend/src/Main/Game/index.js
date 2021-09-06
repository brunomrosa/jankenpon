import {useGameDispatch} from '../../context/game/context'
import React, {useEffect} from 'react'
import {toast} from 'react-toastify'

import { io } from "socket.io-client";


function Game() {
  const socket = io("http://localhost:3333");
  fetch("http://localhost:3333")
  .then(res => console.log(res.json()))
  
  const dispatch = useGameDispatch()
  const startGame = () => {
    dispatch({type: 'initialize'})
  }

  useEffect(() => {
    startGame()
  })

  async function handleClick(dispatchType) {
    await dispatch({type: dispatchType})
    await dispatch({type: 'newMatch'})
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
