import React, {
  useContext, useState, useEffect, useMemo, useCallback,
} from 'react';
import io, { Socket } from 'socket.io-client';

interface Children {
  children: React.ReactNode
}

interface User {
  room: string;
  option: string;
  username: string;
  score?: number;
}
interface SocketProviderData {
  socket?: any;
  player: User;
  setOponent(arg: User): void;
  updatePlayer(arg: User): void;
  oponent: User;
}

const SocketContext = React.createContext({} as SocketProviderData);

const SocketProvider = ({ children }: Children) => {
  const ENDPOINT = 'http://localhost:3333';

  const [oponent, setOponent] = useState<User>(() => ({} as User));
  const [player, setPlayer] = useState<User>(() => ({} as User));
  const [socket] = useState(io(ENDPOINT));

  const playerJoin = useCallback((response: any) => {
    if (response.length > 1) {
      /*  console.log(player); */
      const findOponent = response.filter((user: any) => user.username !== player.username);
      if (findOponent[0]) {
        setOponent(findOponent[0]);
      }
      /*  console.log(findOponent); */
    }
  }, [player, oponent]);

  useEffect(() => {
    socket.on('message', (msg: any) => {
      console.log('message: ', msg);
    });

    socket.on('disconnected', (msg: any) => {
      setOponent({ username: '', option: '', room: '' });
    });
    socket.on('playerJoined', (callback: any) => {
      playerJoin(callback);
    });
  }, [player, oponent]);

  const updatePlayer = useCallback((user: User) => { setPlayer(user); /* console.log('user: ', user); */ }, []);

  return (
    <SocketContext.Provider value={{
      socket, player, updatePlayer, oponent, setOponent,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

function useSocketContext(): SocketProviderData {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocketContext must be within SocketProvider');
  }

  return context;
}

export { SocketProvider, useSocketContext };
