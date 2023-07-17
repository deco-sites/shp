import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import { useEffect, useRef, useState } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  page: ProductDetailsPage
}

const Description=({page}:Props)=>{
  const {product}=page
  const description:string=product.description!
  const blockDescription=product.isVariantOf?.additionalProperty?.find(item=>item.name==='Bloco Descrição')?.value
  const regex=/&nbsp;/
  const descriptionDiv=useRef<HTMLDivElement>(null)
  const [openMenu,setOpenMenu]=useState(false)

  const handleDropdown=(event:MouseEvent)=>{
    setOpenMenu(!openMenu)
  }
  
  useEffect(()=>{
    descriptionDiv.current && (
      Array.from(descriptionDiv.current.querySelectorAll('img')).forEach(img=>{
        img.src=img.getAttribute('data-src')!
        img.removeAttribute('data-src')
      })
    )
  },[])
  

  return (
    <div className='w-screen px-[10%] border-y border-y-[#3d3d3d]'>
      <label className='text-base re1:text-xl py-[20px] font-bold flex justify-between items-center' onClick={handleDropdown}>
        <p>Descrição</p>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png' width={15} height={15} 
          loading='eager' decoding='sync' className={`hover:brightness-50 active:hue-rotate-[350deg] cursor-pointer ${openMenu ? 'rotate-[270deg]' : 'rotate-90'}`}
        />
      </label>
      <div className={`${openMenu ? 'block' : 'hidden'}`}>
        {regex.test(description) ? (<div ref={descriptionDiv} dangerouslySetInnerHTML={{__html: blockDescription!}}/>) 
        : (<div ref={descriptionDiv} dangerouslySetInnerHTML={{__html: description!}}/>)}
      </div>
    </div>
  )
}

export default Description