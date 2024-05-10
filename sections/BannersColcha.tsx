import { Picture, Source } from 'deco-sites/std/components/Picture.tsx'
import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import { sendEvent } from "deco-sites/shp/sdk/analytics.tsx";

export interface Props{
  /**@description Coloque os 3 banners */
  Banners:Array<{
    desktop:{
      url:string
      w:number
      h:number
    }
    mobile:{
      url:string
      w:number
      h:number
    }
    link:string
    alt:string
  }>
}

const BannersColcha=({Banners=[]}:Props)=>{
  const isMobile=globalThis.window.innerWidth<=768

  const SendSelectPromotionEvent=(idx:number)=>{
    sendEvent({name:'select_promotion', params:{
      creative_name:Banners[idx].alt,
      creative_slot:`colcha_${idx}`,
      promotion_name:Banners[idx].alt
    }})
  }

  return(
    <div className='flex flex-col gap-4 re1:gap-0 items-center re1:flex-row re1:justify-between my-16 mx-auto w-full h-max re1:h-[250px] re4:h-[298px] re5:h-[335px] px-[5%] re1:px-[15%]'>
      <div className='re1:w-[70%] h-full'>
        <a className='re1:grayscale-[50%] re1:hover:grayscale-0' href={Banners[0].link} onClick={()=>SendSelectPromotionEvent(0)}>
          <Picture>
            <Source
              media='(max-width:768px)'
              fetchPriority='low'
              src={Banners[0].mobile.url}
              width={Banners[0].mobile.w}
              height={Banners[0].mobile.h}
            />
            <Source
              media='(min-width:768px)'
              fetchPriority='low'
              src={Banners[0].desktop.url}
              width={Banners[0].desktop.w}
              height={Banners[0].desktop.h}
            />
            <Image src={isMobile ? Banners[0].mobile.url : Banners[0].desktop.url} loading='lazy' 
            decoding='auto' className='rounded-[32px]'
            width={isMobile ? Banners[0].mobile.w : Banners[0].desktop.w} 
            height={isMobile? Banners[0].mobile.h : Banners[0].desktop.h}/>
          </Picture>
        </a>
      </div>
      <div className='flex flex-col gap-4 re1:gap-0 justify-between re1:w-[20%] h-full'>
        <a className='re1:ml-auto re1:grayscale-[50%] re1:hover:grayscale-0' href={Banners[1].link} onClick={()=>SendSelectPromotionEvent(1)}>
          <Picture>
            <Source
              media='(max-width:768px)'
              fetchPriority='low'
              src={Banners[1].mobile.url}
              width={Banners[1].mobile.w}
              height={Banners[1].mobile.h}
            />
            <Source
              media='(min-width:768px)'
              fetchPriority='low'
              src={Banners[1].desktop.url}
              width={Banners[1].desktop.w}
              height={Banners[1].desktop.h}
            />
            <Image src={isMobile ? Banners[1].mobile.url : Banners[1].desktop.url} loading='lazy' 
            decoding='auto' className='rounded-[32px]'
            width={isMobile ? Banners[1].mobile.w : Banners[1].desktop.w} 
            height={isMobile? Banners[1].mobile.h : Banners[1].desktop.h}/>
          </Picture>
        </a>
        <a className='re1:ml-auto re1:grayscale-[50%] re1:hover:grayscale-0' href={Banners[2].link} onClick={()=>SendSelectPromotionEvent(2)}>
          <Picture>
            <Source
              media='(max-width:768px)'
              fetchPriority='low'
              src={Banners[2].mobile.url}
              width={Banners[2].mobile.w}
              height={Banners[2].mobile.h}
            />
            <Source
              media='(min-width:768px)'
              fetchPriority='low'
              src={Banners[2].desktop.url}
              width={Banners[2].desktop.w}
              height={Banners[2].desktop.h}
            />
            <Image src={isMobile ? Banners[2].mobile.url : Banners[2].desktop.url} loading='lazy' 
            decoding='auto' className='rounded-[32px]'
            width={isMobile ? Banners[2].mobile.w : Banners[2].desktop.w} 
            height={isMobile? Banners[2].mobile.h : Banners[2].desktop.h}/>
          </Picture>
        </a>
      </div>
    </div>
  )
}

export default BannersColcha
