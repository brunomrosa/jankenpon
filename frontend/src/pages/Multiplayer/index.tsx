/* eslint-disable no-return-assign */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
import React, { useState } from 'react';

import { Container, ButtonContainer, Loader } from './styles';
import { useSocketContext } from '../../Context/SocketContext';

interface Params {
  room: string;
}

interface Oponent {
  option: string;
  username: string;
}

const Multiplayer: React.FC = () => {
  const {
    socket, player, oponent, setOponent, updatePlayer,
  } = useSocketContext();

  const [count, setCount] = useState(0);
  const params = new URL(window.location.toString()).searchParams;
  const room = params.get('room');

  const handleClick = (option: string) => {
    socket.emit('selectOption', {
      username: player.username, room, option, score: player.score,
    }, (callback: any) => {
      updatePlayer(callback);
    });
  };

  return (
    <Container>

      {!oponent?.option && <Loader />}
      <h1>
        {oponent?.score}

        <br />
        {oponent?.username ? oponent.username : 'Waiting for a Challenger'}

      </h1>

      <ButtonContainer>
        <button type="button" onClick={() => handleClick('rock')}>Rock</button>
        <button type="button" onClick={() => handleClick('scissor')}>Scissor</button>
        <button type="button" onClick={() => handleClick('paper')}>Paper</button>
      </ButtonContainer>

      <h1>
        {player?.username}
        <br />
        {player?.score}
      </h1>
      {!player?.option && <Loader />}
    </Container>
  );
};

export default Multiplayer;
