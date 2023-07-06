// deno-lint-ignore-file
import { useEffect, useState, useCallback } from 'preact/hooks'

export interface Props{
  videoId:string
  wDesk:number
  hDesk:number
  wMob:number
  hMob:number
}

const YoutubeEmbed=({ videoId, wDesk, hDesk, wMob, hMob }:Props)=>{
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <iframe width={isMobile ? wMob : wDesk} height={isMobile ? hMob : hDesk} src={`https://www.youtube.com/embed/${videoId}`} title="Conheça a Shopinfo | A Melhor Loja de PC Gamer do Brasil" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
  )
}

export default YoutubeEmbed