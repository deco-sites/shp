import Image from 'deco-sites/std/components/Image.tsx'
import { useCallback, useState, useEffect } from 'preact/hooks'
import { useGameContext, GameContextType}  from 'deco-sites/shp/contexts/Games/GameContext.tsx'

export interface gameProps{
  gameName:string
  /**@description Coloque o id das coleções*/ 
  collection60?:string
  collection144?:string
  imgUrl:string
}

const Game=({gameName, collection60, collection144, imgUrl}:gameProps)=>{
  const { games, setGameChecked }: GameContextType = useGameContext()

  const [checked, setChecked] = useState(false)

  // Sincroniza o estado local com o contexto
  useEffect(() => {
    const gameInfo = games.get(gameName)
    if (gameInfo) {
      setChecked(gameInfo.checked)
    }
  }, [games, gameName])

  const handleClick = useCallback(() => {
    setChecked((prevChecked) => {
      const newChecked = !prevChecked
      setGameChecked(gameName, newChecked, collection60, collection144)
      return newChecked
    })
  }, [gameName, setGameChecked, collection60, collection144])
  

  return (
    <div className={`block relative border-[2px] w-[125px] h-[150px] cursor-pointer  ${checked ? 'border-primary shadow-primary/30 shadow-lg' : 'border-transparent'} rounded-lg`}
      onClick={handleClick}
    >
      <Image
        src={imgUrl} alt={gameName} loading='lazy' class='absolute top-0 left-0 w-full h-full object-cover rounded-lg'
        width={125} height={150} fetchPriority='low' 
      />

      <div className={`relative z-[5] top-[8px] ml-auto right-[8px] w-[15px] h-[15px] border border-primary ${checked ? 'bg-primary' : 'bg-gray-700'}`}/>
    </div>
  )
}

export default Game