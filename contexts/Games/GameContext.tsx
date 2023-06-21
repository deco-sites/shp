import {  useState, useContext } from 'preact/hooks'
import { createContext, FunctionalComponent } from 'preact'

export interface GameContextType{
  games: {[key:string]: boolean}
  setGameChecked: (gameName:string,checked:boolean) => void
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
  const [games,setGames]=useState<{[key:string]:boolean}>({})

  const setGameChecked=(gameName:string, checked:boolean)=>{
    setGames((prevGames)=>({
      ...prevGames,
      [gameName]:checked
    }))
  }

  const value:GameContextType={
    games,
    setGameChecked
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameContextProvider