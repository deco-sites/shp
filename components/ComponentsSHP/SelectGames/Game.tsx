import Image from 'deco-sites/std/components/Image.tsx'
import { useCallback, useState } from 'preact/hooks'
import { useGameContext, GameContextType}  from 'deco-sites/shp/contexts/Games/GameContext.tsx'

export interface gameProps{
  gameName:string
  imgUrl:string
}

const Game=({gameName, imgUrl}:gameProps)=>{
  const { games, setGameChecked }:GameContextType=useGameContext()

  const [checked, setChecked] = useState(()=> games.get(gameName) || false)

  const handleClick=useCallback(()=>{
    setChecked(!checked)
    setGameChecked(gameName,!checked)
  },[gameName, checked, setGameChecked, games])

  

  return (
    <div className={`block relative border-[2px] w-[125px] h-[150px] cursor-pointer  ${checked ? 'border-[#dd1f26] shadow-[#dd1f26]/30 shadow-lg' : 'border-transparent'} rounded-lg`}
      onClick={handleClick}
    >
      <Image
        src={imgUrl} alt={gameName} loading='lazy' class='absolute top-0 left-0 w-full h-full object-cover rounded-lg'
        width={125} height={150} fetchPriority='low' 
      />

      <div className={`relative z-[5] top-[8px] ml-auto right-[8px] w-[15px] h-[15px] border border-[#dd1f26] ${checked ? 'bg-[#dd1f26]' : 'bg-gray-700'}`}/>
    </div>
  )
}

export default Game