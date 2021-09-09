import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import { toast } from 'react-toastify';

interface GameContextData {
  wins: number
  losses: number
  cpuSelected: string
  selectGameMode(gameType: string): void
  gameMode: string
  newGame(): void
  SelectOption(name: string): void
}

interface GameOption {
  [key: string]: any
}

interface Children {
  children: React.ReactNode
}

const ModalContext = createContext({} as GameContextData);

const GameProvider = ({ children }: Children) => {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [gameMode, setGameMode] = useState('singleplayer');
  const [cpuSelected, setCpuSelected] = useState('');

  const selectGameMode = useCallback(
    (gameType) => {
      setGameMode(gameType);
    },
    [gameMode],
  );

  const newGame = useCallback(() => {
    const options = ['rock', 'scissor', 'paper'];
    const selected = Math.floor(Math.random() * options.length);
    setCpuSelected(options[selected]);
  }, []);

  const CalculateWinner = useCallback(
    (option: string) => {
      if (option === cpuSelected) {
        return 'fair';
      }

      const rock: GameOption = {
        scissor: 'win',
        paper: 'loss',
      };
      const paper: GameOption = {
        rock: 'win',
        scissor: 'loss',
      };
      const scissor: GameOption = {
        paper: 'win',
        rock: 'loss',
      };
      if (option === 'rock') {
        return rock[cpuSelected];
      }
      if (option === 'paper') {
        return paper[cpuSelected];
      }
      if (option === 'scissor') {
        return scissor[cpuSelected];
      }
      return null;
    },
    [cpuSelected],
  );

  const SelectOption = useCallback(
    (option) => {
      const result = CalculateWinner(option);
      if (result === 'win') {
        toast.success('wow, you rock!');
        setWins((prev: number) => prev + 1);
      }
      if (result === 'loss') {
        toast.error('cpu rocked you!');
        setLosses((prev: number) => prev + 1);
      }

      if (result === 'fair') {
        toast.info('Fair match...');
      }

      newGame();
    },
    [wins, losses, cpuSelected],
  );

  return (
    <ModalContext.Provider
      value={{
        wins,
        losses,
        selectGameMode,
        newGame,
        SelectOption,
        cpuSelected,
        gameMode,
      }}
    >
      <>{children}</>
    </ModalContext.Provider>
  );
};

function useGameContext(): GameContextData {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useGameContext must be within GameProvider');
  }

  return context;
}

export { GameProvider, useGameContext };
