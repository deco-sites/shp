import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import {JSX} from 'preact'
import { useState, useEffect } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'
import { batata } from '../../batata.ts'

export interface Props{
  page:LoaderReturnType<ProductDetailsPage>
}

//solução temporária pro bloqueio do cors na vtex 
const loaderSearchAPI= async (skuId:string)=>{
  const url=`https://shopinfo.vtexcommercestable.com.br/api/catalog_system/pub/products/search?fq=skuId:${skuId}`
  const data=await fetch(url).then(async(r)=>{
    const resp=r.clone()
    const text=await r.text()
    console.log(text)
    return resp
  }).catch(err=>console.error('Error: ',err))
  console.log(data)
  return data
}

const CompreJunto=({page}:Props)=>{
  const {product}=page
  const [htmlContent, setHtmlContent]=useState<JSX.Element[]>([<div className='loading loading-spinner loading-lg'/>])

  const handleData=async()=>{
    const data=await loaderSearchAPI(product.sku)
    //const buyTogether=data[0].items[0].sellers[0].commertialOffer.BuyTogether
    //console.log(buyTogether)
  }
  
  

  const productA=(
    <div className='flex gap-2 w-[40%] items-center'>
      <Image src={product.image![0].url || ''}  width={180} height={180} decoding='sync' fetchPriority='auto' loading='lazy'/>
      <p className='text-lg hidden re1:block'>{product.name}</p>
    </div>
  )
    
  useEffect(()=>{ 
    console.log(product)
    handleData()
  })
   
  return(
    <div className='flex flex-col items-center justify-center w-full'>
      <h4 className='text-xl font-bold'>Compre Junto</h4>
      <div className='w-full re1:w-[60%] flex flex-col justify-center items-center'>
        {htmlContent.map(element=>element)}
        {productA}
      </div>
    </div>
  )
}

export default CompreJunto