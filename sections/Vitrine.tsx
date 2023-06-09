import PC from "deco-sites/shp/components/ProductsSHP/PC.tsx";
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
  }

  return (
    <div className="my-5">
      {isMobile
        ? (
          <div className="container grid grid-cols-[48px_1fr_48px] px-0">
            <Slider class="carousel carousel-center gap-6 col-span-full row-start-2 row-end-5 scrollbar-none">
              {PcGamer
                ? produtos.map((element, index) =>{ 
                  const pecas:string[]=['Memória','SSD','HD','Processador','Placa de vídeo']
                  const pecaArray=element.isVariantOf?.additionalProperty
                  const pecasObj: Record<string, string|undefined>={}
                  pecaArray?.forEach((pecaObj)=>{
                    if(pecas.includes(String(pecaObj.name))){
                      (pecaObj.name==="HD" || pecaObj.name==="SSD") ?
                        (
                          pecaObj.value?.includes(pecaObj.name) ?
                            pecasObj['armazenamento']=pecaObj.value
                          :
                            pecasObj['armazenamento']=pecaObj.name +': '+ pecaObj.value
                        )
                      :
                        pecasObj[String(pecaObj.name)]=pecaObj.value
                    }
                  })
                  
                  return (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-fit h-fit first:pl-6 last:pr-6 "
                  >
                    <PC
                      imgUrl={element.image && element.image[0].url}
                      nome={element.name}
                      placa={pecasObj["Placa de vídeo"]}
                      processador={pecasObj.Processador}
                      memoria={pecasObj.Memória}
                      armazenamento={pecasObj.armazenamento}
                      preco10={element.offers?.highPrice && parseFloat((element.offers?.highPrice /10).toFixed(2))}
                      precoPIX={element.offers && DescontoPIX(element.offers.highPrice,15)}
                      discountFlag={15}
                    />
                  </Slider.Item>
                )})
                : produtos.map((element, index) => 
                  (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-fit h-fit first:pl-6 last:pr-6"
                  >
                    <Prod
                      imgUrl={element.image && element.image[0].url}
                      nome={element.name}
                      preco10={element.offers?.highPrice && parseFloat((element.offers?.highPrice /10).toFixed(2))}
                      precoPIX={element.offers && DescontoPIX(element.offers.highPrice,15)}
                      discountFlag={15}
                    />
                  </Slider.Item>
                ))}
            </Slider>
            <SliderJS rootId={id} infinite />
          </div>
        )
        : (
          <div className="grid grid-cols-4 gap-x-3 gap-y-3 w-fit mx-auto">
            {PcGamer
              ? produtos?.map((element) => {
                const pecas:string[]=['Memória','SSD','HD','Processador','Placa de vídeo']
                const pecaArray=element.isVariantOf?.additionalProperty
                const pecasObj: Record<string, string|undefined>={}
                pecaArray?.forEach((pecaObj)=>{
                  if(pecas.includes(String(pecaObj.name))){
                    (pecaObj.name==="HD" || pecaObj.name==="SSD") ?
                      (
                        pecaObj.value?.includes(pecaObj.name) ?
                          pecasObj['armazenamento']=pecaObj.value
                        :
                          pecasObj['armazenamento']=pecaObj.name +': '+ pecaObj.value
                      )
                    :
                      pecasObj[String(pecaObj.name)]=pecaObj.value
                  }
                })
                
                return (
                <PC
                  imgUrl={element.image && element.image[0].url}
                  nome={element.name}
                  placa={pecasObj["Placa de vídeo"]}
                  processador={pecasObj.Processador}
                  memoria={pecasObj.Memória}
                  armazenamento={pecasObj.armazenamento}
                  preco10={element.offers?.highPrice && parseFloat((element.offers?.highPrice /10).toFixed(2))}
                  precoPIX={element.offers && DescontoPIX(element.offers.highPrice,15)}
                  discountFlag={15}
                />
              )})
              : produtos?.map((element) => 
                 (
                <Prod
                  imgUrl={element.image && element.image[0].url}
                  nome={element.name}
                  preco10={element.offers?.highPrice && parseFloat((element.offers?.highPrice /10).toFixed(2))}
                  precoPIX={element.offers && DescontoPIX(element.offers.highPrice,15)}
                  discountFlag={15}
                />
              ))}
          </div>
        )}
    </div>
  );
};

export default Shelf;
