import React from 'react'

const GameStateContext = React.createContext()
const GameDispatchContext = React.createContext()

function useGameState() {
  const context = React.useContext(GameStateContext)
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider')
  }
  return context
}

function useGameDispatch() {
  const context = React.useContext(GameDispatchContext)
  if (context === undefined) {
    throw new Error('useGameDispatch must be used within a GameProvider')
  }
  return context
}

export {useGameState, useGameDispatch, GameStateContext, GameDispatchContext}
