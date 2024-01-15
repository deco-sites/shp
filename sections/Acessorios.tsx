import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import Acessorios from 'deco-sites/shp/components/product/AcessoriosPCGamer.tsx'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>
  acessorios:Array<{
    imgUrl: string
    href: string
    w: number
    h: number
  }>
}

const AcessoriosSection= ({page, acessorios}:Props)=>{
  if(!page){
    return null
  }
  const {product}=page
  const categoriesId = product.additionalProperty?.map((item) =>
    item.name === 'category' ? item.propertyID : undefined
  )
  const PCGamer = categoriesId?.some((item) => item === '10')

  return PCGamer ? (
    <>
      <Acessorios acessorios={acessorios}/>
    </>
  ) : null
  
}

export default AcessoriosSection