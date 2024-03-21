import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import CompreJunto from 'deco-sites/shp/components/product/CompreJunto.tsx'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>
  descontoPix:number
}

const ProductCompreJunto=({ page, descontoPix }: Props)=>{
  return (
    <div class='bg-base-100 text-secondary'>
      {page ? <CompreJunto page={page} pix={descontoPix}/> : null}
    </div>
  )
}

export default ProductCompreJunto