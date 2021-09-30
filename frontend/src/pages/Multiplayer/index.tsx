/* eslint-disable no-return-assign */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AllByBoundAttribute } from 'dom-testing-library/typings';
import { toast, ToastContentProps, ToastOptions } from 'react-toastify';
import { start } from 'repl';
import { Socket } from 'socket.io-client';
import { useGameContext } from '../../Context/GameContext';
import GameDisplay from '../../Components/GameDisplay';
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
  const [playerOption, setPlayerOption] = useState(false);
  const params = new URL(window.location.toString()).searchParams;
  const room = params.get('room');

  const handleClick = (option: string) => {
    socket.emit('selectOption', {
      username: player.username, room, option,
    }, (callback: any) => {
      updatePlayer(callback);
    });

    setPlayerOption(true);
  };

  useEffect(() => {
    /* console.log(player);
    console.log(player.username); */

  }, [player]);

  socket.on('playerJoined', () => { /* console.log('player: ', player) */ console.log('rodou playerJoined'); });

  return (
    <Container>

      {!oponent?.option && <Loader />}
      <h1>
        {oponent?.username ? oponent.username : 'Waiting for a Challenger'}

      </h1>

      <ButtonContainer>
        <button type="button" onClick={() => handleClick('rock')}>Rock</button>
        <button type="button" onClick={() => handleClick('scissor')}>Scissor</button>
        <button type="button" onClick={() => handleClick('paper')}>Paper</button>
      </ButtonContainer>

      <h1>
        {player?.username}
      </h1>
      {!player?.option && <Loader />}
    </Container>
  );
};

export default Multiplayer;
