import { memo } from 'preact/compat'
import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import BuyBar from 'deco-sites/shp/components/product/BuyBar.tsx'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>
  descontoPix:number
}

const ProductBuyBar=({ page, descontoPix }: Props)=>{

  return (
    <div class='bg-base-100 text-secondary'>
      {page ? <BuyBar page={page} pix={descontoPix}/> : null}
    </div>
  )
}

export default memo(ProductBuyBar)