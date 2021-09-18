import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { useSocketContext } from '../../Context/SocketContext';
import { Container, ButtonContainer, Form } from './styles';

const Multiplayer: React.FC = () => {
  const [username, setUsername] = useState('');
  const [gameroom, setGameroom] = useState('');
  const { push } = useHistory();
  const { socket, setPlayername } = useSocketContext();

  function handleClick() {
    socket.on('joined', (data: any) => { console.log(data); });
    socket.emit('login', { username, gameroom }, (callback: any) => {
      if (callback?.error) {
        return toast.error(callback?.error);
      }
      setPlayername(username);
      push(`/multiplayer?room=${callback?.room}`);
      return toast.success(`Welcome to ${gameroom}`);
    });
  }

  return (
    <Container>

      <ButtonContainer>
        <Form>
          <div>
            <input name="roomname" onChange={(e) => setGameroom(e.target.value)} placeholder="Room Name" type="text" />
            <input name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" type="text" />
          </div>
          <button type="button" onClick={() => handleClick()}>Join Game</button>
        </Form>

      </ButtonContainer>
    </Container>
  );
};

export default Multiplayer;
