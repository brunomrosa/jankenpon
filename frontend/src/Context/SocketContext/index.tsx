import React, { useContext, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Children {
  children: React.ReactNode
}

interface Oponent {
  option: string;
  username: string;
}
interface SocketProviderData {
  socket?: any;
  playerName: string;
  setPlayername(arg: string): void;
  setOponent(arg: Oponent): void;
  oponent: Oponent;
}

const SocketContext = React.createContext({} as SocketProviderData);

const SocketProvider = ({ children }: Children) => {
  const [oponent, setOponent] = useState({} as Oponent);
  const [playerName, setPlayername] = useState('');
  const ENDPOINT = 'http://localhost:3333';
  const socket = io(ENDPOINT);

  socket.on('message', (msg: any) => {
    console.log('message: ', msg);
  });

  socket.on('disconnected', (msg: any) => {
    setOponent({ username: '', option: '' });
  });

  return (
    <SocketContext.Provider value={{
      socket, playerName, setPlayername, oponent, setOponent,
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
