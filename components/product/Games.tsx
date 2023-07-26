import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
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

  const handleDropdown=()=>{
    setOpenMenu(!openMenu)
    if(!alreadyOpened){
      (async()=>{
        const batata=await getGamesLoader(specs[0]!.value!, specs[1]!.value!)
        console.log(batata)
      })()
    }
    setAlreadyOpened(true)
  }
  
  return(
    <div className='w-full re1:px-[10%] border-b border-b-[#3d3d3d]'>
      <label className='text-base re1:text-xl px-[10%] re1:px-0 py-[20px] font-bold flex justify-between items-center' onClick={handleDropdown}>
        <p>Pergunte e veja opiniões de quem já comprou</p>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png' width={15} height={15} 
          loading='eager' decoding='sync' className={`hover:brightness-50 active:hue-rotate-[350deg] cursor-pointer ${openMenu ? 'rotate-[270deg]' : 'rotate-90'}`}
        />
      </label>
      <div>
        batata
      </div>
    </div>
  )
}

export default Games