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
  const {days, hours, minutes, seconds}=useTimer(finalDate)

  const prev = useRef<HTMLDivElement>(null)
  const next = useRef<HTMLDivElement>(null)

  if (!produtos || produtos.length === 0) {
    return <></>
  }

  return (
    <CompareContextProvider>
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
            <a className='re1:py-[8px] re1:px-[32px] items-center re1:border border-[#F0F0F0] inline-flex gap-2 cursor-pointer rounded-lg'>
              <p className='hidden re1:block'>Confira</p> 
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
              <p className="flex flex-col text-secondary items-center">
                <p className="text-[12px]">AS PROMOÇÕES EXPIRAM EM</p>
                <span className="font-bold text-[20px] leading-3">{`${days}D ${hours}:${minutes}:${seconds}`}</span>
              </p>
            </label>
          </div>
          {/* Setinhas do lado do contador */}
          {/* <div className='hidden re1:flex gap-1 ml-auto'>
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
          </div> */}
        </div>

        <div className='flex re1:grid grid-cols-[20px_1fr_20px] re1:justify-between re1:items-center' id={id}>
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

            <Slider className='carousel carousel-center gap-6 scrollbar-none'>
              {produtos.map((slide, index) => 
                <Slider.Item
                  index={index}
                  class='carousel-item items-center justify-between first:pl-6 last:pr-6'
                >
                  <Card
                    product={slide} descontoPix={descontoPix}
                  />
                </Slider.Item>
              )}
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

          <SliderJS rootId={id} interval={interval * 1000} scroll='smooth'/>
        </div>
      </div>
    </CompareContextProvider>
  )
}

export default Vitrine
