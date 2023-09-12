import type { ProductDetailsPage } from 'deco-sites/std/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import Description from 'deco-sites/shp/components/product/Description.tsx'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>
}

const ProductDescription=({ page }: Props)=>{
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */

  return (
    <div class='bg-[#111] text-white'>
      {page ? <Description page={page}/> : null}
    </div>
  )
}

export default ProductDescription