import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import { useEffect, useRef, useState } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'
import Icon from '$store/components/ui/Icon.tsx'
import AddToCartButton from 'deco-sites/shp/islands/AddToCartButton/vtex.tsx'
import {invoke} from 'deco-sites/shp/runtime.ts'
import { useOffer } from 'deco-sites/shp/sdk/useOffer.ts'
import { ObjTrust } from 'deco-sites/shp/types/types.ts'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'

export interface Props {
  page: ProductDetailsPage
  pix:number
}

const BuyBar=({page, pix}:Props)=>{
  const {product}=page
  const { description, productID, offers, name, isVariantOf, brand, additionalProperty } = product
  const { price, listPrice, seller, installments } = useOffer(offers)

  const isAvailable=offers!.offers[0].availability!=="https://schema.org/OutOfStock"

  if(!isAvailable){return null}

  const isPC=product.category?.includes('Computadores gamer')

  const pricePix=DescontoPIX(price! , pix)

  const handleScroll=()=>{
    // const footer=document.querySelector("section[data-manifest-key*='Footer.tsx'] footer")
    
    // const footerPosition=footer!.getBoundingClientRect().top + globalThis.window.scrollY
    
    const scrollPosition=globalThis.window.scrollY + globalThis.window.innerHeight
    
    setShow(globalThis.window.scrollY > globalThis.window.innerHeight-200)
  }

  const offer=offers!.offers![0]!

  const maxInstallments=(()=>{
    let maxInstallments=0

    offer.priceSpecification.forEach((item)=>{
      if (item.priceComponentType === "https://schema.org/Installment") {
        const { billingDuration } = item
        if(billingDuration! > maxInstallments){maxInstallments = billingDuration!}
      }
    })

    return maxInstallments
  })()

  const valorParcela=offer.priceSpecification.find(item=>item.billingDuration===maxInstallments)!.billingIncrement!

  const [show, setShow]= useState(false)

  const [objTrust, setObjTrust]=useState<ObjTrust>({'product_code':productID, 'average':0, 'count':0, 'product_name':name??''})
  const [trustPercent, setTrustPercent]=useState(0)

  const divWishBtn=useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if(typeof globalThis.window !== 'undefined'){
      globalThis.window.addEventListener('scroll' ,handleScroll)
    }

    const handleTrust=async()=>{
      const data=await invoke["deco-sites/shp"].loaders.getTrustvox({productId:product.inProductGroupWithID, storeId:'79497'})
      const {products_rates}:{products_rates:ObjTrust[]}=data
      const obj:ObjTrust=products_rates[0]
      obj ? (setTrustPercent(obj.average*20),setObjTrust(obj)) : setObjTrust({product_code:product.inProductGroupWithID ?? productID, average:0, count:0, product_name:name??''})
    }
    handleTrust()

    return ()=>{
      globalThis.window.removeEventListener('scroll',handleScroll)
    }
  },[])

  return(
    <div className={show ? 'fixed bottom-0 flex justify-evenly bg-[#1e1e1e] re1:bg-[#000] w-screen max-h-[125px] re1:max-h-[111px] pt-[20px] pb-[12px] z-[10]' : 'hidden'}>
      <div className='hidden re1:flex justify-center'>
        <div className='flex flex-col w-[30%]'>
          <p className='flex gap-2'>
            <span className='text-success'>Neologic</span>
            <span> - CÓD. 89239</span>
            {/* Trustvox */}
            <div className='flex justify-center items-center cursor-pointer' title='Pergunte e veja opiniões de quem já comprou'
              onClick={()=>{
                const reviewSec=document.querySelector('#REVIEW')
                if(reviewSec){
                  const divReview=reviewSec.querySelector('#_trustvox_widget')
                  const reviewSecRect=reviewSec.getBoundingClientRect()
                  const posY=reviewSecRect.top+globalThis.window.scrollY

                  divReview?.classList.contains('!hidden') && reviewSec.querySelector('label')?.click()
                  globalThis.window.scrollTo({top:posY-150, behavior:'smooth'})
                }
              }}
            >
              <div className='w-[60px] text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat'>
                <div style={{width:`${trustPercent}%`}} className=' text-left h-[13px] inline-block bg-[url(https://shopinfo.vteximg.com.br/arquivos/trustvox-sprite.png)] bg-no-repeat bg-[0_-16px]'/>
              </div>
              {objTrust.average!==0 && <span className='text-yellow-300 text-xs'>({objTrust.count})</span>}
            </div>
          </p>

          <p className='text-lg line-clamp-2'>{product.name}</p>
        </div>

        <div className='divider before:bg-neutral-content after:bg-neutral-content divider-horizontal'/>
        
        <div className='flex items-center gap-2'>
          <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pix-.png'
			width={30} height={30} decoding='auto' loading='eager' fetchPriority='high'
		  />
          <div className='text-sm text-neutral-content'>
            <p className='line-through'>De: {listPrice!.toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}</p>
            <p className='text-primary text-2xl font-bold'>{pricePix.toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}</p>
            <p className='text-secondary'>No Pix <span className='text-success font-bold'>Economize {Math.abs(pricePix-(price!)).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span></p>
          </div>
        </div>

        <div className='divider before:bg-neutral-content after:bg-neutral-content divider-horizontal'/>

        <div className='flex flex-col text-sm'>
          <p className='flex gap-2 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="21" viewBox="0 0 31 21" fill="none"><path d="M30.5 18.375V10.5H27.5V18.375H30.5Z" fill="white"></path><path d="M1.382 20.2296C1.969 20.7432 2.675 21 3.5 21H27.875C29.3247 21 30.5 19.8247 30.5 18.375H27.5H3.5V10.5V5.25V2.625H27.5V5.25H3.5V10.5H27.5H30.5V2.625C30.5 1.90312 30.2065 1.28537 29.6195 0.77175C29.0315 0.25725 28.325 0 27.5 0H3.5C2.675 0 1.969 0.25725 1.382 0.77175C0.794 1.28537 0.5 1.90312 0.5 2.625V18.375C0.5 19.0969 0.794 19.7151 1.382 20.2296Z" fill="white"></path></svg>
            <p>parcelado no cartão <br/> em {maxInstallments}x de <span className='font-bold'>{valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span></p>
          </p>

          <p className='flex gap-2 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="21" viewBox="0 0 31 21" fill="none"><path d="M30.5 18.375V10.5H27.5V18.375H30.5Z" fill="white"></path><path d="M1.382 20.2296C1.969 20.7432 2.675 21 3.5 21H27.875C29.3247 21 30.5 19.8247 30.5 18.375H27.5H3.5V10.5V5.25V2.625H27.5V5.25H3.5V10.5H27.5H30.5V2.625C30.5 1.90312 30.2065 1.28537 29.6195 0.77175C29.0315 0.25725 28.325 0 27.5 0H3.5C2.675 0 1.969 0.25725 1.382 0.77175C0.794 1.28537 0.5 1.90312 0.5 2.625V18.375C0.5 19.0969 0.794 19.7151 1.382 20.2296Z" fill="white"></path></svg>
            <p>à vista no cartão <br/> por <span className='font-bold'>{price!.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span></p>
          </p>
        </div>

        <div className='divider before:bg-neutral-content after:bg-neutral-content divider-horizontal'/>

        <div className='flex gap-3 items-center'>
          {isPC && <Image src="https://shopinfo.vteximg.com.br/arquivos/pdp-pc-frete-gratis-flutuante.gif" width={100} height={41}/>}
          <div className='flex flex-col items-center'>
            <AddToCartButton
              url={product?.url ?? ''}
              productID={productID}
              seller={seller ?? ''}
              price={price ?? 0}
              discount={price && listPrice ? listPrice - price : 0}
              name={product.name ?? ''}
              productGroupID={product.isVariantOf?.productGroupID ?? ''}
            />
            <div class="compra-segura"><a href="/a-shopinfo-e-confiavel" target="_blank">🔒 Compra 100% Segura</a></div>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-between re1:hidden px-[3%]'>
        <div className='flex justify-between'>
          <div className='flex flex-col w-[50%]'>
            <div className='flex gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="31" height="21" viewBox="0 0 31 21" fill="none"><path d="M30.5 18.375V10.5H27.5V18.375H30.5Z" fill="white"></path><path d="M1.382 20.2296C1.969 20.7432 2.675 21 3.5 21H27.875C29.3247 21 30.5 19.8247 30.5 18.375H27.5H3.5V10.5V5.25V2.625H27.5V5.25H3.5V10.5H27.5H30.5V2.625C30.5 1.90312 30.2065 1.28537 29.6195 0.77175C29.0315 0.25725 28.325 0 27.5 0H3.5C2.675 0 1.969 0.25725 1.382 0.77175C0.794 1.28537 0.5 1.90312 0.5 2.625V18.375C0.5 19.0969 0.794 19.7151 1.382 20.2296Z" fill="white"></path></svg>
              <p className='flex flex-col'>
                <span className='text-[1rem]'>{maxInstallments}X {valorParcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
                <span className='text-[.58rem]'>Sem juros no Cartão de Crédito</span>
              </p>
            </div>
          </div>
          <div className='flex flex-col w-[50%]'>
            <div className='flex gap-2'>
			  <Image src='https://shopinfo.vteximg.com.br/arquivos/icone-home-beneficios-pix-.png'
				width={30} height={30} decoding='auto' loading='lazy' fetchPriority='low' className='w-[30px] h-[30px]'
			  />
              <p className='flex flex-col'>
                <span className='font-bold text-primary text-[1rem]'>{pricePix.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>
                <span className='text-[.58rem]'>No Pix <b className='font-bold'>12% de Desconto</b></span>
				{isPC && <span className='text-success font-bold text-[.58rem]'>Economize {Math.abs(pricePix-(price!)).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</span>}
              </p>
            </div>
          </div>
        </div>

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
  )
}

export default BuyBar