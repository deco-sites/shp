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
  
  // Se precisar dos bullets
  // const generateAgroupmentItems=(agroupment:number)=>{
  //   const finalPairs: JSX.Element[] = []

  //   for (let i = 0; i < Categs.length; i+=agroupment) {

  //     const group = 
  //     <>
  //       {Categs.slice(i,i+agroupment).map(Categ=>(
  //         <a href={Categ.linkTo} className='flex flex-col w-full h-full text-center hover:scale-90 transition ease-in-out duration-300 min-w-[145px] max-w-[145px]'>
  //           <Image className='m-auto w-[100px] re1:w-[145px]' src={Categ.categImg} alt={Categ.name} width={145} height={196} fetchPriority='high' loading='lazy' decoding='sync'/>
  //           <span className='text-secondary text-[18px] font-bold mb-[10px]'>{Categ.name}</span>
  //         </a>
  //       ))}
  //     </>
  //     finalPairs.push(group)
  //   }

  //   return finalPairs.map((element, index) => (
  //     <Slider.Item
  //       index={index}
  //       className='carousel-item items-center justify-between'
  //     >{element}</Slider.Item>
  //   ))
  // }

  return (
    <div className='my-5 px-[5%] re1:px-[15%]'>
      <p className='text-secondary text-left text-3xl font-bold my-2'>
        Categorias
      </p>
      <div className='flex flex-col' id={id}>
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
      </div>
    </div>
  )
}

export default Categories
