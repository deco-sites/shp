import Game, {gameProps} from 'deco-sites/shp/components/ComponentsSHP/SelectGames/Game.tsx'
import  GameContextProvider  from 'deco-sites/shp/contexts/Games/GameContext.tsx'

export interface Props{
  games:Array<gameProps>
}

const selectGames=({games=[]}:Props)=>{
  games.length<1 && null

  return(
    <GameContextProvider>
      {games.map((game)=>(<Game gameName={game.gameName} imgUrl={game.imgUrl}/>))}
    </GameContextProvider>
  )
}

export default selectGames