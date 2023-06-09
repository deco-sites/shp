import type { PCProps } from "deco-sites/shp/components/ProductsSHP/PC.tsx";
import PC from "deco-sites/shp/components/ProductsSHP/PC.tsx";

import type { ProdProps } from "deco-sites/shp/components/ProductsSHP/Prod.tsx";
import Prod from "deco-sites/shp/components/ProductsSHP/Prod.tsx";

import type { LoaderReturnType } from "$live/types.ts";
import Slider from "deco-sites/shp/components/ui/Slider.tsx";
import SliderJS from "deco-sites/shp/components/ui/SliderJS.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";

import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'

import { useEffect, useId, useState } from "preact/hooks";

export interface vitrineProps {
  PcGamer: boolean;
  // products?: Array<PCProps | ProdProps>;
  produtos:LoaderReturnType<Product[] | null>
}

const Shelf = ({ PcGamer, produtos }: vitrineProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    // deno-lint-ignore no-window-prefix
    window.addEventListener("resize", handleResize);

    return () => {
      // deno-lint-ignore no-window-prefix
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const id = useId();

  if (!produtos || produtos.length === 0) {
    return null;
  }else{
    console.log(produtos)
  }

  return (
    <div>
      {isMobile
        ? (
          <div className="container grid grid-cols-[48px_1fr_48px] px-0">
            <Slider class="carousel carousel-center gap-6 col-span-full row-start-2 row-end-5 scrollbar-none">
              {PcGamer
                ? produtos.map((element, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-fit h-fit first:pl-6 last:pr-6 "
                  >
                    <PC
                      imgUrl={element.image && element.image[0].url}
                      nome={element.name}
                      placa={element.isVariantOf?.additionalProperty[7].value}
                      processador={element.isVariantOf?.additionalProperty[0].value}
                      memoria={element.isVariantOf?.additionalProperty[8].value}
                      armazenamento={element.isVariantOf?.additionalProperty[10].value}
                      preco10={element.offers?.highPrice && parseFloat((element.offers?.highPrice /10).toFixed(2))}
                      precoPIX={element.offers && DescontoPIX(element.offers.highPrice,15)}
                      // discountFlag={element.discountFlag}
                    />
                  </Slider.Item>
                ))
                : produtos.map((element, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-fit h-fit first:pl-6 last:pr-6"
                  >
                    <Prod
                      imgUrl={element.image && element.image[0].url}
                      nome={element.name}
                      preco10={element.offers?.highPrice && parseFloat((element.offers?.highPrice /10).toFixed(2))}
                      precoPIX={element.offers && DescontoPIX(element.offers.highPrice,15)}
                      // discountFlag={element.discountFlag}
                    />
                  </Slider.Item>
                ))}
            </Slider>
            <SliderJS rootId={id} infinite />
          </div>
        )
        : (
          <>
            {PcGamer
              ? produtos?.map((element) => (
                <PC
                  imgUrl={element.image && element.image[0].url}
                  nome={element.name}
                  // placa={element.isVariantOf?.additionalProperty[7].value}
                  // processador={element.isVariantOf?.additionalProperty[0].value}
                  // memoria={element.isVariantOf?.additionalProperty[8].value}
                  // armazenamento={element.isVariantOf?.additionalProperty[10].value}
                  preco10={element.offers?.highPrice && parseFloat((element.offers?.highPrice /10).toFixed(2))}
                  precoPIX={element.offers && DescontoPIX(element.offers.highPrice,15)}
                  // discountFlag={element.discountFlag}
                />
              ))
              : produtos?.map((element) => (
                <Prod
                  imgUrl={element.image && element.image[0].url}
                  nome={element.name}
                  preco10={element.offers?.highPrice && parseFloat((element.offers?.highPrice /10).toFixed(2))}
                  precoPIX={element.offers && DescontoPIX(element.offers.highPrice,15)}
                  // discountFlag={element.discountFlag}
                />
              ))}
          </>
        )}
    </div>
  );
};

export default Shelf;
