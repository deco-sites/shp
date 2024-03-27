import { useEffect, useId, useState, useCallback, useRef } from 'preact/hooks'
import Card from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/CardOrgSchemaProdType.tsx'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import type { Product } from 'apps/commerce/types.ts'
import type { LoaderReturnType, SectionProps } from 'deco/types.ts'
import CompareContextProvider, {useCompareContext} from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import useTimer from 'deco-sites/shp/FunctionsSHP/useTimer.ts'
import { AppContext } from "deco-sites/shp/apps/site.ts";

export interface VitrineProps {
  produtos: LoaderReturnType<Product[] | null>
  titulo: string
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

const Vitrine = ({ produtos, titulo, finalDaOferta, interval=0, descontoPix, differentId='0' }: SectionProps<typeof loader>) => {
  const id =`${useId()}-${differentId}-vitrine`

  if (!produtos || produtos.length === 0) {
    return null
  }

  const finalDate = finalDaOferta ? new Date(finalDaOferta) : undefined
  const {days, hours, minutes, seconds}=useTimer(finalDate)

  const prev = useRef<HTMLDivElement>(null)
  const next = useRef<HTMLDivElement>(null)

  if (!produtos || produtos.length === 0) {
    return <></>
  }

  return (
    <CompareContextProvider>
      <div className='w-full mx-auto re1:px-[15%] my-16'>
        <div className='flex flex-col re1:flex-row mx-auto w-full gap-2 justify-between re1:justify-center items-center mb-5 re1:px-0 px-6'>
          <div className='flex gap-2 items-center re1:w-full'>
            <span className='font-bold re1:text-4xl text-xl text-secondary'>
              {titulo}
            </span>
          </div>
          <div className="bg-transparent border-secondary rounded-lg flex justify-around p-1 items-center re1:w-[54%] re3:w-[48%] re4:w-[38%] re5:w-[28%] w-fit ">
            <Image width={61} height={61} src="https://shopinfo.vteximg.com.br/arquivos/relogio.gif"
              loading='lazy' className='re1:mr-0 mr-2 w-[40px] re1:w-[61px] h-[40px] re1:h-[61px]'
            />
            <label>
              <p className="flex flex-col text-secondary items-center">
                <p className="text-[12px]">AS PROMOÇÕES EXPIRAM EM</p>
                <span className="font-bold text-[20px] leading-3">{`${days}D ${hours}:${minutes}:${seconds}`}</span>
              </p>
            </label>
          </div>
          <div className='hidden re1:flex gap-1 ml-auto'>
            <button
              className='btn btn-circle min-w-[30px] min-h-[30px] max-h-[30px] max-w-[30px] bg-transparent hover:bg-transparent border border-secondary hover:border-secondary'
              onClick={() =>
                prev.current &&
                prev.current.firstChild instanceof HTMLButtonElement &&
                prev.current.firstChild.click()
              }
            >
              <Icon
                class='text-secondary'
                size={20}
                id='ChevronLeft'
                strokeWidth={3}
              />
            </button>
            <button
              className='btn btn-circle min-w-[30px] min-h-[30px] max-h-[30px] max-w-[30px] bg-transparent hover:bg-transparent border border-secondary hover:border-secondary'
              onClick={() =>
                next.current &&
                next.current.firstChild instanceof HTMLButtonElement &&
                next.current.firstChild.click()
              }
            >
              <Icon
                class='text-secondary'
                size={20}
                id='ChevronRight'
                strokeWidth={3}
              />
            </button>
          </div>
        </div>

        <div
          id={id}
          className='container grid grid-cols-[20px_1fr_20px] re1:grid-cols-[48px_1fr_48px]'
        >
          <Slider className='carousel carousel-center gap-6 col-span-full row-start-2 row-end-5 scrollbar-none overflow-y-hidden'>
            {produtos.map((slide, index) => 
              <Slider.Item
                index={index}
                class='carousel-item w-fit h-fit re1:first:pl-0 first:pl-6 re1:last:pr-0 last:pr-6'
              >
                <Card
                  product={slide} descontoPix={descontoPix}
                />
              </Slider.Item>
            )}
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
    </CompareContextProvider>
  )
}

export default Vitrine
