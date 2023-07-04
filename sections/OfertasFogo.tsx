import { useEffect, useState, useRef, useId } from 'preact/hooks'
import { putSizeInUrl } from 'deco-sites/shp/FunctionsSHP/AddSizeInUrl.ts'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'
import ProdFogo from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/ProdFogo.tsx'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import type { Product } from 'deco-sites/std/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'

export interface Props {
  products: LoaderReturnType<Product[] | null>
  /** @description formato AAAA-MM-DD*/
  finalDaOferta: string
  interval: number
}

const calculateTimeRemaining = (startDate: Date, endDate: Date) => {
  const difference = endDate.getTime() - startDate.getTime()

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, '0')
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, '0')

  return { days, hours, minutes, seconds }
}

const FireOffers = ({ products, finalDaOferta = '', interval = 0 }: Props) => {
  const id = useId() + '-fogo'

  const [days, setDays] = useState('00')
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')

  const [startDate] = useState(() => new Date())
  const finalDate = finalDaOferta ? new Date(finalDaOferta) : undefined

  const prev = useRef<HTMLDivElement>(null)
  const next = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeOut = setInterval(() => {
      if (finalDate) {
        console.log('Papa')
        const timeObj = finalDate && calculateTimeRemaining(startDate, finalDate)
        const { days, hours, minutes, seconds } = timeObj
        setDays(days)
        setHours(hours)
        setMinutes(minutes)
        setSeconds(seconds)
      }
    }, 1000)

    return () => {
      clearInterval(timeOut)
    }
  }, [])

  useEffect(()=>console.log('mudou'),[seconds])

  if (!products || products.length === 0) {
    return <></>
  }

  return (
    <div className='re1:w-[60vw] w-screen mx-auto'>
      <div className='flex mx-auto w-full re1:w-[50vw] gap-2 justify-center items-center mb-5'>
        <div className='flex gap-2 mx-auto items-center w-4/5'>
          <Image
            src='https://shopinfo.vteximg.com.br/arquivos/icone-ofertas-fogo.png'
            height={30}
            width={30}
            preload
            fetchPriority='low'
            loading='lazy'
          />
          <span className='font-bold re1:text-2xl text-lg'>
            Suba de Nível no Arraiá Black da Shopinfo
          </span>
        </div>
        <div className='hidden re1:flex gap-1 ml-auto'>
          <button
            className='btn btn-circle min-w-[30px] min-h-[30px] max-h-[30px] max-w-[30px] bg-transparent hover:bg-transparent border border-[#dd1f26] hover:border-[#dd1f26]'
            onClick={() =>
              prev.current &&
              prev.current.firstChild instanceof HTMLButtonElement &&
              prev.current.firstChild.click()
            }
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
            onClick={() =>
              next.current &&
              next.current.firstChild instanceof HTMLButtonElement &&
              next.current.firstChild.click()
            }
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
          {products.map((slide, index) => {
            const imgUrl =
              slide.image && slide.image[0] && slide.image[0].url
                ? putSizeInUrl(slide.image[0].url, [135, 135]) ||
                  slide.image[0].url
                : ''

            return (
              <Slider.Item
                index={index}
                class='carousel-item w-fit h-fit first:pl-6 last:pr-6'
              >
                <ProdFogo
                  imgUrl={imgUrl}
                  nome={slide.name}
                  preco10={
                    slide.offers?.highPrice &&
                    parseFloat((slide.offers.highPrice / 10).toFixed(2))
                  }
                  precoPIX={
                    slide.offers && DescontoPIX(slide.offers.highPrice, 15)
                  }
                  discountFlag={15}
                  timeRemaining={[days, hours, minutes, seconds]}
                />
              </Slider.Item>
            )
          })}
        </Slider>

        <div className='hidden' ref={prev}>
          <Slider.PrevButton />
        </div>

        <div className='hidden' ref={next}>
          <Slider.NextButton />
        </div>

        <SliderJS rootId={id} infinite interval={interval * 1000} />
      </div>
    </div>
  )
}

export default FireOffers
