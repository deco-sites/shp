// deno-lint-ignore-file no-window-prefix
import { useEffect, useId, useState, useCallback } from 'preact/hooks'
import { memo } from 'preact/compat'
import { putSizeInUrl } from 'deco-sites/shp/FunctionsSHP/AddSizeInUrl.ts'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'
import PC from 'deco-sites/shp/components/ComponentsSHP/Products/PC.tsx'
import Prod from 'deco-sites/shp/components/ComponentsSHP/Products/Prod.tsx'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import type { Product } from 'deco-sites/std/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'

export interface VitrineProps {
  PcGamer: boolean
  produtos: LoaderReturnType<Product[] | null>
}

const renderProduct = (element: Product, index: number, PcGamer:boolean) => {

  const PCMemoized = memo(PC)
  const ProdMemoized = memo(Prod)

  const pecas: string[] = [
    'Memória',
    'SSD',
    'HD',
    'Processador',
    'Placa de vídeo',
  ]
  const pecaArray = element.isVariantOf?.additionalProperty
  const pecasObj: Record<string, string | undefined> = {}

  pecaArray?.forEach(({name, value}) => {
    if (pecas.includes(String(name))) {
      if (name === 'HD' || name === 'SSD') {
        value?.includes(name)
          ? (pecasObj['armazenamento'] = value)
          : (pecasObj['armazenamento'] = `${name}: ${value}`)
      } else {
        pecasObj[String(name)] = value
      }
    }
  })

  const commonProps = {
    imgUrl:
      element.image && element.image[0] && element.image[0].url
        ? putSizeInUrl(element.image[0].url, [135, 135]) ||
          element.image[0].url
        : '#',
    nome: element.name,
    preco10:
      element.offers?.highPrice &&
      parseFloat((element.offers?.highPrice / 10).toFixed(2)),
    precoPIX: element.offers && DescontoPIX(element.offers.highPrice, 15),
    discountFlag: 15,
  }

  if (PcGamer) {
    return (
      <Slider.Item
        index={index}
        class='carousel-item w-fit h-fit first:pl-6 last:pr-6 re1:first:pl-0 re1:pr-0'
      >
        <PCMemoized
          {...commonProps}
          placa={pecasObj['Placa de vídeo']}
          processador={pecasObj.Processador}
          memoria={pecasObj.Memória}
          armazenamento={pecasObj.armazenamento}
        />
      </Slider.Item>
    )
  } else {
    return (
      <Slider.Item
        index={index}
        class='carousel-item w-fit h-fit first:pl-6 last:pr-6 re1:first:pl-0 re1:pr-0'
      >
        <ProdMemoized {...commonProps} />
      </Slider.Item>
    )
  }
}

const Vitrine = ({ PcGamer, produtos }: VitrineProps) => {
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
    <div className='my-5'>
      {isMobile ? (
        <div className='container grid grid-cols-[48px_1fr_48px] px-0' id={id}>
          <Slider class='carousel carousel-center gap-6 col-span-full row-start-2 row-end-5 scrollbar-none'>
            {produtos.map((element,index)=>renderProduct(element, index, PcGamer))}
          </Slider>
          <SliderJS rootId={id} infinite />
        </div>
      ) : (
        <div
          className={`grid ${
            produtos.length % 3 === 0 && produtos.length === 6
              ? 'grid-cols-3'
              : 'grid-cols-4'
          } gap-x-3 gap-y-3 w-fit mx-auto`}
        >
          {produtos.map((element,index)=>renderProduct(element, index, PcGamer))}
        </div>
      )}
    </div>
  )
}

export default Vitrine
