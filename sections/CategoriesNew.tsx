import Image from 'deco-sites/std/packs/image/components/Image.tsx'
import Slider from 'deco-sites/fashion/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/fashion/components/ui/SliderJS.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import { useRef, useEffect, useState } from 'preact/hooks'
import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'
import RemakeItemsForSwiper from 'deco-sites/shp/FunctionsSHP/RemakeItemsForSwiper.ts'

export interface Props {
  Categs: Array<{
    categImg: string
    linkTo: string
    name: string
  }>
}

const Categories = ({ Categs=[] }: Props) => {
  const sliderRef=useRef<HTMLDivElement>(null)
  
  const nextRef=useRef<HTMLButtonElement>(null)

  const prevRef=useRef<HTMLButtonElement>(null)

  const [preparedCategs,setPreparedCategs]=useState<Props['Categs']>([])

  useEffect(()=>{
    const itemsPerSlide=globalThis.window.innerWidth<=769 ? 3 : 5

    setPreparedCategs(RemakeItemsForSwiper(Categs,itemsPerSlide) as Props['Categs'])
  },[])

  useEffect(()=>{
    if (!sliderRef.current || !preparedCategs.length) return; // Garante que as refs estão prontas

    const swiperOptions:SwiperOptions = {
      modules:[Autoplay],
      slidesPerView: 3,
      slidesPerGroup: 3,
      loop: true,
      autoplay:{
        delay:5000,
        pauseOnMouseEnter:true
      },
      breakpoints: {
        480:{
          slidesPerView: 5,
          slidesPerGroup: 5,
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
  },[preparedCategs])

  return (
    <div className='my-5 px-[5%] re1:px-[15%]'>
      <p className='uppercase text-secondary text-left text-xl re1:text-4xl font-bold my-2'>
        Categorias
      </p>
      {/*<div className='flex flex-col'>
          <div className='flex re1:grid re1:grid-cols-[20px_1fr_20px] re1:justify-between re1:items-center'>
            <div className='hidden re1:flex justify-center items-center prev'>
              <Slider.PrevButton class='relative right-[20px] btn min-w-[25px] min-h-[20px] rounded-full disabled:grayscale !bg-transparent  !border-none'>
                <Icon
                  class='text-primary'
                  size={25}
                  id='ChevronLeft'
                  strokeWidth={3}
                />
              </Slider.PrevButton>
            </div>

            <Slider className='carousel carousel-center gap-6 re1:gap-16 scrollbar-none'>
              {Categs?.map((Categ, index)=>(
                <Slider.Item
                  index={index}
                  className='carousel-item items-center justify-between'
                >
                  <a href={Categ.linkTo} className='flex flex-col w-full h-full text-center hover:scale-90 transition ease-in-out duration-300 min-w-[145px] max-w-[145px]'>
                    <Image className='m-auto w-[100px] re1:w-[145px]' src={Categ.categImg} alt={Categ.name} width={145} height={196} fetchPriority='high' loading='lazy' decoding='sync'/>
                    <span className='text-secondary text-[18px] font-bold mb-[10px]'>{Categ.name}</span>
                  </a>
                </Slider.Item>
              ))}
            </Slider>

            <div class='hidden re1:flex items-center justify-center next'>
              <Slider.NextButton class='relative left-[20px] btn min-w-[25px] min-h-[20px] rounded-full disabled:grayscale !bg-transparent  !border-none'>
                <Icon
                  class='text-primary'
                  size={25}
                  id='ChevronRight'
                  strokeWidth={3}
                />
              </Slider.NextButton>
            </div>
        </div>
      
        <SliderJS rootId={id} scroll='smooth' /> 
      </div>*/}

        <div className='flex items-center relative'>
          <div className='swiper' ref={sliderRef}>
            <div className='swiper-wrapper'>
              {/* {Categs?.map((Categ)=>(
                <div className='swiper-slide !flex items-center justify-center'>
                  <a href={Categ.linkTo} className='flex flex-col w-full h-full text-center hover:scale-90 transition ease-in-out duration-300 min-w-[145px] max-w-[145px]'>
                    <Image className='m-auto w-[100px] re1:w-[145px]' src={Categ.categImg} alt={Categ.name} width={145} height={196} fetchPriority='high' loading='lazy' decoding='sync'/>
                    <span className='text-secondary text-[18px] font-bold mb-[10px]'>{Categ.name}</span>
                  </a>
                </div>
              ))} */}

              {preparedCategs.map((Categ, index) => (
                <div className='swiper-slide !flex items-center justify-center' key={index}>
                  <a href={Categ.linkTo} className='flex flex-col w-full h-full text-center hover:scale-90 transition ease-in-out duration-300 min-w-[145px] max-w-[145px]'>
                    <Image className='m-auto w-[100px] re1:w-[145px]' src={Categ.categImg} alt={Categ.name} width={145} height={196} fetchPriority='high' loading='lazy' decoding='sync'/>
                    <span className='text-secondary text-[18px] font-bold mb-[10px]'>{Categ.name}</span>
                  </a>
                </div>
              ))}
            </div>
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
  )
}

export default Categories