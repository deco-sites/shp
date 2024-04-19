import { memo } from 'preact/compat'
import { useState, useEffect } from 'preact/hooks'
import { ProdCard as Props}  from 'deco-sites/shp/components/product/RecommendedProds.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'
import {invoke} from '$store/runtime.ts'

const ProdCard=({...props}:Props)=>{
  const {productId, prodName, precoVista, valorParcela, parcelas, imgUrl, linkProd, precoDe, pix} = props

  const [objTrust, setObjTrust]=useState<{'product_code':string, 'average':number, 'count':number, 'product_name':string}>()
  const [trustPercent, setTrustPercent]=useState(0)
  
  useEffect(()=>{
    const handleTrust=async()=>{
      const { products_rates }=await invoke['deco-sites/shp'].loaders.getTrustvox({productId, storeId:'79497'})
      
      const obj:{'product_code':string, 'average':number, 'count':number, 'product_name':string}=products_rates[0]
      setTrustPercent(obj.average*20)
      setObjTrust(obj)
    }
    handleTrust()
  },[])

  return(
    <a className='flex flex-row re1:flex-col h-36 re1:h-[370px] w-[90vw] re1:w-[18%] bg-[#262626] rounded-lg p-3 re1:p-0 border border-transparent hover:re1:border-primary hover:re1:shadow-[0_0_20px_0] hover:re1:shadow-primary' href={linkProd.replace('https://www.shopinfo.com.br','')}>
      <div className='flex re1:px-3 re1:pt-3 w-[30%] h-auto re1:w-auto'>
        <span className='absolute h-[30px] w-[35px] flex items-center justify-center bg-success text-secondary text-[12px] p-1 font-bold rounded-lg'>-12%</span>
        <Image className='m-auto' src={imgUrl} width={185} height={185} decoding='sync' loading='lazy' fetchPriority='low'/>
      </div>
      <div className='flex flex-col re1:flex-col-reverse justify-between w-[65%] ml-[5%] re1:ml-0 re1:w-full re1:h-[50%] re1:pb-3'>
        <p className='text-xs re1:text-sm max-h-[30%] line-clamp-2 re1:px-3'>
          {prodName}
        </p>
        <div className='flex items-center justify-start re1:justify-center'> 
          <hr className='hidden re1:block border-t-base-100 w-full'/>
          {/* Trustvox */}
          {objTrust?.average ===0 ? null :
            <div className='flex justify-center items-center absolute'>
              <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                <div style={{width:`${trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-16px]'/>
              </div>
              <span className='text-yellow-300 text-xs'>({objTrust?.count})</span>
            </div>
          }
        </div>
        <div className='flex flex-col re1:px-3'>
          <span className='line-through text-base-content text-xs'>{precoDe}</span>
          <p className='text-xs'><span className='text-success text-lg font-bold'>{DescontoPIX(parseFloat(precoVista), pix).toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</span> no pix</p>
          <span className='text-xs text-base-content'>{parcelas}x R$ {valorParcela} sem juros</span>
        </div>
      </div>
    </a>
  )
}

export default memo(ProdCard)