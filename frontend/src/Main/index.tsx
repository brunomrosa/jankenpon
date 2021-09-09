import React from 'react';
import Game from '../Components/Game';

import { Container } from './styles';

import { GameProvider } from '../Context/GameContext';

const Main: React.FC = () => (
  <GameProvider>
    <Container>
      <Game />
    </Container>
  </GameProvider>
);

export default Main;
