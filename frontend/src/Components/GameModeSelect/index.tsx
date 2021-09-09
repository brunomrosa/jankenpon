import React from 'react'
import {useGameContext} from '../../Context/GameContext'
import {Container} from './styles'

const GameModeSelect: React.FC = () => {
  const {selectGameMode} = useGameContext()
  return (
    <Container>
      <button onClick={() => selectGameMode('singleplayer')}>
        Singleplayer
      </button>
      <button onClick={() => selectGameMode('multiplayer')}>Multiplayer</button>
    </Container>
  )
}

export default GameModeSelect
