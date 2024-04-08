import { useEffect, useState, useRef, useId } from 'preact/hooks'
import { putSizeInUrl } from 'deco-sites/shp/FunctionsSHP/AddSizeInUrl.ts'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'
import useTimer, { TimeRemaining } from 'deco-sites/shp/FunctionsSHP/useTimer.ts'
import ProdFogo from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/ProdFogo.tsx'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import type { Product } from 'apps/commerce/types.ts'
import { AppContext } from "deco-sites/shp/apps/site.ts";
import { SectionProps } from "deco/types.ts";

export interface Props {
  title:string
  products:Product[] | null
  /** @description formato AAAA-MM-DD*/
  finalDaOferta: string
  interval: number
}

export const loader = (props: Props, _req: Request, ctx: AppContext & {descontoPix:number}) => {
  return {
    ...props,
    descontoPix: ctx.descontoPix,
  }
}

const ProdSlider = ({ title, products, finalDaOferta = '', interval = 0, descontoPix }: SectionProps<typeof loader>) => {
  const id = useId() + '-fogo'

  const finalDate = finalDaOferta ? new Date(finalDaOferta) : undefined
  const timeRemaining:TimeRemaining=useTimer(finalDate)

  const prev = useRef<HTMLDivElement>(null)
  const next = useRef<HTMLDivElement>(null)

  if (!products || products.length === 0) {
    return <></>
  }

  return (
    <div className='re1:w-[90%] re5:w-[80%] w-screen mx-auto'>
      <div className='flex mx-auto w-full re1:w-[50vw] gap-2 justify-center items-center mb-5'>
        <div className='flex gap-2 mx-auto items-center w-4/5'>
          {/* <Image
            src='https://shopinfo.vteximg.com.br/arquivos/icone-ofertas-fogo.png'
            height={30}
            width={30}
            preload
            fetchPriority='low'
            loading='lazy'
          /> */}
          <span className='font-bold re1:text-2xl text-lg text-secondary'>
            {title}
          </span>
        </div>
        <div className='hidden re1:flex gap-1 ml-auto'>
          <button
            className='btn btn-circle min-w-[30px] min-h-[30px] max-h-[30px] max-w-[30px] bg-transparent hover:bg-transparent border border-primary hover:border-primary'
            onClick={() =>
              prev.current &&
              prev.current.firstChild instanceof HTMLButtonElement &&
              prev.current.firstChild.click()
            }
          >
            <Icon
              class='text-primary'
              size={20}
              id='ChevronLeft'
              strokeWidth={3}
            />
          </button>
          <button
            className='btn btn-circle min-w-[30px] min-h-[30px] max-h-[30px] max-w-[30px] bg-transparent hover:bg-transparent border border-primary hover:border-primary'
            onClick={() =>
              next.current &&
              next.current.firstChild instanceof HTMLButtonElement &&
              next.current.firstChild.click()
            }
          >
            <Icon
              class='text-primary'
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
        <Slider className='carousel carousel-center gap-6 col-span-full row-start-2 row-end-5 scrollbar-none overflow-y-hidden'>
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
                  nome={slide.name!}
                  preco10={
                    slide.offers!.highPrice &&
                    parseFloat((slide.offers!.highPrice / 10).toFixed(2))
                  }
                  precoPIX={
                    slide.offers! && DescontoPIX(slide.offers.highPrice, descontoPix)
                  }
                  discountFlag={15}
                  timeRemaining={timeRemaining}
                  productUrl={slide.isVariantOf!.url!}
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

export default ProdSlider
