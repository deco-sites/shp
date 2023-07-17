import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import { useEffect, useRef, useState } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  page: ProductDetailsPage
}

const Specification=({page}:Props)=>{
  const {product}=page
  const categoriesId = product.additionalProperty?.map((item) =>
    item.name === 'category' ? item.propertyID : undefined
  )
  const PCGamer = categoriesId?.some((item) => item === '10')
  const description:string=product.description!
  const descricaoFinal=PCGamer ?  (
    /&nbsp;/.test(description) ? product.isVariantOf?.additionalProperty?.find(item=>item.name==='Bloco Descrição')?.value! : description!
  ) 
    : description!
  
  const [openMenu,setOpenMenu]=useState(false)

  const handleDropdown=(event:MouseEvent)=>{
    setOpenMenu(!openMenu)
  }

  return (
    <div className='w-screen px-[10%] border-y border-y-[#3d3d3d]'>
      <label className='text-base re1:text-xl py-[20px] font-bold flex justify-between items-center' onClick={handleDropdown}>
        <p>Especificações Técnicas</p>
        <Image src='https://shopinfo.vteximg.com.br/arquivos/slick-arrow.png' width={15} height={15} 
          loading='eager' decoding='sync' className={`hover:brightness-50 active:hue-rotate-[350deg] cursor-pointer ${openMenu ? 'rotate-[270deg]' : 'rotate-90'}`}
        />
      </label>
      <div className={`${openMenu ? 'block' : 'hidden'}`}>
        {PCGamer ? (<div />) 
        : (<div />)}
      </div>
    </div>
  )
}

export default Specification