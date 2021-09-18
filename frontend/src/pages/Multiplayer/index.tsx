/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AllByBoundAttribute } from 'dom-testing-library/typings';
import { toast, ToastContentProps, ToastOptions } from 'react-toastify';
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
  const { socket, playerName } = useSocketContext();
  const [oponent, setOponent] = useState({} as Oponent);
  const [count, setCount] = useState(0);
  const [playerOption, setPlayerOption] = useState(false);
  const params = new URL(window.location.toString()).searchParams;
  const room = params.get('room');

  const startGame = () => {
    socket.emit('roomInfo', room, (callback: Oponent[] | any) => {
      if (callback.length >= 1) {
        const findOponent = callback.find(
          (user: Oponent) => user.username.trim().toLowerCase() !== playerName.trim().toLowerCase(),
        );
        if (findOponent) {
          toast.info('Here comes a new challenger');
          return setOponent(findOponent);
        }
      }
      return setCount((prev) => prev + 1);
    });
  };

  const verifyIfOponentHasChosen = () => {
    socket.emit('verifyIfOponentHasChosen', { username: playerName, room }, (callback: any) => {
      if (callback.option) {
        setOponent(callback);
      }
    });
  };

  const handleClick = (option: string) => {
    socket.emit('selectOption', { username: playerName, room, option });
    setPlayerOption(true);
    verifyIfOponentHasChosen();
  };

  useEffect(() => {
    if (!oponent?.username) {
      setTimeout(() => startGame(), 1000);
    }

    setTimeout(() => verifyIfOponentHasChosen(), 1000);
  }, [count]);

  useEffect(() => {
    socket.on('message', (msg: any) => {
      console.log(msg);
    });
  });

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
