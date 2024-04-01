import Image from "deco-sites/std/packs/image/components/Image.tsx"
import Slider from 'deco-sites/fashion/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/fashion/components/ui/SliderJS.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import { useId, useEffect, useState } from 'preact/hooks'
import {JSX} from 'preact'

// PRECISO FAZER 2 SLIDES

export interface Props {
  Categs: Array<{
    categImg: string
    linkTo: string
    name: string
  }>
}

const Categories = ({ Categs=[] }: Props) => {
  const id=useId()+'-newCategs'
  
  const generateAgroupmentItems=(agroupment:number)=>{
    const finalPairs: JSX.Element[] = []

    for (let i = 0; i < Categs.length; i+=agroupment) {

      const group = 
      <>
        {Categs.slice(i,i+agroupment).map(Categ=>(
          <a href={Categ.linkTo} className='flex flex-col w-full h-full text-center hover:scale-90 transition ease-in-out duration-300 min-w-[145px] max-w-[145px]'>
            <Image className='m-auto w-[100px] re1:w-[145px]' src={Categ.categImg} alt={Categ.name} width={145} height={196} fetchPriority='high' loading='lazy' decoding='sync'/>
            <span className='text-secondary text-[18px] font-bold mb-[10px]'>{Categ.name}</span>
          </a>
        ))}
      </>
      finalPairs.push(group)
    }

    return finalPairs.map((element, index) => (
      <Slider.Item
        index={index}
        className='carousel-item w-full items-center justify-between'
      >{element}</Slider.Item>
    ))
  }

  const [isMobile, setIsMobile]=useState(globalThis.window.innerWidth<768)
  const [sliderItems, setSliderItems]=useState(isMobile ? generateAgroupmentItems(2) : generateAgroupmentItems(4))

  useEffect(()=>{
    const handleResize=()=>{
      setIsMobile(globalThis.window.innerWidth < 768)
    }

    typeof globalThis.window!=='undefined' && globalThis.window.addEventListener('resize', handleResize)

    return (()=>{
      globalThis.window.removeEventListener('resize', handleResize)
    })
  },[])

  useEffect(()=>{
    setSliderItems(isMobile ? generateAgroupmentItems(2) : generateAgroupmentItems(4))
  },[isMobile])

  return (
    <div className='my-5 px-[5%] re1:px-[15%]'>
      <p className='text-secondary text-left text-3xl font-bold my-2'>
        Categorias
      </p>
      <div className='flex flex-col' id={id}>
          <div className='flex re1:grid re1:grid-cols-[20px_1fr_20px] re1:justify-between re1:items-center'>
            <div className='hidden re1:flex justify-center items-center prev'>
              <Slider.PrevButton class='relative right-[20px] btn min-w-[20px] min-h-[20px] rounded-full disabled:grayscale !bg-transparent  !border-none'>
                <Icon
                  class='text-primary'
                  size={15}
                  id='ChevronLeft'
                  strokeWidth={3}
                />
              </Slider.PrevButton>
            </div>

            <Slider className='carousel carousel-center gap-6 re1:gap-16 scrollbar-none'>
              {sliderItems.map(item=>item)}
            </Slider>

            <div class='hidden re1:flex items-center justify-center next'>
              <Slider.NextButton class='relative left-[20px] btn min-w-[20px] min-h-[20px] rounded-full disabled:grayscale !bg-transparent  !border-none'>
                <Icon
                  class='text-primary'
                  size={15}
                  id='ChevronRight'
                  strokeWidth={3}
                />
              </Slider.NextButton>
            </div>
        </div>

        <ul className='carousel justify-center gap-4 z-[5] mt-6'>
          {sliderItems.map((__, idx)=>(
            <Slider.Dot index={idx}>
              <div className='bg-[#2d2d2d] group-disabled:bg-primary rounded-full h-[12px] w-[12px]' />
            </Slider.Dot>
          ))}
        </ul>
      
        <SliderJS rootId={id} scroll='smooth' />
      </div>
    </div>
  )
}

export default Categories
