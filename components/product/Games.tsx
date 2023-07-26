import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import {JSX} from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  page:ProductDetailsPage
}

const getGamesLoader= async(proc:string,placa:string) =>{
  const url='https://api.shopinfo.com.br/paramFps.php'
  const formData=new FormData()
  formData.append('processador',proc)
  formData.append('placaVideo',placa)
  const data =await fetch(url,{
    method: "POST",
    body: formData 
  }).then(r=>r.json()).catch(err=>console.error(err)) || {}

  return data
}

const gamesElements:JSX.Element[]=[
  <div class="game lol"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-leagueoflegends.png"/> <div class="dataFps"> <span class="title">LOL</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,
            
  <div class="game gta5"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-gta5.png"/> <div class="dataFps"> <span class="title">GTA V</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game csgo"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-csgo.png"/> <div class="dataFps"> <span class="title">CS:GO</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game fortnite"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-fortnite.png"/> <div class="dataFps"> <span class="title">FORTNITE</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game valorant"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-valorant.png"/> <div class="dataFps"> <span class="title">VALORANT</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game newworld"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-neworld.png"/> <div class="dataFps"> <span class="title">New World</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game godofwar"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-godofwar.png"/> <div class="dataFps"> <span class="title">God Of War</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game genshinimpact"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-genshin.png"/> <div class="dataFps"> <span class="title">Genshin Impact</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game eurotruck"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-eurotruck.png"/> <div class="dataFps"> <span class="title">Euro Truck</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game forza5 horizon"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-forzahorizon5.png"/> <div class="dataFps"> <span class="title">Forza Horizon 5</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game eldenring"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-eldenring.png"/> <div class="dataFps"> <span class="title">Elden Ring</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game roblox"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-roblox.png"/> <div class="dataFps"> <span class="title">Roblox</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game asvalhalla"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-assassinscreed.png"/> <div class="dataFps"> <span class="title">AS: Valhala</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game fifa23"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-fifa2023.png"/> <div class="dataFps"> <span class="title">Fifa 23</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game warzone"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-warzone.png"/> <div class="dataFps"> <span class="title">COD: WARZONE</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game cyberpunk"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-cyberpunk.png"/> <div class="dataFps"> <span class="title">CYBERPUNK 2077</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game overwatch"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-overwatch.png"/> <div class="dataFps"> <span class="title">OVERWATCH</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game wow"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-warcraft.png"/> <div class="dataFps"> <span class="title">WOW</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game minecraft"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-minecraft.png"/> <div class="dataFps"> <span class="title">MINECRAFT</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game apex"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-apex.png"/> <div class="dataFps"> <span class="title">APEX LEGENDS</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game freefire"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-freefire.png"/> <div class="dataFps"> <span class="title">FREE FIRE</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game pubg"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-pubg.png"/> <div class="dataFps"> <span class="title">PUBG</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>,

  <div class="game rb6"> <Image width={58} height={75} loading="lazy" decoding='sync' fetchPriority='low' alt="icone jogo" src="https://shopinfo.vteximg.com.br/arquivos/icone-encontrePC-rainbowsix.png"/> <div class="dataFps"> <span class="title">RAINBOW SIX SIEGE</span> <div class="levelFps"> <span>Full HD - Low<span class="fps"></span> </span> </div></div></div>
]

const Games=({ page }:Props)=>{
  const {product}=page

  const pecasName=['Processador','Placa de vídeo']
  const specs = (product.isVariantOf?.additionalProperty.map((item) => {
    if(pecasName.includes(item.name!)){
      return item
    }
  }) || [] ).filter((item)=> item !== undefined)!
  
  const [alreadyOpened,setAlreadyOpened]=useState(false)
  const [openMenu,setOpenMenu]=useState(false)
  const [games,setGames]=useState({})

  const handleDropdown=()=>{
    setOpenMenu(!openMenu)
    if(!alreadyOpened){
      (async()=>{
        const data=await getGamesLoader(specs[0]!.value!, specs[1]!.value!)
        setGames(data)
      })()
    }
    setAlreadyOpened(true)
  }
  
  useEffect(()=>{
    console.log(games)
  },[games])

  return(
    <div className='w-full re1:px-[10%] border-b border-b-[#3d3d3d]'>
      <label className='text-base re1:text-xl px-[10%] re1:px-0 py-[20px] font-bold flex justify-between items-center' onClick={handleDropdown}>
        <p>Pergunte e veja opiniões de quem já comprou</p>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png' width={15} height={15} 
          loading='eager' decoding='sync' className={`hover:brightness-50 active:hue-rotate-[350deg] cursor-pointer ${openMenu ? 'rotate-[270deg]' : 'rotate-90'}`}
        />
      </label>
      <div className={`${openMenu ? 'block' : 'hidden'}`}>
        batata
      </div>
    </div>
  )
}

export default Games