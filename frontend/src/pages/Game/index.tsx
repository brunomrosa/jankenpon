import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useGameContext } from '../../Context/GameContext';
import Singleplayer from '../Singleplayer';
import GameModeSelect from '../../Components/GameModeSelect';
import Login from '../Login';
import { Container } from './styles';

const Game: React.FC = () => {
  const { gameMode } = useGameContext();

  return (
    <Container>
      <GameModeSelect />
      {gameMode === 'singleplayer' ? <Singleplayer /> : <Login />}
    </Container>
  );
};

export default Game;
