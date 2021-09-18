import React from 'react';
import { SocketProvider } from './SocketContext';
import { GameProvider } from './GameContext';

interface Children {
  children: React.ReactNode
}

const Main = ({ children }: Children) => (
  <SocketProvider>
    <GameProvider>
      { children }
    </GameProvider>
  </SocketProvider>
);

export default Main;
