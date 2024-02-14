import { useEffect, useId, useState, useCallback, useRef } from 'preact/hooks'
import Card from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/CardOrgSchemaProdType.tsx'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import type { Product } from 'apps/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import CompareContextProvider, {useCompareContext} from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'
import Icon from 'deco-sites/shp/components/ui/Icon.tsx'
import Image from 'deco-sites/std/components/Image.tsx'
import { putSizeInUrl } from 'deco-sites/shp/FunctionsSHP/AddSizeInUrl.ts'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'
import useTimer, { TimeRemaining } from 'deco-sites/shp/FunctionsSHP/useTimer.ts'

export interface VitrineProps {
  produtos: LoaderReturnType<Product[] | null>
  titulo: string
  /** @description formato AAAA-MM-DD*/
  finalDaOferta: string
  interval: number
}

const Vitrine = ({ produtos, titulo, finalDaOferta, interval=0 }: VitrineProps) => {
  const [isMobile, setIsMobile] = useState(false)
  const id = useId() + '-vitrine'

  const handleResize = useCallback(() => {
    setIsMobile(globalThis.window.innerWidth <= 768)
  }, [])

  useEffect(() => {
    handleResize()

    globalThis.window.addEventListener('resize', handleResize)

    return () => {
      globalThis.window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!produtos || produtos.length === 0) {
    return null
  }

  const finalDate = finalDaOferta ? new Date(finalDaOferta) : undefined
  const timeRemaining:TimeRemaining=useTimer(finalDate)

  const prev = useRef<HTMLDivElement>(null)
  const next = useRef<HTMLDivElement>(null)

  if (!produtos || produtos.length === 0) {
    return <></>
  }

  return (
    <CompareContextProvider>

      <div className='re1:w-[60vw] w-screen mx-auto'>
        <div className='flex mx-auto w-full re1:w-[50vw] gap-2 justify-center items-center mb-5'>
          <div className='flex gap-2 mx-auto items-center w-4/5'>
            <span className='font-bold re1:text-2xl text-lg text-secondary'>
              {titulo}
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
            {produtos.map((slide, index) => 
              <Slider.Item
                index={index}
                class='carousel-item w-fit h-fit first:pl-6 last:pr-6'
              >
                <Card
                  product={slide} pix={'12'}
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
