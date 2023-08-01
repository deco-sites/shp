import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import {JSX} from 'preact'
import { useState, useEffect } from 'preact/hooks'

export interface Props{
  page:LoaderReturnType<ProductDetailsPage>
}

const loaderCartSimulation= async (skuId:string)=>{
  const url='https://shopinfo.vtexcommerce.com.br/api/checkout/pub/orderForms/simulation?RnbBehavior=0&sc=1'
  const json = {
    items: [{ id: skuId, quantity: 1, seller: '1' }]
  }
  const data=await fetch(url,{
    method:'POST',
    body: JSON.stringify(json)
  }).then(r=>r.json()).catch(err=>console.error('Error: ',err))
  console.log(data)
  return data
}

const CompreJunto=({page}:Props)=>{
  const {product}=page
  const [htmlContent, setHtmlContent]=useState<JSX.Element[]>([<div className='loading loading-spinner loading-lg'/>])
  useEffect(()=>{
    loaderCartSimulation(product.sku)
    console.log(product)
  })
  return(
    <div>
      <h4>Compre Junto</h4>
      {htmlContent.map(element=>element)}
    </div>
  )
}

export default CompreJunto