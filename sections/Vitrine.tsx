import type { PCProps } from "deco-sites/shp/components/ProductsSHP/PC.tsx";
import PC from "deco-sites/shp/components/ProductsSHP/PC.tsx";

import type { ProdProps } from "deco-sites/shp/components/ProductsSHP/Prod.tsx";
import Prod from "deco-sites/shp/components/ProductsSHP/Prod.tsx";

import Slider from "deco-sites/shp/components/ui/Slider.tsx";
import SliderJS from "deco-sites/shp/components/ui/SliderJS.tsx";
import Icon from "deco-sites/shp/components/ui/Icon.tsx";
//import Flicking from "preact-flicking"

import { useEffect, useId, useState } from "preact/hooks";

export interface vitrineProps {
  PcGamer: boolean;
  products?: Array<PCProps | ProdProps>;
}

const Shelf = ({ PcGamer, products = [] }: vitrineProps) => {
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

  return (
    <div>
      {isMobile
        ? (
          <div className="container grid grid-cols-[48px_1fr_48px] px-0">
            <Slider class="carousel carousel-center gap-6 col-span-full row-start-2 row-end-5 scrollbar-none">
              {PcGamer
                ? products.map((element: PCProps, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-fit h-fit first:pl-6 last:pr-6 "
                  >
                    <PC
                      imgUrl={element.imgUrl}
                      nome={element.nome}
                      placa={element.placa}
                      processador={element.processador}
                      memoria={element.memoria}
                      armazenamento={element.armazenamento}
                      precoPIX={element.precoPIX}
                      preco10={element.preco10}
                      discountFlag={element.discountFlag}
                    />
                  </Slider.Item>
                ))
                : products.map((element: ProdProps, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-fit h-fit first:pl-6 last:pr-6"
                  >
                    <Prod
                      imgUrl={element.imgUrl}
                      nome={element.nome}
                      precoPIX={element.precoPIX}
                      preco10={element.preco10}
                      discountFlag={element.discountFlag}
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
              ? products.map((element: PCProps, index) => (
                <PC
                  key={index}
                  imgUrl={element.imgUrl}
                  nome={element.nome}
                  placa={element.placa}
                  processador={element.processador}
                  memoria={element.memoria}
                  armazenamento={element.armazenamento}
                  precoPIX={element.precoPIX}
                  preco10={element.preco10}
                  discountFlag={element.discountFlag}
                />
              ))
              : products.map((element: ProdProps, index) => (
                <Prod
                  key={index}
                  imgUrl={element.imgUrl}
                  nome={element.nome}
                  precoPIX={element.precoPIX}
                  preco10={element.preco10}
                  discountFlag={element.discountFlag}
                />
              ))}
          </>
        )}
    </div>
  );
};

export default Shelf;
