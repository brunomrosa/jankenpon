import {useGameContext} from '../../Context/GameContext'
import React, {useEffect} from 'react'
import {toast} from 'react-toastify'

import {io} from 'socket.io-client'
import Singleplayer from '../Singleplayer'
import GameModeSelect from '../GameModeSelect'
const Game: React.FC = () => {
  /*  const socket = io('http://localhost:3333') */
  const {gameMode} = useGameContext()

  /* useEffect(() => {
    newGame()
  }) */

  /* function handleClick(dispatchType: string) {
    SelectOption(dispatchType)
  } */

  return (
    <>
      <GameModeSelect />
      {gameMode === 'singleplayer' ? <Singleplayer /> : ''}
    </>
  )
}

export default Game
