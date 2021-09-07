import React, {createContext, useCallback, useContext, useState} from 'react';
import { toast } from 'react-toastify';


interface GameContextData {
  wins: Number;
  losses: Number;
  cpuSelected: String;
  selectGameMode(gameType: string): void;
  newGame(): void;
  SelectOption(name: string): void;
}

interface GameOption {
  [key: string]: any
}


const ModalContext = createContext({} as GameContextData)

const GameProvider: React.FC = ({children}) => {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [gameMode, setGameMode] = useState('');
  const [cpuSelected, setCpuSelected] = useState('');

  const selectGameMode = useCallback( (gameType) => {
    setGameMode(gameType);
    
  }, [gameMode] )

  const newGame = useCallback(()=> {
    const options = ['rock', 'scissor', 'paper']
    const selected = Math.floor(Math.random() * options.length)
    setCpuSelected(options[selected])
  }, []) 

  const SelectOption = useCallback((option)=> {
    const result = CalculateWinner(option)
    console.log(result)
    if(result === 'win') {
      toast.success('wow, you rock!')
      setWins(prev => prev + 1)
    }
    if(result === 'loss') {
      toast.error('cpu rocked you!')
      setLosses(prev => prev + 1)
    } 

    if(result === 'fair') {
      toast.info('Fair match...')
    }
   
    newGame()
  }, [wins, losses, cpuSelected])
  
  const CalculateWinner = useCallback((option)=> {

    if(option === cpuSelected) {
      return 'fair';
    }

    const rock: GameOption = {
      scissor: 'win',
      paper: 'loss' 
    }
    const paper: GameOption = {
      rock: 'win',
      scissor: 'loss' 
    }
    const scissor: GameOption = {
      paper: 'win',
      rock: 'loss' 
    }
    if(option === 'rock') {
      return rock[cpuSelected]
    }
    if(option === 'paper') {
      return paper[cpuSelected]
    }
    if(option === 'scissor') {
      return scissor[cpuSelected]
    }


  }, [cpuSelected])

  return (
    <ModalContext.Provider value={{wins, losses, selectGameMode, newGame, SelectOption, cpuSelected}}>
      <> 
      {children}
      </>
    </ModalContext.Provider>
  );
};

function useGameContext(): GameContextData {
  const context = useContext(ModalContext);

  if(!context){
    throw new Error('useGameContext must be within GameProvider')
  }

  return context;
}

export {GameProvider, useGameContext}