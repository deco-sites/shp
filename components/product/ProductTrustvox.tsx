import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import Trustvox from 'deco-sites/shp/components/product/Trustvox.tsx'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>
  storeId: string
}

const ProductTrustvox=({ page, storeId }: Props)=>{

  return (
    <div class='bg-base-100 text-secondary'>
      {page ? <Trustvox storeId={storeId} page={page}/> : null}
    </div>
  )
}

export default ProductTrustvox