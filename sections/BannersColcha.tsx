import { Picture, Source } from 'deco-sites/std/components/Picture.tsx'

export interface Props{
  Banners:Array<{
    desktop:string
    mobile:string
    link:string
  }>
}

const BannersColcha=({Banners=[]}:Props)=>{
  const isMobile=globalThis.window.innerWidth<=768

  return(
    <div className='grid grid-rows-3 re1:flex re1:items-center re1:justify-center gap-3 re1:gap-10 my-5 mx-auto w-full py-5'>
      {Banners.map(banner=>(
        <a href={banner.link} className='w-screen re1:w-fit'>
          <Picture>
            <Source
              media='(max-width:768px)'
              fetchPriority='low'
              src={banner.mobile}
              width={390}
              height={231}
            />
            <Source
              media='(min-width:768px)'
              fetchPriority='low'
              src={banner.desktop}
              width={369}
              height={488}
            />
            <img src={isMobile ? banner.mobile : banner.desktop} loading='lazy' 
            decoding='auto' className='mx-auto re1:mx-0 re1:rounded-lg'
            width={isMobile ? 390 : 369} 
            height={isMobile? 231 : 488}/>
          </Picture>
        </a>
      ))}
    </div>
  )
}

export default BannersColcha
