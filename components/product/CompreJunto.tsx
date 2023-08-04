import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import {JSX} from 'preact'
import { useState, useEffect, useId, useRef } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'

export interface Props{
  page:LoaderReturnType<ProductDetailsPage>
}

interface objBuyTogether{
    sku:string,
    promotion:string,
}

//solução temporária pro bloqueio do cors na vtex quando no cliente e não consigo passar o retorno da func pro clientSide se ela for feita no serverSide
const loaderSearchAPI= async (skuId:string)=>{
  const url=`https://api.shopinfo.com.br/Deco/getProductBySku.php?sku=${skuId}`
  const data=await fetch(url).then(r=>r.json()).catch(err=>console.error('Error: ',err))
  return data
}

const loaderBuyTogether=async(skuId:string):Promise<objBuyTogether[]>=>{
  const url=`https://api.shopinfo.com.br/Deco/getBuyTogetherValuesBySku.php?sku=${skuId}`
  const data=(await fetch(url).then(r=>r.json()).catch(err=>console.error('Error: ',err))) || []
  return data
}

const CompreJunto=({page}:Props)=>{
  const {product}=page
  const [htmlContent, setHtmlContent]=useState<JSX.Element[]>([<div className='loading loading-spinner loading-lg text-[#dd1f26]'/>])
  const [data, setData]=useState<objBuyTogether[]>([])
  const [vazio, setVazio]=useState('')
  const handleData=async()=>{
    const fetch=await loaderBuyTogether(product.sku)
    setData(fetch)
    !fetch.length && setVazio('hidden')
  }

  const id='buyTogether-'+useId()
  const dotsWrapper=useRef<HTMLUListElement>(null)
  const slider=useRef<HTMLUListElement>(null)

  const ProductA=({temSlide}:{temSlide:boolean})=>{
    return(
      <div className={`flex w-[50%] re1:w-[40%] ${temSlide && 'relative left-[5%] re1:static'} re1:w-1/2 items-center justify-between`}>
        <div className='flex gap-2 items-center'>
          <Image src={product.image![0].url!}  width={180} height={180} decoding='sync' fetchPriority='auto' loading='lazy'/>
          <p className='text-[16px] hidden re1:block max-h-[66px] line-clamp-3 text-left leading-[22px]'>{product.name}</p>
        </div>
        <p className={`font-bold text-4xl ${temSlide && 'relative -top-[40px] re1:static'}`}>+</p>
      </div>
    )
  }

  useEffect(()=>{
    handleData()
  },[])

  useEffect(()=>{
    if(data.length>=1){
      const fetchItems = async () => {
        const itemsPromises = data.map(async (obj, index) => {
          let fetch
          try {
            fetch = await loaderSearchAPI(obj.sku)
          } catch (error) {
            console.error(error)
          }
          const image = fetch[0].items[0].images[0].imageUrl
          const name = fetch[0].productName
          const price= fetch[0].items[0].sellers[0].commertialOffer.Installments[0].Value
          const priceComPromoEPix=DescontoPIX((price-(price*(parseFloat(obj.promotion)/100))),12)
          const finalPriceArr=priceComPromoEPix.split('')
          finalPriceArr[finalPriceArr.lastIndexOf('.')]=','
          const finalPrice=finalPriceArr.join('')
          const link=fetch[0].link

          const skuProdB=obj.sku.includes(product.sku) ? obj.sku.replace(product.sku, '').replace(',','') : obj.sku
    
          return (
            <Slider.Item index={index} className='carousel-item flex flex-col re1:flex-row gap-2 w-full items-center'>
              <Image className='max-w-[85%] re1:max-w-[35%]' src={image} width={180} height={180} decoding='sync' fetchPriority='auto' loading='lazy' />
              <div className='flex-col'>
                <a href={link} className='text-xs re1:text-[16px] max-h-[66px] line-clamp-2 re1:line-clamp-3 text-left re1:leading-[22px]'>{name}</a>
                <div>
                  <div>
                    <p className='text-sm font-bold text-[#dd1f26]'>por mais</p>
                    <span className='text-lg font-bold flex items-baseline'>R$ {finalPrice}<p className='text-[#dd1f26] text-xs ml-1'>no pix</p></span>
                  </div>
                  <button data-skus={`['${product.sku}', '${skuProdB}']`} 
                    class="btn no-animation w-full hidden re1:flex gap-3 bg-[#dd1f26] border-[#dd1f26] hover:border-[#dd1f26] hover:bg-[#dd1f26]"
                    onClick={(event)=>console.log((event.target as HTMLButtonElement).getAttribute('data-skus') || ((event.target as HTMLElement).parentElement as HTMLButtonElement).getAttribute('data-skus'))}
                  >
                    <Image src='https://shopinfo.vteximg.com.br/arquivos/vector-cart-buy-button.png'
                      width={22} height={20} decoding='auto' fetchPriority='high' loading='eager' className='w-[10%]'
                    />
                    <p className='font-bold text-white capitalize'>Comprar junto</p>
                </button>
                </div>

              </div>
            </Slider.Item>
          )
        })
    
        const resolvedItems = await Promise.all(itemsPromises)
        setHtmlContent([
        <div className='w-full flex justify-center items-center'>
          <ProductA temSlide={resolvedItems.length>1}/>
          <div
            id={id}
            className={`flex w-[40%] ${itemsPromises.length>1 ? 'mr-[4%] re1:mr-0 w-[50%] re1:ml-[20px]' : 'w-[40%]'}`}
          >
            <div className={`${itemsPromises.length>1 ? 'flex' : 'hidden'} re1:mr-[10px] justify-center items-center prev`}>
              <Slider.PrevButton class='relative  btn min-w-[10px] min-h-[10px] px-0 rounded-full disabled:grayscale !bg-transparent !hover:bg-transparent border-none hover:border-none'>
                <Icon
                  class='text-[#dd1f26]'
                  size={15}
                  id='ChevronLeft'
                  strokeWidth={3}
                  />
              </Slider.PrevButton>
            </div>

            <Slider className='carousel carousel-center gap-6 scrollbar-none' ref={slider}>
              {resolvedItems.map(element=>element)}
            </Slider>

            <div class={`${itemsPromises.length>1 ? 'flex' : 'hidden'} re1:ml-[10px] items-center justify-center next`}>
              <Slider.NextButton class='relative btn min-w-[10px] min-h-[10px] px-0 rounded-full disabled:grayscale !bg-transparent !hover:bg-transparent border-none hover:border-none'>
                <Icon
                  class='text-[#dd1f26]'
                  size={15}
                  id='ChevronRight'
                  strokeWidth={3}
                  />
              </Slider.NextButton>
            </div>

            <ul className='hidden' ref={dotsWrapper}>
              {resolvedItems.map((__, index) => (
                <Slider.Dot index={index}>
                  batata
                </Slider.Dot>
              ))}
            </ul>

            <SliderJS rootId={id} scroll='smooth' />
          </div>
        </div>,
        <button 
          class='mt-[20px] btn no-animation w-[90vw] re1:hidden h-[40px] gap-3 bg-[#dd1f26] border-[#dd1f26] hover:border-[#dd1f26] hover:bg-[#dd1f26]'
          onClick={()=>{
            let slideIndex = ''
            if (dotsWrapper.current) {
              const foundElement = Array.from(dotsWrapper.current.children).find(element => element.hasAttribute('disabled'))
              if (foundElement) {
                slideIndex = foundElement.getAttribute('data-dot') || ''
              }
            }
            (document.querySelector(`#${id} ul li[data-slider-item="${slideIndex}"] button`) as HTMLButtonElement).click()
          }}
        
          >
          <Image src='https://shopinfo.vteximg.com.br/arquivos/vector-cart-buy-button.png'
            width={22} height={20} decoding='auto' fetchPriority='high' loading='eager'
          />
          <p className='font-bold text-white capitalize'>Comprar junto</p>
        </button>])
      }
  
      fetchItems()
    }
  },[data])
  
  return(
    <div className={`flex flex-col items-center justify-center w-full ${vazio}`}>
      <h4 className='text-3xl font-bold'>Compre Junto</h4>
      <div className='w-full re1:w-[60%] flex flex-col justify-center items-center my-[30px]'>
        {htmlContent.map(element=>element)}
      </div>
    </div>
  )
}

export default CompreJunto