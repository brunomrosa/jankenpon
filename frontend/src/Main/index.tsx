import Game from './Game'
import GameDisplay from './GameDisplay'
import React from 'react'
import {Container} from './styled'
import {GameProvider} from '../context/GameContext'
const Main: React.FC = () => {
  return (
    <GameProvider>
      <Container>
        <h1>
          <GameDisplay />
          <Game />
        </h1>
      </Container>
    </GameProvider>
  )
}

export default Main
