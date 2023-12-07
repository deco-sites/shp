import {  useState, useContext, useCallback } from 'preact/hooks'
import { createContext, FunctionalComponent } from 'preact'

export interface GameContextType {
  games: Map<string, { checked: boolean, collection60?: string, collection144?: string }>
  setGameChecked: (gameName: string, checked: boolean, collection60?: string, collection144?: string) => void
}

const GameContext=createContext<GameContextType | undefined>(undefined)

export const useGameContext=():GameContextType=>{
  const context=useContext(GameContext)
  if (!context) {
    throw new Error('useGameContext must be used within a GameContextProvider')
  }
  return context
}

const GameContextProvider: FunctionalComponent=({children})=>{
  const [games,setGames]=useState<GameContextType["games"]>(new Map())

  const setGameChecked = useCallback((gameName: string, checked: boolean, collection60?: string, collection144?: string) => {
    setGames((prevGames) => {
      const newGames = new Map(prevGames)
      newGames.set(gameName, { checked, collection60, collection144 })
      return newGames
    })
  }, [])

  const value:GameContextType={
    games,
    setGameChecked
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameContextProvider