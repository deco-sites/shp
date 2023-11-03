// deno-lint-ignore-file
import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import {JSX} from 'preact'
import { renderToString } from 'preact-render-to-string'
import { useEffect, useState, useRef, useId } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'
import Slider from 'deco-sites/fashion/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/fashion/components/ui/SliderJS.tsx'

export interface Props {
  page:ProductDetailsPage
}

const gamesElements:JSX.Element[]=[
  <div class="lol"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-leagueoflegends.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">LOL</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,
            
  <div class="gta5"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-gta5.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base font-bold line-clamp-1">GTA V</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="csgo"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-csgo.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base font-bold line-clamp-1">CS:GO</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="fortnite"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-fortnite.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">FORTNITE</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="valorant"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-valorant.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">VALORANT</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="newworld"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-neworld.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">New World</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="godofwar"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-godofwar.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">God Of War</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="genshinimpact"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-genshin.png"/><div class="flex flex-col justify-around"><span class="line-clamp-1 text-white text-sm re1:text-base font-bold">Genshin Impact</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="eurotruck"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-eurotruck.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">Euro Truck</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="forza5 horizon"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-forzahorizon5.png"/><div class="flex flex-col justify-around"><span class="line-clamp-1 text-white text-sm re1:text-base font-bold">Forza Horizon 5</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="eldenring"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-eldenring.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">Elden Ring</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="roblox"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-roblox.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base font-bold line-clamp-1">Roblox</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="asvalhalla"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-assassinscreed.png"/><div class="flex flex-col justify-around"><span class="line-clamp-1 text-white text-sm re1:text-base font-bold">AS: Valhala</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="fifa23"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-fifa2023.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">Fifa 23</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="warzone"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-warzone.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">COD: WARZONE</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="cyberpunk"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-cyberpunk.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">CYBERPUNK 2077</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="overwatch"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-overwatch.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">OVERWATCH</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="wow"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-warcraft.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base font-bold line-clamp-1">WOW</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="minecraft"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-minecraft.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">MINECRAFT</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="apex"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-apex.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base font-bold line-clamp-1">APEX LEGENDS</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="freefire"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-freefire.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">FREE FIRE</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="pubg"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-pubg.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base font-bold line-clamp-1">PUBG</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>,

  <div class="rb6"><Image width={80} height={80} loading="lazy" decoding='sync' fetchPriority='low'  alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-rainbowsix.png"/><div class="flex flex-col justify-around"><span class="text-white text-sm re1:text-base line-clamp-1 font-bold">RAINBOW SIX SIEGE</span><div><span class="text-[#707070] text-xs">Full HD - Low </span></div><span class="text-white text-sm re1:text-base font-bold">*** FPS</span></div></div>
]

const Games=({ page }:Props)=>{
  const {product}=page
  const categoriesId = product.additionalProperty?.map((item) =>
    item.name === 'category' ? item.propertyID : undefined
  )
  const PCGamer = categoriesId?.some((item) => item === '10')

  if(!PCGamer){ return null}

  const id='gamesMob'+useId()

  const pecasName=['Processador','Placa de vídeo']
  const specs = (product.isVariantOf?.additionalProperty.map((item) => {
    if(pecasName.includes(item.name!)){
      return item
    }
  }) || [] ).filter((item)=> item !== undefined)!
  
  const [alreadyOpened,setAlreadyOpened]=useState(false)
  const [openMenu,setOpenMenu]=useState(false)
  const supremeDiv=useRef<HTMLDivElement>(null)

  const [htmlContent,setHtmlContent]=useState<string[]>([])
  const [loading,setLoading]=useState<JSX.Element[]>([<div className='flex justify-center items-center'><div className='loading loading-spinner text-[#dd1f26] loading-lg'/></div>])
  
  const handleData=(obj:Record<string,number>)=>{
    const gamesValidos:string[]=[]
    let count=0
    if(Object.keys(obj).length){
      for(const key in obj){
        obj[key]===0 ? count++ : gamesValidos.push(key)
      }
    }

    if(count === Object.keys(obj).length){
      setTimeout(()=>{supremeDiv.current && supremeDiv.current.remove()},3000)
    }else{
      const cloneElements=[...gamesElements]
      gamesElements.forEach((element)=>{
        !gamesValidos.includes(element.props.className) && cloneElements.splice(cloneElements.indexOf(element),1)
      })
      const html:string[]=cloneElements.map((element,index)=>{
        const key=element.props.className
        element.props.class=`${key} flex gap-2 h-[90px] max-w-[175px] re1:max-w-none` 
        return index<8 ? renderToString(element).replace('***',obj[key].toString()) : ''
      }).filter(item=>item!=='')

      setHtmlContent(html)
      setLoading([])
    }
  }

  const getGamesLoader= async(proc:string,placa:string) =>{
    const url='https://api.shopinfo.com.br/paramFps.php'
    const formData=new FormData()
    formData.append('processador',proc)
    formData.append('placaVideo',placa)
    const data =await fetch(url,{
      method: "POST",
      body: formData 
    }).then(async (r)=>{
      const resp=r.clone()
      const text=await r.text()
      if(text==='empty'){
        setTimeout(()=>{
          supremeDiv.current && supremeDiv.current.remove()
        },3000)
      }else{
        return resp.json()
      }
    }).catch(err=>console.error(err)) || {}
  
    return data
  }

  const handleDropdown=()=>{
    setOpenMenu(!openMenu)
    if(!alreadyOpened){
      (async()=>{
        const data=await getGamesLoader(specs[0]!.value!, specs[1]!.value!)
        Object.keys(data).length ? handleData(data) : setTimeout(()=>{supremeDiv.current && supremeDiv.current.remove()},3000)
      })()
    }
    setAlreadyOpened(true)
  }

  const mobileSliderItems=(array:string[])=>{
    const gamesDivided:string[][] = array.reduce((acc:string[][],value,idx)=>{
      if (idx % 2 === 0) {
          acc.push(array.slice(idx, idx + 2))
      }
      if (idx === array.length - 1 && idx % 2 !==0) {
        const lastPair = acc[acc.length - 1];
        !lastPair.includes(value) && acc.push([value])
      }
      return acc
    }, [])

    return gamesDivided.map((pair,index)=>(
    <Slider.Item index={index} className='carousel-item gap-6 w-full justify-center'
      dangerouslySetInnerHTML={{ __html: pair.join('') }} />))
  }

  useEffect(()=>{
    const comecar=()=>{handleDropdown()}

    window.addEventListener('load',comecar)
    
    return ()=>{
      window.removeEventListener('load',comecar)
    }
  },[])

  return(
    <div ref={supremeDiv} className='w-full re1:px-[10%] border-b border-b-[#3d3d3d]'>
      <label className='text-base re1:text-xl px-[10%] re1:px-0 py-[20px] font-bold flex justify-between items-center' onClick={handleDropdown}>
        <p className='w-[90%] re1:w-auto'>Desempenho aproximado no jogos</p>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png' width={15} height={15} 
          loading='eager' decoding='sync' className={`hover:brightness-50 active:hue-rotate-[350deg] cursor-pointer ${openMenu ? 'rotate-[270deg]' : 'rotate-90'}`}
        />
      </label>
      <div className={`${openMenu ? 'block' : 'hidden'}`}>

        {loading.map(item=>item)}

        {mobileSliderItems(htmlContent).length!==0 && <div id={id} className='flex re1:hidden flex-col w-full mb-[25px]'>
          <Slider className='carousel carousel-center gap-6 scrollbar-none'>
            {mobileSliderItems(htmlContent)}
          </Slider>

          <ul className='carousel justify-center gap-4 z-[5] mt-6'>
            {mobileSliderItems(htmlContent).map((__, index) => (
              <Slider.Dot index={index}>
                <div className='bg-[#2d2d2d] group-disabled:bg-[#dd1f26] rounded-full h-[12px] w-[12px]' />
              </Slider.Dot>
            ))}
          </ul> 

          <SliderJS rootId={id} scroll='smooth' />
        </div>}

        <div className='hidden re1:grid grid-cols-4 gap-y-[30px] gap-x-2 w-[80%] my-[3%] mx-auto' dangerouslySetInnerHTML={{__html: htmlContent.join('')}} />
      </div>
    </div>
  )
}

export default Games