import React, { useEffect } from 'react';
import { useGameContext } from '../../Context/GameContext';
import GameDisplay from '../../Components/GameDisplay';
import { Container, ButtonContainer } from './styles';

const Singleplayer: React.FC = () => {
  const { newGame, SelectOption } = useGameContext();

  useEffect(() => {
    newGame();
  });

  function handleClick(dispatchType: string) {
    SelectOption(dispatchType);
  }

  return (
    <Container>
      <GameDisplay />
      <ButtonContainer>
        <button type="button" onClick={() => handleClick('rock')}>Rock</button>
        <button type="button" onClick={() => handleClick('scissor')}>Scissor</button>
        <button type="button" onClick={() => handleClick('paper')}>Paper</button>
      </ButtonContainer>
    </Container>
  );
};

export default Singleplayer;
