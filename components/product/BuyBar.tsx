// deno-lint-ignore-file no-window-prefix
import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import { useEffect, useRef, useState } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'
import Icon from '$store/components/ui/Icon.tsx'
import AddToCartButton from 'deco-sites/shp/islands/AddToCartButton/vtex.tsx'
import {invoke} from 'deco-sites/shp/runtime.ts'
import { useOffer } from 'deco-sites/fashion/sdk/useOffer.ts'
import { ObjTrust } from 'deco-sites/shp/types/types.ts'

export interface Props {
  page: ProductDetailsPage
}

const BuyBar=({page}:Props)=>{
  const {product}=page
  const { description, productID, offers, name, isVariantOf, brand, additionalProperty } = product
  const { price, listPrice, seller, installments } = useOffer(offers)

  const handleScroll=()=>{
    setShow(window.scrollY > window.innerHeight-200)
  } 

  const [show, setShow]= useState(false)

  useEffect(()=>{
    if(typeof window !== 'undefined'){
      window.addEventListener('scroll' ,handleScroll)
      console.log(product)
    }

    const handleTrust=async()=>{
      const data=await invoke["deco-sites/shp"].loaders.getTrustvox({productId:productID, storeId:'79497'})
      const {products_rates}:{products_rates:ObjTrust[]}=data
      const obj:ObjTrust=products_rates[0]
      obj ? (setTrustPercent(obj.average*20),setObjTrust(obj)) : setObjTrust({product_code:productID, average:0, count:0, product_name:name??''})
    }
    handleTrust()

    return ()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  },[])

  const [objTrust, setObjTrust]=useState<ObjTrust>({'product_code':productID, 'average':0, 'count':0, 'product_name':name??''})
  const [trustPercent, setTrustPercent]=useState(0)
    
  useEffect(()=>{
    
  },[])

  return(
    <div className={show ? 'fixed bottom-0 flex justify-evenly bg-[#000] w-screen max-h-[111px] pt-[20px] pb-[12px]' : 'hidden'}>
      <div className='hidden re1:flex justify-center'>
        <div className='flex flex-col w-[30%]'>
          <p className='flex gap-2'>
            <span className='text-success'>Neologic</span>
            <span> - CÓD. 89239</span>
            {/* Trustvox */}
            <div className='flex justify-center items-center'>
              <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                <div style={{width:`${trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-16px]'/>
              </div>
              {objTrust.average!==0 && <span className='text-yellow-300 text-xs'>({objTrust.count})</span>}
            </div>
          </p>

          <p>{product.name}</p>
        </div>

        <div className='divider divider-horizontal divider-neutral-content'/>
        
        <div className='flex items-center'>
          <Icon id='Pix' size={30} strokeWidth={2}/>
          <div className='text-sm text-neutral-content'>
            <p className='line-through'>De:XXXX</p>
            <p className='text-primary text-2xl font-bold'>R$ XXXXX</p>
            <p>No Pix <span className='success'>Economize XXX</span></p>
          </div>
        </div>

        <div className='divider divider-horizontal divider-neutral-content'/>

        <div className='flex flex-col text-sm'>
          <p className='flex gap-2 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="21" viewBox="0 0 31 21" fill="none"><path d="M30.5 18.375V10.5H27.5V18.375H30.5Z" fill="white"></path><path d="M1.382 20.2296C1.969 20.7432 2.675 21 3.5 21H27.875C29.3247 21 30.5 19.8247 30.5 18.375H27.5H3.5V10.5V5.25V2.625H27.5V5.25H3.5V10.5H27.5H30.5V2.625C30.5 1.90312 30.2065 1.28537 29.6195 0.77175C29.0315 0.25725 28.325 0 27.5 0H3.5C2.675 0 1.969 0.25725 1.382 0.77175C0.794 1.28537 0.5 1.90312 0.5 2.625V18.375C0.5 19.0969 0.794 19.7151 1.382 20.2296Z" fill="white"></path></svg>
            <p>parcelado no cartão <br/> em 10x de <span className='text-primary'>R$ XXX</span></p>
          </p>

          <p className='flex gap-2 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="21" viewBox="0 0 31 21" fill="none"><path d="M30.5 18.375V10.5H27.5V18.375H30.5Z" fill="white"></path><path d="M1.382 20.2296C1.969 20.7432 2.675 21 3.5 21H27.875C29.3247 21 30.5 19.8247 30.5 18.375H27.5H3.5V10.5V5.25V2.625H27.5V5.25H3.5V10.5H27.5H30.5V2.625C30.5 1.90312 30.2065 1.28537 29.6195 0.77175C29.0315 0.25725 28.325 0 27.5 0H3.5C2.675 0 1.969 0.25725 1.382 0.77175C0.794 1.28537 0.5 1.90312 0.5 2.625V18.375C0.5 19.0969 0.794 19.7151 1.382 20.2296Z" fill="white"></path></svg>
            <p>à vista no cartão <br/> por <span className='text-primary'>R$ XXX</span></p>
          </p>
        </div>

        <div className='divider divider-horizontal divider-neutral-content'/>

        <div className='flex gap-3 items-center'>
          <Image src="https://shopinfo.vteximg.com.br/arquivos/pdp-pc-frete-gratis-flutuante.gif" width={100} height={41}/>
          <AddToCartButton
            url={product?.url ?? ''}
            productID={productID}
            seller={seller ?? ''}
            price={price ?? 0}
            discount={price && listPrice ? listPrice - price : 0}
            name={product.name ?? ''}
            productGroupID={product.isVariantOf?.productGroupID ?? ''}
          />
        </div>
      </div>

      <div className='flex re1:hidden'>

      </div>
    </div>
  )
}

export default BuyBar