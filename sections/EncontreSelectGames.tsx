import Game, {gameProps} from 'deco-sites/shp/components/ComponentsSHP/SelectGames/Game.tsx'
import GameContextProvider, {useGameContext, GameContextType}  from 'deco-sites/shp/contexts/Games/GameContext.tsx'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import { useId } from 'preact/hooks'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'

export interface Props{
  games:Array<gameProps>
}

const BTNFinal= () => {
  const { games }: GameContextType = useGameContext()

  const handleButtonClick = () => {
    const gamesChecked=[]
    const gamesMap=new Map(Object.entries(games))
    for(const [game, checked] of gamesMap){
      checked && gamesChecked.push(game)
    }
    console.log(gamesChecked)
  }

  return <button onClick={handleButtonClick}>Print Games</button>
}

const selectGames=({games=[]}:Props)=>{
  const id=useId()+'-SelectGames'
  

  games.length<1 && null

  return(
    <div className='bg-[#3f3f3f] w-screen h-fit my-5 py-3'>
      <div className='flex flex-col items-center w-[90vw] re1:w-[70vw] mx-auto'>

        <div className='flex flex-col items-center justify-center w-4/6'>
          <h1 className='font-bold text-white text-3xl'>Encontre o PC Gamer Completo para seus Jogos</h1>
          <div className='flex items-center justify-center'>
            <label className='flex flex-col'>
              <div className="flex rounded-full border border-white w-[40px] h-[40px] items-center justify-center text-white">1</div>
              <p>Batata</p>
            </label>
            <label className='flex flex-col'>
              <div className="flex rounded-full border border-white w-[40px] h-[40px] items-center justify-center text-white">2</div>
              <p>Batata</p>
            </label>
            <label className='flex flex-col'>
              <div className="flex rounded-full border border-white w-[40px] h-[40px] items-center justify-center text-white">3</div>
              <p>Batata</p>
            </label>
          </div>
        </div>


        <GameContextProvider>
          <div id={id} className="container grid grid-cols-[20px_1fr_20px] re1:grid-cols-[48px_1fr_48px] px-0 re1:px-5">
            <div className='hidden re1:flex justify-center items-center prev'>
              <Slider.PrevButton class='btn bg-transparent hover:bg-transparent border-none relative'>
                <Icon
                  class='text-[#dd1f26]'
                  size={25}
                  id='ChevronLeft'
                  strokeWidth={3}
                />
              </Slider.PrevButton>
            </div>
            <Slider className='carousel carousel-center scrollbar-none gap-6 re1:gap-0 col-start-2'>
              {games.map((game,index)=>(
                <Slider.Item index={index} className='carousel-item first:pl-6 last:pr-6'>
                  <Game gameName={game.gameName} imgUrl={game.imgUrl}/>
                </Slider.Item>
              ))}
            </Slider>
            <div class='hidden re1:flex items-center justify-center next'>
              <Slider.NextButton class='btn bg-transparent hover:bg-transparent border-none relative'>
                <Icon
                  class='text-[#dd1f26]'
                  size={25}
                  id='ChevronRight'
                  strokeWidth={3}
                />
              </Slider.NextButton>
            </div>

            <SliderJS rootId={id} infinite />
          </div>
          <BTNFinal/>
        </GameContextProvider>
      </div>
    </div>
  )
}

export default selectGames