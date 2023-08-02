import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import {JSX} from 'preact'
import { useState, useEffect, useId } from 'preact/hooks'
import Image from 'deco-sites/std/components/Image.tsx'
import Slider from "deco-sites/shp/components/ui/Slider.tsx";
import Icon from "deco-sites/shp/components/ui/Icon.tsx";
import SliderJS from "deco-sites/shp/components/ui/SliderJS.tsx";

export interface Props{
  page:LoaderReturnType<ProductDetailsPage>
}

//solução temporária pro bloqueio do cors na vtex quando no cliente e não consigo passar o retorno da func pro clientSide se ela for feita no serverSide
const loaderSearchAPI= async (skuId:string)=>{
  const url=`https://api.shopinfo.com.br/Deco/getProductBySku.php?sku=${skuId}`
  const data=await fetch(url).then(r=>r.json()).catch(err=>console.error('Error: ',err))
  return data
}

const CompreJunto=({page}:Props)=>{
  const {product}=page
  const [htmlContent, setHtmlContent]=useState<JSX.Element[]>([<div className='loading loading-spinner loading-lg'/>])
  const [data, setData]=useState<string[]>([])
  const handleData=async()=>{
    const fetch=await loaderSearchAPI(product.sku)
    setData(fetch[0].items[0].sellers[0].commertialOffer.BuyTogether || [])
  }

  const id='buyTogether-'+useId()

  const productA=(
    <div className='flex gap-2 w-[40%] items-center'>
      <Image src={product.image![0].url || ''}  width={180} height={180} decoding='sync' fetchPriority='auto' loading='lazy'/>
      <p className='text-lg hidden re1:block'>{product.name}</p>
    </div>
  )

  useEffect(()=>{
    handleData()
  },[])

  useEffect(()=>{
    console.log(data)
    if(data.length>=1){
      const fetchItems = async () => {
        const itemsPromises = data.map(async (sku, index) => {
          let fetch
          try {
            fetch = await loaderSearchAPI(sku);
          } catch (error) {
            console.error(error);
          }
          const image = fetch[0].items[0].images[0].imageUrl;
          const name = fetch[0].productName;
    
          console.log(`Name:${name}, imgUrl:${image}`);
    
          return (
            <Slider.Item index={index} className='carousel-item flex gap-2 w-[40%] items-center'>
              <Image src={image} width={180} height={180} decoding='sync' fetchPriority='auto' loading='lazy' />
              <p className='text-lg hidden re1:block'>{name}</p>
            </Slider.Item>
          )
        })
    
        const resolvedItems = await Promise.all(itemsPromises)
        setHtmlContent([productA,<p>+</p>,<div
          id={id}
          className='flex w-[40%] mb-[25px]'
          >
          <div className='flex justify-center items-center prev'>
            <Slider.PrevButton class='relative right-[20px] btn min-w-[20px] min-h-[20px] rounded-full disabled:grayscale bg-[#dd1f26] hover:bg-[#dd1f26] border-none hover:border-none'>
              <Icon
                class='text-white'
                size={15}
                id='ChevronLeft'
                strokeWidth={3}
                />
            </Slider.PrevButton>
          </div>

          <Slider className='carousel carousel-center gap-6 scrollbar-none'>
            {resolvedItems.map(element=>element)}
          </Slider>

          <div class='flex items-center justify-center next'>
            <Slider.NextButton class='relative left-[20px] btn min-w-[20px] min-h-[20px] rounded-full disabled:grayscale bg-[#dd1f26] hover:bg-[#dd1f26] border-none hover:border-none'>
              <Icon
                class='text-white'
                size={15}
                id='ChevronRight'
                strokeWidth={3}
                />
            </Slider.NextButton>
          </div>

          <SliderJS rootId={id} scroll='smooth' />
        </div>])
      }
  
      fetchItems()
    }
  },[data])
  
  return(
    <div className='flex flex-col items-center justify-center w-full'>
      <h4 className='text-xl font-bold'>Compre Junto</h4>
      <div className='w-full re1:w-[60%] flex flex-col justify-center items-center'>
        {htmlContent.map(element=>element)}
      </div>
    </div>
  )
}

export default CompreJunto