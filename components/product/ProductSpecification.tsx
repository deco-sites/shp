import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import type { LoaderReturnType } from '$live/types.ts'
import Specification from 'deco-sites/shp/components/product/Specification.tsx'

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>
}

const ProductSpecification=({ page }: Props)=>{
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */

  return (
    <div class='bg-[#111] text-white'>
      {page ? <Specification page={page}/> : null}
    </div>
  )
}

export default ProductSpecification