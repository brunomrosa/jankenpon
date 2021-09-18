import React, { useContext, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Children {
  children: React.ReactNode
}

interface SocketProviderData {
  socket?: any;
  playerName: string;
  setPlayername(arg: string): void;
}

const SocketContext = React.createContext({} as SocketProviderData);

const SocketProvider = ({ children }: Children) => {
  const [playerName, setPlayername] = useState('');
  const ENDPOINT = 'http://localhost:3333';
  const socket = io(ENDPOINT);
  return (
    <SocketContext.Provider value={{ socket, playerName, setPlayername }}>
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
