import ProdFogo from 'deco-sites/shp/components/ProductsSHP/ProdFogo.tsx'

import type { LoaderReturnType } from '$live/types.ts'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import type { Product } from 'deco-sites/std/commerce/types.ts'

import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'

import { useEffect, useId, useState, useRef } from 'preact/hooks'

import {putSizeInUrl} from 'deco-sites/shp/FunctionsSHP/AddSizeInUrl.ts'

export interface Props {
  products: LoaderReturnType<Product[] | null>
  /** @description data no formato AAAA-MM-DD*/
  finalDaOferta: string
  interval: number
}

const calculateTimeRemaining = (startDate: Date, endDate: Date) => {
  const startTime = startDate.getTime()
  const endTime = endDate.getTime()
  const difference = endTime - startTime

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

const fireOffers = ({ products, finalDaOferta = '', interval = 0 }: Props) => {
  //const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const id = useId()+'-fogo'

  const [days, setDays] = useState('00')
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')

  const dataFinal: number[] = finalDaOferta.split('-').map((element, idx) =>idx === 1 ? parseInt(element) - 1 : parseInt(element))
  const finalDate = dataFinal && new Date(dataFinal[0], dataFinal[1], dataFinal[2])

  const prev = useRef<HTMLDivElement>(null)
  const next = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // const handleResize = () => {
    //   setIsMobile(window.innerWidth <= 768)
    // }

    // handleResize()

    // window.addEventListener('resize', handleResize)

    const timeOut = setInterval(() => {
      const timeObj: boolean | Record<string, number> =
        finalDate && calculateTimeRemaining(new Date(), finalDate)
      if (typeof timeObj !== 'boolean') {
        setDays(timeObj.days.toString().padStart(2, '0'))
        setHours(timeObj.hours.toString().padStart(2, '0'))
        setMinutes(timeObj.minutes.toString().padStart(2, '0'))
        setSeconds(timeObj.seconds.toString().padStart(2, '0'))
      }
    }, 1000)

    return () => {
      //window.removeEventListener('resize', handleResize)
      clearInterval(timeOut)
    }
  }, [])

  if (!products || products.length === 0) return null

  return (
    <div className='re1:w-[60vw] w-screen mx-auto'>
      <div className='flex mx-auto w-full re1:w-[50vw] gap-2 justify-center items-center mb-5'>
        <div className='flex gap-2 mx-auto items-center w-4/5'>
          <Image
            src='https://shopinfo.vteximg.com.br/arquivos/icone-ofertas-fogo.png'
            height={30} width={30} preload fetchPriority='low' loading='lazy' 
          />
          <span className='font-bold re1:text-2xl text-lg'>
            Suba de Nível no Arraiá Black da Shopinfo
          </span>
        </div>
        <div className='hidden re1:flex gap-1 ml-auto'>
          <button
            className='btn btn-circle min-w-[30px] min-h-[30px] max-h-[30px] max-w-[30px] bg-transparent hover:bg-transparent border border-[#dd1f26] hover:border-[#dd1f26]'
            onClick={() => (prev.current && prev.current.firstChild instanceof HTMLButtonElement) && prev.current.firstChild.click()}
          >
            <Icon
              class='text-[#dd1f26]'
              size={20}
              id='ChevronLeft'
              strokeWidth={3}
            />
          </button>
          <button
            className='btn btn-circle min-w-[30px] min-h-[30px] max-h-[30px] max-w-[30px] bg-transparent hover:bg-transparent border border-[#dd1f26] hover:border-[#dd1f26]'
            onClick={() => (next.current && next.current.firstChild instanceof HTMLButtonElement) && next.current.firstChild.click()}
          >
            <Icon
              class='text-[#dd1f26]'
              size={20}
              id='ChevronRight'
              strokeWidth={3}
            />
          </button>
        </div>
      </div>

      <div
        id={id}
        className='container grid grid-cols-[20px_1fr_20px] re1:grid-cols-[48px_1fr_48px] px-0 re1:px-5'
      >
        <Slider className='carousel carousel-center gap-6 col-span-full row-start-2 row-end-5 scrollbar-none'>
          {products.map((slide, index) => (
            <Slider.Item
              index={index}
              class='carousel-item w-fit h-fit first:pl-6 last:pr-6'
            >
              <ProdFogo
                imgUrl={
                  slide.image && slide.image[0] && slide.image[0].url ? 
                  (putSizeInUrl(slide.image[0].url,[135,135]) || slide.image[0].url) : '#'
                }
                nome={slide.name}
                preco10={slide.offers?.highPrice && parseFloat((slide.offers?.highPrice / 10).toFixed(2))}
                precoPIX={slide.offers && DescontoPIX(slide.offers.highPrice, 15)}
                discountFlag={15}
                timeRemaining={[days, hours, minutes, seconds]}
              />
            </Slider.Item>
          ))}
        </Slider>

        <div class='hidden' ref={prev}>
          <Slider.PrevButton />
        </div>

        <div class='hidden' ref={next}>
          <Slider.NextButton />
        </div>

        <SliderJS rootId={id} infinite interval={interval && interval * 1e3} />
      </div>
    </div>
  )
}

export default fireOffers
