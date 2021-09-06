import React from 'react'
import gameReducer from '../reducer'
import {GameStateContext, GameDispatchContext} from '../context'
export function GameProvider({children}) {
  const [state, dispatch] = React.useReducer(gameReducer, {
    cpu: '',
    wins: 0,
    losses: 0,
  })
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  )
}
