import Image from 'deco-sites/std/packs/image/components/Image.tsx'

export interface Props{
  desktop?:{
    url:string
    width:number
    height:number
  }
  mobile?:{
    url:string
    width:number
    height:number
  }
}

const ImageBackground=({desktop, mobile}:Props)=>{
  return(
    <>
      {desktop && (
        <div className='absolute top-0 z-[-1] '>
          <Image src={desktop.url} width={desktop.width} height={desktop.height}  decoding='async' loading='eager'
            fetchPriority='high' preload
          />
        </div>
      )}
      {mobile && (
        <div className='absolute top-0 z-[-1] '>
          <Image src={mobile.url} width={mobile.width} height={mobile.height}  decoding='async' loading='eager'
            fetchPriority='high' preload
          />
        </div>
      )}
    </>
  )
}

export default ImageBackground