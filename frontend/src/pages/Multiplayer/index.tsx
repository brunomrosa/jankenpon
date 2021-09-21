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
    socket, playerName, oponent, setOponent,
  } = useSocketContext();

  const [count, setCount] = useState(0);
  const [playerOption, setPlayerOption] = useState(false);
  const params = new URL(window.location.toString()).searchParams;
  const room = params.get('room');

  const startGame = () => {
    socket.emit('roomInfo', playerName, room, (response: Oponent[] | any) => {
      if (response?.error) {
        console.log('err: ');
        console.log(response?.error);
      }
      if (response.length !== 0 && !response?.error) {
        toast.info('Here comes a new challenger');
        setOponent(response[0]);
        return false;
      }
      if (!oponent?.username) { setTimeout(() => startGame(), 3000); }
    });
  };

  const verifyIfOponentHasChosen = async () => {
    await socket.emit('verifyIfOponentHasChosen', { username: playerName, room }, (callback: any) => {
      if (callback.option) {
        return setOponent(callback);
      }
    });
  };

  const handleClick = (option: string) => {
    socket.emit('selectOption', {
      username: playerName, room, option,
    }, (callback: any) => {
      /*  console.log(callback); */
    });

    setPlayerOption(true);
    verifyIfOponentHasChosen();
  };

  useEffect(() => {
    let verify: any;
    if (!oponent?.option) {
      verify = setTimeout(() => verifyIfOponentHasChosen(), 1000);
    }
    return clearTimeout(verify);
  }, []);

  useEffect(() => {
    console.log(oponent);
    if (!oponent?.username) {
      startGame();
    }
  }, [oponent]);

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
        {playerName}
      </h1>
      {!playerOption && <Loader />}
    </Container>
  );
};

export default Multiplayer;
