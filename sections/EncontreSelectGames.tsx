import Game, {gameProps} from 'deco-sites/shp/components/ComponentsSHP/SelectGames/Game.tsx'
import  GameContextProvider, {useGameContext, GameContextType}  from 'deco-sites/shp/contexts/Games/GameContext.tsx'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import { useId } from 'preact/hooks'

export interface Props{
  games:Array<gameProps>
}

const selectGames=({games=[]}:Props)=>{
  const id=useId()+'-SelectGames'

  games.length<1 && null

  return(
    <div className='flex flex-col items-center my-5 w-[90vw] re1:w-[70vw]'>
      <div id={id}>
          <GameContextProvider>
            {games.map((game,index)=>(
              <Slider.Item index={index} className='carousel-item'>
                <Game gameName={game.gameName} imgUrl={game.imgUrl}/>
              </Slider.Item>
            ))}
          </GameContextProvider>
        
      </div>
      <button onClick={()=>{
        const {games}:GameContextType=useGameContext()
        console.log('batata'+games)
      } }>Batata</button>
    </div>
  )
}

export default selectGames