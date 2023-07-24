import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import { useEffect, useRef, useState } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'

export interface Props {
  page: ProductDetailsPage
  storeId:string
}

const Trustvox=({page, storeId}:Props)=>{

  const {product} = page

  useEffect(()=>{
    const script=document.createElement('script')
    script.type='text/javascript'
    script.innerHTML=`
      window._trustvox=[]

      _trustvox.push('=['_storeId', '${storeId}'])
      _trustvox.push(['_productId',  ${product.name}])
      _trustvox.push(['_productName', ${product.productID}])
      _trustvox.push(['_productPhotos', ${product.image}])
    `
    const script2=document.createElement('script')
    script2.type='text/javascript'
    script2.async=true
    script2.src='//static.trustvox.com.br/sincero/sincero.js'

    document.head.append(script, script2)
  },[])
  
  return(
    <div id="_trustvox_widget"></div>
  )
}

export default Trustvox