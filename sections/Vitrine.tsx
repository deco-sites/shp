// deno-lint-ignore-file no-window-prefix
import { useEffect, useId, useState, useCallback } from 'preact/hooks'
import Card from 'deco-sites/shp/components/ComponentsSHP/ProductsCard/CardOrgSchemaProdType.tsx'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import type { Product } from 'apps/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import CompareContextProvider, {useCompareContext} from 'deco-sites/shp/contexts/Compare/CompareContext.tsx'

export interface VitrineProps {
  produtos: LoaderReturnType<Product[] | null>
}

const Vitrine = ({ produtos }: VitrineProps) => {
  const [isMobile, setIsMobile] = useState(false)
  const id = useId() + '-vitrine'

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!produtos || produtos.length === 0) {
    return null
  }

  return (
    <CompareContextProvider>
      <div className='my-5'>
        {isMobile ? (
          <div className='container grid grid-cols-[48px_1fr_48px] px-0' id={id}>
            <Slider class='carousel carousel-center gap-6 col-span-full row-start-2 row-end-5 scrollbar-none'>
              {produtos.map((element,index)=>(
                <Slider.Item
                  index={index}
                  class='carousel-item w-[55%] h-fit first:pl-6 last:pr-6 re1:first:pl-0 re1:pr-0'
                >
                  <Card product={element} pix={'12'}/>
                </Slider.Item>
              ))}
            </Slider>
            <SliderJS rootId={id} infinite />
          </div>
        ) : (
          <div
            className={`grid ${
              produtos.length % 3 === 0 && produtos.length === 6
                ? 'grid-cols-3 w-[40vw]'
                : 'grid-cols-4 w-[50vw]'
            } gap-x-3 gap-y-3 mx-auto`}
          >
            {produtos.map(element=><Card product={element} pix={'12'}/>)}
          </div>
        )}
      </div>
    </CompareContextProvider>
  )
}

export default Vitrine
