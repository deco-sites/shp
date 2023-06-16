// deno-lint-ignore-file no-window-prefix
import { useEffect, useId, useState } from 'preact/hooks'
import { putSizeInUrl } from 'deco-sites/shp/FunctionsSHP/AddSizeInUrl.ts'
import { DescontoPIX } from 'deco-sites/shp/FunctionsSHP/DescontoPix.ts'
import PC from 'deco-sites/shp/components/ProductsSHP/PC.tsx'
import Prod from 'deco-sites/shp/components/ProductsSHP/Prod.tsx'
import Slider from 'deco-sites/shp/components/ui/Slider.tsx'
import SliderJS from 'deco-sites/shp/components/ui/SliderJS.tsx'
import type { Product } from 'deco-sites/std/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'

export interface VitrineProps {
  PcGamer: boolean
  produtos: LoaderReturnType<Product[] | null>
}

const Shelf = ({ PcGamer, produtos }: VitrineProps) => {
  const [isMobile, setIsMobile] = useState(false)
  const id = useId() + '-vitrine'

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!produtos || produtos.length === 0) {
    return null
  }

  const renderProduct = (element: Product, index: number) => {
    const pecas: string[] = [
      'Memória',
      'SSD',
      'HD',
      'Processador',
      'Placa de vídeo',
    ]
    const pecaArray = element.isVariantOf?.additionalProperty
    const pecasObj: Record<string, string | undefined> = {}

    pecaArray?.forEach((pecaObj) => {
      if (pecas.includes(String(pecaObj.name))) {
        if (pecaObj.name === 'HD' || pecaObj.name === 'SSD') {
          pecaObj.value?.includes(pecaObj.name)
            ? (pecasObj['armazenamento'] = pecaObj.value)
            : (pecasObj['armazenamento'] = `${pecaObj.name}: ${pecaObj.value}`)
        } else {
          pecasObj[String(pecaObj.name)] = pecaObj.value
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
          class='carousel-item w-fit h-fit first:pl-6 last:pr-6'
        >
          <PC
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
          class='carousel-item w-fit h-fit first:pl-6 last:pr-6'
        >
          <Prod {...commonProps} />
        </Slider.Item>
      )
    }
  }

  return (
    <div className='my-5'>
      {isMobile ? (
        <div className='container grid grid-cols-[48px_1fr_48px] px-0' id={id}>
          <Slider class='carousel carousel-center gap-6 col-span-full row-start-2 row-end-5 scrollbar-none'>
            {produtos.map(renderProduct)}
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
          {produtos.map(renderProduct)}
        </div>
      )}
    </div>
  )
}

export default Shelf
