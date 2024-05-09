import { useId, useMemo, useRef } from 'preact/hooks'
import Card from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/CardOrgSchemaProdType.tsx'
import type { Product } from 'apps/commerce/types.ts'
import type { LoaderReturnType, SectionProps } from 'deco/types.ts'
import CompareContextProvider from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import useTimer from 'deco-sites/shp/FunctionsSHP/useTimer.ts'
import { AppContext } from "deco-sites/shp/apps/site.ts";
import {useEffect} from 'preact/hooks'
import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types'

export interface VitrineProps {
  produtos: LoaderReturnType<Product[] | null>
  titulo: string
  CTA:{
    linkCTA:string
    textoCTA:string
  }
  /** @description formato AAAA-MM-DD*/
  finalDaOferta: string
  interval: number
  /** @description Não preencher*/
  descontoPix?: number
  /** @description caso haja mais de um section dessa na msm page, coloque um id diferente aqui*/
  differentId?:string
}

export const loader = (props: VitrineProps, _req: Request, ctx: AppContext & {descontoPix:number}) => {
  return {
    ...props, 
    descontoPix:ctx.descontoPix
  }
}

const Vitrine = ({ produtos, titulo, finalDaOferta, interval=0, descontoPix, differentId='0', CTA }: SectionProps<typeof loader>) => {
  const id =`${useId()}-${differentId}-vitrine`

  if (!produtos || produtos.length === 0) {
    return null
  }

  const finalDate = finalDaOferta ? new Date(finalDaOferta) : undefined
  const {days, hours, minutes, seconds, milliseconds}=useTimer(finalDate)

  if (!produtos || produtos.length === 0) {
    return <></>
  }

  
  const sliderRef=useRef<HTMLDivElement>(null)
  
  const nextRef=useRef<HTMLButtonElement>(null)

  const prevRef=useRef<HTMLButtonElement>(null)

  const paginationRef=useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!sliderRef.current || !paginationRef) return; // Garante que as refs estão prontas
  
    const swiperOptions:SwiperOptions = {
      modules:[Pagination, Autoplay],
      slidesPerView: 1.5,
      slidesPerGroup: 1,
      centeredSlides: true,
      spaceBetween: 30,
      loop: true,
      autoplay:{
        delay:5000,
        pauseOnMouseEnter:true
      },
      pagination:{
        el:paginationRef.current,
        type:'bullets',
        clickable:true,
        bulletActiveClass:'active-bullet !bg-primary',
        bulletClass:'bullet',
        renderBullet:(index,className)=>{
          return `<li class='${className + ' bg-[#2d2d2d] rounded-full'}' style='width:12px;height:12px;' index='${index}'></li>`
        }
      },
      breakpoints: {
        480:{
          slidesPerView: 4,
          slidesPerGroup: 4,
          centeredSlides: false,
          spaceBetween:10
        },
        1400: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          centeredSlides: false,
          spaceBetween:0
        },
      }
    }
  
    const swiper = new Swiper(sliderRef.current, swiperOptions);
    
    (nextRef.current as HTMLButtonElement).onclick = () => {
      swiper.slideNext()
    }

    (prevRef.current as HTMLButtonElement).onclick = () => {
      swiper.slidePrev()
    }
  
    return () => {
      swiper.destroy(true, true)
    }
  }, [])

  return (
    <CompareContextProvider descontoPix={useMemo(()=>descontoPix,[descontoPix])}>
      <div className='w-full mx-auto re1:px-[15%] my-16'>
        <div className='flex flex-col re1:flex-row mx-auto w-full gap-2 justify-center items-center mb-5 re1:px-0 px-6'>
          <div className='re1:flex hidden gap-2 items-center'>
            <span className='font-bold uppercase re1:text-4xl text-xl text-secondary'>
              {titulo}
            </span>
          </div>
          <div className='flex gap-5 justify-center items-center mx-auto'>
            <span className='block re1:hidden font-bold uppercase text-sm text-secondary'>
              {titulo}
            </span>
            <p className='w-[200px] text-white re1:text-sm text-xs' dangerouslySetInnerHTML={{__html:CTA.textoCTA}}/>
            <a href={CTA.linkCTA} className='re1:py-[8px] re1:px-[32px] items-center re1:border border-[#F0F0F0] inline-flex gap-2 cursor-pointer rounded-lg'>
              <p className='hidden re1:block text-white'>Confira</p> 
              <svg className='re1:hidden' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20.03 12C20.03 7.59 16.41 3.97 12 3.97C7.59 3.97 3.97 7.59 3.97 12C3.97 16.41 7.59 20.03 12 20.03C16.41 20.03 20.03 16.41 20.03 12ZM22 12C22 17.54 17.54 22 12 22C6.46 22 2 17.54 2 12C2 6.46 6.46 2 12 2C17.54 2 22 6.46 22 12ZM13.54 13V16L17.5 12L13.54 8V11H6.5V13" fill="white"></path>
              </svg>
            </a>
          </div>
          <div className="bg-transparent border-secondary rounded-lg flex justify-center re1:justify-end p-1 items-center w-full re1:w-[54%] re3:w-[48%] re4:w-[38%] re5:w-[28%]">
            <Image width={61} height={61} src="https://shopinfo.vteximg.com.br/arquivos/relogio.gif"
              loading='lazy' className='re1:mr-0 mr-2 w-[40px] re1:w-[61px] h-[40px] re1:h-[61px]'
            />

            <label>
              <p className='flex flex-col text-secondary items-center justify-center'>
                <p className='text-[12px] re1:mr-1'>AS PROMOÇÕES EXPIRAM EM</p>
                <span className='font-bold text-[20px] leading-3 w-[215px]'><span>{days}D</span> <span>{hours}</span> : <span>{minutes}</span> : <span>{seconds}</span> : <span>{milliseconds}</span></span>
              </p>
            </label>
          </div>
        </div>

        <div className='flex items-center relative'>
          <div className='swiper' ref={sliderRef}>
            <div className='swiper-wrapper'>
              {produtos.map(slide=> 
                <div className='swiper-slide !flex items-center justify-center'>
                  <Card
                    product={slide} descontoPix={descontoPix}
                  />
                </div>
              )}
            </div>

            <ul ref={paginationRef} className='flex gap-2 items-center justify-center mt-6'/>
          </div>

          <div class='hidden re1:flex items-center justify-center prev absolute left-[-40px] re4:left-[-20px] z-[2] mb-6'>
            <button ref={prevRef} class='btn min-w-[25px] min-h-[20px] rounded-full disabled:grayscale !bg-transparent  !border-none !p-0'>
              <Icon
                class='text-primary'
                size={25}
                id='ChevronLeft'
                strokeWidth={3}
              />
            </button>
          </div>

          <div class='hidden re1:flex items-center justify-center next absolute right-[-40px] re4:right-[-20px] z-[2] mb-6'>
            <button ref={nextRef} class='btn min-w-[25px] min-h-[20px] rounded-full disabled:grayscale !bg-transparent !border-none !p-0'>
              <Icon
                class='text-primary'
                size={25}
                id='ChevronRight'
                strokeWidth={3}
              />
            </button>
          </div>
        </div>
      </div>
    </CompareContextProvider>
  )
}

export default Vitrine
