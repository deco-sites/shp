import Image from 'deco-sites/std/components/Image.tsx'
import { useRef, useCallback } from 'preact/hooks'
import { useGameContext, GameContextType}  from 'deco-sites/shp/contexts/Games/GameContext.tsx'

export interface gameProps{
  gameName:string
  imgUrl:string
}

const Game=({gameName, imgUrl}:gameProps)=>{
  const { games, setGameChecked }:GameContextType=useGameContext()

  const checked = games[gameName] || false

  const game=useRef<HTMLDivElement>(null)

  const handleClick=useCallback(()=>{
    setGameChecked(gameName,!checked)
    console.log(games)
  },[gameName, checked, setGameChecked])

  

  return (
    <div className={`block relative border-[2px] w-[125px] h-[150px] ${checked ? 'border-[#dd1f26] shadow-[#dd1f26]/30 shadow-[0_0_5px_2px]' : 'border-transparent'} rounded-lg`}
      ref={game} onClick={handleClick}
    >
      <Image
        src={imgUrl} alt={gameName} loading='lazy' class='absolute top-0 left-0 w-full h-full object-cover'
        width={125} height={150} fetchPriority='low' 
      />

      <div className={`relative z-10 top-[8px] ml-auto right-[8px] w-[15px] h-[15px] border border-[#dd1f26] ${checked ? 'bg-[#dd1f26]' : 'bg-gray-700'}`}/>
    </div>
  )
}

export default Game