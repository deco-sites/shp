import ProdFogo from "deco-sites/shp/components/ProductsSHP/ProdFogo.tsx"

import type { LoaderReturnType } from "$live/types.ts"
import Slider from "deco-sites/shp/components/ui/Slider.tsx"
import SliderJS from "deco-sites/shp/components/ui/SliderJS.tsx"
import type { Product } from "deco-sites/std/commerce/types.ts"

import { DescontoPIX } from "deco-sites/shp/FunctionsSHP/DescontoPix.ts"

import { useEffect, useId, useState } from "preact/hooks"

export interface Props {
  products: LoaderReturnType<Product[] | null>
  /** @description data no formato AAAA-MM-DD*/
  finalDaOferta: string
}

const fireOffers = ({ products, finalDaOferta='' }: Props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth<=768)
  const id=useId()
  const dataFinal:Array<number> =finalDaOferta?.split('-').map((element,idx)=>idx===1? parseInt(element)-1 : parseInt(element))
  const finalDate= dataFinal.length!==0 && new Date(dataFinal[0],dataFinal[1],dataFinal[2])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth<=768)
    }

    handleResize()

    // deno-lint-ignore no-window-prefix
    window.addEventListener("resize", handleResize)

    return () => {
      // deno-lint-ignore no-window-prefix 
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (!products || products.length === 0) return null

  return isMobile ?
    (
      <>
        <div className="flex mx-auto w-fit gap-2">
          <img src="https://shopinfo.vteximg.com.br/arquivos/icone-ofertas-fogo.png" />
          <span>Suba de Nível no Mobile Black da Shopinfo</span>
          
        </div>
        
        <div id={id} className="container grid grid-cols-[20px_1fr_20px] px-0">
          <Slider  className="carousel carousel-center gap-6 col-span-full row-start-2 row-end-5 scrollbar-none">
            {products.map((slide,index)=>(
              <Slider.Item index={index} class="carousel-item w-fit h-fit first:pl-6 last:pr-6 ">
                <ProdFogo
                  imgUrl={slide.image && slide.image[0].url}
                  nome={slide.name}
                  preco10={slide.offers?.highPrice && parseFloat((slide.offers?.highPrice /10).toFixed(2))}
                  precoPIX={slide.offers && DescontoPIX(slide.offers.highPrice,15)}
                  discountFlag={15}
                /> 
              </Slider.Item> 
            ))}
          </Slider>

          <SliderJS rootId={id} infinite />
        </div>
      </>
    )
      :
    (
      <>
        <div>batata
          
        </div>
      </>
    )
    
}

export default fireOffers
