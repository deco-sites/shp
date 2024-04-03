import { Picture, Source } from "deco-sites/std/components/Picture.tsx";

export interface GravataProps{
  link:string
  banner:{
    desktop:string
    mobile:string
    alt:string
  }
  /** @description Coloque o hexadecimal da cor */
  bgColor:string
}

const GravataTopo=({ link, banner, bgColor }:GravataProps)=>{
  return (
    <a href={link} className="flex items-center justify-center w-full h-[40px] re1:h-[60px]" style={{backgroundColor:bgColor}}>
      <Picture>
        <Source
          media="(max-width: 767px)"
          src={banner.mobile}
          width={423}
          height={40}
        />
        <Source
          media="(min-width: 768px)"
          src={banner.desktop}
          width={1232}
          height={60}
        />
        <img
          className='h-[40px] re1:h-[60px] w-[423px] re1:w-[1232px] '
          src={banner.desktop}
          alt={banner.alt}
          width={1232}
          height={60}
        />
      </Picture>
    </a>
  )
}

export default GravataTopo