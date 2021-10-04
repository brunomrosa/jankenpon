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
  score: number;
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
  const ENDPOINT = process.env.REACT_APP_SOCKET_URL_DEV;

  const [oponent, setOponent] = useState<User>(() => ({ score: 0 } as User));
  const [player, setPlayer] = useState<User>(() => ({ score: 0 } as User));
  const [socket] = useState(io(ENDPOINT || ''));

  const playerJoin = (response: any) => {
    if (response.length > 1) {
      const findOponent = response.filter((user: any) => user.username !== player.username);
      if (findOponent[0]) {
        setOponent(findOponent[0]);
      }
    }
  };
  const playerHasChosen = (response: any) => {
    if (player.username === undefined) return;
    if (response.username !== player.username) {
      setOponent(response);
    }
  };

  useEffect(() => {
    socket.on('message', (msg: any) => {
      console.log('message: ', msg);
    });

    socket.on('disconnected', (msg: any) => {
      setOponent({
        username: '', option: '', room: '', score: 0,
      });
    });
    socket.on('playerJoined', (callback: any) => {
      playerJoin(callback);
    });
    socket.on('playerHasChosen', (callback: any) => {
      playerHasChosen(callback);
    });
    socket.on('foundWinner', (callback: any) => {
      if (callback === 'fair') {
        return;
      }
      if (callback.winner.username === player?.username) {
        setPlayer(callback.winner);
        setOponent({ ...oponent, option: '' });
        return;
      }
      if (callback.winner.username === oponent?.username) {
        setPlayer({ ...player, option: '' });
        setOponent(callback.winner);
      }
    });
  }, [player, oponent, socket]);

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
