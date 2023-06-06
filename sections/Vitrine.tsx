import type { PCProps } from "deco-sites/shp/components/ProductsSHP/PC.tsx";
import PC from "deco-sites/shp/components/ProductsSHP/PC.tsx";

import type { ProdProps } from "deco-sites/shp/components/ProductsSHP/Prod.tsx";
import Prod from "deco-sites/shp/components/ProductsSHP/Prod.tsx";

import {useRef, useEffect} from 'preact/hooks'

import {useKeenSlider} from 'useKeenSlider'

export interface vitrineProps {
  PcGamer: boolean;
  products?: Array<PCProps | ProdProps>;
}

const Shelf = ({ PcGamer, products = [] }: vitrineProps) => {
const [sliderRef, instanceRed]=useKeenSlider(
  {
    created(){
      console.log('batata')
    },
},[]
)
  
  if (products) {
    return (
      <div ref={sliderRef} className="flex gap-2 keen-slider">
        {PcGamer
          ? products.map((element: PCProps) => (
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
          ))
          : products.map((element: ProdProps) => (
            <Prod
              imgUrl={element.imgUrl}
              nome={element.nome}
              precoPIX={element.precoPIX}
              preco10={element.preco10}
              discountFlag={element.discountFlag}
            />
          ))}
      </div>
    );
  }

  return null;
};

export default Shelf;
